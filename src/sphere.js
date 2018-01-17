class Sphere {
    constructor(x,y,z, r) {
        this.pos = [x,y,z]
        this.r = r
    }

    raycast(ray) {
        // Based on: https://gamedev.stackexchange.com/a/117296

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
            let t = -(b + Math.sqrt(D)) / 2*a
            return {
                t,
                at: ray.at(t),
                ray: ray
            }
        }
    }
}

module.exports = Sphere