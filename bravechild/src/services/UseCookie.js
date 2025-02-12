////Lib imports
//import { useState } from 'react';
//import Cookies from 'js-cookie';

//export default function UseCookie() {
//    const getToken = () => {
//        return Cookies.get('token');
//    };

//    const [token, setToken] = useState(getToken());

//    const saveToken = userToken => {
//        Cookies.set('token', userToken.token, { expires: 7 });
//        setToken(userToken.token);
//    };

//    return {
//        setToken: saveToken,
//        token
//    };
//}