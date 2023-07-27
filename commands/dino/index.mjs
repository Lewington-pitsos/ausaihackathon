import alert from "../../util/alert.js";
import { getScreen, clear, div, el, hideSidebar, showSidebar } from "../../util/screens.js";
import Game from './game.mjs';

function dino() {
	clear();
	hideSidebar();

	return new Promise(resolve => {
		let gameScreen = getScreen("dino");
		let container = div(gameScreen, 'dino-container');

		const onGameOver = async (score) => {
			await alert(`YOU DIED! \n Score: ${score}`)
			showSidebar();
			resolve();
		};
		
		let game = new Game({ container, onGameOver });
		game.start();
	});

}

const stylesheets = ['dino'];

export { stylesheets };

export default dino;