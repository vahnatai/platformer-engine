class Path {
	constructor(destination, isSecret, directionForth,	directionBack) {
		this.destination = destination;
		this.isSecret = isSecret;
		this.directionForth = directionForth;
		this.directionBack = directionBack;
		this.isHidden = true;
	}

	reveal() {
		this.isHidden = false;
	}
}

export default Path;
