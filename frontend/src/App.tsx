import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Home from './pages/Home'
import Login from './pages/Login'
import Store from './pages/Store'
import  Navbar  from './components/Navbar'

function App() {
    return (
        <>
            <Navbar />
            <Container className="mb-4">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/store" element={<Store />} />
                    </Routes>
                </Router>
            </Container>
        </>
    )
}

export default App
