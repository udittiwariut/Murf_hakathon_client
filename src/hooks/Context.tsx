import React, { createContext, useState } from "react";

const Context = createContext(null);
const ContextProvider = ({ children }) => {
  const [fileName, setFileName] = useState("");

  return <Context.Provider value={{ fileName, setFileName }}>{children}</Context.Provider>;
};

export { ContextProvider, Context };
