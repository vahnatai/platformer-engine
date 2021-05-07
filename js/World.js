class World {
	constructor () {
		this.levels = {
			'1-1': {
				id: '1-1',
				x: 200,
				y: 530,
				paths: [
					{
						destination: '1-2',
						isSecret: false,
						directionForth: 'right',
						directionBack: 'left',
					},
				],
			},
			'1-2': {
				id: '1-2',
				x: 550,
				y: 530,
				paths: [
					{
						destination: '1-3',
						isSecret: false,
						directionForth: 'right',
						directionBack: 'down',
					},
				],
			},
			'1-3': {
				id: '1-3',
				x: 700,
				y: 360,
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
			'1-S1': {
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
			'1-4': {
				id: '1-4',
				x: 690,
				y: 250,
				paths: [
					{
						destination: '1-5',
						isSecret: false,
						directionForth: 'left',
						directionBack: 'right',
					},
				],
			},
			'1-5': {
				id: '1-5',
				x: 450,
				y: 235,
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
			'1-S2': {
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
			'1-6': {
				id: '1-6',
				x: 150,
				y: 330,
				paths: [
					{
						destination: '1-7',
						isSecret: false,
						directionForth: 'up',
						directionBack: 'down',
					},
				],
			},
			'1-7': {
				id: '1-7',
				x: 125,
				y: 220,
				paths: [],
			},
		};
	}

	addLevel(id, x, y, levelData) {
		if (this.levels[id]) {
			throw new Error(`A level with ID "${id}" already exists`);
		}
		this.levels[id] = {
			id,
			x,
			y,
			...levelData,
			paths: [],
		};
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
		const {
			x,
			y,
			// levelData, ??
			isSecret,
			paths,
		} = this.levels[id];

		return {
			id,
			x,
			y,
			isSecret,
			paths: [...paths],
		};
	}

	getAllDirections(levelId) {
		if (!levelId) {
			return {};
		}
		const directions = this.getLevels().map(({
			id,
			paths,
		}) => {
			if (id === levelId) {
				// current level, return all exits
				return paths.map((path) => {
					const directions = {};
					if (path.directionForth) {
						directions[path.directionForth] = {id: path.destination};
					}
					return directions;
				}).filter(Boolean);
			}
			// if current level is a dest, return direction back
			return paths
				.map((path) => {
					if (path.destination === levelId) {
						const directions = {};
						directions[path.directionBack] = {id};
						return directions;
					}
				})
				.filter(Boolean);
		}).flat();
		return directions.length ? Object.assign(...directions) : {};
	}

	getStartPosition() {
		const startKey = Object.keys(this.levels)[0];
		const {id, x, y} = this.getLevel(startKey);
		return {id, x, y};
	}
}

export default World;
