const three = require('three')

var had_hit = false

class Renderer {
	constructor(camera, background) {
		let default_camera = new three.PerspectiveCamera(45, 1, 0.5, 1024)
		let default_background = [24,24,24, 255]
		
		this.scene = new three.Scene()
		this.raycaster = new three.Raycaster()
		
		this.background = background || default_background
		this.camera = camera || default_camera
	}
	
	at(u, v) {
		const {raycaster, scene, background} = this
		
		let uv = new three.Vector2(2*u - 1, 2*v - 1)
		raycaster.setFromCamera(uv, this.camera)
		
		let hits = raycaster.intersectObjects(scene.children, true)
		let hit = hits[0] || undefined
		
		if(hit) {
			let object = hit.object
			let uv = hit.uv
			
			return object.material.at(uv.x, uv.y)
		} else {
			return background
		}
	}
}

module.exports = Renderer