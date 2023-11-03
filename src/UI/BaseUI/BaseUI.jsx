

import React from 'react'
import { Link } from 'react-router-dom'
import WeekSummary from './WeekSummary/WeekSummary'
import './BaseUI.css'

const BaseUI = () => {
  return (
    // Este componente mostrara 
        //el dinero generado en lo que va de la semana "currentWeekAUD" . Context
        //las horas tranajadas en lo que va de la semana "currentWeekHRS" . Context
        // Tendra un boton que te llevara a "Shift form" para cargar un nuevo turno de trabajo 
    <>
    
    <div className='container'> 
      <div className='Base_WeekSummary'>
        <WeekSummary />
      </div>
      <div className='d-flex justify-content-center align-items-center'>
          <Link className='btn btn-primary fs-1 fw-bold' to="/ShiftFormUI">
            New shift
          </Link>
          
      </div>
    </div>
    </>
  )
}

export default BaseUI