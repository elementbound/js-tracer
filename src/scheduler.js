const Random = require('random-js')

module.exports = function*(id, n, size) {
	let mt = Random.engines.mt19937()
	mt.seed(80085)
	
	for(let y = 0; y < size[1]; ++y) 
		for(let x = 0; x < size[0]; ++x)
			if(Random.integer(0,n-1)(mt) == id)
				yield [x,y]
}