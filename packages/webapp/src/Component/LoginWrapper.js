import { UserContext } from "../Context/UserContext"
import React, {useContext} from 'react';
import Login from '../pages/Login';
import {Redirect} from 'react-router-dom';

const LoginWrapper = ( ) =>{
        const [user, setUser] = useContext(UserContext);

        return user.login ? <Redirect to='/Seller'/> : <Login setUser={setUser}/>
}

export default LoginWrapper;