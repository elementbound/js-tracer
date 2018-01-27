const three = require('three')
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
	
	const sphereGeometry = new three.SphereGeometry(1, 24,12)
	const sphereMaterial = new three.MeshLambertMaterial()
	const sphere = new three.Mesh(sphereGeometry, sphereMaterial)
	
	sphere.position.x = 0
	sphere.position.y = 0
	sphere.position.z = 4
	
	renderer.scene.add(sphere)
	renderer.scene.updateMatrixWorld()
	//sphere.updateMatrixWorld(); renderer.camera.updateMatrixWorld()
	
	renderer.update = () => {
		let time = performance.now()
		
		sphere.position.x = Math.sin(time/8000 * 2*Math.PI) * 2
		renderer.scene.updateMatrixWorld()
	}
	
	return renderer
}