class Vector {
	constructor(x, y) {
		if (!x){
			x = 0;
		}
		if (!y){
			y = 0;
		}
		this.x = x;
		this.y = y;
	}

	getLength() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}
	
	normalized() {
		var length = this.getLength();
		var x = this.x / length;
		var y = this.y / length;
		return new Vector(x, y);
	}
	
	add(that) {
		var x = this.x + that.x;
		var y = this.y + that.y;
		return new Vector(x, y);
	}
	
	subtract(that) {
		var x = this.x - that.x;
		var y = this.y - that.y;
		return new Vector(x, y);
	}
	
	dotProduct(that) {
		return ( (this.x * that.x) + (this.y * that.y) );
	}
	
	multiplyScalar(scalar) {
		var x = (this.x * scalar);
		var y = (this.y * scalar);
		return new Vector(x, y);
	}

	round() {
		return new Vector(Math.round(this.x), Math.round(this.y));
	}

	clone() {
		return new Vector(this.x, this.y);
	}
}

export default Vector;
