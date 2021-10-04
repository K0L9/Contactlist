import React, { Fragment } from "react";
import { Link } from "react-router-dom"

// Import components
import ContactList from "./ContactList/ContactList";
import SideBar from "../SideBar/SideBar";

const Main = () => {
    return (
        <Fragment>
            <div className="container bootstrap snippets bootdeys bootdey" >
                <div className="row decor-default">
                    <SideBar />
                    <div className="col-lg-9 col-md-8 col-sm-12">
                        <div className="contacts-list">
                            <Link className="title btn" to="/add-contact">Add new contact</Link>

                            <form className="ac-custom ac-checkbox ac-checkmark" autoComplete="off">
                                <div className="input-group">
                                    <input type="text" className="contacts-list-search" placeholder="Search" />
                                </div>
                                <div className="unit head">
                                    <div className="field name">
                                        <div className="check">
                                            <input id="cb1" name="cb1" type="checkbox" />
                                            <label htmlFor="cb1"></label>
                                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg></div>
                                        name
                                    </div>
                                    <div className="field phone">
                                        phone
                                    </div>
                                </div>
                                <ContactList />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default Main;