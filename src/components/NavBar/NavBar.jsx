import React from 'react'
import {  NavLink } from 'react-router-dom'

import './navbar.css'


const BarBtn = ({icon, txt, link}) => {
  return (
            <div className='icon-container'> 
                <NavLink to={link} className={({isActive})=>{isActive ? 'bg-primary':'bg-danger'}} >
                    <img src= {`/icons/${icon}.svg`} alt={txt} className='btn-icon' />
                </NavLink>
                <div className='text-center'>
                    {txt}
                </div>            
            </div>
  )
}

const NavBar = () => {
    // Estara siempre disponible en la parte superior de la pantalla
    // Permitira al usuario dirigirse a:
        // -> Base
        // -> ShiftsList
        // -> User
        // -> InvoicesList.
  return (
    
    <nav className="navbar fixed-top bg-body-tertiary">
        <div className="container-fluid buttonsArea">
           
            <BarBtn icon="base" txt="Home" link="/" />
            <BarBtn icon="shifts" txt="Shifts" link="/ShiftsUI"/>
            <BarBtn icon="invoice" txt="Invoices" link="/InvoicesUI"/>
            <BarBtn icon="user" txt="Setup" link="/SetupUI"/>

        </div>
    </nav>
  )
}

export default NavBar