class DebugOverlay {
	constructor(context, level, character) {
		this.context = context;
		this.level = level;
		this.character = character;
		this.debug = {
			lastX: character.position.x,
			lastY: character.position.y,
		};
	}

	render() {
		// layout
		const x = 30;
		const y = 30;
		const width = 380;
		const paddingX = 12;
		const paddingY = 12;
		const lineHeight = 20;

		// grab some data
		const {x: startX, y: startY} = this.level.getStartCoords();
		const {x: posX, y: posY} = this.character.position.round();
		const {x: velX, y: velY} = this.character.velocity.round();
		const {x: accX, y: accY} = this.character.acceleration.round();
		const dx = this.debug.lastX - this.character.position.x;
		const dy = this.debug.lastY - this.character.position.y;

		// build lines so we can size the background dynamically
		const lines = [
			{text: 'Level: ' + this.level.id},
			{text: 'Start Position: ' + startX + ', ' + startY},
			{text: 'Position: ' + posX + ', ' + posY},
			{text: 'Velocity: ' + velX + ', ' + velY},
			{text: 'Acceleration: ' + accX + ', ' + accY},
			{text: 'On Ground: ' + this.character.isOnGround, color: this.character.isOnGround ? '#00AA00' : '#e01616ff'},
			{text: 'DX: ' + dx},
			{text: 'DY: ' + dy},
		];

		if (window.performance?.memory) {
			const memory = window.performance.memory;
			const heapUsed = (memory.usedJSHeapSize / 1048576).toFixed(2);
			const heapTotal = (memory.totalJSHeapSize / 1048576).toFixed(2);
			lines.push({text: `JS Heap: ${heapUsed} MB / ${heapTotal} MB`});
		}

		const height = paddingY * 2 + lines.length * lineHeight;

		// render background
		this.context.lineWidth = 1;
		this.context.globalAlpha = 0.75;
		this.context.fillStyle = '#AAAAAA';
		this.context.fillRect(x, y, width, height);
		this.context.globalAlpha = 1;

		// render text lines
		this.context.fillStyle = '#000000';
		this.context.font = '15px monospace';

		lines.forEach((line, i) => { // render each line with spacing and inner margin
			const yPos = y + paddingY + (i * lineHeight) + (lineHeight - 6);
			
			// if line has a color, split label from value and color the value
			if (line.color) {
				const parts = line.text.split(': ');
				const label = parts[0] + ': ';
				const value = parts[1];
				
				this.context.fillStyle = '#000000';
				this.context.fillText(label, x + paddingX, yPos);
				
				// measure label width to position value after it
				const labelWidth = this.context.measureText(label).width;
				this.context.fillStyle = line.color;
				this.context.fillText(value, x + paddingX + labelWidth, yPos);
			} else {
				this.context.fillStyle = '#000000';
				this.context.fillText(line.text, x + paddingX, yPos);
			}
		});

		this.debug.lastX = this.character.position.x;
		this.debug.lastY = this.character.position.y;
	}
}

export default DebugOverlay;
