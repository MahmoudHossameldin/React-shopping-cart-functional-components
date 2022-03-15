import { createContext, useState } from "react";

const Context = createContext();

function ContextProvider({ children }) {
  const [allPhotos, setAllPhotos] = useState([]);

  return <Context.Provider value={{ photos }}>{children}</Context.Provider>;
}

export { Context, ContextProvider };
