import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Lecture from './pages/Lecture'
function App() {
 
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/lecture' element={<Lecture/>} />
        
       </Routes>
    </>
  )
}

export default App
