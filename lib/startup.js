// Init player stats
var playerHackLvl = getPlayer().hacking;
// Init servers
var servers0Port = [
	"n00dles",
	"foodnstuff",
	"nectar-net",
	"sigma-cosmetics",
	"joesguns",
	"hong-fang-tea",
	"harakiri-sushi"
];
var servers1Port = [
	"zer0",
	"neo-net",
	"max-hardware",
	"iron-gym"
];
/*
var servers2Port = [
	"phantasy",
	"omega-net"
];
*/

while (playerHackLvl < 10) {
		exec("hack_template.script", "home", 90);
		playerHackLvl = 9999; //Set high so this doesn't repeat
}

while (!fileExists("BruteSSH.exe")) {
	sleep(60000);
}

// Hack'em
for (var i = 0; i < servers0Port.length; ++i) {
	var serv = servers0Port[i];
	scp("hack_template.script", serv);
	nuke(serv);
	exec("hack_template.script", serv, 6);
}

for (var i = 0; i < servers1Port.length; ++i) {
	var serv = servers1Port[i];
	scp("hack_template.script", serv);
	brutessh(serv);
	nuke(serv);
	exec("hack_template.script", serv, 12);
}

/*
for (var i = 0; i < servers2Port.length; ++i) {
	var serv = servers2Port[i];
	scp("hack_template.script", serv);

	nuke(serv);
	exec("hack_template.script", serv, 24);
}
*/