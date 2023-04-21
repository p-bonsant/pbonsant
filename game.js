(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"game_atlas_1", frames: [[0,0,1284,468]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_3 = function() {
	this.initialize(img.CachedBmp_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2823,2463);


(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2712,2482);


(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2430,1918);


(lib.CachedBmp_1 = function() {
	this.initialize(ss["game_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.worm5_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AASFnQgugBgcgPQgngTgUgwQgPgkABg1QABgrAKgoIALgnQAGgXABgRQABgXgKgrQgOg7gPgeIgYgnQgPgYgHgQQgKgaADgdQACgdAPgYQARgdAagJQAUgHAXAHQAVAGATAPQAdAZASArQAMAeALAzQALAwAAAgQABARgGA5QgHBDACA7QABBJAbAhQALAMATAMQAgAXAWgFIAPgFQAJgDAGAAQAPACAIARQAEAMAAATQABAlgOANQgJAIgUAEQg6AMg5AAIgRAAgAhLEIQAMAaASAMQATANAmADIAmABQACgDAEgDQAMgJAPgBQAEgLgBgMIgCgHQgOgGgNgIQgagSgRgXIgIAIQgHAHgQAIQgSAJgLAAQgHgBgJgEIgOgHIgJgGQADASAHAOgABnEzIgCAHQAZgEAZgHQAEgIgBgLQgZACgXgGQABAOgEANgAhLDUQASAQANAAQAIAAAMgHQAQgGAHgJIAEgHIgHgTQgJgZgCgrIgCABQgTAGgKgCQgIgCgMgKIgIgIIgBADQgQA9ADAtIABAAQAFAAAHAGgAg+AqIgFAbIAFAIQAHAPAMADQAJACALgFIAIgEQgBg3AEg1IgCABQgFABgKAAIgQAAIgOgBIgGgBQAGAjgDAbgAhLhGIAGAaIAGABIAIAEIAHABIASgBIAHgBQADgBAFgHQADgEADgCQAEghAAgQQAAgbgLgwIgEAIQgFAHgVASQgLALgJACIgOABIgPAAQAKAaAKAjgAiEkwQgLAKgEAQQgKAeANAeQAEALAKAPIARAYIAIAPQAcADALgGQALgFAMgPQAKgMACgFIADgQIACgFQgIgagHgRQgQgggYgRQgOgKgMAAQgOAAgLAMg");
	this.shape.setTransform(19.2533,35.9064);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC5C5").s().p("AALE9QgmgDgTgNQgSgMgMgaQgHgOgDgSIAJAGIAOAHQAJAEAHABQALAAASgJQAQgIAHgHIAIgIQARAXAaASQANAIAOAGIACAHQABAMgEALQgPABgMAJQgEADgCADIgmgBgABmEyQAEgNgBgOQAXAGAZgCQABALgEAIQgZAHgZAEIACgHgAhMDTQgIgHgFABQgDgtAQg9IABgDIAIAIQAMAKAIACQAKACATgGIACgBQACArAJAZIAHATIgEAHQgHAJgQAGQgMAHgIAAQgNAAgSgQgAgsBeQgMgDgHgPIgFgIIAFgbQADgbgGgjIAGABIAOABIAQAAQAKAAAFgBIACgBQgEA1ABA3IgIAEQgIAEgGAAIgGgBgAg4goIgIgEIgGgBIgGgaQgKgjgKgaIAPAAIAOgBQAJgCALgLQAVgSAFgHIAEgIQALAwAAAbQAAAQgEAhQgDACgDAEQgFAHgDABIgHABIgSABgAhqiaIgIgPIgRgYQgKgPgEgLQgNgeAKgeQAEgQALgKQALgMAOAAQAMAAAOAKQAYARAQAgQAHARAIAaIgCAFIgDAQQgCAFgKAMQgMAPgLAFQgIAEgPAAIgQgBg");
	this.shape_1.setTransform(19.3636,36.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38.5,71.9);


(lib.worm4_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AACHCQgsgdgRhYQgOhGABhbQAAgoADghQADgaAIgpIALhCQAHg0ABg5QAAgmgFgZQgGgWgQgiQgVgsgFgMQgMgfABgdQABgiATgVQAYgcAoABQAiACAfAYQAXARAPAcQATAlABA9QABAbgJANIgKANQgDAFgBALQgIBsgCBGQgCBQAECSQAECegBBFQgBAcgJALQgKANgUAAQgSAAgRgLgAAmGjIgBglQgKAHgKABQgIABgHgBQAPAaAVADgAgJFqIAJAFQALAGAVgLIAFgIIgBhmQgLANgRAFQgSAGgSgIQAFA4AOAmgAggDbIABAUIAFAGQADADAGACQANADAGgDQAHgCAIgJQAFgEAAgDIAAgJQABgEAFgCQADgCAEABIgBhDIgFAEQgKAIgGABIgPAAQgMABgHgBQgEgBgHgEIAAA+gAgfCDIADAEQAHAIAUgBIALgCQAJgDAEgKIAFgIQACgEAEgBIgBhBQgLALgQACQgPADgNgKQgHAtgCAfgAgRAcQAFAJADACQAIAGAMgGQAHgDACgGIADgHQACgDAEgBIADAAIAAgZIABgxIgOACQgMABgLgGQgDAYgKA+gAgBhSIAEAEQAJAEAEAAQADABAFgCIAIgDQgCgEACgEIACgEIAEhIQgIADgPAAQgJAAgGgCQACAlgDAqgAA9kuIgPASQgKAKgSAJIgKAFQgIAEgSACQALAdAFAiIAGAIQAFADAOAAIAHgCQADgCAFgGIACgBIACglQACgfAHgOIAHgNQAEgHABgGIABgHIgDAEgAgwmZQgJAIgEAOQgGAbAOAhQAHAQAPAcQACAAADADQACAEACAAIADAAIAQgCQAFgCAGgEIAMgHQAEgEADgBIAFgCIACgFIAGgFIAEgFIAHgKQACgDgBgGIABgJQABgEACgDQgHgXgKgNQgTgbgigGIgJgBQgQAAgJAJg");
	this.shape.setTransform(10.3762,46.0982);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC5C5").s().p("AACGGQAGABAIgBQALgCAKgGIAAAlQgUgEgPgZgAgBFvIgJgFQgNgmgGg4QASAHASgFQARgGALgNIABBmIgFAIQgNAIgKAAQgFAAgEgCgAgRD5QgGgCgDgDIgFgGIgBgTIAAg+QAGAEAFABQAGABANgCIAOABQAHgBAKgIIAFgFIABBEQgEgCgEACQgEACgBAEIAAAKQgBACgEAFQgJAJgHACIgGABIgMgCgAgdCGIgCgEQACgfAHgsQAMAJAQgCQAPgDALgLIABBCQgEAAgCAEIgEAIQgEAKgJAEIgLACIgEAAQgRAAgHgIgAgKAmQgDgCgFgJQALg9ADgZQAKAGAMAAIAOgDIgBAyIABAZIgDAAQgEAAgCADIgDAIQgCAFgHADQgHAEgEAAQgFAAgFgEgAAPhKQgEAAgJgFIgDgEQACgqgBglQAGACAIAAQAPAAAJgCIgEBHIgDAEQgBAEACAEIgIADIgHACIgCAAgAAEi3IgHgIQgEgjgLgdQARgCAIgDIALgGQASgJAKgJIAOgSIAEgEIgBAHQgBAFgEAIIgHAMQgHAOgCAgIgDAkIgCABQgEAHgDACIgIACQgOAAgEgDgAgXkUQgCgBgCgEQgCgCgDgBQgPgcgGgPQgOghAGgcQADgOAJgIQANgKAVADQAiAFAUAcQAJANAIAXQgDACgBAFIAAAJQAAAGgBADIgIAJIgDAFIgGAGIgDAEIgEADQgDABgEAEIgMAHQgHAEgFABIgPADg");
	this.shape_1.setTransform(10.41,46.1167);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,20.8,92.2);


(lib.worm3_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC5C5").s().p("AAOBIIgIgHQAFgEAEgHQAKgOAKgbQANAOAMAIIAKAFQAAABAAAAQAAABgBAAQAAABAAABQAAAAAAABIADAJQABAEgFAHQgKAQgKAFIgHAEQgNgHgOgLgAgzACQgcgtAKguQAYgBAXAbIAgAtIABADIAEAEIACADIABAAIAAABIAAABQABAEgCAEIgIATQgGAOgEAFQgFAGgGADQgZgYgOgXg");
	this.shape.setTransform(11.2572,13.1245);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AApCKQgIgBgPgIIgegVQg1glgegtQgjg0ACg5QABgSAGgNQAIgQAOgFQAIgCALABQAlADAdAcQALALAMAUIAWAhQAdApAhAEIATADQAMACADAJQADAGgDAHQgDAGgGAEQgJAFgRgCIgOgCIAAABQABAKgDAIIgJANIgGALQgDADgGAEIgFAEQAMAHACAGQAFAKgHAKQgGAJgKAAIgCAAgAAAAvQgEAHgFAEIAIAHQANALANAIIAHgEQAKgGAKgPQAFgIgBgEIgDgJQAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBAAAAIgKgGQgMgIgNgOQgKAbgJAOgAhVhgQgKAuAcAvQAOAVAZAYQAGgCAFgGQAFgGAGgOIAHgRQACgGgBgEIAAgBIAAAAIgBgBIgBgCIgEgFIgBgDIghgsQgXgbgXAAIgBAAg");
	this.shape_1.setTransform(12.8514,13.7905);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,25.7,27.6);


(lib.worm2_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC5C5").s().p("AhnEyIAAiCQAAgJADgDIAEAAIAGgBIgBAFQgBAFADAIQALAdASAbQANARAMAFQANAHASgCIAAAAQgeAZgkAKQgOAEgJAEIgKgBgAgYDwQgFgCgGgGQgYgZgIgfIgFgMQgEgFgEgBIAGgFQAQgHAGgJQAFgHgCgIIgCgGQAQghAGgSIAEgRQAeAvAkAHQAUAEAUgIIAHgEIgIAlQgLAsgPAXQgJAOgQARIgGAHQgCgCgDgBQgDAAgLAFQgIAFgIAAQgHAAgFgDgAAYBJQgIgGgJgLQgPgSgFgLQgEgIgCgCIABgMQAHg6gBhAQALAJAIADQAPAFAagBQAXAAAKgEQAKgEAKgLQAHBZgNBXQgLATgVAFIgLABQgPAAgNgIgAAgh7QgMgBgFgCQgPgEgLgPIgCgCIgCg3QAAggAGgXQAFgYALgNQAIgIAKgDQALgDAJAEQAPAFAKAYQANAeAJAyIAGAqIgIANQgJAMgRAEQgHABgMAAIgNAAg");
	this.shape.setTransform(13.2083,34.9308);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhvFXIgDgFIgCgBQgLgBgEgDQgFgFAAgOIAAiUQAAgRAFgHQAEgFAJgDQADgHANgQQATgZALgkQAHgZAEglQAHhKgDhHIgCgqQgBgZACgSQAFgxAagcQAJgLAMgHIANgGQAVgIAUAGQAKADAJAFQARALALAVQANAUAIAnQAjCdgWCcQgWCbhPBDQgoAkhEAUQgJADgHAAQgKAAgFgFgAhsCxIAACCIAKABQAJgEAOgEQAkgKAegZIAAAAQgSACgNgHQgMgFgNgRQgSgbgLgdQgDgIABgFIABgFIgGABIgEAAQgDADAAAJgAgiBCQgGASgQAhIACAGQACAIgFAHQgGAJgQAHIgGAFQAEABAEAFIAFAMQAIAfAYAZQAGAGAFACQANAGAQgIQAKgFADAAQADABACACIAGgHQAQgRAJgOQAPgXALgsIAIglIgHAEQgUAIgUgEQgkgHgegvIgEARgAgXAGIgBAMQACACAEAIQAFALAPASQAJALAIAGQASAMAVgFQAVgFALgTQANhXgHhZQgKALgKAEQgKAEgXAAQgaABgPgFQgIgDgLgJQABBAgHA6gAAUkwQgKADgIAIQgLANgFAYQgGAXAAAgIACA3IACACQALAPAPAEQAFACAMABQAVABALgCQARgEAJgMIAIgNIgGgqQgJgygNgeQgKgYgPgFQgFgCgGAAIgJABg");
	this.shape_1.setTransform(13.7496,34.8237);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,27.5,69.7);


(lib.worm_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAPFxQgdgJgTgKQgmgTgcgkQgbgjgMgrQgLgpAEgtQAEgsARgpQAWgtAIgWQAOgsgNgdQgKgVgZgTIgugeQg1gngMgxQgHgdAIgbQAIgdAWgQQASgNAfgHQAwgMApADQAxAFAeAZQATAQARAbQAlA5AMBFQALBEgQBCQgEATgKAeIgQAyQgPA8AOArQAJAXAOALQASANAagEQAXgDAUgPQAPgMAJgEQAPgHAKAHQAHAEAGAOQAUA0gKAxQgGAagPAWQgPAWgWANQgYAQghADIgUABQgmAAg0gPgABSDtIgCAKIgDAaQgBAPgFAIQgGALgVAPIgLAIQAdAJAWACQAlAEAcgLIABgFQAMgcABgaQABgYgHgTIgRADQghAFgYgGIgBADgAhmDDQAGAWAQAeQAOAbAOAOQASARAoAPQALgEAPgLQARgNAEgJQAFgJABgOIAAgYQAAgHABgEIgEgDQgSgNgNgfIgFgPIgGAIQgHAJgFACQgDACgLAAIguAAQgNAAgFgCIgRgLIgOgKQABARAEARgACxDhIABABQAFARAAAVQAAAagGAYQAPgQAGgXQAKgigOgdQgGAHgLAGgAhnCHQADABAFAEIALAMQAIAJAGACQADABAKAAIAwgCQAPgIABgRQABgLADgDQgCgaAEgaQADgZAPgoIAGgSIgGAFQgPAIgSAAQgRABgQgFQgMgDgIgGIgHAUQgJAVgTAqQgNAhgDAfIABAAIACAAgAAAiwQgJASgNAIQgJAFgPAFIgWAGQATAaACAkQABARgDASIACAEQAGAHAOAEQAXAFARgGQAVgHAIgTIADgIQACgFADgCIADgBQANg/gPhFQgHgfgLgYQgNAugUAegAiYlLQggAJgLAPQgQAXAQAjQALAZAXAUQAKAJAgASQAWAMAMALQAWgEASgHQAQgGAHgGQAKgJAIgVQALgeAJgbQADgJAAgGIgIgKQghgtgygHIgRgCQgbAAgkAMg");
	this.shape.setTransform(24.3645,38.396);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC5C5").s().p("ABVFWQgWgDgdgJIALgHQAVgPAGgLQAEgJACgPIADgZIACgKIAAgDQAYAGAhgFIARgDQAIASgBAYQgBAbgMAbIgCAFQgUAJgaAAIgSgBgAgzEhQgPgOgNgbQgQgegGgXQgFgQAAgRIANAJIARAMQAGACANAAIAuAAQAKAAAEgCQAFgDAHgJIAFgIIAGAQQANAeARANIAFADQgCAFAAAGIABAZQgBAOgFAJQgFAIgRAOQgOALgLADQgpgOgRgRgAC4EJQAAgWgGgRIAAgBQALgFAGgIQAOAegKAiQgHAXgOAPQAGgYAAgZgAhFCjQgHgCgIgJIgLgLQgEgFgDAAIgEAAQADgfANghQAUgqAIgWIAIgTQAHAGAMADQAQAEARgBQATAAAPgIIAGgEIgHARQgOApgEAZQgEAaADAZQgDAEgBAKQgCARgPAJIgvABQgLAAgCgBgAgagWQgPgEgFgHIgDgDQADgSgBgSQgCgkgSgaIAVgGQAQgEAJgGQAMgIAKgRQAUgfANgtQALAYAGAeQAQBFgOBAIgDABQgDACgCAEIgDAIQgHAUgWAHQgJADgKAAQgJAAgLgDgAh2iwQgggTgLgJQgWgTgLgZQgQgkAQgXQALgPAggJQAwgPAgAFQAxAIAiAsIAHALQAAAGgDAJQgIAbgLAdQgJAVgJAJQgHAHgQAGQgSAHgWAEQgNgLgVgMg");
	this.shape_1.setTransform(24.3083,38.3141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,48.7,76.8);


(lib.skull_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(105));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AnhFqQgqgCgxgLQgggHg5gRQgUgFgIgIIgDgEIgHgBQgIgCgDgGQgIgPAXgUQA/gzBOgZQAWgHAqgIQBmgXAwgJQBUgPBDgGIBRgHIAggFQiGgch2gQQg4gHgngCQhvgGhwAcQhtAbhjA5QgSAJgJgDIgDgCIgDgBQgKgGgDgLQgEgQAMgYQAhhKBBhIQAbgdAXgTQBfhNCbgHQA6gCBMAHQAeADBnAOQBKAKAoAEIAzAGQADgKAPgRQBghhCHhGQA2gbAigHQAegFA8ACQBeADAkAEQBJAIAyAaQAWALAhAWQBFAtAgAiQA7A8AwB2QAPAlADAUQAGAjgIAvQgTBug7A3QgsAqhJATQgdAHglAFIhCAGQheAHgvABQg6ABgtgGIhHgLQilgeimgOQgmgEgXADQgSACglAKQhJAShGAOQhPARg4AAIgLAAgAhHEFQBnAHC+AgQBbAPAjADQA4AEBEgDQAvgCBNgHQA9gGAggIQAzgMAhgZQBBgwAThmQAIgrgHgjQgDgRgNgfQguhyhCg+QgYgXgogaQgqgdgcgNQg0gYhGgHQgtgFhTAAQgsAAgVAFQgZAFgqAUQiQBGhQBeQAnAAAhgEQAMgBAEgGQACgDAAgFIABgJQACgLANgDQANgDAJAJQAIAIAAANQAAAMgHAKQgLAPgcAKQgjALgtAAQgbgBg1gGIjbgbQiNgQhEAEQh3AIhOA3QghAYgiAoQgUAXgkAyQgQAWgGAQQC1hZC0gHQBmgECJAYQBPAOCeAhQBIAOAdAJIAdAJQARAFANABQATAAAEABQAMACAFAJQAEAIgFAKQgGAJgJADQgOAFgZgHQhBgRg9gOQgGAEgKADQgpAOg6AHIhlAIQhNAIiXAgQhPARgnANQg5AUgnAeQBVAdA5AGQA3AGBFgKQAqgHBQgTIBBgQQAsgKARgBQANgCARAAIAlACgAJZCbQgDgFAGgIQAFgJAHgDQAFgCALAAQALABAEgBQAFgCALgHQAZgSAKgNIAPgTIAHgGQAHgIADgKIAEgdIABgIQACgFAEgDQAEgEAFABQAHACAAAJQAAADgDALIgDAQIgEARQgBAEgFAJIgIAMIgHAFIgEAGIgPARIgOANQgRAPgLAFQgSAKgOgBIgHAAIgGAEQgGAFgDAAIgCAAQgGAAgCgEgAIvBcQgnAAgqgFQhSgMhJgmQg2gdgWgiQgOgYgBgeQgCgcALgbQAVg1A5gbQAygYA9AGQAbADAVAJQARAHAUAOIAhAcQAoAgBLAzIAaATQAOAMAHANQAKATgCAWQgBAYgOAUQgVAfgsANQgbAIgqAAIgKAAgACwBDQgEgDABgJIABgZQACgYgCgKQgEgbgbgiQgHgKACgFQADgHAJACQAHACAFAHQAIALAKAVQAKAVACAIQAGAVgGAtQgBAIgDAFQgEAEgEAAQgCAAgCgBgAkxgJQgSgDgJgGQgNgJgBgOQgBgJAHgIQAGgIAJgDQAMgFAZAAIAlABQAUACAPAFQANAFAFAIQADAIgDAOQgDAQgHAFQgGAEgNAAIgSAAQgnAAgVgDg");
	this.shape.setTransform(90.177,36.1831);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E5E3D4").s().p("AFXE+QgkgDhagPQi+gghngHQgqgDgZADQgSABgrAKIhBAQQhRATgqAHQhEAKg4gGQg4gGhVgdQAmgeA5gUQAngNBQgRQCXggBNgIIBlgIQA6gHAogOQALgDAFgEQA+AOBBARQAYAHAOgFQAKgDAFgJQAGgKgFgIQgEgJgNgCQgDgBgTAAQgNgBgRgFIgdgJQgdgJhIgOQieghhPgOQiKgYhlAEQi1AHi0BZQAGgQAPgWQAkgyAVgXQAhgoAigYQBOg3B3gIQBEgECNAQIDaAbQA2AGAcABQAsAAAigLQAcgKALgPQAHgKAAgMQAAgNgIgIQgIgJgNADQgOADgCALIAAAJQAAAFgCADQgEAGgMABQgiAEgnAAQBRheCQhGQApgUAZgFQAWgFAsAAQBSAAAuAFQBGAHAzAYQAdANAqAdQAoAaAYAXQBBA+AvByQANAfADARQAHAjgJArQgSBmhCAwQghAZgyAMQghAIg8AGQhOAHguACIg1ACQgmAAghgDgAJiCCQgGADgGAJQgFAIADAFQACAFAHgBQAEAAAGgFIAFgEIAHAAQAPABASgKQAKgFARgPIAPgNIAOgRIAFgGIAHgFIAHgMQAGgJABgEIADgRIADgQQAEgLAAgDQAAgJgIgCQgEgBgEAEQgFADgBAFIgCAIIgEAdQgDAKgHAIIgGAGIgPATQgLANgZASQgKAHgFACQgEABgMgBIgDAAQgIAAgFACgAE5jXQg5AbgUA1QgLAbABAcQABAeAPAYQAVAiA2AdQBKAmBRAMQArAFAnAAQAwABAfgJQAsgNAUgfQAOgUACgYQABgWgKgTQgGgNgOgMIgagTQhMgzgoggIghgcQgTgOgRgHQgVgJgbgDIgagBQguAAgoATgACEhQQgCAFAHAKQAcAiAEAbQACAKgCAYIgCAZQgBAJAEADQAGAEAGgHQADgFABgIQAGgtgGgVQgCgIgKgVQgJgVgJgLQgFgHgGgCIgEAAQgGAAgDAFgAlKhFQgKADgGAIQgGAIAAAJQABAOAOAJQAJAGASADQAZAEA0gBQAOAAAFgEQAHgFADgQQADgOgDgIQgEgIgNgFQgPgFgVgCIglgBQgZAAgLAFg");
	this.shape_1.setTransform(90.7081,36.1577);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E5E3D4").s().p("ApjErQgPgGgWgOQA/gnBZgZQA7gRB5gUIEQguQAPgCAIgEQBfAbBQAJQATACAHgHQAGgGgCgLQgCgJgIgGQgKgHgZgCQg5gFhFgTQgogLhTgcIhWgdQg9gUgbgEQgSgDhNgFIh+gKQhKgEg0AHQgfAEgxAMIhSAUQgpALgSAJIgGADQAkg1BCg7QA9g3AugWQAagMAegIQBGgRBFACQA7ABBKASQAYAFBqAeQBQAVA0AIQBIALA8gIQAcgEAKgLQAIgIAAgLQgBgMgIgFQgIgEgLADIgSAHQgXAJgogCIgNgBIAKgSQAMgRAVgRQAMgKAbgTIA+gqQAjgYATgLQAfgSAcgJQA4gTBJAHQA0AGBOAWQBJAVAkATQCBBABUCkQATAmADAXQAEAVgIAvQgIAwgIAXQgYBAg5AkQghAVguALQgiAHg0AEQipANihgaQhzgWg6gHQiFgPiDAeIhLAUQhoAbhNADIgSABQhaAAhHgigAJYCRQgDAFACAFQAEALANgBIATgHIAOgEIAmgUIAJgDQAMgFAMgNQARgQAcgrIAGgLQACgGAAgIQAAgKgGgEQgDgDgEABQgFABgCADQgBACABAFIAAAHQgBADgEAGQgGAIgHANQgDAHgDAFIgJAJIgJALQgGAIgHAEIgLAFQgVAKgKAGIgLAHIgRAGQgJACgCAAIgJgCQgFAAgDAGgAGNj1QgnACghARQgQAIgTAOQgTANgMANQgTATgJAaQgKAaACAbQACAaANAZQANAYAWAQQARANAiAPQA5AaAeAJQAiALArAFQAgADAvACQA2ACAfgKQAogMAbghQAPgTAFgVQAFgXgLgRQgFgIgJgIIgSgNQgugdgZgSQgmgbgagbQgRgTgGgFQgLgJgRgLQgcgQgQgGQgegLgkAAIgIAAgACThCQgGAFAKAOQAJAOAGAUQADAMAEAYQADASgBAGIgCAPQABAJAIABQAJABADgNQAEgPgFgeQgGgkgJgTQgFgKgHgKQgEgGgEgCIgFgBQgEAAgCADgAlPhzQgEADgDAFQgDAIABAJQAEAPAQAIQAJAFAVAFIAgAJIAWADIAMAEIAMACQALAAAHgIQAFgHAAgKQABgSgNgLQgFgEgMgEQgngOgWgCQgIgBgdAAQgMABgDACg");
	this.shape_2.setTransform(90.1557,36.7592);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AoIFwQgfgHgmgOQgXgJgtgTQgmgRADgWQABgHAFgEIAAAAQAFgMASgKQBHgtBkgcQA/gRB6gVIDYgkIhpgkQgpgPgXgFQgVgEg2gFIiLgJQhTgGgqAFQgbADg2ANIhHARQhAAPgdAUIgRAMQgKAHgIACQgLADgKgFQgHgDgCgFIgCgCQgJgLANgYQBJh/B5hVQAjgYAcgOQCKhDDaAxQA2AMBpAdQA0ANArAIQADgIAGgIQAmgwA0goQAagTAfgUQA1gjAegQQAvgZAqgKQAygLA9AHQAsAEBCARQBEARArARQA7AXAqAgQAeAXAfAjQASAVAjAtQAcAlAKARQALAUAPAqQAQApABAaQAAASgGAiQgJA8gNAfQgQAsghAiQghAjgqATQgwAWhWAHQi1AQizgcIiIgXQhPgMg4ABQg4AChKAPIiAAeQhMASg2AFQgZADgYAAQgsAAgmgIgAgdCEIkQAuQh5AUg7ARQhZAZhAAnQAXAOAPAGQBNAlBmgEQBNgDBogbIBLgUQCDgeCFAPQA6AHBzAWQChAaCpgNQA0gEAigHQAugLAhgVQA5gkAYhAQAIgXAIgwQAIgvgEgVQgDgXgTgmQhUikiBhAQgkgThJgVQhOgWg0gGQhJgHg4ATQgcAJgfASQgTALgjAYIg+AqQgbATgMAKQgVARgMARIgMASIAPABQAoACAXgJIASgHQALgDAIAEQAIAFABAMQAAALgIAIQgKALgcAEQg8AIhIgLQg0gIhQgVQhqgegYgFQhKgSg7gBQhFgChGARQgeAIgaAMQguAWg9A3QhCA7gkA1IAGgDQASgJApgLIBSgUQAxgMAfgEQA0gHBKAEIB+AKQBNAFASADQAbAEA9AUIBWAdQBTAcAoALQBFATA5AFQAZACAKAHQAIAGACAJQACALgGAGQgHAHgTgCQhQgJhfgbQgIAEgPACgAJmCbQgCgFADgFQADgGAFAAIAJACQACAAAJgCIARgGIALgHQAKgGAVgKIALgFQAHgEAGgIIAJgLIAJgJQADgFADgHQAHgNAGgIQAEgGABgDIAAgHQgBgFABgCQACgDAFgBQAEgBADADQAGAEAAAKQAAAIgCAGIgGALQgcArgRAQQgMANgMAFIgJADIgmAUIgOAEIgTAHIgCAAQgMAAgDgKgAJGBfQgvgCgggDQgrgFgigLQgegJg5gaQgigPgRgNQgWgQgNgYQgNgZgCgaQgCgbAKgaQAJgaATgTQAMgNATgNQATgOAQgIQAhgRAngCQAogCAiANQAQAGAcAQQARALALAJQAGAFARATQAaAbAmAbQAZASAuAdIASANQAJAIAFAIQALARgFAXQgFAVgPATQgbAhgoAMQgaAIgpAAIgSAAgADFBIQgIgBgBgJIACgPQABgGgDgSQgEgYgDgMQgGgUgJgOQgKgOAGgFQAEgFAHADQAEACAEAGQAHAKAFAKQAJATAGAkQAFAegEAPQgDAMgJAAIAAAAgAjVgpIgMgEIgWgDIgggJQgVgFgJgFQgQgIgEgPQgBgJADgIQADgFAEgDQADgCAMgBQAdAAAIABQAWACAnAOQAMAEAFAEQANALgBASQAAAKgFAHQgHAIgLAAIgMgCg");
	this.shape_3.setTransform(88.6807,36.7685);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E5E3D4").s().p("AndFPQglgIhHgdQghgOgPgLIgOgMQAXgSArgSQBCgaBUgUQA1gMBlgTQCLgaBQgHQAPgBAHgEIABAAQBsAhBOAEQATACALgEQASgIgBgPQgBgIgGgGQgHgGgJgCQgHgCgJABIgRACQgsAEhFgUQgqgMhhggQhZgegzgMQkQhIlqAvQAQgcAPgSQAVgbAigbQAVgRAqgcQAigXAUgKQA4gbBXgBQBpgBBmAaQAlAKB5ArQBiAjA/AKQA3AJAmgIQAMgDAIgGQAJgHgCgJQgDgSgjACQgdADghgEIAEgKIAHgUQAGgLARgPQBVhEBpgjQBpgkBtACQAxACAcAKQAPAGAgATIBrA/QBAAlAdAbQAcAbApA7QAYAjALAYQAOAigDAeQgCAPgHAbIgCAUQgBANgBAGQgDAPgNAaQgWAsgUAUQghAghGASQhvAciTgFQhEgCjCgUQhsgLhAAAQheAAhKAVQgYAHhDAZQg5AVgjAHQgjAHgiAAQgmAAgmgJgAJlB9QgEAEAAAGQAAAGAEACQAEADAJgBIAfgFQAIAAAIgDIARgIIANgEQAFgDAIgIIANgLIAMgGQAVgJAPgTIAJgMIAHgIIAFgJQAFgLgCgHQgBgFgFgDQgFgCgEACQgEABgCAJQgCAKgCACIgHAHIgHALQgGAJgKAHIgQAIIgQAJIgKAKQgGAGgFACIgOAFQgLAHgGABQgDABgFAAIgJAAQgKAEgGgBIgIgCIgBAAQgEAAgDAFgAFxj9QgiAIgdAUQgeAUgTAdQgRAYgIAeQgHAYADAUQADAPANAXQAZAoAcAPQAKAGATAHIAfAMIAlASQAWAJAmAFQBHAJAwAAQBBgBAzgSQAdgKAOgNIAAAAQAJgEAEgFQAGgHABgJQAHgOABgSQABgSgHgOQgHgNgRgLQgHgEgYgMQgzgZgwgpIgugpQgbgYgXgNQgegRgkgFQgNgCgNAAQgWAAgVAFgACfhgQgDACgBAEQgBAEACADIAGAOIAGAQIAGARQADAJABAGIABAJIAEAKIADAIIABAMIAAAgQAAAGACADQACAGAIAAQAHAAACgHQADgEgBgGIgDgKQgBgGABgPQABgOgDgGIgEgJIgRg5QgFgRgGgGQgFgFgEAAIgFABgAkiilQgRACgIANQgJAQAKANQAEAGAJAFQAWANAHACQAKAEASACIAbAFIANAEQAHABAGgBQAKgDAEgLQAEgKgEgKQgHgRgYgKQgIgEgNgEIgXgHIgTgHQgIgCgGAAIgFAAg");
	this.shape_4.setTransform(89.0715,38.4143);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AnmF2QhugXhYhDIgEgDQgDgCgCgDQgGgJAHgMQAFgKAKgIQAjgbAvgUQAkgPA2gPQCUgqC2gcIA8gJQhNgZgtgNQkUhKluAwQgUACgHgCQgHAEgHgDQgHgCgDgHQgEgGAAgHQABgKAKgRQBKh6B+hHQAvgZAngLQAqgLA9gCQCAgCB5AkQAhAKA5AVQA/AYAaAIQApANAkAHQgBgKAIgQQAPgeAggaQAVgRAqgaQAxgeAagMQBmgyCYgKQBQgFAuARQAXAIAjAWIB3BHQA8AkAcAZQAZAXAfAqQAmA0AQAlQAPAhACAcQABASgGApQgHApgEAUQgIAhgNAZQgRAkgdAaQg6A2h1ATQh1AUimgMQi+gThfgGQhCgFgtACQg9ACgyANQgcAIgyATQg1AUgZAHQg6ARg9AAQgwAAgygLgAgcBvQgHAEgPABQhQAHiLAaQhkATg2AMQhUAUhBAaQgsASgWASIAOAMQAPALAgAOQBHAdAlAIQBIAQBJgOQAkgHA4gVQBEgZAXgHQBLgVBeAAQBAAABsALQDCAUBDACQCUAFBvgcQBGgSAgggQAVgUAWgsQANgaACgPQACgGAAgNIACgUQAHgbACgPQAEgegPgiQgKgYgYgjQgpg7gdgbQgdgbg/glIhsg/QgfgTgQgGQgbgKgygCQhsgChpAkQhpAjhVBEQgSAPgFALIgHAUIgEAKQAhAEAcgDQAkgCADASQABAJgJAHQgHAGgMADQgmAIg3gJQg/gKhigjQh6grglgKQhmgahpABQhWABg4AbQgVAKgiAXQgqAcgVARQghAbgWAbQgPASgQAcQFqgvERBIQAyAMBaAeQBgAgAqAMQBFAUAsgEIARgCQAKgBAHACQAJACAGAGQAHAGAAAIQABAPgSAIQgLAEgSgCQhPgEhrghIgCAAgAJuCQQgEgCAAgGQAAgGADgEQAEgFAFAAIAIACQAFABALgEIAIAAQAGAAADgBQAGgBALgHIAOgFQAFgCAGgGIAKgKIAPgJIARgIQAKgHAGgJIAGgLIAIgHQABgCACgKQACgJAFgBQAEgCAFACQAEADABAFQADAHgFALIgFAJIgHAIIgKAMQgPATgVAJIgMAGIgNALQgHAIgGADIgNAEIgQAIQgJADgHAAIggAFIgEAAQgGAAgCgCgAHOBJQglgFgXgJIglgSIgegMQgTgHgLgGQgcgQgYgnQgNgXgDgPQgEgUAHgYQAJgeAQgYQAUgdAdgUQAegUAigIQAigIAjAFQAjAFAfARQAWANAbAYIAuApQAwApA0AZQAYAMAHAEQAQALAHANQAIAOgBASQgCARgHAPQgBAJgFAHQgFAGgIADIgBAAQgOANgcAKQgzAShCABIgFAAQguAAhEgJgAIliYIAAAAIAAAAIAAAAgADFA8QgBgDAAgGIAAggIgBgMIgEgIIgEgKIgBgJQAAgGgEgJIgFgRIgGgQIgHgOQgBgDABgEQABgEADgCQAHgEAHAIQAGAGAFARIAQA5IAEAJQADAGgBAOQAAAPABAGIACAKQABAGgCAEQgDAHgHAAQgHAAgDgGgAjDhPIgNgEIgcgFQgSgCgKgEQgGgCgWgNQgKgFgEgGQgJgNAJgQQAIgNARgCQAIgBALADIATAHIAWAHQANAEAJAEQAXAKAHARQAEAKgEAKQgEALgKADIgGABIgGgBg");
	this.shape_5.setTransform(88.2363,38.3038);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E5E3D4").s().p("AmXFWQgXgBgugKQg/gOgfgKQgzgRgkgXQA1gwBSgdQA+gVBdgPQCDgUCEgFQAYgBAKgHQAHgEADgHQBKASBDAJQAUACAJgEQAIgCAEgHQAFgHgCgHQgEgOgbgDQiGgPimg6QhIgYjZhaQhEgcgmgNQiHgtiNAAQB5hHCNgNQBRgHBRANQBRAOBKAhQAbAMAzAaQArAUAsAQQAxASAhAJQAtALAmAAQARAAAJgEQAPgIgDgOQgBgGgFgEQgFgFgHgBQgHgBgTABQgUABgWgFIAEgIQAOgnAqgfQAbgUA2gaQBIgjArgPQBBgXA4gBQBHgCBQAfQA7AXBRAxQA8AkAiAcQAxAnAcArQARAcASAuQATAuABAbQADA5g2BIQgdAmgYASQggAZgwANQgkAKg1AFQh5AKh3gPIiWgXQhagOg9ABQg8ABhnASQhGANgdAIIhoAjQg3ARgpAAIgJAAgAL7AIIgGAKIgHAJQgEAFAAAFIAAAKQgBAFgGAFIgKAIIgHAHQgFAFgPAIIg9AfQgTAIgQAAQgJABgDACQgDADAAAFQAAAEADADQADACAHAAIASAAIARgEIANgEIAZgNIALgIIARgJIAOgGQAOgHAEgFIAGgIIANgLQAHgFACgFIABgPQABgDADgFIAGgIQAFgIgEgHQgCgEgEgCIgEAAIgEABgAGAkDQgxACgnAYQgTAMgWASQgdAZgKASQgKARgDAcQgGAiAHAYQAGAYAPAMQAHAGAVAKICDA4QAlAPANAEQAcAIAtADQAwADAggEQAbgEAbgKIADAAQAogDAbgTQAhgWAAgfQAAgJgDgHQAAgOgGgLQgHgLgRgJQgTgJgJgFQgNgIgYgWQhAg6hLgwQgQgLgSgJQgmgTgrAAIgIAAgACPhdQgFAEAEAMQAUA3ADA7QAAALAEAFQAFADAGgCQAIgEgCgTIgJg7IgIgiQgFgTgFgHQgDgEgFgCIgEgBQgCAAgCACgAk/ivQgKAEgBAJQgDAKAHAHQADAEAJAGQAFAEAJAKQAHAFANAEQAUAIAOACQAFABASAAIAVAAQANgBADgCQAGgEABgHQAFgPgKgIQgDgDgNgFQgQgEgWgMQgYgOgQgBIgWgBQgOAAgFADg");
	this.shape_6.setTransform(90.9305,38.5308);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AmOF+QgxgEhBgSQhfgag2gjQgcgSAEgTQACgJANgLQBphaC3giQA+gLBggJIBvgKQgpgNgsgPQhHgZjhhcQg5gYgwgPQiSgwiaALQgaABgJgFQgIgFgDgJQgEgKAGgGQADgEAHgCIAFgEQC0h5ClgHQAzgCBGAIQB5ANBFAeQAUAIAgASIA0AbQApATBVAbIANAEQgBgPAPgWQAhgvA7glQAtgdBFgdQBJgeA3gMQBJgPA8AKQAjAFAzASQA2AUAaANQAdAOA7AkQBWA1AmAlQBMBKAfBtQAMApgCAfQgBAlgUAnQgPAegeAlQgyA/gxAXQgcAOgsAIQibAci9gZQhigRgxgHQhWgMg+ADQgrAChTAPQhnATgxARIgmAPQgXAJgQAEQgjAKgqAAQgSAAgTgCgAgqB6QgKAGgYABQiFAGiDAUQhdAOg9AWQhSAcg2AwQAkAYAzAQQAgAKA+APQAuAKAYABQAsACA9gUIBngiQAdgJBGgMQBogTA7gBQA9gBBaAOICXAYQB2APB5gKQA2gFAkgKQAvgNAhgZQAXgSAdgmQA2hIgCg6QgBgbgTguQgSgtgSgcQgcgrgwgnQgjgcg8glQhRgwg6gXQhRgfhHABQg3AChBAXQgrAPhIAiQg3AbgbAUQgpAfgQAmIgEAJQAYAFATgCQATgBAHACQAHABAFAEQAGAFABAGQACAOgPAHQgIAFgRAAQgnAAgtgMQghgIgwgSQgsgRgrgTQg0gagagMQhKgihRgNQhSgOhRAIQiMAMh6BHQCOABCGAtQAnANBEAcQDYBZBJAZQClA6CGAOQAbAEAEANQACAHgEAHQgFAHgHADQgJADgVgCQhDgIhJgTQgDAIgHAEgAJ4CRQgHAAgDgDQgEgCAAgFQAAgFAEgCQACgCAKgBQAPgBATgIIA+gfQAPgHAFgGIAGgHIALgIQAFgEABgGIAAgKQABgEAEgGIAGgJIAHgKQADgCAEACQAFABABAEQAEAHgFAJIgFAIQgEAEgBAEIgBAOQgCAGgGAEIgNAMIgGAHQgFAGgOAHIgOAGIgRAIIgKAIIgaANIgNAEIgQAEIgNABIgFAAgAIWBRQgsgCgcgIQgNgEglgQIiDg4QgVgJgIgHQgPgMgGgYQgGgYAFghQAEgcAJgRQAKgTAegYQAVgTATgLQAogYAwgCQAwgCAqAUQARAJARALQBKAxBBA6QAXAVAOAIQAJAGATAJQAQAJAHALQAHALAAAOQACAHAAAIQAAAfghAXQgbASgnAEIgDAAQgbAKgcAEQgQACgWAAIgqgCgADFA1QgFgEAAgLQgCg8gUg2QgFgNAFgEQAEgDAFACQAFACADAFQAEAGAGATIAHAiIAKA8QACATgJAEIgDAAQgEAAgDgCgAjDhkQgSAAgGgBQgOgCgUgIQgNgFgGgFQgJgKgGgEQgIgFgEgEQgGgHACgKQACgJAJgFQAFgCAPAAIAWAAQAPACAYANQAXAMAPAFQANAEAEADQAJAJgEAOQgCAHgFAEQgEADgMABg");
	this.shape_7.setTransform(88.1656,38.4689);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E5E3D4").s().p("AmRFUQgNgCgZgHIg9gQQg6gQgcgJQgvgPgjgTQAXgVAjgSQAZgMAogOQEEhbDoAdIAWABQAMAAAIgFIANADQA+ANAzABQAbABAMgJQAJgGACgLQABgMgIgGQgGgEgKAAQgEAAgNADQgPADgdgDQg+gHhrgcQhNgUgkgPQgcgNgygdQg0gfgagMIgkgPIglgPQgngRg/goQhHgsgegPQhng0h4gHQAQgNAagKQAQgFAfgIQBmgZA8AAQAmAABNAMQA4AJAbAIQAYAHAkAQQBSAhAwAXQAVALBmA5QBMAqAyAUQATAHALgBQAIgBAGgFQAGgGABgHQAAgNgOgIQgFgDgTgEQgXgGgbgOIgugZQA8grAlgWQBRgxBZgaQBcgcBcgBQAlAAAXAEQAgAFAgAPQAfANAxAdQA9AlAnAhQAgAaAhAjQAcAfAOAVQAeAsALA0QALA2gMAzQgNA0giAqQgkArgwAUQgdAMgxAIQhCAMgogDIgngFIgogFIglgBQgYgBgOgCQgPgDgYgHIgmgMQgdgIglgEIhDgGQhbgFgpADQhHAGhtAhIiaAuQghAKgUADQgRADgQAAQgLAAgKgBgAL1AUQgBADgBAIQAAADgFAGIgrApIgMAHIgeARQgSAKgOACQgXACgLAEQgGACgDAEQgEAFADAGQAEAGAHgBIAMgDQALgDAWgCQALgDATgLIAjgUIASgMIAJgKIAMgKIALgLIAPgUQAIgJgCgIQgCgHgKgBIgCAAQgHAAgDAFgAF/kAQgmABgoAXQgbAPgpAiQgaAVgLAOQgTAYgDAdQgDAUAGARQAHAUAaAYQARAPAMAGQAIAEAOAFIAWAHQATAIAkAVQAjARA8AIQBPALBPgIQBCgGAdgaQAWgTAPgmQALgbgIgOQgCgEgGgEIgBgCQgGgIgNgIIgWgOQgQgJgqgjQgjgdgZgLIgHgDIgCgCQgagcgrgWQg0gbgtAAIgEAAgACQhRQgHADACAKQACAEAGAJQANATACAdQABAJAAAQIgBAZQAAAJACADQADAHAHgBQAIgBAAgPQABgpgCgUQgEgjgQgWQgHgJgGAAIgEABgAkvjKQgHADgDAGQgGALAIALQAGAIANAHIASAIQASAJAIAGIAOAKQAJAFAHACQAJADAJgDQAJgEADgIQAFgLgLgMQgHgHgOgHIgugbQgSgKgJgCIgEAAQgGAAgFACg");
	this.shape_8.setTransform(91.82,38.7721);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AlZGAQgWgBgcgGIgygMIh4gjQgVgHgqgRQgXgJgKgIQgRgPABgSQABgPATgSQAiggA2gWQAigPBCgTQCJgoBRgJQAqgEBJAAQgigLgUgJQgYgLgngXQgtgbgRgIQgSgKgkgOIg2gYQgigQhBgoQhAgpgjgQQgrgVgvgOQhqgdhNAbIgOAEQgIACgFgCQgJgEgDgLQgCgKAEgJQAGgNAXgOQBDgsAqgQQAcgLAxgLQBIgQAggDQAxgEBLAJQBUAKA8ATQAZAIAxAUQBnArBvA+IAGgDQANgGAngdQBdhEBvgmQBugmBzgEQAvgCAgAHQAeAGAmARQAgAPAsAYQAjAUAfAVQA8AqA8BAQAhAjAQAYQAQAaALAdQATA0AAA2QAAA5gUAyQgVA0gnAoQgoAogzATQgaAKgwAIQg2AJgiAAQgjABhFgGQhTgIgkgJIg8gRQghgIhCgFQhYgHgsAEQg9AEhXAYQhEAShRAaQgvAQgUAFQgkAJgeAAIgDAAgAn8C/QgoAOgZAMQgjASgXAVQAjATAvAPQAcAJA6AQIA9AQQAZAHANACQAYADAegFQAUgDAhgKICaguQBsghBIgGQApgDBbAFIBDAGQAlAEAdAIIAmAMQAYAHAPADQAOACAYABIAlABIAoAFIAnAFQAoADBCgMQAxgIAdgMQAwgUAkgrQAigqANg0QAMgzgLg2QgLg0gegsQgOgVgcgfQghgjgggaQgnghg9glQgxgdgfgNQgggPgggFQgXgEglAAQhcABhcAcQhZAahRAxQglAWg8ArIAtAZQAcAOAXAGQATAEAFADQAOAIAAANQgBAHgGAGQgGAFgIABQgLABgTgHQgzgUhLgqQhmg5gVgLQgwgXhSghQgkgQgYgHQgbgIg4gJQhNgMgmAAQg8AAhmAZQgfAIgQAFQgaAKgQANQB4AHBnA0QAeAPBHAsQA/AoAnARIAlAPIAkAPQAaAMA0AfQAyAdAcANQAkAPBNAUQBrAcA+AHQAdADAPgDQANgDAEAAQAKAAAGAEQAIAGgBAMQgCALgJAGQgMAJgbgBQgzgBg+gNIgOgDQgIAFgMAAIgVgBQg4gHg5AAQi2AAjFBFgAJyCMQgDgGAEgFQADgEAGgCQALgEAXgCQAOgCASgKIAegRIAMgHIArgpQAFgGAAgDQABgIABgDQADgGAJABQAKABACAHQACAIgIAJIgPAUIgLALIgMAKIgJAKIgSAMIgjAUQgTALgLADQgWACgLADIgMADIgCAAQgGAAgDgFgAHaBNQg8gIgjgRQgkgVgTgIIgWgHQgOgFgIgEQgMgGgRgPQgagYgHgUQgGgRADgUQADgdATgYQALgOAagVQApgiAbgPQAogXAmgBQAugCA3AdQArAWAaAcIACACIAHADQAZALAjAdQAqAjAQAJIAWAOQANAIAGAIIABABQAGAFACAEQAIAOgLAbQgPAmgWATQgdAahCAGQghADghAAQguAAgugGgADJA3QgCgDAAgJIABgZQAAgQgBgJQgCgdgNgTQgGgJgCgEQgCgKAHgDQAIgEAJAMQAQAWAEAjQACAUgBApQAAAPgIABIgCAAQgFAAgDgGgAi1h0QgHgCgJgFIgOgKQgIgGgSgJIgSgIQgNgHgGgIQgIgLAGgLQADgGAHgDQAHgDAIABQAJACASAKIAuAbQAOAHAHAHQALAMgFALQgDAIgJAEQgFABgFAAIgIgBg");
	this.shape_9.setTransform(88.1304,38.779);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E5E3D4").s().p("Am0FzQg6gTgOgCQgzgFgYgIQgPgGgbgQQgNgHgDgHQgDgOgEgGIgDgCQAegSAtgQQCUg5ChgPQBggJC1AFQARAAAMgCQAbAQAMgLQAGgFABgJQAAgJgFgHQgGgKgTgLInKkFQiGhNhLgjQh3g4hngTIglgGQAQgHAYgGQCUgnB3ACQCUAEBuA/QAYAOA0AkICHBgQBXA/AxAcQAbAQANgMQAFgGAAgIQgBgJgFgHQgFgIgUgKQgbgOgvghQAHgDAKgHQCCheCbgkQA6gOArACQBDADBeAuQBTApBNA2QBYA+AjA9QAIAPAQAlQAOAfAEATQAGAigLArQgHAcgUAvIgNAdQgIAPgJAKQgTAWgkARQhnAxiBgPQglgFhOgSQhMgSgogEQgngEhBABQhSAAg0ADQihAMiXA9IgzATQgdAKgXABIgEAAQgcAAgpgNgALqA8IgDAIQgBAEgFAGIgIAJIgKAMIgOALIgIAKQgEAHgEACQgEADgIADIgfAKIgLAEIgNAAQgOABgMAFQgKAEgBAHQAAAEAEADQAEADAFAAIASgEIAOgBIANgCIATgIIAMgDIAMgDQAGgDAJgGQAFgDADgEIAHgKQAEgFAKgGQAGgEAGgKQAIgLAEgEIAHgHIADgIQADgJgCgFQgDgFgGgBQgHAAgDAGgAF/jjQgpAAgwAYQgrAVgiAfQgSAQgIAPQgIAOgGAhQgGAlADAQQADASALAKQAFAFAOAIIAuAZIAgAQIAZAIIAZAIQARAGAhASQATAIArAIQBEAMAmgDQAagBAagHQAQgFAbgKQAWgIAJgGQAMgHATgSQASgRAEgLQAGgNgDgQQgDgNgJgNQgNgSgggTIgngXQgXgOgOgLQgPgLgXgVIgmghQhJg7hDAAIgDAAgACNg8QgFACgBAEQgCAFAGAIQAUAigDA3QgBARgEAHQgFAJAAACQAAAGAGACQAHACAFgDQAHgFADgQQAKg5gWg3QgEgMgHgEQgDgBgDAAIgEAAgAkfjqQgIAKAFALQADAGALAHIAfAXQAQAMALACQAIACAHgDQAIgCAEgHQAGgLgIgMQgHgLgQgIIgcgOIgLgHQgHgFgGAAIgDAAQgKAAgGAHg");
	this.shape_10.setTransform(92.3832,35.3708);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AmFGnQgPgDgZgJQgcgLgLgDQgPgEgmgFQgigFgSgGQgggKgygjQgTgNgCgNQgJADgGgEQgGgEgCgIQgBgIADgHQAEgJARgNQAhgWA2gVQDMhRDagGIBuAAIA2AAQg0gghAglQh6hCg8giIiLhSQhSgvg7geQinhRiMgMQgOgBgJgEQgIgEgDgGIgCgBQgJgGAAgJQAAgLASgMQAlgWBHgTQEIhEC4BBQBbAgCCBfQA8ArAtAfQAEgJAOgJQCkhvChghQBJgPA3AIQAcAEAmANQB8AsCDBeQAlAbAVAVQBLBHAeBhQANAqgBAkQgCAkgSAzQgYBCgcAjQgnAvhDAYQgzAShLAEQg0ADgvgGQglgEhKgRQhKgRgmgFQgngEg1AAQhxAAhbAMQhrAOhaAhIhlAlQgmALggAAQgRAAgQgDgAj3CtQihAPiUA5QgtAQgeASIADACQAEAGADAOQADAHANAHQAbAQAPAGQAYAIAzAFQAOACA6ATQAsAOAdgBQAXgBAdgKIAzgTQCXg9ChgMQA0gDBSAAQBBgBAnAEQAoAEBMASQBOASAlAFQCBAPBngxQAkgRATgWQAJgKAIgPIANgdQAUgvAHgcQALgrgGgiQgEgTgOgfQgQglgIgPQgjg9hYg+QhNg2hTgpQheguhDgDQgrgCg6AOQibAkiDBeQgKAHgHADQAwAhAbAOQAUAKAFAIQAFAHABAJQAAAIgFAGQgNAMgbgQQgygchWg/IiHhgQg0gkgYgOQhug/iUgEQh3gCiUAnQgYAGgQAHIAlAGQBnATB3A4QBLAjCGBNIHKEFQATALAGAKQAFAHAAAJQgBAJgGAFQgMALgbgQQgLACgSAAQhAgCg2AAQhhAAg+AGgAJhCtQgEgDAAgEQABgHAKgEQAMgFAOgBIANAAIALgEIAfgKQAIgDAEgDQAEgCAEgHIAIgKIAOgLIAKgMIAIgJQAFgGABgEIADgIQADgGAHAAQAGABADAFQACAFgDAJIgDAIIgHAHQgEAEgIALQgGAKgGAEQgKAGgEAFIgHAKQgDAEgFADQgJAGgGADIgMADIgMADIgTAIIgNACIgOABIgSAEQgFAAgEgDgAHTB2QgrgIgTgIQghgSgRgGIgZgIIgZgIIgggQIgugZQgOgIgFgFQgLgKgDgSQgDgQAGglQAGghAIgOQAIgPASgQQAigfArgVQAwgYApAAQBFgCBKA9IAmAhQAXAVAPALQAOALAXAOIAnAXQAgATANASQAJANADANQADAQgGANQgEALgSARQgTASgMAHQgJAGgWAIQgbAKgQAFQgaAHgaABIgOABQgkAAg4gKgAKGBCIACgBIgDgCIABADgAJZAjIgEADQAFgBAEgCIAAgCIgFACgACsBbQgGgCAAgGQAAgCAFgJQAEgHABgRQADg3gUgiQgGgIACgFQABgEAFgCQAFgBAFACQAHAEAEAMQAWA3gKA5QgDAQgHAFQgDACgEAAIgFgBgAjGijQgLgCgQgMIgfgXQgLgHgDgGQgFgLAIgKQAHgJAMACQAGAAAHAFIALAHIAcAOQAQAIAHALQAIAMgGALQgEAHgIACQgFACgEAAIgGgBg");
	this.shape_11.setTransform(90.3813,35.3739);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E5E3D4").s().p("AmFG+IglAAQgWgCgQgDQgTgEglgPQhPgfhSgpQAdgeAvgWQAggOA5gRIBZgYQA4gNAWgCQAegEAuAAQBWgBAvABQBKACA7AJQAKACAIAAIAJAEQAIACAJgEQAJgDACgJQAEgNgUgSQh4hmhvhRIiehwQiehyhXg2QiAhShzgyIAtgNQBDgRAngHQA6gLAxACQAfAAA0AJQCoAeBkBTQASAPAiAiQBxB2BgCIQAOATALgBQAJAAAGgJQAGgIgBgKQgCgNgRgUIgmguIAIgDQAHgCADgFIADgEQAsgcBSgoQA+gfAngLQBEgTBVAMQBAAKBXAeQA1ATAZAOQAkATAgAdQA9A2AkBMQAjBMACBTQABAjgIAVQgEALgKAPIgQAZIgMAaQgIAQgGAIQgNARgXANQgOAIgeALQg9AWgiAHQg2ALgqgJQgOgDgTgHIghgLQgWgHgxgJQiMgYiKAEQhKACgyALQgiAHhBAYIhIAbQgpAOghAFQghAFg/AAIgUAAgALsB/IgGAGQgDAFgFAFQgEAEgHAEIgoAdIgYAKIgPAJIgMAGIgRAFIgXAGQgKACgEADQgEAFAAAFQABAHAGABIAJAAIAhgJQANgCAHgFIARgJIALgFIAKgGIALgDIAIgFQASgQATgKIAJgGIAMgOIAFgHQADgFgDgGQgCgEgFgBIgCgBQgDAAgDACgAE0iOQg9AWgiAeQguApgIAzQgEAcAKAaQAKAcAWAQQASANAgAJIA3ANQAMAEAjAQQBSAlBFAGQBWAHBDglQAagOANgSQAZgfgGgtQgEgfgRgTQgMgOgcgOQgpgVgUgMQgigUgUgVIgSgUQgKgMgJgHQgKgGgVgIQgigMgbgCIgKgBQgmAAgyASgABvAPQgFAAgCAFQgCADADAJQAOAhAEAYQAGAggHAaQgDAHABAFQABAFAGABQAFACAEgDQAEgDACgIQAKgvgWhIQgEgMgGgFQgDgCgEAAIgCAAgAjhkAQgIACgEAHQgFAGABAIQAAAJAFAGQACADAOALIALALIAMAKQAQAMANgHQAKgGABgLQAAgLgMgLIgUgRIgKgMQgFgHgGgDQgEgBgEAAIgHABg");
	this.shape_12.setTransform(93.7053,28.6227);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AmUHnQgZgCgUgEQgcgGgugTQhFgchLgkQgigQgEgTQgFgXAegZQAtgmBFgaQArgRBUgUQA5gPAlgFQAqgGA6gBQCAgCBdAHQgsgog4gqQgxgmhhhEIhhhFQiihzhSg0QiLhXh6gxQgIgDgFgEQgPAAgFgMQgGgOAOgMQAHgGATgGQB3gkA/gKQCWgZCSArQCXAsBoBnQAcAcAqAzIBJBZQAGgGAMgGQBvg7A5gbQApgTAVgIQBXgdBtASQBNAMBxArQAfALASALQAPAIAgAaQAsAlAQARQA2A5AdBNQAcBLABBTQABAhgHAWQgFAQgPAbIggA3QgUAjgQANQgOAMgjAOQhDAbglAKQg7AQgwgFQgXgDgggIIg1gQQhEgThTgIQhAgGhZAAQhKgBgwAJQghAGgqAPIhKAcQgxATgcAHQghAIgqACQgXACg1AAIguAAgAj8DfQguAAgeAEQgWACg4ANIhZAYQg5ARggAOQgvAWgdAeQBSApBPAfQAlAPATAEQAQADAWACIAlAAQBOABAmgGQAhgFApgOIBIgbQBBgYAigHQAygLBKgCQCKgECMAYQAxAJAWAHIAhALQATAHAOADQAqAJA2gLQAigHA9gWQAegLAOgIQAXgNANgRQAGgIAIgQIAMgaIAQgZQAKgPAEgLQAIgVgBgjQgChTgjhMQgkhMg9g2QgggdgkgTQgZgOg1gTQhXgehAgKQhVgMhEATQgnALg+AfQhSAogsAcIgDAEQgDAFgHACIgIADIAmAuQARAUACANQABAKgGAIQgGAJgJAAQgLABgOgTQhgiIhxh2QgigigSgPQhkhTiogeQg0gJgfAAQgxgCg6ALQgnAHhDARIgtANQBzAyCABSQBXA2CeByICeBwQBvBRB4BmQAUASgEANQgCAJgJADQgJAEgIgCIgJgEQgIAAgLgCQg6gJhKgCIg5gBIhMABgAJaDuQgGgBgBgHQAAgFAEgFQAEgDAKgCIAXgGIARgFIAMgGIAPgJIAYgKIAogdQAHgEAEgEQAFgFADgFIAGgGQAEgCAEABQAFABACAEQADAGgDAFIgFAHIgMAOIgJAGQgTAKgSAQIgIAFIgLADIgKAGIgLAFIgRAJQgHAFgNACIghAJIgGAAIgDAAgAIJDFQhFgGhSglQgjgQgMgEIg3gNQgggJgSgNQgWgQgKgcQgKgaAEgcQAIgzAugpQAigeA9gWQA6gUAoADQAbACAiAMQAVAIAKAGQAJAHAKAMIASAUQAUAVAiAUQAUAMApAVQAcAOAMAOQARATAEAfQAGAtgZAfQgNASgaAOQg3AfhFAAIgdgBgACUCkQgGgBgBgFQgBgFADgHQAHgagGggQgEgYgOghQgDgJACgDQACgFAFAAQAFgBAEADQAGAFAEAMQAWBIgKAvQgCAIgEADQgCACgDAAIgEgBgAiwi4IgMgKIgLgLQgOgLgCgDQgFgGAAgJQgBgIAFgGQAEgHAIgCQAIgDAHADQAGADAFAHIAKAMIAUARQAMALAAALQgBALgKAGQgEACgGAAQgJAAgKgHg");
	this.shape_13.setTransform(91.6016,28.7271);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},2).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},2).to({state:[{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},2).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},2).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},2).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},2).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},2).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},2).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},2).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},2).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},2).to({state:[{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},2).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},2).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},2).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},2).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},2).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},2).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},2).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},2).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},2).to({state:[{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},2).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},2).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},2).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},2).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},2).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},2).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.6,-20,190.4,98);


