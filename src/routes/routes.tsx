import { LoginForm } from "@components/Forms/LoginForm/LoginForm";
import { RegistrationForm } from "@components/Forms/RegistrationForm/RegistrationForm";
import { AuthPage } from "@pages/auth-page";
import { MainPage } from "@pages/main-page";
import { Route, Routes } from "react-router-dom";
import { AUTH_PATH, ROUTER_PATHS as Paths, RESULT_PATH } from "./route-paths";
import { AuthResult } from "@components/AuthResult/AuthResult";
import { ChangePassword } from "@components/Forms/ChangePassword/ChangePassword";



export const routes = (
    <Routes>
        <Route path={Paths.Main} element={<MainPage />} />
        <Route path={AUTH_PATH} element={<AuthPage />} >
            <Route path={Paths.Auth.Login} element={<LoginForm />} />
            <Route path={Paths.Auth.Registration} element={<RegistrationForm />} />
            <Route path={Paths.Auth.ConfirmEmail} element={<LoginForm />} />
            <Route path={Paths.Auth.ChangePassword} element={<ChangePassword />} />
        </Route>
        <Route path={RESULT_PATH} element={<AuthPage />}>
            <Route
                path={Paths.Result.Registration.UserExistError}
                element={<AuthResult
                    status='error'
                    title='Данные не сохранились'
                    subTitle='Такой e-mail уже записан в системе. Попробуйте зарегестрироваться по другому e-mail.'
                    buttonTitle="Повторить"
                />} />
            <Route
                path={Paths.Result.Registration.Error}
                element={<AuthResult
                    status='error'
                    title='Данные не сохранились'
                    subTitle='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'
                    buttonTitle="Повторить"
                />} />
            <Route
                path={Paths.Result.Registration.Success}
                element={<AuthResult
                    status='success'
                    title='Регистрация успешна'
                    subTitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
                    buttonTitle="Войти"
                />} />
            <Route
                path={Paths.Result.Login.Error}
                element={<AuthResult
                    status='warning'
                    title='Вход не выполнен'
                    subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                    buttonTitle="Повторить"
                />} />
            <Route
                path={Paths.Result.PasswordRecovery.CheckEmail.ExistError}
                element={<AuthResult
                    status='error'
                    title='Такой e-mail не зарегестрирован'
                    subTitle='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'
                    buttonTitle="Попробовать снова"
                />} />
            <Route
                path={Paths.Result.PasswordRecovery.CheckEmail.Error}
                element={<AuthResult
                    status='500'
                    title='Что-то пошло не так.'
                    subTitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
                    buttonTitle="Назад"
                />} />
            <Route
                path={Paths.Result.PasswordRecovery.CheckPassword.Success}
                element={<AuthResult
                    status='success'
                    title='Пароль успешно изменён.'
                    subTitle='Теперь можно войти в аккаунт используя свой логин и новый пароль.'
                    buttonTitle="Вход"
                />} />
            <Route
                path={Paths.Result.PasswordRecovery.CheckPassword.Error}
                element={<AuthResult
                    status='error'
                    title='Данные не сохранились.'
                    subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                    buttonTitle="Повторить"
                />} />
        </Route>
    </Routes>
)