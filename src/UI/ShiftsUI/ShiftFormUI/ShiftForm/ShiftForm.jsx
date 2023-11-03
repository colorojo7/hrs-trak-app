 // Este sera un formulario para que el trabajador carge los trabajos que vaya haciendo 
    //DONE--- Mostrara el encabezado "Shift Form"

    // El formulario pedirá:
      // DONE client (Agencia para la que trabaja) . Menu desplegable con los que haya cargado + New Client
      // DONE task (El cliente de la agencia ). Menu drsplegable con las Task que haya cargado para ese cliente + New Task. 
          //Estos dos guardara el local storage la ultima seleccion generada por el usuario y quedaran ahi para futuras selecciones.
      // date (tomara la fecha today pero sera modificable para fechas pasadas no futuras)
      // startTime (tomara el horario que el usuario cargue en "normalStartTime" al crear la task pero sera modificable)
      // finishTime (tomara la hora actual pero sera modificable para horarios pasados)
      // unpaidBrakes (expresado en minutos. aparecera lo que el usuario haya cargado en "usualUnpaidBreaks" al crear la task pero sera modificable)
      // normaltimeRate & overtimeRate (aparecera lo que el usuario haya cargado en usualNormaltimeRate & usualOvertimeRate al crear la task pero sera modificable)
      
    // Luego Mostrara:
      //  totalShiftAUD
      //  HRStotalShift  
      //  Button "Submit" 
          //creara un objeto "shift" este objeto tendra:  
              // info de los campos del form (client, task, date, startTime, finishTime, unpaidBrakes, normaltimeRate & overtimeRate )
              // id: con la fecha, la taskName y el total de hs  {2023_05_12-ANJ-0820}
              // HRStotalShift, totalShiftNormaltime, totalShiftOvertime
              // totalShiftAUD 
          // lo subira a firebase 
            // Debera verificar si ya existe algun shift cargado con un ID que comience igual (misma fecha)
              // => mostrara un cartel de advertencia con la info del shift. 
          // volvera a Base

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useUserContext } from '../../../../context/Context';
import { format} from 'date-fns';
import db from '../../../../firebase/config';
import { collection, doc, query, setDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const ShiftForm = () => {
    const {clients, clientTasks, setClientTasks, getTotalHRS} = useUserContext()
    const today = new Date()

    // get the last task selected from localStorage to set it as default Values
    const getLastTask = localStorage.getItem('lastSelected')
    const lastTask = JSON.parse(getLastTask)  
    //----


    const {
        register, 
        handleSubmit,
        formState:{errors},
        watch,
        setValue
    }=useForm({
        defaultValues:{
            date: format(today, 'yyyy-MM-dd'),
            startTime: format(today, 'HH:mm'),
            finishTime:format(today, 'HH:mm'),
            client: lastTask&& lastTask.client,
            task: lastTask&& lastTask.task    
        }
    })

    // To set the dafault values registerde on the task
    const updateDefaultValus = (selectedTask) => {
        if (selectedTask) {
          setValue('startTime', selectedTask.startTime);
          setValue('unpaidBrakes', selectedTask.unpaidBrakes);
          setValue('rateNormal', selectedTask.rateNormal);
          setValue('rateOvertime', selectedTask.rateOvertime);
        } 
      };
    
      useEffect(() => {
        const selectedTask = clientTasks.find((task) => task.abn == watch('task'));
        updateDefaultValus(selectedTask);
      }, [watch('task')]);
    //----
    

    // get the client tasks to the task select
    const selectedClient = watch("client")
    const getAndSetClientsTasksFromLS = () => {
        const localStorageData = localStorage.getItem(`${selectedClient}tasks`);
        
        if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);
            setClientTasks(parsedData);
        } else{
            setClientTasks([])
        }
      };
      useEffect(() => {
        getAndSetClientsTasksFromLS();
      }, [selectedClient]);

    // Variables
    const HRStotalShift = getTotalHRS( watch("startTime"), watch("finishTime"),watch("unpaidBrakes")).toFixed(2)

    const getHRSnormal = HRStotalShift ? 
                            (HRStotalShift>=  8 ? (8).toFixed(2) : HRStotalShift )
                            :
                            0
                                 
                            
    const getHRSovertime= HRStotalShift?
                            (HRStotalShift - getHRSnormal > 0? 
                                (HRStotalShift - getHRSnormal).toFixed(2)
                                :
                                0 )
                            :
                            0

    const AUDnormal = getHRSnormal && parseInt((getHRSnormal * watch("rateNormal")).toFixed(2))
    const AUDovertime = getHRSnormal && parseInt((getHRSovertime * watch("rateOvertime")).toFixed(2))
    const AUDtotal = AUDnormal + AUDovertime

    const navigate = useNavigate();
    const cleanAndNavigate = ()=>{
        navigate("/BaseUI");
}

    const onSubmit = handleSubmit((data)=>{
        const shiftID = `${data.date}_${data.client}_${data.task}`
        const selectedTask = clientTasks.find((task) => task.abn === watch("task"));
        const taskName = selectedTask ? selectedTask.name : '';
        const shiftData = {shiftID, ...data, HRStotalShift, AUDnormal, AUDovertime, AUDtotal, taskName}
        const shiftCollection = collection(db,'shifts')
        //save last task pick in LS

        const shiftQuery = query(shiftCollection, where( 'shiftID', '==' , shiftID  ))
        if(shiftQuery.size > 0) {
            console.log("este shift parece que ya existe");
        }else{
            setDoc(doc(shiftCollection , shiftID), shiftData) 
                .then( console.log("se creo el shift", shiftData) )
                .then( localStorage.setItem('lastSelected',JSON.stringify(shiftData)))
                .then(cleanAndNavigate())
                .catch( err => {console.log(err)} )
        }
        
    })


    return (

        <form onSubmit={onSubmit}>
            
            {/* client */}
            <div className="formField">
                <label htmlFor='client'>client / agency</label>
                <select 
                    id='client'
                        {...register("client", {
                    required:{
                        value:true,
                        message:"this field is required"
                    }})}
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

            {/* task */}
            <div className="formField">
                <label htmlFor='task'>task</label>
                <select 
                    id='task'
                        {...register("task", {
                    required:{
                        value:true,
                        message:"this field is required"
                    }})}
                >
                    <option value="">Pick one option</option>
                    {clientTasks.map( (task) =>   
                            <option key={task.abn} value={task.abn} >
                                {task.name}
                            </option>
                    )}
                </select>
                {errors.task && <span className='formErrorMessage'>{errors.task.message} </span>}
            </div>  

            {/* date */}
            <div className="formField">
                <label htmlFor='date'>date</label>
                <input 
                    type='date'
                    id='date'
                        {...register("date", {
                            required:{
                                value:true,
                                message:"this field is required"
                            },
                            validate:(value)=>{
                                const selectedDate = new Date (value);
                                if (selectedDate > today){
                                    return "the date cant be future"
                                }else{
                                    return true
                                }
                            }
                        })}
                >
                    
                </input>
                {errors.date && <span className='formErrorMessage'>{errors.date.message} </span>}
            </div>  

            <hr/>

                <div roll='hrsData'>

                    <h3 className='text-center'>Worked HRS</h3>

                   
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
                            
                            <div className='h-100 d-flex flex-wrap  border border-primary-subtle border-5 rounded bg-primary-subtle' >
                                <div className='col-12 fs-4 '>
                                    Time
                                </div>
                                <div className="col-12  fw-bold fs-1">
                                    {!isNaN(HRStotalShift) ?HRStotalShift  : ""  }<span className='fw-normal'> hrs </span>
                                </div>
                            </div>
                            
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

                <div roll='typeOfHRS '> 
                    <div className='d-flex'>
                        <div className="col-6 text-center">
                            x {getHRSnormal} hrs
                        </div> 
                        
                        <div className="col-6 text-center">
                            x {getHRSovertime} hrs
                        </div> 
                    </div>
                </div>
                <hr/>

                <div roll='subTotalAUD'>

                    <div className='d-flex mb-2'>
                        <div className="col-6 text-center">
                           {AUDnormal} AUD
                        </div> 
                        
                        <div className="col-6 text-center">
                            {AUDovertime} AUD   
                        </div> 
                    </div>
                </div>




                <div roll='TotalAUD'>
                        
                        <div className='w-100 text-center pb-3'>
                            
                            <div className='h-100 d-flex flex-wrap  border border-primary-subtle border-5 rounded bg-primary-subtle' >
                                <div className='col-12 fs-4 '>
                                    Total
                                </div>
                                <div className="col-12  fw-bold fs-1">
                                    {!isNaN(AUDtotal) ? AUDtotal  : ""  }<span className='fw-normal'> AUD </span>
                                </div>
                            </div>
                            
                        </div>
                </div>

            <button type="submit" className='btn btn-primary formField fs-1'>
                submit shift
            </button>  
        </form>
    )
}

export default ShiftForm