import { on, off } from "./power.js";
import { click } from "../sound/index.js";
import { setVolume } from "./speak.js";
import { toggleFullscreen } from "./screens.js";

function togglePower() {
	let isOff = document.getElementById("monitor").classList.contains("off");
	if (isOff) {
		on();
	} else {
		off();
	}
}

function fly(event) {
	event.target.classList.toggle("fly");
}

function handleClick(event) {
	if (event) {
		event.preventDefault();
	}
	let input = document.querySelector("[contenteditable='true']");
	if (input) {
		input.focus();
	}
}

function handleVolume(event) {
	let value = event.target.value;
	setVolume(value);
}

function theme(event, name) {
	click();
	[...document.getElementsByClassName("theme")].forEach((b) =>
		b.classList.toggle("active", false)
	);
	event.target.classList.add("active");
	document.body.classList = "theme-" + name;
	handleClick();
}

function fullscreen(event) {
	toggleFullscreen();
	event.target.blur();
}

function globalListener({ keyCode }) {
	if (keyCode === 122) {
		// F11
		toggleFullscreen();
	} else if (keyCode === 27) {
		// ESC
		toggleFullscreen(false);
	}
}

function registerHandlers() {
	document.addEventListener("keydown", globalListener);
}

export { registerHandlers };