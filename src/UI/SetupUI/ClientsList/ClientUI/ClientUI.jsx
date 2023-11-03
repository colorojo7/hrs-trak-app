import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {doc, getDoc}  from 'firebase/firestore'
import db from '../../../../firebase/config'
import { Client } from './Client/Client'
import UIheader from '../../../../components/UIheader/UIheader'


const ClientUI = () => {
    const [ client, setClient] = useState ({})
    const {abn} = useParams()

useEffect(()=>{
	const querryDoc = doc(db, `clients`, abn )

	getDoc(querryDoc)
	.then( res => setClient ( {id : res.id , ...res.data() }))
	.catch(err=>console.log(err)) 

},[])

  return (

    <div>
        {client ?
          <>
          <UIheader text={client.name}/>

          <Client client={client} /> 
          </>
          :
          <div>Cargando</div>
        
        }
          
    </div>
  )
}

export default ClientUI