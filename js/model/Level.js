import RectangleShape from './shape/RectangleShape.js';
import Vector from './Vector.js';

class Level {
	constructor(id, x, y, isSecret, paths) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.isSecret = isSecret;
		this.paths = paths;
	}

	getGeometry() {
		return [
			new RectangleShape(new Vector(200, 500), 100, 50),
			new RectangleShape(new Vector(600, 500), 100, 50),
			new RectangleShape(new Vector(1000, 500), 100, 50),
			new RectangleShape(new Vector(1400, 500), 100, 50),
		];
	}

	getStartCoords() {
		return {x: 500, y: 580};
	}

	getFloorHeight() {
		return 20;
	}

	getBounds() {
		return {
			minX: 0,
			minY: 0,
			maxX: 1600,
			maxY: 580,
		};
	}
}

export default Level;
