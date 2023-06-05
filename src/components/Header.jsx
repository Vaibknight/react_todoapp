import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../main';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { server } from '../main';

const Header = () => {

  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
  
  const logoutHandler = async()=>{

     setLoading(true);

    try {
    // Sending data to backend using api 
    await axios.get(`${server}/users/logout`,
    {
      withCredentials: true,
    });

    toast.success("Logged out succesfully");
    setIsAuthenticated(false);
    setLoading(false);
    } catch (error) { 
      toast.error("Not Logout");
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav className="header">

        <div>
            <h2>
                Todo App.
            </h2>
        </div>
        <article>

            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}

            
            
        </article>
    </nav>
  )
}

export default Header
