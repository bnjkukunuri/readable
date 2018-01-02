import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import NavBar from './components/nav-bar';
import Posts from './components/posts';
import Categories from './components/categories';
import PostDetails from './components/post-details';

import APIHelper from './utils/api-helper';
import * as actions from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchPosts();
    this.fetchCategories();
  }
  
  fetchPosts() {
    APIHelper.fetchPosts().then(posts => {
      this.props.loadPosts({type: actions.LOAD_POSTS, posts});
    });
  }

  fetchCategories() {
    APIHelper.fetchCategories().then(categories => {
      this.props.loadCategories({type: actions.LOAD_CATEGORIES, categories});
    });
  }
  
  render() {
    return (      
      <div className="App" id="wrapper">
        <div id="containerLeft">
          <NavBar/>
        </div>       
        <div className="container" id="containerRight">        
          <Switch>
            <Route exact path='/' component={Posts}/>
            <Route exact path='/:category_name' component={Categories}/>
            <Route exact path='/:category_name/:post_id' component={PostDetails}/>
          </Switch>
        </div>
      </div>
    );
  }
}

function mapStateToProps({posts, categories, preferences}) {
  return {posts, categories, preferences}
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: (posts) => dispatch(actions.loadPosts(posts)),
    loadCategories: (categories) => dispatch(actions.loadCategories(categories))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
