import View from './View.js';

class IntroView extends View {
	constructor(window, canvas) {
		super(window, canvas);
	}

	render() {
		super.render();

		this.context.lineWidth = 1;
		this.context.strokeStyle = '#444444';
		this.context.strokeText('INTRO SCREEN', 375, 300);
	}
}

export default IntroView;
