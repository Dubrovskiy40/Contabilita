import {GET_SANDWICH_AFTER} from "./types/sandwichAfterTypes";

const initialState = [];

const sandwichAfterReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_SANDWICH_AFTER:
            return state

        default:
            return state;
    }
};

export default sandwichAfterReducer;