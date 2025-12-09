class CharacterEventListener {

	constructor(character, gameEngine) {
		this.character = character;
		this.gameEngine = gameEngine;
		this.typeMap = {
			'land': () => {
				// handle land event
				console.log('Character has landed.');
			},
			'jump': () => {
				this.gameEngine.soundEngine.playFX('JUMP');
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

export default CharacterEventListener;
