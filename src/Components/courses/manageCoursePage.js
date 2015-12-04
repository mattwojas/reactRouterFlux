"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');


var AuthorForm = require('../authors/authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');


var toastr = require('toastr');


var ManageCoursePage = React.createClass({
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function(transition, component){
			if (component.state.dirty && !confirm('Leave without saving?')){
				transition.abort();
			}
		}
	},
	getInitialState: function(){
		return {
			course: { id: '', title: '', watchHref: '', author: {
				id: '',
				name: ''
			}, category: '', length: ''},
			authors: AuthorStore.getAllAuthors(),
			errors: {},
			dirty: false
		};
	},
	// use willmount because calling setState in this funciton will not cause a rerender
	componentWillMount: function(){
		var courseId = this.props.params.id; // from the path '/course:id'

		if (courseId){
			this.setState({course: CourseStore.getCourseById(courseId)});
		}
	},

	setCourseState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;		
		this.state.course[field] = value;		
		return this.setState({course: this.state.course});
	},

	courseFormIsValid: function(){
		var formIsValid = true;
		this.state.errors = {}; //clear previous errors.

		/*if (this.state.course.title.length < 3){
			this.state.errors.title = 'First name must be at least 3 characters';
			formIsValid = false;
		}*/

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveCourse: function(event){
		event.preventDefault();
		if(!this.courseFormIsValid()){
			return;
		}


		var id = this.state.course.author.id || this.state.course.author;
		var authorData = AuthorStore.getAuthorById(id);
		console.log(authorData);
		var authorId = authorData.id;
		var authorName = authorData.firstName + ' ' + authorData.lastName;
		this.state.course.author = {id: authorId, name: authorName};
		this.setState({ course: this.state.course });


		if (this.state.course.id) {
			CourseActions.updateCourse(this.state.course);
		} else {
			CourseActions.createCourse(this.state.course);	
		}
		
		this.setState({dirty: false});
		toastr.success('Course Saved.');
		this.transitionTo('courses');
	},

	render: function(){
		return (	
			<CourseForm 
				course={this.state.course} 
				authors={this.state.authors} 
				onChange={this.setCourseState} 
				onSave={this.saveCourse}
				errors={this.state.errors} />
		);
	}

});

module.exports = ManageCoursePage;