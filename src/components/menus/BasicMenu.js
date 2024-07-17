import React from 'react';
import {Container, Navbar} from "react-bootstrap";

function BasicMenu(props) {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">척척밥상 배곧점</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        용현자이크레스트 공동구매
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicMenu;