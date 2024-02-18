import React from 'react'
import LeftContainerComponent from '../../components/Auth/LeftContainer/LeftContainerComponent'
import RegisterComponent from '../../components/Auth/RegisterComponent'

export default function RegisterPage() {
  return (
    <div style={{ display: 'flex'}}>
    <LeftContainerComponent />
    <RegisterComponent />
   </div>
  )
}

