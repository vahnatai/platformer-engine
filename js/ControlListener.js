class ControlListener {
	constructor(document) {
		this.document = document;
		this.keyListeners = {};
	}

	addListener(name, keyName, document, onPressed) {
		const listener = new ButtonInputListener(document, keyName, onPressed);
		this.keyListeners[name] = listener;
	}

	start() {
		Object.values(this.keyListeners).forEach((listener) => listener.start());
	}

	stop() {
		Object.values(this.keyListeners).forEach((listener) => listener.stop());
	}

	handleInputs() {
		Object.values(this.keyListeners).forEach((listener) => listener.checkTriggered());
	}
}

class ButtonInputListener {
	constructor(document, keyCode, onPressed) {
		this.document = document;
		this.keyCode = keyCode;
		this.isPressed = false;
		this.onPressed = onPressed;
	}

	start() {
		this.document.addEventListener('keydown', (event) => this.onKeyDown(event));
		this.document.addEventListener('keyup', (event) => this.onKeyUp(event));
	}
	
	stop() {
		this.document.removeEventListener('keydown', (event) => this.onKeyDown(event));
		this.document.removeEventListener('keyup', (event) => this.onKeyUp(event));
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
}

export default ControlListener;
