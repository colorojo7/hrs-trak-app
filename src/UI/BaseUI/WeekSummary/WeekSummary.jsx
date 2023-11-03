import React from 'react'
import '../BaseUI.css'

const WeekSummary = () => {
  return (
    <div className='weekSummary d-flex flex-wrap text-center'>

        <div className='col-12 h-25 fs-1 fw-bold '>
            Week Summary
        </div>

        <div className='col-12  d-flex justify-content-around align-items-center  h-25'>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
        </div>

        <div className='col-12 d-flex h-50 weekSummary-totalsDiv '>
            <div className='col-6 d-flex flex-column '>
                <div className='fs-4 fw-semibold'>HRS</div>
                <div className='f-grow'>
                    <p className='fs-1 fw-bold my-2'>
                        28
                    </p>
                </div>
            </div>
            <div className='col-6 d-flex flex-column'>
                <div className='fs-4 fw-semibold'>AUD</div>
                <div className='f-grow'>
                    <p className='fs-1 fw-bold my-2' >
                        1900
                    </p>
                    
                </div>
            </div>
        </div>
       
            
    
            
          
    </div>
  )
}

export default WeekSummary