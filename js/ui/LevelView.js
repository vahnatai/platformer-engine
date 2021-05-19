import View from './View.js';

class LevelView extends View {
	constructor(window, canvas, level, character) {
		super(window, canvas);
		this.level = level;
		this.character = character;
	}

	render() {
		super.render();

		this.context.lineWidth = 2;
		this.context.strokeStyle = '#444444';
		this.context.strokeText('LEVEL VIEW', 375, 300);

		this.context.lineWidth = 1;
		this.context.strokeStyle = '#000000';
		this.context.strokeText(JSON.stringify(this.level.id), 390, 400);
		this.context.strokeText(JSON.stringify(this.level.level.getStartCoords()), 375, 500);
	}
}

export default LevelView;
