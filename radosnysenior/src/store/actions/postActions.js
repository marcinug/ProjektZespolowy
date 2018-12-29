export const createPost = (post) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('posts').add({
            ...post, 
            "id": 2,
            "heading": "Poszukiwany informatyk",
            "type": "need",
            "description": "Potrzebna pomoc przy komputerze",
            "created": new Date(),
            "longDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "email": "lorem.ipsum@ug.pl",
            "tel": 502999222,
            "addedBy": "test_user2",
        }).then(() => {
            dispatch({ type: 'CREATE_POST', post });
        }).catch((err) => {
            dispatch({ type: 'CREATE_POST_ERROR', err});
        })
        
    }
};