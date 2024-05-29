// src/components/Register.tsx
import React, { useState } from 'react'
import { Container, Form, Button, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// Register-komponent

const Register: React.FC = () => {
    const [email, setEmail] = useState('') // State för email
    const [password, setPassword] = useState('') // State för lösenord
    const [message, setMessage] = useState('') // State för meddelanden
    const navigate = useNavigate() // Hook för navigering

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }) // Skickar email och lösenord som JSON
            })
            const data = await response.json() // Uppdaterad för att läsa JSON-svar
            if (response.ok) {
                navigate('/store') // Navigerar till Store vid lyckad registrering
            } else {
                setMessage(data.message) // Sätter felmeddelande vid misslyckad registrering
            }
        } catch (error) {
            setMessage('Error registering user') // Sätter felmeddelande vid serverfel
        }
    }

    return (
        <Container className="d-flex flex-column align-items-center">
            <Image src="/bild5.jpg" fluid className="mb-2" />

            <Form
                onSubmit={handleSubmit}
                className="w-50"
                style={{ marginBottom: '80px', marginTop: '50px' }}
            >
                <h1
                    style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        color: '#084b30'
                    }}
                >
                    Logga in
                </h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label></Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label></Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    style={{
                        backgroundColor: '#21553e',
                        borderColor: '#000000',
                        color: '#fbfbfb',
                        marginTop: '30px'
                    }}
                >
                    Submit
                </Button>
                {message && <p>{message}</p>}
            </Form>
        </Container>
    )
}

export default Register
