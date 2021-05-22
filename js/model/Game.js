import Character from './Character.js';
import World from './World.js';

class Game {
	constructor() {
		this.world = new World();
		const {id: levelId, x: startX, y: startY} = this.world.getStartPosition();
		this.character = new Character(startX, startY, levelId);
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
		const levelId = this.character.getCurrentLevelID();
		if (!levelId) return;
		const level = this.world.getLevel(levelId);
		if (!level) return;
		this.currentLevel = level;
		const {x, y} = level.getStartCoords();
		this.character.setPosition(x, y);
		return level;
	}

	exitCurrentLevel() {
		if (this.currentLevel) {
			const {x, y} = this.currentLevel;
			this.character.setPosition(x, y);
		}
		this.currentLevel = null;
	}

	getPathToWorldDirection(direction) {
		// get current available directions
		const paths = this.world.getAllDirections(this.character.getCurrentLevelID());
		return paths[direction];
	}

	startWorldPath(destination) {
		const {id, x, y} = this.world.getLevel(destination.id);
		this.character.startOnVector(x, y, id);
	}
}

export default Game;
