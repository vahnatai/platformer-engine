import GameEngine from './engine/GameEngine.js';

window.onload = async () => {
	const gameCanvas = document.getElementById('gameCanvas');
	
	const gameEngine = new GameEngine(window, document, gameCanvas);
	await gameEngine.start();
};
