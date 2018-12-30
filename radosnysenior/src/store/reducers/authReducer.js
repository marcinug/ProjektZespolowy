const initState = {
    authError: null
}

const authReducer = (state = initState, action ) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGGIN_SUCCESS':
            console.log('login succes');
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
}

export default authReducer