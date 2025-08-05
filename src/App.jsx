// import { useState } from 'react'
// // import './App.css'
// import Home from './Pages/Home'
// import Signup from './Pages/Signup'
// import Login from './Pages/Login'
// import Navbar from './Components/Navbar'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// function App() {

//   return (
//     <Router>
//       <Navbar/>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path='/' element={<Home/>}/>
//       </Routes>
//     </Router>
    
//   )
// }

// export default App




// import UseMemo from "./Examples/useMemo"
import Parent from './Examples/Parent';
// import UseCallback from './Examples/UseCallback';
function App() {
    return (
      // <UseMemo/>
      // <UseCallback/>
      <Parent/>
    )
  }

 export default App