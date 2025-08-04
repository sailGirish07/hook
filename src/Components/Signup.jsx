import React, { useState, useEffect } from "react";

export default function Signup() {

    const[formData, setFormData] = useState({
        fname : "",
        lname : "",
        email : "",
        user : "",
        pass : "",
        confirmPass : ""
    });

    const[message, setMessage] = useState("")

    useEffect(() => {
        if(message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [message]);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name] : value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        if(!formData.fname || !formData.lname || !formData.email || !formData.user || !formData.pass || !formData.confirmPass){
            setMessage("All fields are required");
            return;
        }

        if(formData.pass !== formData.confirmPass){
            setMessage("Password do not match");
            return;
        }

        const existingUser = JSON.parse(localStorage.getItem("SignupData"));

        if(existingUser && existingUser.user === formData.user || existingUser.email === formData.email){
            setMessage("Username or Email alredy taken. Please try another");
            return;
        }


        localStorage.setItem("SignupData", JSON.stringify(formData));
        setMessage("Registration Successful");

        setFormData({
        fname : "",
        lname : "",
        email : "",
        user : "",
        pass : "",
        confirmPass : ""
    });
    }

    return(
        <>
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="fname">First Name</label>
            <input type="text" id="fname" placeholder="First Name" value={formData.fname} onChange={handleInputChange} name="fname"/><br></br>
             <label htmlFor="lname">Last Name</label>
            <input type="text" id="lname" placeholder="Last Name" value={formData.lname} onChange={handleInputChange} name="lname"/><br></br>
             <label htmlFor="email">Email Name</label>
            <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleInputChange} name="email"/><br></br>

             <label htmlFor="fname">User Name</label>
            <input type="text" id="user" placeholder="User Name" value={formData.user} onChange={handleInputChange} name="user"/><br></br>
             <label htmlFor="pass">Password</label>
            <input type="password" id="pass" placeholder="Password" value={formData.pass} onChange={handleInputChange} name="pass"/><br></br>
             <label htmlFor="confirm-pass">Confirm Pass.</label>
            <input type="password" id="confirm-pass" placeholder="Confirm Password" value={formData.confirmPass} onChange={handleInputChange} name="confirmPass"/><br></br><br></br>
            <button type="submit">Sign Up</button>
        </form>
        {message && <p className={`message ${message.includes("Successful") ? "success" : "error"}`}>{message}</p>}
        </div>
        </>
    )
}