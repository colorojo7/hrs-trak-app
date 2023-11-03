import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../../../../firebase/config';
import TasksList from '../../../TasksList/TasksList';
import { useUserContext } from '../../../../../context/Context';

export const Client = ({client}) => {
    const { setTaskForClient, clientTasks, setClientTasks, setClientToEdit} = useUserContext()
    
    // get the tasks submited for the sprecific client and update el clientTasks on the LS
    useEffect(()=>{
        const queryCollection = collection (db, `clients/${client.abn}/tasks` )
        getDocs(queryCollection)
            .then((data)=>{setClientTasks (data.docs.map( item => ({ id:item.id , ...item.data() }) ))})
            //.then(update el clientTasks on the LS)
            .catch((err)=>{console.log(err)})
    },[client])
    
    const setTask = ()=>{
        setTaskForClient(client)
    } 

    const updateClientTasksLS = ()=> localStorage.setItem(`${client.abn}tasks`, JSON.stringify(clientTasks))

     useEffect(()=>{
        updateClientTasksLS()
     },[clientTasks])

  return (
    <div className='container'>
        <div role="client_data" className=' mb-1'>
            <div className='d-flex'>
                <div className='fs-5 fw-light col-4 text-end' >
                    abn:  
                </div>
                <div className='fs-3 fw-bold col-8 ps-2'>
                    {client.abn}
                </div>
            </div>

            <div className='d-flex'>
            <div className='fs-5 fw-light col-4 text-end' >
                    address:  

                </div>
                <div className='fs-3 fw-bold col-8 ps-2'>
                    {client.address}
                </div>
            </div>

            <div className='d-flex'>
                <div className='fs-5 fw-light col-4 text-end'>
                    pay on:  

                </div>
                <div className='fs-3 fw-bold col-8 ps-2'>
                    {client.payOn}
                </div>
            </div>

            <div className='d-flex'>
                <div className='fs-5 fw-light col-4 text-end' >
                    client since:  
                </div>
                <div className='fs-3 fw-bold col-8 ps-2'>
                    {client.since}
                </div>
            </div>

            <div className='buttonsArea'>
                <Link to='/ClientFormUI' className='btn btn-outline-primary d-block px-5' onClick={()=>setClientToEdit(client)}>edit</Link>
            </div>

            <div className='d-flex flex-wrap'>
                <div className='fs-5 fw-bold col-12 text-center' >
                    notes:  
                </div>
                <div>
                    {client.notes}
                </div>
            </div>
        </div>
        <div>
            <TasksList list={clientTasks} />
        </div>
        <div className='buttonsArea fixed-bottom py-1 bg-light'>
            <Link to="/TaskFormUI" className='btn btn-primary fs-1' onClick={setTask}>
                new TASK
            </Link>
        </div>

    </div>
  )
}
