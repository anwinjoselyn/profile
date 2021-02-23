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
  //Button
  //Table
  Card
} from "react-bootstrap";

import axios from "axios";
//import LoaderButton from "../../../../../Components/LoaderButton";

import "../Timeline1.css";
//const url = "https://theplaybook.rocks:8000";

export default class ShowOrgs extends Component<*, State> {
  constructor(props, context) {
    super(props, context);

    this.state = {
      companyTypeId: "",
      orgName: "",
      industry: "",
      editOrgName: false,
      editIndustry: false,
      editCompanyType: false
    };
  }

  async componentDidMount() {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  toggleEditOrg = () => {
    this.setState({
      editOrgName: !this.state.editOrgName
    });
  };

  toggleEditIndustry = () => {
    this.setState({
      editIndustry: !this.state.editIndustry
    });
  };

  toggleEditType = () => {
    this.setState({
      editCompanyType: !this.state.editCompanyType
    });
  };

  handleChange = event => {
    //event.preventDefault();
    console.log("event.target.id", event.target.id);
    console.log("event.target.value", event.target.value);

    this.setState({
      [event.target.id]: event.target.value
    });
  };

  updateOrg = event => {
    event.preventDefault();

    axios({
      method: "PUT",
      url: `/api/v1/app/orgs/${this.props.deal.orgId}`,
      data: {
        orgName: this.state.orgName,
        industry: this.state.industry,
        companyTypeId: this.state.companyTypeId
      },
      headers: { Authorization: `${this.props.authToken}` }
    })
      .then(data => {
        console.log("data", data);

        this.setState({
          companyTypeId: data.data.data.companyTypeId,
          orgName: data.data.data.orgName,
          industry: data.data.data.industry
        });

        if (this.state.editIndustry === true) this.toggleEditIndustry();
        if (this.state.editOrgName === true) this.toggleEditOrg();
        if (this.state.editCompanyType === true) this.toggleEditType();

        this.props.updateDealOrg(data.data.data);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  renderOrg() {
    return (
      <Card bg="dark" className="Org">
        <Card.Header>
          <Card.Title>Organization</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onBlur={this.updateOrg}>
            <Form.Group controlId="orgName">
              Name {"  "}
              <span className="SpanOrg">{this.props.org.orgName}</span>
              {this.state.editOrgName && (
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.orgName}
                  type="input"
                  size="sm"
                />
              )}
            </Form.Group>
            <Form.Group controlId="industry">
              Industry {"  "}
              <span className="SpanOrg" onDoubleClick={this.toggleEditIndustry}>
                {this.props.org.industry ? this.props.org.industry : "Not Set"}
              </span>
              {this.state.editIndustry && (
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.industry}
                  type="input"
                  size="sm"
                />
              )}
            </Form.Group>
            <Form.Group controlId="companyTypeId">
              Type {"  "}
              <span className="SpanOrg" onDoubleClick={this.toggleEditType}>
                {this.props.companyTypes && this.props.org
                  ? this.props.companyTypes.map(type => {
                      if (type.id === parseInt(this.props.org.companyTypeId))
                        return type.typeName;
                      else {
                        return null;
                      }
                    })
                  : "Not Set"}
              </span>
              {this.state.editCompanyType && (
                <Form.Control
                  onChange={this.handleChange}
                  value={this.state.companyTypeId}
                  as="select"
                  size="sm"
                >
                  {this.props.companyTypes &&
                    this.props.companyTypes.map(type => (
                      <option id={type.id} key={type.id} value={type.id}>
                        {type.typeName}
                      </option>
                    ))}
                </Form.Control>
              )}
            </Form.Group>
          </Form>
          Emp. Count {"  "}
          <span className="SpanOrg">
            {this.props.org.size
              ? this.props.org.size.toLocaleString()
              : "Not Set"}
          </span>
          <br />
          <br />
          City {"  "}
          <span className="SpanOrg">
            {this.props.org.city ? this.props.org.city : "Not Set"}
          </span>
          <br />
          <br />
          Country {"  "}
          <span className="SpanOrg">
            {this.props.org.country ? this.props.org.country : "Not Set"}
          </span>
          <br />
          <br />
          Website {"  "}
          <span className="SpanOrg">
            {this.props.org.url ? this.props.org.url : "Not Set"}
          </span>
          <br />
          <br />
          Annual Revenue {"  "}
          <span className="SpanOrg">
            {this.props.org.annualRevenue
              ? this.props.org.annualRevenue.toLocaleString()
              : "Not Set"}
          </span>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return this.props.companyTypes &&
      this.props.org !== undefined &&
      this.props.org !== null
      ? this.renderOrg()
      : null;
  }
}
