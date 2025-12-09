import ControlListener from './ControlListener.js';
import debounce from './lib/debounce.js';

class MapControlListener extends ControlListener {
	constructor(document, game, engine, enterLevel) {
		super(document);

		const onDirection = (direction) => {
			const dest = game.getPathToWorldDirection(direction);
			if (!dest) return;
			game.startWorldPath(dest);
		};

		const toggleHideMenu = debounce(
			() => engine.toggleHideMenu(),
			25
		);

		this.addKeyListener('left', 'ArrowLeft', document, () => onDirection('left'));
		this.addKeyListener('up', 'ArrowUp', document, () => onDirection('up'));
		this.addKeyListener('right', 'ArrowRight', document, () => onDirection('right'));
		this.addKeyListener('down', 'ArrowDown', document, () => onDirection('down'));
		this.addKeyListener('choose', 'Space', document, () => enterLevel());
		this.addKeyListener('menu', 'Escape', document, () => toggleHideMenu());
	}
}

export default MapControlListener;
