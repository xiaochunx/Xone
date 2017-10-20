let base = '';

export const requestLogin = params => { return this.$http.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return this.$http.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return this.$http.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return this.$http.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return this.$http.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return this.$http.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return this.$http.get(`${base}/user/add`, { params: params }); };
