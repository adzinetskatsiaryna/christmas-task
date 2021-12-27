import React, { useEffect, useRef, useState, DragEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerAppType } from "../redux/store";
import './christmasTreePage.css';
import Snow from "./snow";

import { getToys, ToyType } from "../redux/toysReducer";
import url from './audio.mp3'





const TreePage = ()=>{
   const toys = useSelector<ReducerAppType,  Array<ToyType>>((store) => store.toys.toys);
   const selectedArr = useSelector<ReducerAppType,  Array<ToyType>>((store) => store.toys.selectedArr);
   const dispatch = useDispatch();

   const [background, setBackground]=useState([
      {id: 1, path: 'bg1', isClicked: false},
      {id: 2, path: 'bg2', isClicked: false},
      {id: 3, path: 'bg3', isClicked: false},
      {id: 4, path: 'bg4', isClicked: false},
      {id: 5, path: 'bg5', isClicked: false},
      {id: 6, path: 'bg6', isClicked: false},
      {id: 7, path: 'bg7', isClicked: false},
      {id: 8, path: 'bg8', isClicked: false},
      {id: 9, path: 'bg9', isClicked: false},
      {id: 10, path: 'bg10', isClicked: false}
   ])
   const [tree, setTree]=useState([
      {id: 1, path: 'tree1', isClicked: false},
      {id: 2, path: 'tree2', isClicked: false},
      {id: 3, path: 'tree3', isClicked: false},
      {id: 4, path: 'tree4', isClicked: false},
      {id: 5, path: 'tree5', isClicked: false},
      {id: 6, path: 'tree6', isClicked: false}
   ])
   

   const bgAsString = Number(localStorage.getItem('bg'))
   
   const [bg, setBg]= useState<number>(bgAsString ? bgAsString: 1)
   const treeNumAsString = Number(localStorage.getItem('treeNum'))
   const [treeNum, setTreeNum]= useState<number>(treeNumAsString ? treeNumAsString : 1)

   const onChangeBg = (id: number, isClicked: boolean)=>{
      let mapBg = background.map((el) => el.id === id ? {...el, isClicked: isClicked} : el )
      setBackground(mapBg)
      setBg(id)
      
   }
   const onChangeTree = (id: number, isClicked: boolean)=>{
      let mapTree = background.map((el) => el.id === id ? {...el, isClicked: isClicked} : el )
      setBackground(mapTree)
      setTreeNum(id)
     
   }

   
  const isPlaingAsString = Boolean(localStorage.getItem('isPlaing'))

   const [isPlaing, setIsplaing]= useState(false)

   const [audio, setAudio]=useState( new Audio(url))

   useEffect(()=>{
      audio.load()
   },[])

 const onPlayHandler = () => {  
   audio.play();
   setIsplaing(true)
   
 };

 const  onPauseHandler = () => { 
   audio.pause()
   setIsplaing(false)
   
  };
   
   const [isSnow, setIsSnow]= useState(false)
   const onChangeSnow = ()=>{
      setIsSnow(!isSnow)
  }
 
  useEffect(() => {
   dispatch(getToys()) 
   
 }, []);

 const arrForDropAsString = localStorage.getItem('arr')

 const arr: ToyType[] = JSON.parse(arrForDropAsString as string)
 const [arrForDrop, setArrForDrop]= useState<Array<ToyType>>(arr ? arr : [])

 useEffect (()=>{
   const toysArrForDrag = toys.slice(0, 20)
   if(selectedArr.length===0){
      
      setArrForDrop(toysArrForDrag.map(el=>({...el, count: +el.count})))
      
   } else{
      setArrForDrop(selectedArr.map(el=>({...el, count: +el.count})))
   }
   
}, [toys])


const saveState =()=>{
   const arrForDropAsString = JSON.stringify(arrForDrop)
   const bgAsString = JSON.stringify(bg)
   const treeNumAsString = JSON.stringify(treeNum)
   const isPlaingAsString = JSON.stringify(isPlaing)
   localStorage.setItem('arr', arrForDropAsString)
   localStorage.setItem('bg', bgAsString)
   localStorage.setItem('treeNum', treeNumAsString)
   localStorage.setItem('isPlaing', isPlaingAsString)
}

const clearFilters = ()=>{
   localStorage.clear()
}

useEffect(()=>{

   saveState()

}, [bg, treeNum, isPlaing, arrForDrop])

const [currentToy, setCurrentToy] = useState<ToyType | null>(null)
const [board, setBoard]= useState<Array<any>>([])
const [key, setKey]= useState<string>()

const dragStartHandler =(e:DragEvent<HTMLImageElement>, toy: ToyType, key: string)=>{ 
   setKey(key)
   setCurrentToy(toy)  
}

const dragOverHandler = (e:DragEvent<HTMLDivElement>)=>{
   e.preventDefault()
}
const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
   event.preventDefault();
 };


const dropHandler = (e:DragEvent<HTMLImageElement>|DragEvent<HTMLAreaElement>)=>{
   
 const width1: number| undefined = document.querySelector<HTMLDivElement>('.tree-page-container')!.offsetWidth

 const width2: number| undefined=document.querySelector<HTMLDivElement>('.selected-background')!.offsetWidth

 const width3: number| undefined =document.querySelector<HTMLDivElement>('.tree-toys-container')!.offsetWidth

 const width4  = document.querySelector<HTMLDivElement>('.tree-filters')!.offsetWidth
 const width: number = width1 - width2  -width3 - width4
   
   e.preventDefault()
   
   const x =board.find((b)=>{
      return b.key === key
   }) 

   if(!x){
      setBoard([...board, { toy:currentToy,
        
      x: e?.clientX - (width/2 + 20  + width4),
       y: e?.clientY + window.scrollY - 150,
      key: key}])
   }else {
      //переместили  
      x.x = e?.clientX - (width/2 + 20 + width4)
      x.y=e?.clientY + window.scrollY - 150
      setBoard([...board])
   }
  
  let newArr= arrForDrop.map((el) => el.num === currentToy?.num ? {...el, count: +el.count - 1} : el )
  setArrForDrop(newArr)
}

