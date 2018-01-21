const PixelBuffer = require('./pixelbuffer.js')
const Sphere = require('./sphere.js')
const Ray = require('./ray.js')
const {PerspectiveCamera} = require('./camera.js')
const Material = require('./material.js')
const Renderer = require('./renderer.js')

const size = [1280,720].map(x => 0|x/6)
const aspect = size.reduce((w,h) => h/w)

// Create buffer and canvas
const canvas = document.createElement('canvas')
canvas.width = size[0]
canvas.height = size[1]
document.body.appendChild(canvas)

canvas.style.cssText += `
    position: fixed;
    left: 50%;
    top: 50%;

    transform-origin: center center;

    /* https://stackoverflow.com/questions/8597081/how-to-stretch-images-with-no-antialiasing */
    image-rendering: optimizeSpeed;             /* STOP SMOOTHING, GIVE ME SPEED  */
    image-rendering: -moz-crisp-edges;          /* Firefox                        */
    image-rendering: -o-crisp-edges;            /* Opera                          */
    image-rendering: -webkit-optimize-contrast; /* Chrome (and eventually Safari) */
    image-rendering: pixelated; /* Chrome */
    image-rendering: optimize-contrast;         /* CSS3 Proposed                  */
    -ms-interpolation-mode: nearest-neighbor;   /* IE8+                           */
`

const context = canvas.getContext('2d')

buffer = new PixelBuffer(context, ...size)

// Create scene
const renderer = new Renderer(
		new PerspectiveCamera(aspect, 2),
		new Material.Checkers([[255,255,255,255], [255,0,0,255]], [1/12, 1/12])
	)
	
const sphere = new Sphere(0,0,8, 1)	
renderer.objects.push(sphere)

// Draw something
const update = time => {
    sphere.pos[0] = Math.sin(time/8000*Math.PI) * 2
}

const draw = buffer => {
    const width = buffer.width
    const height = buffer.height

    buffer.map((x,y, u,v) => renderer.at(u,v))
    buffer.draw(0,0)
}

const loop = time => {
    update(time)
    draw(buffer)

    window.requestAnimationFrame(time => loop(time))
}

const fitToWidth = canvas => (w, h) => {
	let size = [canvas.width, canvas.height]
	let scale = Math.max(
		w / size[0],
		h / size[1]
	)
	canvas.style.transform = `translate(-50%, -50%) scale(${scale})`
	
	console.log(`Fitting: ${size} => ${[w, h]}`)
}

loop(0)
window.onresize = () => {
	window.requestAnimationFrame(() => {
		fitToWidth(canvas)(window.innerWidth, window.innerHeight)
	})
}
window.onresize()