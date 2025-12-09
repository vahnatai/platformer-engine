import CharacterEventListener from './CharacterEventListener.js';

class GameEventListener {

	constructor(game, gameEngine) {
		this.game = game;
		this.gameEngine = gameEngine;
		this.typeMap = {
			'level_entered': () => {
				// handle level entered event
				console.log('Level has been entered.');
				this.game.character.addEventListener(new CharacterEventListener(this.character, this.gameEngine));

			},
			'level_exited': () => {
				// handle level exited event
				console.log('Level has been exited.');
				this.game.character.removeAllEventListeners();
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
