const {zip} = require('./utils.js')
const {normalized} = require('./vecmath.js')

class Ray {
    constructor(from, dir) {
        this.from = from
        this.dir = normalized(dir)
    }

    at(t) {
        return zip(this.from, this.dir)
                .map(([a,b]) => a + t*b)
    }
}

module.exports = Ray