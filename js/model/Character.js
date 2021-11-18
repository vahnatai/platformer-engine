import RectangleShape from './shape/RectangleShape.js';
import Vector from './Vector.js';

class Character {
	constructor (x, y, currentLevel) {
		// TODO implement position and destPosition
		this.x = x;
		this.y = y;
		this.currentLevel = currentLevel;
		this.destLevel = null;
		this.velocity = new Vector(0, 0);
		this.acceleration = new Vector(0, 0);
		this.destX = null;
		this.destY = null;
		this.gravity = Character.GRAVITY * Character.PIXELS_PER_METER;
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
		this.setAcceleration(-Character.MOVE_SPEED, this.gravity);
	}

	walkRight() {
		this.setAcceleration(Character.MOVE_SPEED, this.gravity);
	}

	stop() {
		this.setVelocity(0, 0);
		this.setAcceleration(0, this.gravity);
	}

	computePosition(level, ms) {
		const speed = 2;
		this.x += this.velocity.x * speed * ms/1000;
		this.y += this.velocity.y * speed * ms/1000;

		if (level) {
			this.collideBounds(level, Character.RESTITUTION, ms);
		}

		this.velocity.x += this.acceleration.x * ms/1000;
		this.velocity.y += this.acceleration.y * ms/1000;
	}

	computeWorldMovement(ms) {
		if (this.destLevel) {
			this.computePosition(null, ms);
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

	computeLevelMovement(level, ms) {
		this.computePosition(level, ms);
	}

	getBoundingShape() {
		return new RectangleShape(
			{
				x: this.x,
				y: this.y,
			},
			Character.WIDTH,
			Character.HEIGHT
		);
	}

	collideBounds(level, restitution, dt) {
		const {minX, minY, maxX, maxY} = level.getBounds();

		var collided = false;
            
		const bShape = this.getBoundingShape();
		if (bShape.position.x <= minX && this.velocity.x < 0) { 
			this.velocity.x = -this.velocity.x * restitution;
			this.x = minX + bShape.width/2; 
			collided = true;
		} else if (bShape.position.x + bShape.width/2 >= maxX && this.velocity.x > 0) {
			this.velocity.x = -this.velocity.x * restitution;
			this.x = maxX - bShape.width/2;
			collided = true;
		}
		if (bShape.position.y <= minY && this.velocity.y < 0) {
			this.velocity.y = -this.velocity.y * restitution;
			this.y = minY + bShape.height/2;
			collided = true;
		} else if (bShape.position.y + bShape.height/2 >= maxY && this.velocity.y > 0) {
			this.velocity.y = -this.velocity.y * restitution;
			this.y = maxY - bShape.height/2;
			collided = true;
		}
		if (collided) {
			this.onCollideBounds();
		}
	}

	onCollideBounds() {}
}

Character.MOVE_SPEED = 200;
Character.GRAVITY = 9.81;
Character.PIXELS_PER_METER = 10;
Character.RESTITUTION = 0.75;
Character.WIDTH = 31;
Character.HEIGHT = 45;

export default Character;
