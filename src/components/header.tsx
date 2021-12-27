
import {NavLink} from "react-router-dom";
import {START_PATH, TOYS_PATH, TREE_PATH} from "./routs";
import './header.css'
import { useSelector } from "react-redux";
import { ReducerAppType } from "../redux/store";
import { ToyType } from "../redux/toysReducer";


const Header = () => {
    const doc = window.document
    const linksCount = doc.links.length 
    for (let i = 0; i < linksCount; i++)
    if(doc.URL.startsWith(doc.links[i].href))
    doc.links[i].classList.add('active') 

    const selectedArr = useSelector<ReducerAppType,  Array<ToyType>>((store) => store.toys.selectedArr);
   
    return (
        <div>
            <div className="header-wrapper"> 
                <div className='header-container'>
                <div>
                    <NavLink to={START_PATH}> <span className="links logo"></span></NavLink>
                    <NavLink to={TOYS_PATH} className="links toys-link">ИГРУШКИ</NavLink> 
                    <NavLink to={TREE_PATH} className="links tree-link">ЕЛКИ</NavLink> 
                </div>    
                <div className="count">{selectedArr.length===0? '0' :selectedArr.length}</div>
            </div>                       
            </div>
           
        </div>
        
    )
};

export default Header