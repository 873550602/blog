import HttpService from './httpService';
const http = HttpService.getAxios('/api');
http.defaults.withCredentials = false

// 注册
export const registry = (params: StringObj) => {
  return http.post<ResponseData>('/registry', params);
};
// 登录
export const login = (params: StringObj) => {
  return http.post<ResponseData>('/login', params);
};
// 根据id获取用户信息
export const getUserInfoById = (id: string) => {
  return http.get<ResponseData>('/users/getUserInfo/' + id)
}
// 修改密码
export const changePassword = (params: StringObj) => {
  return http.post<ResponseData>('/users/changePassword', params)
}
// 修改用户信息
export const changeUserInfo = (params: StringObj) => {
  return http.post('/users/changeInfoById', params)
}
// 保存头像
export const saveAvatar = (id: string, params: FormData) => {
  return http.post<ResponseData>('/users/saveAvatar/' + id, params)
}

// 退出登录
export const logout = (id: string) => {
  return http.get<ResponseData>('/logout/' + id)
}
// 测试接口
export const test = () => http.get('/test')
