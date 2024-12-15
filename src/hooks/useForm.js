//estado para manejar el form
//este es  un hooks para manejar cualquier tipo de formulario 
import { useEffect, useMemo, useState } from "react";

//pasamo un objeto como valor inicial
export const useForm = (initialValue={}, formValidate = {}) => {
    
    const [formState, setFormState] = useState(initialValue);

    //? state que me permite mostrar las validacion de mis campos dinamicos
    //? cada que aparesca un error react debe de redibujar el formulario
    //? para ello utilizamos un customHook
    const [ formValidation, setFormValidation] = useState({}) ;

    //? vamos a utilziar un useMemo para validar si mi formulario 
    //? tiene todos los campos llenos 

    const isFormValid = useMemo(() => {

        for(const formValue of Object.keys(formValidation)){
            
            //? si algunos de mis valores de mis campos es null
            //? retornamios null y salimos del ciclo
            if (formValidation[formValue] !== null ) return false

        }
        //? retornamos true para indicar que 
        //? mi formaulario es valido
        return true;
    },
     [formValidation])

    //? useEffect para ejecutar createValidation cada vez que 
    //? el formState cambie
    useEffect(() => {
        createValidation();
    }, [formState]);

    //? si los valores del formulario cambia 
    //? entonces el formulario se actualiza
    useEffect(() => {
      setFormState(initialValue);
    }, [initialValue])
    
    

    //? funcion que nos permite 
    //? obtener el target del input
    //? obtenemos del target el name y el valor del target
    //? y actualizamos el estado con el nuevo objeto
    //? y los demas objetos 
    
    const onInputChange = ({target}) => {
        const {name,value} = target;
        setFormState({
            ...formState,
            [name]:value,
        });
    }

    const onResetForm = () => {
        setFormState(
            initialValue
        );
    }

    const createValidation = () => {

        const formCheckedValues = {};
        
        //?rprimero obtenmos los mensajes de mi formValidate
        //? mediante un ciclo for con sintaxis de js 
        for(const formField of Object.keys( formValidate )){
            const [fn,errorMessage = 'Este campo es requerido'] = formValidate[formField]
            // console.log(errorMessage);

            //? primero definio mi porpoiedad computada con el valor
            //? de cada campo de mi formulario
            //? segundo defino una funcion que me dira si se cumple la condicion 
            //? de mi argumento entonces regresara mi error caso contrario sera un null
            //? utilizando ternario
            formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage;
            
        }
        setFormValidation(formCheckedValues);
    }
    
    return ({
        //? deestructuramos el estado (obejto) del form 
        //? para acceder a las propiedades en cualquier lugar 
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    })

}