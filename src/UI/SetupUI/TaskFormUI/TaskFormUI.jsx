import React from 'react'
import UIheader from '../../../components/UIheader/UIheader'
import TaskForm from './TaskForm/TaskForm'

const TaskFormUI = () => {
  
  return (
    <div>
      <UIheader text='TASK FORM'/>
      <div className='container'>
        <TaskForm/>
      </div>
    </div>
  )
}

export default TaskFormUI