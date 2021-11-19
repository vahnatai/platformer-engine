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
		this.isOnGround = false;
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
		if (this.isOnGround) {
			this.setVelocity(this.velocity.x, -Character.JUMP_SPEED);
			this.isOnGround = false;
		}
	}

	walkLeft() {
		this.setVelocity(-Character.MOVE_SPEED, this.velocity.y);
	}

	walkRight() {
		this.setVelocity(Character.MOVE_SPEED, this.velocity.y);
	}

	stop() {
		this.setVelocity(0, 0);
	}

	computePosition(level, ms) {
		const speed = 5;
		this.x += this.velocity.x * speed * ms/1000;
		this.y += this.velocity.y * speed * ms/1000;

		if (level) {
			this.collideBounds(level, Character.RESTITUTION);
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

	collideBounds(level) {
		const {minX, minY, maxX, maxY} = level.getBounds();

		var collided = false;
            
		const bShape = this.getBoundingShape();
		if (bShape.position.x <= minX && this.velocity.x < 0) { 
			this.acceleration.x = 0;
			this.velocity.x = 0;
			this.x = minX + bShape.width/2; 
			collided = true;
		} else if (bShape.position.x + bShape.width/2 >= maxX && this.velocity.x > 0) {
			this.acceleration.x = 0;
			this.velocity.x = 0;
			this.x = maxX - bShape.width/2;
			collided = true;
		}
		if (bShape.position.y <= minY && this.velocity.y < 0) {
			this.velocity.y = 0;
			this.y = minY + bShape.height/2;
			collided = true;
		} else if (bShape.position.y + bShape.height/2 >= maxY && this.velocity.y > 0) {
			this.velocity.y = 0;
			this.y = maxY - bShape.height/2;
			collided = true;
			this.isOnGround = true;
		}
		if (collided) {
			this.onCollideBounds();
		}
	}

	onCollideBounds() {}
}

Character.MOVE_SPEED = 100;
Character.JUMP_SPEED = 75;
Character.GRAVITY = 9.81;
Character.PIXELS_PER_METER = 20;
Character.RESTITUTION = 0.75;
Character.WIDTH = 25;
Character.HEIGHT = 38;

export default Character;
