import Game from './model/Game.js';
import LevelView from './ui/LevelView.js';
import LevelControlListener from './LevelControlListener.js';
import MapControlListener from './MapControlListener.js';
import MapView from './ui/MapView.js';

class GameEngine {
	constructor (window, document, canvas) {
		this.document = document;
		this.canvas = canvas;
		this.game = new Game();
		this.mapView = new MapView(window, canvas, this.game.world, this.game.character);
		this.view = this.mapView;
		this.mapControlListener = new MapControlListener(document, this.game, () => this.enterLevel());
		this.controlListener = this.mapControlListener;
	}

	start() {
		const framerate = 1000/GameEngine.FPS;
		const dt = 10; // fixed simulation chunk size in milliseconds
		let accumulator = 0; // store remaining miliseconds (< dt) to simulate after next frame
		let lastTime = 0;

		this.controlListener.start();

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
		const level = this.game.getCurrentLevel();
		if (!level) {
			return;
		}
		this.view = new LevelView(this.window, this.canvas, level, this.game.character);
		this.controlListener.stop();
		this.controlListener = new LevelControlListener(document, this.game, () => this.exitLevel());
		this.controlListener.start();
	}

	exitLevel() {
		this.view = this.mapView;
		this.controlListener.stop();
		this.controlListener = this.mapControlListener;
		this.controlListener.start();
	}

	simulate(dt) {
		this.controlListener.handleInputs();

		// handle simulation
		this.game.character.computeWorldMovement(dt);
	}
}

GameEngine.FPS = 60;

export default GameEngine;