(lib.eye1_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#663333").ss(4,1,1).p("ACDAAQAAAKgBAJQgFAogdAfQgCABgBACQgmAmg3AAQg1AAgngmQgmgnAAg2QAAgBAAgCQAAgLACgLQAIgmAcgdQAngmA1AAQA3AAAmAmQAmAmAAA2g");
	this.shape.setTransform(13.55,19.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(4,1,1).p("AiUAxQgEgSAAgUQAAg/AsgtQAtgtA/AAQA/AAAtAtQAtAtAAA/QAAA/gtAtQgOAOgQAK");
	this.shape_1.setTransform(15.3,14.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhcBcQgmgmAAg2IAAgDQABgLACgKQAGgnAdgdQAngmA1AAQA3AAAlAmQAnAnAAA1IgBAUQgFAngdAfIgEACQglAng3AAQg1AAgngng");
	this.shape_2.setTransform(13.55,19.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("ABwBJIABgUQAAg1gmgnQgmgmg1AAQg3AAgnAmQgcAdgHAmQgCAKgBALQgEgSAAgUQAAg/AsgtQAugsA+gBQBAABAsAsQAtAtAAA/QAAA/gtAtQgOANgQALQAdgfAFgng");
	this.shape_3.setTransform(15.3,14.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eye1_mc, new cjs.Rectangle(-2,-2,34.6,36.7), null);


(lib.exit_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0.369)").ss(4,1,1).p("ADcjbIAAG3Im3AAIDbjcgAjbjbIDbDbIDcDcAjbDcIAAm3IG3AA");
	this.shape.setTransform(21.975,22);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCB500").s().p("AjbDcIDbjcIDcDcgAAAAAIDcjbIAAG3gAjbjbIG3AAIjcDbIjbjbIDbDbIjbDcgAAAAAgAAAAAg");
	this.shape_1.setTransform(21.975,22);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,48,48);


(lib.doll_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(106));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC3333").s().p("AiWA6QgSgDgKgcQgGgNABgIQAAgOASgUQAMgQAJgGQAOgJAOADQAHADAJAHQAPAKAIALQAJAMABAPQABAQgHANQgKATgWAEIgaACIgRACIgCAAgAiSgSQgIABAAAHQAAAGAGADIALADQAEACAHAGIgLANQgKAMgCAEQgBAFADAFQACAFAFABQAGAAAGgKIARgWIALAKIAIAGQAHADAEgDQADgCABgEQABgFgCgDQgDgGgJgGIgIgGIADgCIAJgFQAEgDAAgGQAAgGgFgCQgFgCgHACIgKADQgDACgEAGIAAAAIgHgHQgDgDgIgBIgJgCIgDABgABdAeQgPgSAEgVQACgIAFgJQAJgUAQgIQARgHASAJQAJAFAIAIIgBAAQgFAAgEADQgEADgIAOIgUgLQgFgDgDAAQgDAAgDACQgHAGAFAIQADAGAJADQAKACACACIABABIgLASQgFAHABAGQABAEADADQADADADgBQAGAAADgGIAFgKIAHgLIACgDIACABQAHAFAJADQAGACAEgBIADAAQgDAFgFAEQgDADgJADQgXAKgNAAQgTAAgOgMgAC2AAIgNgFIgIgFIAEgEIAHgKIADgFIABACQAJAQAAALIAAACIgDgCg");
	this.shape.setTransform(39.0979,23.426);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("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gGADQgEACgBAFQgCAFADAEQADAHALAGIAvAdIgMAXQgDAHAAADQAAAGAFAEQADACAEgCQAEgBACgEIAHgOIAEgJIACAHIAHAMIAHALQAEAGAGgBQAHgCAAgJQgBgFgFgIIgCgEIAKAEQAIADARADIAZAIIATADIgCACIgKAQQgFAJABAFQABAEACADQADADAEAAQAGgBAFgLQAGgNAMgOIABgBIATAXQAHAHADAAQAFgBACgEQACgFgCgEQgBgEgDgEIgGgGIAeAAQATgBAmgDIgFAJQgDAJAEAHQACADAFABQAEABADgCIAEgJQACgIAEgKIAFAFQAJAJAHACQAFACAFgCQAFgCABgEQACgFgGgGIgKgGIgBAAIADgBQAPgGAHAAIALAAQAHAAAEgCIAHgGIgHARQgBAFACAEQADAEAEAAIACAAQgaAagPAKQgRALgdAMQgoARglALQgWAHgOADQgMACgLAAIgPgBgAm0oQQgHABgEADIgFAGIgIAIIgIAIIgHAKIgJANQgIANAAASQAAAIABAHIAHAWIAJAPQAFAIAFADQAHAFAQADIAIAEQAFABAEgBIAGgDIAJgCIAVgCIAMgDIALgHQAOgLAFgHQADgFABgHQAHgSgBgPQgBgUgNgUQgCgGgEgDIgMgHIgKgJQgGgHgFgCQgHgDgMAAQgPAAgMACgAh0kpIABgBIAKACIgTAWIAIgXg");
	this.shape_1.setTransform(68.0628,68.9455);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("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");
	this.shape_2.setTransform(68.0058,68.9783);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CC3333").s().p("AiEA8IgKgEQgKgBgFgBQgEgBgFgEIgHgJIgFgFIgFgMQgCgEgBgFQAAgDACgLIAFgOIAGgLIAJgOQADgEAIgGIAOgHQAFgDADAAQAEgBAEACQAOADAOALIAHAGIADACIACAEIAEAFIAEAIIAGAJIADAKQACAQgFALQgDAHgIAIQgLAKgKAEQgGACgLACIgJABIgFgBgAiVgVQgCADAAAEQAAAEADADQACACADABIAHACIAIAEIgKANIgIALIgHAHQgDAFAAAEQABAFAGABQAGACAEgDQAHgDAHgMQAEgHAJgIIAEAFIAGAIIAGAHQAEADAFgBQAGAAACgDQAFgHgJgMIgNgOIAJgGQAMgJgDgIQgDgIgLACQgFABgIAIIgHAGIgMgKQgHgFgFgBIgCAAQgIAAgDAGgABjApIgIgGQgJgKgHgEIAAggIABgHIADgEQADgDADgFIAEgHQAEgHAEgBIAJgDIAFgEIAEgBIAhAAQADAAADACIAGAFIAHAGIgGACQgGADgFAGIgFAEIgDgCQgLgIgFgCQgLgDgHAHQgDADABAGQAAAFAEACQADABAHABIAGADIAHAEIgDAIQgJAJgDAGQgCAFABAFQACAGAEABQAIADAHgLIALgSIACgEIANAKQAJAIAGgCQAFgBABgGQABgFgCgFQgDgEgNgIIgDgCIAKgHIAEgEIAGAJIACAEIAAAFIAAARIgBAHQgBADgDACQgJACgFADQgHAGgFACIgGAAIgGAAIgHADQgCAAgHgCQgFgBgJACQgJADgFAAIgBAAg");
	this.shape_3.setTransform(39.1458,23.8438);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CCCCCC").s().p("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");
	this.shape_4.setTransform(65.7198,68.9203);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("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");
	this.shape_5.setTransform(65.7862,68.8944);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCCCCC").s().p("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");
	this.shape_6.setTransform(63.5438,68.9203);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("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gJABQgEAAgGgEIgIgFQgJAbgDAYgAhHkeIgBADIACgEIgBABgAl6lvIgSgDIgIgCQgTgIgLgOQgLgOgEgRQgEgXAJgXIAOgYQAFgJAGgGQAFgEAMgHQAIgGAHgCQAOgFASAGQAMAFAPALQAKAHAFAGIAJANQALASACAIQADALgCASQAAAGgDAGIgFAKIgEAIQgEAGgHAHQgXAVgkAAIgGAAgAl4n+QgDABgFADIgNAHQgIAGgDAEIgKANIgGAMIgEAPQgDAKABADQAAAFADAFIAFAMIAFAFIAHAIQAEAFAFAAQAFACAJAAIAKAFQAEABALgBQALgCAGgDQAKgDAKgKQAIgIADgIQAFgKgCgSIgCgKIgGgJIgEgIIgFgFIgCgEIgDgBIgHgGQgNgLgOgEIgGgBIgDAAgAiGmBIgHgDIgIAAQgGgBgFgEIgUgRIgGgHQgCgDAAgIIAAgjIABgNIAKgPIAJgPQAGgGAGgDIAIgDIAFgEQAEgCAHAAIAiAAIANABIALAFQAJAFAAAGQAGABAFAIIAHAKIAIAPQADAGABAVQABAKgBAFQgCAOgMAIQgMAEgFAEIgIAFQgEACgGABIgLACQgGADgDAAIgIgBIgHABQgHAEgFAAIgDgBgAiFn3IgFAFIgJACQgEACgDAGIgFAIQgCAFgDADIgDAEIgBAHIAAAhQAGADAKALIAHAFQAFABAKgDQAKgDAFABQAHADACgBIAGgCIAHAAIAGgBQAEgBAIgHQAEgCAJgDQADgBACgDIABgHIAAgSIgBgFIgCgEIgGgKIgEAEIgJAIIADACQAMAHADAGQADAEgBAGQgCAFgFABQgGACgIgHIgNgKIgDAEIgKASQgIAKgHgCQgFgCgBgFQgBgFACgFQADgGAIgKIAEgIIgHgFIgGgDQgHAAgDgCQgFgCAAgFQAAgFADgEQAGgGALADQAGACALAHIADACIAEgEQAGgFAFgEIAGgCIgGgGIgGgEQgDgCgDAAIgiAAgAmJmRQgGgCgBgFQgBgEADgEIAHgIIAIgLIALgMIgJgGIgGgCQgEgBgCgCQgCgCgBgFQAAgEACgDQAFgGAJABQAEABAHAFIANAJIAGgGQAJgHAFgCQALgCADAIQADAIgMAJIgJAHIAMAOQAJANgEAGQgDAEgFAAQgFAAgEgDIgHgHIgFgIIgEgEQgJAIgFAGQgHANgGADQgDABgDAAIgEAAg");
	this.shape_7.setTransform(63.5602,68.8944);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CCCCCC").s().p("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");
	this.shape_8.setTransform(61.2884,68.9203);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AAaKrQgdgFgVgOQgZgQgIgYQgEgNABgbIAJjGQABgngPgNQgIgHgVgDQgogFgpgBQgEAEgFACQgEABgFAAIgKgBIgMAAIgNABQgLAAgSgCIgcgEIghgEIgdgGQgQgCgIgCQgOgDgRgMIgMgJQgcAnglAXQg5Ajg/gHQgggDgcgPQgdgOgVgYQgWgZgKgfQgLggADghQADggAQgeQAQgeAZgUIAXgQIAXgPQAsghAshOQA4hkAUgYQAJgMAIgFQgvgmgWgwQgTgpABgzQAAgvAQgvIAEgKIgighIgCgCIgJgCQgLgEgDgGQgCgEAAgFQAAgGACgEQAEgHAJgCQAHgCAGACQAGACAFAEIAHAFQADAEAAADQABAFgDAGIABADIAHAIIAPAPQAPgjAXgbIgDgJIgIguIgBgHQgIgBgDgEQgDgFACgGQAAgDAEgHQAEgIACgCQAGgFAKABQAIABAHAIQAEAEAAAGQAAAEgCAEQgEAIgGADIAIAtIAKgJQAWgUAggTQAVgMAngSQApgTAUgDQAQgDAVABIAlAEQAwAGAXAHQAnAKAZAVQAPANAXAgQAdAoAIASQAcA3AEBIQABAsgJAfQgJAbgUAfIgCACIARAFQANADAeAFQAdAFAPAFQAOAEAdAKIAgAIIAVghIAGgMQACgEAGgGQADgEAFgLIAFgFQgDgIACgHQACgIAEgDQAHgHAPABQALABAEAFQACADAAAJQAAAQgDAEQgGAKgPgBIgFgBIgqBEIAkANQApAPAWANQAiATARAaQAQAYAHAqQAFAXgEAPIgEALIBQgfQAfgMAWgFIAfgFIAfgDQAxgEAIABQAeACAcAQQAbAQAQAaQALASAJAbQAQA5gIA8QgIA7gfAzQgOAXgOAMQgYAVgoAJQhHAShFgMQgvgLgXgEIhagLQgogFgbgIQANAeAJAmQAJAkABAaQAAAWgEAjQgFAogEAVQgHAigNAYQgPAcgaAVQgZAVgeAMQgmAOgrAAQgWAAgYgEgAjLETIBFADQAuACAWAHQAnAOAMAeQAGAQgCAhIgIDYQgBAOAEAHQADAHANAGQAeANAgACQAiADAegKQAfgKAZgWQAZgWAMgdQAKgYAGgvQAIhAgEggQgEgagQgpQgNgcgJgPQgXgkgngXQgngWgrgBQgUAAgHgCQgHgDgEgFQgEgGAAgGQABgJALgGQAIgEAMAAQAigBAgAJQgVgfgYgcIgEAFIgHAKQgEAGgEABQgEABgDgCQgEgBgBgEQgDgHAEgIQABgDAIgJIAGgGIgagbIgOgNIgDAEIgGAIQgDADgGgCQgGgCgBgFQgBgEAFgIIAHgJIgIgIQgQgQgcghQgHAIgDAFIgFAJQgDAEgEAAQgFABgDgDQgEgEABgFQAAgHAIgKIALgOIgxg4IgEACIgJAHQgFAFgDABQgEABgDgCQgEgCgBgDQgDgIALgKIAKgIIgagYQgJgIgBgEQgdALgqAOQgTAGgKABQgUACgggMIAAACQAABwgWB0QgQBTgaA0IgFAIIACACIALAIIALAHQAFADAMACIAvAHQAtAJAdgBIABAAQAGgHAPAAIAFAAgAm2imQgWAZgXAnIgnBEQgXAngTAaQgaAigdAUIgZARQgQAKgJAIQgZAWgKAiQgJAjAKAgQAIAbAVAVQAUAVAbAKQA3AUA3gaQA0gYAig9QAYgqARhKQAThUAFhNQADgogBgpIAAgRQglgQgcgSQgDAGgGAGgADkDmQAIACAPAIQAeAOAzAEQBKAHAKACIA4ANQA/ANA+gNQAegGAQgLQAZgQARglQAihGgNhNQgGghgPgZQgSgcgcgKQgVgHgmAEQgrADggAHQgeAIhAAZQg8AYgiAHQgXAEgMgDQgHgCgFgEQgRgFgKgDQgSgHgLgKQgEgDgPgPIgjgqQgigngRgOQgSgOgggSQgbgQgPgFQgNgFgbgFIgzgKQgPgCgGgHQgVANgYALIgKAEIACACIAfAiQARgGAVABQAJABAEADQAFAEgDAJQgBAFgEABQgDACgIgCQgKgDgKADIAtAxIACgBQAFgDAYgDQARgCAFADQAFAEgBAIQgBAIgFABQgEABgGgBQgQgCgKAEIAfAhIATAUQAKgJAJgBIAOgCQAMgCAEADQAFADgCAIQgBAGgGACIgJABIgKABQgFABgHAFIAoAtQARgJAYADQAHABAEADQAHAGgDAHQgEAJgJgBIgIgDQgKgEgKAFIAcAiIAYAfIACgHIADgNQACgIADgEIAJgJIAHgHQAGgFAHAEQADABACADQACADgBAEQgBAEgFAEIgIAGQgFAFgCAKIgFAQQgEAHAAADIABAEQAoAUAcAgIAGgBIAHABgAExgDQgBgJAFgHIAJgIQAHgFADgDQAHgJgGgWQgGgdgJgPQgMgSgXgNQgOgJgdgLIgmgPIgZgJIgFAJIgKAVQgDAGgDABQgEADgFgCQgGgCgBgFQgBgDACgGQADgKAJgNIADgEIgTgFIgjgNQgTgGgngHIg5gKQgKgCgGgDIgQAPIgFAFIA1AKQAkAHAOAHQAJAEANAJIAyAgQAQAKAJAIQALAJASAWIAlAtQAWAaAOAIQAHAFAQAFIADgBQAEAAAGACIAKADIALACIAAAAgAn8mQQgHA2AVApQAKASAaAfQAeAjAVAMQAQAIAiAMIAfAQQASAJAOACQATACAggKQA7gSA3gcQAfgRAPgNIAOgNQgGgCgBgIQAAgFADgHIglAHQAHAEAEAEQAGAIgDAGQgEAFgGgBQgFgBgGgEIgUgLIgCADQgHANgDADQgGAHgFgCQgEAAgCgEQgCgEABgEQABgDAGgKIABgCQgvAEgsgDIAGAGQAHAIACADQAEAJgFAFQgFAEgHgDQgDgBgHgHIgPgTIgEgGQgKALgHAMQgHAMgHgBQgEgBgCgDQgCgDAAgEQAAgFAGgJIAKgOQgqgHgkgNIAFAKQAFAHAAADQABADgCAEQgCADgEABQgHACgGgGQgEgEgEgJIgIgVIgKATQgFAIgFABQgEABgDgCQgDgCgBgDQgCgFAFgKIALgSQgcgPgZgTQgGgFgCgFQgEgHAGgFQAFgFANAJQAWARAZANQgEgIgBgFQAAgFADgFQADgEAFAAQAGABAEAJIAEgFQAIgHAHABQAEAAADADQADADABAEQAAAFgFAFIgKAIIgGAJIACAEQAeANAgAIIAYAEIgEgEQgDgEAAgEQABgFADgCQAGgGALAIQAGAEAGAHIANgOQAFgEAFgCQAHgCAEAEQAFAFgEAHQgBADgHAHIgJAIQArAEArgDQgFgGgCgHQgCgGACgEQABgEAEgBQAEgCADABQAEABAEAFIAHAHIAGAEIAHgTIAHgLQAGgFAGADQAEACAAAHQAAAFgCAFIgIATQAagEAlgIIAAgBIgIAAQgFgCgBgFQgCgEADgGQAEgEAGgCQAGgBAGAEIAJgSQAFgNAIABQAFAAACAEQADAEgBAEQAAAGgGAKIgIAQIABABIAIgCQAOgVAEgPQAGgSgBgkQgCgvgIgZQgKghglg2QgaglgUgOQgXgPgzgIQghgGgQgBQgbgCgWAEQgVAFgmATQgnAUgTAMQgfATgTAXIgFAGIAAAAIAFAPQABAKgGAEQgDACgEgBQgDAAgCgDIgCgFIgNAXIgJAVIACABIALAHQAGAFAAAGQAAAJgJABQgEAAgGgEIgIgFQgJAbgDAYgAgwkeIgBADIACgEIgBABgAljlvIgSgDIgIgCQgTgIgLgOQgLgOgEgRQgEgXAJgXIAOgYQAFgJAGgGQAFgEAMgHQAIgGAHgCQAOgFASAGQAMAFAPALQAKAHAFAGIAJANQALASACAIQADALgCASQAAAGgDAGIgFAKIgEAIQgEAGgHAHQgXAVgkAAIgGAAgAlhn+QgDABgFADIgNAHQgIAGgDAEIgKANIgGAMIgEAPQgDAKABADQAAAFADAFIAFAMIAFAFIAHAIQAEAFAFAAQAFACAJAAIAKAFQAEABALgBQALgCAGgDQAKgDAKgKQAIgIADgIQAFgKgCgSIgCgKIgGgJIgEgIIgFgFIgCgEIgDgBIgHgGQgNgLgOgEIgHgBIgCAAgAhvmBIgHgDIgIAAQgGgBgFgEIgUgRIgGgHQgCgDAAgIIAAgjIABgNIAKgPIAJgPQAGgGAGgDIAIgDIAFgEQAEgCAHAAIAiAAIANABIALAFQAJAFAAAGQAGABAFAIIAHAKIAIAPQADAGABAVQABAKgBAFQgCAOgMAIQgMAEgFAEIgIAFQgEACgGABIgLACQgGADgDAAIgIgBIgHABQgHAEgFAAIgDgBgAhun3IgFAFIgJACQgEACgDAGIgFAIQgCAFgDADIgDAEIgBAHIAAAhQAGADAKALIAHAFQAFABAKgDQAKgDAFABQAHADACgBIAGgCIAHAAIAGgBQAEgBAIgHQAEgCAJgDQADgBACgDIABgHIAAgSIgBgFIgCgEIgGgKIgEAEIgJAIIADACQAMAHADAGQADAEgBAGQgCAFgFABQgGACgIgHIgOgKIgCAEIgKASQgIAKgHgCQgFgCgBgFQgBgFACgFQADgGAIgKIAEgIIgHgFIgGgDQgHAAgDgCQgFgCAAgFQAAgFADgEQAGgGALADQAGACALAHIADACIAEgEQAGgFAFgEIAGgCIgGgGIgGgEQgDgCgDAAIgiAAgAlymRQgGgCgBgFQgBgEADgEIAHgIIAIgLIALgMIgJgGIgGgCQgEgBgCgCQgCgCgBgFQAAgEACgDQAFgGAJABQAEABAHAFIANAJIAGgGQAJgHAFgCQALgCADAIQADAIgMAJIgJAHIAMAOQAJANgEAGQgDAEgFAAQgFAAgEgDIgHgHIgFgIIgEgEQgJAIgFAGQgHANgGADQgDABgDAAIgEAAg");
	this.shape_9.setTransform(61.275,68.8944);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CCCCCC").s().p("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YgNgXgRQgMgJgGAEQgGAFAEAIQACAEAHAFQAYAUAcAOIgKATQgFAJABAGQABADAEACQADACADgBQAFgCAFgIIALgSIAIAVQAEAJADADQAGAGAIgBQADgBACgEQACgDAAgEQgBgDgEgHIgGgJQAlANAqAHIgLAOQgFAJAAAEQgBAEACADQADAEADAAQAHACAIgMQAHgMAJgLIAEAFIAPATQAHAHADACQAIADAEgFQAFgFgDgIQgCgEgIgHIgFgGQArADAvgEIgBABQgGALAAADQgBAEACADQACAEADABQAGACAGgHQADgDAHgNIABgEIAVAMQAGAEAEAAQAHABADgFQAEgGgHgHQgDgEgHgEIAlgHQgEAHABAFQABAIAGABIgOAOQgPANggAQQg2Adg7ASQgbAIgRAAIgHgBgAltoRQgHACgJAFQgMAHgEAFQgGAGgFAJIgOAYQgKAXAFAXQAEARAKANQALAOATAIIAJADIARACQAoACAZgWQAIgHADgHIAFgHIAFgLQACgGABgGQACgSgDgKQgDgJgKgRIgKgOQgFgFgJgHQgQgMgMgEQgJgDgJAAQgHAAgGACgAh5oLIgGAEIgIAEQgGACgFAHIgKAPIgKAOIgBANIAAAjQAAAIACAEIAGAGIAVARQAFAFAFAAIAJABIAGADQAGACAKgFIAGgCIAIACQAEAAAGgEIAKgCQAHAAADgCIAIgGQAFgDAMgFQANgHABgOQABgFgBgLQgBgUgCgHIgJgPIgHgJQgEgIgHgCQABgGgKgEIgKgFIgOgBIghAAQgIAAgDABg");
	this.shape_10.setTransform(61.4085,68.9203);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("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");
	this.shape_11.setTransform(61.4523,68.8944);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#CCCCCC").s().p("ACBKFQgggCgegOQgOgGgDgGQgEgIABgNIAIjZQACgggGgRQgMgegngNQgVgIgugCIhFgCQgTgBgHAHIgBADIgbgFIgygLIgrgHQgdgIgWgTQgJgIgEgIIgDgLIgDgMQgGgQgCgJIgDgMQAfggAOgTQAUgZAUgmQAbgwAKgaQALgcAQg8IALAAQAKgBATgGQAqgOAdgMQABAFAJAHIAaAZIgKAIQgLAJADAIQABAEAEACQADABAEgBQADgBAFgFIAJgGIAEgDIAxA5IgLAOQgIAKAAAGQgBAFAEAEQADADAFAAQAEgBADgDIAFgJQACgFAHgIQAcAhAQAQIAIAIIgHAIQgFAJABAEQABAFAGACQAGABAEgDIAGgIIADgEIAOANIAaAcIgGAGQgIAIgBAEQgEAHADAHQABAEAEACQADACAEgBQAEgBAEgGIAHgKIAEgFQAYAcAVAfQgggKgiABQgMABgIAEQgLAFgBAJQAAAGAEAGQAEAFAHADQAHADAUAAQArABAnAWQAnAWAXAlQAJAOANAdQAQAoAEAbQAEAggIBAQgGAugKAYQgMAegZAWQgZAWgfAKQgYAHgaAAIgOAAgAIbEYIg4gNQgKgChKgHQgzgFgegOQgPgIgIgBQgHgCgGACQgcgggogUIgBgFQAAgCAEgHIAFgQQACgLAFgEIAIgHQAFgEABgEQABgDgCgDQgCgEgDgBQgHgDgGAFIgHAHIgJAIQgDAFgCAIIgDANIgCAGIgYgfIgcghQAKgFAKAEIAIACQAJABAEgIQADgIgHgGQgEgDgHgBQgYgCgQAJIgpgtQAHgFAFgBIAKgBIAJgBQAGgDABgGQACgHgFgDQgEgDgMACIgOABQgIACgLAJIgUgUIgfgiQAKgEAQADQAGABAEgBQAGgCABgIQABgHgGgEQgFgEgRACQgYAEgFACIgCACIgsgxQALgDAJACQAIACADgBQADgCABgFQADgIgFgFQgDgDgJgBQgVAAgRAGIgfgiIgCgCIAKgFQAYgLAVgMQAGAHAPACIAyAKQAcAFANAFQAPAFAbAQQAgASASAOQARAOAiAmIAjAqQAPAQAEACQALAKASAHQAKAEARAFQAGAEAGABQAMAEAXgEQAigHA8gZQBAgZAegHQAggHArgEQAmgEAVAIQAcAJASAcQAPAZAGAiQANBNgiBGQgRAlgZAQQgQAKgeAHQgfAGgfAAQgfAAgggGgAqBDKQgYgDgNgDQgUgEgOgKQgTgOgUgiQgYgngBgYQgBgWAPghQAag3AmgPQAdgMAmAKQAXAHAoAUQAYANALgKQAFgFAAgIQAAgHgEgGIA0geIARgLQASgLAIgGIAYgWQAdgWANgNIAKgKQAqAaA9AWIACABIgEAPQgZB1hVBlQgvA4gsAVQgmASgyAEIgaABQgdAAglgDgAFpgFIgKgEQgGgCgEABIgDAAQgQgFgHgEQgOgJgWgZIglgtQgSgWgLgKQgJgHgQgKIgyggQgNgJgJgFQgOgGglgIIg1gJIAFgFIAQgPQAGADAKABIA6ALQAnAHATAGIAjAMIATAFIgDAFQgJAMgDAKQgCAGABADQABAFAGADQAFACAEgDQADgCADgGIAKgUIAFgJIAZAIIAmAPQAdAMAOAIQAXAOAMARQAJAPAGAdQAGAWgHAJQgDAEgHAFIgJAIQgFAGABAKIgLgCgAjjijQgOgCgSgJIgfgPQgigMgQgJIgEgCIgBgCQgDgGgHgDIgFgCQgOgMgRgUQgagegKgSQgVgpAHg2QADgYAJgbIAIAFQAGAEAEgBQAJgBAAgIQAAgGgGgFIgLgHIgCgCIAJgVIANgXIACAFQACADADABQAEABADgCQAGgEgBgKIgFgPIAAAAIAFgHQATgWAfgUQATgMAngUQAmgTAVgEQAWgFAbACQAQACAhAFQAzAIAXAPQAUAOAZAmQAlA1AKAhQAIAaACAvQABAjgGATQgEAPgOAUIgIACIgBAAIAIgRQAGgKAAgFQABgFgDgDQgCgEgFgBQgIAAgFAMIgJATQgGgEgGABQgFABgEAFQgDAFACAEQABAGAFABIAHABIAAAAQgkAIgaAFIAIgTQACgFAAgFQAAgHgEgDQgGgDgGAFIgHAMIgHATIgGgEIgHgIQgEgFgEgBQgDgBgEACQgEACgBADQgCAEACAHQACAHAFAFQgrADgrgDIAJgJQAHgHABgCQAEgIgFgFQgEgEgHACQgFADgFAEIgNAOQgGgHgGgFQgLgHgGAFQgDADgBAEQAAAFADADIAEAFIgYgFQgggHgegNIgCgFIAGgIIAKgIQAFgFAAgGQgBgDgDgDQgDgDgEgBQgHAAgIAGIgEAGQgEgJgGgBQgFgBgDAFQgDAEAAAGQABAFAEAIQgYgNgXgRQgNgJgFAEQgGAFAEAIQACAEAGAFQAZAUAcAOIgLATQgFAJACAGQABADADACQADACAEgBQAFgCAFgIIAKgSIAIAVQAEAJAEADQAGAGAHgBQAEgBACgEQACgDgBgEQAAgDgFgHIgFgJQAkANAqAHIgKAOQgGAJAAAEQAAAEACADQACAEAEAAQAHACAHgMQAHgMAKgLIAEAFIAPATQAHAHADACQAHADAFgFQAFgFgEgIQgCgEgHgHIgGgGQAsADAvgEIgBABQgGALgBADQgBAEACADQACAEAEABQAFACAGgHQADgDAHgNIACgEIAUAMQAGAEAFAAQAGABAEgFQADgGgGgHQgDgEgIgEIAlgHQgDAHAAAFQABAIAGABIgOAOQgPANgfAQQg3Adg7ASQgaAIgSAAIgHgBgAkpoRQgHACgIAFQgMAHgFAFQgGAGgFAJIgOAYQgJAXAEAXQAEARALANQALAOATAIIAIADIASACQAoACAZgWQAHgHAEgHIAEgHIAFgLQADgGAAgGQACgSgDgKQgCgJgLgRIgJgOQgFgFgKgHQgPgMgMgEQgKgDgIAAQgHAAgHACgAg1oLIgFAEIgIAEQgGACgGAHIgJAPIgKAOIgBANIAAAjQAAAIACAEIAGAGIAUARQAFAFAGAAIAIABIAHADQAFACAKgFIAHgCIAIACQADAAAGgEIAKgCQAGAAAEgCIAIgGQAFgDAMgFQAMgHACgOQABgFgBgLQgBgUgDgHIgIgPIgHgJQgFgIgGgCQAAgGgJgEIgLgFIgMgBIgiAAQgHAAgEABg");
	this.shape_12.setTransform(54.5667,68.9203);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("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");
	this.shape_13.setTransform(54.6048,68.8944);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#CCCCCC").s().p("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");
	this.shape_14.setTransform(52.691,68.9203);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("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");
	this.shape_15.setTransform(52.672,68.8944);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#CCCCCC").s().p("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EQgGAFAEAIQACAEAHAFQAYAUAcAOIgKATQgFAJABAGQABADAEACQADACADgBQAFgCAFgIIALgSIAIAVQAEAJADADQAGAGAIgBQADgBACgEQACgDAAgEQgBgDgEgHIgGgJQAkANAqAHIgKAOQgFAJAAAEQgBAEACADQADAEADAAQAHACAIgMQAHgMAJgLIAEAFIAPATQAHAHADACQAIADAEgFQAFgFgDgIQgCgEgIgHIgFgGQArADAvgEIgBABQgGALAAADQgBAEACADQACAEADABQAGACAGgHQADgDAHgNIABgEIAVAMQAGAEAEAAQAHABADgFQAEgGgHgHQgDgEgHgEIAkgHQgDAHABAFQABAIAFABIgNAOQgPANggAQQg2Adg7ASQgbAIgRAAIgHgBgAkzoRQgHACgJAFQgMAHgEAFQgGAGgFAJIgOAYQgKAXAFAXQAEARAKANQALAOATAIIAJADIARACQAoACAZgWQAIgHADgHIAFgHIAFgLQACgGABgGQACgSgDgKQgDgJgKgRIgKgOQgFgFgJgHQgQgMgMgEQgJgDgJAAQgHAAgGACgAg/oLIgGAEIgIAEQgGACgFAHIgKAPIgKAOIgBANIAAAjQAAAIACAEIAGAGIAVARQAFAFAFAAIAJABIAGADQAGACAKgFIAGgCIAIACQAEAAAGgEIAKgCQAGAAADgCIAIgGQAFgDAMgFQANgHABgOQABgFgBgLQgBgUgCgHIgJgPIgHgJQgEgIgHgCQABgGgKgEIgJgFIgOgBIghAAQgIAAgDABg");
	this.shape_16.setTransform(55.6288,68.9203);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("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");
	this.shape_17.setTransform(55.5715,68.8944);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#CCCCCC").s().p("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ABAGQABADAEACQADACADgBQAFgCAFgIIALgSIAIAVQAEAJADADQAGAGAIgBQADgBACgEQACgDAAgEQgBgDgEgHIgGgJQAkANAqAHIgKAOQgFAJAAAEQgBAEACADQADAEADAAQAHACAIgMQAHgMAJgLIAEAFIAPATQAHAHADACQAIADAEgFQAFgFgDgIQgCgEgIgHIgFgGQArADAvgEIgBABQgGALAAADQgBAEACADQACAEADABQAGACAGgHQADgDAHgNIABgEIAVAMQAGAEADAAQAHABADgFQAEgGgHgHQgDgEgGgEIAjgHQgDAHABAFQAAAIAGABIgNAOQgPANgfAQQg2Adg7ASQgbAIgRAAIgHgBgAj/oRQgHACgJAFQgMAHgEAFQgGAGgFAJIgOAYQgKAXAFAXQAEARAKANQALAOATAIIAJADIARACQAoACAZgWQAIgHADgHIAFgHIAFgLQACgGABgGQACgSgDgKQgDgJgKgRIgKgOQgFgFgJgHQgQgMgMgEQgJgDgJAAQgHAAgGACgAgLoLIgGAEIgIAEQgGACgFAHIgKAPIgKAOIgBANIAAAjQAAAIACAEIAGAGIAVARQAFAFAFAAIAJABIAGADQAFACAKgFIAGgCIAIACQAEAAAGgEIAKgCQAHAAADgCIAIgGQAFgDAMgFQANgHABgOQABgFgBgLQgBgUgCgHIgJgPIgHgJQgEgIgHgCQABgGgKgEIgKgFIgOgBIggAAQgIAAgDABg");
	this.shape_18.setTransform(50.4386,68.9203);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("ACHKrQgegFgWgOQgZgQgHgYQgEgNABgbIAJjGQABgngPgNQgJgHgVgDQgsgGguAAQgPAAgJgCIgrgCQgwgCgYgFQgngIgagTQgWgQgVgeQgQgYgFgRQgEgPgBgZIgBg7IACheQgQADgSABQguADg2gNQgogKg4gXQhTghg2gkQhHgtgog6QgTgZgIgaQgHgbAEgkQAEgmAOgoQALgdANgNQATgVAhgJQAbgGAeADQAgAEAkASQAZAOAlAaQAxAlAXAUIBOBEIADADQgSgpAAgyQAAgvARgvIADgKIgighIgBgCIgJgCQgMgEgCgGQgCgEAAgFQAAgGACgEQADgHAJgCQAHgCAHACQAFACAFAEIAHAFQADAEABADQAAAFgDAGIACADIAGAIIAPAPQAQgjAXgbIgEgJIgHguIgBgHQgIgBgDgEQgDgFABgGQABgDADgHQAFgIACgCQAGgFAKABQAIABAGAIQAFAEAAAGQAAAEgDAEQgEAIgFADIAIAtIAJgJQAWgUAhgTQAVgMAngSQAogTAUgDQAQgDAVABIAlAEQAxAGAXAHQAmAKAYAVQAPANAXAgQAdAoAJASQAdA3ADBIQACAsgKAfQgIAbgWAfIgCACIASAFQANADAfAFQAcAFAPAFQAPAEAdAKIAfAIIAWghIAFgMQACgEAGgGQAEgEAEgLIAFgFQgCgIACgHQACgIADgDQAHgHAQABQALABADAFQADADAAAJQAAAQgDAEQgGAKgQgBIgFgBIgqBEIAkANQAqAPAWANQAhATARAaQARAYAHAqQAEAXgDAPIgFALIBQgfQAfgMAWgFIAfgFIAfgDQAygEAIABQAeACAbAQQAbAQAQAaQALASAJAbQAQA5gIA8QgIA7geAzQgOAXgOAMQgZAVgoAJQhGAShGgMQgugLgYgEIhZgLQgogFgcgIQAOAeAJAmQAJAkAAAaQABAWgFAjQgEAogFAVQgHAigNAYQgPAcgZAVQgZAVgfAMQgmAOgqAAQgWAAgYgEgAjVhxQAJABAEAGQAGAIgFAMQgEAJgJAJQgjAhgsATIgQAGIgBAHQgFBFACA4QABA8ATAeQAXAlA1APQAhAJA9ABIBFACIAOABIANABQAtACAWAHQAmAOAMAeQAHAQgCAhIgJDYQgBAOAEAHQAEAHANAGQAeANAhACQAhADAfgKQAfgKAYgWQAZgWANgdQAKgYAGgvQAIhAgFggQgEgagQgpQgMgcgJgPQgXgkgngXQgngWgsgBQgTAAgHgCQgHgDgEgFQgFgGABgGQABgJAKgGQAIgEAMAAQAigBAhAJQgVgfgYgcIgEAFIgIAKQgEAGgEABQgDABgEgCQgDgBgCgEQgDgHAEgIQACgDAHgJIAHgGIgbgbIgNgNIgDAEIgHAIQgEADgGgCQgGgCgBgFQgBgEAGgIIAGgJIgHgIQgRgQgcghQgGAIgDAFIgFAJQgEAEgEAAQgEABgEgDQgDgEAAgFQAAgHAIgKIAMgOIgwg4IgFACIgIAHQgFAFgEABQgDABgEgCQgDgCgBgDQgDgIAKgKIAKgIIgZgYQgJgIgCgEQgcALgrAOQgTAGgKABQgUADghgNQhLgcgtgfIgCgCIgCgBIgsgWQgwgbhVhLQhUhKgygbQgjgTgcgDQglgFgaAVQgRANgJAbQgGAQgFAgQgFAiADAQQAEAXAVAdQAmAzA/AoQAzAhBJAdQBfAnBCACQAsABAngMQAqgOAdgdIALgKQAGgGAGgDQAHgEAHAAIABABgAFRDmQAIACAPAIQAeAOAzAEQBJAHALACIA4ANQA+ANA/gNQAdgGARgLQAYgQASglQAhhGgMhNQgGghgQgZQgSgcgbgKQgWgHgmAEQgrADgfAHQgfAIg/AZQg8AYgiAHQgXAEgNgDQgGgCgFgEQgSgFgJgDQgSgHgMgKQgDgDgPgPIgkgqQghgngSgOQgRgOgggSQgbgQgPgFQgNgFgcgFIgzgKQgPgCgHgHQgTANgYALIgKAEIABACIAgAiQAQgGAVABQAJABADADQAGAEgDAJQgBAFgEABQgEACgHgCQgKgDgLADIAuAxIACgBQAEgDAZgDQAQgCAGADQAGAEgBAIQgBAIgHABQgDABgHgBQgPgCgKAEIAfAhIATAUQALgJAJgBIAOgCQALgCAEADQAGADgCAIQgCAGgGACIgJABIgJABQgGABgGAFIAoAtQARgJAXADQAHABAFADQAHAGgEAHQgDAJgJgBIgIgDQgKgEgKAFIAcAiIAXAfIADgHIADgNQABgIAEgEIAIgJIAHgHQAGgFAHAEQADABACADQACADgBAEQgBAEgEAEIgJAGQgEAFgDAKIgFAQQgDAHAAADIAAAEQApAUAcAgIAGgBIAHABgAGegDQgCgJAFgHIAKgIQAHgFACgDQAHgJgFgWQgHgdgJgPQgLgSgXgNQgPgJgdgLIgmgPIgZgJIgFAJIgJAVQgDAGgDABQgEADgGgCQgFgCgBgFQgBgDACgGQADgKAJgNIADgEIgTgFIgjgNQgTgGgngHIg7gKQgKgCgGgDIgPAPIgFAFIA1AKQAlAHANAHQAJAEAOAJIAxAgQAQAKAKAIQALAJASAWIAlAtQAVAaAOAIQAIAFAQAFIADgBQAEAAAGACIAJADIAMACIAAAAgAmQmQQgGA2AVApQAJASAbAfIAWAXQAPAHAFAGQAEAEACAFIADACQAPAIAiAMIAfAQQATAJAOACQATACAggKQA7gSA2gcQAfgRAPgNIAOgNQgGgCgBgIQgBgFAEgHIgkAHQAGAEADAEQAHAIgEAGQgDAFgHgBQgDgBgGgEIgVgLIgBADQgHANgDADQgGAHgGgCQgDAAgCgEQgCgEABgEQAAgDAGgKIABgCQgvAEgrgDIAFAGQAIAIACADQADAJgFAFQgEAEgIgDQgDgBgHgHIgPgTIgEgGQgJALgHAMQgIAMgHgBQgDgBgDgDQgCgDABgEQAAgFAFgJIALgOQgqgHglgNIAGAKQAEAHABADQAAADgCAEQgCADgDABQgIACgGgGQgDgEgEgJIgIgVIgLATQgFAIgFABQgDABgDgCQgEgCgBgDQgBgFAFgKIAKgSQgcgPgYgTQgHgFgCgFQgEgHAGgFQAGgFAMAJQAXARAYANQgDgIgBgFQgBgFADgFQAEgEAFAAQAGABAEAJIAEgFQAHgHAHABQAEAAAEADQADADAAAEQABAFgGAFIgJAIIgGAJIABAEQAeANAhAIIAYAEIgFgEQgCgEAAgEQAAgFADgCQAGgGALAIQAGAEAHAHIANgOQAEgEAFgCQAIgCADAEQAFAFgEAHQgBADgHAHIgIAIQArAEAqgDQgEgGgDgHQgCgGACgEQACgEADgBQAEgCAEABQADABAFAFIAHAHIAGAEIAGgTIAHgLQAGgFAHADQAEACAAAHQAAAFgDAFIgHATQAZgEAlgIIAAgBIgIAAQgFgCgCgFQgBgEADgGQAEgEAFgCQAGgBAHAEIAIgSQAGgNAIABQAEAAADAEQACAEAAAEQgBAGgGAKIgIAQIABABIAJgCQANgVAFgPQAGgSgBgkQgCgvgIgZQgKghgmg2QgZglgUgOQgXgPgygIQghgGgQgBQgcgCgVAEQgWAFglATQgoAUgTAMQgfATgTAXIgFAGIAAAAIAGAPQABAKgGAEQgDACgEgBQgEAAgCgDIgCgFIgMAXIgJAVIABABIAMAHQAGAFAAAGQAAAJgJABQgFAAgGgEIgHgFQgKAbgDAYgAA8keIgCADIADgEIgBABgAj3lvIgRgDIgJgCQgTgIgLgOQgKgOgEgRQgFgXAKgXIAOgYQAFgJAGgGQAEgEAMgHQAJgGAHgCQAOgFARAGQAMAFAQALQAJAHAFAGIAKANQAKASADAIQADALgCASQgBAGgCAGIgFAKIgFAIQgDAGgIAHQgXAVgjAAIgHAAgAj0n+QgDABgFADIgOAHQgIAGgDAEIgJANIgGAMIgFAPQgCAKAAADQABAFACAFIAFAMIAFAFIAHAIQAFAFAEAAQAFACAKAAIAKAFQAEABAKgBQALgCAGgDQAKgDALgKQAIgIADgIQAFgKgCgSIgDgKIgGgJIgEgIIgEgFIgCgEIgDgBIgHgGQgOgLgOgEIgGgBIgCAAgAgDmBIgGgDIgJAAQgFgBgFgEIgVgRIgGgHQgCgDAAgIIAAgjIABgNIAKgPIAKgPQAFgGAGgDIAIgDIAGgEQADgCAIAAIAgAAIAOABIAKAFQAKAFgBAGQAHABAEAIIAHAKIAJAPQACAGABAVQABAKgBAFQgBAOgNAIQgMAEgFAEIgIAFQgDACgHABIgKACQgGADgEAAIgIgBIgGABQgHAEgFAAIgDgBgAgBn3IgFAFIgJACQgEACgEAGIgEAIQgDAFgDADIgDAEIgBAHIAAAhQAHADAJALIAIAFQAEABAKgDQAJgDAFABQAHADACgBIAHgCIAGAAIAGgBQAFgBAHgHQAFgCAJgDQADgBABgDIABgHIAAgSIAAgFIgCgEIgGgKIgEAEIgKAIIADACQANAHADAGQACAEgBAGQgBAFgFABQgGACgJgHIgNgKIgCAEIgLASQgHAKgIgCQgEgCgCgFQgBgFACgFQADgGAJgKIAEgIIgIgFIgGgDQgHAAgCgCQgEgCAAgFQgBgFADgEQAGgGALADQAFACALAHIAEACIAEgEQAFgFAGgEIAGgCIgHgGIgGgEQgDgCgDAAIghAAgAkGmRQgGgCgBgFQAAgEADgEIAHgIIAIgLIALgMIgJgGIgHgCQgDgBgCgCQgDgCAAgFQAAgEACgDQAEgGAJABQAFABAHAFIAMAJIAHgGQAIgHAFgCQALgCADAIQADAIgMAJIgIAHIAMAOQAJANgFAGQgCAEgGAAQgFAAgEgDIgGgHIgGgIIgEgEQgIAIgFAGQgHANgHADQgCABgEAAIgEAAg");
	this.shape_19.setTransform(50.4106,68.8944);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#CCCCCC").s().p("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AEADQAGAGAHgBQAEgBACgEQACgDgBgEQAAgDgFgHIgGgJQAlANAqAHIgKAOQgGAJAAAEQAAAEACADQACAEAEAAQAHACAHgMQAHgMAKgLIAEAFIAPATQAHAHADACQAHADAFgFQAFgFgEgIQgCgEgHgHIgGgGQArADAwgEIgBABQgGALgBADQgBAEACADQACAEAEABQAFACAGgHQADgDAHgNIACgEIAUAMQAGAEAFAAQAGABAEgFQACgGgFgHQgEgEgHgEIAkgHQgDAHAAAFQABAIAGABIgOAOQgOANgfAQQg3Adg7ASQgaAIgSAAIgHgBgAkOoRQgHACgIAFQgMAHgFAFQgGAGgFAJIgOAYQgJAXAEAXQAEARALANQALAOATAIIAIADIASACQAoACAZgWQAHgHAEgHIAEgHIAFgLQADgGAAgGQACgSgDgKQgCgJgLgRIgJgOQgFgFgKgHQgPgMgMgEQgKgDgIAAQgHAAgHACgAgaoLIgFAEIgIAEQgGACgGAHIgJAPIgKAOIgBANIAAAjQAAAIACAEIAGAGIAUARQAFAFAGAAIAIABIAHADQAFACAKgFIAGgCIAIACQADAAAGgEIALgCQAGAAAEgCIAIgGQAFgDAMgFQAMgHACgOQABgFgBgLQgBgUgDgHIgIgPIgHgJQgFgIgGgCQAAgGgJgEIgLgFIgNgBIghAAQgHAAgEABg");
	this.shape_20.setTransform(51.884,68.9203);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("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gDACgEgBQgDAAgCgDIgDgFIgMAXIgJAVIACABIALAHQAGAFAAAGQAAAJgJABQgEAAgGgEIgIgFQgJAbgDAYgAAtkeIgBADIACgEIgBABgAkFlvIgSgDIgIgCQgTgIgLgOQgLgOgEgRQgEgXAJgXIAOgYQAFgJAGgGQAFgEAMgHQAIgGAHgCQAOgFASAGQAMAFAPALQAKAHAFAGIAJANQALASACAIQADALgCASQAAAGgDAGIgFAKIgEAIQgEAGgHAHQgXAVgkAAIgGAAgAkDn+QgDABgFADIgNAHQgIAGgDAEIgKANIgGAMIgEAPQgDAKABADQAAAFADAFIAFAMIAFAFIAHAIQAEAFAFAAQAFACAJAAIAKAFQAEABALgBQALgCAGgDQAKgDAKgKQAIgIADgIQAFgKgCgSIgCgKIgGgJIgEgIIgFgFIgCgEIgDgBIgHgGQgNgLgOgEIgHgBIgCAAgAgRmBIgHgDIgIAAQgGgBgFgEIgUgRIgGgHQgCgDAAgIIAAgjIABgNIAKgPIAJgPQAGgGAGgDIAIgDIAFgEQAEgCAHAAIAhAAIANABIALAFQAJAFAAAGQAGABAFAIIAHAKIAIAPQADAGABAVQABAKgBAFQgCAOgMAIQgMAEgFAEIgIAFQgEACgGABIgLACQgGADgDAAIgIgBIgGABQgHAEgFAAIgDgBgAgQn3IgFAFIgJACQgEACgDAGIgFAIQgCAFgDADIgDAEIgBAHIAAAhQAGADAKALIAHAFQAFABAKgDQAKgDAEABQAHADACgBIAGgCIAHAAIAGgBQAEgBAIgHQAEgCAJgDQADgBACgDIABgHIAAgSIgBgFIgCgEIgGgKIgEAEIgKAIIAEACQAMAHADAGQADAEgBAGQgCAFgFABQgGACgIgHIgOgKIgCAEIgKASQgIAKgGgCQgFgCgBgFQgBgFACgFQADgGAHgKIAEgIIgGgFIgGgDQgHAAgDgCQgFgCAAgFQAAgFADgEQAGgGALADQAFACALAHIADACIAEgEQAGgFAFgEIAGgCIgGgGIgGgEQgDgCgDAAIghAAgAkUmRQgGgCgBgFQgBgEADgEIAHgIIAIgLIALgMIgJgGIgGgCQgEgBgCgCQgCgCgBgFQAAgEACgDQAFgGAJABQAEABAHAFIANAJIAGgGQAJgHAFgCQALgCADAIQADAIgMAJIgJAHIAMAOQAJANgEAGQgDAEgFAAQgFAAgEgDIgHgHIgFgIIgEgEQgJAIgFAGQgHANgGADQgDABgDAAIgEAAg");
	this.shape_21.setTransform(51.8892,68.8944);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#CCCCCC").s().p("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gEQACgDgBgEQAAgDgFgHIgFgJQAkANAqAHIgKAOQgGAJAAAEQAAAEACADQACAEAEAAQAHACAHgMQAIgMAJgLIAEAFIAPATQAHAHADACQAHADAFgFQAFgFgEgIQgCgEgHgHIgGgGQAsADAvgEIgBABQgGALgBADQgBAEACADQACAEAEABQAFACAGgHQADgDAHgNIACgEIAUAMQAGAEAFAAQAGABAEgFQACgGgFgHQgDgEgIgEIAkgHQgDAHAAAFQABAIAGABIgOAOQgOANgfAQQg3Adg7ASQgaAIgSAAIgHgBgAkNoRQgHACgIAFQgMAHgFAFQgGAGgFAJIgOAYQgJAXAEAXQAEARALANQALAOATAIIAIADIASACQAoACAZgWQAHgHAEgHIAEgHIAFgLQADgGAAgGQACgSgDgKQgCgJgLgRIgJgOQgFgFgKgHQgPgMgMgEQgKgDgIAAQgHAAgHACgAgZoLIgFAEIgIAEQgGACgGAHIgJAPIgKAOIgBANIAAAjQAAAIACAEIAGAGIAUARQAFAFAGAAIAIABIAHADQAFACAKgFIAGgCIAIACQADAAAGgEIALgCQAGAAAEgCIAIgGQAFgDAMgFQAMgHACgOQABgFgBgLQgBgUgDgHIgIgPIgHgJQgFgIgGgCQAAgGgJgEIgLgFIgNgBIghAAQgHAAgEABg");
	this.shape_22.setTransform(51.7576,68.9203);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("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nAUgTAMQgfATgTAXIgFAGIAAAAIAFAPQABAKgGAEQgDACgEgBQgDAAgCgDIgDgFIgMAXIgJAVIACABIALAHQAGAFAAAGQAAAJgJABQgEAAgGgEIgIgFQgJAbgDAYgAAvkeIgBADIACgEIgBABgAkDlvIgSgDIgIgCQgTgIgLgOQgLgOgEgRQgEgXAJgXIAOgYQAFgJAGgGQAFgEAMgHQAIgGAHgCQAOgFASAGQAMAFAPALQAKAHAFAGIAJANQALASACAIQADALgCASQAAAGgDAGIgFAKIgEAIQgEAGgHAHQgXAVgkAAIgGAAgAkBn+QgDABgFADIgNAHQgIAGgDAEIgKANIgGAMIgEAPQgDAKABADQAAAFADAFIAFAMIAFAFIAHAIQAEAFAFAAQAFACAJAAIAKAFQAEABALgBQALgCAGgDQAKgDAKgKQAIgIADgIQAFgKgCgSIgCgKIgGgJIgEgIIgFgFIgCgEIgDgBIgHgGQgNgLgOgEIgHgBIgCAAgAgPmBIgHgDIgIAAQgGgBgFgEIgUgRIgGgHQgCgDAAgIIAAgjIABgNIAKgPIAJgPQAGgGAGgDIAIgDIAFgEQAEgCAHAAIAhAAIANABIALAFQAJAFAAAGQAGABAFAIIAHAKIAIAPQADAGABAVQABAKgBAFQgCAOgMAIQgMAEgFAEIgIAFQgEACgGABIgLACQgGADgDAAIgIgBIgGABQgHAEgFAAIgDgBgAgOn3IgFAFIgJACQgEACgDAGIgFAIQgCAFgDADIgDAEIgBAHIAAAhQAGADAKALIAHAFQAFABAKgDQAKgDAEABQAHADACgBIAGgCIAHAAIAGgBQAEgBAIgHQAEgCAJgDQADgBACgDIABgHIAAgSIgBgFIgCgEIgGgKIgEAEIgKAIIAEACQAMAHADAGQADAEgBAGQgCAFgFABQgGACgIgHIgOgKIgCAEIgKASQgIAKgGgCQgFgCgBgFQgBgFACgFQADgGAHgKIAEgIIgHgFIgFgDQgHAAgDgCQgFgCAAgFQAAgFADgEQAGgGAKADQAGACALAHIADACIAEgEQAGgFAFgEIAGgCIgGgGIgGgEQgDgCgDAAIghAAgAkSmRQgGgCgBgFQgBgEADgEIAHgIIAIgLIALgMIgJgGIgGgCQgEgBgCgCQgCgCgBgFQAAgEACgDQAFgGAJABQAEABAHAFIANAJIAGgGQAJgHAFgCQALgCADAIQADAIgMAJIgJAHIAMAOQAJANgEAGQgDAEgFAAQgFAAgEgDIgHgHIgFgIIgEgEQgJAIgFAGQgHANgGADQgDABgDAAIgEAAg");
	this.shape_23.setTransform(51.6833,68.8944);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#CCCCCC").s().p("AB8KFQgggCgegOQgOgGgDgGQgEgIABgNIAIjZQACgggGgRQgMgegmgNQgWgIgugCIgqgBQgJgCgPAAQgVAAgqgEQgmgEgSgGQgRgGgQgKQgVgOgKgNQgKgOgIgXQgHgYgFgrIgKhPIgCgWQAJgFAAgLQABgIgHgNQgNgYgegdQguguh4hnQhtheg3g7QgagcgHgTQgJgYAHgfQAHgnAbgdQAagcAmgKQAngKAhAPQAgAPAaApQAYAlAZBHIAFAMIgBAcQgBAyATAqQAaA4A9ArQAtAgBKAbQAiANAUgCQAKgBATgGQAqgOAdgMQABAFAJAHIAaAZIgKAIQgLAJADAIQABAEAEACQADABAEgBQADgBAFgFIAJgGIAEgDIAxA5IgLAOQgIAKAAAGQgBAFAEAEQADADAFAAQAEgBADgDIAFgJQADgFAGgIQAcAhAQAQIAIAIIgHAIQgFAJABAEQABAFAGACQAGABAEgDIAGgIIADgEIAOANIAaAcIgGAGQgIAIgBAEQgEAHADAHQABAEAEACQADACAEgBQAEgBAEgGIAHgKIAEgFQAYAcAVAfQgggKgiABQgMABgIAEQgLAFgBAJQAAAGAEAGQAEAFAHADQAHADAUAAQArABAnAWQAnAWAXAlQAJAOANAdQAQAoAEAbQAEAggIBAQgGAugKAYQgMAegZAWQgZAWgfAKQgYAHgaAAIgOAAgAIWEYIg4gNQgKgChKgHQgzgFgegOQgPgIgIgBQgHgCgGACQgcgggogUIgBgFQAAgCAEgHIAFgQQACgLAFgEIAIgHQAFgEABgEQABgDgCgDQgCgEgDgBQgHgDgGAFIgHAHIgJAIQgDAFgCAIIgDANIgCAGIgYgfIgcghQAKgFAKAEIAIACQAJABAEgIQADgIgHgGQgEgDgHgBQgYgCgQAJIgpgtQAHgFAFgBIAKgBIAJgBQAGgDABgGQACgHgFgDQgEgDgMACIgOABQgIACgLAJIgUgUIgfgiQAKgEAQADQAGABAEgBQAGgCABgIQABgHgGgEQgFgEgRACQgYAEgFACIgCACIgsgxQALgDAJACQAIACADgBQAEgCABgFQACgIgEgFQgEgDgJgBQgUAAgSAGIgfgiIgCgCIAKgFQAZgLAUgMQAGAHAPACIAyAKQAcAFANAFQAPAFAbAQQAgASASAOQARAOAiAmIAjAqQAPAQAEACQALAKASAHQAKAEARAFQAGAEAGABQAMAEAXgEQAigHA8gZQBAgZAegHQAggHArgEQAmgEAVAIQAcAJASAcQAPAZAGAiQANBNgiBGQgRAlgZAQQgQAKgeAHQgfAGgfAAQgfAAgggGgAFkgFIgKgEQgGgCgEABIgDAAQgQgFgHgEQgOgJgWgZIglgtQgSgWgLgKQgJgHgQgKIgyggQgNgJgJgFQgOgGglgIIg1gJIAFgFIAQgPQAGADAKABIA6ALQAnAHATAGIAjAMIATAFIgDAFQgJAMgDAKQgCAGABADQABAFAGADQAFACAEgDQADgCADgGIAKgUIAFgJIAZAIIAmAPQAdAMAOAIQAXAOAMARQAJAPAGAdQAGAWgHAJQgDAEgHAFIgJAIQgFAGABAKIgLgCgAjoijQgOgCgSgJIgfgPQgigMgQgJQgVgMgegjQgagegKgSQgTglAEgwQAJgIgFgTQADgQAGgSIAIAFQAGAEAEgBQAJgBAAgIQAAgGgGgFIgLgHIgCgCIAJgVIANgXIACAFQACADADABQAEABADgCQAGgEgBgKIgFgPIAAAAIAFgHQATgWAfgUQATgMAngUQAmgTAVgEQAWgFAbACQAQACAhAFQAzAIAXAPQAUAOAaAmQAkA1AKAhQAIAaACAvQABAjgGATQgEAPgOAUIgIACIgBAAIAIgRQAGgKAAgFQABgFgDgDQgCgEgFgBQgIAAgFAMIgJATQgGgEgFABQgGABgEAFQgDAFACAEQABAGAFABIAIABIAAAAQglAIgaAFIAIgTQACgFAAgFQAAgHgEgDQgGgDgGAFIgHAMIgHATIgGgEIgHgIQgEgFgEgBQgDgBgEACQgEACgBADQgCAEACAHQACAHAFAFQgqADgsgDIAJgJQAHgHABgCQAEgIgFgFQgEgEgHACQgFADgFAEIgNAOQgGgHgGgFQgLgHgGAFQgDADgBAEQAAAFADADIAEAFIgYgFQgggHgegNIgCgFIAGgIIAKgIQAFgFAAgGQgBgDgDgDQgDgDgEgBQgHAAgIAGIgEAGQgEgJgGgBQgFgBgDAFQgDAEAAAGQABAFAEAIQgYgNgXgRQgNgJgFAEQgGAFAEAIQACAEAGAFQAZAUAcAOIgLATQgFAJACAGQABADADACQADACAEgBQAFgCAFgIIAKgSIAIAVQAEAJAEADQAGAGAHgBQAEgBACgEQACgDgBgEQAAgDgFgHIgFgJQAkANAqAHIgKAOQgGAJAAAEQAAAEACADQACAEAEAAQAHACAHgMQAIgMAJgLIAEAFIAPATQAHAHADACQAHADAFgFQAFgFgEgIQgCgEgHgHIgGgGQAsADAvgEIgBABQgGALgBADQgBAEACADQACAEAEABQAFACAGgHQADgDAHgNIACgEIAUAMQAGAEAFAAQAGABAEgFQADgGgGgHQgDgEgIgEIAlgHQgDAHAAAFQABAIAGABIgOAOQgPANgfAQQg3Adg7ASQgaAIgSAAIgHgBgAkuoRQgHACgIAFQgMAHgFAFQgGAGgFAJIgOAYQgJAXAEAXQAEARALANQALAOATAIIAIADIASACQAoACAZgWQAHgHAEgHIAEgHIAFgLQADgGAAgGQACgSgDgKQgCgJgLgRIgJgOQgFgFgKgHQgPgMgMgEQgKgDgIAAQgHAAgHACgAg6oLIgFAEIgIAEQgGACgGAHIgJAPIgKAOIgBANIAAAjQAAAIACAEIAGAGIAUARQAFAFAGAAIAIABIAHADQAFACAKgFIAHgCIAIACQADAAAGgEIAKgCQAGAAAEgCIAIgGQAFgDAMgFQAMgHACgOQABgFgBgLQgBgUgDgHIgIgPIgHgJQgFgIgGgCQAAgGgJgEIgKgFIgNgBIgiAAQgHAAgEABg");
	this.shape_24.setTransform(55.0585,68.9203);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("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gFAAgGgEIgIgFQgGASgDAQgAAMkeIgBADIADgEIgCABgAnanoIAEAKIACgFIgHgHIABACgAkmlvIgRgDIgJgCQgTgIgLgOQgKgOgEgRQgFgXAKgXIAOgYQAFgJAGgGQAEgEAMgHQAJgGAHgCQAOgFARAGQAMAFAQALQAJAHAFAGIAKANQAKASADAIQADALgCASQgBAGgCAGIgFAKIgFAIQgDAGgIAHQgXAVgjAAIgHAAgAkjn+QgDABgFADIgOAHQgIAGgDAEIgJANIgGAMIgFAPQgCAKAAADQABAFACAFIAFAMIAFAFIAHAIQAFAFAEAAQAFACAKAAIAKAFQAEABAKgBQALgCAGgDQAKgDALgKQAIgIADgIQAFgKgCgSIgDgKIgGgJIgEgIIgEgFIgCgEIgDgBIgHgGQgOgLgOgEIgGgBIgCAAgAgymBIgGgDIgJAAQgFgBgFgEIgVgRIgGgHQgCgDAAgIIAAgjIABgNIAKgPIAKgPQAFgGAGgDIAIgDIAGgEQADgCAIAAIAhAAIAOABIAJAFQAKAFgBAGQAHABAEAIIAHAKIAJAPQACAGABAVQABAKgBAFQgBAOgNAIQgMAEgFAEIgIAFQgDACgGABIgKACQgGADgEAAIgIgBIgGABQgHAEgFAAIgEgBgAgwn3IgFAFIgJACQgEACgEAGIgEAIQgDAFgDADIgDAEIgBAHIAAAhQAHADAJALIAIAFQAEABALgDQAJgDAFABQAHADACgBIAHgCIAGAAIAGgBQAEgBAHgHQAFgCAJgDQADgBABgDIABgHIAAgSIAAgFIgCgEIgGgKIgEAEIgKAIIADACQANAHADAGQACAEgBAGQgBAFgFABQgGACgJgHIgMgKIgCAEIgLASQgHAKgIgCQgEgCgCgFQgBgFACgFQADgGAJgKIADgIIgHgFIgGgDQgHAAgDgCQgEgCAAgFQgBgFADgEQAHgGALADQAFACALAHIADACIAFgEQAFgFAFgEIAGgCIgHgGIgFgEQgDgCgDAAIghAAgAk1mRQgGgCgBgFQAAgEADgEIAHgIIAIgLIAKgMIgIgGIgHgCQgDgBgCgCQgDgCAAgFQAAgEACgDQAEgGAJABQAFABAHAFIAMAJIAHgGQAIgHAFgCQALgCADAIQADAIgMAJIgJAHIANAOQAJANgFAGQgCAEgGAAQgFAAgEgDIgGgHIgGgIIgEgEQgJAIgEAGQgHANgHADQgDABgDAAIgEAAg");
	this.shape_25.setTransform(55.1345,68.8944);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},2).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_3}]},2).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_3}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_3}]},2).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_3}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_3}]},2).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_3}]},1).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_3}]},2).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_3}]},2).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_3}]},3).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_3}]},3).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_3}]},3).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_3}]},3).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_3}]},3).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_3}]},3).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_3}]},3).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_3}]},3).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_3}]},3).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_3}]},3).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_3}]},3).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_3}]},3).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_3}]},3).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_3}]},3).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_3}]},3).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_3}]},3).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_3}]},3).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_3}]},3).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_3}]},3).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_3}]},3).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_3}]},3).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_3}]},3).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_3}]},3).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_3}]},3).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_3}]},3).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_3}]},3).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_3}]},2).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_3}]},2).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_3}]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_3}]},2).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_3}]},1).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},2).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.5,0,171.8,138);


