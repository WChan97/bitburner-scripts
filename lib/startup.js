/** @param {NS} ns **/
export async function main(ns) {
	if (ns.getHostname() != "home") {
		throw new Exception("Please run startup.js from home.");
	};

	ns.tprint("Running start up.")

	// Run other execs.
	// Status Report is a script that compiles all the servers within the game.
	// It dumps statistics such as Ports, Ram, if I have root access etc, into a file "server_report.txt"
	// A file called "best_target.txt" is also created which is used in later scripts.
	ns.exec("/lib/status_report.js", "home", 1);
	while (ns.isRunning("/lib/status_report.js", "home")) {
		await ns.sleep(100);
	};

	// Buy Servers does exactly that, it identifies the best RAM and buys servers.
	// It will remove any servers with lesser ram than the new purchase order.
	// It will also immediately execute Attack Target on the "Best_Target.txt".
	ns.exec("/lib/buy_servers.js", "home", 1);
	while (ns.isRunning("/lib/buy_servers.js", "home")) {
		await ns.sleep(100);
	};

	// Search and Destroy goes through all the possible servers it can find, and NUKE.exe for root access.
	// Once it has root access it copies and executes Attack Target at Best Target with maximum threads.
	// After each recursive scan it will execute Search and Rescue to retrieve .lit lore files.
	ns.exec("/lib/search_and_destroy.js", "home", 1);
	while (ns.isRunning("/lib/search_and_destroy.js", "home")) {
		await ns.sleep(100);
	};
	
	// Temporary Duty notices that the home server has unused RAM
	// It asks the player if they want to attack Best Target with maximum threads.
	ns.exec("/lib/temporary_duty.js", "home", 1);
	while (ns.isRunning("/lib/temporary_duty.js", "home")) {
		await ns.sleep(100);
	};

	ns.tprint("Startup Completed.");
}