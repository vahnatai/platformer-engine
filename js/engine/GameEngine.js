import Game from '../model/Game.js';
import GameEventListener from './event/GameEventListener.js';
import IntroControlListener from './controls/IntroControlListener.js';
import IntroView from '../ui/IntroView.js';
import LevelControlListener from './controls/LevelControlListener.js';
import LevelView from '../ui/LevelView.js';
import MapControlListener from './controls/MapControlListener.js';
import MapView from '../ui/MapView.js';
import SoundEngine from './SoundEngine.js';

class GameEngine {
	constructor (window, document, canvas, gameMenu, musicVolumeInput, fxVolumeInput, debugInput) {
		this.document = document;
		this.canvas = canvas;
		this.gameMenu = gameMenu;
		this.game = new Game(() => this.exitToMap());
		this.mapView = new MapView(window, canvas, this.game.world, this.game.character);
		this.view = new IntroView(window, canvas);
		this.mapControlListener = new MapControlListener(document, this.game, this, () => this.enterLevel());
		this.controlListener = new IntroControlListener(document, this.game, () => this.exitToMap());
		
		musicVolumeInput.value = localStorage.musicVolume ? JSON.parse(localStorage.musicVolume) : GameEngine.DEFAULT_GAIN;
		fxVolumeInput.value = localStorage.fxVolume ? JSON.parse(localStorage.fxVolume) : GameEngine.DEFAULT_GAIN;

		this.soundEngine = new SoundEngine(document, musicVolumeInput.value, fxVolumeInput.value);

		this.isDebug = debugInput.checked = localStorage.isDebug ? JSON.parse(localStorage.isDebug) : GameEngine.DEFAULT_DEBUG;

		debugInput.addEventListener('input', (event) => {
			localStorage.isDebug = event.target.checked;
			this.isDebug = event.target.checked;
		});

		musicVolumeInput.addEventListener('input', (event) => {
			localStorage.musicVolume = event.target.value;
			this.soundEngine.setMusicVolume(event.target.value);
		});

		fxVolumeInput.addEventListener('input', (event) => {
			localStorage.fxVolume = event.target.value;
			this.soundEngine.setFXVolume(event.target.value);
		});
	}

	async start() {
		const framerate = 1000/GameEngine.FPS;
		const dt = 5; // fixed simulation chunk size in milliseconds
		let accumulator = 0; // store remaining miliseconds (< dt) to simulate after next frame
		let lastTime = 0;

		this.controlListener.start();
		this.game.addEventListener(new GameEventListener(this.game));

		await this.soundEngine.loadAllSounds();
		this.soundEngine.playMusic('INTRO', true);

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
		this.view = new LevelView(this.window, this.canvas, this.game, level, this.game.character);
		this.controlListener.stop();
		this.controlListener = new LevelControlListener(
			document,
			this.game,
			this,
			(actionName) => {
				if (this.game.isPaused) return;
				if (actionName == 'jump' && this.game.character.isOnGround) {
					this.soundEngine.playFX('JUMP');
				}
			}
		);
		this.controlListener.start();
		this.soundEngine.stopAll();
		this.soundEngine.playMusic('LEVEL_1', true);
	}

	showMenu() {
		this.game.isPaused = true;
		this.gameMenu.classList.remove('hidden');
	}

	hideMenu() {
		this.game.isPaused = false;
		this.gameMenu.classList.add('hidden');
	}

	toggleHideMenu() {
		this.game.isPaused = !this.game.isPaused;
		this.gameMenu.classList.toggle('hidden');
	}

	exitToMap() {
		this.hideMenu();
		this.game.exitCurrentLevel();
		this.view = this.mapView;
		this.controlListener.stop();
		this.controlListener = this.mapControlListener;
		this.controlListener.start();
		this.soundEngine.stopAll();
		this.soundEngine.playMusic('MAP', true);
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
