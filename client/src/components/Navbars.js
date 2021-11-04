import React from "react"
import { Navbar, Nav } from 'react-bootstrap'

export default function Navbars() {
    return (
        <Navbar className="navbar" variant="light" bg="light" expand="lg" fixed="top">
            <Navbar.Brand href="/">
                <img
                    src="logo.JPG"
                    width="100"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">About</Nav.Link>
                    <Nav.Link href="/program">Programs</Nav.Link>
                    <Nav.Link href="/calendar">Calendar</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}