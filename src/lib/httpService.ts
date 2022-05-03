import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

export default class HttpService {
  static getAxios(
    url: string,
    timeout = 10000,
    headers: AxiosRequestHeaders = {
      'Content-Type': 'application/json;charset=utf8',
    }
  ) {
    const instance = axios.create({
      baseURL: url,
      timeout,
      headers,
    });
    instance.interceptors.request.use(this.onRequest, this.onError);
    instance.interceptors.response.use(this.onResponse, this.onError);
    return instance;
  }

  private static onRequest(config: AxiosRequestConfig) {
    // do something
    debugger;
    return config;
  }

  private static onResponse(response: AxiosResponse<any, any>) {
    // do something
    debugger;
    return response;
  }

  private static onError(err: any) {
    debugger;
    return Promise.reject(err.response);
  }
}

