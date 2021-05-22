class ControlListener {
	constructor(document) {
		this.document = document;
		this.keyListeners = {};
	}

	addKeyListener(name, keyName, document, onPressed, onReleased) {
		const listener = new KeyInputListener(document, keyName, onPressed, onReleased);
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

class KeyInputListener {
	constructor(document, keyCode, onPressed, onReleased = ()=>{}) {
		this.document = document;
		this.keyCode = keyCode;

		this.isPressed = false;
		this.isReleased = false;

		this.onPressed = onPressed;
		this.onReleased = onReleased;

		this.onKeyDown = (event) => {
			if (event.code !== this.keyCode) {
				return;
			}
			this.isPressed = true;
			this.isReleased = false;
		};
		this.onKeyUp = (event) => {
			if (event.code !== this.keyCode) {
				return;
			}
			this.isPressed = false;
			this.isReleased = true;
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
		if (this.isPressed) {
			this.onPressed();
			this.isPressed = false;
		}
		if (this.isReleased) {
			this.onReleased();
			this.isReleased = false;
		}
	}
}

export default ControlListener;
