
import { Component, ComponentChild, h } from "preact";

import Context from "ojs/ojcontext";
import { ExtendGlobalProps } from "ojs/ojvcomponent";
import { Footer } from "./footer";
import { Header } from "./header";

import { Provider } from 'react-redux';
import {
  RouterProvider
} from "react-router-dom";

import { store } from '../app/store';
import { router } from "./router";
type Props = {
  userLogin?: string;
}

// @customElement("remote-jet-preact-app-root")
export default class App extends Component<ExtendGlobalProps<{}>> {

  render(props: ExtendGlobalProps<Props>): ComponentChild {
    return (
      <Provider store={store}>
        <div id="appContainer" class="oj-web-applayout-page">
          <Header
            userLogin={props.userLogin} 
          />

          <RouterProvider router={router} />
          
          <Footer />
        </div>
      </Provider>
    );
  }

  componentDidMount() {
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
  }
}
