import Game from '../model/Game.js';
import IntroControlListener from './controls/IntroControlListener.js';
import IntroView from '../ui/IntroView.js';
import LevelControlListener from './controls/LevelControlListener.js';
import LevelView from '../ui/LevelView.js';
import MapControlListener from './controls/MapControlListener.js';
import MapView from '../ui/MapView.js';
import SoundEngine from './SoundEngine.js';

class GameEngine {
	constructor (window, document, canvas, volumeInput, debugInput) {
		this.document = document;
		this.canvas = canvas;
		this.game = new Game();
		this.mapView = new MapView(window, canvas, this.game.world, this.game.character);
		this.view = new IntroView(window, canvas);
		this.mapControlListener = new MapControlListener(document, this.game, () => this.enterLevel());
		this.controlListener = new IntroControlListener(document, this.game, () => this.exitToMap());
		
		volumeInput.value = JSON.parse(localStorage.volume) || GameEngine.DEFAULT_GAIN;
		this.soundEngine = new SoundEngine(document, volumeInput.value);
		this.isDebug = debugInput.checked = JSON.parse(localStorage.isDebug) || GameEngine.DEFAULT_DEBUG;

		debugInput.addEventListener('input', (event) => {
			localStorage.isDebug = event.target.checked;
			this.isDebug = event.target.checked;
		});

		volumeInput.addEventListener('input', (event) => {
			localStorage.volume = event.target.value;
			this.soundEngine.setVolume(event.target.value);
		});
	}

	async start() {
		const framerate = 1000/GameEngine.FPS;
		const dt = 5; // fixed simulation chunk size in milliseconds
		let accumulator = 0; // store remaining miliseconds (< dt) to simulate after next frame
		let lastTime = 0;

		this.controlListener.start();

		await this.soundEngine.loadAllSounds();
		this.soundEngine.playAudio('INTRO', true);

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
				this.view.render(this.isDebug);
			} catch (error) {
				clearInterval(interval);
				console.error(error);
			}
		}, framerate);   
	}

	enterLevel() {
		const level = this.game.enterCurrentLevel();
		if (!level) {
			return;
		}
		this.view = new LevelView(this.window, this.canvas, level, this.game.character);
		this.controlListener.stop();
		this.controlListener = new LevelControlListener(document, this.game, () => this.exitToMap());
		this.controlListener.start();
		this.soundEngine.stopAll();
		this.soundEngine.playAudio('LEVEL_1', true);
	}

	exitToMap() {
		this.game.exitCurrentLevel();
		this.view = this.mapView;
		this.controlListener.stop();
		this.controlListener = this.mapControlListener;
		this.controlListener.start();
		this.soundEngine.stopAll();
		this.soundEngine.playAudio('MAP', true);
	}

	simulate(dt) {
		this.controlListener.handleInputs();
		this.game.simulate(dt);
	}
}

GameEngine.DEFAULT_DEBUG = false;
GameEngine.DEFAULT_GAIN = 0.25;
GameEngine.FPS = 60;

export default GameEngine;
