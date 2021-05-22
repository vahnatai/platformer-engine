import Vector from './Vector.js';

class Character {
	constructor (x, y, currentLevelID) {
		this.x = x;
		this.y = y;
		this.currentLevelID = currentLevelID;
		this.destLevelID = null;
		this.velocity = new Vector(0, 0);
		this.destX = null;
		this.destY = null;
	}

	setPosition(x, y) {
		this.x = x;
		this.y = y;
	}

	getX() {return this.x;}

	getY() {return this.y;}

	getCurrentLevelID() {return this.currentLevelID;}

	setCurrentLevel(currentLevel) {
		this.currentLevel = currentLevel;
	}

	startOnVector(endX, endY, endLevelID) {
		this.destLevelID = endLevelID;
		this.currentLevelID = null;
		this.velocity = new Vector(endX - this.x, endY - this.y);
		this.destX = endX;
		this.destY = endY; 
	}

	computeWorldMovement(ms) {
		if (this.destLevelID) {
			const speed = 2;
			const arrivalSensitivity = 5;
			this.x += this.velocity.x * speed * ms/1000;
			this.y += this.velocity.y * speed * ms/1000;
			if (Math.abs(this.destX - this.x) < arrivalSensitivity && Math.abs(this.destY - this.y) < arrivalSensitivity) {
				// set curr to dest
				this.x = this.destX;
				this.y = this.destY;
				this.currentLevelID = this.destLevelID;
				this.velocity = new Vector(0, 0);
				this.destX = null;
				this.destY = null;
				this.destLevelID = null;
			}
		}
	}

	computeLevelMovement(ms) {
	}
}

export default Character;
