import profileReducer, { addPost } from './profileReducer';

const state = {
    posts: [
        { id: 1, message: 'Hi! Like this post!', likesCount: '25' },
        { id: 2, message: 'Hello, friends!!!', likesCount: '12' },
        { id: 3, message: 'My first post! :)', likesCount: '10' },
    ],
};

describe('add new post', () => {
    test('new post should be added', () => {
        const action = addPost('newPost');
    
        const newState = profileReducer(state, action);
        
        expect(newState.posts.length).toBe(4);
    });
    
    test('new post message should be correct', () => {
        const action = addPost('newPost');
    
        const newState = profileReducer(state, action);
        
        expect(newState.posts[3].message).toBe('newPost');
    });
    
    test('new post likes count should be correct', () => {
        const action = addPost('newPost');
    
        const newState = profileReducer(state, action);
        
        expect(newState.posts[3].likesCount).toBe('0');
    });
});