class Renderer {
	constructor(camera, material) {
		this.objects = []
		this.background = [24,24,24, 255]
		this.camera = camera
		this.material = material
	}
	
	at(u, v) {
		let ray = this.camera.ray(u,v)
		
		let hits = this.objects.map(
			object => object.raycast(ray)
		).filter(
			hit => hit || false
		)
		
		let hit = hits.length ? 
			hits.reduce(
				(a,b) => a.t < b.t ? a : b
			) :
			undefined

        if(hit) 
            return this.material.at(hit.u, hit.v)
		else
			return this.background
	}
}

module.exports = Renderer