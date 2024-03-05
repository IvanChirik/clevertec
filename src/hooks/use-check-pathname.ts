
import { ROUTER_PATHS as Paths } from "@routes/route-paths";
import { useEffect } from "react";
import { push } from "redux-first-history";
import { useAppDispatch, useAppSelector } from "./typed-react-redux-hooks";



export const useCheckPathname = (from: string, secondAllowPath?: string) => {
    const dispatch = useAppDispatch();
    const history = useAppSelector(s => s.router);
    useEffect(() => {
        if (history.location?.state instanceof Object
            && 'from' in history.location.state
            && history.location.state.from === from || secondAllowPath)
            return
        dispatch(push(Paths.Auth.Login));
    }, []);
}


