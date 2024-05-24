import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Home from './pages/Home'
import Login from './pages/Login'
import Store from './pages/Store'
import Navbar from './components/Navbar'

function App() {
    return (
        <Router>
            <Navbar />
            <Container className="mb-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/store" element={<Store />} />
                </Routes>
            </Container>
        </Router>
    )
}

export default App
