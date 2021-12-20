import axios from 'axios'

export const instance = axios.create({
    baseURL:'https://raw.githubusercontent.com/adzinetskatsiaryna/christmas-data/main/data.json'
});


export const api = {
    getToys(){
        return instance.get(``)
    }
}