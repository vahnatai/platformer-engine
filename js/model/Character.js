import Vector from './Vector.js';

class Character {
	constructor (x, y, currentLevelID) {
		this.x = x;
		this.y = y;
		this.currentLevelID = currentLevelID;
		this.destLevelID = null;
		this.velocity = new Vector(0, 0);
		this.acceleration = new Vector(0, 0);
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

	setVelocity(x, y) {
		this.velocity = new Vector(x, y);
	}

	addVelocity(x, y) {
		this.velocity = this.velocity.add(new Vector(x, y));
	}

	setAcceleration(x, y) {
		this.acceleration = new Vector(x, y);
	}

	addAcceleration(x, y) {
		this.acceleration = this.acceleration.add(new Vector(x, y));
	}

	startWorldPath(endX, endY, endLevelID) {
		this.destLevelID = endLevelID;
		this.currentLevelID = null;
		this.setVelocity(endX - this.x, endY - this.y);
		this.destX = endX;
		this.destY = endY; 
	}

	jump() {
		this.addAcceleration(0, -Character.MOVE_SPEED);
	}

	walkLeft() {
		this.setAcceleration(-Character.MOVE_SPEED, 0);
	}

	walkRight() {
		this.setAcceleration(Character.MOVE_SPEED, 0);
	}

	stop() {
		this.setVelocity(0, 0);
		this.setAcceleration(0, 9.81);
	}

	computePosition(ms) {
		const speed = 2;
		this.x += this.velocity.x * speed * ms/1000;
		this.y += this.velocity.y * speed * ms/1000;

		this.velocity.x += this.acceleration.x * ms/1000;
		this.velocity.y += this.acceleration.y * ms/1000;
	}

	computeWorldMovement(ms) {
		if (this.destLevelID) {
			this.computePosition(ms);
			const arrivalSensitivity = 5;
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
		this.computePosition(ms);
	}
}

Character.MOVE_SPEED = 200;

export default Character;
