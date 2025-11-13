import Level from './Level.js';

class World {
	constructor (onLevelCompletion) {
		const levelData = [
			{
				id: '1-1',
				x: 200,
				y: 530,
				isSecret: false,
				paths: [
					{
						destination: '1-2',
						isSecret: false,
						directionForth: 'right',
						directionBack: 'left',
					},
				],
			},
			{
				id: '1-2',
				x: 550,
				y: 530,
				isSecret: false,
				paths: [
					{
						destination: '1-3',
						isSecret: false,
						directionForth: 'right',
						directionBack: 'down',
					},
				],
			},
			{
				id: '1-3',
				x: 700,
				y: 360,
				isSecret: false,
				paths: [
					{
						destination: '1-4',
						isSecret: false,
						directionForth: 'up',
						directionBack: 'down',
					},
					{
						destination: '1-S1',
						isSecret: true,
						directionForth: 'left',
						directionBack: 'right',
					},
				],
			},
			{
				id: '1-S1',
				x: 430,
				y: 360,
				isSecret: true,
				paths: [
					{
						destination: '1-5',
						isSecret: true,
						directionForth: 'up',
						directionBack: 'down',
					},
				],
			},
			{
				id: '1-4',
				x: 690,
				y: 250,
				isSecret: false,
				paths: [
					{
						destination: '1-5',
						isSecret: false,
						directionForth: 'left',
						directionBack: 'right',
					},
				],
			},
			{
				id: '1-5',
				x: 450,
				y: 235,
				isSecret: false,
				paths: [
					{
						destination: '1-6',
						isSecret: false,
						directionForth: 'left',
						directionBack: 'right',
					},
					{
						destination: '1-S2',
						isSecret: true,
						directionForth: 'up',
						directionBack: 'right',
					},
				],
			},
			{
				id: '1-S2',
				x: 240,
				y: 90,
				isSecret: true,
				paths: [
					{
						destination: '1-7',
						isSecret: true,
						directionForth: 'left',
						directionBack: 'up',
					},
				],
			},
			{
				id: '1-6',
				x: 150,
				y: 330,
				isSecret: false,
				paths: [
					{
						destination: '1-7',
						isSecret: false,
						directionForth: 'up',
						directionBack: 'down',
					},
				],
			},
			{
				id: '1-7',
				x: 125,
				y: 220,
				isSecret: false,
				paths: [],
			},
		];
		this.levels = {};
		levelData.forEach((data) => {
			data.onCompletion = onLevelCompletion;
			this.levels[data.id] = new Level(...Object.values(data));
		});
	}

	addPath(srcLevelId, destLevelId, isSecret) {
		if (!this.levels[srcLevelId]) {
			throw new Error(`Source level "${srcLevelId}" not found for path`);
		}
		if (!this.levels[destLevelId]) {
			throw new Error(`Destination level "${destLevelId}" not found for path`);
		}
		this.levels[srcLevelId].paths.push({
			destination: destLevelId,
			isSecret,
		});
	}

	getLevels() {
		return Object.keys(this.levels).map((id) => this.getLevel(id));
	}

	getLevel(id) {
		return this.levels[id];
	}

	getAllDirections(level) {
		if (!level) {
			return {};
		}
		const directions = this.getLevels().map(({
			id,
			paths,
		}) => {
			if (id === level.id) {
				// current level, return all exits
				return paths.map((path) => {
					if (path.isHidden) return null;
					const directions = {};
					if (path.directionForth) {
						directions[path.directionForth] = path.destination;
					}
					return directions;
				}).filter(Boolean);
			}
			// if current level is a dest, return direction back
			return paths
				.map((path) => {
					if (path.destination === level.id) {
						const directions = {};
						directions[path.directionBack] = id;
						return directions;
					}
				})
				.filter(Boolean);
		}).flat();
		return directions.length ? Object.assign(...directions) : {};
	}

	getStartPosition() {
		const startKey = Object.keys(this.levels)[0];
		const level = this.getLevel(startKey);
		return {level, x: level.x, y: level.y};
	}
}

export default World;
