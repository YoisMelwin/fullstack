import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Home from './pages/Home'
import Login from './pages/Login'
import Store from './pages/Store'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { ProductsProvider } from './context/ProductsContext'

function App() {
    return (
        <ProductsProvider>
            <ShoppingCartProvider>
                <Router>
                    <Navbar />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '120vh'
                        }}
                    >
                        <Container
                            style={{ paddingBottom: '50px' }}
                            className="mb-4"
                        >
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/store" element={<Store />} />
                            </Routes>
                        </Container>
                    </div>
                    <Footer />
                </Router>
            </ShoppingCartProvider>
        </ProductsProvider>
    )
}

export default App
