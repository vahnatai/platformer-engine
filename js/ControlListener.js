class ControlListener {
	constructor(document) {
		this.document = document;
		this.keyListeners = {};
	}

	addKeyListener(name, keyName, document, onPressed) {
		const listener = new ButtonInputListener(document, keyName, onPressed);
		this.keyListeners[name] = listener;
	}

	forEachKeyListener(f) {
		return Object.values(this.keyListeners).forEach(f);
	}

	start() {
		this.forEachKeyListener((listener) => listener.start());
	}

	stop() {
		this.forEachKeyListener((listener) => listener.stop());
	}

	handleInputs() {
		this.forEachKeyListener((listener) => listener.checkPressed());
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

	checkPressed() {
		if (!this.isPressed) {
			return;
		}
		this.onPressed();
		this.isPressed = false;
	}
}

export default ControlListener;
