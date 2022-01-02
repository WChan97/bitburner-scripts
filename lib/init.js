export async function main(ns) {
	const repoUrl = "https://raw.githubusercontent.com/WChan97/bitburner-scripts/master/lib/"

	if (ns.getHostname() !== "home") {
		throw new Exception("Run the script from home");
	}

	await ns.wget(
		repoUrl,
		"startup.js"
	);
	ns.spawn("startup.js", 1);
}
