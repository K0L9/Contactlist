import { assertCompletionStatement } from "@babel/types";

const initialState = {
    List: [],
    CurrentContact: ""
}

const ContactReducer = (state = initialState, action) => {
    // return state;
    switch (action.type) {
        case "CONTACT_LIST_LOADED":
            console.log("HELLO FROM REDUCER_LOADED: ", action.payload)
            return {
                ...state,
                List: action.payload
            }
        case "STATUS_CHANGE":
            return {
                ...state,
                List: action.payload
            }
        case "ADD_CONTACT":
            console.log("HELLO FROM REDUCER_ADD_CONTACT: ", action.payload)
            return {
                ...state,
                List: action.payload
            }
        case "DELETE_CONTACT":
            return {
                ...state,
                List: action.payload
            }
        case "SET_CURR_CONTACT":
            return {
                ...state,
                CurrentContact: action.payload
            }
        case "ON_EDIT":
            console.log("Hello from ON EDIT: ", action.payload)
            return {
                ...state,
                List: action.payload
            }
        default:
            return state;
    }
}

export default ContactReducer;