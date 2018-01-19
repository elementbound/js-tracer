const zip = (a,b) => 
    a.map((_,i) => [a[i], b[i]])

const range = n => 
	[...Array(n).keys()]
	
const birandom = n => 
	(1 - 2*Math.random())*n
	
module.exports = {
    zip,
	range,
	
	birandom
}