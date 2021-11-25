class View {
	constructor(window, canvas) {
		this.window = window;
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		// maybe base size on window size?
		// this.canvas.width = this.window.innerWidth - 50;
		// this.canvas.height = this.window.innerHeight - 50;
		this.canvas.width = View.WIDTH;
		this.canvas.height = View.HEIGHT;

		// prevent default menu
		this.canvas.oncontextmenu = () => false;
	}

	render() {
		// render background
		this.context.fillStyle = '#FFFFFF';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	gameCoordsToViewCoords(position) {
		const {x, y} = position;
		return {x, y};
	}

	getViewSize() {
		const {width, height} = this.canvas;
		return {width, height};
	}

}

View.loadImage = (path) => {
	var image = new Image();
	image.src = '/assets/images/' + path;
	return image;
};

View.WIDTH = 800;
View.HEIGHT = 600;

export default View;
