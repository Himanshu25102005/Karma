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
    if (error.response?.status === 401) {
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

  oauth: () => {
    return apiClient.get("/auth/google");
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

    return apiClient.patch("/profile/me/update", data);
  },

  getPublicProfile: (username) => {
    return apiClient.get(`/profile/${username}`);
  },

  /* Session Routes */

  startSession: (projectId, type) => {
    const data = {
      projectId,
      type,
    };

    return apiClient.post("/session/start", data);
  },

  endSession: (userId) => {
    return apiClient.patch(`/session/stop/${userId}`);
  },

  currentSessionInfo: () => {
    return apiClient.get("/session/active");
  },

  sessionHistory: () => {
    return apiClient.get("/session/history");
  },

  weeklySessionHistogramData: () => {
    return apiClient.get("/session/histogram/data/weekly");
  },

  monthlySessionHistogramData: () => {
    return apiClient.get("/session/histogram/data/monthly");
  },

  heatmapData: () => {
    return apiClient.get("/session/heatmapData");
  },

  /* Project Routes */

  getAllProjects: () => {
    return apiClient.get("/project");
  },

  getCurrentProjectInfo: (projectId) => {
    return apiClient.get(`/project/${projectId}`);
  },

  createProject: (data) => {
    return apiClient.post("/project/create", data);
  },

  updateProject: (projectId, data) => {
    return apiClient.patch(`/project/update/${projectId}`, data);
  },

  mostActiveProject: () => {
    return apiClient.get("/project/mostActive");
  },

  getAllTask: (projectId, data) => {
    return apiClient.get(`/project/tasks/${projectId}`, data);
  },

  addNewTask: (projectId, description) => {
    return apiClient.post(`/project/AddTask/${projectId}`, description);
  },

  completeTask: (taskid) => {
    return apiClient.patch(`/project/checkTask/${taskid}`);
  },

  delTask: (taskId, projectId) => {
    return apiClient.delete(`/project/DeleteTask/${taskId}/${projectId}`);
  },

  projectPiechart: () => {
    return apiClient.get("/project/piechart");
  },

  /* Stats Route */
  overview: () => {
    return apiClient.get("/stats/overview");
  },

  getStreak: () => {
    return apiClient.get("stats/streak");
  },
};

export default api;
