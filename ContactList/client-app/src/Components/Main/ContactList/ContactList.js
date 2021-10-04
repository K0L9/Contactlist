//import components
import ContactItem from "./ContactItem/ContactItem.js"
import { useEffect } from "react";
import { connect } from "react-redux"

import APIService from "../../../Services/APIService"

import { getAllContacts } from "../../../Actions/ContactActions"

const ContactList = ({ List, getAllContacts }) => {

    useEffect(() => {
        var service = new APIService();
        service.getContactList().then(data => {
            getAllContacts(data.List);
        })
    }, [])

    const item = List.map(listItem => {
        return (
            <ContactItem key={listItem.id}
                {...listItem} />
        )
    });
    return (
        <section>
            {item.length > 0 ? item : <p className="emptyList">Contact list is empty.</p>}
        </section>
    )
}

const mapStateToProps = ({ ContactReducer }) => {
    const { List } = ContactReducer;
    return { List };
}

const mapDispatchToProps = {
    getAllContacts
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);