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
if (action.type === GET_LOGS_BEGIN) {
  return { ...state, isLoading: true, showAlert: false };
}
if (action.type === GET_LOGS_SUCCESS) {
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
