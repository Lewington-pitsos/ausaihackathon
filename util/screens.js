import { parse, type, prompt, input, setFast } from "./io.js";
import pause from "./pause.js";
import alert from "./alert.js";
import say from "./speak.js";

const USER = "admin";
const PW = "admin";

function getRoot() {
	return window.location.href.split('?')[0]}

async function typeMenue() {
	const root_url = getRoot();
	type("* Home", {link: root_url})
	type("* Sign Up", {link: root_url})
	type("* Connect", {link: root_url + "?goto=connect"})
	type("* Judges and Speakers", {link: root_url + "?goto=judges"})
	type("* Prize Tracks", {link: root_url + "?goto=prizes"})
	await type("* FAQ", {link: root_url + "?goto=faq"})
}


async function typeMainPage() {
	await type("    Solving Aussie Problems", {});

	await type("\n", {});
	await type("Location: KATHLEEN SYME Center", {});

	await newline()

	type(">>> November 11th: Kickoff <<<", {}),
	type("1100 - Keynote", {}),
	type("1130 - Team Formation", {}),
	type("1330 - Lunch Break", {}),
	type("1800 - Closing Keynote", {}),
	await type("1830 - Pub (optional)", {})
	await newline()

	type(">>> November 18th: Pitch Night <<<", {})
	type("1600 - Keynote", {})
	type("1630 - Pitches", {})
	type("1730 - Judging", {})
	type("1800 - Results", {})
	await type("1900 - Pub 2 (optional)", {})
	await doubleNewline()
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

	type("EOI Form", {link: getRoot() + "?command=help"})
	typeMail();
	type("ML/AI Meetup", {link: "https://www.meetup.com/en-AU/machine-learning-ai-meetup/"})
	type("Website Repo", {link: "https://github.com/Lewington-pitsos/ausaihackathon"})
	await doubleNewline()
}

const faq_content = `

>>> FAQ <<<

Q: How does it work?
A: You form a team (or bring one) on the 11th,
   then you have a week to build an AI project.
   On the 18th you pitch it to the judges.
   
Q: Who is this for? 
A: Anyone who wants to:
 - Battle test latest Machine Learning/AI tools
 - Meet other Machine Learning professionals
 - Win ca$h money
 - Possibly get hired by a sponsor

Q: What to I need to bring on the day?
A: Your laptop and your manners

`.split('\n').map(line => line === "" ? "\n" : line)


async function typeJudges() {
	const judges_content = `

>>> Judges and Speakers <<<

We are seeking judges and speakers. 
If you know someone with the chops, hit us up.

`
	
	await type(judges_content, {})
	await typeMail()
	await doubleNewline()
}

async function typePrizes() {
	const prizes_content = `

>>> Price Tracks <<<

We are seeking sponsors.
If you want early exposure to emerging machine
learning talent in Melbourne, let's talk.

`
	
	await type(prizes_content, {})
	await typeMail()
	await doubleNewline()
}


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

	window.addEventListener('click', skipListener, false);
	window.addEventListener('keypress', keySkipListener, false);


	await type("***** AusAI Hackathon 2023 *****", {});

	if (page === 'faq') {
		await type(faq_content, {});
	} else if (page === 'judges') {
		await typeJudges()
	} else if (page === 'prizes') {
		await typePrizes()
	} else if (page === 'connect') {
		await typeConnect();
	} else {
		await typeMainPage();
	}

	await typeMenue(page)
	await newline()

	window.removeEventListener('click', skipListener, false);
	window.removeEventListener('keypress', keySkipListener, false);

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
	showTemplateScreen
};
