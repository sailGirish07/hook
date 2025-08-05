import React, { useReducer } from "react";
import '../Styles/Signup.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";





const initialState = {
    formData: {
        fname: "",
        lname: "",
        email: "",
        user: "",
        pass: "",
        confirmPass: ""
    },
    message: ""
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value
                }
            };
        case "SET_MESSAGE":
            return {
                ...state,
                message: action.message
            };
        case "RESET_FORM":
            return {
                ...state,
                formData: {
                    fname: "",
                    lname: "",
                    email: "",
                    user: "",
                    pass: "",
                    confirmPass: ""
                },
                
            };
        default:
            return state;
    }
};


export default function Signup() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

useEffect(() => {
    if (state.message) {
        const timer = setTimeout(() => {
            dispatch({ type: "SET_MESSAGE", message: "" });
        }, 1000);
        return () => clearTimeout(timer);
    }
}, [state.message]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FIELD", field: name, value });
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    const { formData } = state;

    // 1. Validation: Empty fields
    if (!formData.fname || !formData.lname || !formData.email || !formData.user || !formData.pass || !formData.confirmPass) {
        dispatch({ type: "SET_MESSAGE", message: "All fields are required" });
        return;
    }

    // 2. Validation: Password match
    if (formData.pass !== formData.confirmPass) {
        dispatch({ type: "SET_MESSAGE", message: "Password do not match" });
        return;
    }

    // 3. Get existing users array
    const existingUsers = JSON.parse(localStorage.getItem("SignupDataList")) || [];

    // 4. Check for duplicate username or email
    const userExists = existingUsers.some(user =>
        user.user === formData.user || user.email === formData.email
    );

    if (userExists) {
        dispatch({ type: "SET_MESSAGE", message: "Username or Email already taken. Please try another" });
        return;
    }

    // 5. Add new user and save
    existingUsers.push(formData);
    localStorage.setItem("SignupDataList", JSON.stringify(existingUsers));

    // 6. Success message and reset
    dispatch({ type: "SET_MESSAGE", message: "Registration Successful" });
    dispatch({ type: "RESET_FORM" });

    setTimeout(() => {
        navigate("/login"); // 👈 update this to match your route
    }, 1500);
};


    const { formData, message } = state;

    return (
            <div className="signup-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" placeholder="First Name" value={formData.fname} onChange={handleInputChange} name="fname" /><br/>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" placeholder="Last Name" value={formData.lname} onChange={handleInputChange} name="lname" /><br/>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleInputChange} name="email" /><br/>
                    <label htmlFor="user">User Name</label>
                    <input type="text" id="user" placeholder="User Name" value={formData.user} onChange={handleInputChange} name="user" /><br/>
                    <label htmlFor="pass">Password</label>
                    <input type="password" id="pass" placeholder="Password" value={formData.pass} onChange={handleInputChange} name="pass" /><br/>
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input type="password" id="confirmPass" placeholder="Confirm Password" value={formData.confirmPass} onChange={handleInputChange} name="confirmPass" /><br/>
                    <button type="submit">Sign Up</button>
                </form>
                {message && <p className={`message ${message.includes("Successful") ? "success" : "error"}`}>{message}</p>}
            </div>
    );
}