const dropForLi =(e:DragEvent<HTMLImageElement>|DragEvent<HTMLDivElement>)=>{
   e.preventDefault()
   const x =board.find((b)=>{
      return b.key === key
   }) 
   if(x){
      setBoard(board.filter(b=>b.key!==key))

      let newArr= arrForDrop.map((el) => el.num === currentToy?.num ? {...el, count: +el.count + 1} : el )
      setArrForDrop(newArr)
   }
  
}
   return (
        <div className="tree-page">
           <div className="tree-page-container">
               <div className="tree-filters">
                  <ul className="effect-container">
                     <li className={!isPlaing ? "audio" : "close"} onClick={isPlaing ? onPauseHandler :onPlayHandler}></li>
                     <li className={!isSnow? "snow" : "un-snow"} onClick={onChangeSnow}></li>
                     <li><button onClick={clearFilters}  className="tree-btn">Очистить фильтры</button></li>
                  </ul>
                  <div>
                     <h2>Выберите елку</h2>
                     <ul className="tree-container">
                      {tree.map(t=><li key={t.id} className={t.path} onClick={()=>onChangeTree(t.id, !t.isClicked)} >
                         <img src={`https://raw.githubusercontent.com/adzinetskatsiaryna/christmas-data/main/assets/tree/${t.id}.png`} alt="tree" />
                      </li>)}
                     </ul>
                  </div>
                  <div>
                     <h2>Выберите фон</h2>
                     <ul className="bg-container">
                        {background.map(b=> 
                        <li key={b.id} className={b.path} onClick={()=>onChangeBg(b.id, !b.isClicked)}>
                           <img src={`https://raw.githubusercontent.com/adzinetskatsiaryna/christmas-data/main/assets/bg/${b.id}.jpg`} alt="picture"/>
                        </li>)}
                     </ul>
                  </div>
                  <div>
                     <h2>Гирлянда</h2>
                  </div>
            </div>
            <div className="selected-background" style={{backgroundImage: `url(https://raw.githubusercontent.com/adzinetskatsiaryna/christmas-data/main/assets/bg/${bg}.jpg)`}}> 
               {isSnow?<Snow />: ''}

               <map name="tree-map">
               
                  <area 
                  //@ts-ignore
                  onDragOver={allowDrop}
                  onDrop={(e:DragEvent<HTMLAreaElement>)=>dropHandler(e)} shape="poly" coords="365,699,189,706,113,683,31,608,2,555,2,539,18,437,73,351,106,224,161,134,243,-1,306,75,353,144,399,221,424,359,452,459,496,550,444,664">
                  </area>
               </map>
              <div 
              //onDragOver={allowDrop} 
              //onDrop={(e:any)=>dropHandler(e)}
              >
              <img    useMap="#tree-map" src={`https://raw.githubusercontent.com/adzinetskatsiaryna/christmas-data/main/assets/tree/${treeNum}.png`} alt="tree" />
               
               {board.map(t=>{       
                       return <img key={t.key} src={`https://raw.githubusercontent.com/adzinetskatsiaryna/christmas-data/main/assets/toys/${t.toy.num}.png`} 
                       onDragStart = {(e:DragEvent<HTMLImageElement>)=>dragStartHandler(e, t.toy, t.key)} 
                       onDragOver={(e:DragEvent<HTMLImageElement>)=>dragOverHandler(e)} 
                       onDrop={(e:DragEvent<HTMLImageElement>)=>dropHandler(e)}
                       style={{top: t.y, left: t.x, position: "absolute"}}
                       className='img-for-drag'/>
                    })}
              </div>
              
            </div>
            <div 
               onDragOver={allowDrop} 
               onDrop={(e:DragEvent<HTMLDivElement>)=>dropForLi(e)}
            >
               <div className="tree-toys-container">
                  <h2>Игрушки</h2>
                  <ul className="drag-toys-container"> 
                    {arrForDrop.map(t=>{
                     return <li key={t.num}  className="drag-toys-card" >{t.count > 0 ? <img 
                     src={`https://raw.githubusercontent.com/adzinetskatsiaryna/christmas-data/main/assets/toys/${t.num}.png`} 
                     className='img-for-drag'
                     onDragStart = {(e:DragEvent<HTMLImageElement>)=>dragStartHandler(e, t, t.num +''+ t.count + ''+ Math.random())} 
                     //onDragOver={(e:any)=>dragOverHandler(e)} 
                     //onDrop={(e:any)=>dropHandler(e)}
                     draggable={true}
         />  
                     
                     : null}
                            <span className="drag-toys-count">{t.count <= 0? '0': t.count}</span>
                     </li>
                    })
                    }
                  </ul>
               </div>
            </div>
           </div>
            
        </div>
    )
};
export default TreePage



function dispatch(arg0: (dispatch: import("redux").Dispatch<import("redux").AnyAction>) => void) {
   throw new Error("Function not implemented.");
}

