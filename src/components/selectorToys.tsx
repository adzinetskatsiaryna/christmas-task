import { useState } from "react";
import "./selectorToys.css"

const SortToys = (props: any) => {
    const [value, setValue]=useState('от А до Я')
    const onChangeValue = (e: any)=>{
        
        setValue(e.target.value)
        props.onChangeSortType(e.target.value)
    }

    return (
        <div className="select-wrapper"> 
           <select value={value} onChange={onChangeValue} className="select-css">
               <option value='Сортировать'>Выберите способ сортировки</option>
                <option value="От А до Я">От А до Я</option>
                <option value="От Я до А">От Я до А</option>
                <option value="по возростанию">по возростанию</option>
                <option value="по убыванию">по убыванию</option>
            </select>
           <div className="select-arrov"></div>                      
        </div>
    )
};

export default SortToys