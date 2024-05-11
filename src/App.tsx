import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Router from '@/router';
import { HttpClient } from './config/http-client';
import { selectIsLoggedIn, selectToken } from './redux/slices/authSlice';
import { AuthUser } from './typings/data';
import { setUser } from './redux/slices/userSlice';

const App: FC = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const token = useSelector(selectToken);

    const getUserDetails = async () => {
        try {
            if (isLoggedIn && token) {
                const res: {status: boolean; user: AuthUser} = await HttpClient.post('/me');
                // console.log(res);
                if(res.status) {
                    dispatch(setUser(res.user));
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, [isLoggedIn, token]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.getElementById('close-sidebar')?.click();
    }, [pathname]);
    return <Router />;
};

export default App;
