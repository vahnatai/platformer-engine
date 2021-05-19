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

		this.addListener('left', 'ArrowLeft', document, () => onDirection('left'));
		this.addListener('up', 'ArrowUp', document, () => onDirection('up'));
		this.addListener('right', 'ArrowRight', document, () => onDirection('right'));
		this.addListener('down', 'ArrowDown', document, () => onDirection('down'));
		this.addListener('choose', 'Space', document, () => enterLevel());
	}
}

export default MapControlListener;
