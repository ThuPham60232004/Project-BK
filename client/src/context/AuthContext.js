import React, { createContext, useEffect, useReducer } from "react";

// Tạo context để chia sẻ trạng thái xác thực
export const AuthContext = createContext();

// Định nghĩa reducer để xử lý các hành động thay đổi trạng thái
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        loading: false,
        error: null,
        token: action.payload.token,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
        token: null,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
        token: null,
      };
    default:
      return state;
  }
};

// Tạo provider để bao bọc các component con và cung cấp context
export const AuthContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    token: localStorage.getItem("authToken") || null,
  };

  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Sử dụng useEffect để lưu trữ thông tin người dùng và token vào localStorage khi state.user hoặc state.token thay đổi
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    if (state.token) {
      localStorage.setItem("authToken", state.token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [state.user, state.token]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        token: state.token,
        dispatch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
