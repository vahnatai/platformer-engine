import ControlListener from './ControlListener.js';
import debounce from './lib/debounce.js';

class LevelControlListener extends ControlListener {
	constructor(document, game, engine, onAction) {
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
			onAction('jump');
			game.jump();
		};

		const onStopWalking = (direction) => {
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

		const toggleHideMenu = debounce(
			() => engine.toggleHideMenu(),
			25
		);

		this.addKeyListener('left', 'ArrowLeft', document, () => onWalk('left'), () => onStopWalking('left'));
		this.addKeyListener('right', 'ArrowRight', document, () => onWalk('right'), () => onStopWalking('right'));
		this.addKeyListener('jump', 'Space', document, () => onJump());

		this.addKeyListener('menu', 'Escape', document, () => toggleHideMenu());

		this.addKeyListener('exit', 'KeyE', document, () => engine.exitToMap()); // for debug purposes
	}
}

export default LevelControlListener;
