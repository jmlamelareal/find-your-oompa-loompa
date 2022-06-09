import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './layouts/Header'
import Detail from './pages/Detail'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oompa-loompa/:id" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
