const three = require('three')
const Material = require('./material.js')

var had_hit = false

class Renderer {
	constructor(camera, material, background) {
		let default_camera = new three.PerspectiveCamera(45, 1, 0.5, 1024)
		let default_material = new Material.Checkers([[255,0,0,255], [255,255,255,255]], [1/8,1/8])
		let default_background = [24,24,24, 255]
		
		this.scene = new three.Scene()
		this.raycaster = new three.Raycaster()
		
		this.background = background || default_background
		this.camera = camera || default_camera
		this.material = material || default_material
	}
	
	at(u, v) {
		const {raycaster, scene, background, material} = this
		
		let uv = new three.Vector2(2*u - 1, 2*v - 1)
		raycaster.setFromCamera(uv, this.camera)
		
		let hits = raycaster.intersectObjects(scene.children, true)
		let hit = hits[0] || undefined
		
		if(hit) 
			return material.at(hit.uv.x, hit.uv.y)
		else
			return background
	}
}

module.exports = Renderer