# bitburner-scripts
Library of Netscript (Modifed Javascript) scripts for the [Bitburner](https://danielyxie.github.io/bitburner/) game.
This repository is still a work in progress.

### Installation:
Create a script called init.js within the home directory within the game.
The below script isn't working as of right now, I'll get to it later.
```sh
/** @param {NS} ns **/
export async function main(ns) {
	const repoUrl = "https://raw.githubusercontent.com/WChan97/bitburner-scripts/main/lib/";

	if (ns.getHostname() != "home") {
		throw new Exception("Run the script from home");
	};

	await ns.wget(
		repoUrl,
		"startup.js"
	);
	ns.spawn("/lib/startup.js", 1);
}
```

Then you can 
```sh
run /lib/startup.js
```
And the game plays itself. Amazing.