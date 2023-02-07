import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Restaurants = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const url = `https://laravel-api-02-07.herokuapp.com/api/restaurant`;
    const auth = useContext(AuthContext);
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
            setPosts(res);
            setIsLoaded(true);
          },
          (err) => {
            setError(err);
            setIsLoaded(true);
          }
        );
    }, []);
  
    const deletePost = (id, e) => {
      fetch(url + "/" + id, {
        method: "DELETE",
        headers: hs,
      }).then(
        (res) => {
          if (res.status === 200) {
            const remaining = posts.filter((p) => id !== p.id);
            setPosts(remaining);
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
        <table className="table">
          <thead>
            <tr>
              <th>Restaurant Name</th>
              <th>City</th>
              <th>Work time</th>
              <th>Address</th>
              <th>
                <span className="float-end mx-1">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="col-lg-3">{post.id + ' ' + post.name}</td>
                <td>{post.city}</td>
                <td>{post.work_time}</td>
                <td>{post.address}</td>
                <td className="col-lg-2">
                {auth.getRole() === 2 ? (
                  <>
                    <button
                      onClick={(e) => navigate(`/restaurants/${post.id}`)}
                      className="float-end btn btn-warning mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => deletePost(post.id, e)}
                      className="float-end btn btn-danger mx-1"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  ""
                )}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="6"
                className="border border-3 border-start-0 border-bottom-0 border-end-0"
              >
               {auth.getRole() === 2 ? (
                <button
                  onClick={(e) => navigate(`/restaurants/create`)}
                  className="btn btn btn-success float-end mx-1"
                >
                  Add new Restaurant
                </button>
              ) : (
                ""
              )}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
}

export default Restaurants;