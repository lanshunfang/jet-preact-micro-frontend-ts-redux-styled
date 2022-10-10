/**
 * 
 * @author Paul Lan<lanshunfang#gmail.com>
 */

import { h, render } from 'preact';
import App from './components/app';

import { App1Props } from "../../micro-frontend-shared/src/typing";

const mount = (el: Element, containerProps?: App1Props) => {
    render(<App {...containerProps}/>, el);
}

if (process.env.NODE_ENV === 'development') {
    const appContainerSel = 'remote-jet-preact-app';
    const devRoot = document.querySelector(appContainerSel)
    if (devRoot) {
        mount(devRoot)
    } else {
        console.warn(`[WARN] There's not a node matching selector "${appContainerSel}"`);
    }
}

export { mount };
