import React from 'react';
import {Badge, Container, Nav, Navbar} from "react-bootstrap";
import {useRecoilValue} from "recoil";
import {cartTotalCnt} from "../../atom/cartState";
import useCustomLogin from "../../hooks/useCustomLogin";

function BasicMenu() {

    const {loginState, doLogout, moveToPath} = useCustomLogin();

    const cartCnt = useRecoilValue(cartTotalCnt)

    const logoutBtnHandler = () => {
        doLogout()
        alert('로그아웃 되었습니다.')
        moveToPath('/')
    }

    return (
        <Navbar className="bg-body-tertiary" sticky="top">
            <Container>
                <Navbar.Brand style={{fontSize: '1rem'}}
                              onClick={() => moveToPath('/')}>척척밥상 배곧점</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link style={{fontSize: '0.9rem'}}
                                     onClick={() => moveToPath('/list')}
                        >
                            용자크 공동구매
                        </Nav.Link>
                        <Nav.Link style={{fontSize: '0.9rem'}}
                                     onClick={() => moveToPath('/cart')}
                        >
                            장바구니&nbsp;<Badge bg="danger">{cartCnt}</Badge>
                        </Nav.Link>

                    {loginState.memberId ?
                        <>
                            <Nav.Link style={{fontSize: '0.8rem'}}
                                      onClick={() => moveToPath('/admin/add')}
                            >
                                상품 등록
                            </Nav.Link >
                            <Nav.Link style={{fontSize: '0.8rem'}}
                                      onClick={() => moveToPath('/admin/order')}
                            >
                                관리자
                            </Nav.Link>
                            <Nav.Link style={{fontSize: '0.8rem'}}
                                      onClick={logoutBtnHandler}
                            >
                                로그아웃
                            </Nav.Link>
                        </>
                        :
                        <></>
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicMenu;