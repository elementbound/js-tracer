const PixelBuffer = require('./pixelbuffer.js')
const Sphere = require('./sphere.js')
const Ray = require('./ray.js')
const {PerspectiveCamera} = require('./camera.js')
const Material = require('./material.js')

const size = [1280,720].map(x => 0|x/8)
const aspect = size.reduce((w,h) => h/w)

// Create buffer and canvas
const canvas = document.createElement('canvas')
canvas.width = size[0]
canvas.height = size[1]
document.body.appendChild(canvas)

let scale = window.innerWidth / size[0];
canvas.style.cssText += `
    position: fixed;
    left: 50%;
    top: 50%;

    transform-origin: center center;
    transform: translate(-50%, -50%) scale(${scale});

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
const sphere = new Sphere(0,0,8, 1)
const camera = new PerspectiveCamera(aspect, 2)

const checkers = new Material.Checkers([[255,255,255,255], [255,0,0,255]], [1/12, 1/12])
const uv_material = new Material.UV()

// Draw something
const update = time => {
    sphere.pos[0] = Math.sin(time/8000*Math.PI) * 2
}

const draw = buffer => {
    const width = buffer.width
    const height = buffer.height

    buffer.map((x,y, u,v) => {
        let ray = camera.ray(u,v)
        let hit = sphere.raycast(ray)

        if(hit) 
            return checkers.at(hit.u, hit.v)
		else
			return [24,24,24,255]
    })

    buffer.draw(0,0)
}

const loop = time => {
    update(time)
    draw(buffer)

    window.requestAnimationFrame(time => loop(time))
}

loop(0)
