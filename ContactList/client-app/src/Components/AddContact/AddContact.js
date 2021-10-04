import { Component, Fragment } from "react"
import { Link, Redirect } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

//import actions

import { onAdd } from "../../Actions/ContactActions"

import { connect } from "react-redux"

//import Services
import APIService from "../../Services/APIService";

class AddContact extends Component {

    state = {
        name: "",
        surname: "",
        email: "",
        PhoneNumber: "",
        status: "",
        image: null,
        gender: "",
        isRedirect: false
    }

    getName = (e) => {
        const name = e.target.value;
        this.setState({
            name: name
        })
    }
    getSurame = (e) => {
        const surname = e.target.value;
        this.setState({
            surname: surname
        })
    }
    getPhone = (e) => {
        const phone = e.target.value;
        this.setState({
            phone: phone
        })
    }
    getStatus = (e) => {
        const status = e.target.value;
        this.setState({
            status: status
        })
    }
    getImage = (e) => {
        const image = e.target.value;
        this.setState({
            image: image
        })
    }
    getGender = (e) => {
        const gender = e.target.value;
        this.setState({
            gender: gender
        })
    }
    getMail = (e) => {
        const email = e.target.value;
        this.setState({
            email: email
        })
    }

    CreateContact = () => {
        const { name, gender, surname, email, status, image, phone } = this.state;
        const newContact = {
            // id: uuidv4(),
            name,
            surname,
            email,
            phone,
            status,
            image,
            gender,
        }

        var service = new APIService();
        service.addContact(newContact);

        const { onAdd } = this.props;

        const { List } = this.props;

        var newList = List.slice();
        newList.unshift(newContact);

        onAdd(newList);
        this.setState({
            isRedirect: true
        })
    }


    render() {
        let { image, gender, isRedirect } = this.state;

        if (isRedirect === true) {
            return <Redirect to="/" />
        }

        if (image === null || image == "" || gender == "" || ((gender == "men" || gender == "women") && (image > 99 || image < 0)) || (gender == "lego" && (image < 0 || image > 15))) {
            image = "https://www.svgrepo.com/show/86725/person.svg";
        }
        else {
            image = `https://randomuser.me/api/portraits/${gender}/${image}.jpg`;
        }
        return (
            <Fragment>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Contact List</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarColor01">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link active" href="#">Home
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </nav>
                    <form onSubmit={this.CreateContact}>
                        <div className="row">
                            <div className="col border">
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="inputDefault">name</label>
                                    <input type="text" className="form-control" placeholder="name" id="inputDefault" onChange={this.getName} />
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="inputDefault">surname</label>
                                    <input type="text" className="form-control" placeholder="surname" id="inputDefault" onChange={this.getSurame} />
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="inputDefault">phone </label>
                                    <input type="text" className="form-control" placeholder="phone" id="inputDefault" onChange={this.getPhone} />
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="inputDefault">email</label>
                                    <input type="text" className="form-control" placeholder="email" id="inputDefault" onChange={this.getMail} />
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="inputDefault">Avatar</label>
                                    <input type="text" className="form-control" placeholder="Avatar id" id="inputDefault" onChange={this.getImage} />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="exampleSelect1" className="form-label">status</label>
                                    <select type="select" className="form-control" id="exampleSelect1" onChange={this.getStatus}>
                                        <option defaultValue>Choose status</option>
                                        <option>Work</option>
                                        <option>Family</option>
                                        <option>Private</option>
                                        <option>Friend</option>
                                    </select>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="exampleSelect2" className="form-label">gender</label>
                                    <select type="select" className="form-control" id="exampleSelect2" onChange={this.getGender}>
                                        <option defaultValue>Choose gender</option>
                                        <option value="men">Man</option>
                                        <option value="women">Woman</option>
                                        <option value="lego">Lego</option>
                                    </select>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-success" onClick={() => (this.CreateContact())}>Add</button>
                                </div>
                            </div>
                            <div className="col border text-center">
                                <img src={image} className="rounded addContactImg"></img>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment >
        )
    }
}

const mapStateToProps = ({ ContactReducer }) => {
    const { List } = ContactReducer;
    return { List };
}
const mapDispatchToProps = {
    onAdd
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
