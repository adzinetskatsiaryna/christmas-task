import { filtersType } from "../components/toysPage";
import { ToyType } from "./toysReducer";

export function filterObj(array:Array<ToyType> = [], filters: filtersType = {}) {
    const keys = Object.keys(filters).filter(key => filters.hasOwnProperty(key));
    let x = array.filter(elem => {
        
        const commonKeys = keys.filter(key => elem.hasOwnProperty(key));
        return  commonKeys.reduce((flag, key) => !!(flag && filters[key as keyof filtersType]?.includes(elem[key as keyof ToyType]as never)), true as boolean);
    })
    if(filters.serch){
      x= x.filter(t=>t.name.toLowerCase().includes(filters.serch as string))
    }
    return x
}