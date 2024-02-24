import React from 'react'
import LeftContainerComponent from '../../components/Auth/LeftContainer/LeftContainerComponent'
import LoginComonent from '../../components/Auth/LoginComonent'

export default function LoginPage() {
  return (
    <div style={{ display: 'flex' }}>
      <LeftContainerComponent />
      <LoginComonent />
    </div>
  )
}


