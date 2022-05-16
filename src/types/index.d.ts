declare interface ResponseData<T> {
    code: number
    message: string
    data?: T
}

declare interface Page<T> {
    curr: number,
    rows: number,
    object: T
}
declare interface PageResponse<T> {
    total: number,
    list: T[]
}

declare interface ArrayOrObject {
    [key: number]: any;
    [key: string]: any;
}

declare interface StringObj {
    [key: string]: any;
}

declare interface LoginUserForm {
    account: string
    password: string
}

declare interface User {
    id: string
    password?: string
    account: string
    labels?: string[]
    avatar?: string
    realName?: string
    phoneNumbers?: string[]
    email?: string
    follows?: string[]
    followeds?: string[]
    likes?: string[]
    sex?: 0 | 1
    age?: number
}

declare interface CurrUser {
    isLogin: boolean;
    user: User;
}

declare interface ArticleForm {
    content: string
    title: string
    summary: string
    label: string
}
declare interface Article extends ArticleForm {
    id: string
    createTime: number
    author: string
    reading?: number
    collectionVolume?: number
    commentVolume?: number
    likeds?: number
}

declare interface ArticlePageList extends PageResponse<Article> { }