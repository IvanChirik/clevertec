import { LoginForm } from "@components/Forms/Auth/LoginForm/LoginForm";
import { RegistrationForm } from "@components/Forms/Auth/RegistrationForm/RegistrationForm";
import { Navigate, Route, Routes } from "react-router-dom";
import { AUTH_PATH, ROUTER_PATHS as Paths, RESULT_PATH } from "./route-paths";
import { AuthResult } from "@components/Results/AuthResult/AuthResult";
import { ChangePassword } from "@components/Forms/Auth/ChangePassword/ChangePassword";
import { ConfirmEmail } from "@components/Forms/Auth/ConfirmEmail/ConfirmEmail";
import { MainPage, AuthPage, FeedbackPage } from "@pages/index";
import { MainLayout } from "@components/Layout";


export const routes = (
    <Routes>
        <Route path={'/'} element={<MainLayout />}>
            <Route index element={<Navigate to={Paths.Main}></Navigate>} />
            <Route path={Paths.Main} element={<MainPage />} />
            <Route path={Paths.Feedbacks} element={<FeedbackPage />} />
        </Route>


        <Route path={AUTH_PATH} element={<AuthPage />} >
            <Route index element={<Navigate to={Paths.Auth.Login}></Navigate>} />
            <Route path={Paths.Auth.Login} element={<LoginForm />} />
            <Route path={Paths.Auth.Registration} element={<RegistrationForm />} />
            <Route path={Paths.Auth.ConfirmEmail} element={<ConfirmEmail pathFrom={Paths.Auth.Login} />} />
            <Route path={Paths.Auth.ChangePassword} element={<ChangePassword pathFrom={Paths.Auth.ConfirmEmail} />} />
            <Route path="*" element={<Navigate to={Paths.Main} replace />} />
        </Route>


        <Route path={RESULT_PATH} element={<AuthPage />}>
            <Route
                path={Paths.Result.Registration.UserExistError}
                element={<AuthResult
                    dataTest='registration-back-button'
                    status='error'
                    title='Данные не сохранились'
                    subTitle='Такой e-mail уже записан в системе. Попробуйте зарегестрироваться по другому e-mail.'
                    buttonTitle="Повторить"
                    pathFrom={Paths.Auth.Registration}
                />} />
            <Route
                path={Paths.Result.Registration.Error}
                element={<AuthResult
                    dataTest='registration-retry-button'
                    status='error'
                    title='Данные не сохранились'
                    subTitle='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'
                    buttonTitle="Повторить"
                    pathFrom={Paths.Auth.Registration}
                />} />
            <Route
                path={Paths.Result.Registration.Success}
                element={<AuthResult
                    dataTest='registration-enter-button'
                    status='success'
                    title='Регистрация успешна'
                    subTitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
                    buttonTitle="Войти"
                    pathFrom={Paths.Auth.Registration}
                    pathTo={Paths.Auth.Login}
                />} />
            <Route
                path={Paths.Result.Login.Error}
                element={<AuthResult
                    dataTest='login-retry-button'
                    status='warning'
                    title='Вход не выполнен'
                    subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                    buttonTitle="Повторить"
                    pathFrom={Paths.Auth.Login}
                />} />
            <Route
                path={Paths.Result.PasswordRecovery.CheckEmail.ExistError}
                element={<AuthResult
                    dataTest='check-retry-button'
                    status='error'
                    title='Такой e-mail не зарегестрирован'
                    subTitle='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'
                    buttonTitle="Попробовать снова"
                    pathFrom={Paths.Auth.Login}
                />} />
            <Route
                path={Paths.Result.PasswordRecovery.CheckEmail.Error}
                element={<AuthResult
                    dataTest='check-back-button'
                    status='500'
                    title='Что-то пошло не так.'
                    subTitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
                    buttonTitle="Назад"
                    pathFrom={Paths.Auth.Login}
                />} />
            <Route
                path={Paths.Result.PasswordRecovery.CheckPassword.Success}
                element={<AuthResult
                    dataTest='change-entry-button'
                    status='success'
                    title='Пароль успешно изменён.'
                    subTitle='Теперь можно войти в аккаунт используя свой логин и новый пароль.'
                    buttonTitle="Вход"
                    pathFrom={Paths.Auth.ChangePassword}
                    pathTo={Paths.Auth.Login}
                />} />
            <Route
                path={Paths.Result.PasswordRecovery.CheckPassword.Error}
                element={<AuthResult
                    dataTest='change-retry-button'
                    status='error'
                    title='Данные не сохранились.'
                    subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                    buttonTitle="Повторить"
                    pathFrom={Paths.Auth.ChangePassword}
                />} />
        </Route>
        <Route path="*" element={<Navigate to={Paths.Main} replace />} />
    </Routes>
)