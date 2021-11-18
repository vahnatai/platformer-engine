import Shape from './Shape.js';

class RectangleShape extends Shape {
	constructor(position, width, height) {
		super(position);
		this.width = width;
		this.height = height;
	}

	intersectX(x) {
		return (this.x - this.width/2 <= x) && (this.x + this.width/2 >= x);
	}
	
	intersectY(y) {
		return (this.y - this.height/2 <= y) && (this.y + this.height/2 >= y);
	}
	
	getHeight() {
		return this.height;
	}
	
	getWidth() {
		return this.width;
	}
}

export default RectangleShape;
