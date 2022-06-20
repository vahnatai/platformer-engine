import ControlListener from './ControlListener.js';

class MapControlListener extends ControlListener {
	constructor(document, game, enterLevel) {
		super(document);

		const onDirection = (direction) => {
			const dest = game.getPathToWorldDirection(direction);
			if (!dest) return;
			if (dest.isHidden) return;
			game.startWorldPath(dest);
		};

		this.addKeyListener('left', 'ArrowLeft', document, () => onDirection('left'));
		this.addKeyListener('up', 'ArrowUp', document, () => onDirection('up'));
		this.addKeyListener('right', 'ArrowRight', document, () => onDirection('right'));
		this.addKeyListener('down', 'ArrowDown', document, () => onDirection('down'));
		this.addKeyListener('choose', 'Space', document, () => enterLevel());
	}
}

export default MapControlListener;
