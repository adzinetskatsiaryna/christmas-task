import React, {useState, ChangeEvent} from "react";
import './filtredToys.css'


export type colorType = {
    color: string
    isChecked: boolean
    name: string
}
export type colorsType = Array<colorType>

export type sizeType = {
    size: string
    isClicked: boolean
    path: any
    name: string
}
export type sizesType = Array<sizeType>

export type formType = {
    form: string
    isClicked: boolean 
    path: any
    name: string
}
export type formsType = Array<formType>

export type PropsType={
    changeFilter: (color?: string, form?: string, size?: string, isLike?: boolean)=>void
    filterForm: (form:string, isClicked: boolean)=>void
    filterColor: (color: string, isChecked:boolean)=>void
    filterSize: (size: string, isClicked:boolean)=>void
    filterFavorite:(favorite:boolean)=>void
    sizes: Array<sizeType>
    forms: Array<formType>
    colors: Array<colorType>
    isLike: boolean
}

const FiltredToys = (props:PropsType)=>{

    const onChangeColor = (e: ChangeEvent<HTMLInputElement>, color:string)=>{
        props.filterColor(color, e.currentTarget.checked)
    };

    const onChangeForm = (form:string, isClicked: boolean)=>{
        props.filterForm(form, isClicked)    
    };

    const onChangeSize = (size:string, isClicked: boolean)=>{
        props.filterSize(size, isClicked)
    };

    const onChangeLike = (e: ChangeEvent<HTMLInputElement>)=>{
        props.filterFavorite(e.currentTarget.checked)
    }

   return (
        <div className="value-filtres-container">
           <h2>Фильтры по назначению</h2>
           <div>
                <p>Форма</p>
                <ul className="values-filter">
                   {props.forms.map((el,i)=>{
                       return <li key={i} className={el.isClicked?el.path :el.name} onClick={()=>onChangeForm(el.form, !el.isClicked)} ></li>
                   })}
                </ul>
           </div>
           <div>
                <p>Цвет</p>
                <ul className="colors-filter">
                    {props.colors.map((el, i)=>{
                        return  <li key={i}><input 
                        type="checkbox" 
                        value={el.color} 
                        onChange={(e)=>onChangeColor(e, el.color)} 
                        checked={el.isChecked} 
                        className={el.name} /></li>
                    })}
                </ul>
           </div>
           <div>
                <p>Размер</p>
                <ul className="sizes-filter">
                    {props.sizes.map((el, i)=>{
                        return <li key={i} onClick={()=>onChangeSize(el.size, !el.isClicked)}  className={el.isClicked? el.path : el.name}></li>
                    })}
                </ul>
           </div>
           <div className="favorite-filter">
               <span>Только любимые</span>
               <input type="checkbox" checked={props.isLike} onChange={onChangeLike} />
           </div>

        </div>
    )
};

export default FiltredToys