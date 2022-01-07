/** @param {NS} ns **/
export async function main(ns) {
	ns.toast("temporary_duty.js start.");
	// This uses the same method for calculating threads as from Search and Destroy
	let bestTarget = String(ns.read("best_target.txt"));
	let homeRam = (ns.getServerMaxRam("home") - ns.getServerUsedRam("home"));
	let attackRam = ns.getScriptRam("/lib/attack_target.js");
	let threads = Math.floor(homeRam / attackRam);

	let response = await ns.prompt("You have " + homeRam + "RAM at home, would you like to run attack_target.js?");

	if (response) {
		ns.tprint("Attacking " + bestTarget + " with " + threads + " threads from home.");
		ns.exec("/lib/attack_target.js", "home", threads, bestTarget);
	} else {
		ns.toast("Understood");
	};

	ns.tprint("temporary_duty.js complete.");
}