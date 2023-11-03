import { millisecondsToMinutes } from 'date-fns'
import React, { useState, createContext, useContext, useEffect } from 'react'

const UserContext = createContext([])
export const useUserContext =  () => useContext( UserContext )

export const UserContextProvider = ({children})=>{
	// Aca escribiría todas las estados y funciones que necesite pasar
	
	const [clients, setClients]= useState([])
	const [clientToEdit, setClientToEdit] = useState(null)
	const [clientTasks, setClientTasks] = useState([])
	const [task, setTask] = useState(null)
  	const [taskForClient, setTaskForClient]= useState(null)
	const [weekShifts, setWeekShifts] = useState([])

	const getTotalHRS = (start, finish, brakes)=>{
		const startTimeDate = new Date(`1970-01-01T${start}`);
		const finishTimeDate = new Date(`1970-01-01T${finish}`);
		const unpaidBrakesDate = brakes
		
		let totalShiftHRS 
		
		(millisecondsToMinutes(finishTimeDate - startTimeDate)-unpaidBrakesDate)/60 > 0 ? 
		totalShiftHRS = (millisecondsToMinutes(finishTimeDate - startTimeDate)-unpaidBrakesDate)/60
		:
		totalShiftHRS = (millisecondsToMinutes(finishTimeDate - startTimeDate)-unpaidBrakesDate)/60+24
		return totalShiftHRS
	}
	
	return (
		<UserContext.Provider value={{ 
	
			clients, setClients, 
			clientToEdit, setClientToEdit,
			clientTasks, setClientTasks,
			task, setTask,
      		taskForClient, setTaskForClient,
			weekShifts, setWeekShifts,

			getTotalHRS

		}}>
			{children}
		</UserContext.Provider >
	)
}




