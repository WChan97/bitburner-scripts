/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		if (await ns.hack(ns.args[0])) {
			break;
		};
	};
}