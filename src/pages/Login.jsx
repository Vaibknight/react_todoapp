import React, {useContext, useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../main';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { server } from '../main';

const Login = () => {

    const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHadler = async(e)=>{

     

        try {
          e.preventDefault();
        console.log(email, password);
    
        // Sending data to backend using api 
        const { data } = await axios.post(
            `${server}/users/login`,
          {
            
            email, password,
        },
        {
          headers:{
            "Content-Type" : "application/json",
          },
          withCredentials: true,
        });
    
        toast.success(data.message);
        setIsAuthenticated(true);
        } catch (error) { 
          toast.error(error);
          console.log(error);
          setIsAuthenticated(false);
        }
      };

    if(isAuthenticated) return <Navigate to={"/"}/>;


  return (
    <div>
      <div className='login'>
        <section>
            <form onSubmit={submitHadler}>
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type='email' placeholder='Email' required/>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type='password' placeholder='Password' required/>
                <button type='submit'>Login</button>
                <h4>Or</h4>
                <Link to="/register">Sign Up</Link>
            </form>
        </section>
      </div>
    </div>
  )
}

export default Login
Login