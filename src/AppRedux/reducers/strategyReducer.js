import { STRATEGIES } from "../../Constants/ActionTypes";

const initialState = {
    strategies: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case STRATEGIES:
            return {
                strategies: action?.payload || null,
            };
        default:
            return state;
    }

}

export default rootReducer;