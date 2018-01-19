const {zip} = require('./utils.js')

class Checkers {
    constructor(colors, size) {
        this.colors = colors
        this.size = size
    }

    at(u,v) {
        let uv = [u,v]
        uv = zip(uv, this.size).map(([u, s]) => (u/s)|0)
        
        let color_id = uv.reduce((u,v) => u+v) % 2
        
        return this.colors[color_id]
    }
}

class UV {
    at(u,v) {
        return [u,v,0,1]
            .map(x => (0|x*16)/16)
            .map(x =>  0|x*255)
    }
}

module.exports = {
    Checkers,
    UV
}