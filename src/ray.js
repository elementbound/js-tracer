const {zip} = require('./utils.js')

class Ray {
    constructor(from, dir) {
        this.from = from
        this.dir = dir
    }

    at(t) {
        return zip(this.from, this.dir)
                .map(([a,b]) => a + t*b)
    }
}

module.exports = Ray