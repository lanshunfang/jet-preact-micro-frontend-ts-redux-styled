import Context from "ojs/ojcontext";
import { ExtendGlobalProps } from "ojs/ojvcomponent";
import { Component, ComponentChild, h } from "preact";

import { Provider } from 'react-redux';
import {
  RouterProvider
} from "react-router-dom";

import { store } from '../app/store';
import { router } from "./router";
type Props = {
  appName?: string;
  userLogin?: string;
}

// @customElement("remote-jet-preact-app-root")
export default class App extends Component<ExtendGlobalProps<Props>> {
  static defaultProps: Props = {
    appName: 'App Name',
    userLogin: "john.hancock@oracle.com"
  };

  render(props: ExtendGlobalProps<Props>): ComponentChild {
    return (
      <Provider store={store}>
        <div id="appContainer" class="oj-web-applayout-page">


          <RouterProvider router={router} />

        </div>
      </Provider>
    );
  }

  componentDidMount() {
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
  }
}
