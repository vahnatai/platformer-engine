class CharacterEvent {
	constructor(type, character) {
		this.type = type;
		this.character = character;
		this.timestamp = Date.now();
	}
}

CharacterEvent.JUMP = 'jump';
CharacterEvent.LAND = 'land';

export default CharacterEvent;
