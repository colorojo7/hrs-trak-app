// En esta seccion el usuario podrá:
            // crear nuevos clientes
            // crear nuevas task
            // otras funcionalidades futuras : -> setear email para enviar todas las semanas un detalle a cada cliente (agencia) el detalle. 


import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ClientsList from './ClientsList/ClientsList'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import db from '../../firebase/config';
import { useUserContext } from '../../context/Context';


const SetupUI = () => {
    const {clients, setClients} = useUserContext()
        

    useEffect(()=>{
      const queryCollection = collection (db, `clients` )
      getDocs(queryCollection)
      
      .then( res => setClients( res.docs.map( client => ( {id : client.id , ...client.data() })) )) 
      .catch(err=>console.log(err)) 
    },[])

    const updateClientsLS = ()=> localStorage.setItem("clientsLS", JSON.stringify(clients))

     useEffect(()=>{
        updateClientsLS()
     },[clients])

    return (
      <div className='d-flex flex-column '>
        <ClientsList clientsList={clients} />

        <div className='buttonsArea fixed-bottom py-1 bg-light'>
          <Link to="/ClientFormUI" className='btn btn-primary fs-1'>
            new CLIENT
          </Link>
          <Link to="/TaskFormUI" className='btn btn-primary fs-1'>
            new TASK
          </Link>
        </div>
    
      </div>
    
  )
}

export default SetupUI