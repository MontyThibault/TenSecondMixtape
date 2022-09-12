import React from 'react';

import { Link } from 'react-router-dom';


export class Header extends React.Component {


	constructor(props) {

		super(props);


		this.nav = (
			<nav>
				<hgroup>
					<Link to='/'><h1>TenSecondMixtape.com</h1></Link>
					<h2>Crowdsourced audio listening platform.</h2>
				</hgroup>
			</nav>
		);

		this.banner = (
			<div className='headers'>
				<hgroup>
					<Link to='/'><h1>TenSecondMixtape.com</h1></Link>
					<h2>Crowdsourced audio listening platform.</h2>
				</hgroup>
			</div>
		);


		this.state = {
			showNav: false,
			showBanner: true
		};

	}


	updateNav(scrollTop) {

		this.setState({
			showNav: scrollTop > 230
		});

	}


	updateBanner(scrollTop) {

		this.setState({
			showBanner: scrollTop < 360
		});

	}


	componentDidMount() {

		window.addEventListener('scroll', function(e) {
			
			const scrollTop = window.pageYOffset;

			this.updateNav(scrollTop);
			this.updateBanner(scrollTop);

		}.bind(this));

	}


	render() {

		return (

			<div>
				{ this.state.showNav ? this.nav : '' }
				{ this.state.showBanner ? this.banner : '' }
			</div>

		);
	}
};


export const About = () => (

	<div className='about'>
		<h3>About</h3>

		<div className='about-columns'>
			<div className='column'>TenSecondMixtape is an online radio station, where users submit 10-second clips of content.</div>
			<div className='column'>Listen in, or submit your own clips via your filesystem, YouTube, or microphone.</div>
		</div>

	</div>  

);


export const Footer = () => (

	<footer>

		<div>

			<span>Links</span>

			<ol>
				<li><a href="">Github Source</a></li>
				<li>Reddit</li>
			</ol>

		</div>

		<hr/>

		<div className='footer-columns'>
			<div className='cpr'>&copy;2017 Monty Thibault.</div>
			<div className='served'>Served at 14:29:05 2017/09/24</div>
		</div>

	</footer>

);