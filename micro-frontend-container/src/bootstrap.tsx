/**
 * 
 * @author Paul Lan<lanshunfang#gmail.com>
 */

import { h, render } from 'preact';
// import { remoteJetPreactBootstrap } from 'remoteJetPreact';
import App from './components/App';


// (() => {
//     const define = window.customElements.define.bind(window.customElements);
//     window.customElements.define = (eleName, ele) => {
//         if (!customElements.get(eleName)) {
//             define(eleName, ele);
//         }
//     }
// })();

function safeDecorator(fn) {
    // eslint-disable-next-line func-names
    return function (...args) {
        try {
            return fn.apply(this, args);
        } catch (error) {
            if (
                error instanceof DOMException &&
                error.message.includes('has already been used with this registry')
            ) {
                return false;
            }

            throw error;
        }
    };
}

customElements.define = safeDecorator(customElements.define);

// container
const mountContainer = (el: Element) => {
    render(<App />, el);
}

const appContainerSel = 'jet-preact-container';
const containerRoot = document.querySelector(appContainerSel)
if (containerRoot) {
    mountContainer(containerRoot)
} else {
    throw new Error(`[ERROR][Container] There should be a node matching selector "${appContainerSel}"`);
}

// remote
const mountRemote = async (el: Element) => {
    // @ts-ignore
    const remoteJetPreactBootstrap = import('remoteJetPreact/remoteJetPreactBootstrap');

    const bootstrapRemote = await remoteJetPreactBootstrap;
    // debugger
    // @ts-ignore
    bootstrapRemote.mount(el)
}
const appRemoteSel = 'remote-jet-preact-app';
const appRemoteRoot = document.querySelector(appRemoteSel)
if (appRemoteRoot) {
    // mountRemote(appRemoteRoot)
} else {
    throw new Error(`[ERROR][Remote] There should be a node matching selector "${appContainerSel}"`);
}

export default { };

