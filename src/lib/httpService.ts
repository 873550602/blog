import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import store from '@/store'
import router from '@/router'
import { Toast } from '@/main';
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
    // debugger;
    return config;
  }


  private static onResponse(response: AxiosResponse<ResponseData, any>) {
    if (response.data.code !== 0) {
      Toast.error(response.data.message)
      return;
    }
    return response;
  }

  private static onError(err: any) {
    debugger;
    if (err.response.status === 401) {
      // 用户没有登录或登录权限过期
      store.dispatch("logout")
      router.push({ name: 'login' })
    }
    return Promise.reject(err.response);
  }
}

