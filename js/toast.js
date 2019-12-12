let els;
function getEls() {
	if (!els) els = {
		container: document.getElementById('toast-container'),
		main: document.getElementById('toast-main')
	};
	return els;
}

let t = null;

export default function toast(message, duration = 5000) {
	console.log('BREAKING NEWS:', message);
	if (t) clearTimeout(t);
	const { container, main } = getEls();
	main.innerHTML = message;
	container.classList.add('on');
	t = setTimeout(() => {
		container.classList.remove('on');
	}, duration);
}
