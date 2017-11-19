import getAudio from './audioAPI';


export default class WebAudioPlayer {

	constructor(buffer) {

		this.ctx = getAudio();

		this.buffer = buffer;

		this.lastTime = 0;
		this.playOffset = 0;


		this.onProgress = () => {};
		this.onEnd = () => {};


		this.playing = false;


		this.gain = this.ctx.createGain();
		this.gain.connect(this.ctx.destination);

	}


	playChange(isPlaying, length) {


		if(isPlaying) {

			this.playing = true;

			
			this.source = this.ctx.createBufferSource();
			this.source.buffer = this.buffer;
			

			// This will be called only when the clip reaches
			// the end of playback (no pause functionality)

			this.source.onended = function() {

				clearInterval(this.playOffsetTimeout);
				this.playOffset = 0;
				this.playing = false;

				this.onEnd();

			}.bind(this);



			this.source.connect(this.gain);

			this.source.start(
				this.ctx.currentTime, 
				this.playOffset, 
				length);

			this.lastTime = this.ctx.currentTime;

			
			this.playOffsetTimeout = setInterval(function() {

				this.playOffset += this.ctx.currentTime - this.lastTime;
				this.lastTime = this.ctx.currentTime;

				this.onProgress(this.playOffset, this.buffer.duration);

			}.bind(this), 1 / 25);


		} else {

			if(!this.source) {
				return;
			}

			this.playing = false;

			this.source.onended = () => {};

			this.source.stop();

			clearInterval(this.playOffsetTimeout);

		}

	}


	volumeChange(volume) {

		this.gain.gain.value = volume;

	}


	scrub(relTime, length) {

		// relTime is in [0, 1]
		// Transform it into seconds

		relTime *= this.buffer.duration;


		if(this.playing) {

			this.playChange(false);

			this.playOffset = relTime;

			this.playChange(true, length);

		} else {

			this.playOffset = relTime;
			this.onProgress(this.playOffset, this.buffer.duration);

		}

	}

}