import React, { useContext } from 'react';
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'
import Navbar from './components/Navbar';
import Login from "./components/Login";
import { ViewContext } from "./components/ViewState";
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import PostOfMe from './components/PostOfMe';
import PostOfFollow from './components/PostOfFollow';
import ApiContextProvider from "./api/ApiContext";
import { Container } from 'react-bootstrap';
import { withCookies } from "react-cookie";

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Comic Neue',
  }
})

const App = (props) => {

  const token = props.cookies.get("current-token");
  const { viewMode } = useContext(ViewContext) || '';

  const Viewer = () => {
    switch (viewMode) {
      case 'allUser':
        return <Home allPosts={props.allPosts} />
      case 'followUser':
        return <PostOfFollow />
      case 'mine':
        return <PostOfMe />
      default:
        return <PostDetail />
    }
  };

  const WindowController = () => {
    if (typeof token === 'undefined') {
      return <Login />
    }
    else {
      return <Viewer />
    }
  };

  return (
    <ApiContextProvider>
      <MuiThemeProvider theme={theme}>
        <Navbar />
        <Container>
          <WindowController />
        </Container>
      </MuiThemeProvider>
    </ApiContextProvider>
  );
}

export default withCookies(App);
