class GameEvent {
	constructor(type, game) {
		this.type = type;
		this.game = game;
		this.timestamp = Date.now();
	}
}

GameEvent.LEVEL_ENTERED = 'level_entered';
GameEvent.LEVEL_EXITED = 'level_exited';

export default GameEvent;
