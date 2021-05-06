import GameEngine from './GameEngine.js';

window.onload = () => {
	const gameCanvas = document.getElementById('gameCanvas');
	// const outputBox = document.getElementById('outputBox');
	// const inputBox = document.getElementById('inputBox');
	// const sendButton = document.getElementById('sendButton');
	// const pointCount = document.getElementById('pointCount');
	// const stepCount = document.getElementById('stepCount');
	
	const gameEngine = new GameEngine(window, document, gameCanvas);
	//new Game(inputBox, outputBox, pointCount, stepCount, sendButton);
	gameEngine.start();
};