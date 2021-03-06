const PixelBuffer = require('./pixelbuffer.js')
const Master = require('./master.js')
const Scene = require('./scene.js')
const Logger = require('js-logger')

const createOverlay = () => {
	let overlay = document.createElement('div')
	overlay.style.cssText = `
		border: 1px solid black;
		background-color: rgba(0,0,0,0);
		color: white;
		position: fixed;
		right: 0px;
		bottom: 0px;
		z-index: 1;
	`
	
	return overlay
}

const updateOverlay = (overlay, data) => {
	let content = ''
	
	for(key in data) {
		content += `<tr>
			<td>${key}</td>
			<td>${data[key]}</td>
		</tr>`
	}
	
	content = `<table>${content}</table>`;
	
	overlay.innerHTML = content
}

const main = () => {
	const size = [1280,720].map(x => 0|x/8)
	const aspect = size.reduce((w,h) => h/w)
	const incremental = false
	
	Logger.useDefaults({
		defaultLevel: Logger.WARN
	})

	// Die if Webworkers are not available
	if(!window.Worker) {
		let error = document.createElement('span')
		error.innerHTML = "No Web Worker support detected. That's sad. :( ";
		error.style.cssText = `
			font-size: 4em;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		`;
		
		document.body.appendChild(error);
		return 0;
	}
	
	// Create overlay
	const overlay = createOverlay();
	document.body.appendChild(overlay);
	
	updateOverlay(overlay, {ayy: 'lmao'});

	// Create buffer and canvas
	const canvas = document.createElement('canvas')
	canvas.width = size[0]
	canvas.height = size[1]
	document.body.appendChild(canvas)

	canvas.style.cssText += `
		position: fixed;
		left: 50%;
		top: 50%;

		transform-origin: center center;

		/* https://stackoverflow.com/questions/8597081/how-to-stretch-images-with-no-antialiasing */
		image-rendering: optimizeSpeed;             /* STOP SMOOTHING, GIVE ME SPEED  */
		image-rendering: -moz-crisp-edges;          /* Firefox                        */
		image-rendering: -o-crisp-edges;            /* Opera                          */
		image-rendering: -webkit-optimize-contrast; /* Chrome (and eventually Safari) */
		image-rendering: pixelated; /* Chrome */
		image-rendering: optimize-contrast;         /* CSS3 Proposed                  */
		-ms-interpolation-mode: nearest-neighbor;   /* IE8+                           */
	`

	const context = canvas.getContext('2d')

	const renderer = Scene(size)
	buffer = new PixelBuffer(context, ...size)
	buffer.map(_ => renderer.background)
	
	// Set up webworkers
	const master = new Master(4, buffer, renderer)
	
	// Draw something
	const update = time => {
		renderer.objects[0].pos[0] = Math.sin(time/8000*Math.PI) * 2
	}

	const draw = buffer => {
		buffer.draw(0,0)
	}

	const loop = () => {
		master.postFrame()
		draw(buffer)
		updateOverlay(overlay, {
			'Render time': `${0|master.renderTime} ms`
		})
	}

	const fitToWidth = canvas => (w, h) => {
		let size = [canvas.width, canvas.height]
		let scale = Math.max(
			w / size[0],
			h / size[1]
		)
		canvas.style.transform = `translate(-50%, -50%) scale(${scale})`
		
		Logger.info(`Fitting: ${size} => ${[w, h]}`)
	}

	master.postFrame()
	master.onFrame = loop
	master.onChunk = _ => incremental && draw(buffer)
	
	window.onresize = () => {
		window.requestAnimationFrame(() => {
			fitToWidth(canvas)(window.innerWidth, window.innerHeight)
		})
	}
	window.onresize()
}

main()