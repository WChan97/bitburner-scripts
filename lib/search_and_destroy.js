/** @param {NS} ns **/
export async function main(ns) {
	ns.toast("search_and_destory.js start.");
	// Ima tell you right now I really really like this script.
	let targets = ns.scan(ns.getHostname());
	let attackRam = ns.getScriptRam("/lib/attack_target.js");
	let attackCount = 0;
	let bestTarget = String(ns.read("best_target.txt")); // from status_report.js
	//ns.toast("Found: " + targets);
	let i = 0;
	let exePorts = [false, false, false, false, false, false];
	let exeCount = 0;
	let playerServers = ns.getPurchasedServers().length;

	if (playerServers > 0) {
		exePorts[0] = true;
	};
	if (ns.fileExists("BruteSSH.exe")) {
		exePorts[1] = true;
		exeCount++;
	};
	if (ns.fileExists("FTPCrack.exe")) {
		exePorts[2] = true;
		exeCount++;
	};
	if (ns.fileExists("relaySMTP.exe")) {
		exePorts[3] = true;
		exeCount++;
	};
	if (ns.fileExists("HTTPWorm.exe")) {
		exePorts[4] = true;
		exeCount++;
	};
	if (ns.fileExists("SQLInject.exe")) {
		exePorts[5] = true;
		exeCount++;
	};
	//ns.toast(exeCount + " Port busters owned.");

	for (i = 0; i < targets.length; i++) {
		let serv = targets[i];
		let servRam = ns.getServerMaxRam(serv);
		let threads = 1;

		if (ns.getServerNumPortsRequired(serv) <= exeCount && serv != "home") {
			// So long as we have more exes than the required start port busting.
			if (!ns.hasRootAccess(serv)) {
				if (exePorts[1]) {
					ns.brutessh(serv);
				};
				if (exePorts[2]) {
					ns.ftpcrack(serv);
				};
				if (exePorts[3]) {
					ns.relaysmtp(serv);
				};
				if (exePorts[4]) {
					ns.httpworm(serv);
				};
				if (exePorts[5]) {
					ns.sqlinject(serv);
				};
				ns.nuke(serv);
				ns.toast("Nuked: " + serv);
			};

			if (ns.hasRootAccess(serv)) {
				// Run Search and Rescue for .lit files
				ns.exec("/lib/search_and_rescue.js", "home", 1, serv);
				await ns.sleep(10);

				if (servRam > attackRam) {
					// If the server is capable of attacking, well... attack.
					attackCount++;
					await ns.scp("/lib/attack_target.js", serv);
					threads = Math.floor(servRam / attackRam);
					ns.exec("attack_target.js", serv, threads, bestTarget);
					//ns.toast("Attacking " + bestTarget +  " from " + serv + " with " + threads + " threads");
				};
			};
		};
		// Same recursive scan from Status Report
		let newScan = ns.scan(serv);
		for (let j = 0; j < newScan.length; j++) {
			if (targets.indexOf(newScan[j]) == -1) {
				targets.push(newScan[j]);
			};
		};
	};

	if (i == targets.length) {
		ns.tprint(i + " targets rooted and " + attackCount + " attacking " + bestTarget);
	} else {
		ns.tprint(i + "does not match targets.length " + targets.length);
	};

	ns.tprint("search_and_destory.js complete.");
}