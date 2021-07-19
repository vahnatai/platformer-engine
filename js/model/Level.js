class Level {
	constructor(id, x, y, isSecret, paths) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.isSecret = isSecret;
		this.paths = paths;
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
			minY: 20,
			maxX: 800,
			maxY: 600,
		};
	}
}

export default Level;
