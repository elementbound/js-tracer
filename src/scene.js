const three = require('three')
const Material = require('./material.js')
const Renderer = require('./renderer.js')

module.exports = (size) => {
	const aspect = size[1] / size[0]
	
	// Create scene
	const renderer = new Renderer()
	renderer.background = [24,24,24,255]
	renderer.camera = new three.PerspectiveCamera(45, size[0]/size[1], 0.5,2048)
	renderer.camera.lookAt(0,0,4)
	with(renderer) {
		scene.add(camera)
	}
	
	const sphereGeometry = new three.IcosahedronGeometry(1, 1)
	const sphereMaterial = new Material.Checkers([[255,0,0,255], [255,255,255,255]], [1/12,1/6])
	const sphere = new three.Mesh(sphereGeometry, sphereMaterial)
	
	const knotGeometry = new three.TorusKnotGeometry(1, 0.2, 32*4, 4, 6,8)
	const knotMaterial = new Material.Checkers([[255,0,0,255], [255,255,255,255]], [1/48,1/12])
	const knot = new three.Mesh(knotGeometry, knotMaterial)
	
	sphere.position.z = 4
	knot.position.z = 12
	
	renderer.scene.add(sphere, knot)
	renderer.scene.updateMatrixWorld()
	
	renderer.update = time => {
		sphere.position.x = Math.sin(time/32000 * 2*Math.PI) * 2
		renderer.camera.lookAt(sphere.position)
		renderer.scene.updateMatrixWorld()
	}
	
	return renderer
}