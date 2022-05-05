declare interface ResponseData {
    code: number
    message: string
    data?: any
}

declare interface ArrayOrObject {
    [key: number]: any;
    [key: string]: any;
}

declare interface StringObj {
    [key: string]: any;
}

 declare interface User {
    id: number;
    account: string;
    labels?: string[];
    avatarUrl?: string;
    realName?: string;
    phoneNumbers?: string[];
    email?: string;
}

declare interface CurrUser {
    isLogin: boolean;
    user: User;
}


declare interface Article {
    [key: string]: any;
    id: number;
    title: string;
    subtitle: string;
    content: string;
    createTime: string;
    author: string;
    category: string;
}
