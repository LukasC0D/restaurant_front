import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RateDish = () => {
  let { id } = useParams();
  const [status, setStatus] = useState(null);
  const [initialLoadError, setInitialLoadError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});
  const [rating, setRating] = useState();
  const hs = { Accept: "application/json", "Content-Type": "application/json" };
  const url = `http://localhost:8000/api/dish`;
  const navigate = useNavigate();

  useEffect(() => {
    if (id)
      fetch(`${url}/${id}`)
        .then((res) => res.json())
        .then(
          (res) => {
            setItem(res);
            setIsLoaded(true);
          },
          (err) => {
            setInitialLoadError(err);
            setIsLoaded(true);
          }
        );
    else setIsLoaded(true);
  }, [id, url]);

  const createItem = (e) => {
    e.preventDefault();
    fetch(url + "/addrating", {
      method: "POST",
      headers: hs,
      body: JSON.stringify({ rating: rating, dish_id: id }),
    }).then(
      (res) => {
        if (res.status === 200 || res.status === 201) {
          setStatus({ message: res.statusText });
          navigate("/dishes");
        } else if (res.status === 401) {
          setStatus({ message: res.statusText });
        } else if (res.status === 422) {
          setStatus({ message: res.statusText });
        }
      },
      (err) => {
        setStatus(err);
      }
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (initialLoadError) {
    return <div>Error: {initialLoadError.message}</div>;
  } else {
    return (
      <div className="d-flex aligns-items-center justify-content-center">
        <div className="card w-50">
          <div className="card-header">{`Dish  nr: ${id} rate page`}</div>
          <div className="card-body">
            <form onSubmit={(e) => createItem(e)}>
              <div className="my-2 text-danger">
                {status === null ? "" : status.message}
              </div>
              <div className="form-group d-grid gap-2">
                <label>Dishname</label>
                <input
                  className="form-control"
                  value={item.name ?? "New name"}
                  disabled
                />
                <label>Rating</label>
                <input
                  className="form-control"
                  onChange={(e) => setRating(e.target.value)}
                  type="number"
                  min="1"
                  max="5"
                 
                />
                <span>Give a rating  1 - 5 stars</span>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default RateDish;
