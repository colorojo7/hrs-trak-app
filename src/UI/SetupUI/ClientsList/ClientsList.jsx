import React from 'react'
import UIheader from '../../../components/UIheader/UIheader'
import { Link } from 'react-router-dom';

const ClientsList = ( { clientsList } ) => {

  return (
    <div>
      <UIheader text="CLIENTS" />

      <div className='container mb-4 pb-1'>
        <table className='table table-striped'>
          
          <thead>
            <tr>
              <th className='fs-1' scope="col"> Name</th>
              <th className='fs-1' scope="col">Pay on</th>
            </tr>
          </thead>

          <tbody>
            
            { clientsList.map( (client)=> 
                        
                      <tr key={client.abn}>
                          <th scope="row" className='p-auto'>
                              {client.name}
                          </th>
                          <td className='p-auto'>
                              {client.payOn}
                          </td>
                          <td>
                            <Link to={`/ClientUI/${client.id}`} className='btn btn-outline-secondary' >
                              {`>`}
                            </Link>

                          </td>
                      </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ClientsList