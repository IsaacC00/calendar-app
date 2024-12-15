import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

//? utilizo mis variables de entorno
const {VITE_API_URL} = getEnvVariables();

//?creamos unan nueva instacia de axios
const calendarApi = axios.create({
    baseURL:VITE_API_URL + ''
});

//? configurar interceptores
//? permite interceptar respuesas antes o despues de que se haga
//? permite interceptar peticiones respuesas antes o despues de que se haga

//? en esta ocasion lo que vamos hacer es que vamos a aniador a los headers 
//? el JWT en la peticion 

calendarApi.interceptors.request.use( config => {

    config.headers = {
        //? obtenemos los headers
        ...config.headers,
        //? ontenemos el token para verificar si el usuario esta autenticado
        'x-token': localStorage.getItem('token')
    }

    return config;
} )

export {

    calendarApi
    
};