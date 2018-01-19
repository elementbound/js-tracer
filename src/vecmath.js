const {zip} = require('./utils.js')

const degtorad = deg => 
    deg / 180 * Math.PI

const radtodeg = rad => 
    rad * 180 / Math.PI

const dot = (a,b) => 
    zip(a,b)
        .map(([a,b]) => a*b)
        .reduce((x,y) => x+y)

const veclen = v => 
    Math.sqrt(dot(v,v))
	
const normalized = v => {
	let l = veclen(v)
	return v.map(x => x/l)
}

const vecdir = v => 
    Math.atan2(v[1], v[0])

const vecpitch = v => 
    vecdir([
        veclen([v[0], v[1]]),
        v[2]
    ])

module.exports = {
    degtorad, radtodeg, 
    dot, veclen, normalized,
	vecdir, vecpitch
}