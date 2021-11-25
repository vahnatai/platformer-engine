import Platform from './entity/Platform.js';

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
			new Platform(200, 500, 100),
			new Platform(600, 500, 100),
			new Platform(1000, 500, 100),
			new Platform(1400, 500, 100),
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
