import React, { useReducer } from "react";

type Props = {
  children: React.ReactNode;
};

type ActionType = {
  type: "SELECT_JOB";
  payload: string;
};

const HomeContext = React.createContext({
  selectedJobId: null as string | null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  dispatch: (action: ActionType) => {
    console.error("No dispatch function");
  },
});

const initialState = {
  selectedJobId: null as string | null,
};

const reducer = (
  state: typeof initialState,
  action: ActionType
): typeof initialState => {
  switch (action.type) {
    case "SELECT_JOB": {
      return {
        ...state,
        selectedJobId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

function HomeProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HomeContext.Provider
      value={{
        selectedJobId: state.selectedJobId,
        dispatch,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export const useHomeContext = () => React.useContext(HomeContext);

export default HomeProvider;
