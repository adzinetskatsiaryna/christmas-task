import React from "react";
import { NavLink } from "react-router-dom";
import { TOYS_PATH } from "./routs";
import "./start.css"

const StartPage = ()=>{
   
   return (
        <div className="start-wrapper">
           <div className="start-container">
               <h2 className="start-title">Помогите бабушке нарядить елку</h2>
               
                  <NavLink to={TOYS_PATH} className="start-link">Начать</NavLink>
                  
           </div>         
        </div>
    )
};

export default StartPage