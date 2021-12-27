import React, {DragEvent} from 'react';
import { ToyType } from '../redux/toysReducer';



type PropsType = {
    t: ToyType
    dragStartHandler: (e:DragEvent<HTMLImageElement>, t: ToyType, key: string)=>void
    dragOverHandler: (e: any)=>void
    dropHandler: (e:any)=>void
 
}



const Img = (props: PropsType) => {


    const {dragOverHandler, dropHandler, dragStartHandler, t}=props
    const arr = []
    for(let i=0; i<t.count; i++){
        arr.push( <img key={Math.random()}
            src={`https://raw.githubusercontent.com/adzinetskatsiaryna/christmas-data/main/assets/toys/${t.num}.png`} 
            className='img-for-drag'
            onDragStart = {(e:DragEvent<HTMLImageElement>)=>dragStartHandler(e, t, Math.random()+'')} 
            onDragOver={(e:any)=>dragOverHandler(e)} 
            onDrop={(e:any)=>dropHandler(e)}
            draggable={true}
/>)
    }
    return (
        <>
            {arr}
        </>
    )
};

export default Img