(lib.counter_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(7));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("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");
	this.shape.setTransform(142.425,17.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("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");
	this.shape_1.setTransform(139.25,17.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("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");
	this.shape_2.setTransform(142.05,17.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("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");
	this.shape_3.setTransform(142.225,18);

	this.text = new cjs.Text("4", "41px 'AdornS Condensed Sans'");
	this.text.textAlign = "center";
	this.text.lineHeight = 53;
	this.text.parent = this;
	this.text.setTransform(274.2,-5.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("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");
	this.shape_4.setTransform(118.7,15.775);

	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(-197.35,-105.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4},{t:this.text}]},1).to({state:[{t:this.instance}]},1).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-197.3,-105.9,1411.5,1231.5);


(lib.cat_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(110));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("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");
	this.shape.setTransform(88.4179,45.2927);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("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");
	this.shape_1.setTransform(90.4449,45.3648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("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");
	this.shape_2.setTransform(90.2505,43.2722);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("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");
	this.shape_3.setTransform(89.8467,43.2138);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#33CC33").s().p("ACSAsQAEgEACgQQAEgjAYgUIAQgMIgCAJQgEAXACAVQABAIABADIAEADIgOAKQgQAKgTAAIgDAAgAieAfIgPgLIgZgVQAIgMAPgFIASgDIAOAAQAMABAKAEIAJADIgBAAIgGABQgDAAgFgDQgFgDgDAAQgFABgDAGIAAALIgBAPIABAQIACAGQgLgCgGgEg");
	this.shape_4.setTransform(50.75,32.0042);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AEMHSQhbgLgvglQgygmgVhIQgFgRgEgUQAFgDADgEQAFgGgCgJQgDgJgHgEIgFgCQgCgaAAgfQAAg7ASgcQASgbAhgKQAhgKAdAOQANAHAEAKQADAIgHATQgfBLAMBAQAGAlAUAdQAWAfAfAPQAgAQA3ABQCFABBihBQA0giAigyQAjg0AJg7QAFgdgRgGQgHgDgHAEQgHADgEAHQgEAHgDAVQgEAXgJAVQggg9gzgaQgPgIgWgFQgmgIgxAKQg7AKgpAZQgQAKgPANQg3AsgqA5QgCgjARguQAMghADgNQAFgbgKgSQgOgagogJQghgIghAGQgWAEgSALIhhgKIgQgBQAIgNAFgMQAGgPAEgRQAKgEAOgNQAfgbAkgWQAPgBANAFIAIADQAEABADgCQAEgCAAgFQABgFgDgEQgEgFgLgDIAmgTQAygXAwgMQA0gMAuABQAZAAAxAGQBHAIAlAMQAkAMA1AgQBnA+AzA5QAiAmAUArQAVAvABAvQACA2gZA1QgXAygqAmQhLBFh6AYQg3AKhDACIgoAAQhCAAg2gGgAiHHXQjCgjgegEQiAgShhAIIg9AHIhZAKQgTADgLgBQgQgBgLgHQgOgJgLgYQgehEATg/QAKghAYgYQAYgaAggJIASgGQAIgEADgFQAWAIAbAHIAcAHIABAFQACAMAKAGQANAHAfgCQCAgHCOBJQBHAlAvAtQACAFAGAEIABAAQAmAnAVAsQAEAKgDAEQgDAFgIAAIgHAAgAhaGfQgTgigageQAPgLAjgVQAQgJAHgFIAMgLQAHgEAQgFQARgEANgCIAIAAQAQBgAyA1IgkAHQgVADgIgBIgcgGQgOgCgbAIQgNAEgHAGQgEgPgJgRgAEjFBQgwgOgWgjIAFgIQAUgkA4g3QAWgXAPgLQAYgRAsgOQA0gPAlAFQAUACAWAKQAQAHAKAIQAVARAQAlQAGAPAFAGIACACQgYAjgjAaQhGAyhkAMQgVACgTAAQgeAAgYgGgAi2EyQgcgVgogYQhDgng9gWQAygEAzgKQBLgQArgdQAVgOAcgcQAhgiAUgfQAuAAA5AJQgaAagKAsQgIAkACA2IACAiIgNABQgOABgbAIQgOAFgFADIgNALIgPAJIgxAfIgVAPIgRgPgAqtB9QgagJgQgLIgDgHIgOgOQgQgQgKgTIADAAQAYABALAFIAMAFQAHACAEgEQADgEgCgGQgCgGgFgEQgKgHgQgCIgdgBIgIgBQgIgbADgiIABgKIAOAJQANAJAYAWQAIAFAEgBQAFAAADgFQACgGgCgFQgEgIgLgGIg1gjIAJgoIALgwQAOg9AKgdQAMgfAjhDQAPgaAKgJQAVgTAcADQAOABAWAMQAmAWAVAhQAIANAGAGIABACQACAFAFAEQAGAFAIAAQAHAAAIgDIAPgGQAggOAwgDIBTgCQARAAAJgEQAPgIgCgNQgBgKgKgFIAFgWQAJg0AlgoIAqBIQAjA9AQAeQAaA0AQArQAZBKgGA7Ig0AcQgLAFABAHQABAFAHABQAFABAHgCQANgGAYgNQgEASgHARQgIAPgNATQgUABgSAEQgHACgFADQgGAFADAFQACAHAOgBIASgCIgHAJQgaAdgXATQgjAagyAPQgnALg4AGQg6AGg1AAQh8AAhlgjgAmUADQgOAAgHADQgEACgDAFQgDAFABAEQABAFAHAHQAGAGAIAEIANADIATAHQAMAFAHABQAJACAGgEQADgDABgEQABgEgDgCIAbgOQAKgFACgEQAHgIgGgHQgDgDgKgBIgsgBIgrABgApQhrQgOAFgKAHQgJAHgEAIQgFAKADAIQACAEAJAJIARAPQAHAHAGAEQAMAJASAGQAmALAngBQAMAAAFgDQANgHgCgVQgDgegagYQgWgTgigHQgMgCgMAAQgPAAgNAEgAi9iWQgJACgTANQghAYgKAQQgIANgLAeQgFAQAGAHIgLAFQgGAEACAEQABAEAGADQAWAKAOgBQAJAAAMgHQAqgWAYgOQAPgKAGgJQAFgIAEgRIAKgVQAGgMAAgJQAAgKgGgFQgFgEgLgCQgRgDgMAAQgNAAgIADg");
	this.shape_5.setTransform(91.736,38.7284);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("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");
	this.shape_6.setTransform(85.5857,38.8273);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#33CC33").s().p("AirBXQgVgDgJgMQgKgOAFgWIAMgkIAHgVQAEgGAIgGQAVgQATABQAPABANAKQgFACgFAEQgOAMgJAfQgNAtAEAfIgWgBgACTA5QgCgCgBgKQgBgHgGgNQgGgOgBgHQgCgQAMgfQAFgNAEgFIAJgLQAIgIAFgDQALgGAXAEQABADADACIgFAFQgFAIgEATQgIAiADARQABAIAGAQQAFAPACAIIABAGIgKAFIghABQgLAAgEgFg");
	this.shape_7.setTransform(53.4305,22.645);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("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");
	this.shape_8.setTransform(92.4074,36.1566);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("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");
	this.shape_9.setTransform(86.9404,36.1289);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#33CC33").s().p("AjEA8QACgFgHgFQgHgDgDgDQgFgFgBgOQgBgZAIgLQAHgKAPgFQAJgEAKAAQAHAAAMAFQAQAGAOAHIgEAAQgGAAgDACQgHADgEAIQgPAaACAwQgUgFgTgKgACiAeIgLgKQgHgGgGAFQABgGgCgKQgDgKAAgEQABgKAOgNQANgOAKgGIAUgLQAPgJAHAAIAEAAIgIADQgEABgEAFIgCADQgDAEAAALIAAANQAAAYACAQIACARIACAGIgFAEQgKACgHAAQgMAAgHgFg");
	this.shape_10.setTransform(54.1069,25.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("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");
	this.shape_11.setTransform(92.4074,35.3991);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("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");
	this.shape_12.setTransform(87.5593,35.4668);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#33CC33").s().p("AiVA1IgigDQgFAAgCgBIgEgFIgNgYQAGgNALgHQANgIAMACQAEABAUAJIAKAEQgFABgDAEQgEAGAAALQgBAQADAJIgIgCgACrACQgDgRALgOIAIgHIAPgSIACAFQADAHgBAMIgBALQABAEACADIgBAAIgeAOIgEABQAAAAAAAAQgBAAAAAAQAAAAAAgBQgBAAAAAAg");
	this.shape_13.setTransform(54.2125,28.3875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#333333").s().p("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");
	this.shape_14.setTransform(92.4074,36.8388);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("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");
	this.shape_15.setTransform(88.0779,36.7576);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#333333").s().p("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");
	this.shape_16.setTransform(92.4074,37.183);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("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");
	this.shape_17.setTransform(86.1225,37.1324);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},2).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},3).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},3).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},3).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},3).to({state:[{t:this.shape_17},{t:this.shape_16}]},4).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},3).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},3).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},4).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},3).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},4).to({state:[{t:this.shape_17},{t:this.shape_16}]},3).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},3).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},3).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},3).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},3).to({state:[{t:this.shape_17},{t:this.shape_16}]},4).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},3).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},3).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},4).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},3).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},3).to({state:[{t:this.shape_17},{t:this.shape_16}]},4).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},3).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},3).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},3).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},3).to({state:[{t:this.shape_17},{t:this.shape_16}]},4).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},3).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},3).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},4).to({state:[{t:this.shape_3},{t:this.shape_2}]},4).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.9,-19.5,190.1,113.3);


