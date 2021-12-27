import React from "react";
import {Route} from "react-router-dom";
import StartPage from "./startPage";
import ToysPage from "./toysPage";
import ThreePage from "./christmasTreePage";

export const START_PATH = '/start';
export const TOYS_PATH = '/toys';
export const TREE_PATH = '/tree';




const Routs = ()=>{
    return (
        <div>
            <Route exact path = {'/'} render={()=> <StartPage/>} />
            <Route  path = {START_PATH} render={()=> <StartPage/>} />
            <Route  path = {TOYS_PATH} render={()=> <ToysPage/>} />
            <Route  path = {TREE_PATH} render={()=> <ThreePage/>} />
        </div>
    )
}
export default Routs