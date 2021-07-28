import React,{useState,useEffect} from 'react'
import {store} from '../firebaseconfig'
import {Button} from 'react-bootstrap'


const Admin = () => {

    const [modoEdicion,setModoEdicion] = useState(null)
    const [idUsuario,setIdUsuario] = useState('')
    const [nombre,setNombre] = useState('')
    const [phone,setPhone] = useState('')
    const [error,setError] = useState('')
    const [usuariosAgenda,setUsuariosAgenda] = useState([])

    useEffect(()=>{
        const getUsuarios = async()=>{
            const {docs} = await store.collection('agenda').get()
            const nuevoArray = docs.map(item =>({id: item.id, ...item.data()}))
            setUsuariosAgenda(nuevoArray)
        }
        getUsuarios()
    },[])

    const setUsuarios = async (e) =>{
        e.preventDefault();
        if(!nombre.trim()){
            setError('El campo Nombre esta vacio')
        }
        if(!phone.trim()){
            setError('El campo Telefono esta vacio')
        }
        const usuario ={
            nombre: nombre,
            telefono: phone
        }
        try {
          const data = await store.collection('agenda').add(usuario)
          const {docs} = await store.collection('agenda').get()
          const nuevoArray = docs.map(item =>({id: item.id, ...item.data()}))
            setUsuariosAgenda(nuevoArray)
            alert('usuario agregado')        
        } catch (e) {
            console.log(e)
        }
        setNombre('')
        setPhone('')
    }
    
    const BorrarUsuario = async (id)=>{
        try {
            await store.collection('agenda').doc(id).delete()
            const {docs} = await store.collection('agenda').get()
            const nuevoArray = docs.map(item =>({id: item.id, ...item.data()}))
            setUsuariosAgenda(nuevoArray)
        } catch (e) {
            console.log(e)
        }
    }

    const PulsarActualizar = async (id)=>{
        try {
            const data = await store.collection('agenda').doc(id).get()
            const {nombre,telefono} = data.data();
            setNombre(nombre)
            setPhone(telefono)
            setIdUsuario(id)
            setModoEdicion(true)
        } catch (e) {
            console.log(e)
        }
    }

    const setUpdate = async (e)=>{
        e.preventDefault();
        if(!nombre.trim()){
            setError('El campo Nombre esta vacio')
        }
        else if(!phone.trim()){
            setError('El campo Telefono esta vacio')
        }
        const userUpdate = {
            nombre: nombre,
            telefono:phone
        }
        try {
            await store.collection('agenda').doc(idUsuario).set(userUpdate)
             const {docs} = await store.collection('agenda').get()
             const nuevoArray = docs.map(item =>({id: item.id, ...item.data()}))
             setUsuariosAgenda(nuevoArray)
            console.log('usuario Actualizado')
        } catch (e) {
            console.log(e)
        }
        setNombre('')
        setPhone('')
        setIdUsuario('')
        setModoEdicion(false)
    }

    return (
        <div className='container  mt-4'>
            <div className='row'>
                <div className='col text-center'>
                    <h2>Formulario de Usuarios</h2>
                    <form  onSubmit={modoEdicion? setUpdate:setUsuarios} className='form-group'>
                    <div className="d-grid gap-2">
                        <input
                        onChange={(e)=>setNombre(e.target.value)}
                        className='form-control'
                        placeholder='Introduce tu nombre'
                        type='text'
                        value={nombre}
                        />
                        <input
                         onChange={(e)=>setPhone(e.target.value)}
                        className='form-control'
                        placeholder='Introduce el numero'
                        type='text'
                        value={phone}
                        />
                        {
                            modoEdicion ?
                            (
                            <input 
                            type='submit' 
                            value='EDITAR' 
                            className='btn btn-dark btn-block mt-3'/>
                            )
                            :
                            (
                            <input 
                            type='submit' 
                            value='REGISTRAR' 
                            className='btn btn-dark btn-block mt-3'/>
                            )
                        }

                        </div>
                    </form>
                    {
                        error?
                        (
                            <div className="alert alert-danger" role="alert">
                                <p>{error}</p>
                            </div>
                        )
                        :
                        (<span></span>)
                    }
                </div>
                <div className='col'>
                    <h2>Lista de tu Agenda</h2>     
                    <ul className='list-group'>
                    {
                        usuariosAgenda.length !=0 ?
                        (                            
                            usuariosAgenda.map(item =>(
                                <li className='list-group-item' key={item.id}> {item.nombre} ---- {item.telefono}
                                   <Button onClick={(id)=>{BorrarUsuario(item.id)}} className='btn btn-danger'>DELETE</Button>
                                   <Button onClick={(id)=>{PulsarActualizar(item.id)}} className='btn btn-info'>Actualizar</Button>
                                </li> 
                            ))      
                        )
                        :
                        (
                            <span>No hay datos para mostrar</span>
                        )
                    }     
                    </ul>         
                </div>
            </div>
        </div>
    )
}

export default Admin
