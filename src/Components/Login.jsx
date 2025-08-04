import React, { useEffect, useState, useRef } from "react";

export default function Login() {

    const[formData, setFormData] = useState({
        username : "",
        pass : "",
    })

    const usernameRef = useRef();

    const[message, setMessage] = useState("");

    useEffect(() => {
        if(message) {
            const timer = setTimeout(() => {
                setMessage(" ");
            }, 1000);
            return () => clearTimeout(timer);
        }
    })

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const handleInputChange = (e) => {
        const{name, value} = e.target;
        setFormData((prev) => ({...prev, [name] : value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedData = JSON.parse(localStorage.getItem("SignupData"))
        // console.log(storedData);
        if(!storedData){
            setMessage("No userfound , Signup first");
            return;
        }

        if(storedData.user === formData.username &&
            storedData.pass === formData.pass
        ){
            setMessage("Login Successfully");
            setFormData({
            username : "",
            pass : "",
        });
            return;
        }

        console.log(formData);
        
    }

    return(
        <>
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="fname">User Name</label>
            <input type="text" id="user" placeholder="User Name" value={formData.username} onChange={handleInputChange}  name="username" ref={usernameRef}/><br></br>
            <label htmlFor="pass">Password</label>
            <input type="password" id="pass" placeholder="Password" value={formData.pass} onChange={handleInputChange}  name="pass"/><br></br>
            <button type="submit">Login</button>
        </form>
        {message && <p className={`message ${message.includes("Successful") ? "success" : "error"}`}>{message}</p>}
        </div>
        </>
    )
}