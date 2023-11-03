import {  HashRouter, Navigate, Route, Routes } from 'react-router-dom'

//Context
import { UserContextProvider } from './context/Context'

// Components
import NavBar from './components/NavBar/NavBar'

// UI
import BaseUI from './UI/BaseUI/BaseUI'

import ShiftsUI from './UI/ShiftsUI/ShiftsUI'
  import ShiftFormUI from './UI/ShiftsUI/ShiftFormUI/ShiftFormUI'

import InvoicesUI from './UI/InvoicesUI/InvoicesUI'
  import InvoiceForm from './UI/InvoicesUI/InvoiceForm/InvoiceForm'

import SetupUI from './UI/SetupUI/SetupUI'
  import ClientFormUI from './UI/SetupUI/ClientFormUI/ClientFormUI'
  import ClientUI from './UI/SetupUI/ClientsList/ClientUI/ClientUI'
    import TaskFormUI from './UI/SetupUI/TaskFormUI/TaskFormUI'
    import TasksListUI from './UI/SetupUI/TasksList/TasksList'
import TaskUI from './UI/SetupUI/TasksList/TaskUI/TaskUI'

//import { AppContextProvider } from './context/context'


function App() {

  return (
    <HashRouter>
      <UserContextProvider>


          <NavBar />

          <div className='mb-5 screen'>

            <Routes>

              <Route path="/" element={<BaseUI/>} />

              <Route path="/ShiftFormUI" element={<ShiftFormUI/>} />
              <Route path="/ShiftsUI" element={<ShiftsUI/>} />

              <Route path="/SetupUI" element={<SetupUI/>} />

              <Route path="/ClientFormUI" element={<ClientFormUI/>} />
              <Route path="/ClientUI/:abn" element={<ClientUI/>} />
              <Route path="/TaskFormUI" element={<TaskFormUI/>} />
              <Route path="/TasksListUI" element={<TasksListUI/>} />
              <Route path="/TaskUI/:taskId" element={<TaskUI/>} />
              
              <Route path="/InvoiceForm" element={<InvoiceForm/>} />
              <Route path="/InvoicesUI" element={<InvoicesUI/>} />

              <Route path="*" element={<Navigate to="/" />}/>

            </Routes>

          </div>

      </UserContextProvider>
      </HashRouter>

    
  )
}

export default App
