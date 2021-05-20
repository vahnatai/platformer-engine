import GameEngine from './engine/GameEngine.js';

window.onload = () => {
	const gameCanvas = document.getElementById('gameCanvas');
	
	const gameEngine = new GameEngine(window, document, gameCanvas);
	gameEngine.start();
};
