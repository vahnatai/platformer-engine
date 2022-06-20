import Entity from './Entity.js';
import RectangleShape from '../shape/RectangleShape.js';
import Vector from '../Vector.js';

class Objective extends Entity{
	constructor(x, y, currentLevel, pathNumber) {
		super('character', new RectangleShape(new Vector(x, y), Objective.WIDTH, Objective.HEIGHT));
		this.currentLevel = currentLevel;
		this.pathNumber = pathNumber;
	}

	collide() {
		this.currentLevel.complete();
		const path = this.currentLevel.paths[this.pathNumber];
		if (path) {
			path.reveal();
		}
	}
}
Objective.WIDTH = 25;
Objective.HEIGHT = 25;

export default Objective;
