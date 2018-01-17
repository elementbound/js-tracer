const PixelBuffer = require('./pixelbuffer.js')

const size = [320,180]

// Create buffer and canvas
const canvas = document.createElement('canvas')
canvas.width = size[0]
canvas.height = size[1]
document.body.appendChild(canvas)

const context = canvas.getContext('2d')

buffer = new PixelBuffer(context, ...size)

// Draw something
const draw = buffer => {
    const width = buffer.width
    const height = buffer.height

    for(let y = 0; y < height; ++y)
        for(let x = 0; x < width; ++x)
            buffer.set(x,y, x/width*255, y/height*255, 128, 255)

    buffer.draw(0,0)
}

draw(buffer)