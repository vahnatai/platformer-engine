class Level {
	constructor(id, x, y, isSecret, paths) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.isSecret = isSecret;
		this.paths = paths;
	}

	getStartCoords() {
		return {x: 50, y: 580};
	}

	getFloorHeight() {
		return 20;
	}
}

export default Level;
