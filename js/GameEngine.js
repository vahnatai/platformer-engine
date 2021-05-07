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
		this.controls = {
			left: false,
			up: false,
			right: false,
			down: false,
			choose: false,
		};
	}

	start() {
		const framerate = 1000/GameEngine.FPS;
		const dt = 10; // fixed simulation chunk size in milliseconds
		let accumulator = 0; // store remaining miliseconds (< dt) to simulate after next frame
		let lastTime = 0;

		const controlActions = {};
		controlActions[GameEngine.Controls.LEFT] = (newState) => {this.controls.left = newState;};
		controlActions[GameEngine.Controls.UP] = (newState) => {this.controls.up = newState;};
		controlActions[GameEngine.Controls.RIGHT] = (newState) => {this.controls.right = newState;};
		controlActions[GameEngine.Controls.DOWN] = (newState) => {this.controls.down = newState;};
		controlActions[GameEngine.Controls.CHOOSE] = (newState) => {this.controls.choose = newState;};

		function updateControls(keyCode, newState) {
			const action = controlActions[keyCode];
			if (action) {
				action(newState);
			}
		}
		this.document.onkeydown = (event) => {
			updateControls(event.code, true);
		};

		this.document.onkeyup = (event) => {
			updateControls(event.code, false);
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
		const pressedKey = Object.keys(this.controls).filter((key) => Boolean(this.controls[key]))[0];
		this.controls[pressedKey] = false;
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
GameEngine.Controls = {
	LEFT: 'ArrowLeft',
	UP: 'ArrowUp',
	RIGHT: 'ArrowRight',
	DOWN: 'ArrowDown',
	CHOOSE: 'Space',
};

export default GameEngine;
