/**
 * 
 * @author Paul Lan<lanshunfang#gmail.com>
 */

import "ojs/ojdrawerlayout";
import "ojs/ojnavigationlist";

import { h } from "preact";

import {
    RouterProvider
} from "react-router-dom";

import { getRouter } from "./router";

import { useEffect } from "preact/hooks";
import { App1Props } from "../../../../micro-frontend-shared/src/typing";
import { useAppDispatch } from "../../app/hooks";
import { updateRouter } from "./moduleRouter-slice";


export default function ModuleRouter(props: App1Props) {

    const { router, ROUTE_ABS } = getRouter(props.appRouterRoot);

    const dispatch = useAppDispatch();

    useEffect(
        () => {
            dispatch(updateRouter(
                {
                    moduleRoot: props.appRouterRoot || '/',
                    ROUTE_ABS
                }
            ));
        }, 
        [
            props
        ]
    );
    
    return (

        <RouterProvider router={router} />

    );
}