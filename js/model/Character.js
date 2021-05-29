import Vector from './Vector.js';

class Character {
	constructor (x, y, currentLevel) {
		this.x = x;
		this.y = y;
		this.currentLevel = currentLevel;
		this.destLevel = null;
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

	getCurrentLevel() {return this.currentLevel;}

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

	startWorldPath(endX, endY, endLevel) {
		this.destLevel = endLevel;
		this.currentLevel = null;
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
		if (this.destLevel) {
			this.computePosition(ms);
			const arrivalSensitivity = 5;
			if (Math.abs(this.destX - this.x) < arrivalSensitivity && Math.abs(this.destY - this.y) < arrivalSensitivity) {
				// set curr to dest
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

	computeLevelMovement(ms) {
		this.computePosition(ms);
	}
}

Character.MOVE_SPEED = 200;

export default Character;
