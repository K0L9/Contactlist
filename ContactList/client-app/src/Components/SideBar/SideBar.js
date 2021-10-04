import React from "react";
import { connect } from "react-redux";

const SideBar = ({ List }) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-12">
            <div className="contacts-labels">
                {/* <div className="title">All contacts<span>{ContactList.length}</span></div> */}
                <div className="list">
                    <div className="input-group">
                        <input type="text" className="contacts-search" placeholder="Search" />
                    </div>
                    <div className="head">Labels</div>
                    <div className="unit">
                        <div className="lab lab-success">Work</div><span>{List.filter(x => x.status == "Work").length}</span>
                    </div>
                    <div className="unit">
                        <div className="lab lab-primary">Family</div><span>{List.filter(x => x.status == "Family").length}</span>
                    </div>
                    <div className="unit">
                        <div className="lab lab-danger">Private</div><span>{List.filter(x => x.status == "Private").length}</span>
                    </div>
                    <div className="unit">
                        <div className="lab lab-warning">Friends</div><span>{List.filter(x => x.status == "Friend").length}</span>
                    </div>
                    <button type="button" className="btn btn-primary font-weight-700">Add new label</button>
                </div>
            </div>
        </div>
    )
}

const mapPropsToState = ({ ContactReducer }) => {
    const { List } = ContactReducer;
    return { List };
}

export default connect(mapPropsToState)(SideBar);