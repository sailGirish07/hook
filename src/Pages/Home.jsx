import React, { useState, useContext } from "react";
import { AuthContext } from '../Context/AuthContext';
import '../Styles/Home.css';

export default function Home(){

    const [welcomeMessage, setWelcomeMessage] = useState("");

    const { user } = useContext(AuthContext);

    const handleExploreClick = () => {
        if (user) {
            setWelcomeMessage(`Welcome, ${user.user}!`);
        } else {
            setWelcomeMessage("You have to be logged in first.");
        }
    };

    return(
        <div className="home-container">
            <div className="content-box">
                <h1 className="main-heading">Welcome to the Home Page!</h1>
                <p className="intro-paragraph">
                    This is the default landing page. Explore more features by clicking the button below.
                </p>
                <button 
                    onClick={handleExploreClick}
                    className="explore-button"
                >
                    Explore more
                </button>
                {welcomeMessage && (
                    <div className="message-container">
                        <p className={`welcome-message ${user ? "success" : "error"}`}>
                            {welcomeMessage}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
