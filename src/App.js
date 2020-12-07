import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
// import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
// import Header from './components/Header';
// import Wrapper from './components/Wrapper';
// import Grap from "./components/Graph"
import "semantic-ui-css/semantic.min.css";
import DashBoard from "./Screens/DashBoard";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(39,49,66)",
    },
    secondary: {
      main: "rgb(197,208,222)",
    },
    background: {
      default: "rgb(226,231,238)",
    },
  },
});

const link = new WebSocketLink({
  uri: "wss://react.eogresources.com/graphql",
  options: { reconnect: true },
});

const client = new ApolloClient({
  link,
  uri: "https://react.eogresources.com/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <DashBoard />
      </Provider>
    </MuiThemeProvider>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
