import HttpService from './httpService';
const http = HttpService.getAxios('/api');
http.defaults.withCredentials = false;

// 注册
export const registry = (params: StringObj) => {
  return http.post<ResponseData<null>>('/registry', params);
};
// 登录
export const login = (params: LoginUserForm) => {
  return http.post<ResponseData<User>>('/login', params);
};
// 根据id获取用户信息
export const getUserInfoById = (id: string) => {
  return http.get<ResponseData<null>>('/users/getUserInfo/' + id);
};
// 修改密码
export const changePassword = (params: StringObj) => {
  return http.post<ResponseData<null>>('/users/changePassword', params);
};
// 修改用户信息
export const changeUserInfo = (params: StringObj) => {
  return http.post('/users/changeInfoById', params);
};

// 关注或者取消关注某个用户
export const followUserById = (id: string) => {
  return http.get('/users/followUser/' + id);
};

// 点赞或取消点赞文章
export const likeArticleById = (id: string) => {
  return http.get('/users/likeArticle/' + id);
};
// 点赞或取消点赞评论
export const likeCommentById = (id: string) => {
  return http.get('/users/likeComment/' + id);
};

// 收藏或取消收藏文章
export const collectArticleById = (id: string) => {
  return http.get('/users/collectArticle/' + id);
};

// 文章阅读量自增
export const incrementReading = (id: string) => {
  return http.get('/article/incrementReading/' + id);
};
// 根据id获取评论
export const getCommentsById = (id: string | number) => {
  return http.post<ResponseData<Array<Comment>>>('/article/getComment/' + id);
};
// 根据id获取热评
export const getHotCommentsById = (id: string | number) => {
  return http.post<ResponseData<Array<Comment>>>('/article/getComment/' + id, {
    hot: { is: true },
  });
};

// 保存头像
export const saveAvatar = (id: string, params: FormData) => {
  return http.post<ResponseData<{ path: string }>>(
    '/users/saveAvatar/' + id,
    params
  );
};

// 退出登录
export const logout = (id: string) => {
  return http.get<ResponseData<null>>('/logout/' + id);
};
// 测试接口
export const test = () => http.get('/test');

// 创建文章
export const createArticle = (params: ArticleForm) => {
  return http.post<ResponseData<null>>('/article/create', params);
};
// 创建评论
export const createComment = (params: CommentForm) => {
  return http.post<ResponseData<null>>('/comment/create', params);
};

// 删除评论
export const deleteComment = (id: string, isSoft = true) => {
  return isSoft
    ? http.get<ResponseData<null>>('comment/deleteWithSoft/' + id)
    : http.get<ResponseData<null>>('comment/delete/' + id);
};

// 获取文章通过label
export const getArticles = (params: Page<{ label: string }>) => {
  return http.post<ResponseData<ArticlePageList>>('/article/getList', params);
};

// 通过id获取文章信息
export const getArticleById = (id: string) => {
  return http.get<ResponseData<Article>>('/article/getArticle/' + id);
};

