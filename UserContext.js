import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const AppProvider=({children})=>{

  const [id,setID] = useState('')
  setID('4F8KlZ54LtQNksOD92zj');

  return <AppContext.Provider value={{id ,setID}}>{children}</AppContext.Provider>
}
const useGlobalContext = () => {
  return useContext(AppContext);
}
export { AppContext, AppProvider, useGlobalContext };
