import React from "react";
import {Link} from 'react-router-dom';
import '../Styles/Navbar.css'

export default function Navbar(){
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
             <Link to="/signup">Signup</Link>
        </nav>
    )
}