import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import GUI from 'lil-gui'

gsap.registerPlugin(ScrollTrigger)

const data = {
	progress: 0,
	ball1: {
		color1: '#17c9ff',
		color2: '#ff1783',
	},
	ball2: {
		color1: '#ff1783',
		color2: '#36ff40',
	},
}

const canvas = document.querySelector<HTMLCanvasElement>('.canvas')!

const ctx = canvas.getContext('2d')!
canvas.width = 1024
canvas.height = 1024

const [width, height] = [canvas.width, canvas.height]

function drawGradationCircle(center: [number, number], radius: number, color1: string, color2: string) {
	const gradient = ctx.createLinearGradient(center[0], center[1] - radius / 2, center[0], center[1] + radius / 2)
	gradient.addColorStop(0, color1)
	gradient.addColorStop(1, color2)
	ctx.fillStyle = gradient

	ctx.beginPath()
	ctx.arc(center[0], center[1], radius, 0, Math.PI * 2, false)
	ctx.fill()
}

function draw(progress: number) {
	const p = 1 - progress
	ctx.clearRect(0, 0, width, height)
	drawGradationCircle([width / 2, height / 2 - 250 * p], 100, data.ball1.color1, data.ball1.color2)
	drawGradationCircle([width / 2, height / 2 + 250 * p], 150, data.ball2.color1, data.ball2.color2)
}

draw(0)

// ScrollTrigger.create({
// 	trigger: '.section',
// 	start: 'top top',
// 	end: 'bottom bottom',
// 	scrub: true,
// 	onUpdate: (trigger) => {
// 		draw(trigger.progress)
// 	},
// })

gsap.to(data, {
	progress: 1,
	scrollTrigger: {
		trigger: '.section',
		start: 'top top',
		end: 'bottom bottom',
		scrub: 0.5,
	},
	onUpdate: () => {
		draw(data.progress)
	},
})

const gui = new GUI()
const f1 = gui.addFolder('ball 1')
f1.addColor(data.ball1, 'color1').onChange(() => draw(data.progress))
f1.addColor(data.ball1, 'color2').onChange(() => draw(data.progress))
const f2 = gui.addFolder('ball 2')
f2.addColor(data.ball2, 'color1').onChange(() => draw(data.progress))
f2.addColor(data.ball2, 'color2').onChange(() => draw(data.progress))
