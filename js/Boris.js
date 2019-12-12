import Sprite from './Sprite.js';
import controls from './controls.js';
import toast from './toast.js';

const speed = 50,
	holdBreath = 5, // seconds
	breatheIn = 3.5, //seconds
	freeze = 20, // seconds
	warmUp = 40, // seconds
	interviewPenalty = 1 / 10; // essentially lives

export default class Fridge extends Sprite {
	constructor(fridges, reporters) {
		super(50, 'boris', 1, 2);
		this.fridges = fridges;
		this.reporters = reporters;
		this.inFridge = false;
		this.oxygen = 1;
		this.temperature = 1;
		this.polls = 1;
		this.dead = false;
		this.oxygenMeter = document.getElementById('oxygen');
		this.temperatureMeter = document.getElementById('temperature');
		this.pollsMeter = document.getElementById('polls');
		this.setAnimation(0, 2, 4);
	}

	update(delta) {
		if (!this.dead) {
			this.userInput(delta);
			this.updateStats(delta);
			this.checkForFailure(delta);
		}
		// update screen
		super.update(delta);
	}

	userInput(delta) {
		if (!this.inFridge) {
			this.x += controls.v * speed * delta;
			if (this.x > 100) this.x = 100;
			if (this.x < 0) this.x = 0;
		}
		if (!this.inFridge && controls.fridge)
			for (const fridge of this.fridges)
				if (this.isNear(fridge)) {
					this.inFridge = fridge;
					this.el.style.opacity = 0;
					this.x = fridge.x;
					fridge.close();
					break;
				}
		if (this.inFridge && !controls.fridge) {
			this.inFridge.open();
			this.inFridge = false;
			this.el.style.opacity = 1;
		}
	}

	updateStats(delta) {
		if (this.dead) return;
		if (this.inFridge) {
			this.oxygen -= delta / holdBreath;
			this.temperature -= delta / freeze;
			if (this.oxygen < 0)
				this.asphyxiate();
			if (this.temperature < 0)
				this.freeze();
		} else {
			this.oxygen += delta / breatheIn;
			this.temperature += delta / warmUp;
			if (this.oxygen > 1) this.oxygen = 1;
			if (this.temperature > 1) this.temperature = 1;
		}
		this.oxygenMeter.style.transform = `scaleX(${ this.oxygen })`;
		this.temperatureMeter.style.transform = `scaleX(${ this.temperature })`;
	}

	asphyxiate() {
		this.oxygen = 0;
		this.kill();
		toast('Prime Minister asphyxiates in fridge');
	}

	freeze() {
		this.temperature = 0;
		this.kill();
		toast('Prime Minister freezes to death in a fridge');
	}

	kill() {
		this.dead = true;
		for (const reporter of this.reporters)
			reporter.gameOver = true;
	}

	checkForFailure(delta) {
		if (!this.inFridge && !this.dead)
			for (const reporter of this.reporters)
				if (reporter.active && reporter.isNear(this)) {
					reporter.hit();
					toast('Conservatives slip in polls');
					this.polls -= interviewPenalty;
					if (this.polls <= 0) {
						this.polls = 0;
						this.kill();
						toast('Corbyn predicted to form minority government');
					}
				}
		this.pollsMeter.style.transform = `scaleX(${ this.polls })`;
	}
}
