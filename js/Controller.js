class Controller {
	constructor() {
		this.left = new ButtonInput('ArrowLeft');
		this.up = new ButtonInput('ArrowUp');
		this.right = new ButtonInput('ArrowRight');
		this.down = new ButtonInput('ArrowDown');
		this.choose = new ButtonInput('Space');
	}

	onKeyDown(event) {
		this.left.onKeyDown(event);
		this.up.onKeyDown(event);
		this.right.onKeyDown(event);
		this.down.onKeyDown(event);
		this.choose.onKeyDown(event);
	}

	onKeyUp(event) {
		this.left.onKeyUp(event);
		this.up.onKeyUp(event);
		this.right.onKeyUp(event);
		this.down.onKeyUp(event);
		this.choose.onKeyUp(event);
	}

	getPressedKey() {
		return [
			'left',
			'up',
			'right',
			'down',
			'choose'
		].filter((keyName) => this[keyName].isPressed)[0];
	}
}

class ButtonInput {
	constructor(keyCode) {
		this.keyCode = keyCode;
		this.isPressed = false;
	}

	onKeyDown(event) {
		if (event.code !== this.keyCode) {
			return;
		}
		this.isPressed = true;
	}
	
	onKeyUp(event) {
		if (event.code !== this.keyCode) {
			return;
		}
		this.isPressed = false;
	}
}

export default Controller;
