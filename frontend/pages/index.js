import React from "react";
import App from "./App";
import axios from "axios";
import { CookiesProvider } from "react-cookie";
import ViewContextProvider from "./components/ViewState"

const Index = (props) => {
  return (
    <React.StrictMode>
      <CookiesProvider>
        <ViewContextProvider>
          <App allPosts={props.allPosts} />
        </ViewContextProvider>
      </CookiesProvider>
    </React.StrictMode>
  );
};

export async function getServerSideProps() {

  const res = await axios.get(
    "http://127.0.0.1:8000/api/v1/posts/",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return {
    props: { allPosts: res.data },
  };
}

export default Index;
