// Import các thư viện cần thiết
import { createContext, useReducer } from "react";

// Định nghĩa trạng thái ban đầu
const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

// Tạo context để chia sẻ trạng thái tìm kiếm
export const SearchContext = createContext(INITIAL_STATE);

// Định nghĩa reducer để xử lý các hành động thay đổi trạng thái
const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

// Tạo provider để bao bọc các component con và cung cấp context
export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
