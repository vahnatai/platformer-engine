class SoundEngine {
	constructor(document, startMusicVolume, startFXVolume) {
		this.document = document;

		this.music = {};
		this.effects = {};
		this.playing = {};
		this.context = new (window.AudioContext || window.webkitAudioContext)();

		this.musicGainNode = this.context.createGain();
		this.musicGainNode.gain.value = startMusicVolume;
		this.musicGainNode.connect(this.context.destination);

		this.fxGainNode = this.context.createGain();
		this.fxGainNode.gain.value = startFXVolume;
		this.fxGainNode.connect(this.context.destination);
	}

	getMusicVolume() {
		return this.musicGainNode.gain.value;
	}

	setMusicVolume(value) {
		this.musicGainNode.gain.value = value;
	}

	getFXVolume() {
		return this.fxGainNode.gain.value;
	}

	setFXVolume(value) {
		this.fxGainNode.gain.value = value;
	}

	async loadAllSounds() {
		this.music = {
			INTRO: await this.loadAudio('music/hello_odd.mp3'),
			MAP: await this.loadAudio('music/happy_outback.mp3'),
			LEVEL_1: await this.loadAudio('music/open_breeze.mp3'),
		};
		this.effects = {
			JUMP: await this.loadAudio('effects/jump.wav'),
		};
	}

	async playMusic(name, loop = true) {
		const data = this.music[name];
		if (!data) {throw new Error(`could not find music "${name}"`);}
		if (this.playing[name]) {console.warn(`playing same music twice "${name}"`);}
		
		return this.playAudio(name, data, this.musicGainNode, loop);
	}
	
	async playFX(name, loop = false) {
		const data = this.effects[name];
		if (!data) {throw new Error(`could not find effect "${name}"`);}
		return this.playAudio(name, data, this.fxGainNode, loop);
	}

	async playAudio(name, data, gainNode, loop = false) {
		const source = this.context.createBufferSource();
		source.buffer = await this.context.decodeAudioData(data.slice(0));
		source.connect(gainNode);
		source.loop = loop;
		this.playing[name] = source;
		if (!loop) {
			source.addEventListener('ended', () => this.stopAudio(name));
		}
		source.start();
		return source;
	}

	stopAudio(name) {
		const source = this.playing[name];
		if (source) {
			source.stop();
			delete this.playing[name];
		}
		return source;
	}

	stopAll() {
		Object.keys(this.playing).forEach((name) => this.stopAudio(name));
	}

	async loadAudio(filePath) {
		const fullPath = '/assets/audio/' + filePath.replace(/\.\./g, ''); // guard against directory snooping
		const result = await fetch(fullPath);
		const buffer = await result.arrayBuffer();
		return buffer;
	}
}

export default SoundEngine;
