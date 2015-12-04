"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var CourseList = require('./courseList');

var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var AuthorList = require('../authors/authorList');


var Courses = React.createClass({

	getInitialState: function(){
		return {
			courses: CourseStore.getAllCourses(),
			authors: AuthorStore.getAllAuthors()
		};
	},

	componentWillMount: function() {
		CourseStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		CourseStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		//debugger;
		this.setState({ courses: CourseStore.getAllCourses() });
	},

	render: function(){
		return (
			<div>
				<h1>Courses</h1>
				<Link to="addCourse" className="btn btn-default">Add Courses</Link>
				<CourseList courses={this.state.courses} />				

			</div>
		);
	}
});

module.exports = Courses;