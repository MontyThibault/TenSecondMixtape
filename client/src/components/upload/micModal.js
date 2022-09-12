import React from 'react';

import getAudio from '../../webAudio/audioAPI.js';
import ReactCanvas from '../reusable/canvas.js';

// We use this to fix z-indexing problems with the nav bars.
import { componentWillAppendToBody } from 'react-append-to-body';




class MicModal extends React.Component {


	constructor(props) {

		super(props);


		var ctx = getAudio();

		this.MAX_LENGTH = 30 * ctx.sampleRate;


		this.state = {

			chunk: undefined,
			buffer: new Float32Array(this.MAX_LENGTH),
			bufferEndPtr: 0

		};


		if(!MediaRecorder) {

			alert('Media recording is not supported on this browser');
			return;

		}

		var URL = window.URL || window.webkitURL;



		var gum = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);

		gum({ audio: true }).then(function(localMediaStream) {

			this.localMediaStream = localMediaStream;
			


			// Use webaudio API local stream source for visualization

			this.streamSource = ctx.createMediaStreamSource(localMediaStream);
			
			this.streamProcessor = ctx.createScriptProcessor(4096, 1, 1);
			this.streamProcessor.onaudioprocess = this.onaudioprocess.bind(this);

			this.streamSource.connect(this.streamProcessor);



			// Must be connected to destination for processing to occur

			var gain = ctx.createGain();
			gain.gain.value = 0;

			this.streamProcessor.connect(gain);
			gain.connect(ctx.destination);




			this.mediaRecorder = new MediaRecorder(localMediaStream, {
				type: 'audio/webm'
			});


			// Since mediaRecorder.timesplice isn't specified, this
			// will be called once at the end.

			this.mediaRecorder.ondataavailable = function(e) {
			
			 	this.setState({
			 		chunk: e.data
			 	})

			}.bind(this);

		}.bind(this));
	}


	record() {

		if(!this.mediaRecorder || this.mediaRecorder.state == 'recording') {
			return;
		}

		this.setState({ bufferEndPtr: 0 });
		this.mediaRecorder.start();

	}


	stop() {

		if(!this.mediaRecorder || this.mediaRecorder.state == 'inactive') {
			return;
		}

		this.mediaRecorder.stop();

	}


	submit() {

		if(!this.state.chunk) {
			return;
		}

		var fileURL = URL.createObjectURL(this.state.chunk);
		this.props.generateBuffer(fileURL);

		this.close();

	}


	close() {

		this.localMediaStream.getAudioTracks()[0].stop();

		this.props.close();

	}


	onaudioprocess(audioProcessingEvent) {

		if(this.mediaRecorder.state != 'recording') {
			return;
		}


		var inputData = audioProcessingEvent.inputBuffer.getChannelData(0);


		try {

			this.state.buffer.set(inputData, this.state.bufferEndPtr);

		} catch(e) {

			this.stop();

		}


		this.setState({
			bufferEndPtr: this.state.bufferEndPtr + inputData.length
		});

	}


	render() {

		return (
			<div className='mic-modal'>
				<div>
					<i className="fa fa-times" aria-hidden="true" onClick={

						this.close.bind(this)

					}></i>

					<h3>Microphone recording</h3>

					<ReactCanvas
						buffer={ this.state.buffer }
						max_length={ this.state.bufferEndPtr }
					/>

					<div className='recording-controls'>
						<i className="fa fa-circle" aria-hidden="true" onClick={
							this.record.bind(this)
						}></i>
						<i className="fa fa-stop" aria-hidden="true" onClick={
							this.stop.bind(this)
						}></i>
						<i className="fa fa-check-circle-o" aria-hidden="true" onClick={
							this.submit.bind(this)
						}></i>
					</div>
				</div>
			</div>
		);

	}

}


MicModal = componentWillAppendToBody(MicModal);

export default MicModal;