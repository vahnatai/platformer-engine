import ControlListener from './ControlListener.js';

class IntroControlListener extends ControlListener {
	constructor(document, game, startMap) {
		super(document);

		this.addKeyListener('choose', 'Space', document, () => startMap());
	}
}

export default IntroControlListener;
