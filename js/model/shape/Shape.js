import Vector from '../Vector.js';

class Shape {
	constructor(position) {
		if (this.target === Shape) {
			throw new TypeError('Cannot directly instantiate abstract class Shape');
		}
		this.position = position;
	}

	// intersectX() {}

	// intersectY() {}

	// getWidth() {}

	// getHeight() {}

	intersect(shape2) {
		return Shape.intersect(this, shape2);
	}
}

Shape.intersect = (shape1, shape2) => {
	// TODO remove constructor name checks and maybe move some of this to subclasses
	if (shape1.constructor.name === 'CircleShape' && shape2.constructor.name === 'CircleShape') {
		//circle-circle intersection test
		return shape1.position.subtract(shape2.position).getLength() <= shape1.radius + shape2.radius;
	}

	if (shape1.constructor.name === 'RectangleShape' && shape2.constructor.name === 'RectangleShape') {
		//rectangle-rectangle intersection test
		return !(shape1.position.x > shape2.position.x + shape2.getWidth() || shape1.position.x + shape1.getWidth() < shape2.position.x 
				|| shape1.position.y > shape2.position.y + shape2.getHeight() || shape1.position.y + shape1.getHeight() < shape2.position.y);
	}
	var circle, rectangle;
	if (shape1.constructor.name === 'CircleShape' && shape2.constructor.name === 'RectangleShape') {
		circle = shape1;
		rectangle = shape2;
	} else if (shape1.constructor.name === 'RectangleShape' && shape2.constructor.name === 'CircleShape') {
		circle = shape2;
		rectangle = shape1;
	} else {
		// can't do anything
		throw 'Unrecognized shape!';
	}
	//circle-rectangle intersection test
	var circleDistance = new Vector(Math.abs(circle.position.x - rectangle.position.x),
		Math.abs(circle.position.y - rectangle.position.y));
	
	// eliminate situations where they are just too far away
	if (circleDistance.x > (rectangle.width/2 + circle.r)) { return false; }
	if (circleDistance.y > (rectangle.height/2 + circle.r)) { return false; }
	
	// given we passed the above, check situations where they now MUST touch
	if (circleDistance.x <= (rectangle.width/2)) { return true; } 
	if (circleDistance.y <= (rectangle.height/2)) { return true; }

	const cornerDistance_sq = (circleDistance.x - rectangle.width/2)^2 +
		(circleDistance.y - rectangle.height/2)^2;
	return (cornerDistance_sq <= (circle.r^2));
}; 

export default Shape;
