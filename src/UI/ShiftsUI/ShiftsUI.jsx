import React from 'react'
import UIheader from '../../components/UIheader/UIheader'
import ShiftList from './SiftList/ShiftList'
import { Link } from 'react-router-dom'

const ShiftsUI = () => {

  // Esta sera lugar de consulta para ver los shift que el ususrio tenga cargados 
  // Este UI necesitara traer de firebase la informacion de los shifts creados.

  // En la parte superior mostrara el encabezado "Shifts List"
  // Debajo mostrara "Week ending 24 sep 2023" con un boton a cada lado para mover una semana atras o delante. 
      // -> cada vez que aprete significara una nueva consulta a firebase mostrando todos los dias de esa semana. 
      // Cada linea tendra  dia (mon 10) / Task (ANJ) / totalShiftHRS /  totalShiftAUD
      // En caso que ese dia no tenga ningun shift cargado mostrara un boton de "add shift" el cual abrira "ShiftForm" tomando dicho dia como date. 
  
  // Debajo de todo tendra un boton que te llevara a "Shift form" para cargar un nuevo turno de trabajo
  return (
    <>
      <UIheader text="SHIFTS LIST"/>
      <div>
        <ShiftList/>


      </div>
      <div className='d-flex justify-content-center align-items-center'>
        <Link className='btn btn-primary fs-1 fw-bold' to="/ShiftFormUI">
          new SHIFT
        </Link>
      </div>

    </>
    
  )
}

export default ShiftsUI