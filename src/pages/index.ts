import { lazy } from 'react';



export { AuthPage } from './auth-page/auth-page';

export const MainPage = lazy(() => import('./main-page/main-page'));
export const FeedbackPage = lazy(() => import('./feedback-page/feedback-page'));
export const CalendarPage = lazy(() => import('./calendar-page/calendar-page'));
