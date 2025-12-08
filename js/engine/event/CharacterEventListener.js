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
				// handle jump event
				console.log('Character has jumped.');
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
