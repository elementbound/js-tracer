const alf = require('alfador')

const iterableVectors = alf => {
	alf.Vec2.prototype[Symbol.iterator] = function*() {
		yield this.x
		yield this.y
	}
	
	alf.Vec3.prototype[Symbol.iterator] = function*() {
		yield this.x
		yield this.y
		yield this.z
	}
	
	alf.Vec4.prototype[Symbol.iterator] = function*() {
		yield this.x
		yield this.y
		yield this.z
		yield this.w
	}
}

const lookAt = alf => {
	alf.Mat44.lookAt = (eye, at, up) => {
		eye = new alf.Vec3(eye)
		at = new alf.Vec3(at)
		
		let u = new alf.Vec3(up).normalize()
		
		let f = at.sub(eye).normalize()
		let s = f.cross(up).normalize()
		u = s.cross(f).normalize()
		
		f = f.negate()
		
		// debugger
		
		return new alf.Mat44([
			...s, 0,
			...u, 0,
			...f, 0,
			0,0,0,1
		])
	}
}

iterableVectors(alf)
lookAt(alf)

module.exports = alf