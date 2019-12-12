import controls from './controls.js';
import Fridge from './Fridge.js';
import Reporter from './Reporter.js';
import Boris from './Boris.js';
import * as score from './score.js';
import toast from './toast.js';

const fridgeCount = 3,
	reporterCount = 6,
	maxDelta = 100; // ms in one frame at 10fps

// all the values are just x coordinates, out of 100
let boris = null,
	reporters = [],
	fridges = [];

// run the main code every frame
let lastTimestamp = null;
function frame(timestamp) {
	if (!lastTimestamp) {
		lastTimestamp = timestamp;
		requestAnimationFrame(frame);
		return;
	}
	const delta = Math.min(
		(timestamp - lastTimestamp) / 1000,
		maxDelta);
	lastTimestamp = timestamp;
	runFrame(delta);
	requestAnimationFrame(frame);
}

// initialise
document.addEventListener('DOMContentLoaded', e => {
	score.init();
	requestAnimationFrame(frame);
});

let spaceCounts = false,
	spaceDown = false;
window.addEventListener('keydown', e => {
	spaceCounts = !spaceDown && (!boris || boris.dead);
	spaceDown = true;
});
window.addEventListener('keyup', e => {
	if (spaceCounts && e.keyCode == 32)
		startGame();
	spaceDown = false;
})

function startGame() {
	document.body.classList.remove('fresh');
	document.getElementById('board').innerHTML = '';
	fridges = [];
	for (let i = 0; i < fridgeCount; ++i)
		fridges.push(new Fridge(
			100 * (i + 0.5) / (fridgeCount + 1)
		));
	reporters = [];
	for (let i = 0; i < reporterCount; ++i)
		reporters.push(new Reporter(!!(i & 1)));
	boris = new Boris(fridges, reporters);
	score.reset();
	toast('Prime Minister refuses to be interviewed by Andrew Neil');
}

// the main handler
function runFrame(delta) {
	for (const reporter of reporters)
		reporter.update(delta);
	for (const fridge of fridges)
		fridge.update(delta);
	if (boris)
		boris.update(delta);
}
