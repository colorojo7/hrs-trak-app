import React from 'react'

const ErrorMessage = ({message}) => {
  return (
    <p className="alert alert-danger p-1 m-2 mt-0" role="alert">{message}</p>
  )
}

export default ErrorMessage