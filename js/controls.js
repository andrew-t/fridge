const controls = {
	v: 0,
	fridge: false
};

export default controls;

const left = 37, right = 39, fridge = 32;

window.addEventListener('keydown', e => {
	switch (e.keyCode) {
		case left:
			controls.v = -1;
			break;
		case right:
			controls.v = 1;
			break;
		case fridge:
			controls.fridge = true;
			break;
		default:
			console.log('key down', e.keyCode);
			return;
	}
	e.preventDefault();
});

window.addEventListener('keyup', e => {
	switch (e.keyCode) {
		case left:
		case right:
			controls.v = 0;
			break;
		case fridge:
			controls.fridge = false;
			break;
		default: return;
	}
	e.preventDefault();
});

window.addEventListener('keypress', e => {
	switch (e.keyCode) {
		case left:
		case right:
		case fridge:
			e.preventDefault();
	}
});
