import Vector from '../Vector.js';

class Entity {
	constructor(typeId, shape, level) {
		this.typeId = typeId;
		this.level = level;
		this.position = shape.position.clone();
		this.velocity = new Vector(0, 0);
		this.acceleration = new Vector(0, 0);
		this.shape = shape;
	}
}

export default Entity;
