import React, { useState} from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import { useContextGlobal } from './utils/global.context';

const Card = ({ user }) => {
  const { dataFavs, setDataFavs} = useContextGlobal();
  const [isFavorite, setIsFavorite] = useState(false);

  
    const isAlreadyFav= dataFavs.some((favUser) => favUser.id === user.id);
    /*setear true si encuentra q son = user.id que viene como props de la card y favUser.id 
    que viene de la iteración con el some en cada elemento (favUser) en el array data
    isAlreadyFav: La variable isAlreadyFav almacenará el resultado de la operación some(). 
    Si al menos un elemento en data cumple la condición 
    (es decir, si la función de callback devuelve true al menos una vez), entonces isAlreadyFav será true. 
    En caso contrario, si ningún elemento cumple la condición, será false.*/
  

  const addFav = () => {
    if (!isAlreadyFav) {
      const newDataFavs = [...dataFavs, user];
      setDataFavs(newDataFavs);
      localStorage.setItem('favorites', JSON.stringify(newDataFavs));
      setIsFavorite(true); // Marcamos la tarjeta como favorita al hacer clic en el botón
    }
  };

  return (
    <div className={`card ${isFavorite ? 'favorite' : ''}`}>
      <Link to={`/dentist/${user.id}`}>
        <img
          src="/images/doctor.jpg"
          alt={`Image of ${user.name}`}
          className="card-img"
        />
        <p>Name: {user.name}</p>
        <p>User: {user.username}</p>
        <p>E-mail: {user.email}</p>
      </Link>
      <button onClick={addFav} className="favButton">Add to Favs</button>
    </div>
  );
};

export default Card;



//codigo a tener en cuenta para borrar el local storage

/*useEffect(() => {
    // Verificar si hay datos de favoritos en el localStorage
    const favoritesData = localStorage.getItem("favorites");

    // Si hay datos de favoritos en el localStorage, eliminarlos 
    //(lo hice para limpiar mi local storage y hacer pruebas)
    if (favoritesData) {
      localStorage.removeItem("favorites");
    }
  }, []);*/
