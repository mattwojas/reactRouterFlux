"use strict";
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');
var TimeAgo = require('../react-components/js/timeago.jsx');

InitializeActions.initApp();

Router.run(routes, function(Handler){
	React.render(<Handler/>, document.getElementById('app'));
	React.render(<TimeAgo time={new Date()} />, document.getElementById('time'));
});


