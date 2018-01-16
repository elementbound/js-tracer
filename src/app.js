const PixelBuffer = require('./pixelbuffer.js')

let width = 320
let height = 180

// Create canvas
let canvas = document.createElement('canvas')
canvas.width = width
canvas.height = height

document.body.appendChild(canvas);

// Get context 
let context = canvas.getContext('2d')

// Create pixel buffer
buffer = new PixelBuffer(context, width, height)

// Draw something nice 
for(let y = 0; y < height; ++y)
	for(let x = 0; x < width; ++x) 
		buffer.set(x,y, x/width*255|0, y/height*255|0, 128, 255)
	
// Put it on the canvas
context.putImageData(buffer.data(), 0,0)