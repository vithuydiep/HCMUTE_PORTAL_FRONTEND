/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react'
// import './Button.css'

const Button = ({ classname, children, onClick }) => {
  return (
    <button
      className={classname}
      onClick={onClick}
      style={{
        backgroundColor: '#5db9ef',
        color: '#fff',
        border: '0.5px',
        borderRadius: '8px',
      }}
    >
      {children}
    </button>
  )
}
export default Button
