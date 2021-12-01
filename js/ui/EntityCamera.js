import Camera from './Camera.js';

class EntityCamera extends Camera {
	constructor(entity, width, height) {
		super(entity.currentLevel, entity.position.x, entity.position.y, width, height);
		this.entity = entity;
	}

	update() {
		const {x, y} = this.entity.position;

		const {
			minX,
			minY,
			maxX,
			maxY,
		} = this.level.getBounds();

		this.position.x = Math.max(minX, Math.min(x, maxX - this.width/2) - this.width/2);
		this.position.y = Math.max(minY, Math.min(y, maxY - this.height/2) - this.height/2);
	}
}

export default EntityCamera;
