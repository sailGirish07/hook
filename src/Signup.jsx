import React from "react";
import { useReducer } from "react";

export default function Signup(){

    const initialState = {
        fname : "",
        lname : "",
        pass : "",
    }

    const reducer = (state, action) => {
        switch(action.type){
            case "UPDATE_FORM":
                return {
                    ...state,
                    [action.payload.field] : action.payload.value
                }
                case "SUBMIT_FORM":
                    return initialState
                    default : 
                    return state
        }
    }

    const[state, dispatch] = useReducer(reducer, initialState);

    const handleInput = (e) => {
        dispatch({
            type : "UPDATE_FORM",
            payload : {
                field : e.target.name,
                value : e.target.value,

            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
        dispatch({
            type : "SUBMIT_FORM",
        })
    }

    // console.log(state);
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="First Name" name="fname" value={state.fname} onChange={handleInput}/><br/>
            <input type="text" placeholder="Last Name" name="lname" value={state.lname} onChange={handleInput}/><br/>
            <input type="password" placeholder="Enter Pasword" name="pass" value={state.pass} onChange={handleInput}/><br/>
            <button type="submit">Submit Form</button>
        </form>
    )
}