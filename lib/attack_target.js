/** @param {NS} ns **/
export async function main(ns) {
    // Just a really basic attack script from the tutorial.
    // I think I'll update this with better optimisation later.
    /* Init */
    let target = ns.args[0];
    let attacker = ns.getHostname();
    let moneyCap = 0.75;
    let securityCap = 5;
    let weakenCount = 0;
    let growCount = 0;
    let hackCount = 0;

    let moneyThresh = ns.getServerMaxMoney(target) * moneyCap;
    let securityThresh = ns.getServerMinSecurityLevel(target) + securityCap;

    // Attack target
    while (true) {
        //ns.toast(weakenCount + " Weakens " + growCount + " Grows " + hackCount + " Hacks for " + target + " by " + attacker)
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
            weakenCount++;
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target);
            growCount++;
        } else {
            await ns.hack(target);
            hackCount++;
        };
    };
}