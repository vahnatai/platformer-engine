import GameEngine from './engine/GameEngine.js';

window.onload = async () => {
	const gameCanvas = document.getElementById('gameCanvas');
	const gameMenu = document.getElementById('gameMenu');
	const musicVolumeInput = document.getElementById('musicVolumeInput');
	const fxVolumeInput = document.getElementById('fxVolumeInput');
	const debugInput = document.getElementById('debugInput');
	
	const gameEngine = new GameEngine(window, document, gameCanvas, gameMenu, musicVolumeInput, fxVolumeInput, debugInput);
	await gameEngine.start();
};
