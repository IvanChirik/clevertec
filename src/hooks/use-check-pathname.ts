
import { AppDispatch, RootState } from "@redux/configure-store";
import { ROUTER_PATHS as Paths } from "@routes/route-paths";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";



export const useCheckPathname = (from: string, secondAllowPath?: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const history = useSelector((s: RootState) => s.router);
    useEffect(() => {
        if (history.location?.state instanceof Object
            && 'from' in history.location.state
            && history.location.state.from === from || secondAllowPath)
            return
        dispatch(push(Paths.Auth.Login));
    }, []);
}


