import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { store } from '@redux/configure-store';



export const RequireNotAuthState: FC<PropsWithChildren> = ({ children }) => {
    const token = localStorage.getItem('access_token') || store.getState().auth.accessToken;
    if (token)
        return <Navigate to='/main' replace />;
    return children as JSX.Element;
};
