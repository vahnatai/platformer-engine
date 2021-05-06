import Character from './Character.js';
import World from './World.js';

class Game {
    constructor() {
        this.world = new World();
        const {id: levelId, x: startX, y: startY} = this.world.getStartPosition();
        this.character = new Character(startX, startY, levelId);
    }
}

export default Game;
