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

		const onJump = () => {
			game.jump();
		};

		const onStop = () => {
			game.stopWalking();
		};

		this.addKeyListener('left', 'ArrowLeft', document, () => onWalk('left'), () => onStop());
		this.addKeyListener('right', 'ArrowRight', document, () => onWalk('right'), () => onStop());

		this.addKeyListener('exit', 'Escape', document, () => exitLevel());

		this.addKeyListener('jump', 'Space', document, () => onJump());
	}
}

export default LevelControlListener;
