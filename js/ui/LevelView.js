import EntityCamera from './EntityCamera.js';
import Objective from '../model/entity/Objective.js';
import View from './View.js';

class LevelView extends View {
	constructor(window, canvas, level, character) {
		super(window, canvas);
		this.camera = new EntityCamera(character, canvas.width, canvas.height);
		this.level = level;
		this.character = character;
		this.sprites = {
			main: View.loadImage('lildude_l.png'),
			objective: View.loadImage('heart.png'),
		};
		this.backgroundLayers = {
			stars: View.loadImage('bg-L0.png'),
			water: View.loadImage('bg-L1.png'),
			sand: View.loadImage('bg-L2.png'),
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
		// round because pixels are discrete units; decimals make the image fuzzy
		let x = Math.round(this.camera.position.x + this.camera.width/2);
		let y = Math.round(this.camera.position.y + this.camera.height/2);

		// Static character, moving background
		// save,
		// translate before fill to offset the pattern,
		// then restore position

		// stars
		this.context.save();
		let parallaxX = Math.round(x/10);
		let parallaxY = Math.round(y/10);
		this.context.translate(-parallaxX, -parallaxY);
		this.context.fillStyle = this.context.createPattern(this.backgroundLayers.stars, 'repeat');
		this.context.fillRect(parallaxX, parallaxY, this.camera.width, this.camera.height);
		this.context.restore();

		//sea1
		let OFFSET = 30; //tuck this layer a bit under the next one
		let crestY = this.level.getBounds().maxY - (2 * this.backgroundLayers.water.height + this.backgroundLayers.sand.height) + OFFSET;
		parallaxX = Math.round(x/3);
		this.context.save();
		this.context.translate(-parallaxX, -y);
		this.context.fillStyle = this.context.createPattern(this.backgroundLayers.water, 'repeat');
		this.context.fillRect(parallaxX, this.camera.levelYToCamera(crestY) + y,
			this.canvas.width, this.backgroundLayers.water.height);
		this.context.restore();
		
		//sea2
		crestY = this.level.getBounds().maxY - (this.backgroundLayers.water.height + this.backgroundLayers.sand.height);
		parallaxX = Math.round(x/2);
		this.context.save();
		this.context.translate(-parallaxX, -y);
		this.context.fillStyle = this.context.createPattern(this.backgroundLayers.water, 'repeat');
		this.context.fillRect(parallaxX, crestY + this.camera.height/2,
			this.canvas.width, this.backgroundLayers.water.height);
		this.context.restore();

		//beach
		crestY = this.level.getBounds().maxY - this.backgroundLayers.sand.height + this.level.getFloorHeight();
		this.context.save();
		this.context.translate(-x, -y);
		this.context.fillStyle = this.context.createPattern(this.backgroundLayers.sand, 'repeat');
		this.context.fillRect(x, crestY + this.camera.height/2 - this.level.getFloorHeight(),
			this.canvas.width, this.backgroundLayers.sand.height + this.level.getFloorHeight());
		this.context.restore();
	}

	renderGeometry() {
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

	renderObjective() {
		const {x, y} = this.gameCoordsToViewCoords(this.level.getObjective().position);
		const sprite = this.sprites.objective;

		// sprite
		this.context.drawImage(sprite, Math.round(x - Objective.WIDTH/2), Math.round(y - Objective.HEIGHT/2), Objective.WIDTH, Objective.HEIGHT);
	}

	renderDebugOverlay() {
		const x = 30;
		const y = 30;
		const width = 350;
		const height = 140;

		this.context.globalAlpha = 0.75;
		this.context.fillStyle = '#AAAAAA';
		this.context.fillRect(x, y, width, height);
		this.context.globalAlpha = 1;

		this.context.lineWidth = 1;
		this.context.font = '15px monospace';
		this.context.fillStyle = '#000000';
		this.context.fillText('Level: ' + JSON.stringify(this.level.id), x, y+15);
		this.context.fillText('Start Position: ' + JSON.stringify(this.level.getStartCoords()), x, y+30);
		this.context.fillText('Position: ' + JSON.stringify(this.character.position.round()), x, y+45);
		this.context.fillText('Velocity: ' + JSON.stringify(this.character.velocity.round()), x, y+60);
		this.context.fillText('Acceleration: ' + JSON.stringify(this.character.acceleration.round()), x, y+75);
		this.context.fillText('On Ground: ' + JSON.stringify(this.character.isOnGround), x, y+90);
		this.context.fillText('DX: ' + JSON.stringify(this.debug.lastX - this.character.position.x), x, y+105);
		this.context.fillText('DY: ' + JSON.stringify(this.debug.lastY - this.character.position.y), x, y+120);
		this.debug.lastX = this.character.position.x;
		this.debug.lastY = this.character.position.y;
	}

	render(debugMode = false) {
		super.render();

		this.camera.update();
		this.renderBackground();
		this.renderGeometry();
		this.renderObjective();
		this.renderCharacter(debugMode);
		if (debugMode) this.renderDebugOverlay();
	}
}

export default LevelView;
