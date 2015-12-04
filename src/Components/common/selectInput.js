"use strict";

var React = require('react');

var SelectInput = React.createClass({

	propTypes: {
		name: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,		
		onChange: React.PropTypes.func.isRequired,
		data: React.PropTypes.array.isRequired,
		dataKey: React.PropTypes.string.isRequired,
		selectedItem: React.PropTypes.string,
		firstItem: React.PropTypes.string,
		error: React.PropTypes.string
	},
	
	render: function(){
		
		var generateOption = function(item) {
			var key = item[this.props.dataKey],
				valueF = item[this.props.dataValueF],
				valueL = item[this.props.dataValueL];
			return (
				<option key={key} value={key}>{valueF} {valueL}</option>
			);
		};

		var wrapperClass = 'form-group';
		if (this.props.error && this.props.error.length > 0){
			wrapperClass += " " + 'has-error';
		}	

		return (
			<div className={wrapperClass}>			
			<label htmlFor={this.props.label}>{this.props.label}</label>
			<div className="field">

			<select name={this.props.name}				
				value={this.props.selectedItem}
				className="form-control"
				onChange={this.props.onChange}>
				{this.props.data.map(generateOption, this)}
			</select>
				<div className="input">{this.props.error}</div>
				</div>
			</div>
		);
	}
});

module.exports = SelectInput;