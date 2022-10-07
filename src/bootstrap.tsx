/**
 * 
 * @author Paul Lan<lanshunfang#gmail.com>
 */

import { h, render } from 'preact';
import App from './components/app';

const mount = (el: Element) => {
    render(<App />, el);
}

if (process.env.NODE_ENV === 'development') {
    const appContainerSel = 'remote-jet-preact-app';
    const devRoot = document.querySelector(appContainerSel)
    if (devRoot) {
        mount(devRoot)
    } else {
        throw new Error(`[ERROR] There should be a node matching selector "${appContainerSel}"`);
    }
}

export { mount };
