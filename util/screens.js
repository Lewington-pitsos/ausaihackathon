import { parse, type, prompt, input, setFast } from "./io.js";
import pause from "./pause.js";
import alert from "./alert.js";
import say from "./speak.js";

const USER = "admin";
const PW = "admin";

function getRoot() {
	return window.location.href.split('?')[0]}

async function typeMenu() {
	const root_url = getRoot();
	type("* Home", {link: root_url})
	type("* Agenda", {link: root_url + "?goto=agenda"})
	type("* Rules", {link: "https://docs.google.com/document/d/1abkNEVxZPYhryMBUHb5sK_n7RmC18bOE72hYEcU2duw/edit?usp=sharing", new_tab: true})
	type("* Hack Day Tickets", {link: "https://events.humanitix.com/ai-hack-melb-2023-kickoff-event", new_tab: true})
	type("* Pitch Night Tickets", {link: "https://events.humanitix.com/ai-hack-melb-2023-pitch-night", new_tab: true})
	type("* Judges", {link: root_url + "?goto=judges"})
	type("* Connect", {link: root_url + "?goto=connect"})
	await type("* FAQ", {link: root_url + "?goto=faq"})
}


async function typeMail() {
	await type("hello@aihackmelb.com", {link: "mailto:hello@aihackmelb.com"})
}

async function doubleNewline() {
	await type(["\n", "\n"], {});
}


async function newline() {
	await type("\n", {});
}

async function typeConnect() {
	await doubleNewline()
	await type(">>> Drop us a line <<<", {})
	await newline()	

	type("Slack", {link: "https://join.slack.com/t/aihackmelb/shared_invite/zt-215zeikhf-oUSpUTm8l43MLEPnNVLrYA", new_tab: true})
	type("EOI Form", {link: "https://docs.google.com/forms/d/e/1FAIpQLScrKz6S-mzDuShW9lmFkG2EtjdxFIvpEHTkCLjIVqTQ4xxpGw/viewform", new_tab: true})
	typeMail();
	type("ML/AI Meetup", {link: "https://www.meetup.com/en-AU/machine-learning-ai-meetup/", new_tab: true})
	type("Website Repo", {link: "https://github.com/Lewington-pitsos/ausaihackathon", new_tab: true})
	type("Twitter", {link: "https://twitter.com/mlaiaus", new_tab: true})

	await doubleNewline()
}

const faq_content = `

>>> FAQ <<<

Q: How does it work?
A: You form a team (or bring one) on nov 18th,
   then you have a week to build an AI system
   which solves an Australian Problem.
   On nov 25th you submit a video demo and 
   your code. Finalists will be invited to 
   pitch to 4 highly experienced judges 
   and an audience of 300 on nov 30th. 
   
Q: Who is this for? 
A: Anyone who wants to:
 - Get hands-on experience with ML/AI tools
 - Solve an actual real world problem
 - Meet other smart coders
 - Get hired maybe
`.split('\n').map(line => line === "" ? "\n" : line)


async function typeAgenda() {
	await newline()

	type(">>> Nov 18th: Kickoff <<<", {}),
	type("Eliiza, Level 2/452 Flinders St", {link: "https://www.google.com/maps/place/Eliiza/@-37.8194277,144.9585291,15z/data=!4m2!3m1!1s0x0:0x841578e120915922?sa=X&ved=2ahUKEwi4s_-5-a-AAxXSxjgGHaQiD3sQ_BJ6BAg9EAA&ved=2ahUKEwi4s_-5-a-AAxXSxjgGHaQiD3sQ_BJ6BAhCEAg", new_tab: true});
	type("1100 - Keynote", {}),
	type("1130 - Team Formation", {}),
	type("1330 - Lunch Break", {}),
	await type("1830 - Event Close, Pub", {})
	await newline()

	type(">>> Nov 25th: Submission <<<", {}),
	await type("1700 - Submit Code + Demo online", {}),
	await newline()

	type(">>> Nov 26th: First Round Results <<<", {}),
	await type("1800 - Finalists Announced", {}),
	await newline()

	type(">>> Nov 30th: Pitch Night <<<", {})
	type("The NAB Arena, 700 Bourke St", {link: "https://www.google.com/maps/place/700+Bourke+St,+Docklands+VIC+3008/@-37.8173415,144.9465557,17z/data=!3m1!4b1!4m6!3m5!1s0x6ad65d454d0fd20d:0x71357e4ac4ec2a28!8m2!3d-37.8173458!4d144.949136!16s%2Fg%2F11b8v7mns3?entry=ttu", new_tab: true});
	type("1730 - Snacks + Networking", {})
	type("1800 - Pitches", {})
	type("1900 - Judging + Keynote", {})
	type("1930 - Winners Announced", {})
	await type("1945 - Event Close, Pub", {})
	await doubleNewline()
}

async function typeMainPage() {

	await newline()

	await type("Solve an Aussie Problem with AI ", {})
	await newline()

	type("You have one week to form a team and use", {})
	type("open source tools to build a machine", {})
	type("learning system which solves an aussie", {})
	await type("problem", {})
	await newline()

	type("The best solutions will be invited to", {})
	type("present to our judges at a 300 person", {})
	await type("pitch night hosted by NAB", {})
	await newline()

	type("The winner will receive notoriety, immense", {})
	await type("kudos and a share $5000 worth of prizes", {})
	await newline()

	await type("get on it cobber", {link: "https://events.humanitix.com/ai-hack-melb-2023-kickoff-event", new_tab: true})
	await newline()
}

