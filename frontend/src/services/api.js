import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  function onfulfilled(response) {
    return response;
  },
  function onRejected(error) {
    if (error.response.status == 401) {
      console.log("Session Expired");
    }
    return Promise.reject(error);
  },
);

const api = {
  // Auth
  signup: (data) => {
    return apiClient.post("/signup", data);
  },

  login: (data) => {
    return apiClient.post("/login", data);
  },

  oauth:()=>{
    return apiClient.get('/auth/google')
  },

  getCurrentUser: () => {
    return apiClient.get("/getInfo");
  },

  /* Profile Routes */

  getProfile: () => {
    return apiClient.get("/profile/me");
  },

  updateProfile: (username, email, github, bio, website, isPublic) => {
    const data = {
      username,
      email,
      github,
      bio,
      website,
      isPublic,
    };

    return apiClient.patch('/profile/me/update', data)
  },

  /* Session Routes */

  startSession: (projectId, tag) => {
    const data = {
        projectId, 
        tag
    }

    return apiClient.post('/session/start', data);
  },

  currentSessionInfo:()=>{
    return apiClient.get('/session/active');
  },

  sessionHistory: ()=>{
    return apiClient.get('/session/history');
  },

};

export default api;