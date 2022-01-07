/** @param {NS} ns **/
// Majorly yoink'd from u/Tempest_42's 'Scan Script updated for Bitburner v1.1.0'
// Still super amazed at how slim their code is, and I'll proably see if I can rework it so I understand it better.
export async function main(ns) {
    let target = ns.args[0];
    let paths = { "home": "" };
    let queue = Object.keys(paths);
    let name;
    let output = "home; ";
    let pathToTarget = [];
    while ((name = queue.shift())) {
        let path = paths[name];
        let scanRes = ns.scan(name);
        for (let newSv of scanRes) {
            if (paths[newSv] === undefined) {
                queue.push(newSv);
                paths[newSv] = `${path},${newSv}`;
                if (newSv == target)
                    pathToTarget = paths[newSv].substr(1).split(",");
                    
            }
        }
    }

	pathToTarget.forEach(server => output += " connect " + server + ";");

	ns.tprint(output);
    
	// Below is from "Injecting HTML in the game" docs.
	// Acquire a reference to the terminal text field
	const terminalInput = document.getElementById("terminal-input");
	// Set the value to the command you want to run.
	terminalInput.value = output;
	// Get a reference to the React event handler.
	const handler = Object.keys(terminalInput)[1];
	// Perform an onChange event to set some internal values.
	terminalInput[handler].onChange({ target: terminalInput });
	// Simulate an enter press
	terminalInput[handler].onKeyDown({ keyCode: 13, preventDefault: () => null });
}

export function autocomplete(data, args) {
	return [...data.servers];
}