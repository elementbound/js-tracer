const {range, shuffle} = require('./utils.js')
const Worker = require('worker-loader!./worker.js')
const schedule = require('./scheduler.js')

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
		
		this._frameStart = undefined
	}
	
	postFrame() {
		let time = performance.now()
		this.workers.forEach(worker => 
			worker.postMessage({
				type: 'tick',
				time
			})
		)
		
		this.active_workers = this.worker_count
		
		this._frameStart = performance.now()
	}
	
	receiveChunk(chunk, id) {
		console.log(`[Master] Returned chunk, active workers: ${this.active_workers-1}`)
		let size = [this.buffer.width, this.buffer.height]
		
		let locations = [...schedule(id, this.worker_count, size)]
		chunk.forEach((color, i) => {
			let at = locations[i]
			
			buffer.set(...at, ...color)
		})
		
		if(this.onChunk)
			this.onChunk(this)
		
		if(!--this.active_workers)
			this.present()
	}
	
	present() {
		let frameTime = performance.now() - this._frameStart;
		console.log(`[Master] Rendered frame in ${frameTime} ms`);
		
		if(this.onFrame)
			this.onFrame(this)
	}
	
	register(worker) {
		worker.onmessage = e => {
			e = e.data
			console.log('[Master] Got message:', e.type)
			
			if(e.type == 'tick-result') {
				this.receiveChunk(e.result, e.id)
			} else {
				console.log(`[Master] Unknown message type: ${e.type}`)
			}
		}
	}
}

module.exports = Master