import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  const [count, setCount] = useState(0)

  return (
  
    <Router>
    <Routes>
      <Route path="/" element={<Main />} />
    
    </Routes>
  </Router>
    
  )
}

export default App