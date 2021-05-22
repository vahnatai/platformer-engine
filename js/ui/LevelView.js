import View from './View.js';

class LevelView extends View {
	constructor(window, canvas, level, character) {
		super(window, canvas);
		this.level = level;
		this.character = character;
		this.sprites = {
			main: View.loadImage('lildude_l.png'),
		};
	}

	renderBackground() {
		this.context.lineWidth = 2;
		this.context.strokeStyle = '#444444';
		this.context.strokeText('LEVEL VIEW', 375, 300);

		this.context.lineWidth = 1;
		this.context.strokeStyle = '#000000';
		this.context.strokeText(JSON.stringify(this.level.id), 390, 400);
		this.context.strokeText(JSON.stringify(this.level.getStartCoords()), 375, 500);

		this.context.fillStyle = '#444444';
		const floorHeight = this.canvas.height - this.level.getFloorHeight();
		this.context.fillRect(0, floorHeight, this.canvas.width, this.level.getFloorHeight());
	}

	renderCharacter() {
		const x = this.character.getX();
		const y = this.character.getY();
		const sprite = this.sprites.main;

		// sprite
		this.context.drawImage(sprite, x - sprite.width/2, y - sprite.height + 3);
	}

	render() {
		super.render();

		this.renderBackground();
		this.renderCharacter();
	}
}

export default LevelView;
