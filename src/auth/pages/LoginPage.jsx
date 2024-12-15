import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}


const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPasswordTwo: ''
}

export const LoginPage = () => {

    const {startLogin,startRegister} = useAuthStore();
    const {errorMsg} = useSelector( state => state.auth );

    useEffect(() => {
      if (errorMsg !== undefined) {
        Swal.fire('Error al ingresar', errorMsg, 'error');
      }
    }, [errorMsg])
    
    
    const { loginEmail,
        loginPassword,
        onInputChange: onLoginChange
    } = useForm(loginFormFields);

    const { registerName,
        registerEmail,
        registerPassword,
        registerPasswordTwo,
        onInputChange: onRegisterChange
    } = useForm(registerFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({
            email: loginEmail,
            password: loginPassword,
        });
        
    }


    const registerSubmit = (event) => {
        event.preventDefault();

        if (registerPassword !== registerPasswordTwo) {
            Swal.fire('Error al registrar usuario','contrasenias no coinciden','error');
            return;
            
        }
        
        startRegister({
            name:registerName,
            email:registerEmail,
            password:registerPassword,
        });
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerPasswordTwo'
                                value={registerPasswordTwo}
                                onChange={onRegisterChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}