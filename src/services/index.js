import { get, post } from '../utils/request';
import baseUrl from "../config/config";

const url = baseUrl + '/userService';

export function getUserInfo(params) {
    const requestUrl = url + "/userInfo?type=" + params;
    return get(requestUrl, params);
}

export function editUserInfo(params) {
    const requestUrl = url + "/editUserInfo";
    return post(requestUrl, params);
}
