let board;
function getBoard() {
	if (!board) board = document.getElementById('board');
	return board;
}

export default class Sprite {
	constructor(x, className, animations, frames) {
		this.x = x;
		this.el = document.createElement('div');
		this.el.classList.add(className);
		this.el.classList.add('sprite');
		getBoard().appendChild(this.el);
		// update is often overridden and we always want to call Sprite's version here:
		Sprite.prototype.update.call(this);
		this.lastWindowWidth = 0;
		this.animations = animations;
		this.frames = frames;
	}

	update(delta) {
		this.el.style.transform = `
			translateX(${ this.x * 0.8 + 5 }vw)
			${ this.mirror ? 'scaleX(-1)' : '' }`;
		if (this.lastWindowWidth != window.innerWidth) {
			this.lastWindowWidth = window.innerWidth;
			this.el.style.backgroundSize = `${ this.animations }00% ${ this.frames }00%`
		}
		if (this.animation) {
			this.animation.frameLeft -= delta;
			while (this.animation.frameLeft < 0) {
				this.animation.frameLeft += this.animation.delay;
				if (++this.animation.frame >= this.animation.frames)
					this.animation.frame = 0;
				this.setFrame(this.animation.animation, this.animation.frame);
			}
		}
	}

	isNear(other, radius = 10) {
		return Math.abs(this.x - other.x) < radius;
	} 

	setFrame(animation, frame, mirror = false) {
		this.el.style.backgroundPosition = `
			${ 100 * ( animation / ((this.animations - 1) || 1) ) }%
			${ 100 * ( frame / ((this.frames - 1) || 1) ) }%`;
	}

	setAnimation(animation, frames, framerate) {
		const frameDuration = 1 / framerate;
		this.animation = {
			animation,
			frames,
			frame: 0,
			delay: frameDuration,
			frameLeft: frameDuration
		};
		console.log(this.animation);
	}
}
