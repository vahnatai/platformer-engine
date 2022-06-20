import Objective from './entity/Objective.js';
import Platform from './entity/Platform.js';
import Path from './Path.js';

class Level {
	constructor(id, x, y, isSecret, paths, onCompletion) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.isSecret = isSecret;

		this.paths = paths.map(path => new Path(...Object.values(path)));
		this.onCompletion = onCompletion;
	}

	getGeometry() {
		return [
			new Platform(200, 500, 100),
			new Platform(700, 500, 100),
			new Platform(1200, 500, 100),
			new Platform(1700, 500, 100),
			
			new Platform(450, 375, 100),
			new Platform(1000, 375, 100),
			new Platform(1500, 375, 100),

			new Platform(100, 250, 100),

			new Platform(1100, 150, 1500),
		];
	}

	getObjectives() {
		const objectives = [new Objective(1820, 510, this, 0)];
		if (this.paths.length > 1) {
			objectives.push(new Objective(1820, 110, this, 1));
		}
		return objectives;
	}

	getStartCoords() {
		return {x: 500, y: 540};
	}

	getFloorHeight() {
		return 20;
	}

	getBounds() {
		return {
			minX: 0,
			minY: 0,
			maxX: 2000,
			maxY: 580,
		};
	}

	complete() {
		console.log('level complete!');
		this.onCompletion();
	}
}

export default Level;
