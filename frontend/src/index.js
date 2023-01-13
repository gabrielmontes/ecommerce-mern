import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import store from './store';
import App from './App';
import Theme from './theme/theme';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
