export default function getAudio() {

	if(!window.audioCtx) {

		var AudioContext = window.AudioContext || window.webkitAudioContext;
		window.audioCtx = new AudioContext();

	}

	return window.audioCtx;

};