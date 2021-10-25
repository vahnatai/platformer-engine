import View from './View.js';

class IntroView extends View {
	constructor(window, canvas) {
		super(window, canvas);
	}

	render() {
		super.render();

		this.context.lineWidth = 1;
		this.context.strokeStyle = '#444444';
		this.context.font = '30px sans-serif';
		this.context.strokeText('A PLATFORMER', 300, 275);
		this.context.font = '10px sans-serif';
		this.context.strokeText('INTRO SCREEN', 375, 350);
	}
}

export default IntroView;
