import axios, { AxiosError } from "axios"

const baseURL = 'http://127.0.0.1:8000/api/';
// const baseURL = 'https://777abat777.pythonanywhere.com/api/';

export const instanse = axios.create({
   baseURL: baseURL,
   timeout: 5000,
   headers: {
      Authorization: localStorage.getItem('access_token')
         ? 'JWT ' + localStorage.getItem('access_token')
         : null,
      'Content-Type': 'application/json',
      accept: 'application/json',
   },
});


instanse.interceptors.response.use(
   (response) => {
      return response;
   },
   async function (error) {
      const originalRequest = error.config;

      if (typeof error.response === 'undefined') {
         alert(
            'A server/network error occurred. ' +
            'Looks like CORS might be the problem. ' +
            'Sorry about this - we will get it fixed shortly.'
         );
         return Promise.reject(error);
      }

      if (
         error.response.status === 401 &&
         originalRequest.url === baseURL + 'token/refresh/'
      ) {
         window.location.href = '/login/';
         return Promise.reject(error);
      }

      if (
         error.response.data.code === 'token_not_valid' &&
         error.response.status === 401 &&
         error.response.statusText === 'Unauthorized'
      ) {
         const refreshToken = localStorage.getItem('refresh_token');

         if (refreshToken) {
            const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

            // exp date in token is expressed in seconds, while now() returns milliseconds:
            const now = Math.ceil(Date.now() / 1000);
            console.log(tokenParts.exp);

            if (tokenParts.exp > now) {
               return instanse
                  .post('/token/refresh/', { refresh: refreshToken })
                  .then((response) => {
                     localStorage.setItem('access_token', response.data.access);
                     localStorage.setItem('refresh_token', response.data.refresh);

                     instanse.defaults.headers['Authorization'] =
                        'JWT ' + response.data.access;
                     originalRequest.headers['Authorization'] =
                        'JWT ' + response.data.access;

                     return instanse(originalRequest);
                  })
                  .catch((err) => {
                     console.log(err);
                  });
            } else {
               console.log('Refresh token is expired', tokenParts.exp, now);
               window.location.href = '/login/';
            }
         } else {
            console.log('Refresh token not available.');
            window.location.href = '/login/';
         }
      }

      // specific error handling done elsewhere
      return Promise.reject(error);
   }
);


export const postApi = {
   async getPosts() {
      try {
         const response = await (instanse.get(`posts`))
         return response
      } catch (error) {
         return error
      }
   },
   async getPost(slug: string | undefined) {
      try {
         const response = await (instanse.get(`posts/${slug}`))
         return response
      } catch (error) {
         return error
      }
   },
   async addPost(title: string, author: string | number, excerpt: string, content: string, status = "published", slug = title, category: "new" | "best" | "hot") {
      const responce = await (instanse.post(`posts/`, { title, author, excerpt, content, status, slug, category }))
      return responce
   },
   async deletePost(slug: string) {
      const responce = await (instanse.delete(`posts/${slug}`))
      return responce
   }

}

export const userApi = {
   async register(email: string, user_name: string, password: string | number) {
      const response = await (instanse.post(`user/register/`, { email, user_name, password }));
      return response.data;
   },
   async login(email: string, password: string | number) {
      try {
         const response = await (instanse.post(`token/`, { email, password }))
         return response
      } catch (error) {
         return error
      }
   },
   async logout() {
      const response = await (instanse.post(`user/logout/blacklist/`, {
         refresh_token: localStorage.getItem('refresh_token'),
      }))
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      instanse.defaults.headers['Authorization'] = null;
      return response.data
   },
}