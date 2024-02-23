import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Analytics from '../../components/Dashboard/Analytics/Analytics'

export default function AnalyticsPage() {
  return (
    <div style={{ display: 'flex'}}>
    <Sidebar />
    <Analytics />
   </div>
  )
}

