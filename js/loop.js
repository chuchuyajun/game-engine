function Loop(ctx) {
	this.ctx = ctx;

	this.sprites = [];
	this.processList = [];
	this.canPlay = false;
}
Loop.prototype = {
	addSprite: function(sprite) {
		this.sprites.push(sprite);
		sprite.engine = this;
	},
	addProcess: function(process) {
		this.processList.push(process);
	},
	start: function() {
		this.canPlay = true;
		this.nextFrame();
	},
	stop: function() {
		this.canPlay = false;
	},
	clearCanvas: function() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	},
	nextFrame: function() {
		if ( !this.canPlay ) return;

		this.clearCanvas();

		for ( var i in this.sprites )
			this.sprites[i].update();
		for ( var i in this.sprites )
			this.sprites[i].draw();
		for ( var i in this.processList )
			this.processList[i].process();

		var $this = this;
		requestAnimationFrame(function() {
			$this.nextFrame();
		});
	}
}