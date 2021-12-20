import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { ReducerAppType } from "../redux/store";
import { getToys, ToyType, setFiltresArrAC, setSelectedTuysAC} from "../redux/toysReducer";
import FiltredToys, { colorType, formType, sizesType } from "./filtredToys";
import MultiRangeSlider from "./multiRangeSlider";
import Popup from "./popup";
import SearchInput from "./searchInput";
import SortToys from "./selectorToys";
import './toysPage.css'


export type filtersType = {
   count?: Array<string>
   year?: Array<string>,
   shape?: Array<string>,
   color?: Array<string>,
   size?: Array<string>,
   favorite?: Array<boolean>,
   serch?: string
}

const ToysPage = ()=>{
  
   const[filtres, setFiltres]= useState<filtersType>({
      count: [],
      year: [],
      shape: [],
      color: [],
      size: [],
      favorite: [],
      serch: ''
   })
   const dispatch = useDispatch();
   

    const toys = useSelector<ReducerAppType,  Array<ToyType>>((store) => store.toys.toys);
    const count = useSelector<ReducerAppType,  number | null>((store) => store.toys.count);
    let filtredArrFromRedux = useSelector<ReducerAppType,  Array<ToyType>>((store) => store.toys.filtredArr);
    const selectedArr = useSelector<ReducerAppType,  Array<ToyType>>((store) => store.toys.selectedArr);

    useEffect(() => {
      dispatch(getToys()) 
      
    }, []);
   

    const [filtredArr, setFiltredArr] = useState<Array<ToyType>>([])
    useEffect(()=>{
      setFiltredArr(filtredArrFromRedux)
    }, [filtredArrFromRedux])


   const changeFilter = (color?: string, form?: string, size?: string, isLik?: boolean) => {

   }

   const [isLike, setIsLike] = useState(false)

   const filterFavorite = (favorite:boolean)=>{
      setIsLike(favorite)
      if(favorite){
         setFiltres((prevState)=>{
            return {
               ...prevState,            
               favorite: [...(prevState.favorite? prevState.favorite : []), favorite]
            }
         })
      }else{
         setFiltres((prevState)=>{
            return {
               ...prevState,
               
               favorite: []
            }
         })
      }      
   }

   const [sizes, setSizes] = useState([
      {size: 'большой', isClicked: false, path: 'big-clicked', name: 'big'}, 
      {size: 'средний', isClicked: false, path: 'medium-clicked', name: 'medium'}, 
      {size:'малый', isClicked: false, path: 'small-clicked', name: 'small'}, 
      
  ])

   const filterSize = (size:string, isClicked:boolean)=>{
      const mapNewSizes = sizes.map( (el) => el.size === size ? {...el, isClicked: isClicked} : el  )
      setSizes(mapNewSizes)
      if(isClicked){
         setFiltres((prevState)=>{
            return {
               ...prevState,               
               size: [...(prevState.size? prevState.size : []), size]
            }
         })
      }else{
         setFiltres((prevState)=>{
            return {
               ...prevState,            
               size: prevState.size?.filter(s=>s!==size)
            }
         })
      }      
   }


   const [forms, setForms] = useState <Array<formType>>(
      [
      { form:'шар', isClicked: false, path: 'ball-clicked', name: 'ball'}, 
      { form: 'колокольчик', isClicked: false, path: 'bell-clicked', name: 'bell'}, 
      { form:'шишка', isClicked: false, path: 'cone-clicked', name: 'cone'}, 
      { form: 'снежинка', isClicked: false, path: 'snowflake-clicked', name: 'snowflake'}, 
      { form: 'фигурка', isClicked: false, path: 'figure-clicked', name: 'figure'}
  ])
  
   const filterForm = (form:string, isClicked: boolean)=>{
      const mapNewForms = forms.map( (el) => el.form === form ? {...el, isClicked: isClicked} : el  )
      setForms(mapNewForms)
      forms.filter(e=>e.isClicked!==true)     
      if(isClicked){
         setFiltres((prevState)=>{
            return {
               ...prevState,            
               shape: [...(prevState.shape? prevState.shape : []), form]
            }
         })
      }else{
         setFiltres((prevState)=>{
            return{
               ...prevState,            
               shape: prevState.shape?.filter(s=>s!==form)
            }
         })
      }        
   }


      const [colors, setColors] = useState<Array<colorType>>([
      {color:'красный',isChecked: false, name: 'red'}, 
      {color: 'белый', isChecked: false, name: 'white'}, 
      {color:'желтый', isChecked: false, name: 'yellow'}, 
      {color: 'синий', isChecked: false, name: 'blue'}, 
      {color: 'зелёный', isChecked: false, name: 'green'}
   ])
  
  
   const filterColor = (color: string, isChecked: boolean)=>{
      const mapNewColors = colors.map((el) => el.color === color ? {...el, isChecked: isChecked} : el  )
      setColors(mapNewColors)
      if(isChecked){
         setFiltres((prevState)=>{         
            return {
               ...prevState,               
               color: [...(prevState.color? prevState.color : []), color]
            }           
         })   
      }else{
         setFiltres((prevState)=>{           
            return {
               ...prevState,               
               color: prevState.color?.filter(c=>c!==color)
            }
         })
      }      
   }

   useEffect(()=>{
      let data: filtersType = {}
      Object.keys(filtres).forEach((key)=>{
         let x: keyof filtersType = key as keyof filtersType
         if(filtres && filtres[x]?.length !==0){           
         data[x]=filtres[x] as Array <string & boolean> & string            
         }
      }) 
      data.serch=filtres.serch  
      dispatch(setFiltresArrAC(data))
      
   }, [filtres])

   const filterCount = useCallback(({ min, max }: { min: number; max: number })=>{
      const counts = [] as string[];
      for (let i = min; i <= max; i++){
         counts.push(`${i}`);
      }
      setFiltres((prevState)=>{
         return {
            ...prevState,            
            count: [...counts]
         }
      })
   }, [])

   const filterYear = useCallback(({ min, max }: { min: number; max: number })=>{
      const counts = [] as string[];
      for (let i = min; i <= max; i++){
         counts.push(`${i}`);
      }
      setFiltres((prevState)=>{
         return {
            ...prevState,            
            year: [...counts]
         }
      })
   }, [])

   const setSelectedToys=(num:string, isSelected: boolean)=>{
      if(selectedArr.length < 20 || !isSelected){
         dispatch(setSelectedTuysAC(num, isSelected)) 
      } else{
         setIsOpen(true);
      }
           
   }

  
   const resetSettings =()=>{
      setFiltres({})
      let mapArrSizes = sizes.map( (el) => ({...el, isClicked: false}))
      setSizes(mapArrSizes)
      let mapArrColors = colors.map((el)=>({...el, isChecked: false}))
      setColors(mapArrColors)
      let mapArrForms = forms.map((el)=>({...el, isClicked: false}))
      setForms(mapArrForms)
      setIsLike(false)
      // dispatch(resetSettingsAC())   
   }
   const searchToys =(value: string)=>{
      setFiltres({...filtres, serch: value})
   }

   const [filter, setFilter]=useState('')

   const onChangeSortType=(value:string)=>{
     setFilter(value)   
   } 

   const [isOpen, setIsOpen]= useState(false)
   const [isActive, setIsActive] = useState(false)
   
   
   useEffect(()=>{
      if(filtredArr.length===0 && toys.length!==0){
         setIsActive(true)
      }else{
         setIsActive(false)
      }

   },[filtredArr])

   const closeSecondPopup=()=>{
      setIsActive(false)
   }

 const closePopup = ()=>{
     setIsOpen(false)
 }

   return (
      <div className="toys-page-wrapper">
         <div className="toys-page-container">
            <div className="filtres-container">
            <FiltredToys 
               changeFilter = {changeFilter}  
               filterForm = {filterForm} 
               filterColor ={filterColor} 
               filterSize={filterSize} 
               filterFavorite={filterFavorite}
               sizes = {sizes} 
               forms = {forms}
               colors={colors}
               isLike={isLike}
            />
           
            <div className="toys-page-option">
               <h2>Фильтры по диапазону</h2> 
               <div className="countFilter">    
                  <p>Количество экземпляров:</p>  
                  <MultiRangeSlider min={1} max={12} onChange={filterCount} /> 
               </div>
               <div className="yersFilter">          
                  <p>Год приобретения:</p>  
                  <MultiRangeSlider min={1940} max={2020} onChange={filterYear} /> 
               </div>
            </div>
            <div className="searchFilter">
             <h2>Сортировка</h2>
              <SearchInput searchToys = {searchToys} />
              <SortToys onChangeSortType = {onChangeSortType} />
               <div>
                  <button onClick={resetSettings} className="reset-button">Сбросить фильтры</button>
              </div>   
            </div> 
            </div>
            

           <ul className="toys-container">{filtredArr || filter ? filtredArr.sort((a: ToyType,b:ToyType)=>{
              if(filter ==='От А до Я'){
               if(a.name<b.name){
                  return -1
               }
               if(a.name>b.name){
                  return 1
               }
              }
              if(filter=== 'От Я до А'){
                 if(a.name>b.name){
                    return -1
                 }
                 if(a.name<b.name){
                    return 1
                 }
              }
              if(filter==='по возростанию'){
                  return +a.count - +b.count                
              }
              if(filter === 'по убыванию'){
                 return +b.count - +a.count
              }
              return 0
            
           }).map((el, i)=>{            
              return <li key={el.num} className="toys-card" onClick={()=>setSelectedToys(el.num, !el.isSelect)}>
                 <h2>{el.name}</h2>
                 <div>
                    
                        <img src={`https://raw.githubusercontent.com/adzinetskatsiaryna/christmas-data/main/assets/toys/${el.num}.png`} alt={el.name} />
   
                    <ul className="toys-option">
                       <li><span>Колличество:</span><span> {el.count}</span></li>
                       <li><span>Год выпуска:</span><span> {el.year}</span></li>
                       <li><span>Форма:</span><span> {el.shape}</span></li>
                       <li><span>Цвет:</span><span> {el.color}</span></li>
                       <li><span>Размер:</span><span> {el.size}</span></li>
                       <li><span>Любимая:</span><span> {el.favorite? ' да': ' нет'}</span></li>
                       <li><button className={el.isSelect ?"toys-card-button-select": "toys-card-button"}>{el.isSelect ? 'Удалить из выбранных' : 'Добавить в выбранные'}</button></li>
                    </ul>
                 </div>
              </li>
           }): toys}</ul>
         </div>
         {isOpen&&<Popup content = {"Извините, все слоты заполнены"} handleClose={closePopup}/>}
         {isActive&&<Popup content={"Извините, совпадений не обнаружено"} handleClose={closeSecondPopup}/>}      
      </div>
        
    )
};

export default ToysPage