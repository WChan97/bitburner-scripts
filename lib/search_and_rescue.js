/** @param {NS} ns **/
export async function main(ns) {
	//ns.tprint("search_and_rescue.js start.");
	// Fun fact, this script was meant to be called "Copy_That.js"... yeah...
	let serv = ns.args[0];

	for (let file of ns.ls(serv)) {
		// ls the server to see if it has a file.

		if (file.includes(".cct")) {
			// Contract files can't be moved, so let me know it found it.
			ns.tprint(file + " found at " + serv);
		};

		if (!ns.fileExists(file, "home") && file.includes(".lit")) {
			// .lit files are lore files, make sure I don't have one at home
			ns.toast("Copying " + file + " from " + serv);
			await ns.scp(file, serv, "home");
		};
	};

	//ns.tprint("search_and_rescue.js complete.");
}