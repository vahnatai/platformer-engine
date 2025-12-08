class GameEventListener {

	constructor(game) {
		this.game = game;
		this.typeMap = {
			'level_entered': () => {
				// handle level entered event
				console.log('Level has been entered.');
			},
			'level_exited': () => {
				// handle level exited event
				console.log('Level has been exited.');
			}
		};
	}

	handleEvent(event) {
		const handler = this.typeMap[event.type];
		if (handler) {
			handler();
		}
	}
}

export default GameEventListener;
