import RectangleShape from './shape/RectangleShape.js';

class Level {
	constructor(id, x, y, isSecret, paths) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.isSecret = isSecret;
		this.paths = paths;
	}

	getGeometry() {
		return [new RectangleShape({x: 200, y: 400}, 100, 100)];
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
			maxX: 800,
			maxY: 580,
		};
	}
}

export default Level;
