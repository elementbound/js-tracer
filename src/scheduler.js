module.exports = function*(id, n, size) {
	for(let y = 0; y < size[1]; ++y) 
		for(let x = 0; x < size[0]; ++x)
			if((x+y) % n == id)
				yield [x,y]
}