import { useState } from "react";
import search from '../assets/svg/search.svg'
import './searchinput.css'

type PopsType ={
    searchToys: (value: string)=>void
}

const SearchInput = (props:PopsType) => {
    const [value, setValue]=useState('')
    const onChangeValue =(e:any)=>{
        setValue((e.target.value).toLocaleLowerCase().trim())
        props.searchToys((e.target.value).toLowerCase().trim())
    }

    const cliearSearchInput =()=>{
        setValue('')
        props.searchToys('')
    }

    return (
        <div className="search">
              <input type="text" value={value} onChange={onChangeValue}  placeholder="Введите запрос" className="search-field"/> 
              <img src={search} alt="search-icon" className="search-icon" /> 
              <span className="search-close" onClick={cliearSearchInput}>x</span>                    
        </div>
    )
};

export default SearchInput