import {IS_ADMIN} from "../store/types/authTypes";

export const isAdmin = (name) => ({
    type: IS_ADMIN,
    payload: name,
});