"use strict";

var React = require('react');



var Info = React.createClass({

	render: function(){
		return (
			<div>
				<h1>Info</h1> 
				<p>
					This app uses the following tech:

					<ul>
						<li>Information</li>
					</ul>
				</p>				
			</div>
		);
	}
	
});

module.exports = Info;