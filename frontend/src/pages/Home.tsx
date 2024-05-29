// src/pages/Home.tsx
// src/pages/Home.tsx
import React from 'react'
import Register from '../components/Register'

const Home = () => {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '50px'
    }

    const titleStyle: React.CSSProperties = {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#084b30'
    }

    const subtitleStyle: React.CSSProperties = {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '1.5rem',
        fontWeight: 400,
        marginBottom: '40px',
        color: '#555'
    }

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Upptäck våra exklusiva tyger</h1>
            <p style={subtitleStyle}>
                Logga in nedan för att få tillgång till vårt fantastiska urval!
            </p>
            <Register />
        </div>
    )
}

export default Home
