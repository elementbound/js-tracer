const {zip} = require('./utils.js')
const {radtodeg, vecdir, vecpitch} = require('./vecmath.js')

var logged = 0;

class Sphere {
    constructor(x,y,z, r) {
        this.pos = [x,y,z]
        this.r = r
    }

    raycast(ray) {
        // Based on: https://gamedev.stackexchange.com/a/117296
        // Also: https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-sphere-intersection

        let [i,j,k] = ray.dir
        let [x1,y1,z1] = ray.from
        let [l,m,n] = this.pos
        let r = this.r

        let a = i*i + j*j + k*k
        let b = 2*i*(x1 - l) + 2*j*(y1 - m) + 2*k*(z1 - n)
        let c = (x1-l)**2 + (y1-m)**2 + (z1-n)**2 - r**2;

        let D = b*b - 4*a*c
        if(D < 0)
            return undefined
        else {
            let t = Math.min(
                (-b + Math.sqrt(D)) / 2*a,
                (-b - Math.sqrt(D)) / 2*a
            )
            let at = ray.at(t)
            
            let rel = zip(at, this.pos).map(([a,b]) => a-b)
            let u = 0.5 + radtodeg(vecdir(rel)) / 360
            let v = 0.5 + radtodeg(vecpitch(rel)) / 180

            let hit = {
                t, at, ray, u,v, rel, object_pos: this.pos
            }

            logged = ++logged % (1<<18)
            if(logged == 0) {
                console.log(hit)
            }

            return hit
        }
    }
}

module.exports = Sphere