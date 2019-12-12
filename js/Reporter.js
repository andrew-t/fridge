import Sprite from './Sprite.js';
import * as score from './score.js';

const reporterSpeed = 30,
	randomExtraReporterSpeed = 15;

const questions = [
	'You took my phone, Prime Minister',
	'How are nurses who already work for the NHS "new"?',
	'Can you be trusted after being sacked for lying?',
	'Why did you promise 40 hospitals if you only plan to build 6?',
	'Why have you allowed a border in the Irish Sea?',
	'How can you "get Brexit done"?',
	'You say you oppose austerity so why do you plan so much of it?',
	'Why isn\'t you promised social care plan in the manifesto?'
];

export default class Reporter extends Sprite {
	constructor(left) {
		super(200 * (left ? 1 : -1), 'reporter', 1, 4);
		this.v = (left ? -1 : 1) *
			(reporterSpeed + Math.random() * randomExtraReporterSpeed);
		this.active = true;
		this.setAnimation(0, 4, 4 * Math.abs(this.v) / reporterSpeed);
		this.mirror = left;
		this.speechContainer = document.createElement('div');
		this.speechBubble = document.createElement('span');
		this.speechContainer.classList.add('speech-bubble');
		this.el.appendChild(this.speechContainer);
		this.speechContainer.appendChild(this.speechBubble);
		this.randomQuestion();
		if (this.mirror)
			this.speechBubble.style.transform = `scaleX(-1)`;
	}

	randomQuestion() {
		this.speechBubble.innerHTML = questions[~~(Math.random() * questions.length)];
	}

	update(delta) {
		// update position
		this.x += this.v * delta;
		if (this.x * Math.sign(this.v) - 50 > 100) {
			this.x *= -1;
			if (this.active && !this.gameOver)
				score.increment();
			else
				this.unhit();
			this.randomQuestion();
		}
		// update screen
		super.update(delta);
	}

	hit() {
		this.active = false;
		this.speechContainer.style.opacity = '0';
	}

	unhit() {
		this.active = true;
		this.speechContainer.style.opacity = '1';
	}
}
