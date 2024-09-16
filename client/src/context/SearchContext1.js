import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  departureCity: undefined,
  arrivalCity: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
  }
};

export const SearchContext1 = createContext(INITIAL_STATE);

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

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext1.Provider
      value={{
        departureCity: state.departureCity,
        arrivalCity: state.arrivalCity,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext1.Provider>
  );
};
