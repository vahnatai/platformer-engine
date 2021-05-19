import ControlListener from './ControlListener.js';
import Game from './model/Game.js';
import LevelView from './ui/LevelView.js';
import MapView from './ui/MapView.js';

class GameEngine {
	constructor (window, document, canvas) {
		this.document = document;
		this.canvas = canvas;
		this.game = new Game();
		this.mapView = new MapView(window, canvas, this.game.world, this.game.character);
		this.view = this.mapView;
		this.controlListener = new ControlListener();

		const onDirection = (direction) => {
			// get current available directions
			const paths = this.game.world.getAllDirections(this.game.character.currentLevel);
			const dest = paths[direction];

			if (dest) {
				const {id, x, y} = this.game.world.getLevel(dest.id);
				this.game.character.startOnVector(x, y, id);
			}
		};

		this.controlListener.setOnLeft(() => onDirection('left'));
		this.controlListener.setOnUp(() => onDirection('up'));
		this.controlListener.setOnRight(() => onDirection('right'));
		this.controlListener.setOnDown(() => onDirection('down'));
		this.controlListener.setOnChoose(() => this.enterLevel());
	}

	start() {
		const framerate = 1000/GameEngine.FPS;
		const dt = 10; // fixed simulation chunk size in milliseconds
		let accumulator = 0; // store remaining miliseconds (< dt) to simulate after next frame
		let lastTime = 0;

		this.controlListener.registerKeyListeners(document);

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
		const levelId = this.game.character.getCurrentLevel();
		if (!levelId) {
			return;
		}
		const level = this.game.world.getLevel(levelId);
		this.view = new LevelView(this.window, this.canvas, level, this.game.character);
	}

	simulate(dt) {
		this.controlListener.handleInputs();

		// handle simulation
		this.game.character.computeWorldMovement(dt);
	}
}

GameEngine.FPS = 60;

export default GameEngine;
