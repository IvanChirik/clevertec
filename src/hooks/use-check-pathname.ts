
import { AppDispatch, RootState } from "@redux/configure-store";
import { ROUTER_PATHS as Paths } from "@routes/route-paths";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { push } from "redux-first-history";



export const useCheckPathname = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { pathname } = useLocation();
    const history = useSelector((s: RootState) => s.router);
    useEffect(() => {
        if (history.location?.state instanceof Object && 'from' in history.location.state && history.location.state.from !== pathname)
            return
        dispatch(push(Paths.Auth.Login));
    }, []);
}


