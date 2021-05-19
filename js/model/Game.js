import Character from './Character.js';
import World from './World.js';

class Game {
	constructor() {
		this.world = new World();
		const {id: levelId, x: startX, y: startY} = this.world.getStartPosition();
		this.character = new Character(startX, startY, levelId);
	}

	simulate(dt) {
		this.character.computeWorldMovement(dt);
	}

	getCurrentLevel() {
		const levelId = this.character.getCurrentLevel();
		if (!levelId) {
			return null;
		}
		return this.world.getLevel(levelId);
	}

	getPathToWorldDirection(direction) {
		// get current available directions
		const paths = this.world.getAllDirections(this.character.currentLevel);
		return paths[direction];
	}

	startWorldPath(destination) {
		const {id, x, y} = this.world.getLevel(destination.id);
		this.character.startOnVector(x, y, id);
	}
}

export default Game;
