const {range, shuffle} = require('./utils.js')
const Worker = require('worker-loader!./worker.js')

const addHandler = (event, handler) => {
	let prevHandler = event
	event = () => {
		prevHandler(...arguments)
		handler(...arguments)
	}
}

class Master {
	constructor(worker_count, buffer, renderer) {
		this.buffer = buffer
		this.renderer = renderer
		this.worker_count = worker_count
		
		this.workers = [...Array(worker_count).keys()].map(_ => new Worker)
		this.active_workers = this.worker_count
			
		this.workers.forEach((worker, i) => {
			worker.postMessage({
				type: 'handshake',
				size: [buffer.width, buffer.height],
				id: i,
				worker_count: this.worker_count
			})
			
			this.register(worker)
		})
		
		this.onFrame = undefined
		this.onChunk = undefined
	}
	
	postFrame() {
		let chunks = range(this.worker_count).map(_ => [])
		
		for(let y = 0; y < this.buffer.height; ++y) {
			for(let x = 0; x < this.buffer.width; ++x) {
				let worker_id = (x+y) % this.worker_count
				chunks[worker_id].push([x,y])
			}
		}
		
		chunks.forEach((chunk, i) => 
			this.workers[i].postMessage({
				type: 'tick',
				queue: chunk
			})
		)
		
		this.active_workers = this.worker_count
	}
	
	receiveChunk(chunk) {
		console.log(`[Master] Returned chunk, active workers: ${this.active_workers-1}`)
		
		chunk.forEach(pixel => {
			let x = pixel.at[0]
			let y = pixel.at[1]
			let color = pixel.result
			
			buffer.set(x,y, ...color)
		})
		
		if(this.onChunk)
			this.onChunk(this)
		
		if(!--this.active_workers)
			this.present()
	}
	
	present() {
		if(this.onFrame)
			this.onFrame(this)
	}
	
	register(worker) {
		worker.onmessage = e => {
			e = e.data
			console.log('[Master] Got message:', e.type)
			
			if(e.type == 'tick-result') {
				this.receiveChunk(e.result)
			} else {
				console.log(`[Master] Unknown message type: ${e.type}`)
			}
		}
	}
}

module.exports = Master