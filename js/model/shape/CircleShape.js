import Shape from './Shape.js';

class CircleShape extends Shape {
	constructor(position, radius) {
		super(position);
		this.radius = radius;
	}

	intersectX(x) {
		return (this.x - this.radius <= x) && (this.x + this.radius >= x);
	}
	
	intersectY(y) {
		return (this.y - this.radius <= y) && (this.y + this.radius >= y);
	}
	
	getHeight() {
		return this.radius*2;
	}
	
	getWidth() {
		return this.radius*2;
	}
}

export default CircleShape;
