const Renderer = require('./renderer.js')
const Scene = require('./scene.js')
const schedule = require('./scheduler.js')
const Logger = require('js-logger')

var size = [1,1]
var id = undefined
var worker_count = 1

class Worker {
	constructor() {
		this.renderer = undefined
		this._logger = Logger.get(`[Worker#${id}]`)
	}
	
	handshake(size) {
		this.renderer = Scene(size)
	}
	
	tick(time) {
		this._logger.time('Chunk render')
		let result = []
		for(let at of schedule(id, worker_count, size)) {
			result.push(this.renderer.at(at[0]/size[0], at[1]/size[1]))
		}
		this._logger.timeEnd('Chunk render')
		
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
		
		Logger.debug('[Worker] Handshake at size:', size)
		worker.handshake(size)
	} else if(e.type == 'tick') {
		let result = worker.tick(e.time)
		postMessage({
			type: 'tick-result',
			id,
			result
		})
		
		Logger.debug('[Worker] Posted return')
	}else {
		throw new Error(`Unknown message type: ${e.type}`)
	}
}