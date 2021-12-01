import Vector from '../model/Vector.js';

class Camera {
	constructor(level, x, y, width, height) {
		if (this.target === Camera) {
			throw new TypeError('Cannot directly instantiate abstract class Camera');
		}
		this.level = level;
		this.position = new Vector(x, y);
		this.width = width;
		this.height = height;
	}

	/**
	 *  Called on the Camera once per tick. Override to
	 *  update camera attributes.
	 */
	update() {
		//implement me to update coordinates per-tick
	}

	levelToCamera(levelPos) {
		return levelPos.subtract(this.position);
	}

	levelXToCamera(x) {
		return x - this.position.x;
	}

	levelYToCamera(y) {
		return y - this.position.y;
	}

	containsPoint(levelPos) {
		const {x, y} = levelPos;
		return this.containsX(x) && this.containsY(y);
	}

	containsX(x) {
		return (x > this.position.x - this.width/2) && (x < this.position.x + this.width/2);
	}

	containsY(y) {
		return (y > this.position.y - this.height/2) && (y < this.position.y + this.height/2);
	}

	containsShape(shape) {
		const {x, y} = shape.position;
		const width = shape.getWidth();
		const height = shape.getHeight();
		return (this.containsX(x - width/2) || this.containsX(x + width/2))
			&& (this.containsY(y - height/2) || this.containsY(y + height/2));
	}
}

export default Camera;
