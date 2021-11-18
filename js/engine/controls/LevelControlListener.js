import ControlListener from './ControlListener.js';

class LevelControlListener extends ControlListener {
	constructor(document, game, exitLevel) {
		super(document);

		this.isWalkingLeft = false;
		this.isWalkingRight = false;

		const onWalk = (direction) => {
			if (direction === 'left') {
				this.isWalkingLeft = true;
				game.walkLeft();
			}
			else {
				this.isWalkingRight = true;
				game.walkRight();
			}
		};

		const onJump = () => {
			game.jump();
		};

		const onStop = (direction) => {
			if (direction === 'left') {
				this.isWalkingLeft = false;
			}
			if (direction === 'right') {
				this.isWalkingRight = false;
			}
			if (!this.isWalkingLeft && !this.isWalkingRight) {
				game.stopWalking();
			}
		};

		this.addKeyListener('left', 'ArrowLeft', document, () => onWalk('left'), () => onStop('left'));
		this.addKeyListener('right', 'ArrowRight', document, () => onWalk('right'), () => onStop('right'));

		this.addKeyListener('exit', 'Escape', document, () => exitLevel());

		this.addKeyListener('jump', 'Space', document, () => onJump());
	}
}

export default LevelControlListener;
