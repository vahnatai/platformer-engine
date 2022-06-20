import Entity from './Entity.js';
import RectangleShape from '../shape/RectangleShape.js';
import Vector from '../Vector.js';

class Character extends Entity {
	constructor(x, y, currentLevel) {
		super('character', new RectangleShape(new Vector(x, y), Character.WIDTH, Character.HEIGHT));

		this.currentLevel = currentLevel;
		this.destination = null;

		this.isOnGround = false;
	}

	setPosition(x, y) {
		this.position = new Vector(x, y);
	}

	getX() {return this.position.x;}

	getY() {return this.position.y;}

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
		this.currentLevel = null;
		this.destination = {
			level: endLevel,
			x: endX,
			y: endY,
		};
		this.setVelocity((endX - this.position.x)/2, (endY - this.position.y)/2);
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
		this.position = this.position.add(this.velocity.multiplyScalar(speed * ms/1000));

		if (level) {
			this.collideBounds(level);
			level.getGeometry().forEach((entity) => {
				if (entity.isColliding(this)) {
					entity.collide(this);
				}
			});
			level.getObjectives().forEach(objective => {
				if (objective.isColliding(this)) {
					objective.collide(this);
				}
			});
		}

		this.velocity = this.velocity.add(this.acceleration.multiplyScalar(ms/1000));
	}

	computeWorldMovement(ms) {
		if (this.destination) {
			this.computePosition(null, ms);
			const arrivalSensitivity = 5;
			if (Math.abs(this.destination.x - this.position.x) < arrivalSensitivity && Math.abs(this.destination.y - this.position.y) < arrivalSensitivity) {
				// set curr to dest
				this.position.x = this.destination.x;
				this.position.y = this.destination.y;
				this.currentLevel = this.destination.level;
				// reset and stop moving
				this.destination = null;
				this.velocity = new Vector(0, 0);
			}
		}
	}

	computeLevelMovement(level, ms) {
		this.computePosition(level, ms);
	}

	getBoundingShape() {
		return new RectangleShape(
			this.position.clone(),
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
			this.position.x = minX + bShape.width/2; 
			collided = true;
		} else if (bShape.position.x + bShape.width/2 >= maxX && this.velocity.x > 0) {
			this.acceleration.x = 0;
			this.velocity.x = 0;
			this.position.x = maxX - bShape.width/2;
			collided = true;
		}
		if (bShape.position.y <= minY && this.velocity.y < 0) {
			this.velocity.y = 0;
			this.position.y = minY + bShape.height/2;
			collided = true;
		} else if (bShape.position.y + bShape.height/2 >= maxY && this.velocity.y > 0) {
			this.velocity.y = 0;
			this.position.y = maxY - bShape.height/2;
			collided = true;
			this.isOnGround = true;
		}
		if (collided) {
			this.onCollideBounds();
		}
	}

	onCollideBounds() {}

	onCollideEntity(entity, onTop = false) {
		if (onTop) {
			this.isOnGround = true;
		}
	}
}

Character.MOVE_SPEED = 100;
Character.JUMP_SPEED = 100;
Character.GRAVITY = 9.81;
Character.PIXELS_PER_METER = 22;
Character.RESTITUTION = 0.75;
Character.WIDTH = 24;
Character.HEIGHT = 40;

export default Character;
