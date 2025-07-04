import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './layoutComponents/Navbar'

function App() {

  return (
    <>
      <div className='w-full m-auto'>
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}

export default App
