import React, { createContext, useState } from "react";
import { withCookies } from "react-cookie";

export const ViewContext = createContext();

const ViewContextProvider = (props) => {
  const [viewMode, setViewMode] = useState('allUser');

  return (
    <ViewContext.Provider
      value={{
        viewMode,
        setViewMode,
      }}
    >
        {props.children}
    </ViewContext.Provider>
  )
};

export default withCookies(ViewContextProvider);