async function typeFAQ() {
	await type(faq_content, {});
	await type("see the event slack for more", {link: "https://join.slack.com/t/aihackmelb/shared_invite/zt-215zeikhf-oUSpUTm8l43MLEPnNVLrYA", new_tab: true});
	await newline()
}

async function typeRules() {
	await type('rules', {link: "https://docs.google.com/document/d/1abkNEVxZPYhryMBUHb5sK_n7RmC18bOE72hYEcU2duw/edit?usp=sharing", new_tab: true})
}

const pages = new Map([
	['faq', typeFAQ],
	['rules', typeRules],
	['agenda', typeAgenda],
	['connect', typeConnect],
	['home', typeMainPage]
])

/** Boot screen */
async function boot(page) {
	clear();

	var skipListener = function() {
		setFast(true);
	};

	var keySkipListener = function(e) {
		if (e.key === 'Enter') {
			setFast(true);
		} else if (e.key === 'Escape') {
			setFast(true);
		}
	}


	const judgesHolder = document.getElementById('judges-holder');
	const terminal = document.querySelector(".terminal")
	if (page == 'judges') {
		
		judgesHolder.classList.remove("hidden");
		terminal.classList.add("hidden");
	} else {
		terminal.classList.remove("hidden");
		judgesHolder.classList.add("hidden");

		window.addEventListener('click', skipListener, false);
		window.addEventListener('keypress', keySkipListener, false);
	

		await type("***** A.I. Hack 2023 *****", {});

		if (!pages.has(page)) {
			await typeMainPage()
		} else {
			await pages.get(page)()
		}

		await typeMenu(page)
		await newline()

		
		window.removeEventListener('click', skipListener, false);
		window.removeEventListener('keypress', keySkipListener, false);

	}

	setFast(false);
}



/** Login screen */
async function login() {
	clear();
	let user = await prompt("Username:");
	let password = await prompt("Password:", true);

	if (user === USER && password === PW) {
		await pause();
		say("AUTHENTICATION SUCCESSFUL");
		await alert("AUTHENTICATION SUCCESSFUL");
		clear();
		return main();
	} else {
		await type([
			"Incorrect user and/or password.",
			"Please try again"
		]);
		await pause(3);
		clear();
		return login();
	}
}

/** Main input terminal, recursively calls itself */
async function main() {
	let command = await input();
	try {
		var clientHeight = document.getElementById('main-terminal').clientHeight;
		if (screen.height - clientHeight < 250) {
			clear();	
		}

		const lower = command.toLowerCase()

		if (pages.has(lower)) {
			clear();
			await type("***** A.I. Hack 2023 *****", {});
			await pages.get(lower)()
			await typeMenu(lower)
			await newline()
			return
		}

		await parse(command);
	} catch (e) {
		if (e.message) await type(e.message, {}, document.querySelector(".terminal"));
	}

	main();
}

function addClasses(el, ...cls) {
	let list = [...cls].filter(Boolean);
	el.classList.add(...list);
}

function hideSidebar() {
	document.querySelector(".sidebar").classList.add("hidden");
}

function showSidebar() {
	document.querySelector(".sidebar").classList.remove("hidden");
}

function getScreen(...cls) {
	let div = document.createElement("div");
	addClasses(div, "fullscreen", ...cls);
	document.querySelector("#crt").appendChild(div);
	return div;
}

function toggleFullscreen(isFullscreen) {
	document.body.classList.toggle("fullscreen", isFullscreen);
}

/** Attempts to load template HTML from the given path and includes them in the <head>. */
async function loadTemplates(path) {
	let txt = await fetch(path).then((res) => res.text());
	let html = new DOMParser().parseFromString(txt, "text/html");
	let templates = html.querySelectorAll("template");

	templates.forEach((template) => {
		document.head.appendChild(template);
	});
}

/** Clones the template and adds it to the container. */
async function addTemplate(id, container, options = {}) {
	let template = document.querySelector(`template#${id}`);
	if (!template) {
		throw Error("Template not found");
	}
	// Clone is the document fragment of the template
	let clone = document.importNode(template.content, true);

	if (template.dataset.type) {
		await type(clone.textContent, options, container);
	} else {
		container.appendChild(clone);
	}

	// We cannot return clone here
	// https://stackoverflow.com/questions/27945721/how-to-clone-and-modify-from-html5-template-tag
	return container.childNodes;
}

/** Creates a new screen and loads the given template into it. */
async function showTemplateScreen(id) {
	let screen = getScreen(id);
	await addTemplate(id, screen);
	return screen;
}

/**
 * Creates an element and adds it to the given container (or terminal screen if undefined).
 * @param {String} type The type of element to create.
 * @param {Element} container The container to add the created element to.
 * @param {String} cls The class to apply to the created element.
 * @param {Object} attrs Extra attributes to set on the element.
 */
function el(
	type,
	container = document.querySelector(".terminal"),
	cls = "",
	attrs
) {
	let el = document.createElement(type);
	addClasses(el, cls);

	container.appendChild(el);

	if (attrs) {
		Object.entries(attrs).forEach(([key, value]) => {
			el.setAttribute(key, value);
		});
	}
	return el;
}

/**
 * Creates a <div> and adds it to the screen.
 * @param {Element} container The container to add the created element to.
 * @param {String} cls The class to apply to the created element.
 */
function div(...args) {
	return el("div", ...args);
}

function clear(screen = document.querySelector(".terminal")) {
	screen.innerHTML = "";
	const interactive = document.querySelector(".terminal");
	interactive.innerHTML = "";
}

export {
	boot,
	login,
	main,
	clear,
	getScreen,
	toggleFullscreen,
	div,
	el,
	loadTemplates,
	addTemplate,
	showTemplateScreen,
	hideSidebar,
	showSidebar
};
