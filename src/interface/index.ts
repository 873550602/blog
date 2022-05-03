export interface Article {
  [key: string]: any;
  id: number;
  title: string;
  subtitle: string;
  content: string;
  createTime: string;
  author: string;
  category: string;
}
export interface User {
  id: number;
  account: string;
  labels: string[];
  avatarUrl?: string;
  realName?: string;
  phoneNumbers?: string[];
  email?: string;
}
export interface CurrUser {
  isLogin: boolean;
  user: User;
}

export interface ArrayOrObject {
  [key: number]: any;
  [key: string]: any;
}

export interface Obj {
  [key: string]: any;
}
