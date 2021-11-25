import Entity from './Entity.js';
import RectangleShape from '../shape/RectangleShape.js';
import Vector from '../Vector.js';

class Platform extends Entity {
	constructor(x, y, width) {
		super('platform', new RectangleShape(new Vector(x, y), width, Platform.HEIGHT));
	}

	collide(that) {
		if (
			that.velocity.y > 0
			&& that.position.y + (that.getBoundingShape().getHeight()/2) < this.position.y + Platform.MOUNT_THRESHOLD_PX
		) {
			that.velocity.y = 0;
			that.position.y = this.position.y - that.getBoundingShape().getHeight();
			that.onCollideEntity(this, true);
		}
	}
}
Platform.HEIGHT = 40;
Platform.MOUNT_THRESHOLD_PX = 10;

export default Platform;
