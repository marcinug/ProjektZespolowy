const initState = {
    // posts: [
    //   {
    //     id: 1,
    //     heading: "Poszukiwany ogrodnik",
    //     type: "need",
    //     description: "Poszukuję osoby do podlewania ogrodu",
    //     created: "2018-11-06T17:00:00Z",
    //     longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     email: "lorem.ipsum@ug.pl",
    //     tel: "555777999",
    //     addedBy: "test_user1",
    //   },
    //   {
    //     id: 2,
    //     heading: "Poszukiwany informatyk",
    //     type: "need",
    //     description: "Potrzebna pomoc przy komputerze",
    //     created: "2018-11-06T17:00:00Z",
    //     longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     email: "lorem.ipsum@ug.pl",
    //     tel: "555777999",
    //     addedBy: "test_user2",
    //   }
    // ]
  }
  
  const postReducer = (state = initState, action) => {
    switch (action.type) {
      case 'CREATE_POST':
        console.log('created project', action.project);
      case 'CREATE_POST_SUCCESS':
        console.log('create post success');
        return state;
      case 'CREATE_POST_ERROR':
        console.log('create prost error');
        return state;
      default:
        return state;
    }
  };
  
  export default postReducer;