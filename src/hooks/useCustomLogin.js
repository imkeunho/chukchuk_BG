import {useRecoilState, useResetRecoilState} from "recoil";
import {signInState} from "../atom/signInState";
import {createSearchParams, Navigate, useNavigate} from "react-router-dom";
import {removeCookie, setCookie} from "../util/cookieUtil";
import {loginPost} from "../api/memberApi";

const useCustomLogin = () => {

    const [loginState, setLoginState] = useRecoilState(signInState)

    const resetState = useResetRecoilState(signInState)

    const navigate = useNavigate()

    const isLogin = !!loginState.memberId

    const doLogin = async (loginParam) => { //----------로그인 함수

        const result = await loginPost(loginParam);

        saveAsCookie(result);

        return result;

    }

    const saveAsCookie = (data) => {
        setCookie('member', JSON.stringify(data), 1);
        setLoginState(data);
    }

    const doLogout = () => { //---------------로그아웃 함수
        removeCookie('member');
        resetState();
    }

    const moveToPath = (path) => { //----------------페이지 이동
        navigate({pathname: path}, {replace:true})
    }

    const moveToLogin = () => { //----------------------로그인 페이지로 이동
        navigate({pathname: '/admin/login'}, {replace:true})
    }

    const moveToLoginReturn = () => { //--------로그인 페이지로 이동 컴포넌트
        return <Navigate replace to="/admin/login"/>
    }

    const exceptionHandle = (ex) => {

        console.log("Exception--------");
        console.log(ex);

        const errorMsg = ex.response.data.error
        const errorStr = createSearchParams({error: errorMsg}).toString()

        if (errorMsg === 'REQUIRE_LOGIN') {

            alert("로그인 해야만 합니다.");
            navigate({pathname:'/admin/login' , search: errorStr});

        } else if (errorMsg === 'ERROR_ACCESS-DENIED') {

            alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
            navigate({pathname:'/admin/login' , search: errorStr});
        }
    }

    return {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn, exceptionHandle}
}

export default useCustomLogin