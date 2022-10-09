import { h } from "preact";
import { lazy, Suspense } from "preact/compat";
import {
    createHashRouter
} from "react-router-dom";

const CounterLazy = lazy(() => import('./counter/counter'));

import RouterRoot from "./RouterRoot";

export const ROUTE_ABS: {
    [key in 'Home' | 'Counter' | 'Demo2']: {
        path: string;
        isRoot?: boolean;
    }
} = {
    Home: {
        path: '/',
        isRoot: true
    },
    Counter: {
        path: '/counter',
    },

    Demo2: {
        path: '/demo2',
    },
}

export const router = createHashRouter([
    {
        path: ROUTE_ABS.Home.path,
        element: <RouterRoot />,
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
        ],
    },



]);