class PixelBuffer {
    constructor(context, width, height) {
        this.width = width
        this.height = height
        this.image = context.createImageData(this.width, this.height)
        this.context = context
    }

    set(x,y, r,g,b,a) {
        x = x|0
        y = y|0
        let i = (y*this.width + x)*4;

        this.image.data[i+0] = r
        this.image.data[i+1] = g
        this.image.data[i+2] = b
        this.image.data[i+3] = a
    }
	
	get(x,y) {
		x = x|0
		y = y|0
        let i = (y*this.width + x)*4;
		
		return [
			this.image.data[i+0],
			this.image.data[i+1],
			this.image.data[i+2],
			this.image.data[i+3]
		]
	}

    data() {
        return this.image
    }

    map(callback) {
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                let u = x / this.width
                let v = y / this.height
                let color = callback(x,y, u,v, this)
                if(color && color.length == 4) 
                    this.set(x,y, ...color)
            }
        }
    }

    draw(x, y) {
        this.context.putImageData(this.image, x||0, y||0)
    }
}

module.exports = PixelBuffer