(lib.bell_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#999999").s().p("AFDCGQgHgEgLAAQgLgBgQADIgJACIpVgCIABgEIACgRQADgZAQgaQAKgSAXgbIARgWIAMgWQANgTAXgRQAPgKAegQQAfgQAOgEQAggKA5ACQA4ACAbgGIAWgFIAWgFQAagDAYAHQAeAIApAiQAdAZARATQAPAUAZAtQAPAcADANQAGARAAAXIgBAfIgFAAg");
	this.shape.setTransform(44.25,24.1026);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AF0DqQgEgEgBgEQgCgGAFgHQgOgGgYACQg6ADhRAHIlXAOQgSAAgHgDQgHgDgDgGQgEgGACgGQh2AAghgBQgTgBgLgEIgOADQAFAKgBAHQgBAJgIAFQgHAEgNgDQgHgCgDgCQgGgFAAgQIAAgZQAAgJACgFQADgIAIAAQAHAAgBgDIAPABIAAgFQABgPAHgEQADgCAEAAIACgCIAHAAIAAgCIALAAIACgLQAGgeALgaQAMgeAjgyIAdgpQASgXASgOQATgPAhgQIA2gbQARgJAHgBQAHgCAVABQAWABAWgBIAVAAIAAgEIAAgHIAAgHIAAgGIhngBIgJgIIgDgHIADgHIACgHIAHgFIAIAAIAAgCIBfABIAAgBIACgIIAFgHIAMgCIAFAAIAKAHIACAHIABAEIB6ABIAKAHIACAHIAAAIIgFAHIgFAFIgHACIh0gBIAAADIAAAIIAAAHIAAADIABAAQAVgCAqgGQAmgFAaAFQAfAGAiAWQAVANAkAfQAWATALANQAJAMAKATIAQAgIAQAcQAIARADANQACAKAAARIABAbIAEAYIABAEIASAAIAKAIIACAHIAAAHIAAABQACAGABAMQABAagFAMQgGAQgOAGQgGACgGAAQgIAAgIgFgAEBCuIABgCIgLAAIgLAAIAVACgAlfCrIACgBIgDAAIABABgAFECEQALAAAHAEIAFAAIABgfQAAgXgGgRQgDgNgPgcQgagtgPgUQgQgTgdgZQgpgigfgIQgXgHgaADIgWAFIgWAFQgcAGg4gCQg5gCgfAKQgOAEgfAQQgfAQgOAKQgYARgMATIgNAWIgRAWQgWAbgKASQgQAagEAZIgCARIAAAEIJVACIAIgCQAOgCALAAIADAAg");
	this.shape_1.setTransform(42.3833,23.932);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,84.8,47.9);


