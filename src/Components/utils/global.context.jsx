import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

// Estado inicial del contexto global
export const initialState = {
  theme: "light", // Tema por defecto 'light'
  dataFavs: [],
  dataApi: [],
};

// Creación del contexto global
const ContextGlobal = createContext(undefined); 

/* Definimos el reductor que gestionará el estado global
...state : Esto crea una copia del estado actual (state) para mantener la inmutabilidad del estado
action.payload: valor que se pasa como argumento cuando se despacha una acción en el reductor*/
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

/*Componente ContextProvider que proporciona el contexto global a la aplicación
-state: Esta constante almacena el estado actual de la aplicación. 
Inicialmente, tiene el valor que se proporciona como segundo argumento a useReducer (initialState)
-dispatch es la función que se utiliza para disparar acciones 
que luego son procesadas por (globalReducer) para actualizar el estado global de la aplicación.*/
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState); //useReducer gestiona el estado global

  // Al cargar el componente, obtiene el tema del localStorage
  useEffect(() => {
    const themeStored = localStorage.getItem("theme");
    if (themeStored) {
      dispatch({ type: "SET_THEME", payload: themeStored });
    }
    // Obtener los favoritos almacenados en localStorage y establecerlos en el estado
    const favoritesStored = localStorage.getItem("favorites");
    if (favoritesStored) {
      const favorites = JSON.parse(favoritesStored);
      dispatch({ type: "SET_DATA_FAVS", payload: favorites });
    }
    //Leer la api
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

  // Función para cambiar el tema del contexto global y actualizar el localStorage
  const setTheme = (theme) => {
    localStorage.setItem("theme", theme); // Guardo el tema en localStorage para futuras sesiones
    dispatch({ type: "SET_THEME", payload: theme }); // Esto me actualiza el tema en el estado global
  };

  // Acción para establecer los datos (cambiar)
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
}; //Aqui termina mi ContextProvider

// Hook personalizado para acceder al contexto global
export const useContextGlobal = () => useContext(ContextGlobal);
