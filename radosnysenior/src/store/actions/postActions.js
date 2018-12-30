export const createPost = (post) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('posts').add({
            ...post,  
            //"id": ,
            // "heading": "Poszukiwany tester",
            // "type": "need",
            // "description": "Potrzebna tester oprogramowania",
            "created": new Date(),
            // "longDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            // "email": "lorem.ipsum@ug.pl",
            // "tel": 70088012,
            "addedBy": "test_user",
        }).then(() => {
            dispatch({ type: 'CREATE_POST', post });
        }).catch((err) => {
            dispatch({ type: 'CREATE_POST_ERROR', err});
        })
        
    }
};