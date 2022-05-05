import HttpService from './httpService';
const http = HttpService.getAxios('/api');
http.defaults.withCredentials = false

// 注册
export const registry = (params: StringObj) => {
  return http.post('/registry', params);
};
// 登录
export const login = (params: StringObj) => {
  return http.post('/login', params);
};
// 修改密码
export const changePassword = (params: StringObj) => {
  return http.post('/users/changePassword', params)
}
// 测试接口
export const test = () => http.get('/test')
