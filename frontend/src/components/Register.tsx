import React, { useState } from 'react'

import { Container, Form, Button, Image } from 'react-bootstrap'
// Importerar useNavigate från react-router-dom för navigering
import { useNavigate } from 'react-router-dom'

// Definierar en funktionell komponent för registrering
const Register: React.FC = () => {
    // Definierar state variabler för email, lösenord, meddelande och registreringsläge
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isRegistering, setIsRegistering] = useState(true)
    // Använder useNavigate hook för att navigera programatiskt
    const navigate = useNavigate()

    // Hanterar formulärets submit händelse
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault() // Förhindrar standardformulärsändning
        const endpoint = isRegistering ? 'register' : 'login' // Väljer endpoint baserat på om användaren registrerar eller loggar in
        try {
            // Skickar en POST-förfrågan till servern
            const response = await fetch(`http://localhost:3000/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }) // Skickar email och lösenord i body
            })
            const data = await response.json() // Parsar svaret till JSON
            if (response.ok) {
                navigate('/store') // Navigerar till "/store" om registreringen/inloggningen lyckas
            } else {
                setMessage(data.message) // Visar felmeddelande om något går fel
            }
        } catch (error) {
            // Hanterar fel vid fetch-förfrågan
            setMessage(
                `Error ${isRegistering ? 'registering' : 'logging in'} user`
            )
        }
    }

    return (
        <Container className="d-flex flex-column align-items-center">
            {/* Visar en bild */}
            <Image src="/bild5.jpg" fluid className="mb-2" />
            {/* Formulär för registrering/inloggning */}
            <Form
                onSubmit={handleSubmit}
                className="w-50"
                style={{ marginBottom: '80px', marginTop: '50px' }}
            >
                {/* Rubrik baserat på om användaren registrerar eller loggar in */}
                <h1
                    style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        color: '#084b30'
                    }}
                >
                    {isRegistering ? 'Registrera' : 'Logga in'}
                </h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label></Form.Label>
                    {/* Inputfält för email */}
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label></Form.Label>
                    {/* Inputfält för lösenord */}
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                {/* Submit-knapp */}
                <Button
                    variant="primary"
                    type="submit"
                    style={{
                        backgroundColor: '#21553e',
                        borderColor: '#000000',
                        color: '#fbfbfb',
                        marginTop: '20px'
                    }}
                >
                    Submit
                </Button>
                {/* Visar meddelande om något fel inträffar */}
                {message && <p>{message}</p>}
            </Form>
            {/* Knapp för att växla mellan registrering och inloggning */}
            <Button
                variant="link"
                onClick={() => setIsRegistering(!isRegistering)}
                style={{ color: '#21553e', marginTop: '10px' }}
            >
                {isRegistering
                    ? 'Har du redan ett konto? Logga in'
                    : 'Ny här? Registrera'}
            </Button>
        </Container>
    )
}

export default Register
