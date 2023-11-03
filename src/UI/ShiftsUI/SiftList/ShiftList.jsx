import React, { useEffect, useState } from 'react'
import { format, previousMonday, previousTuesday, previousWednesday, previousThursday, previousFriday, previousSaturday, previousSunday, nextSunday } from 'date-fns';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../../../firebase/config';
import { useUserContext } from '../../../context/Context';

const ShiftList = () => {
    const { weekShifts, setWeekShifts}= useUserContext()
    const [weekEnding, setWeekEnding]= useState(  nextSunday(new Date) )

    const dayFormat = (day)=>{
        const formatedDate = format(day, 'PP')
        return formatedDate
    }

    
    const nextWeek = ()=>{
        const next = nextSunday(weekEnding)
        setWeekEnding(next)
    }
    const previousWeek = ()=>{
        const previous = previousSunday(weekEnding)
        setWeekEnding(previous)
    }

    const pickedWeek = (day) =>{
        const weekBuild = [
            previousMonday(day),
            previousTuesday(day),
            previousWednesday(day),
            previousThursday(day),
            previousFriday(day),
            previousSaturday(day),
            weekEnding
        ]
        return weekBuild

    }
    const week = pickedWeek(weekEnding)

    
    const fetchShiftsForWeek = async () => {
        // Create a reference to the "shifts" collection
        const shiftsCollection = collection(db, 'shifts');
    
        // Create a query to filter documents where the "date" field is in the "week" array
        const formattedWeek = week.map((day) => format(day, 'yyyy-MM-dd'));
        const shiftsQuery = query(shiftsCollection, where('date', 'in', formattedWeek));
    
        try {
          // Fetch the documents that match the query
          const querySnapshot = await getDocs(shiftsQuery);
    
          // Initialize an array to store the fetched shifts
          const shifts = [];
    
          // Loop through the query snapshot and add the data to the shifts array
          querySnapshot.forEach((doc) => {
            shifts.push(doc.data());
          });
    
          // Do something with the "shifts" array, such as setting it in your context
          setWeekShifts(shifts)
        } catch (error) {
          console.error('Error fetching shifts:', error);
        }
      };
    // Call the fetchShiftsForWeek function when the component loads or when "weekEnding" changes
    useEffect(() => {
    fetchShiftsForWeek();
    }, [weekEnding]);

    //Save current week shifts on LS to render on BaseUI
    const updateCurrentWeekLS = ()=> localStorage.setItem("currentWeekShifts", JSON.stringify(weekShifts))

    useEffect(()=>{
        updateCurrentWeekLS()
    },[])

  return (
    <div className='container'>
        <div className='d-flex justify-content-between'>
            <button className='col-2 btn btn-outline-secondary' onClick={previousWeek} >{`<`}</button>
            <div className='p-1 text-center'>Week ending <span className='fw-bolder fs-4 d-block'>{dayFormat(weekEnding)}</span> </div>
            <button className='col-2 btn btn-outline-secondary' onClick={nextWeek}>{`>`}</button>
        </div>
        <div className="table ">
            
            <div>
                {week.map((day)=>(   
                    <div key={format(day, 'yyyy-MM-dd')} className='border border-secondary rounded'>
                        <div scope="" className='bg-secondary-subtle rounded'>
                            <div scope="row" className='bg-secondary-subtle fw-bold'>{format(day, 'eee d')}</div>
                        </div>
                        {weekShifts
                            .filter((shift) => format(day, 'yyyy-MM-dd') === shift.date)
                            .map((shift) => (
                            <div key={shift.shiftID} className='d-flex justify-content-between rounded p-1'>
                                <div>{shift.taskName}</div>
                                <div>{shift.HRStotalShift} hrs</div>
                                <div>{shift.AUDtotal} AUD</div>
                            </div>
                            ))}  
                    </div>
                ))}
                

            </div>
        </div>
        <div role='weekSummary' className='d-flex justify-content-between my-3 border border-secondary rounded '>
            <div className='fs-2 fw-bold p-2'>TOTAL</div>
            <div className='fs-2 fw-bold bg-warning-subtle p-2 flex-grow-1 text-center'>{weekShifts.reduce(( weekAUD, shift )=> {return weekAUD + parseFloat(shift.HRStotalShift)}, 0  )} <span> hrs</span></div>
            <div className='fs-2 fw-bold bg-success-subtle p-2 flex-grow-1 text-center rounded-end'>{weekShifts.reduce(( weekAUD, shift )=> {return weekAUD + shift.AUDtotal}, 0  )} <span> AUD</span></div>
                
        </div>

    </div>
  )
}

export default ShiftList