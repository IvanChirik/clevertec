import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history, store } from '@redux/configure-store';
import { AuthPage, MainPage } from './pages';

import 'normalize.css';
import './index.scss';
import { LoginForm } from '@components/Forms/LoginForm/LoginForm';
import { RegistrationForm } from '@components/Forms/RegistrationForm/RegistrationForm';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/auth' element={<AuthPage />} >
                        <Route path='/auth/login' element={<LoginForm />} />
                        <Route path='/auth/registration' element={<RegistrationForm />} />
                    </Route>
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
