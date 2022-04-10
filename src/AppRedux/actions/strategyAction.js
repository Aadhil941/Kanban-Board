import { STRATEGIES } from "../../Constants/ActionTypes";

export const addStrategy = (strategyData) => {
    return (dispatch) => {
        dispatch({ type: STRATEGIES, payload: strategyData });
    }
  };