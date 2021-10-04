export default class APIService {
    // URL = "https://contactlist-fae9f-default-rtdb.firebaseio.com/contact.json"
    URL = "/Contact/get-all"
    URL_ADD = "/Contact/add-contact"
    URL_DELETE = "/Contact/delete-contact"
    URL_EDIT = "/Contact/edit-contact"
    URL_STATUS_CHANGE = "/Contact/status-change"

    async getContactList() {
        const List = await fetch(this.URL)
            .then(responce => {
                return responce.json();
            }).then(data => {
                if (data == null) {
                    return {
                        List: []
                    }
                } else {
                    return {
                        List: data
                    }
                }
            })
        return List
    }
    async addContact(newContact) {
        console.log("ADDED CONTACT: ", newContact)
        fetch(this.URL_ADD, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newContact)
        })
    }
    async deleteContact(id) {
        fetch(this.URL_DELETE + "/" + id, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE",
        })
    }
    async changeStatus(statusChangeContact) {
        fetch(this.URL_STATUS_CHANGE + "/" + statusChangeContact.id, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(statusChangeContact.status)
        })
    }
    async editContact(editedContact) {
        console.log("EDITED CONTACT: ", editedContact)
        fetch(this.URL_EDIT, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(editedContact)
        })
    }

    updateContactList = (list) => {
        fetch(this.URL, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(list)
        })
    }
}