import { createContext, useState } from "react";

const GlobalContext = createContext(undefined);

const GlobalContextProvider = ({ children }) => {
  const [updatePosts, setUpdatePosts] = useState("");

  const updatePostsFunction = () => {
    setUpdatePosts((prevState) => !prevState);
  };

  const value = {
    updatePostsFunction,
    updatePosts,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
