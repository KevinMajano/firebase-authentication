import React,{useEffect,useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {auth} from '../firebaseconfig'

const Menu = () => {

    const historial = useHistory()

    const [usuario,setUsuario] = useState(null)
        useEffect(()=>{
            auth.onAuthStateChanged((user)=>{
                if(user){
                    setUsuario(user.email)
                }
            })
        },[])

    const cerrarSesion =()=>{
        auth.signOut();
        setUsuario(null)
        historial.push('/')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <h5 className="navbar-brand mt-1">React-Firebase</h5>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className='nav-link' to='/'>Inicio</Link>
                        </li>
                        <li className="nav-item">
                        {
                        !usuario? 
                        (
                            <Link className='nav-link' to='/Login'>Login</Link>
                        )
                        : 
                        (
                        <span></span>
                        )
                        }
                            
                        </li>
                        <li className="nav-item">
                        {
                        !usuario? 
                        (
                            <Link className='nav-link' to='/Admin'>Admin</Link>
                        )
                        : 
                        (
                        <span></span>
                        )
                        }
                           
                        </li>  
                    </ul>
                   <div className="justify-content-end">
                   {
                        usuario? 
                        (
                            <button onClick={cerrarSesion} className='btn btn-danger'>
                                Cerrar sesion
                            </button>
                        )
                        : 
                        (
                        <span></span>
                        )
                    }
                   </div>
            </nav>
        </div>
    )
}

export default Menu
