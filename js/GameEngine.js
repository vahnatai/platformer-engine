import Controller from './Controller.js';
import Game from './Game.js';
import LevelView from './ui/LevelView.js';
import MapView from './ui/MapView.js';

class GameEngine {
	constructor (window, document, canvas) {
		this.document = document;
		this.canvas = canvas;
		this.game = new Game();
		this.mapView = new MapView(window, canvas, this.game.world, this.game.character);
		this.view = this.mapView;
		this.controller = new Controller();
	}

	start() {
		const framerate = 1000/GameEngine.FPS;
		const dt = 10; // fixed simulation chunk size in milliseconds
		let accumulator = 0; // store remaining miliseconds (< dt) to simulate after next frame
		let lastTime = 0;

		this.document.onkeydown = (event) => {
			this.controller.onKeyDown(event);
		};

		this.document.onkeyup = (event) => {
			this.controller.onKeyUp(event);
		};

		const interval = setInterval(() => {
			var time = new Date().getTime();
			var frameTime = lastTime ? (time - lastTime) : 0;
			lastTime = time;
			accumulator += frameTime;

			try {
				// simulate what time has passed in dt-sized chunks, leave remainder for next time
				while (accumulator >= dt) {
					this.simulate(dt);
					accumulator -= dt;
				}
				this.view.render();
			} catch (error) {
				clearInterval(interval);
				console.error(error);
			}
		}, framerate);   
	}

	enterLevel() {
		const level = this.game.character.getCurrentLevel();
		this.view = new LevelView(this.window, this.canvas, level, this.game.character);
	}

	simulate(dt) {
		// get current available directions
		const paths = this.game.world.getAllDirections(this.game.character.currentLevel);
		
		// handle inputs
		const pressedKey = this.controller.getPressedKey();
		const dest = paths[pressedKey];

		if (dest) {
			const {id, x, y} = this.game.world.getLevel(dest.id);
			this.game.character.startOnVector(x, y, id);
		}
		else if (pressedKey === 'choose') {
			this.enterLevel();
		}

		// handle simulation
		this.game.character.computeWorldMovement(dt);
	}
}

GameEngine.FPS = 60;

export default GameEngine;
