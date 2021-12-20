import { type } from "os";
import { Dispatch } from "redux";
import { api } from "../api/api";
import { filtersType } from "../components/toysPage";
import { filterObj } from "./utils";

export type ToyType = {
    num: string
    name: string
    count: string
    year: string
    shape: string
    color: string
    size: string
    favorite: boolean
    isSelect: boolean
}

export type InitialState = {
  selectedArr: Array<ToyType> ,
  filtredArr : Array<ToyType>,
  count: number | null
  toys : Array<ToyType>
}

 

const initialState: InitialState = {
  selectedArr: [],
  filtredArr :[],
  count: null,
  toys: []
 
}


const ToysReducer = (state: InitialState = initialState, action: ActionType): InitialState =>{
   switch (action.type) {
     
     case 'SET_TOYS' : 
     return {
       ...state,
       toys: action.toys
     };

    case 'SET_FILTERED_ARR':
      return {
      ...state,
      filtredArr:action.filteredArr
               
    };

    case 'SET_FILTERS_ARR':
      return {
         ...state,
          filtredArr: filterObj(state.toys, action.filtres)
      };
      case 'RESET_SETTINGS':
        return {
           ...state,
            filtredArr: state.toys
        };

    case 'ADD_DELETE_SELECTED_TOYS':
      
      let selectedToy: ToyType | undefined
      let newArr: Array<ToyType> = []
      if(action.isSelected){
        selectedToy = state.filtredArr.find(t=>t.num===action.num)
        if(selectedToy){
          newArr = [...state.selectedArr, {...selectedToy, isSelect: action.isSelected}]
        }
        
      }
      if(!action.isSelected){ newArr = [...state.selectedArr.filter(t=>t.num!==action.num)]}
      return {
        ...state,
        selectedArr: newArr, 
        filtredArr: [...state.filtredArr.map(t=>{
          if(t.num!==action.num){
            return {...t}
          } return {...t, isSelect: action.isSelected}
        })]    
      };  
       default: return state
   }
   
};

export const setSelectedTuysAC = (num:string, isSelected: boolean)=>(
  {
    type: 'ADD_DELETE_SELECTED_TOYS',
    num, 
    isSelected
  } as const
)
export const setToysAC = (toys: Array<ToyType>)=>(
  {
      type: 'SET_TOYS',
      toys
  } as const
)
export const setFilteredArrAC = ( filteredArr: Array<ToyType>)=>(
  {
      type: 'SET_FILTERED_ARR',
      filteredArr
  } as const
)

export const setFiltresArrAC = (filtres:filtersType)=>(
  {
      type: 'SET_FILTERS_ARR',
      filtres
  } as const
)
export const resetSettingsAC = ()=>(
  {
      type: 'RESET_SETTINGS',
  } as const
)

type ActionType = 
| ReturnType<typeof setFiltresArrAC>
| ReturnType<typeof resetSettingsAC>
| ReturnType<typeof setFilteredArrAC>
| ReturnType<typeof setToysAC>
| ReturnType<typeof setSelectedTuysAC>


export const getToys = () => (dispatch: Dispatch) => {
  api.getToys()
      .then(res => {
          dispatch(setToysAC(res.data.toys));
          dispatch(setFilteredArrAC(res.data.toys))
          
      }).catch(error => {
      console.log(error)
  })
};

export default ToysReducer