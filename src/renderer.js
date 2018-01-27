const three = require('three')

var had_hit = false

class Renderer {
	constructor(camera, material, background) {
		let default_camera = new three.PerspectiveCamera(45, 1, 0.5, 1024)
		let default_material = undefined
		let default_background = [24,24,24, 255]
		
		this.scene = new three.Scene()
		this.raycaster = new three.Raycaster()
		
		this.background = background || default_background
		this.camera = camera || default_camera
		this.material = material || default_material
	}
	
	at(u, v) {
		const {raycaster, scene, background} = this
		
		let uv = new three.Vector2(2*u - 1, 2*v - 1)
		raycaster.setFromCamera(uv, this.camera)
		
		let hits = raycaster.intersectObjects(scene.children, true)
		let hit = hits[0] || undefined
		
		if(hit) 
			return [hit.uv.x, hit.uv.y, 0, 1].map(x => 0|x*255)
		else
			return background
	}
}

module.exports = Renderer