
let score = 0,
	counter;

export function init() {
	counter = document.getElementById('score');
	reset();
}

export function reset() {
	score = 0;
	counter.innerHTML = score;
}

export function increment() {
	++score;
	counter.innerHTML = score;
}
