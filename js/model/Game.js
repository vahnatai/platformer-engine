import Character from './entity/Character.js';
import CharacterEventListener from '../engine/event/CharacterEventListener.js';
import World from './World.js';

class Game {
	constructor(onLevelCompletion) {
		this.world = new World(onLevelCompletion);
		const {level, x: startX, y: startY} = this.world.getStartPosition();
		this.character = new Character(startX, startY, level);
		this.currentLevel = null;
		this.isPaused = false;
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
		this.character.addEventListener(new CharacterEventListener(this.character));
		if (!level) return;
		this.character.setAcceleration(0, Character.GRAVITY * Character.PIXELS_PER_METER);
		this.currentLevel = level;
		const {x, y} = level.getStartCoords();
		this.character.setPosition(x, y);
		return level;
	}

	exitCurrentLevel() {
		if (!this.currentLevel) return;
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
}

export default Game;
