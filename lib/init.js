/** @param {NS} ns **/
export async function main(ns) {
	const repoUrl = "https://raw.githubusercontent.com/WChan97/bitburner-scripts/main/";

	if (ns.getHostname() != "home") {
		throw new Exception("Run the script from home");
	};

	await ns.wget(
		repoUrl,
		"/lib/startup.js"
	);
	ns.spawn("/lib/startup.js", 1);
}