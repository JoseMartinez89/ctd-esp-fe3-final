import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";


export const initialState = {
  theme: "light", 
  dataFavs: [],
  dataApi: [],
};


const ContextGlobal = createContext(undefined); 

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_DATA_FAVS":
      return { ...state, dataFavs: action.payload };
    case "SET_DATA_API":
      return { ...state, dataApi: action.payload };
    default:
      return state;
  }
};


export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState); 

  
  useEffect(() => {
    const themeStored = localStorage.getItem("theme");
    if (themeStored) {
      dispatch({ type: "SET_THEME", payload: themeStored });
    }
    
    const favoritesStored = localStorage.getItem("favorites");
    if (favoritesStored) {
      const favorites = JSON.parse(favoritesStored);
      dispatch({ type: "SET_DATA_FAVS", payload: favorites });
    }
  

    try {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          setDataApi(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

 
  const setTheme = (theme) => {
    localStorage.setItem("theme", theme); 
    dispatch({ type: "SET_THEME", payload: theme }); 
  };

 
  const setDataFavs = (dataFavs) => {
    dispatch({ type: "SET_DATA_FAVS", payload: dataFavs });
  };

  const setDataApi = (dataApi) => {
    dispatch({ type: "SET_DATA_API", payload: dataApi });
  };

  return (
    <ContextGlobal.Provider
      value={{
        theme: state.theme,
        setTheme,
        dataFavs: state.dataFavs,
        setDataFavs,
        dataApi: state.dataApi,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
}; 

export const useContextGlobal = () => useContext(ContextGlobal);
