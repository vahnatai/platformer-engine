import Character from './entity/Character.js';
import GameEvent from '../engine/event/GameEvent.js';
import World from './World.js';

class Game {
	constructor(onLevelCompletion) {
		this.world = new World(onLevelCompletion);
		const {level, x: startX, y: startY} = this.world.getStartPosition();
		this.character = new Character(startX, startY, level);
		this.currentLevel = null;
		this.isPaused = false;
		this.eventListeners = [];
	}

	simulate(dt) {
		if (this.isPaused) return;
		if (this.currentLevel) {
			this.character.computeLevelMovement(this.currentLevel, dt);
		}
		else {
			this.character.computeWorldMovement(dt);
		}
	}

	enterCurrentLevel() {
		const level = this.character.getCurrentLevel();
		if (!level) return;
		this.currentLevel = level;
		this.emit(new GameEvent(GameEvent.LEVEL_ENTERED, this));

		const {x, y} = level.getStartCoords();
		this.character.setPosition(x, y);
		this.character.setAcceleration(0, Character.GRAVITY * Character.PIXELS_PER_METER);
		return level;
	}

	exitCurrentLevel() {
		if (!this.currentLevel) return;
		this.emit(new GameEvent(GameEvent.LEVEL_EXITED, this));
		const {x, y} = this.currentLevel;
		this.character.setAcceleration(0, 0);
		this.character.setPosition(x, y);
		this.character.stop();
		this.currentLevel = null;
	}

	getPathToWorldDirection(direction) {
		// get current available directions
		const paths = this.world.getAllDirections(this.character.getCurrentLevel());
		return paths[direction];
	}

	startWorldPath(destinationID) {
		const level = this.world.getLevel(destinationID);
		this.character.startWorldPath(level.x, level.y, level);
	}

	walkLeft() {
		if (this.isPaused) return;
		this.character.walkLeft();
	}

	walkRight() {
		if (this.isPaused) return;
		this.character.walkRight();
	}

	jump() {
		if (this.isPaused) return;
		this.character.jump();
	}

	stopWalking() {
		if (this.isPaused) return;
		this.character.stopWalking();
	}

	emit(event) {
		this.eventListeners.forEach(listener => listener.handleEvent(event));
	}

	addEventListener(listener) {
		this.eventListeners.push(listener);
	}

	removeEventListener(listener) {
		const index = this.eventListeners.indexOf(listener);
		if (index !== -1) {
			this.eventListeners.splice(index, 1);
		}
	}

	removeAllEventListeners() {
		this.eventListeners.length = 0;
	}
}

export default Game;
