import HttpService from './httpService';
const http = HttpService.getAxios('/api');
export const registry = (url, params) => {
    return http.post(url, params);
};
//# sourceMappingURL=httpApi.js.map