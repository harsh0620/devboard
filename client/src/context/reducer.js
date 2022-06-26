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
import { initialState } from "./appContext";
const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  // if (action.type === REGISTER_USER_BEGIN) {
  //   return { ...state, isLoading: true };
  // }
  // if (action.type === REGISTER_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     user: action.payload.user,
  //     token: action.payload.token,
  //     userLocation: action.payload.location,
  //     jobLocation: action.payload.location,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "User Created! Redirecting...",
  //   };
  // }
  // if (action.type === REGISTER_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }
  // if (action.type === LOGIN_USER_BEGIN) {
  //   return {
  //     ...state,
  //     isLoading: true,
  //   };
  // }
  // if (action.type === LOGIN_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     user: action.payload.user,
  //     token: action.payload.token,
  //     userLocation: action.payload.location,
  //     jobLocation: action.payload.location,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "Login Successful! Redirecting...",
  //   };
  // }
  // if (action.type === LOGIN_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }
  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, showSidebar: !state.showSidebar };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: "",
      jobLocation: "",
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    // set back to first page

    return { ...state, page: 1, [action.payload.name]: action.payload.value };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userLocation,
      jobType: "full-time",
      status: "pending",
    };
    return { ...state, ...initialState };
  }
  if (action.type === CLEAR_TODO_VALUES) {
    const initialState = {
      isTodoEditing: false,
      editTodoId: "",
      contentTodo: "",
    };
    return { ...state, ...initialState };
  }
  if (action.type === CREATE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Job Created!",
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_JOBS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === SET_EDIT_JOB) {
    const job = state.jobs.find((job) => job._id === action.payload.id);
    const { _id, position, company, jobLocation, jobType, status } = job;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      jobLocation,
      jobType,
      status,
    };
  }
  if (action.type === DELETE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Job Updated!",
    };
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
      todoLength: action.payload.todoLength,
      todoCompletedLength: action.payload.todoCompletedLength,
      bookmarks: action.payload.bookmarks,
      contributions: action.payload.contributions,
      bookMarksData: action.payload.bookMarksData,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  if (action.type === CREATE_TODO_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_TODO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Todo Created!",
    };
  }
  if (action.type === CREATE_TODO_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_TODO_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_TODO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      todos: action.payload.todos,
    };
  }
  if (action.type === SET_EDIT_TODO) {
    const todo = state.todos.find((todo) => todo._id === action.payload.id);
    const { _id } = todo;
    return {
      ...state,
      editTodoId: _id,
    };
  }
  if (action.type === EDIT_TODO_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_TODO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Todo Updated!",
    };
  }
  if (action.type === EDIT_TODO_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_TODO_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_LOG_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_LOG_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Log Created!",
    };
  }
  if (action.type === CREATE_LOG_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_LOGS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_LOGS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      logs: action.payload.logs,
    };
  }
  if (action.type === SET_EDIT_LOG) {
    const log = state.logs.find((log) => log._id === action.payload.id);
    const { _id, contentLog } = log;
    return {
      ...state,
      isLogEditing: true,
      editLogId: _id,
      contentLog,
    };
  }
  if (action.type === DELETE_LOG_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_LOG_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_LOG_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Log Updated!",
    };
  }
  if (action.type === EDIT_LOG_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CLEAR_LOG_VALUES) {
    const initialState = {
      isLogEditing: false,
      editJobId: "",
      contentLog: "",
    };
    return { ...state, ...initialState };
  }

  if (action.type === INCREASE_BREAK_VALUE) {
    return {
      ...state,
      breakValue: action.breakValue,
    };
  }
  if (action.type === DECREASE_BREAK_VALUE) {
    return {
      ...state,
      breakValue: action.breakValue,
    };
  }
  if (action.type === INCREASE_SESSION_VALUE) {
    return {
      ...state,
      sessionValue: action.sessionValue,
      timerValue: action.timerValue,
    };
  }
  if (action.type === DECREASE_SESSION_VALUE) {
    return {
      ...state,
      sessionValue: action.sessionValue,
      timerValue: action.timerValue,
    };
  }
  if (action.type === TOGGLE_ISBUSY_INDICATOR) {
    return {
      ...state,
      busyIndicator: action.busyIndicator,
    };
  }
  if (action.type === TOGGLE_TIMER_LABEL) {
    return {
      ...state,
      timerLabel: action.timerLabel,
    };
  }
  if (action.type === START_TIMER) {
    return {
      ...state,
      timerValue: action.timerValue,
    };
  }
  if (action.type === RESET_TIMERS) {
    return initialState;
  }
  if (action.type === CREATE_BOOKMARK_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_BOOKMARK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New BookMark Created!",
    };
  }
  if (action.type === CREATE_BOOKMARK_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_BOOKMARK_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_BOOKMARK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      bookmarks: action.payload.bookmarks,
    };
  }
  if (action.type === SET_EDIT_BOOKMARK) {
    const bookmark = state.bookmarks.find(
      (bookmark) => bookmark._id === action.payload.id
    );
    const { _id, contentBookMark, bookMarkLink } = bookmark;
    return {
      ...state,
      isBookMarkEditing: true,
      editBookMarkId: _id,
      contentBookMark,
      bookMarkLink,
    };
  }
  if (action.type === DELETE_BOOKMARK_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_BOOKMARK_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_BOOKMARK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "BookMark Updated!",
    };
  }
  if (action.type === EDIT_BOOKMARK_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CLEAR_BOOKMARK_VALUES) {
    const initialState = {
      contentBookMark: "",
      bookMarkLink: "",
      isBookMarkEditing: false,
      editBookMarkId: "",
    };
    return { ...state, ...initialState };
  }

  throw new Error(`no such action :${action.type}`);
};

export default reducer;
