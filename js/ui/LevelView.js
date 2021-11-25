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
		this.debug = {
			lastX: character.position.x,
			lastY: character.position.y,
		};
	}

	gameCoordsToViewCoords(position) {
		return this.camera.levelToCamera(position);
	}

	renderBackground() {
		this.context.font = '10px sans-serif';
		this.context.lineWidth = 2;
		this.context.strokeStyle = '#444444';
		this.context.strokeText('LEVEL VIEW', 375, 300);
		this.context.lineWidth = 1;
		this.context.strokeStyle = '#000000';
		this.context.strokeText(JSON.stringify(this.level.id), 390, 400);
	}

	renderGeometry() {
		// render floor
		this.context.fillStyle = '#444444';
		const floorPos = this.camera.levelYToCamera(this.canvas.height - this.level.getFloorHeight());
		this.context.fillRect(0, floorPos, this.canvas.width, this.level.getFloorHeight());

		// render shapes
		this.level.getGeometry().forEach(({shape}) => {
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

	renderDebugOverlay() {
		const x = 30;
		const y = 30;
		this.context.lineWidth = 1;
		this.context.font = '15px monospace';
		this.context.fillStyle = '#000000';
		this.context.fillText('Level: ' + JSON.stringify(this.level.id), x, y);
		this.context.fillText('Start Position: ' + JSON.stringify(this.level.getStartCoords()), x, y+20);
		this.context.fillText('Position: ' + JSON.stringify(this.character.position.round()), x, y+40);
		this.context.fillText('Velocity: ' + JSON.stringify(this.character.velocity.round()), x, y+60);
		this.context.fillText('Acceleration: ' + JSON.stringify(this.character.acceleration.round()), x, y+80);
		this.context.fillText('On Ground: ' + JSON.stringify(this.character.isOnGround), x, y+100);
		this.context.fillText('DX: ' + JSON.stringify(this.debug.lastX - this.character.position.x), x, y+120);
		this.context.fillText('DY: ' + JSON.stringify(this.debug.lastY - this.character.position.y), x, y+140);
		this.debug.lastX = this.character.position.x;
		this.debug.lastY = this.character.position.y;
	}

	render(debugMode = false) {
		super.render();

		this.camera.update();
		this.renderBackground();
		this.renderGeometry();
		this.renderCharacter(debugMode);
		if (debugMode) this.renderDebugOverlay();
	}
}

export default LevelView;
