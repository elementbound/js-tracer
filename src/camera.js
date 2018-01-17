const Ray = require('./ray.js')

class PerspectiveCamera { 
    constructor(aspect, znear) {
        this.pos = [0,0,0]
        
        this.aspect = aspect
        this.znear = znear
    }

    ray(u,v) {
        u = 2*u - 1
        v = 2*v - 1

        return new Ray(
            this.pos,
            [u, v*this.aspect, this.znear]
        )
    }
}

module.exports = {
    PerspectiveCamera
}