/** @param {NS} ns **/
export async function main(ns) {
	if (ns.getHostname() != "home") {
		throw new Exception("Please run startup.js from home.");
	};

	await ns.tprint("Running start up.")
	// Init player stats
	var playerHackLvl = ns.getPlayer().hacking;
	var playerServers = ns.getPurchasedServers().length;
	var serverCount = 0;
	var exePorts = [false, false, false, false, false, false];
	if (playerServers > 0) {
		exePorts[0] = true;
	};
	if (ns.fileExists("BruteSSH.exe")) {
		exePorts[1] = true;
	};
	if (ns.fileExists("FTPCrack.exe")) {
		exePorts[2] = true;
	};
	if (ns.fileExists("relaySMTP.exe")) {
		exePorts[3] = true;
	};
	if (ns.fileExists("HTTPWorm.exe")) {
		exePorts[4] = true;
	};
	if (ns.fileExists("SQLInject.exe")) {
		exePorts[5] = true;
	};
	// Init servers
	var servers0Port = [
		//"n00dles",
		"foodnstuff",
		"harakiri-sushi",
		"hong-fang-tea",
		"joesguns",
		"nectar-net",
		"sigma-cosmetics",
	];
	var servers1Port = [
		"zer0",
		"neo-net",
		"max-hardware",
		"iron-gym"
	];
	var servers2Port = [
		"phantasy",
		"omega-net",
		"crush-fitness",
		"johnson-ortho",
		"silver-helix",
		"the-hub"
	];
	var servers3Port = [
		"catalyst",
		"comptek",
		"millenium-fitness",
		"netlink",
		"rho-construction",
		"rothman-uni",
		"summit-uni"
	];
	/*
	var servers4Port = [
		"aevum-police",
		"alpha-ent",
		"global-pharm",
		"lexo-corp",
		//"snap-fitness",
		//"syscore",
		"unitalife",
		"univ-energy"
	];
	var servers5Port = [
		//"aerocorp",
		//"defcomm",
		//"deltaone",
		//"galactic-cyber",
		//"icarus",
		"omnia",
		"solaris",
		"zb-institute",
		//"zeus-med"
	];
	*/
	
	ns.exec("search_and_root_targets.js", "home", 1);
	
	if (playerHackLvl <= 10) {
		ns.exec("attack_target.js", "home", 20000);
	};

	// Hack'em
	if (exePorts[0]) {
		while (serverCount < playerServers) {
			var serv = "myServer-" + serverCount;
			await ns.scp("attack_target.js", serv);
			ns.exec("attack_target.js", serv, 3);
			serverCount++;
		}
	};

	await ns.scp("attack_target.js", "n00dles");
	ns.exec("attack_target.js", "n00dles", 1);

	for (var i = 0; i < servers0Port.length; i++) {
		var serv = servers0Port[i];
		await ns.scp("attack_target.js", serv);
		ns.exec("attack_target.js", serv, 6);
	};
	// Below needs exes
	while (!exePorts[1]) {
		ns.sleep(60000);
	};

	if (exePorts[1]) {
		for (var i = 0; i < servers1Port.length; i++) {
			var serv = servers1Port[i];
			await ns.scp("attack_target.js", serv);
			ns.exec("attack_target.js", serv, 6);
		}
	};
	if (exePorts[2]) {
		for (var i = 0; i < servers2Port.length; i++) {
			var serv = servers2Port[i];
			await ns.scp("attack_target.js", serv);
			ns.exec("attack_target.js", serv, 6);
		}
	};
	if (exePorts[3]) {
		for (var i = 0; i < servers3Port.length; ++i) {
			var serv = servers3Port[i];
			await ns.scp("attack_target.js", serv);
			ns.exec("attack_target.js", serv, 6);
		}
	};
	/*
	if (exePorts[4]) {
		for (var i = 0; i < servers4Port.length; ++i) {
			var serv = servers4Port[i];
			await ns.scp("attack_target.js", serv);
			ns.exec("attack_target.js", serv, 6);
		}
	}
	if (exePorts[5]) {
		for (var i = 0; i < servers5Port.length; ++i) {
			var serv = servers5Port[i];
			await ns.scp("attack_target.js", serv);
			ns.exec("attack_target.js", serv, 6);
		}
	}
	*/
}