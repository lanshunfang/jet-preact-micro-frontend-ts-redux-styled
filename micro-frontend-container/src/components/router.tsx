import { h } from "preact";
import { lazy, Suspense } from "preact/compat";
import {
    createHashRouter
} from "react-router-dom";

const ContainerHeaderLazy = lazy(() => import('./container-header/ContainerHeader'));

import RouterRoot from "./RouterRoot";

export const ROUTE_ABS: {
    [key in 'Home' | 'ContainerHeader']: {
        path: string;
        isRoot?: boolean;
    }
} = {
    Home: {
        path: '/',
        isRoot: true
    },
    ContainerHeader: {
        path: '/container-header',
    },

}

export const router = createHashRouter([
    {
        path: ROUTE_ABS.Home.path,
        element: <RouterRoot />,
        children: [
            {
                path: ROUTE_ABS.ContainerHeader.path,
                element: <Suspense fallback={<div>...</div>}>
                    <ContainerHeaderLazy />
                </Suspense>,
            },
        ],
    },



]);