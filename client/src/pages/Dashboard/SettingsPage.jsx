import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Settings from '../../components/Dashboard/Settings/Settings'

export default function SettingsPage() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Settings />
    </div>
  )
}
