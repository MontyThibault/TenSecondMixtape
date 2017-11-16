import React from 'react';

import PropTypes from 'prop-types';



export default class ReactCanvas extends React.Component {


	componentDidMount() {

		this.resize = this.canvasRender.bind(this);

		window.requestAnimationFrame(this.resize);
		window.addEventListener('resize', this.resize);

	}


	componentWillUnmount() {

		window.removeEventListener('resize', this.resize);

	}


	canvasRender() {

		if(!this.canvas) {
		
			return;
		}


		this.canvas.width = this.canvas.offsetWidth;


		this.canvasCtx.beginPath();
		this.canvasCtx.moveTo(0, this.canvas.height / 2);


		for(var x = 0; x < this.canvas.width; x += 1 / this.props.oversample) {

			var i = Math.floor(x * (this.props.max_length / this.canvas.width)),
				y = (this.props.buffer[i] + 1) / 2 * this.canvas.height;

			this.canvasCtx.lineTo(x, y);

		}

		this.canvasCtx.lineWidth = 1 / this.props.oversample;
		this.canvasCtx.stroke();

	}


	onClick(e) {

		if(!this.canvas) {
			return;
		}


		var rect = this.canvas.getBoundingClientRect();


		var e2 = Object.assign({

			relX: e.clientX - rect.left,
			relY: e.clientY - rect.top,

			width: this.canvas.width

		}, e);

	
		this.props.onClick(e2);

	}


	render() {

		return (

			<div className='canvas'>
				<canvas ref={
						(i) => {

							if(i != null) {

								this.canvas = i;
								this.canvasCtx = i.getContext('2d');

							}

						}

					}
					onClick={ this.onClick.bind(this) }>
				</canvas>

				<div 
					className='canvas-shine' 
					style={{
						visibility: this.props.showShine ? 'visible' : 'hidden'
					}}
					onClick={ this.onClick.bind(this) }
				></div>
				<div 
					className='canvas-progress' 
					style={{
						visibility: this.props.showProgress ? 'visible' : 'hidden',
						left: this.props.progress[0] * 100 + '%',
						width: this.props.progress[1] * 100 + '%'
					}}
					onClick={ this.onClick.bind(this) }
				></div>
				<div 
					className='canvas-progress light' 
					style={{
						visibility: this.props.showProgress2 ? 'visible' : 'hidden',
						left: this.props.progress2[0] * 100 + '%',
						width: this.props.progress2[1] * 100 + '%'
					}}
					onClick={ this.onClick.bind(this) }
				></div>
			</div>

		);

	}

}


ReactCanvas.propTypes = {

	buffer: PropTypes.any.isRequired,
	max_length: PropTypes.number.isRequired,

	// Similar to antialiasing. This determines how many
	// samples from the given buffer are used to draw
	// a single pixel. Necessary for a detailed semi-transparent effect.

	oversample: PropTypes.number,

	showShine: PropTypes.bool,
	progress: PropTypes.array

};


ReactCanvas.defaultProps = {

	oversample: 1,
	showShine: true,
	showProgress: true,
	showProgress2: false,

	// [start (in %), width (in %)]
	progress: [0, 0],
	progress2: [0, 0],

	onClick: () => {}

};