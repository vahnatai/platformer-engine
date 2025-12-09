import EntityCamera from './EntityCamera.js';
import Objective from '../model/entity/Objective.js';
import View from './View.js';

class LevelView extends View {
	constructor(window, canvas, game, level, character) {
		super(window, canvas);
		this.camera = new EntityCamera(character, canvas.width, canvas.height);
		this.game = game;
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
			// bounds
			this.context.strokeStyle = '#AA0000';
			const shape = this.character.getBoundingShape();
			this.context.strokeRect(x - shape.getWidth()/2, y - shape.getHeight()/2, shape.getWidth(), shape.getHeight());

			// velocity
			const {x: velX, y: velY} = this.character.velocity;
			if (velX || velY) {
				this.renderVector(x, y, x+velX, y+velY, '#DD5555');
			}

			// acceleration
			const {x: accX, y: accY} = this.character.acceleration;
			if (accX || accY) {
				this.renderVector(x, y, x+accX, y+accY, '#AADD00');
			}

			// grounded
			if (this.character.isOnGround) {
				this.context.strokeStyle = '#00AA00';
				this.context.strokeWidth = 10;
				this.context.beginPath();
				this.context.moveTo(x - shape.getWidth(), y + shape.getHeight()/2);
				this.context.lineTo(x + shape.getWidth(), y + shape.getHeight()/2);
				this.context.stroke();
			}
		}
	}

	renderVector(fromX, fromY, toX, toY, strokeStyle) {
		this.context.strokeStyle = strokeStyle;
		this.context.strokeWidth = 1;
		this.context.beginPath();

		// line
		this.context.moveTo(fromX, fromY);
		this.context.lineTo(toX, toY);
		
		// arrowhead
		const headLength = 30;
		const dx = toX - fromX;
		const dy = toY - fromY;
		const angle = Math.atan2(dy, dx);
		this.context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
		this.context.moveTo(toX, toY);
		this.context.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));

		this.context.stroke();
	}

	renderObjective() {
		this.level.getObjectives().forEach(objective => {
			const {x, y} = this.gameCoordsToViewCoords(objective.position);
			const sprite = this.sprites.objective;
			
			// sprite
			this.context.drawImage(sprite, Math.round(x - Objective.WIDTH/2), Math.round(y - Objective.HEIGHT/2), Objective.WIDTH, Objective.HEIGHT);
		});
	}

	renderDebugOverlay() {
		const x = 30;
		const y = 30;
		const width = 380;

		// layout
		const paddingX = 12;
		const paddingY = 12;
		const lineHeight = 20;

		// build lines so we can size the background dynamically
		const lines = [
			'Level: ' + JSON.stringify(this.level.id),
			'Start Position: ' + JSON.stringify(this.level.getStartCoords()),
			'Position: ' + JSON.stringify(this.character.position.round()),
			'Velocity: ' + JSON.stringify(this.character.velocity.round()),
			'Acceleration: ' + JSON.stringify(this.character.acceleration.round()),
			'On Ground: ' + JSON.stringify(this.character.isOnGround),
			'DX: ' + JSON.stringify(this.debug.lastX - this.character.position.x),
			'DY: ' + JSON.stringify(this.debug.lastY - this.character.position.y),
		];

		if (window.performance?.memory) {
			const memory = window.performance.memory;
			lines.push(`JS Heap: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB / ${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`);
		}

		const height = paddingY * 2 + lines.length * lineHeight;

		// render background
		this.context.lineWidth = 1;
		this.context.globalAlpha = 0.75;
		this.context.fillStyle = '#AAAAAA';
		this.context.fillRect(x, y, width, height);
		this.context.globalAlpha = 1;

		// render text lines
		this.context.fillStyle = '#000000';
		this.context.font = '15px monospace';

		lines.forEach((line, i) => { // render each line with spacing and inner margin
			this.context.fillText(line, x + paddingX, y + paddingY + (i * lineHeight) + (lineHeight - 6));
		});

		this.debug.lastX = this.character.position.x;
		this.debug.lastY = this.character.position.y;
	}

	renderPauseGray() {
		this.context.globalAlpha = 0.70;
		this.context.fillStyle = '#dbdbdb';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.globalAlpha = 1;
	}

	render(debugMode = false) {
		super.render();

		this.camera.update();
		this.renderBackground();
		this.renderGeometry();
		this.renderObjective();
		this.renderCharacter(debugMode);
		if (debugMode) this.renderDebugOverlay();
		if (this.game.isPaused) this.renderPauseGray();
	}
}

export default LevelView;
