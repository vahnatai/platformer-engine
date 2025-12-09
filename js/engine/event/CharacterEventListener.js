class CharacterEventListener {

	constructor(character, gameEngine) {
		this.character = character;
		this.gameEngine = gameEngine;
		this.typeMap = {
			'land': () => {
				this.gameEngine.soundEngine.playFX('LAND');
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
