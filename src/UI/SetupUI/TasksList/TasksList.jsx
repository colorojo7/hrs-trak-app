import React from 'react'
import { Link } from 'react-router-dom';

const TasksList = ({list}) => {

  return (
    
    <div className='mt-5'>
      <div className='text-center fw-bold fs-3 text-info-emphasis bg-info-subtle border border-info-subtle rounded-3'>
        tasks list
      </div>

      <table className='table table-striped'>
          
          <tbody>
          {list.length === 0 ?

              <tr>
                <th className='p-5 text-center text-info-warning bg-warning-subtle'>
                  register a tasks to see it here
                </th>
              </tr>
            :
              list.map( (task)=> 
                          
                <tr key={task.abn}>
                    <th scope="row" className='p-auto'>
                        {task.name}
                    </th>
                    
                    <td>
                      <Link to={`/TaskUI/${task.id}`} className='btn btn-outline-secondary' >
                        {`>`}
                      </Link>
                    </td>
                </tr>
                )}
              
            
          </tbody>

          
        </table>

      
    </div>
  )
}

export default TasksList



            
         