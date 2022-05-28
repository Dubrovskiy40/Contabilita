import {ADD_MANAGER, GET_MANAGERS, UPDATE_MANAGER} from "./types/managersTypes";


const initialState = [];

const managersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_MANAGER:
            if (payload.nameManager && payload.managerVKSP && payload.imagePreviewUrl) {
                return [...state, {
                    nameManager: payload.nameManager,
                    managerVKSP: payload.managerVKSP,
                    id: String(state.length++),
                    avatar: payload.imagePreviewUrl,
                    file: {...payload.file}
                }]
            } else return [...state];

        case GET_MANAGERS:
            return [...payload];

        case UPDATE_MANAGER:
            return state.map((manager) => {
                if (manager.id === payload.id) {
                    return {...manager, top: payload.top + 'px', left: payload.left + 'px'}
                } return manager
            })

        default:
            return state;
    }
};

export default managersReducer;