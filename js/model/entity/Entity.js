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

	isColliding(that) {
		return this.getBoundingShape().intersect(that.getBoundingShape());
	}

	getBoundingShape() {
		return this.shape;
	}

	collide(that) {
		var delta = this.position.subtract(that.position);
		var d = delta.getLength();
		// minimum translation distance
		var mtd = delta.multiplyScalar(((this.radius + that.radius)-d)/d);
		
		// push-pull them apart based off their mass
		this.position = this.position.add(mtd.multiplyScalar(0.5));
		that.position = that.position.subtract(mtd.multiplyScalar(0.5));

		// impact speed
		var v = (this.velocity.subtract(that.velocity));
		var vn = v.dotProduct(mtd.normalized());
		
		// sphere intersecting but moving away from each other already
		if (vn > 0.0) {
			return;
		}
		// collision impulse
		var i = (-(1.0) * vn) / 2.0;
		var impulse = mtd.normalized().multiplyScalar(i);

		// change in momentum
		this.velocity = this.velocity.add(impulse);
		that.velocity = that.velocity.subtract(impulse);
	}
}

export default Entity;
