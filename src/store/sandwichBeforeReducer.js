import {GET_SANDWICH_BEFORE} from "./types/sandwichBeforeTypes";

const initialState = [];

const sandwichBeforeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_SANDWICH_BEFORE:
            return state

        default:
            return state;
    }
};

export default sandwichBeforeReducer;