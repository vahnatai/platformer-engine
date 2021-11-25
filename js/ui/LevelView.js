import EntityCamera from './EntityCamera.js';
import View from './View.js';

class LevelView extends View {
	constructor(window, canvas, level, character) {
		super(window, canvas);
		this.camera = new EntityCamera(character, canvas.width, canvas.height);
		this.level = level;
		this.character = character;
		this.sprites = {
			main: View.loadImage('lildude_l.png'),
		};
	}

	gameCoordsToViewCoords(position) {
		return this.camera.levelToCamera(position);
	}

	renderBackground() {
		this.context.lineWidth = 2;
		this.context.strokeStyle = '#444444';
		this.context.strokeText('LEVEL VIEW', 375, 300);

		this.context.lineWidth = 1;
		this.context.strokeStyle = '#000000';
		this.context.strokeText(JSON.stringify(this.level.id), 390, 400);
		this.context.strokeText('StartPOS: ' + JSON.stringify(this.level.getStartCoords()), 370, 500);
		this.context.strokeText('POS: ' + JSON.stringify(this.character.position), 370, 520);
		this.context.strokeText('on ground: ' + JSON.stringify(this.character.isOnGround), 370, 540);
	}

	renderGeometry() {
		// render floor
		this.context.fillStyle = '#444444';
		const floorPos = this.camera.levelYToCamera(this.canvas.height - this.level.getFloorHeight());
		this.context.fillRect(0, floorPos, this.canvas.width, this.level.getFloorHeight());

		// render shapes
		this.level.getGeometry().forEach((shape) => {
			const {x, y} = this.gameCoordsToViewCoords(shape.position);
			const width = shape.getWidth();
			const height = shape.getHeight();
			this.context.fillStyle = '#774444';
			this.context.fillRect(x - width/2, y - height/2, width, height);
		});
	}

	renderCharacter(debugBounds = false) {
		const {x, y} = this.gameCoordsToViewCoords(this.character.position);
		const sprite = this.sprites.main;

		// sprite
		this.context.drawImage(sprite, Math.round(x - sprite.width/2), Math.round(y - sprite.height/2));

		if (debugBounds) {
			this.context.strokeStyle = '#AA0000';
			const shape = this.character.getBoundingShape();
			this.context.strokeRect(x - shape.getWidth()/2, y - shape.getHeight()/2, shape.getWidth(), shape.getHeight());
		}
	}

	render(debugMode = false) {
		super.render();

		this.camera.update();
		this.renderBackground();
		this.renderGeometry();
		this.renderCharacter(debugMode);
	}
}

export default LevelView;
