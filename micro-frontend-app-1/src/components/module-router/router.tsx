import { h } from "preact";
import { lazy, Suspense } from "preact/compat";
import {
    createHashRouter
} from "react-router-dom";

const CounterLazy = lazy(() => import('../counter/counter'));

import ModuleRouterRoot from "./ModuleRouterRoot";

export const getRouter = (root = '') => {

    const ROUTE_ABS = {
        Home: {
            path: `${root}/`,
            isRoot: true
        },
        Counter: {
            path: `${root}/counter`,
        },

        Demo2: {
            path: `${root}/demo2`,
        },
    }

    const router = createHashRouter([
        {
            path: ROUTE_ABS.Home.path,
            element: <ModuleRouterRoot />,
            children: [
                {
                    path: ROUTE_ABS.Counter.path,
                    element: <Suspense fallback={<div>...</div>}>
                        <CounterLazy name="Preact Function Component for Oracle JET, with Redux/Styled-Component." />
                    </Suspense>,
                },

                {
                    path: ROUTE_ABS.Demo2.path,
                    element: <div>Demo 2</div>,
                },
                //    <remote-jet-preact-app></remote-jet-preact-app>
            ],
        },



    ]);

    return {
        ROUTE_ABS,
        router
    }
}
