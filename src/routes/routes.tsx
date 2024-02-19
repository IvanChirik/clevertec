import { LoginForm } from "@components/Forms/LoginForm/LoginForm";
import { RegistrationForm } from "@components/Forms/RegistrationForm/RegistrationForm";
import { AuthPage } from "@pages/auth-page";
import { MainPage } from "@pages/main-page";
import { Route, Routes } from "react-router-dom";
import { AUTH_PATH, ROUTER_PATHS as Paths, RESULT_PATH } from "./route-paths";
import { AuthResult } from "@components/AuthResult/AuthResult";


export const routes = (
    <Routes>
        <Route path={Paths.Main} element={<MainPage />} />
        <Route path={AUTH_PATH} element={<AuthPage />} >
            <Route path={Paths.Auth.Login} element={<LoginForm />} />
            <Route path={Paths.Auth.Registration} element={<RegistrationForm />} />
            <Route path={Paths.Auth.ConfirmEmail} element={<LoginForm />} />
            <Route path={Paths.Auth.ChangePassword} element={<RegistrationForm />} />
        </Route>
        <Route path={RESULT_PATH} element={<AuthPage />}>
            <Route
                path={Paths.Result.Registration.UserExistError}
                element={<div />} />
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
                element={<div />} />
            <Route
                path={Paths.Result.Login.Error}
                element={<div />} />
            <Route
                path={Paths.Result.PasswordRecovery.CheckEmail.ExistError}
                element={<div />} />
            <Route
                path={Paths.Result.PasswordRecovery.CheckEmail.Error}
                element={<div />} />
            <Route
                path={Paths.Result.PasswordRecovery.CheckPassword.Success}
                element={<div />} />
            <Route
                path={Paths.Result.PasswordRecovery.CheckPassword.Error}
                element={<div />} />
        </Route>
    </Routes>
)