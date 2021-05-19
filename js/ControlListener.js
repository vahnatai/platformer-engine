class ControlListener {
	constructor() {
		this.left = new ButtonInput('ArrowLeft');
		this.up = new ButtonInput('ArrowUp');
		this.right = new ButtonInput('ArrowRight');
		this.down = new ButtonInput('ArrowDown');
		this.choose = new ButtonInput('Space');
	}

	registerKeyListeners(document) {
		document.onkeydown = (event) => this.onKeyDown(event);
		document.onkeyup = (event) => this.onKeyUp(event);
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

	handleInputs() {
		this.left.checkTriggered();
		this.up.checkTriggered();
		this.right.checkTriggered();
		this.down.checkTriggered();
		this.choose.checkTriggered();
	}

	setOnLeft(onLeft) {
		this.left.setPressedListener(onLeft);
	}

	setOnUp(onUp) {
		this.up.setPressedListener(onUp);
	}

	setOnDown(onDown) {
		this.down.setPressedListener(onDown);
	}

	setOnRight(onRight) {
		this.right.setPressedListener(onRight);
	}

	setOnChoose(onChoose) {
		this.choose.setPressedListener(onChoose);
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

	checkTriggered() {
		if (this.isPressed) {
			this.onPressed();
			this.isPressed = false;
		}
	}

	setPressedListener(onPressed) {
		this.onPressed = onPressed;
	}
}

export default ControlListener;
