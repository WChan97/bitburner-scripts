/** @param {NS} ns **/
export async function main(ns) {
	/* Init */
	let ram = 16;
	let attackRam = ns.getScriptRam("/lib/attack_target.js");
	let threads = 0;
	let currentServers = ns.getPurchasedServers();
	let servName = "myServer-X";
	let servCount = 0;
	let bestTarget = String(ns.read("best_target.txt"));
	const maxNumServ = ns.getPurchasedServerLimit();
	const maxHomeMoney = ns.getServerMoneyAvailable("home") / maxNumServ;
	let costPerRam = ns.getPurchasedServerCost(ram) / ram;
	const maxRam = ns.getPurchasedServerMaxRam();

	// Calculate highest ram we can buy.
	// This is done by gradually increasing the ram when the money we have is capable of buying 25 servers of the given ram cost.
	// If the ram exceeds the maximum buyable then set it back to the highest.
	if (maxHomeMoney > costPerRam * ram) {
		ram = ram * 2;

		while (maxHomeMoney > costPerRam * ram) {
			ram = ram * 2;
		};
		ram = ram / 2;
	};

	if (ram > maxRam) {
		ram = maxRam;
	};

	// We then calculate how many threads we can run our attack script with the ram possible.
	threads = Math.floor(ram / attackRam);
	let costOfRam = ns.getPurchasedServerCost(ram) / ram;
	let response = await ns.prompt("Would you like to buy 25 new " + ram + "GB RAM myServers at $" + costOfRam + " each?");

	if (response) {
		if (currentServers.length > 0) {
			for (let i = 0; i < currentServers.length; ++i) {
				let currentRam = ns.getServerMaxRam(currentServers[i]);
				let serv = currentServers[i];
				if (currentRam < ram) {
					// If the current server's ram is less than what we plan to buy, remove them.
					ns.killall(serv);
					ns.deleteServer(serv);
					servCount++;
				};
			};
			ns.tprint("Removed " + servCount + " myServer with lesser RAM");
		};
		
		currentServers = ns.getPurchasedServers();
		servCount = 0;
		while (currentServers.length < maxNumServ && servCount < maxNumServ) {
			// Now we go through the process of buying some new servers with the new ram target.
			servName = "myServer-" + servCount;
			if (!currentServers.includes(servName) && maxHomeMoney > costOfRam) {
				ns.purchaseServer(servName, ram);
				ns.toast("Bought " + servName + " with " + ram + "GB RAM");
				currentServers = ns.getPurchasedServers();
			};
			servCount++;
		};
		await ns.sleep(10);
	};

	// Go through the list of currentServers and attack
	servCount = 0;
	while (servCount < maxNumServ) {
		servName = "myServer-" + servCount;
		if (currentServers.includes(servName)) {
			await ns.scp("/lib/attack_target.js", servName);
			ns.exec("/lib/attack_target.js", servName, threads, bestTarget); // Theres /lib/ infront of attack because it creates lib/ on my servers, I dunno why.
		};
		servCount++;
	};



	ns.tprint("Attempting to attack " + bestTarget + " with " + currentServers.length + " servers at " + threads + " threads from " + ram + "GB myServers.");
}