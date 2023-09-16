import React, { useState} from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import { useContextGlobal } from './utils/global.context';

const Card = ({ user }) => {
  const { dataFavs, setDataFavs} = useContextGlobal();
  const [isFavorite, setIsFavorite] = useState(false);

  
    const isAlreadyFav= dataFavs.some((favUser) => favUser.id === user.id);
  

  const addFav = () => {
    if (!isAlreadyFav) {
      const newDataFavs = [...dataFavs, user];
      setDataFavs(newDataFavs);
      localStorage.setItem('favorites', JSON.stringify(newDataFavs));
      setIsFavorite(true); 
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
      <button onClick={addFav} className="favBtn">Add to Favs</button>
    </div>
  );
};

export default Card;



