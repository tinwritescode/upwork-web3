import { useReducer } from "react";

export const useLimit = (initialLimit: number) => {
  const [limit, setLimit] = useReducer((state: number, action: number) => {
    if (!action) return 0;
    if (action > 0) {
      return action;
    }
    return state;
  }, initialLimit);

  return { limit, setLimit };
};
