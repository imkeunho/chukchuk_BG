import React, {useState} from 'react';
import useCustomLogin from "../../hooks/useCustomLogin";
import {Navigate} from "react-router-dom";
import {Button} from "react-bootstrap";

const initState = {
    memberId: '',
    pw: ''
}

function LoginComponent(props) {

    const [loginParam, setLoginParam] = useState(initState);

    const {isLogin, doLogin, moveToPath} = useCustomLogin();

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value

        setLoginParam({...loginParam})
    }

    const handleClickLogin = () => {

        console.log(loginParam)

        doLogin(loginParam).then(data => {

            if (data.error) {
                alert("아이디와 패스워드를 확인해 주세요.");
            } else {
                moveToPath("/admin/order");
            }
        });
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {isLogin ? <Navigate replace to={'/admin/order'}/> : <></>}
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
                    용자크 주문서 관리자
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Id</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                           name="memberId"
                           type={'text'}
                           value={loginParam.email}
                           onChange={handleChange}
                    ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Password</div>
                    <input className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                           name="pw"
                           type={'password'}
                           value={loginParam.pw}
                           onChange={handleChange}
                    ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full justify-center">
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                        <Button variant="primary"
                                onClick={handleClickLogin}
                        >
                            LOGIN</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;