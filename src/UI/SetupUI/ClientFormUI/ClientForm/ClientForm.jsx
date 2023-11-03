import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import db from '../../../../firebase/config';
import { collection, doc, getDocs, query, setDoc, where} from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useUserContext } from '../../../../context/Context';

const ClientForm = () => {
    const {clients, clientToEdit, setClientToEdit} = useUserContext()
    const [existingClient, setExistingClient]= useState(null)
    const [clientCreated, setClientCreated]=useState(null)
    const [error, setError]= useState(null)
    const today = format(new Date(), 'yyyy/MM/dd');
    

    const { register, 
            handleSubmit,
            formState:{errors}
        }= useForm({
            defaultValues:{
                abn:clientToEdit && clientToEdit.abn,
                name:clientToEdit && clientToEdit.name,
                address:clientToEdit && clientToEdit.address,
                payOn:clientToEdit && clientToEdit.payOn,
                contact:clientToEdit && clientToEdit.contact,
                email:clientToEdit && clientToEdit.email,
                notes:clientToEdit && clientToEdit.notes,
            }
        })
    

const navigate = useNavigate(); 
const cleanAndNavigate = ()=>{
            setExistingClient(null);
            setError(null);
            setClientCreated(null);
            navigate("/SetupUI");
}
const onSubmit = handleSubmit(async (data) => {
    try {
        // Crear una referencia al cliente existente si está en modo de edición
        if (clientToEdit) {
        const clientRef = doc(collection(db, 'clients'), clientToEdit.abn);
        // Actualiza el documento existente con los nuevos datos
        await setDoc(clientRef, data, { merge: true })
        .then(cleanAndNavigate());
      
        
        //addClient(data);   

        } else {
        // if is no on editing mode will check for the abn and add it if doesnt exist. 
        const clientsCollection = collection(db, 'clients');
        const abnQuery = query(clientsCollection, where('abn', '==', data.abn));
        const abnDocs = await getDocs(abnQuery);
    
        if (abnDocs.size > 0) {
            setExistingClient(data.abn);
            setClientCreated(null);
        } else {
            // Si no existe, agrega un nuevo cliente
            await setDoc(doc(clientsCollection, data.abn), { ...data, since: today })
            .then(localStorage.setItem("clientsLS", JSON.stringify([...clients, { ...data, since: today }])))
            .then(cleanAndNavigate())
        }}
    } catch (error) {
        console.error('Error al verificar o subir el cliente:', error);
        setExistingClient(null);
        setClientCreated(null);
        setError(error);
    }
    });
    
     // cleen up clientToEdit
     useEffect(() => {
        return () => 
            clientToEdit && setClientToEdit(null)   
    }, []);
    //----

    return (
    <>
        <form onSubmit={onSubmit} className=''>
            {/* abn */}
            <div className="formField">
                <label htmlFor='abn'>abn</label>
                <input 
                    disabled={clientToEdit? true : false}
                    id='abn'
                    type="number"
                {...register("abn", {
                    required:{
                        value:true,
                        message:"this field is required"
                    },
                    minLength:{
                        value: 9,
                        message:"minimum 9 digits"
                    },
                    maxLength:{
                        value: 11,
                        message:"max 11 digits"
                    }
            })}
                 />
                 {errors.abn && <span className='formErrorMessage'>{errors.abn.message} </span>}

             </div>    

            {/* name */}
            <div className="formField">
                <label htmlFor='name'>name</label>
                <input 
                    id='name'
                    type="text"
                {...register("name", {
                        required:{
                            value:true,
                            message:"this field is required"
                        }
                })}
                />
                 {errors.name && <span className='formErrorMessage'>{errors.name.message} </span>}
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

            <hr className='m-1'/>

            {/* payment */}
            <div className="formField">
                <label >Pay on</label>
                <div className='d-flex justify-content-around'>
                    <label> ABN
                        <input
                            className="form-check-input" 
                            value='ABN'                      
                            type="radio"
                        {...register("payOn",{
                            required:{
                                value:true,
                                message:"please pick one option"
                            }
                        })}
                        />
                    </label>
            
                    <label >TFN
                        <input
                            className="form-check-input" 
                            value='TFN'
                            type="radio"
                        {...register("payOn")}
                        />
                    </label>

                    <label> Other
                        <input
                            className="form-check-input" 
                            value='OTHER'                      
                            type="radio"
                        {...register("payOn")}
                        />
                    </label>
                </div>
                {errors.payOn && <span className='formErrorMessage'>{errors.payOn.message} </span>}    
            </div> 


            <hr className='m-1'/> 

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

            {/* notes */}
            <div className="formField">
                <label htmlFor='notes'>notes</label>
                <textarea
                    className='form-control'
                    id="notes"
                    type="textarea"
                {...register("notes")}> 
                </textarea> 
                    
            </div>  

            <div role='alerts'>
                { existingClient && 
                    <div className="alert alert-warning d-flex align-items-center" role="alert">
                        <div className='px-3'>
                        This ABN already exist.       
                        </div>
                        <Link to={`/ClientUI/${existingClient}`} className='btn btn-warning w-25' >
                                    see it
                        </Link>
                    </div>}

                { Object.keys(errors).length > 0 && 
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <div className='px-3'>
                        Complete all the required fields       
                        </div>
                        
                    </div>}

                { clientCreated && 
                    <div className="alert alert-success d-flex align-items-center" role="alert">
                        <div className='px-3'>
                        Client created succesfully.       
                        </div>
                        <Link to={`/ClientUI/${clientCreated}`} className='btn btn-success w-25' >
                                    see it
                        </Link>
                    </div>}  

                
                { error && 
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <div className='px-3'>
                            Unexpected error has occurred loading the form. Try again later      
                        </div>
                    </div>} 
            </div>


            <button type="submit" className='btn btn-primary formField fs-1'>
                {clientToEdit ? "EDIT CLIENT" : "CREATE CLIENT"}
            </button>  

        </form>


        
    </>
        
  )
}

export default ClientForm