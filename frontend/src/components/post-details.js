import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as actions from '../actions';

import ReactLoading from 'react-loading';

import { arrayFromObject } from '../utils/helpers';
import APIHelper from '../utils/api-helper';
import Post from '../components/post';
import Comment from '../components/comment';
import AddComment from '../components/add-comment';

class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.fetchPostComments();
    }

    fetchPostComments() {
        const {post_id} = this.props.match.params
        APIHelper.fetchPostComments(post_id).then(comments => {
            this.props.loadComments({type: actions.LOAD_COMMENTS, comments});
        });
    }

    render() {
        const {post_id} = this.props.match.params
        const {posts, comments} = this.props
        const post = posts[post_id];

        const commentsArray = arrayFromObject(comments, 'id');
        const postComments = commentsArray.filter(c => (c.parentId === post_id));

        if (post) {
            return (
                <div id="wrapper">
                    <div id="left" className="addContainer">
                        <Post post={post} is_detail={true}/>
                        <h3>Comments</h3>
                        <ol>
                            {postComments.map((c) => (<Comment key={c.id} comment={c}/>))}
                        </ol>                
                    </div>
                    <div id="right" className="addContainer">
                        <h3>Add Comment</h3>
                        <AddComment parent_id={post_id}/>
                    </div>
                </div>
            );
        }
        return <ReactLoading type="bubbles" color="#444"/>;
    }
}

function mapStateToProps({posts, comments}) {
    return {posts, comments}
}

function mapDispatchToProps(dispatch) {
    return {
        loadComments: (comments) => dispatch(actions.loadComments(comments))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
