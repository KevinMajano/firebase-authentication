import React,{useState} from 'react'
import {auth} from '../firebaseconfig'
import {useHistory} from 'react-router-dom'

const Login = () => {
    const historial = useHistory();
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [MsgError,setMsgError] = useState(null)

    const RegistrarUsuario = (e)=>{
        e.preventDefault()

            auth.createUserWithEmailAndPassword(email,pass)
            .then(()=> {
                historial.push('/')
            })
            .catch((e)=>{
                 /* ALT+SHIF+A or CTRL+/ */
                if(e.code === 'auth/invalid-email'){
                    setMsgError('Formato Email incorrecto')
                }
                if(e.code === 'auth/weak-password'){
                    setMsgError('La password tiene que tener 6 caracteres o mas')
                }
            })
    }

    const LoginUsuario = ()=>{
        auth.signInWithEmailAndPassword(email,pass)
        .then((r)=> {
            historial.push('/')
        })
        .catch((e)=>{
            if(e.code === 'auth/user-not-found'){
                setMsgError('autenticacion fallida')
            }
            if(e.code === 'auth/wrong-password'){
                setMsgError('Password incorrecta')
            }
        })
    }


    return (
        <div className='row mt-5'>
            <div className='col'></div>
            <div className='col text-center'>
                <form onSubmit={RegistrarUsuario} className='form-group'>
                    <input
                    onChange={(e)=>{setEmail(e.target.value)}}
                        className='form-control'
                        placeholder='Introduce el Email'
                        type='email'/>                     
                            <input
                            onChange={(e)=>{setPass(e.target.value)}}
                                className='form-control'
                                placeholder='Introduce la Password'
                                type='password'/>
                        <div className="d-grid gap-2">
                                <input
                                size="lg"
                                className='btn btn-dark btn-block mt-4'
                                value='Registrar usuario'
                                type='submit'/>
                        </div>
                </form>
                <div className="d-grid gap-2 mt-3">
                <button
                    onClick={LoginUsuario}
                    size="lg"
                    className='btn btn-success'>
                        Iniciar Sesion
                </button>
                </div>
               
                {
                    MsgError !== null ?
                    (
                        <div className="alert alert-danger" role="alert">
                         {MsgError}
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </div>
            <div className='col'></div>
        </div>
    )
}

export default Login
