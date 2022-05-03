import axios from 'axios';
export default class HttpService {
    static getAxios(url, timeout = 10000, headers = {
        'Content-Type': 'application/json;charset=utf8',
    }) {
        const instance = axios.create({
            baseURL: url,
            timeout,
            headers,
        });
        instance.interceptors.request.use(this.onRequest, this.onError);
        instance.interceptors.response.use(this.onResponse, this.onError);
        return instance;
    }
    static onRequest(config) {
        // do something
        debugger;
        return config;
    }
    static onResponse(response) {
        // do something
        debugger;
        return response;
    }
    static onError(err) {
        debugger;
        return Promise.reject(err.response);
    }
}
//# sourceMappingURL=httpService.js.map