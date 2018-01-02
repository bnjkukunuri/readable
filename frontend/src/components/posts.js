import React, {Component} from 'react';

import {connect} from 'react-redux';

import {getSortedPostsArray} from '../utils/helpers';
import Post from '../components/post';
import AddPost from '../components/add-post';
import SortButtons from '../components/sort-buttons';

class Posts extends Component {

    render() {
        const {posts} = this.props
        const {sorting} = this.props.preferences;
        const postsArray = getSortedPostsArray(posts, sorting);
        return (
            <div id="wrapper">
                <div id="left" className="addContainer">
                    <h3>All Posts</h3>
                    <SortButtons/>
                    <ol>
                    {postsArray.map((p) => (<Post key={p.id} post={p}/>))}
                    </ol>                
                </div>
                <div id="right" className="addContainer">
                    <h3>Add New Post</h3>
                    <AddPost/>
                </div>
            </div>       
        )
    }
}

function mapStateToProps({posts, preferences}) {
    return {posts, preferences}
}

export default connect(mapStateToProps)(Posts);
