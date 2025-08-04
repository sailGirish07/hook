// import React, { useState, useEffect } from "react";

// export default function Signup() {

//     const[formData, setFormData] = useState({
//         fname : "",
//         lname : "",
//         email : "",
//         user : "",
//         pass : "",
//         confirmPass : ""
//     });

//     const[message, setMessage] = useState("")

//     useEffect(() => {
//         if(message) {
//             const timer = setTimeout(() => {
//                 setMessage("");
//             }, 1000);
//             return () => clearTimeout(timer);
//         }
//     }, [message]);


//     const handleInputChange = (e) => {
//         const {name, value} = e.target;
//         setFormData((prev) => ({...prev, [name] : value}));
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // console.log(formData);
//         if(!formData.fname || !formData.lname || !formData.email || !formData.user || !formData.pass || !formData.confirmPass){
//             setMessage("All fields are required");
//             return;
//         }

//         if(formData.pass !== formData.confirmPass){
//             setMessage("Password do not match");
//             return;
//         }

//         const existingUser = JSON.parse(localStorage.getItem("SignupData"));

//         if(existingUser && existingUser.user === formData.user || existingUser.email === formData.email){
//             setMessage("Username or Email alredy taken. Please try another");
//             return;
//         }


//         localStorage.setItem("SignupData", JSON.stringify(formData));
//         setMessage("Registration Successful");

//         setFormData({
//         fname : "",
//         lname : "",
//         email : "",
//         user : "",
//         pass : "",
//         confirmPass : ""
//     });
//     }

//     return(
//         <>
//         <div>
//         <form onSubmit={handleSubmit}>
//             <label htmlFor="fname">First Name</label>
//             <input type="text" id="fname" placeholder="First Name" value={formData.fname} onChange={handleInputChange} name="fname"/><br></br>
//              <label htmlFor="lname">Last Name</label>
//             <input type="text" id="lname" placeholder="Last Name" value={formData.lname} onChange={handleInputChange} name="lname"/><br></br>
//              <label htmlFor="email">Email Name</label>
//             <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleInputChange} name="email"/><br></br>

//              <label htmlFor="fname">User Name</label>
//             <input type="text" id="user" placeholder="User Name" value={formData.user} onChange={handleInputChange} name="user"/><br></br>
//              <label htmlFor="pass">Password</label>
//             <input type="password" id="pass" placeholder="Password" value={formData.pass} onChange={handleInputChange} name="pass"/><br></br>
//              <label htmlFor="confirm-pass">Confirm Pass.</label>
//             <input type="password" id="confirm-pass" placeholder="Confirm Password" value={formData.confirmPass} onChange={handleInputChange} name="confirmPass"/><br></br><br></br>
//             <button type="submit">Sign Up</button>
//         </form>
//         {message && <p className={`message ${message.includes("Successful") ? "success" : "error"}`}>{message}</p>}
//         </div>
//         </>
//     )
// }

import React, { useReducer } from "react";

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
                message: ""
            };
        default:
            return state;
    }
};


export default function Signup() {
    const [state, dispatch] = useReducer(reducer, initialState);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FIELD", field: name, value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // console.log(state);

    //     const { formData } = state;

    //     if (!formData.fname || !formData.lname || !formData.email || !formData.user || !formData.pass || !formData.confirmPass) {
    //         dispatch({ type: "SET_MESSAGE", message: "All fields are required" });
    //         return;
    //     }

    //     if (formData.pass !== formData.confirmPass) {
    //         dispatch({ type: "SET_MESSAGE", message: "Password do not match" });
    //         return;
    //     }

    //     const existingUser = JSON.parse(localStorage.getItem("SignupData"));

    //     if (existingUser && (existingUser.user === formData.user || existingUser.email === formData.email)) {
    //         dispatch({ type: "SET_MESSAGE", message: "Username or Email already taken. Please try another" });
    //         return;
    //     }

    //     localStorage.setItem("SignupData", JSON.stringify(formData));
    //     dispatch({ type: "SET_MESSAGE", message: "Registration Successful" });
    //     dispatch({ type: "RESET_FORM" });
    // };

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
};


    const { formData, message } = state;

    return (
        <>
            <div>
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
        </>
    );
}
