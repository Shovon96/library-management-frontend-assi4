import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './layoutComponents/Navbar'
import Footer from './layoutComponents/Footer'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <Toaster />
      <div className='w-full m-auto'>
        <Navbar />
        <div className='min-h-[70vh]'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
