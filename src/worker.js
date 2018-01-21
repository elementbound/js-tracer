const Renderer = require('./renderer.js')
const Scene = require('./scene.js')

var size = [1,1]
var id = undefined
var worker_count = 1

class Worker {
	constructor() {
		this.renderer = undefined
	}
	
	handshake(size) {
		this.renderer = Scene(size)
	}
	
	tick() {
		console.time(`[Worker#${id}] chunk-render`)
		let result = []
		for(let y = 0; y < size[1]; ++y) {
			for(let x = 0; x < size[0]; ++x) {
				if((x*y) % worker_count != id)
					continue
				
				result.push({
					at: [x,y],
					result: this.renderer.at(x/size[0],y/size[1])
				})
			}
		}
		console.timeEnd(`[Worker#${id}] chunk-render`)
		
		this.renderer.update()
		
		return result
	}
}

const worker = new Worker()

onmessage = function(e) {
	e = e.data
	
	if(e.type == 'handshake') {
		size = e.size
		id = e.id
		worker_count = e.worker_count
		
		console.log('[Worker] Handshake at size:', size)
		worker.handshake(size)
	} else if(e.type == 'tick') {
		let result = worker.tick()
		postMessage({
			type: 'tick-result',
			result
		})
		
		console.log('[Worker] Posted return')
	}else {
		throw new Error(`Unknown message type: ${e.type}`)
	}
}