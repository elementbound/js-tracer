class PixelBuffer {
    constructor(context, width, height) {
        this.width = width
        this.height = height
        this.image = context.createImageData(this.width, this.height)
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

    data() {
        return this.image
    }
}

module.exports = PixelBuffer