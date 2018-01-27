const Renderer = require('./renderer.js')
const Scene = require('./scene.js')
const schedule = require('./scheduler.js')

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
	
	tick(time) {
		console.time(`[Worker#${id}] chunk-render`)
		let result = []
		for(let at of schedule(id, worker_count, size)) {
			result.push(this.renderer.at(at[0]/size[0], at[1]/size[1]))
		}
		console.timeEnd(`[Worker#${id}] chunk-render`)
		
		this.renderer.update(time)
		
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
		let result = worker.tick(e.time)
		postMessage({
			type: 'tick-result',
			id,
			result
		})
		
		console.log('[Worker] Posted return')
	}else {
		throw new Error(`Unknown message type: ${e.type}`)
	}
}