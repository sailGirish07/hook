import React, { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from '../Context/AuthContext';
import '../Styles/Login.css';
import { useNavigate } from "react-router-dom";

export default function Login() {

    const[formData, setFormData] = useState({
        username : "",
        pass : "",
    })
    const navigate = useNavigate();

    const usernameRef = useRef();

    const[message, setMessage] = useState("");

    const {login} = useContext(AuthContext);

    useEffect(() => {
        usernameRef.current.focus();
    }, []);


    useEffect(() => {
        if(message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 1000);
            return () => clearTimeout(timer);
        }
    })


    const handleInputChange = (e) => {
        const{name, value} = e.target;
        setFormData((prev) => ({...prev, [name] : value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        //Read the array of signed up users

        const existingUser = JSON.parse(localStorage.getItem("SignupDataList")) || [];

        //Find matching user 

        const matchedUser = existingUser.find(user => 
            user.user === formData.username && user.pass === formData.pass);

            if(!matchedUser){
                setMessage("Invalide user");
                return;
            }

            login(matchedUser);

            setMessage("Login Successfully");
            setFormData({
                username : "",
                pass : "",
            })

            setTimeout(() => {
        navigate("/"); // 👈 update this to match your route
    }, 1000);
        
    }

    const handleRegisterClick = () => {
        navigate("/signup");
    }
    
    return(
        <>
        <div className="login-container">
        <form onSubmit={handleSubmit}>
            <label htmlFor="fname">User Name</label>
            <input type="text" id="user" placeholder="User Name" value={formData.username} onChange={handleInputChange}  name="username" ref={usernameRef}/><br></br>
            <label htmlFor="pass">Password</label>
            <input type="password" id="pass" placeholder="Password" value={formData.pass} onChange={handleInputChange}  name="pass"/><br></br>
            <button type="submit">Login</button>
            <p>Don't have an account ? <span onClick={handleRegisterClick}>Register</span></p>
        </form>
        {message && <p className={`message ${message.includes("Successful") ? "success" : "error"}`}>{message}</p>}
        </div>
        </>
    )
}