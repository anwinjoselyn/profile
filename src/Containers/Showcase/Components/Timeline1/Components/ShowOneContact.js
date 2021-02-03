import React, { Component } from "react";
import {
  Form,
  //FormGroup,
  //FormControl,
  //Row,
  //Col,
  //Navbar,
  // Nav,
  //Container,
  //Modal,
  //DropdownButton,
  //Dropdown,
  //Button,
  //Table
  Card
} from "react-bootstrap";

import "../Timeline1.css";
import LoaderButton from "../../../../../Components/LoaderButton";
import { isEmpty } from "../../../../../libs/validators";

//import ChangeContact from "../../Contacts/People/Components/ChangeContact";

import axios from "axios";

export default class ShowOneContact extends Component<*, State> {
  constructor(props, context) {
    super(props, context);

    this.state = {
      editName: false,
      editPhone: false,
      editEmail: false,
      editTitle: false,
      editType: false,
      editDepartment: false,
      editLinkedin: false,
      contactName: "",
      contactMainPhone: "",
      contactEmail: "",
      contactTitle: "",
      contactTypeId: "",
      department: "",
      linkedInUrl: "",
      change: false,
      changeContactModalFlag: false
    };
  }

  async componentDidMount() {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  closeAddContact = () => {
    this.setState({
      changeContactModalFlag: false
    });
  };

  toggleEditName = () => {
    this.setState({
      editName: !this.state.editName
    });
  };

  toggleEditPhone = () => {
    this.setState({
      editPhone: !this.state.editPhone
    });
  };

  toggleEditEmail = () => {
    this.setState({
      editEmail: !this.state.editEmail
    });
  };

  toggleEditTitle = () => {
    this.setState({
      editTitle: !this.state.editTitle
    });
  };

  toggleEditType = () => {
    this.setState({
      editType: !this.state.editType
    });
  };

  toggleEditDepartment = () => {
    this.setState({
      editDepartment: !this.state.editDepartment
    });
  };

  toggleEditLinkedin = () => {
    this.setState({
      editLinkedin: !this.state.editLinkedin
    });
  };

  handleChange = event => {
    //event.preventDefault();
    console.log("event.target.id", event.target.id);
    console.log("event.target.value", event.target.value);

    this.setState({
      [event.target.id]: event.target.value,
      change: true
    });
  };

  updateContact = event => {
    event.preventDefault();

    if (this.state.change)
      axios({
        method: "PUT",
        url: `/api/v1/app/people/${this.props.contact.id}`,
        data: {
          contactName: this.state.contactName,
          contactMainPhone: this.state.contactMainPhone,
          contactEmail: this.state.contactEmail,
          contactTitle: this.state.contactTitle,
          contactTypeId: this.state.contactTypeId,
          department: this.state.department,
          linkedInUrl: this.state.linkedInUrl
        },
        headers: { Authorization: `${this.props.authToken}` }
      })
        .then(data => {
          console.log("data", data);

          this.setState({
            contactName: data.data.data.contactName,
            contactMainPhone: data.data.data.contactMainPhone,
            contactEmail: data.data.data.contactEmail,
            contactTitle: data.data.data.contactTitle,
            contactTypeId: data.data.data.contactTypeId,
            department: data.data.data.department,
            linkedInUrl: data.data.data.linkedInUrl,
            change: false
          });

          if (this.state.editName === true) this.toggleEditName();
          if (this.state.editPhone === true) this.toggleEditPhone();
          if (this.state.editEmail === true) this.toggleEditEmail();
          if (this.state.editTitle === true) this.toggleEditTitle();
          if (this.state.editType === true) this.toggleEditType();
          if (this.state.editDepartment === true) this.toggleEditDepartment();
          if (this.state.editLinkedin === true) this.toggleEditLinkedin();

          this.props.updateDealContact(data.data.data);
        })
        .catch(error => {
          console.log("error", error);
        });
  };

  renderContact() {
    return (
      <Card bg="dark" className="Contact1">
        <Card.Header>
          <Card.Title>Main Contact</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onBlur={this.updateContact}>
            <Form.Group controlId="contactName">
              Name {"  "}
              <span className="SpanContact" onDoubleClick={this.toggleEditName}>
                {this.props.contact.contactName}
              </span>
              {this.state.editName && (
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.contactName}
                  type="input"
                  size="sm"
                />
              )}
            </Form.Group>
            <Form.Group controlId="contactMainPhone">
              Phone {"  "}
              <span
                className="SpanContact"
                onDoubleClick={this.toggleEditPhone}
              >
                {this.props.contact.contactMainPhone
                  ? this.props.contact.contactMainPhone
                  : "Not Set"}
              </span>
              {this.state.editPhone && (
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.contactMainPhone}
                  type="input"
                  size="sm"
                />
              )}
            </Form.Group>
            <Form.Group controlId="contactEmail">
              Email {"  "}
              <span
                className="SpanContact"
                onDoubleClick={this.toggleEditEmail}
              >
                {this.props.contact.contactEmail
                  ? this.props.contact.contactEmail
                  : "Not Set"}
              </span>
              {this.state.editEmail && (
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.contactEmail}
                  type="input"
                  size="sm"
                />
              )}
            </Form.Group>
            <Form.Group controlId="contactTitle">
              Title {"  "}
              <span
                className="SpanContact"
                onDoubleClick={this.toggleEditTitle}
              >
                {this.props.contact.contactTitle
                  ? this.props.contact.contactTitle
                  : "Not Set"}
              </span>
              {this.state.editTitle && (
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.contactTitle}
                  type="input"
                  size="sm"
                />
              )}
            </Form.Group>
            <Form.Group controlId="contactTypeId">
              Type {"  "}
              <span className="SpanContact" onDoubleClick={this.toggleEditType}>
                {this.props.contactTypes && this.props.contact
                  ? this.props.contactTypes.map(type => {
                      if (type.id === this.props.contact.contactTypeId)
                        return type.contactTypeName;
                      else return null;
                    })
                  : "Not Set"}
              </span>
              {this.state.editType && (
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.contactTypeId}
                  as="select"
                  size="sm"
                >
                  {this.props.contactTypes &&
                    this.props.contactTypes.map(type => (
                      <option id={type.id} value={type.id} key={type.id}>
                        {type.contactTypeName}
                      </option>
                    ))}
                </Form.Control>
              )}
            </Form.Group>
            <Form.Group controlId="department">
              Department {"  "}
              <span
                className="SpanContact"
                onDoubleClick={this.toggleEditDepartment}
              >
                {this.props.contact.department
                  ? this.props.contact.department
                  : "Not Set"}
              </span>
              {this.state.editDepartment && (
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.department}
                  type="input"
                  size="sm"
                />
              )}
            </Form.Group>
            <Form.Group controlId="linkedInUrl">
              LinkedIn {"  "}
              <span
                className="SpanContact"
                onDoubleClick={this.toggleEditLinkedin}
              >
                {this.props.contact.linkedInUrl
                  ? this.props.contact.linkedInUrl
                  : "Not Set"}
              </span>
              {this.state.editLinkedin && (
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.linkedInUrl}
                  type="input"
                  size="sm"
                />
              )}
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return (
      <div>
        {this.props.contact !== undefined && !isEmpty(this.props.contact)
          ? this.renderContact()
          : "Contact not defined"}
      </div>
    );
  }
}
