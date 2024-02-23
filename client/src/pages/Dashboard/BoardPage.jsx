import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Board from '../../components/Dashboard/Board/Board'

export default function BoardPage() {
  return (
    <div style={{ display: 'flex'}}>
    <Sidebar />
    <Board />
   </div>
  )
}
