import Context from "ojs/ojcontext";
import { Component, ComponentChild, h } from "preact";
import { App1Props } from "../../../micro-frontend-shared/src/typing";

import { Provider } from 'react-redux';
import {
  RouterProvider
} from "react-router-dom";

import { store } from '../app/store';
import { router } from "./router";


// @customElement("remote-jet-preact-app-root")
export default class App extends Component<App1Props> {
  static defaultProps: App1Props = {
    appName: 'App Name',
  };

  render(props: App1Props): ComponentChild {
    return (
      <Provider store={store}>
        <div id="appContainer" class="oj-web-applayout-page">
          <h2>{props.appName}</h2>

          <RouterProvider router={router} />

        </div>
      </Provider>
    );
  }

  componentDidMount() {
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
  }
}
