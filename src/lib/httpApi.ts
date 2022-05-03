import { Obj } from '@/interface';
import HttpService from './httpService';
const http = HttpService.getAxios('/api');

export const registry = (url: string, params: Obj) => {
  return http.post(url, params);
};

