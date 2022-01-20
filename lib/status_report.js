/** @param {NS} ns **/
import * as formulas from "/lib/formulas.js"; // Call functions like: x = formulas.hackTime(fserver, player);
export async function main(ns) {
    ns.toast("status_report.js start.");
    /* Init */
    let targets = ["home"];
    let bestTarget = ["n00dles", 0];
    let playerStats = ns.getPlayer();
    let playerHackLevel = ns.getHackingLevel();
    // I could have used ns.getPurchasedServers(), but that costs RAM.
    let myServers = [
        "myServer-0",
        "myServer-1",
        "myServer-2",
        "myServer-3",
        "myServer-4",
        "myServer-5",
        "myServer-6",
        "myServer-7",
        "myServer-8",
        "myServer-9",
        "myServer-10",
        "myServer-11",
        "myServer-12",
        "myServer-13",
        "myServer-14",
        "myServer-15",
        "myServer-16",
        "myServer-17",
        "myServer-18",
        "myServer-19",
        "myServer-20",
        "myServer-21",
        "myServer-22",
        "myServer-23",
        "myServer-24"
    ];

    ns.clear("server_report.txt");
    ns.clear("best_target.txt");

    for (let i = 0; i < targets.length; ++i) {
        let serv = targets[i];
        let servStats = ns.getServer(serv);
        //let servMaxRam = ns.getServerMaxRam(serv);
        let servMaxMon = ns.getServerMaxMoney(serv);
        let servMoney = ns.getServerMoneyAvailable(serv)
        let servMinSec = ns.getServerMinSecurityLevel(serv);
        let servGrowth = ns.getServerGrowth(serv);
        let servHackLevel = ns.getServerRequiredHackingLevel(serv);
        //let servHackTime = ns.getHackTime(serv);
        let servPorts = ns.getServerNumPortsRequired(serv);
        let servRoot = ns.hasRootAccess(serv);
        //let servScore = (100 - (servMinSec * 1.5)) * servMaxMon * servGrowth / servHackTime;

        let fHackTime = formulas.hackTime(servStats, playerStats);
        let fWeakenTime = formulas.weakenTime(servStats, playerStats);
        let fGrowTime = formulas.growTime(servStats, playerStats);
        let servScore = (servMaxMon * servGrowth) / (fHackTime + fWeakenTime + fGrowTime);
        //ns.tprint(serv + " fHack,weak,grow " + fHackTime + " " + fWeakenTime + " " + fGrowTime);
        // Score is a value of MaxMoney and Growth Potential, by the total time it takes to execute commands.
        
        // Score can be whatever you like, and can be further improved.
        // Chances are I'll incorporate some kind of formula that looks at hacking level and speed and gets a better score that way
        // But this works, so I'll leave it as such

        if (servHackLevel <= playerHackLevel && ns.hasRootAccess(serv)) {
            // Best target requires root access and having a score greater than the previous best target.
            if (servScore > bestTarget[1]) {
                bestTarget[0] = serv;
                bestTarget[1] = servScore;
            };
        };

        if (servScore > 0) {
            // Usually items with a score greater than zero contain money.
            await ns.write("server_report.txt", serv +
                //", Ram: " + servMaxRam +
                ", Ports: " + servPorts +
                ", Rooted: " + servRoot +
                ", HackLv: " + servHackLevel +
                ", MaxMon: " + servMaxMon +
                ", MonAva: " + servMoney +
                ", MinSec: " + servMinSec +
                ", Growth: " + servGrowth +
                ", Score: " + servScore +
                "\r\n");
        } else if (!myServers.includes(serv) && serv != "home") {
            // Home and other story-based servers don't have money.
            await ns.write("server_report.txt", "===== " + serv + " is a progression server. ===== \r\n");
        };

        // Recursive scan which adds to targets[] when it identifies new child servers when scanning the parent.
        let newScan = await ns.scan(serv);
        for (let j = 0; j < newScan.length; j++) {
            if (targets.indexOf(newScan[j]) == -1) {
                targets.push(newScan[j]);
            };
        };

    };

    await ns.write("best_target.txt", bestTarget[0], "w");
    ns.tprint("server_report.txt generated with " + targets.length + " servers.");
    ns.tprint("Best target is " + bestTarget[0] + " with a score of " + bestTarget[1]);

    ns.tprint("status_report.js complete.");
}