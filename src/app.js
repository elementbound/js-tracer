const PixelBuffer = require('./pixelbuffer.js')
const Sphere = require('./sphere.js')
const Ray = require('./ray.js')
const {PerspectiveCamera} = require('./camera.js')
const Material = require('./material.js')

const size = [320,180]
const aspect = size.reduce((w,h) => h/w)

// Create buffer and canvas
const canvas = document.createElement('canvas')
canvas.width = size[0]
canvas.height = size[1]
document.body.appendChild(canvas)

const context = canvas.getContext('2d')

buffer = new PixelBuffer(context, ...size)

// Create scene
const sphere = new Sphere(0,0,8, 1)
const camera = new PerspectiveCamera(aspect, 2)

const checkers = new Material.Checkers([[255,255,255,255], [255,0,0,255]], [0.25,0.125])
const uv_material = new Material.UV()

// Draw something
const update = time => {
    sphere.pos[0] = Math.sin(time/8000*Math.PI) * 2
}

const draw = buffer => {
    const width = buffer.width
    const height = buffer.height

    buffer.map((x,y, u,v) => [u*255, v*255, 128, 255])
    buffer.map((x,y, u,v) => {
        let ray = camera.ray(u,v)
        let hit = sphere.raycast(ray)

        if(hit) 
            return uv_material.at(hit.u, hit.v)
    })

    buffer.draw(0,0)
}

const loop = time => {
    update(time)
    draw(buffer)

    window.requestAnimationFrame(time => loop(time))
}

loop(0)