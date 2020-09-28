import React from 'react'

interface RegistrationProps {
  children: JSX.Element | JSX.Element[],
  boxStyle?: React.CSSProperties
}

const RegistrationWrapper: React.FC<RegistrationProps> = (props) => {
  return (
    <div className='registration-screen'>
      <div className="registration-box" style={props.boxStyle || {}}>
       {props.children}
      </div>
    </div>
  )
}

export default RegistrationWrapper