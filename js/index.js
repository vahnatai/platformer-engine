import GameEngine from './engine/GameEngine.js';

window.onload = async () => {
	const gameCanvas = document.getElementById('gameCanvas');
	const volumeInput = document.getElementById('volumeInput');
	const debugInput = document.getElementById('debugInput');
	
	const gameEngine = new GameEngine(window, document, gameCanvas, volumeInput, debugInput);
	await gameEngine.start();
};
