
export const MESSAGE_RECEIVED= 'app/example/MESSAGE_RECEIVED';
export const FETCH_MESSAGE= 'app/example/FETCH_MESSAGE';

export const fetchMessage = () => ({
    type: FETCH_MESSAGE,
});

export const messageReceived = (message) => ({
    type: MESSAGE_RECEIVED,
    message,
});
