
import { type } from "./util/io.js";
import { boot } from "./util/screens.js";

async function onLoad() {
	// Check for query parameters in the URL, e.g. ?command=help&fullscreen=1
	const urlParams = new URLSearchParams(window.location.search);
	const command = urlParams.get("command");
	const debugParam = urlParams.get("debug");

	const pageHref = window.location.search;
	const searchParams = new URLSearchParams(pageHref.substring(pageHref.indexOf('?')));

	await boot(searchParams.get('goto'));
	const { main } = await import("./util/screens.js");
	main();

	// If a command is passed in the URL, execute that immediately
}

async function run(command, debug) {
	const { power } = await import("./util/power.js");
	const { parse } = await import("./util/io.js");

	// Turns on the screen
	power();

	// Run the command (setting debug param will skip typing the command)
	if (command) {
		if (!debug) {
			await type("> " + command, { initialWait: 3000, finalWait: 1500 });
		}
		await parse(command);
	}

	// After the command is finished, show the main terminal
	const { main } = await import("./util/screens.js");
	main();
}

window.addEventListener("load", onLoad);