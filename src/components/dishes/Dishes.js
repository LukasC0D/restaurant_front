import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Dishes() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const auth = useContext(AuthContext);
  const url = `https://laravel-11-23-api.herokuapp.com/api/dish`;
      const hs = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {

          setItems(res['data']);
          setIsLoaded(true);
        },
        (err) => {
          setError(err);
          setIsLoaded(true);
        }
      );
  }, []);

  const deleteHotel = (id) => {
    fetch(url + "/" + id, {
      method: "DELETE",
      headers: hs,
    }).then(
      (res) => {
        if (res.status === 200) {
          const remaining = items.filter((p) => id !== p.id);
          setItems(remaining);
        } else if (res.status === 401) {
          setError({ message: res.statusText });
        }
      },
      (err) => {
        console.log(err);
        setError(err);
        setIsLoaded(true);
      }
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <h1>Dishes</h1>
        <div className="d-flex flex-wrap gap-4">
          {items.map((hotel) => (
            <>
              <div className="card" style={{ width: "17rem" }} key={hotel.id}>
                <img
                  src={hotel.image}
                  className="card-img-top"
                  alt={hotel.name}
                  style={{ width: "270px", height: "180px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text">
                    <b>Price:</b> {hotel.price} eur
                  </p>
                  <p className="card-text">
                    <b>Restaurant: </b>
                    {/* {hotel.restaurant_id ? hotel.restaurant_id : "none"} */}
                    {hotel.restaurant_name}
                  </p>
                  <p className="card-text">
                    <b>Rating: </b>
                    {hotel.rating}
                  </p>
                  <Link className="btn btn-primary" to={`/rate/${hotel.id}`}>
                    Rate
                  </Link>
                  {auth.getRole() === 2 ? (
                    <>
                      <button
                        className="btn btn-warning mx-1"
                        onClick={() => navigate(`/dishes/${hotel.id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger "
                        onClick={() => deleteHotel(hotel.id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    " "
                  )}
                </div>
              </div>
            </>
          ))}
        </div>
        <hr></hr>
        {auth.getRole() === 2 ? (
          <div className="mb-5">
            <button
              onClick={(e) => navigate(`/dishes/create`)}
              className="btn btn btn-success float-end mx-1"
            >
              Add new Dish
            </button>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Dishes;
