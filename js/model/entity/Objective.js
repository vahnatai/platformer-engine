import Entity from './Entity.js';
import RectangleShape from '../shape/RectangleShape.js';
import Vector from '../Vector.js';

class Objective extends Entity{
	constructor(x, y, currentLevel) {
		super('character', new RectangleShape(new Vector(x, y), Objective.WIDTH, Objective.HEIGHT));
		this.currentLevel = currentLevel;
	}

	collide() {
		this.currentLevel.complete();
	}
}
Objective.WIDTH = 25;
Objective.HEIGHT = 25;

export default Objective;
