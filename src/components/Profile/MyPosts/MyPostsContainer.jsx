import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.posts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost() {
            const action = addPostActionCreator();
            dispatch(action);
        },
        updateNewPostText(newText) {
            const action = updateNewPostTextActionCreator(newText);
            dispatch(action);
        },
    };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;