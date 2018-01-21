const Sphere = require('./sphere.js')
const Ray = require('./ray.js')
const {PerspectiveCamera} = require('./camera.js')
const Material = require('./material.js')
const Renderer = require('./renderer.js')

module.exports = (size) => {
	const aspect = size[1] / size[0]
	
	// Create scene
	const renderer = new Renderer(
			new PerspectiveCamera(aspect, 2),
			new Material.Checkers([[255,255,255,255], [255,0,0,255]], [1/12, 1/12])
		)
	renderer.background = [24,24,24,255]
		
	const sphere = new Sphere(0,0,8, 1)	
	renderer.objects.push(sphere)
	
	renderer.update = () => {
		let time = performance.now()
		
		sphere.pos[0] = Math.sin(time/8000 * 2*Math.PI) * 2
	}
	
	return renderer
}