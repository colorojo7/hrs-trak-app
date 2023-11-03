import React from 'react'
import UIheader from '../../../components/UIheader/UIheader'
import ClientForm from './ClientForm/ClientForm'

const ClientFormUI = () => {
  // Esta interfaz permitira al usuario cargar un nuevo "client"

  // En la parte superior un encabezado "Client Form"

  return (
    <>
    <UIheader text="Client Form"/>
    <div className='container'>
      <ClientForm/>
    </div>


    </>
    
  )
}

export default ClientFormUI