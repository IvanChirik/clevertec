import { FC, PropsWithChildren, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { store } from '@redux/configure-store';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';



export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
    const history = useAppSelector(s => s.router.location?.search);
    useEffect(() => {
        if (history)
            localStorage.setItem('access_token', history.split('=')[1])
    }, []);
    const token = localStorage.getItem('access_token') || store.getState().auth.accessToken;
    if (!token)
        return <Navigate to='/auth/login' replace />;
    return children as JSX.Element;
};
