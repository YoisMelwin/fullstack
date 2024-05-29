import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

// Footer-komponent

export function Footer() {
    return (
        <div
            className="bg-white shadow-sm mt-3"
            style={{ position: 'fixed', bottom: 0, width: '100%' }}
        >
            <Container className="py-3">
                <Row className="d-flex justify-content-between">
                    <Col className="d-flex justify-content-end">
                        <NavLink
                            to="/about"
                            style={{
                                padding: '10px',
                                textDecoration: 'none',
                                color: '#494848'
                            }}
                        >
                            About us
                        </NavLink>
                        <NavLink
                            to="/contact"
                            style={{
                                padding: '10px',
                                textDecoration: 'none',
                                color: '#494848'
                            }}
                        >
                            Contact
                        </NavLink>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
