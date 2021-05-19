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

		this.onKeyDown = (event) => {
			if (event.code !== this.keyCode) {
				return;
			}
			this.isPressed = true;
		};
		this.onKeyUp = (event) => {
			if (event.code !== this.keyCode) {
				return;
			}
			this.isPressed = false;
		};
	}

	start() {
		this.document.addEventListener('keydown', this.onKeyDown);
		this.document.addEventListener('keyup', this.onKeyUp);
	}
	
	stop() {
		this.document.removeEventListener('keydown', this.onKeyDown);
		this.document.removeEventListener('keyup', this.onKeyUp);
	}

	checkTriggered() {
		if (this.isPressed) {
			this.onPressed();
			this.isPressed = false;
		}
	}
}

export default ControlListener;
