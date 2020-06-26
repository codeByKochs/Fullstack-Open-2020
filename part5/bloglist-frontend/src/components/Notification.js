import React from 'react'

const errorMessageStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px'
}

const successMessageStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px'
}

const Notification = ({ message, messageType }) =>
{
  if (message === null)
  {
    return null
  }

  switch (messageType) {
  case 'errorMessage':
    return <div className={messageType} style={errorMessageStyle}> {message}</div>
  case 'successMessage':
    return <div className={messageType} style={successMessageStyle}> {message}</div>
  default:
    return null
  }
}


export default Notification