import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api/calendarApi";
import { clearErrorMsg, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { onLogoutCaldendar } from "../store/calendar/calendarSlice";

export const useAuthStore = () => {

    const { status, user, errorMsg } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking());
        try {

            const { data } = await calendarApi.post('/auth', { email, password });

            //? guardamos en localStorage el token 
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            //?dispatch accion onLogin
            dispatch(onLogin({ name: data.name, uid: data.uid }));


        } catch (error) {
            console.log(error);
            //? throw new Error('No se pudo iniciar sesion');
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMsg());
            }, 10);
        }

    }

    const startRegister = async ({ name, email, password }) => {

        dispatch(onChecking());

        try {

            const resp = await calendarApi.post('/auth/register', { name, email, password });
            console.log(resp);
            
            // //? guardamos en localStorage el token 
             localStorage.setItem('token', data.token);
             localStorage.setItem('token-init-date', new Date().getTime());

            // //?dispatch accion onLogin
             dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {

            console.log(error);
            //? throw new Error('No se pudo iniciar sesion');
            dispatch(onLogout( error.response.data?.msg || 'Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMsg());
            }, 10);

        }

    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCaldendar());
        dispatch(onLogout());
    }

 const checkAuthToken = async() => {

     const token = localStorage.getItem('token');

        if (!token) {
            return dispatch(onLogout());
        }

        try {

            const { data } = calendarApi.post('/auth/renew');

            //? guardamos en localStorage el token 
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            //?dispatch accion onLogin
            dispatch(onLogin({ name: data.name, uid: data.uid }));


        } catch (error) {
            //? limpiamos el cache
            localStorage.clear();
         console.log(error);

        }

 }

    return {
        //?Propiedades
        status,
        user,
        errorMsg,
        //?Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout

    }
}
