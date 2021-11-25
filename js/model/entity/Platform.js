import Entity from './Entity.js';
import RectangleShape from '../shape/RectangleShape.js';
import Vector from '../Vector.js';

class Platform extends Entity {
	constructor(x, y, width) {
		super('platform', new RectangleShape(new Vector(x, y), width, Platform.HEIGHT));
	}
}
Platform.HEIGHT = 40;

export default Platform;
