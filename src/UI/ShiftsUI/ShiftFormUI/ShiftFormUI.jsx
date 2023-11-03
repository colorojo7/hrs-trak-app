import React, { useEffect } from 'react'
import ShiftForm from './ShiftForm/ShiftForm'
import UIheader from '../../../components/UIheader/UIheader'
import { useUserContext } from '../../../context/Context';

const ShiftFormUI = () => {
  
  const {setClients} = useUserContext()

  //function to get clients from LS
  const getAndSetClientsFromLocalStorage = () => {
    const localStorageData = localStorage.getItem('clientsLS');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setClients(parsedData);
    }
  };

  useEffect(() => {
    getAndSetClientsFromLocalStorage();
  }, []);

   
  return (
    <>
      <UIheader text='SHIFT FORM'/>
      <div className='container'>
        <ShiftForm/>
      </div>
    </>
    
  )
}

export default ShiftFormUI