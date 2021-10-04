import { Link } from "react-router-dom"

import { connect } from "react-redux"
import ContactReducer from "../../../../Reducers/ContactReducer";
import { assertImportSpecifier } from "@babel/types";

//import Services
import APIService from "../../../../Services/APIService.js"

//import actions
import { onChangeStatus, onDelete, setCurrentContact } from "../../../../Actions/ContactActions"

const ContactItem = ({ id, name, surname, email, phone, image, status, gender, List, onChangeStatus, onDelete, setCurrentContact }) => {

    var statusClass = "";
    if (status == "Friend")
        statusClass = "lab lab-warning"
    else if (status == "Family")
        statusClass = "lab lab-primary"
    else if (status == "Private")
        statusClass = "lab lab-danger"
    else if (status == "Work")
        statusClass = "lab lab-success"

    const imgSrc = `https://api.randomuser.me/portraits/${gender}/${image}.jpg`;

    return (
        < div className="unit" >
            <div className="field name">
                <div className="check">
                    <input id="cb2" name="cb1" type="checkbox" />
                    <label htmlFor="cb2"></label>
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>

                </div>
                <div className="row">
                    <div className="col">
                        <img src={imgSrc} alt="image" className="avatar" />
                    </div>
                    <div className="col">
                        <span className="d-block"> {name} {surname} </span>
                        <span className={statusClass} onClick={() => (onStatusChangeClick(id, List, onChangeStatus))}>{status}</span>
                    </div>
                </div>

            </div>
            <div className="field phone">
                {phone}
            </div>
            <div className="field email">
                {email}
            </div>
            <div>
                <span onClick={() => (onDeleteClick(id, List, onDelete))}> <i className="fas fa-user-minus"></i></span>
                <Link to="/edit-contact">
                    <span onClick={() => (onEdit(id, List, setCurrentContact))} className="ml-3"> <i className="fas fa-user-edit black-link"></i></span>
                </Link>
            </div>
        </div >
    )
}
var service = new APIService();

const onStatusChangeClick = (id, List, onChangeStatus) => {
    const index = List.findIndex(elem => elem.id === id);
    let contact = List[index];

    switch (contact.status) {
        case "Friend":
            contact.status = "Work";
            break;
        case "Work":
            contact.status = "Family";
            break;
        case "Family":
            contact.status = "Private";
            break;
        case "Private":
            contact.status = "Friend";
            break;
    }

    const tmpList = List.slice();
    tmpList[index] = contact;

    service.changeStatus(contact);

    onChangeStatus(tmpList);
}
const onDeleteClick = (id, List, onDelete) => {
    const index = List.findIndex(elem => elem.id === id);

    const tmpList = List.slice();
    tmpList.splice(index, 1)

    service.deleteContact(id);
    onDelete(tmpList);
}
const onEdit = (id, List, setCurrentContact) => {
    const index = List.findIndex(elem => elem.id === id);
    let contact = List[index];

    setCurrentContact(contact);
}

const mapStateToProps = ({ ContactReducer }) => {
    const { List } = ContactReducer;
    return { List };
}
const mapDispatchToProps = {
    onChangeStatus, onDelete, setCurrentContact
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);