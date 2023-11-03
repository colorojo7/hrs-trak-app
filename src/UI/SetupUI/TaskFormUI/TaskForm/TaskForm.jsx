import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { doc, collection, setDoc} from 'firebase/firestore';

import { useUserContext } from '../../../../context/Context';
import db from '../../../../firebase/config';


const TaskForm = () => {
    const {clients, taskForClient,setTaskForClient,  task, setTask, clientTasks, setClientTasks, getTotalHRS} = useUserContext()
    const [formSuccess, setFormSuccess] = useState(false)
    const [formError, setFormError] = useState(false)

    
    const { register, 
        handleSubmit,
        formState:{errors},
        watch 
    }= useForm({
        defaultValues:{
            client: taskForClient ? 
                    taskForClient.abn 
                    : task ?
                    task.client
                    : "Pick an agency"
                 ,
            name: task && task.name,
            abn: task && task.abn,
            address: task && task.address,
            contact: task && task.contact,
            email: task && task.email,
            startTime: task && task.startTime,
            finishTime: task && task.finishTime,
            rateNormal: task && task.rateNormal,
            rateOvertime: task && task.rateOvertime,
            unpaidBrakes: task && task.unpaidBrakes,
            
        }
    })

    //Calculate total HRS
    const normalShift = getTotalHRS( watch("startTime"), watch("finishTime"),watch("unpaidBrakes"))

    //update clientTasks on LS
    const updateTasksOnLS = (client, data)=>{
        
        const localStorageData = localStorage.getItem(`${client}tasks`);
            if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);
            setClientTasks(parsedData);
            }
      
        localStorage.setItem(`${client}tasks`, JSON.stringify([...clientTasks, data ]))
    }
    //----
 
    const onSubmit = handleSubmit((data)=>{
        const formData = {...data, normalShift     }
        const clientRef = collection(db , `clients`, data.client , `tasks`)

        if (task) { 
            const taskRef = doc(db , `clients`, data.client , `tasks`, task.id)
            setDoc(taskRef, formData)
            .then(() => setFormSuccess(true))
            .then(()=> setTask(null))
            
            .catch((err) => {
                console.log("error",err);
                setFormError(true);
            });
        }else{
            setDoc(doc(clientRef,data.abn), formData) 
                .then(setFormSuccess(true))
                .then(updateTasksOnLS(data.client, data))
                .catch( err => {console.log(err)} ) 
            }
        })

    // cleen up task
    useEffect(() => {
        return () => {
            if (task) {
                setTask(null);
            }
            if (taskForClient){
                setTaskForClient(null)
            }
        };  
    }, []);
    //----
    
  return (
    
        <form onSubmit={onSubmit} className=''>
            <div>
                <div roll='taskerData'>

                    {/* client */}
                    <div className="formField">
                        <label htmlFor='client'>client / agency</label>
                        <select 
                            disabled={task ? true : false}
                            id='client'
                             {...register("client", {
                            required:{
                                value:true,
                                message:"this field is required"
                            },
                            
                            })}
                        >
                            <option value="">Pick one option</option>
                            {clients.map( (client) => 
                                <option value={client.abn} key={client.abn}>
                                    {client.name}
                                </option>
                            )}
                        </select>
                        {errors.client && <span className='formErrorMessage'>{errors.client.message} </span>}
                    </div>  

                    {/* name */}
                    <div className="formField">
                        <label htmlFor='name'>task name</label>
                        <input 
                            id='name'
                            type="text"
                        {...register("name", {
                            required:{
                                value:true,
                                message:"this field is required"
                            },
                            minLength:{
                                value: 2,
                                message:"minimum 2 caracters"
                            },
                            maxLength:{
                                value: 40,
                                message:"max 40 caracters"
                            }
                        })}
                        />
                        {errors.name && <span className='formErrorMessage'>{errors.name.message} </span>}
                    </div> 
                     {/* abn */}
                     <div className="formField">
                        <label htmlFor='abn'>task abn</label>
                        <input 
                            disabled={task ? true : false}
                            id='abn'
                            type="number"
                        {...register("abn", {
                            required:{
                                value:true,
                                message:"this field is required"
                            },
                            minLength:{
                                value: 9,
                                message:"minimum 2 caracters"
                            },
                            maxLength:{
                                value: 12,
                                message:"max 40 caracters"
                            }
                        })}
                        />
                        {errors.abn && <span className='formErrorMessage'>{errors.abn.message} </span>}
                    </div> 

                    {/* address */}
                    <div className="formField">
                        <label htmlFor='address'>address</label>
                        <input 
                            id='address'
                            type="text"
                        {...register("address")}
                        />
                    </div> 

                    {/* contact */}
                    <div className="formField">
                        <label htmlFor='contact'>contact</label>
                        <input 
                            id='contact'
                            type="text"
                        {...register("contact")}
                        />
                    </div> 

                    {/* email  */}
                    <div className="formField">
                        <label htmlFor='email'>email</label>
                        <input 
                            className='form-control'
                            id='email'
                            type="email"
                        {...register("email",{
                            pattern:{
                                value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message:"enter a valid e-mail"
                            }
                        })}
                        />
                        {errors.email && <span className='formErrorMessage'>{errors.email.message} </span>}
                    </div>  

                </div>

              <hr/>

                <div roll='hrsData'>

                    <h3 className='text-center'>Normal Time</h3>

                   
                    <div className='d-flex'>

                        <div className="formField me-2">
                            <label htmlFor='startTime'>start time</label>
                            <input 
                                className='form-control'
                                id='startTime'
                                type="time"
                               
                            {...register("startTime")}
                            />
                        </div> 
                        
                        <div className="formField ms-2">
                            <label htmlFor='finishTime'>finish time</label>
                            <input 
                                className='form-control'
                                id='finishTime'
                                type="time"
                                
                            {...register("finishTime")}
                            />
                        </div>  
                   </div>

                   <div className='d-flex'>
                        <div className="formField  mt-0 w-50">
                            <label htmlFor='unpaidBrakes'>unpaid brakes (minutes)</label>
                            <input 
                                className='form-control'
                                id='unpaidBrakes'
                                type="number"
                                defaultValue={30}
                                
                            {...register("unpaidBrakes")}
                            />
                        </div> 
                        <div className='w-50 text-center ps-3 pb-3'>
                            {normalShift ?
                            <div className='h-100 d-flex flex-wrap  border border-primary-subtle border-5 rounded bg-primary-subtle' >
                                <div className='col-12 fs-4 '>
                                    Normal time
                                </div>
                                <div className="col-12  fw-bold fs-1">
                                    {normalShift}<span className='fw-normal'> hrs </span>
                                </div>
                            </div>
                            :
                            ""
                            }
                        </div>

                   </div>
                </div>

              <hr/>
                        
                <div roll='rateData'>
                    <h3 className='text-center'>Hourly rate (AUD)</h3>
                    <div className='d-flex'>
                        <div className="formField me-2">
                            <label htmlFor='rateNormal'>normal</label>
                            <input 
                                className='form-control'
                                id='rateNormal'
                                type="number"
                               
                            {...register("rateNormal")}
                            />
                        </div> 
                        
                        <div className="formField me-2">
                            <label htmlFor='rateOvertime'>overtime</label>
                            <input 
                                className='form-control'
                                id='rateOvertime'
                                type="number"
                               
                            {...register("rateOvertime")}
                            />
                        </div> 
                    </div>
                    

                </div>

                <div roll='notes'>

                </div>

            </div>
            
            { formSuccess ? 
                <>
                
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <div className='px-3'>
                        Task created succesfully.       
                    </div>
                    <Link to={`/ShiftFormUI`} className='btn btn-success w-25' >
                        new Shift
                    </Link>
                </div>
               
                </>

                :
                <button type="submit" className='btn btn-primary formField fs-1'>
                    { task ? "EDIT TASK" : "CREATE TASK"}
                </button>  
            } 
            { formError && 

                <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <div className='px-3'>
                        Somthing went wrong. Try again later.        
                    </div>
                </div>
            } 
           
        </form>
    
  )
}

export default TaskForm