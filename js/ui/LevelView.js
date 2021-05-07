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
		this.context.fillStyle = '#444444';
		this.context.strokeText('LEVEL VIEW', 375, 300);
	}
}

export default LevelView;
