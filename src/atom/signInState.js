import {getCookie} from "../util/cookieUtil";
import {atom} from "recoil";

const initState = {
    memberId: '',
    name: '',
    accessToken: '',
    refreshToken: ''
}

const loadMemberCookie = () => {

    const memberInfo = getCookie('member');

    //닉네임 처리
    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
    }

    return memberInfo;
}

export const signInState = atom({
    key: 'signInState',
    default: loadMemberCookie() || initState
})