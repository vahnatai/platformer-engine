import ControlListener from './ControlListener.js';

class MapControlListener extends ControlListener {
	constructor(document, game, enterLevel) {
		super(document);

		const onDirection = (direction) => {
			// get current available directions
			const paths = game.world.getAllDirections(game.character.currentLevel);
			const dest = paths[direction];

			if (dest) {
				const {id, x, y} = game.world.getLevel(dest.id);
				game.character.startOnVector(x, y, id);
			}
		};

		this.addKeyListener('left', 'ArrowLeft', document, () => onDirection('left'));
		this.addKeyListener('up', 'ArrowUp', document, () => onDirection('up'));
		this.addKeyListener('right', 'ArrowRight', document, () => onDirection('right'));
		this.addKeyListener('down', 'ArrowDown', document, () => onDirection('down'));
		this.addKeyListener('choose', 'Space', document, () => enterLevel());
	}
}

export default MapControlListener;
