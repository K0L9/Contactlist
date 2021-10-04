export const getAllContacts = (list) => {
    return {
        type: "CONTACT_LIST_LOADED",
        payload: list
    }
}
export const onChangeStatus = (list) => {
    return {
        type: "STATUS_CHANGE",
        payload: list
    }
}
export const onAdd = (list) => {
    console.log("HELLO FROM ADD: ", list)
    return {
        type: "ADD_CONTACT",
        payload: list
    }
}
export const onDelete = (list) => {
    return {
        type: "DELETE_CONTACT",
        payload: list
    }
}
export const onEdit = (list) => {
    return {
        type: "ON_EDIT",
        payload: list
    }
}
export const setCurrentContact = (contact) => {
    return {
        type: "SET_CURR_CONTACT",
        payload: contact
    }
}