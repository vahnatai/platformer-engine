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
	}
	render() {
		this.context.fillStyle = '#FFFFFF';
		this.context.strokeStyle = '#550500';
		this.context.lineWidth = 10;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
	}

}

View.loadImage = (path) => {
	var image = new Image();
	image.src = path;
	return image;
};

View.WIDTH = 800;
View.HEIGHT = 600;

export default View;
