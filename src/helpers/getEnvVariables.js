
//? archivo para obtener lass variables de entorno
export const getEnvVariables = () => {

    import.meta.env;
    
    return {
        ...import.meta.env,
    }
}
