//Lib imports
import { useState } from 'react';

export default function UseToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        console.log('Saving token to sessionStorage:', userToken);
        sessionStorage.setItem('token', JSON.stringify(userToken));
        console.log('Saved token:', userToken.token);
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}
