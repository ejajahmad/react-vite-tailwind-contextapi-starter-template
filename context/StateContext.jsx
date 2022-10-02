import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [postAfter, setPostAfter] = useState("");
  const [postBefore, setPostBefore] = useState("");

  return (
    <Context.Provider
      value={{
        postAfter,
        setPostAfter,
        postBefore,
        setPostBefore,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
