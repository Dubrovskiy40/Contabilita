import {ADD_MANAGER, GET_MANAGERS, UPDATE_MANAGER} from "../store/types/managersTypes";


export const getManagers = (managers) => ({
    type: GET_MANAGERS,
    payload: managers,
});

export const addManager = (manager) => {
    return {
        type: ADD_MANAGER,
        payload: manager,
    };
};

export const updateManager = ({id, top, left}) => ({
    type: UPDATE_MANAGER,
    payload: {id, top, left}
});
