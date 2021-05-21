class SoundEngine {
	constructor(document) {
		this.document = document;
		this.sounds = {};
		this.playing = {};
		this.context = new (window.AudioContext || window.webkitAudioContext)();
		this.gainNode = this.context.createGain();
		this.gainNode.gain.value = SoundEngine.GAIN;
		this.gainNode.connect(this.context.destination);
	}

	async loadAllSounds() {
		this.sounds = {
			INTRO: await this.loadAudio('hello_odd.mp3'),
			INDOORS: await this.loadAudio('open_breeze.mp3'),
			MAP: await this.loadAudio('happy_outback.mp3'),
		};
	}

	async playAudio(name, loop = false) {
		const buffer = this.sounds[name];
		if (!buffer) {throw new Error(`cound not play audio "${name}"`);}
		if (this.playing[name]) {throw new Error(`playing same audio twice "${name}"`);}
		const source = this.context.createBufferSource();
		source.buffer = await this.context.decodeAudioData(buffer.slice(0));
		source.connect(this.gainNode);
		source.loop = loop;
		this.playing[name] = source;
		source.start();
		return source;
	}

	stopAudio(name) {
		const source = this.playing[name];
		source.stop();
		delete this.playing[name];
		return source;
	}

	stopAll() {
		Object.keys(this.playing).forEach((name) => this.stopAudio(name));
	}

	async loadAudio(path) {
		const fullPath = '/assets/audio/' + path;
		const result = await fetch(fullPath);
		const buffer = await result.arrayBuffer();
		return buffer;
	}
}

SoundEngine.GAIN = 0.25;

export default SoundEngine;
