import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useUserContext } from '../../../../context/Context'

const TaskUI = () => {
    const {taskId} = useParams()
    const {clientTasks, setTask} = useUserContext()


    const task = clientTasks.find((task) => task.id === taskId)
    console.log(clientTasks);
    console.log(task);

    // Verifica si se encontró un objeto con el taskId
    if (!task) {
        return (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <div className='px-3'>
                        Somthing went wrong. Try again later.        
                    </div>
            </div>
        )
    }

    return (
        <div>
            <h1 className='fs-2 fw-bolder text-center p-3 text-info-emphasis bg-info-subtle border border-info-subtle rounded-3'>
                {task.name}    
            </h1>

            <div className='container'>
                <div role="client_data" className=' mb-1'>
                    <div className='d-flex'>
                        <div className='fs-5 fw-light col-4 text-end' >
                            address:  
                        </div>
                        <div className='fs-3 fw-bold col-8 ps-2'>
                            {task.address}
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='fs-5 fw-light col-4 text-end' >
                            contact:  
                        </div>
                        <div className='fs-3 fw-bold col-8 ps-2'>
                            {task.contact}
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='fs-5 fw-light col-4 text-end' >
                            email:  
                        </div>
                        <div className='fs-3 fw-bold col-8 ps-2'>
                            {task.email}
                        </div>
                    </div>

                    <hr/>

                    <div className='d-flex'>
                        <div className='fs-5 fw-light col-3 text-end' >
                            start:  
                        </div>
                        <div className='fs-3 fw-bold col-3 ps-2'>
                            {task.startTime}
                        </div>
                        <div className='fs-5 fw-light col-3 text-end' >
                            finish:  
                        </div>
                        <div className='fs-3 fw-bold col-3 ps-2'>
                            {task.finishTime}
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='fs-5 fw-light col-4 text-end' >
                            brakes:  
                        </div>
                        <div className='fs-3 fw-bold col-2 ps-2'>
                            {task.unpaidBrakes}<span>min</span>
                        </div>
                        <div className='fs-5 fw-light col-3 text-end' >
                            total:  
                        </div>
                        <div className='fs-3 fw-bold col-3 ps-2'>
                            {task.normalShift}<span>hrs</span>
                        </div>
                    </div>

                    <hr/>

                   
                    <div className='d-flex'>
                        <div className='fs-5 fw-light col-2 text-end' >
                            rate:  
                        </div>
                        <div className='fs-3 fw-bold col-3 ps-2'>
                            {task.rateNormal}<span>AUD</span>
                        </div>
                        <div className='fs-5 fw-light col-3 text-end' >
                            overtame:  
                        </div>
                        <div className='fs-3 fw-bold col-3 ps-2'>
                            {task.rateOvertime}<span>AUD</span>
                        </div>
                    </div>

                    <hr/>

                </div>
            </div>
                <div className='buttonsArea'>
                    <Link to="/TaskFormUI" className="btn btn-outline-primary d-block px-5" onClick={()=>{setTask(task)}}>
                        Edit
                    </Link>
                </div>
            </div>
    )
}

export default TaskUI