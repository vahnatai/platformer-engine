import Vector from './Vector.js';

class Character {
	constructor (x, y, currentLevel) {
		this.x = x;
		this.y = y;
		this.currentLevel = currentLevel;
		this.destLevel = null;
		this.velocity = new Vector(0, 0);
		this.destX = null;
		this.destY = null;
	}

	getX() {return this.x;}

	getY() {return this.y;}

	getCurrentLevel() {return this.currentLevel;}

	setCurrentLevel(currentLevel) {
		this.currentLevel = currentLevel;
	}

	startOnVector(endX, endY, endLevel) {
		this.destLevel = endLevel;
		this.currentLevel = null;
		this.velocity = new Vector(endX - this.x, endY - this.y);
		this.destX = endX;
		this.destY = endY; 
	}

	computeWorldMovement(ms) {
		if (this.destLevel) {
			const speed = 2;
			const arrivalSensitivity = 5;
			this.x += this.velocity.x * speed * ms/1000;
			this.y += this.velocity.y * speed * ms/1000;
			if (Math.abs(this.destX - this.x) < arrivalSensitivity && Math.abs(this.destY - this.y) < arrivalSensitivity) {
				this.x = this.destX;
				this.y = this.destY;
				this.currentLevel = this.destLevel;
				this.velocity = new Vector(0, 0);
				this.destX = null;
				this.destY = null;
				this.destLevel = null;
			}
		}
	}
}

export default Character;
