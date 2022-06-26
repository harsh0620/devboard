import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  // REGISTER_USER_BEGIN,
  // REGISTER_USER_SUCCESS,
  // REGISTER_USER_ERROR,
  // LOGIN_USER_BEGIN,
  // LOGIN_USER_SUCCESS,
  // LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  CREATE_TODO_BEGIN,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_ERROR,
  GET_TODO_BEGIN,
  GET_TODO_SUCCESS,
  CLEAR_TODO_VALUES,
  EDIT_TODO_BEGIN,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_ERROR,
  SET_EDIT_TODO,
  DELETE_TODO_BEGIN,
  CREATE_LOG_BEGIN,
  CREATE_LOG_SUCCESS,
  CREATE_LOG_ERROR,
  GET_LOGS_BEGIN,
  GET_LOGS_SUCCESS,
  SET_EDIT_LOG,
  DELETE_LOG_BEGIN,
  EDIT_LOG_BEGIN,
  EDIT_LOG_SUCCESS,
  EDIT_LOG_ERROR,
  CLEAR_LOG_VALUES,
  RESET_TIMERS,
  START_TIMER,
  INCREASE_BREAK_VALUE,
  INCREASE_SESSION_VALUE,
  DECREASE_BREAK_VALUE,
  DECREASE_SESSION_VALUE,
  TOGGLE_ISBUSY_INDICATOR,
  TOGGLE_TIMER_LABEL,
  CREATE_BOOKMARK_BEGIN,
  CREATE_BOOKMARK_SUCCESS,
  CREATE_BOOKMARK_ERROR,
  GET_BOOKMARK_BEGIN,
  GET_BOOKMARK_SUCCESS,
  SET_EDIT_BOOKMARK,
  DELETE_BOOKMARK_BEGIN,
  CLEAR_BOOKMARK_VALUES,
  EDIT_BOOKMARK_BEGIN,
  EDIT_BOOKMARK_SUCCESS,
  EDIT_BOOKMARK_ERROR,
} from "./actions";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  todoLength: "",
  todoCompletedLength: "",
  todos: [],
  contentTodo: "",
  isTodoEditing: "",
  editTodoId: "",
  logs: [],
  contentLog: "",
  isLogEditing: "",
  editLogId: "",
  timerLabel: "Session",
  busyIndicator: false,
  breakValue: 10,
  sessionValue: 50,
  timerValue: 3000,
  bookmarks: [],
  contentBookMark: "",
  bookMarkLink: "",
  isBookMarkEditing: "",
  editBookMarkId: "",
  contributions: [],
  bookMarksData: [],
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // response interceptor
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };
  // const registerUser = async (currentUser) => {
  //   dispatch({ type: REGISTER_USER_BEGIN });
  //   try {
  //     const response = await axios.post("/api/v1/auth/register", currentUser);
  //     console.log(response);
  //     const { user, token, location } = response.data;
  //     dispatch({
  //       type: REGISTER_USER_SUCCESS,
  //       payload: {
  //         user,
  //         token,
  //         location,
  //       },
  //     });

  //     addUserToLocalStorage({
  //       user,
  //       token,
  //       location,
  //     });
  //   } catch (error) {
  //     console.log(error.response);
  //     dispatch({
  //       type: REGISTER_USER_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // };
  // const loginUser = async (currentUser) => {
  //   dispatch({ type: LOGIN_USER_BEGIN });
  //   try {
  //     const { data } = await axios.post("/api/v1/auth/login", currentUser);
  //     const { user, token, location } = data;

  //     dispatch({
  //       type: LOGIN_USER_SUCCESS,
  //       payload: { user, token, location },
  //     });

  //     addUserToLocalStorage({ user, token, location });
  //   } catch (error) {
  //     dispatch({
  //       type: LOGIN_USER_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // };
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      // no token
      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });

      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.post("/jobs", {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: CREATE_JOB_SUCCESS,
      });
      // call function instead clearValues()
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const getJobs = async () => {
    // will add page later
    const { search, searchStatus, searchType, sort } = state;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: EDIT_JOB_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
          todoLength: data.todoLength,
          todoCompletedLength: data.todoCompletedLength,
          bookmarks: data.bookmarks,
          contributions: data.contributions,
          bookMarksData: data.bookMarksData,
        },
      });
    } catch (error) {
      logoutUser();
    }

    clearAlert();
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  const createTodo = async () => {
    dispatch({ type: CREATE_TODO_BEGIN });
    try {
      const { contentTodo } = state;
      await authFetch.post("/todos", {
        contentTodo,
      });
      getAllTodos();
      dispatch({
        type: CREATE_TODO_SUCCESS,
      });
      // call function instead clearValues()
      dispatch({ type: CLEAR_TODO_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_TODO_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const getAllTodos = async () => {
    dispatch({ type: GET_TODO_BEGIN });
    try {
      const { data } = await authFetch("/todos");
      const { todos } = data;
      dispatch({
        type: GET_TODO_SUCCESS,
        payload: {
          todos,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const setEditTodo = (id) => {
    dispatch({ type: SET_EDIT_TODO, payload: { id } });
  };
  const editTodo = async (id) => {
    dispatch({ type: EDIT_TODO_BEGIN });
    try {
      await authFetch.patch(`/todos/${id}`);
      getAllTodos();
      dispatch({
        type: EDIT_TODO_SUCCESS,
      });
      dispatch({ type: CLEAR_TODO_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_TODO_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteTodo = async (todoId) => {
    dispatch({ type: DELETE_TODO_BEGIN });
    try {
      await authFetch.delete(`/todos/${todoId}`);
      getAllTodos();
    } catch (error) {
      logoutUser();
    }
  };
  const createLog = async () => {
    dispatch({ type: CREATE_LOG_BEGIN });
    try {
      const { contentLog } = state;

      await authFetch.post("/logs", {
        contentLog,
      });
      getLogs();
      dispatch({
        type: CREATE_LOG_SUCCESS,
      });
      // call function instead clearValues()
      dispatch({ type: CLEAR_LOG_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_LOG_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const getLogs = async () => {
    dispatch({ type: GET_LOGS_BEGIN });
    try {
      const { data } = await authFetch("/logs");
      const { logs } = data;
      dispatch({
        type: GET_LOGS_SUCCESS,
        payload: {
          logs,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const setEditLog = (id) => {
    dispatch({ type: SET_EDIT_LOG, payload: { id } });
  };
  const editLog = async () => {
    dispatch({ type: EDIT_LOG_BEGIN });
    try {
      const { contentLog } = state;

      await authFetch.patch(`/logs/${state.editLogId}`, {
        contentLog,
      });
      getLogs();
      dispatch({
        type: EDIT_LOG_SUCCESS,
      });
      dispatch({ type: CLEAR_LOG_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_LOG_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteLog = async (logId) => {
    dispatch({ type: DELETE_LOG_BEGIN });
    try {
      await authFetch.delete(`/logs/${logId}`);
      getLogs();
    } catch (error) {
      logoutUser();
    }
  };
  const clockValue = () => {
    const { timerValue } = state;

    let minutes = Math.floor(timerValue / 60);
    let seconds = timerValue - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  };
  const handleReset = () => {
    dispatch({
      ...state,
      type: RESET_TIMERS,
    });
    // audioSoundRef.current.pause();
    // audioSoundRef.current.time = 0;
  };

  const handlePlayPause = () => {
    dispatch({
      ...state,
      type: TOGGLE_ISBUSY_INDICATOR,
      busyIndicator: !state.busyIndicator,
    });
  };

  const handleCount = () => {
    const { timerValue, timerLabel, breakValue, sessionValue } = state;
    dispatch({
      ...state,
      type: START_TIMER,
      timerValue: timerValue - 1,
    });
    // if (timerValue === 0) audioSoundRef.current.play();
    if (timerValue < 0) {
      if (timerLabel === "Session") {
        dispatch({
          ...state,
          type: TOGGLE_TIMER_LABEL,
          timerLabel: "Break",
        });
        dispatch({
          ...state,
          type: START_TIMER,
          timerValue: breakValue * 60 - 1,
        });
      } else {
        dispatch({
          ...state,
          type: TOGGLE_TIMER_LABEL,
          timerLabel: "Session",
        });
        dispatch({
          ...state,
          type: START_TIMER,
          timerValue: sessionValue * 60 - 1,
        });
      }
    }
  };
  const handleBreakDecrement = () => {
    const { breakValue } = state;
    dispatch({
      ...state,
      type: DECREASE_BREAK_VALUE,
      breakValue: breakValue - 1,
    });
  };
  const handleBreakIncrement = () => {
    const { breakValue } = state;
    dispatch({
      ...state,
      type: INCREASE_BREAK_VALUE,
      breakValue: breakValue + 1,
    });
  };
  const handleSessionDecrement = () => {
    const { sessionValue } = state;
    dispatch({
      ...state,
      type: DECREASE_SESSION_VALUE,
      sessionValue: sessionValue - 1,
      timerValue: (sessionValue - 1) * 60,
    });
  };
  const handleSessionIncrement = () => {
    const { sessionValue } = state;
    dispatch({
      ...state,
      type: INCREASE_SESSION_VALUE,
      sessionValue: sessionValue + 1,
      timerValue: (sessionValue + 1) * 60,
    });
  };
  const createBookMark = async () => {
    dispatch({ type: CREATE_BOOKMARK_BEGIN });
    try {
      const { contentBookMark, bookMarkLink } = state;

      await authFetch.post("/bookmarks", {
        contentBookMark,
        bookMarkLink,
      });
      getBookMarks();
      showStats();
      dispatch({
        type: CREATE_BOOKMARK_SUCCESS,
      });
      // call function instead clearValues()
      dispatch({ type: CLEAR_BOOKMARK_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_BOOKMARK_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const getBookMarks = async () => {
    dispatch({ type: GET_BOOKMARK_BEGIN });
    try {
      const { data } = await authFetch("/bookmarks");
      const { BookMarks } = data;
      dispatch({
        type: GET_BOOKMARK_SUCCESS,
        payload: {
          BookMarks,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const setEditBookMark = (id) => {
    dispatch({ type: SET_EDIT_BOOKMARK, payload: { id } });
  };
  const editBookMark = async () => {
    dispatch({ type: EDIT_BOOKMARK_BEGIN });
    try {
      const { contentBookMark, bookMarkLink } = state;

      await authFetch.patch(`/bookmarks/${state.editBookMarkId}`, {
        contentBookMark,
        bookMarkLink,
      });
      getBookMarks();
      showStats();
      dispatch({
        type: EDIT_BOOKMARK_SUCCESS,
      });
      dispatch({ type: CLEAR_BOOKMARK_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_BOOKMARK_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteBookMark = async (bookMarkId) => {
    dispatch({ type: DELETE_BOOKMARK_BEGIN });
    try {
      await authFetch.delete(`/bookmarks/${bookMarkId}`);
      getBookMarks();
      showStats();
    } catch (error) {
      logoutUser();
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        // registerUser,
        // loginUser,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        editJob,
        deleteJob,
        showStats,
        clearFilters,
        changePage,
        createTodo,
        getAllTodos,
        setEditTodo,
        editTodo,
        deleteTodo,
        createLog,
        getLogs,
        deleteLog,
        setEditLog,
        editLog,
        clockValue,
        handleReset,
        handleCount,
        handlePlayPause,
        handleBreakDecrement,
        handleBreakIncrement,
        handleSessionDecrement,
        handleSessionIncrement,
        state,
        dispatch,
        setEditBookMark,
        deleteBookMark,
        createBookMark,
        getBookMarks,
        editBookMark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
