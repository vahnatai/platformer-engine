import ControlListener from './ControlListener.js';

class LevelControlListener extends ControlListener {
	constructor(document, game, exitLevel) {
		super(document);

		this.addListener('choose', 'Space', document, () => exitLevel());
	}
}

export default LevelControlListener;
