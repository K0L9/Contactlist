import { Component, Fragment } from "react"
import { Link, Redirect } from "react-router-dom"
import { stringify, v4 as uuidv4 } from "uuid"

import { connect } from "react-redux"

import { onEdit, setCurrentContact } from "../../Actions//ContactActions"
import APIService from "../../Services/APIService"

class EditContact extends Component {
    state = {
        name: this.props.CurrentContact.name,
        surname: this.props.CurrentContact.surname,
        email: this.props.CurrentContact.email,
        phone: this.props.CurrentContact.phone,
        status: this.props.CurrentContact.status,
        image: this.props.CurrentContact.image,
        gender: this.props.CurrentContact.gender,
        isRedirect: ""
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

    EditContact = () => {
        const { name, gender, surname, email, status, image, phone } = this.state;
        var service = new APIService();
        const newContact = {
            id: uuidv4(),
            name,
            surname,
            email,
            phone,
            status,
            image,
            gender,
        }
        var CurrentContact = this.props.CurrentContact;
        newContact.id = CurrentContact.id;
        service.editContact(newContact);

        const List = this.props.List;
        const index = List.findIndex(elem => elem.id === newContact.id);

        const tmpList = List.slice();
        tmpList[index] = newContact;

        const onEdit = this.props.onEdit;
        onEdit(tmpList);

        console.log("This is edited contact: ", newContact);
        this.setState({
            isRedirect: true
        })
    }

    componentDidMount() {
        const { CurrentContact } = this.props;
        if (CurrentContact == "") {
            this.setState({
                isRedirect: true
            })
        }
    }

    render() {
        let ImageSrc;
        let { isRedirect } = this.state;
        let { name, gender, surname, email, status, image, phone } = this.state;

        if (isRedirect == true) {
            return <Redirect to="/" />
        }

        if (image === null || image == "" || gender == "" || ((gender == "men" || gender == "women") && (image > 99 || image < 0)) || (gender == "lego" && (image < 0 || image > 15))) {
            ImageSrc = "https://www.svgrepo.com/show/86725/person.svg";
        }
        else {
            ImageSrc = `https://randomuser.me/api/portraits/${gender}/${image}.jpg`;
        }
        return (
            <Fragment>

                <div className="mb-2">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">Contact List</Link>
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
                </div>
                <div className="container">
                    <div>
                        <div className="row bg-light border p-3">
                            <div className="col-8">
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="inputDefault">name</label>
                                    <input type="text" className="form-control" placeholder="name" id="inputDefault" defaultValue={name} onChange={this.getName} />
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="inputDefault">surname</label>
                                    <input type="text" className="form-control" placeholder="surname" defaultValue={surname} id="inputDefault" onChange={this.getSurame} />
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="inputDefault">phone </label>
                                    <input type="text" className="form-control" placeholder="phone" defaultValue={phone} id="inputDefault" onChange={this.getPhone} />
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="inputDefault">email</label>
                                    <input type="text" className="form-control" placeholder="email" defaultValue={email} id="inputDefault" onChange={this.getMail} />
                                </div>
                                <div className="form-group row">
                                    <label className="col-form-label" htmlFor="inputDefault">Avatar</label>
                                    <input type="text" className="form-control" placeholder="Avatar id" defaultValue={image} id="inputDefault" onChange={this.getImage} />
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="exampleSelect1" className="form-label">status</label>
                                    <select type="select" className="form-control" id="exampleSelect1" onChange={this.getStatus} defaultValue >
                                        <option>Work</option>
                                        <option>Family</option>
                                        <option>Private</option>
                                        <option>Friend</option>
                                    </select>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="exampleSelect2" className="form-label">gender</label>
                                    <select type="select" className="form-control" id="exampleSelect2" onChange={this.getGender} defaultValue>
                                        <option value="men">Man</option>
                                        <option value="women">Woman</option>
                                        <option value="lego">Lego</option>
                                    </select>
                                </div>
                                <div>
                                    <button type="button" onClick={() => (this.EditContact())} className="btn btn-success">Edit</button>
                                </div>
                            </div>
                            <div className="col-4 text-center">
                                <img src={ImageSrc} className="rounded addContactImg"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment >
        )
    }
}

const mapStateToProps = ({ ContactReducer }) => {
    const { List } = ContactReducer;
    const { CurrentContact } = ContactReducer;
    return {
        List: List,
        CurrentContact: CurrentContact
    }
}

const mapDispatchToProps = {
    onEdit
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
