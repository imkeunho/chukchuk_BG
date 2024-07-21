import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

function BasicMenu(props) {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link to={'/'}>척척밥상 배곧점</Link></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Link to={'/order'}>용현자이크레스트 공동구매</Link>
                    </Navbar.Text>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Navbar.Text>
                        <Link to={'/item'}>상품 등록</Link>
                    </Navbar.Text>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Navbar.Text>
                        <Link to={'/admin'}>관리자</Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicMenu;