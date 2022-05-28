import {IS_ADMIN} from "./types/authTypes";


const initialState = true;

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case IS_ADMIN:
            if (payload === 'user') {
                return  false;
            }
            return true;

        default:
            return true;
    }
};

export default authReducer;