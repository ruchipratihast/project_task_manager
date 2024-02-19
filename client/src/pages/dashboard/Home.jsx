import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Dashboard from '../../components/Dashboard/Dashboard'

export default function Home() {
  return (
    <div style={{ display: 'flex'}}>
    <Sidebar />
    <Dashboard />
   </div>
  )
}
