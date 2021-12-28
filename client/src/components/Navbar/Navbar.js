import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import * as actionType from '../../constants/actionTypes';
import './style.css';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className="appBar" position="static" color="inherit">
            <div className='row'>
                <div className='col-sm-12 col-md-6'>
                    <div className="brandContainer">
                        <Typography component={Link} to="/" className="heading" variant="h2" align="center">Musafirs</Typography>
                        {/* image */}
                    </div>
                </div>
                <div className='col-sm-12 col-md-6'>
                    <Toolbar className="toolbar">
                        {user?.result ? (
                            <div className="profile">
                                <Avatar style={{ backgroundColor: indigo[500] }} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                                <Typography className="userName" variant="h6">{user?.result.name}</Typography>
                                <Button className='signOut' variant="contained" color="secondary" onClick={logout}>Logout</Button>
                            </div>
                        ) : (
                            <Button className='signIn' component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                        )}
                    </Toolbar>
                </div>
            </div>
        </AppBar>
    );
};

export default Navbar;