(lib.a_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(0,-2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.a_mc, new cjs.Rectangle(0,-2,1356,1241), null);


(lib.eyeL_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.eye1_mc = new lib.eye1_mc();
	this.eye1_mc.name = "eye1_mc";
	this.eye1_mc.setTransform(15.3,16.3,1,1,0,0,0,15.3,16.3);

	this.timeline.addTween(cjs.Tween.get(this.eye1_mc).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eyeL_mc, new cjs.Rectangle(-2,-2,34.6,36.7), null);


(lib.eye2_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.eye1_mc = new lib.eye1_mc();
	this.eye1_mc.name = "eye1_mc";
	this.eye1_mc.setTransform(15.3,16.3,1,1,0,0,0,15.3,16.3);

	this.timeline.addTween(cjs.Tween.get(this.eye1_mc).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eye2_mc, new cjs.Rectangle(-2,-2,34.6,36.7), null);


(lib.eyeR_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.eye2_mc = new lib.eye2_mc();
	this.eye2_mc.name = "eye2_mc";
	this.eye2_mc.setTransform(15.3,16.3,1,1,0,0,0,15.3,16.3);

	this.timeline.addTween(cjs.Tween.get(this.eye2_mc).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eyeR_mc, new cjs.Rectangle(-2,-2,34.6,36.7), null);


// stage content:
(lib.game = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"SONG2",startFrame:0,endFrame:1,loop:1,offset:0}];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("SONG2",0);
		this.InsertIntoSoundStreamData(soundInstance,0,1,1);
		stop();
		
		stage.enableMouseOver(30);
		var _this = this;
		
		stage.on('stagemousemove', function(e){
			
			 var radians = Math.atan2(e.localY - _this.eyeL_mc.y, e.localX - _this.eyeL_mc.x);
		 var degrees = radians * (180 / Math.PI);
		 _this.eyeL_mc.rotation = degrees - 90;
		
		});
		
		stage.enableMouseOver(30);
		var _this = this;
		
		stage.on('stagemousemove', function(e){
			
			 var radians = Math.atan2(e.localY - _this.eyeR_mc.y, e.localX - _this.eyeR_mc.x);
		 var degrees = radians * (180 / Math.PI);
		 _this.eyeR_mc.rotation = degrees - 90;
		
		});
		
		var _this = this;
		
		_this.bell_btn.on('click', function(){
			
			if (_this.SONG2)
				_this.SONG2.play();
			else
				_this.SONG2 = createjs.Sound.play("SONG2");
		});
		
		this.doll_mc.addEventListener("click", playdoll.bind(this));
		
		function playdoll(){
			this.doll_mc.play();
		}
		
		this.skull_mc.addEventListener("click", playskull.bind(this));
		
		function playskull(){
			this.skull_mc.play();
		}
		
		this.cat_mc.addEventListener("click", playcat.bind(this));
		
		function playcat(){
			this.cat_mc.play();
		}
		
		this.worm_btn.addEventListener("click", countdown.bind(this));
		this.worm2_btn.addEventListener("click", countdown.bind(this));
		this.worm3_btn.addEventListener("click", countdown.bind(this));
		this.worm4_btn.addEventListener("click", countdown.bind(this));
		this.worm5_btn.addEventListener("click", countdown.bind(this));
		
		function countdown(){
			this.counter_mc.gotoAndStop(this.counter_mc.currentFrame + 1);
		}
		
		this.worm_btn.visible = true;
		
		this.worm_btn.addEventListener("click", ClickToHide1.bind(this));
		
		function ClickToHide1(){
			this.worm_btn.visible = false;
		}
		
		this.worm2_btn.visible = true;
		
		this.worm2_btn.addEventListener("click", ClickToHide2.bind(this));
		
		function ClickToHide2(){
			this.worm2_btn.visible = false;
		}
		
		this.worm3_btn.visible = true;
		
		this.worm3_btn.addEventListener("click", ClickToHide3.bind(this));
		
		function ClickToHide3(){
			this.worm3_btn.visible = false;
		}
		
		this.worm4_btn.visible = true;
		
		this.worm4_btn.addEventListener("click", ClickToHide4.bind(this));
		
		function ClickToHide4(){
			this.worm4_btn.visible = false;
		}
		
		this.worm5_btn.visible = true;
		
		this.worm5_btn.addEventListener("click", ClickToHide5.bind(this));
		
		function ClickToHide5(){
			this.worm5_btn.visible = false;
		}
		
		this.a_mc.visible = true;
		
		this.exit_btn.visible = true;
		
		this.exit_btn.addEventListener("click", exit.bind(this));
		
		function exit(){
			this.a_mc.visible = false;
			this.exit_btn.visible = false;
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// button
	this.exit_btn = new lib.exit_btn();
	this.exit_btn.name = "exit_btn";
	this.exit_btn.setTransform(1013.1,284.3,1,1,0,0,0,21.9,22);
	new cjs.ButtonHelper(this.exit_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.exit_btn).wait(1));

	// opener
	this.a_mc = new lib.a_mc();
	this.a_mc.name = "a_mc";
	this.a_mc.setTransform(520.8,583.9,1,1,0,0,0,678,618.5);

	this.timeline.addTween(cjs.Tween.get(this.a_mc).wait(1));

	// counter
	this.counter_mc = new lib.counter_mc();
	this.counter_mc.name = "counter_mc";
	this.counter_mc.setTransform(185.55,50.5,1,1,0,0,0,142.4,17.5);

	this.timeline.addTween(cjs.Tween.get(this.counter_mc).wait(1));

	// bell
	this.bell_btn = new lib.bell_btn();
	this.bell_btn.name = "bell_btn";
	this.bell_btn.setTransform(384.35,799.5,1,1,0,0,0,42.4,23.9);
	new cjs.ButtonHelper(this.bell_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.bell_btn).wait(1));

	// table
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(293,819.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// eyes
	this.eyeR_mc = new lib.eyeR_mc();
	this.eyeR_mc.name = "eyeR_mc";
	this.eyeR_mc.setTransform(679.95,687.9,1,1,0,0,0,15.3,16.3);

	this.eyeL_mc = new lib.eyeL_mc();
	this.eyeL_mc.name = "eyeL_mc";
	this.eyeL_mc.setTransform(619.4,689.35,1,1,0,0,0,15.3,16.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.eyeL_mc},{t:this.eyeR_mc}]}).wait(1));

	// witch
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("Ao0ZQIADgJQCLn+CZoIQAIgbAJgOIAIARIAKAXQAGALAKAPIASAZQASAYAZAuIBhCtIAcAuIADADQgaAEgZAfQgUAZgIAXQgJAcAFAdIAEAWIAIAVQAFALAMALQAPAPAKAFQAKAGAWAGQAgAJARgDQAOgCATgMIAVgPIAUgRQAjgiAAg4QgBgTgEgIQgGgOgRgOQgQgNgggVIgJgGIAXgzIAghFIArhaIAhg9QATgiAGgNQALgZANgkQAEgNgBgHQgCgFgDgEIAVgFQABAIAEAOIAUA8QgBAIAHALQAQA7AQBIQAPBHAdCPQAYBrBBDeQA9DRAZByIxEAAgAAHN/QgbgggohKIgZguQg1higfgqQgagkgGgQIgHgQQA8AQBXAAQCHABBzgVQgCAEgEANQgFATgPAgIhrDVQgUAqgVAxIgIgIgAtpFFQi8gWhghdQg/g9gVhaQgVhZAdhTQAMghAagwQB6jYCqh+QDCiREhg0QB3gVCOgGQBugFCZADQC7AEBtAVQA5ALB5AiQBiAcAuAPQBPAcA6AfQBBAiBFA2QAxAnBIBCQA6A2AdAnQAqA5AHA5QAFAqgOAsQgNApgcAlQgsA6hYA4Qh5BOiNArIgFACQAOhAgChPQgCg5gMhdQgGg6gHghQgLgygSglQgLgXgagpIhChmQAoAXAcAXQAbAUAYAcIAPAQQAJAIAJADQAKAEALgFQALgFACgKQACgMgNgKIgZgQQgIgGgJgJIgQgRQg0g4hbgqQglgRiBgtQhTgegggJQhVgYhdgEQgFgHgGgEQgIgGgLABQgKAAgGAIQgCADgBAEIgfABQh/AHiBApQjMBBjgCgIgGgDQgKgCgMAKQgMAIgSAWIgNASQhDA1gpAtQgIAKAAAGQAAAIAHAFQAIAEAIgBIAFgBIgEAKIgbBEQgPAogEAVQgEAVgBAoQgCBiAEA1QAEBDANA4IgHAEQgRALggAAQgMAAgPgBgAJUtgQhGghgngMQgfgKgngHQlrhKltBAIgtAJQCIjuDij2QAvgyAggdQAtgqAqgbQAzgfA0gOQA5gPA1AHQAgAEAtAQQBMAdBCAuIAjAZIBOA7QBkBLA0AyQBOBLApBNQgNAVgrgPIkNhcQhQgbgogVQhAghgjgtQgOgTgIgEQgHgEgIABQgJABgEAGQgJANAQAUQAZAgAkAcQgeAUgjAIQgOADgEACQgLAFgBAJQgBAHAEAGQAEAFAHADQAJADASgEQAbgGAsgXIADgCIAAAJQAAAHgGAQIgZA4QgIASAAAKQAAAGADAFQADAFAFgBQAGgBACgHIACgLQABgJAIgSIARgmIAJgYIADgPQAGAKAHARIBSDFIAZA/QANAnATBXg");
	this.shape.setTransform(645.6331,682.6411);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCB500").s().p("AiJP6QgagHgMgNQgKgMgEgTQgGgZAEgSQAEgOASgYQAIgMAGgEQANgJARABIANACIADADQAHAHAIgCIADgBIAGADQANAHAVAQQAPAKAFAKQAIANgEARQgDAPgKAPQgQAVgUANQgOAJgMACIgIABQgMAAgPgFgAF0tVQhBgQgogIQhdgRiqgFQisgEh3AGQiVAHh7AXQAPgXASgnIAYgtIAKgDQAcgJA5gKQFhg7FgBJQAwAKAbAJQAgALAsAWIBLAlQAMAGAJACIAJAtQAFAZABAMIAAABQhIgWh0gdg");
	this.shape_1.setTransform(657.45,692.3662);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F3D5D5").s().p("Ai7H0Qg2gFgegMQgNgFgVgKIgggPIg9gZQgkgPgTgSIgMgKIgCgBQgOgSgSghQgSgjgIgUQgNgegCgbQgCgYAIg0IAJgvQAMhGALgkQATg5AggkQAcgfAwgZQAYgMBBgaQA7gYAzgXQBtgyA/grQBXg9AshMQAKgSAFgPIAJAPQAYAlBCAkQA6AiBBAcQAcANALAGQAVAMANAOQAOAOAQAjIAZA9QAZBAAMA0QAPBBgDA3QgCAtgOA0QgJAlgVA4QgKAcgGANQgKAWgMAQQgNAPgpAhQgkAcgNAWIgDAIIgNAGQh7A2iHAWQhQANhSAAQg0AAg1gGgABCEdIgLAIIgIAFIgJAEIgSANQgNAKgSAGQgWAHgXAAQgIAAgEACQgDABgCADQgCADABADQACAGAKABQAqAEAhgPIAfgTIAagTQAJgGADgEQACgEgBgEQAAgEgEgCQgCgCgDAAQgDAAgFADgAgWCrQgEACgFAFIgIAIIgPAPIgQAOQgLAKgCAIQgCAMAKAIQAJAHALgFIANgKIAMgJIAMgMIALgKQAJgKgBgPQgBgKgGgFQgFgDgFAAIgGAAgADil8QgOANALAiQAHAZAHAJQANATAbAJQATAFAeADQAWACALgGQAJgFADgMQADgMgDgLQgFgQgXgTQghgbgqgOQgMgEgKAAQgMAAgIAHg");
	this.shape_2.setTransform(650.8067,683.1641);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#5E3B80").s().p("AnTJtIhCgKIgCAAIAagWQATgRANgPQAMgQAIgOQAHgLABgIQACgMgHgHQgGgIgKACQgLABgFAIIgHAOQgIAVgeAbQgTASgOAKQgZASgcAJQAQgcgBgWQAAgPgIgSQgFgKgMgUIg3haQgXgjgMgYQgZgvgNg0QgLgwgEg+QgDgmAAhJQAAg1AFgaQAGgbASgvQAhhXAbgoIAHgBQAIgCAIgJIAMgPIALgLQAXgVARgaQCLhqChhKQDshtDLAEIAIAKQAJANAAASQAAAQgHAQQgIAVgeAhQgdAggPAPQgZAagYAQQgWARgpAWQh3A+h0AsIg1AVQgdANgUAPQgeAWgeAnQgcAmgQAiQgRAmgIAyQgGAggFA9IgJBwQguhmADhyQADhzAyhkQALgVgBgMQgBgJgHgGQgIgHgIADQgFACgHAKQgnBBgQBKQgVBhATB+QAIA3AQApQAOAjAkA0QAwBHAtAnQA7A0A/AKQAQACAIgEIAEACQgHALgFASIgbBbQgMgCgFAJIgDAGIgEAFIgJAEIgGAGIgHAGIgLACQgJAAgNADIgWAFIgLABQgMAAgTgDgAk2moQgNAEgUAMQghAUgRAPQgZAWgKAZQgJAWALALQAHAHARAAQA9AAAxglQAdgWAHgZQAEgQgGgOQgFgQgOgHQgHgDgJAAQgIAAgJACgAGfJEIgcgCQgZgCgMgDQgNgDgMgHQgFgCgDgEIgFgJIgDgEIgUhGIgEgLQBKgXA/giIARgKQAXgGAXgPQAVgOAbgaQBGhEAog7QAzhLANhLQAGgqAEgUIAJgmIAJgnQAHglAAhKIgBghQAKAjAGArQAFAgAGBCQAEAxABAZQABAqgEAgQgEAagKAnQgZBigcA1IgkA+QgVAlgKAbQgOAkACAjQACAmAVAaQgiAEgigNQghgNgXgaIgLgLQgHgGgGAAQgIAAgGAIQgFAGABAJQABAOAOAOIAPAPQgLAEgJAAIgWgBIgWABIgEABIgcgCgAJWCYQAUg1AEgXQAHghgBg0QgBhhgOg7QgMgxgphaQgPgkgNgSQgbglg6geIhBgeQgpgSgXgNQhKgsgXg6QgGgSgJgDQgGgCgGADIgBgEIgEgJQAfADAeAFQA6AKBaAdQB2AlBNAjIgBAHQABALANAVIAnA5QAAAHAFAKQAWA2AIAWQAPArAGAjQAGAugGA5QgEAkgNBDIgLA2IgMA2QgIAegKAVQgJATgbAmIgdAqQADgdARgwg");
	this.shape_3.setTransform(645.7091,687.0529);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("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");
	this.shape_4.setTransform(645.5927,682.5308);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// cat
	this.cat_mc = new lib.cat_mc();
	this.cat_mc.name = "cat_mc";
	this.cat_mc.setTransform(601.3,450.2,1,1,0,0,0,88.4,45.3);

	this.timeline.addTween(cjs.Tween.get(this.cat_mc).wait(1));

	// doll
	this.doll_mc = new lib.doll_mc();
	this.doll_mc.name = "doll_mc";
	this.doll_mc.setTransform(447.8,331,1,1,0,0,0,68,69);

	this.timeline.addTween(cjs.Tween.get(this.doll_mc).wait(1));

	// skull
	this.skull_mc = new lib.skull_mc();
	this.skull_mc.name = "skull_mc";
	this.skull_mc.setTransform(793.25,118.35,1,1,0,0,0,90.2,36.1);

	this.timeline.addTween(cjs.Tween.get(this.skull_mc).wait(1));

	// worms
	this.worm5_btn = new lib.worm5_btn();
	this.worm5_btn.name = "worm5_btn";
	this.worm5_btn.setTransform(506.6,120.15,1,1,0,0,0,19.2,35.9);
	new cjs.ButtonHelper(this.worm5_btn, 0, 1, 1);

	this.worm4_btn = new lib.worm4_btn();
	this.worm4_btn.name = "worm4_btn";
	this.worm4_btn.setTransform(775.55,316.7,1,1,0,0,0,10.3,46.1);
	new cjs.ButtonHelper(this.worm4_btn, 0, 1, 1);

	this.worm3_btn = new lib.worm3_btn();
	this.worm3_btn.name = "worm3_btn";
	this.worm3_btn.setTransform(755.45,461.9,1,1,0,0,0,12.8,13.8);
	new cjs.ButtonHelper(this.worm3_btn, 0, 1, 1);

	this.worm2_btn = new lib.worm2_btn();
	this.worm2_btn.name = "worm2_btn";
	this.worm2_btn.setTransform(849.4,554.15,1,1,0,0,0,13.8,34.8);
	new cjs.ButtonHelper(this.worm2_btn, 0, 1, 1);

	this.worm_btn = new lib.worm_btn();
	this.worm_btn.name = "worm_btn";
	this.worm_btn.setTransform(292.95,1007.05,1,1,0,0,0,24.4,38.4);
	new cjs.ButtonHelper(this.worm_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.worm_btn},{t:this.worm2_btn},{t:this.worm3_btn},{t:this.worm4_btn},{t:this.worm5_btn}]}).wait(1));

	// shelf
	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(-16.25,57.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// background
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#666666").s().p("EBDNAS9QhEgRiAgxQiTg5hKgrQhzhFg3hbQgzA7hTAdQhKAbhZABQg+ABhlgMQh9gPgmgCQiagJjSAmQj0Azh4AYQjXAriOADQjAACiYg/QgqgSh6hCQg/gigygVQgegMgZgIQhmgeirAIIgkACQhpAJg0ACQhbAFhCgHQgfgDgngHQgygJhAgRQiCggg1gIQh3gTiXAMQhaAHizAbQlFAyirAdQhzAThpAUQiTAbh/AcQkXA+g5AKQi/AiiVgDQhhgCimgYQi+gbhKgFQhdgGicADQi/AEg8gBIhIgDQj0gQiZhWQgTgKhhg/QhGgtgxgTQg4gUhPgIIiMgJQhFgEiQgRIhfgKQhJgHgugDQjFgKkJAjInMBJQkQAqjAACQj/ACjKg+QjqhHinijQi1iugmjdQgrj+Cbj+QBEhuBchbIgFgNQgrh3AaiDQAZiBBThhQBQhcCDg+QBfgsCLglIAKAQIANASIAMATIATATIASASIATATIASASIAZATIAfASIAlATIArASIAsANIAfAGIBEAGIDfAAMC52AAAQASAOASAOQBYBJAzBjQA1BpgEBsQgCBEgdBXQgQAygnBkIg7ChQglBcgsA5QhrCMjbA6QiHAjkOAPIiWAKIhhBsQi8DNk6E3QgwAwgqAnQhgBXhGAwQicBpiVAKIgiACQhOAAhbgZg");
	this.shape_5.setTransform(551.5885,1078.8087);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#9999CC").s().p("EBdzBQpIgIAAMi53AAAIjfAAIhEgGIgfgHIgrgMIgrgTIglgSIgfgTIgZgSIgTgTIgSgSIgTgTIgSgTIgNgSIgMgTIgLgPIgCgDIgGgTIgMgSIgGgTIgGgSIgHgTIgGgTIAAgSIgGgTIAAgSIAAgTIAAgSIgGgTIAGgTIAAgSIAAgTIAGgSIAAgTIAGgSIAHgTIAGgSIAGgTIAGgTIAMgSIAHgTIAMgSIATgTIAMgSIATgTIASgTIAGgGIANgMIAYgTIAQgLIgJgNQhIhogwiKQg1iWgnjwQhJm8gmoyQgXlRgYqkIgYqpQgOmfgCilQgW0rDR3BQC0z8Fx3JINFgUQAiBpgDBwQBzACBoA9QBoA9A8BjICamyINLABIAfBLQCTg7CjAmQCkAmBqB2QgDhPBLg8QBBg0BdgSQB6gXDmASQD0ASBtgPIAsBdQCYhBCrApQCrApBqB+QgDhCAug8QArg3BDgdQA4gYBNgIQAkgEA8gBID4gCQBXAABAABQA0ACAlACQCFAKBlAiQB4AoBYBOQBfBWAfBuQBihEB6gPQB6gQBwAqIATAHQAXidAHiIIN1gNIAOCDQBNhICVgFQBVgDCvALICQgIQBWgGA4AKQAuAHBHAbQBYAgAcAHQAwANBeANQBhANAtAMQB1AdCeBiICCBTQBMAwA4AdQA1hKCWgYIB7gTQBGgNAtgYQAzgbBBhGQBOhVAegXQB3hcDegGQAmgBCYADQB2ACBHgHIBogJQA6gCApASQAkAQAiAkQAVAXAiAxIEbGZQBTB3AlA9QBABmAmBYQBLCqAbDfQAZAjAUApQBACFgVCJQgNBQgyBtIgOAfIgBAWQggN7gvHfQhKL0ilJNQg1DBgNA/QgcCSAPByQBuAABkBLQBcBFA2BtQAtBeAVB9QAOBWAICRQAiKSgwMSQgjJKhhNWQgZDhgdB3QgnCmhIB4IgTAeQgOAWgSAXIOmAAIFbAAIBEAGIAfAGIArAMIAsATIAlATIAYASIAZATIAZASIASATIATASIAMATIANATIAMASIANATIAGASIAMATIAGASIAGATIAHASIAGATIAGATIAAASIAGATIAAASIAAATIAAASIAAATIAAATIAAASIgGATIgGASIAAATIgGASIgHATIgMASIgGATIgMATIgHASIgMATIgMASIgNATIgSASIgTATIgSATIgZASIgfATIgfASIgrATIgfAMIgZAGIgfAHIhEAGIlbAAgEgjLA5JQgQD9gSD8QgEA5gGAzIDXAAMBIhAAAQgJgkgFgnIgFgkQgKheAEiCIALjgQAQk3gqnVIglmGQgWjpgJieQgPkPACpjQACo7gYk2QgknZhwnNQAFEih3DMQhCByhnBOQhsBRh8AVQiNAYiWg4QgegLgdgOQg6A/hRAlQhgAshmgGQhlgFhbg0Qhbg1g2hWQg+hhgRiOQgLhbAFirIADhsQgVgOgWgSQhvhbguiMQgnh2ADicQACg+AKhhQgoDlggDpQgfDhgjBuQg5C1hwBiQhUBKhxAbQhxAZhtgcQhsgehVhQQhVhQgjhqQhdBFh4ARQh5AQhsgrQhsgrhNhdQhNhegVhyQgpC9glGKQgkGEgrDCQgeCGgrBeQg1B3hPBMQhaBWh5AXQiBAYhgg/QggUVhSUEg");
	this.shape_6.setTransform(606.8202,461.5679);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#77A177").s().p("AiIEzQAFgzAEg5QATj7AQj+IAOAHIAYATIAZASIAZATIASATIASASIAMATIANASIAMATIAMASIAGATIANATIAGASIAHATIAGASIAGATIAGASIAAASIAGASIAAATIAAATIAAASIAAATIAAASIAAATIgGASIgGATIAAATIgGASIgFAMIgBAHIgNASIgGATIgNASIgEANIjVAAg");
	this.shape_7.setTransform(390.95,857.8875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#3D4D69").s().p("A0wa7QjAhCgrioQhbBciBAkQiCAkh9gfQhkgZhThAQBqgUBygTQCsgdFFgyQCygbBcgHQCWgMB3ATQA1AICCAgQBBAQAxAKIgfAoQh9CZiWBBQhRAkhfACIgOAAQhVAAhPgbgEhJXAZjQiphOg0icQhhA2hyAGQhyAFhlgtQhQgkg+g+IBeAKQCQARBGAEICLAJQBPAIA4AUQAyATBGAtQBgA/ATAKQCaBWD0AQQguAWgyANQg+ARg9AAQhoAAhngvgEBCnAZGQiShLgmiLQiUCfjtAFIgZAAQArgoAwgvQE6k3C7jNIBihsICWgKQENgPCHgjQDbg6BriMQAsg6AlhcIA7ihQAnhkARgyQAchXADhDQAEhsg2hpQgyhjhZhJQgRgPgSgNIAIAAIFbAAIBEgGIAfgGIAZgGIAfgNIArgSIAfgTIAfgSIAZgTIASgTIATgSIASgTIANgSIAMgTIAMgSIAHgTIAMgSIAGgTIAMgTIAHgSIAGgTIAAgSIAGgTIAGgSIAAgTIAAgTIAAgSIAAgTIAAgSIAAgTIgGgSIAAgTIgGgSIgGgTIgHgTIgGgSIgGgTIgMgSIgGgTIgNgSIgMgTIgNgTIgMgSIgTgTIgSgSIgZgTIgZgSIgYgTIglgSIgsgTIgrgMIgfgHIhEgGIlbAAIumAAQASgXAOgWIATgdIZzAAIBEAGIAfAGIArANIArASIAlATIAZASIAZATIAZATIASASIATATIAMASIAMATIANASIAMATIAGASIANATIAGATIAGASIAGATIAHASIAGATIAAASIAGATIAAATIAAASIAAATIAAASIAAATIAAASIgGATIgGASIAAATIgHATIgGASIgMATIgGASIgNATIgGASIgMATIgNATIgMASIgTATIgSASIgTATIgYASIgfATIgDABQAQAYANAaQA5iDB0hZQB2haCKgMQCOgNCABNQCCBOAvCDQAzCOg5CtQgvCNhyCVQh5CgiwClQiCB6jOClQiFBrhVA4Qh+BRh0AmQiIAsiGgQQiRgShihVQhDBQhrCgQhyCqg5BIQjgEaj+AtQgpAHgnAAQhsAAhmg1gAg0XgQhngGhcgtQCqgIBmAeQAZAHAeANQgyAKgzAAIgfgBgEhv4gTRIAMgSIATgTIAJANIgQAMIgYASIgNANIANgTgEgsRgU0IAEgMIAMgTIAGgSIANgTIACgGIEEAAIAEgEQB8h2CFg2QCYg8CfAgQCpAiBWB8QBJikCvhSQCwhSCtAyQCsAzBoCkQAjA1ATA4IDjAAQAagaAYgUQChiGClgNQCUgMCDBYQBMAxAvBEISCAAQAfgNAggIQCPgnCMA2IAOAGIA5AAQAFAmAJAkMhIhAAAg");
	this.shape_8.setTransform(682.1042,1021.8474);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(382.8,485.5,1016.7,718.9000000000001);
// library properties:
lib.properties = {
	id: '0A46AFA59B71CD4F8C771B375AC3A47B',
	width: 1080,
	height: 1080,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_3.png?1682066054546", id:"CachedBmp_3"},
		{src:"images/CachedBmp_4.png?1682066054546", id:"CachedBmp_4"},
		{src:"images/CachedBmp_2.png?1682066054546", id:"CachedBmp_2"},
		{src:"images/game_atlas_1.png?1682066054475", id:"game_atlas_1"},
		{src:"sounds/SONG2.mp3?1682066054546", id:"SONG2"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['0A46AFA59B71CD4F8C771B375AC3A47B'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;