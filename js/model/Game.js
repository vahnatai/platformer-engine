import Character from './Character.js';
import World from './World.js';

class Game {
	constructor() {
		this.world = new World();
		const {level, x: startX, y: startY} = this.world.getStartPosition();
		this.character = new Character(startX, startY, level);
		this.currentLevel = null;
	}

	simulate(dt) {
		if (this.currentLevel) {
			this.character.computeLevelMovement(dt);
		}
		else {
			this.character.computeWorldMovement(dt);
		}
	}

	enterCurrentLevel() {
		const level = this.character.getCurrentLevel();
		if (!level) return;
		this.currentLevel = level;
		const {x, y} = level.getStartCoords();
		this.character.setPosition(x, y);
		return level;
	}

	exitCurrentLevel() {
		if (!this.currentLevel) return;
		const {x, y} = this.currentLevel;
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
		this.character.walkLeft();
	}

	walkRight() {
		this.character.walkRight();
	}

	jump() {
		this.character.jump();
	}

	stopWalking() {
		this.character.stop();
	}
}

export default Game;
