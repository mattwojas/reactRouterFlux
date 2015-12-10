"use strict";

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var TodoList = React.createClass({
  getInitialState: function() {
    return {items: ['hello', 'world', 'click', 'me']};
  },
  handleAdd: function() {
    var loginInput = React.findDOMNode(this.refs.login);
    var newItems = this.state.items.concat(loginInput.value);  
    this.setState({items: newItems});
    loginInput.value = '';
  },
  handleRemove: function(i) {
    var newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  },
  render: function() {
    var items = this.state.items.map(function(item, i) {
      return (
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      );
    }.bind(this));   
    return (    	
      <div>
      <form onSubmit={this.handleAdd}>
        <input placeholder="Add Item" /*onKeyUp={this.handleAdd}*/ ref="login" />
        <button>Add</button>    
      </form> 
        <div className="redness"> 
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {items}
        </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
});

module.exports = TodoList;