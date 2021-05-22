import ControlListener from './ControlListener.js';

class LevelControlListener extends ControlListener {
	constructor(document, game, exitLevel) {
		super(document);

		const onWalk = (direction) => {
			if (direction === 'left') {
				game.walkLeft();
			}
			else {
				game.walkRight();
			}
		};

		const onStop = () => {
			game.stopWalking();
		};

		this.addKeyListener('left', 'ArrowLeft', document, () => onWalk('left'), () => onStop());
		this.addKeyListener('right', 'ArrowRight', document, () => onWalk('right'), () => onStop());
		
		this.addKeyListener('choose', 'Space', document, () => exitLevel());
	}
}

export default LevelControlListener;
