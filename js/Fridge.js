import Sprite from './Sprite.js';

export default class Fridge extends Sprite {
	constructor(x) {
		super(x, 'fridge', 1, 2);
		this.open();
	}

	open() {
		this.isOpen = true;
		this.setFrame(0, 0);
	}

	close() {
		this.isOpen = false;
		this.setFrame(0, 1);
	}
}
