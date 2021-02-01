import React, { Component } from "react";

import { format, isPast, isFuture, parseISO, isValid } from "date-fns";
import { Markup } from "interweave";
//import CreatableSelect from "react-select/creatable";

import Timeline from "./Components/Timeline";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Table from "react-bootstrap/Table";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
//import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import LoaderButton from "../../../../Components/LoaderButton";
import { isEmpty } from "../../../../libs/validators";

//import ControlLabel from "react-bootstrap/ControlLabel";
import "./Timeline1.css";

import ShowContacts from "./Components/ShowContacts";
import Overview from "./Components/Overview";
import ShowOrgs from "./Components/ShowOrgs";
import ShowDetails from "./Components/ShowDetails";
import ShowOneContact from "./Components/ShowOneContact";
import SmartBcc from "./Components/SmartBcc";

import axios from "axios";

let futureEvents = [];
let events = [];

//const url = "http://theplaybook.rocks:8000";

export default class Timeline1 extends Component {
  constructor(props) {
    super(props);

    this.DealNameForm = React.createRef();
    this.DValueForm = React.createRef();

    this.stageClick = this.stageClick.bind(this);
    this.handleChangeNotes = this.handleChangeNotes.bind(this);
    this.handleSubmitNotes = this.handleSubmitNotes.bind(this);
    this.handleDealChange = this.handleDealChange.bind(this);
    this.handleSubmitDeal = this.handleSubmitDeal.bind(this);
    this.toggleDealName = this.toggleDealName.bind(this);
    this.toggleAddActivity = this.toggleAddActivity.bind(this);
    this.toggleDValue = this.toggleDValue.bind(this);

    this.state = {
      events: [],
      deal: {},
      deals: [],
      activities: "",
      futureEvents: [],
      people: [],
      org: {},
      notes: "",
      products: "",
      activityTypes: this.props.commonData.activityTypes,
      targetTypes: this.props.commonData.targetTypes,
      companyTypes: this.props.commonData.companyTypes,
      contactTypes: this.props.commonData.contactTypes,
      dealStatuses: this.props.commonData.dealStatuses,
      reasons: this.props.commonData.reasons,
      stages: "",
      orderedStages: "",
      pipes: "",
      pipe: "",
      dealName: "",
      dealValue: "",
      note: "",
      tenantId: this.props.token.tId,
      userName: this.props.token.name,
      userId: this.props.token.id,
      teamId: this.props.token.tm !== 6 ? parseInt(this.props.token.tm) : 1,
      dealTeamId: "",
      dealUserId: "",
      dealUserName: "",
      dealId: "",
      orgName: "",
      contact: "",
      contactName: "",
      stageName: "",
      dealEditing: false,
      dValueEditing: false,
      dataLoaded: false,
      isDeleting: false,
      activeStage: 0,
      active: false,
      selected: "",
      contacts: "",
      addActivity: false,
      updateLost: false,
      updateWon: false,
      connectedNotes: "",
      takeNotes: false,
      statusId: "",
      convertToSQL: false,
      convertToMQL: false,
      users: this.props.users,
      editingAct: "",
      editActivity: false,
      newStageId: 0,
      newPipeId: 0,
      newFilteredStages: [],
      changePipe: false,
      openClosureDateForm: false,
      closureDate: "",
      openAssignUserForm: false,
      dealDoesNotExist: false,
      syncedEmails: [],
      masterICPSet:
        this.props.oldDatas.masterICP &&
        this.props.oldDatas.masterICP.length > 0
          ? true
          : false,
      masterICP:
        this.props.oldDatas.masterICP &&
        this.props.oldDatas.masterICP.length > 0
          ? this.props.oldDatas.masterICP
          : [],
      editICPData: false,
      showArchiveDeal: false,
      showReactivate: false
    };
  }

  async componentDidMount() {
    try {
      let note = [];
      let deal = this.props.oldDatas.deal;

      console.log("deal", deal);
      let dealDoesNotExist = false;
      if (isEmpty(deal)) {
        dealDoesNotExist = true;
        this.setState({
          dealDoesNotExist: dealDoesNotExist
        });
        return;
      }

      let dealUserId =
        deal !== undefined && deal.userId !== undefined ? deal.userId : null;
      console.log("dealUserId", dealUserId);
      //console.log("users.data.data", users.data.data);

      let syncedEmails = this.props.oldDatas.syncedEmails;

      this.setState({
        syncedEmails: syncedEmails
      });
      console.log("syncedEmails", syncedEmails);

      this.setState({
        deal: deal !== undefined ? deal : {},
        dealName: deal !== undefined ? deal.dealName : "N/A",
        selected: deal.stageId,
        statusId: deal.statusId,
        dealId: deal.id,
        dealValue: deal.dealValue,
        connectedNotes: note,
        dealUserId: dealUserId,
        dealUserName:
          dealUserId !== null && dealUserId !== undefined
            ? this.props.users.filter(user => user.id === dealUserId)[0]
                .userName
            : "N/A"
        //users: users.data.data
      });

      //console.log("connectedNotes", this.state.connectedNotes);
      //console.log("this.state.deal", this.state.deal);

      if (
        deal !== undefined &&
        deal.orgId !== undefined &&
        deal.orgId !== null &&
        !isNaN(deal.orgId) &&
        deal.orgId > 0
      ) {
        let org = this.props.oldDatas.org;

        let people = this.props.oldDatas.people;

        console.log("people", people);
        this.setState({
          org: org,
          orgName: org.orgName,
          people: people
        });
        console.log("org", org);
      }

      let orgs = this.props.oldDatas.orgs;

      this.setState({
        orgs: orgs
      });
      console.log("orgs", orgs);

      let contact = this.props.oldDatas.contact;

      this.setState({
        contact: contact,
        contactName: contact.contactName
      });

      console.log("contact", contact);

      //console.log("this.state.people", this.state.people);

      const contacts = this.props.oldDatas.contacts;

      this.setState({
        contacts: contacts
      });

      console.log("contacts", contacts);

      const pipes = this.props.oldDatas.pipes;

      this.setState({
        pipes: pipes
      });
      console.log("pipes", pipes);

      const stages = this.props.oldDatas.stages;

      console.log("stages", stages);

      this.setState(
        {
          stages: stages.filter(s => s.isActive)
        },
        () => {
          const stage = stages
            .filter(s => s.isActive)
            .filter(stage => parseInt(deal.stageId) === parseInt(stage.id));
          console.log("stage", stage);
          this.setState({
            stageName: stage[0].stageName,
            pipeId: stage[0].pipeId,
            teamId: pipes.filter(
              pipe => parseInt(pipe.id) === parseInt(stage[0].pipeId)
            )[0].teamId
          });
        }
      );
      console.log("this.state.deal.stageId", this.state.deal.stageId);
      console.log("stageName", this.state.stageName);

      console.log("pipeId", this.state.pipeId);

      //testing some data... remove later

      const deals = this.props.oldDatas.deals;

      this.setState({
        deals: deals
      });

      console.log("deals", deals);

      let dealTeamId = this.props.commonData.dealStatuses.filter(
        ds => ds.id === deal.statusId
      )[0].teamId;
      console.log("dealTeamId", dealTeamId);

      this.setState({
        dealTeamId: dealTeamId
      });

      let activities = this.props.oldDatas.activities;

      this.setState({
        activities: activities
      });

      console.log("activities", activities);

      this.createTimelines(
        activities,
        this.props.commonData.activityTypes,
        contacts,
        orgs,
        note,
        syncedEmails
      );

      this.setState({ dataLoaded: true });
      //console.log("this.state.dValueEditing", this.state.dValueEditing);
    } catch (err) {
      this.setState({
        dealDoesNotExist: true
      });
      console.log(err);
    }
  }

  createTimelines = (
    activities,
    activityTypes,
    contacts,
    orgs,
    notes,
    emails
  ) => {
    let object,
      object2 = [];

    if (events.length > 0) events = [];
    if (futureEvents.length > 0) futureEvents = [];

    if (activities.length > 0) {
      object = activities.filter(act => isPast(parseISO(act.activityDate)));

      object2 = activities.filter(act => isFuture(parseISO(act.activityDate)));

      object.forEach((act, key) => {
        console.log("act.id", act.id);
        let activityType = activityTypes.filter(
          type => type.id === act.activityTypeId
        );
        let icon = activityType[0].activityTypeSlug;
        activityType = activityType[0].name;

        let contact = contacts.filter(contact => contact.id === act.contactId);
        let contactId = contact[0].id;
        contact = contact[0].contactName;

        let org = orgs.filter(org => org.id === act.orgId);
        let orgId = org[0].id;
        org = org[0].orgName;

        let tempAct = {
          ts: act.activityDate,
          time: act.activityTime,
          text: act.activityTitle,
          type: activityType,
          baseUrl: this.handleEditAct,
          id: act.id,
          icon: icon,
          notes: JSON.parse(act.content).blocks[0].text,
          contact: contact,
          org: org,
          done: act.isCompleted,
          contactId: contactId,
          orgId: orgId
        };
        console.log("tempAct", tempAct);
        events.push(tempAct);
      });

      console.log("events(object)", object);

      object2.forEach((act, key) => {
        console.log("act.id", act.id);
        let activityType = activityTypes.filter(
          type => type.id === act.activityTypeId
        );
        let icon = activityType[0].activityTypeSlug;
        activityType = activityType[0].name;

        let contact = contacts.filter(contact => contact.id === act.contactId);
        let contactId = contact[0].id;
        contact = contact[0].contactName;

        let org = orgs.filter(org => org.id === act.orgId);
        let orgId = org[0].id;
        org = org[0].orgName;

        let tempAct = {
          ts: act.activityDate,
          time: act.activityTime,
          text: act.activityTitle,
          type: activityType,
          baseUrl: this.handleEditAct,
          id: act.id,
          icon: icon,
          notes: JSON.parse(act.content).blocks[0].text,
          contact: contact,
          org: org,
          done: act.isCompleted,
          contactId: contactId,
          orgId: orgId
        };
        console.log("tempAct", tempAct);
        futureEvents.push(tempAct);
      });
      console.log("events(object2)", object2);
    }

    console.log("events", events);

    //Push notes also into timeline just like activities
    let notePast = [];
    let noteFuture = [];

    if (notes.length > 0) {
      notePast = notes.filter(item => isPast(parseISO(item.createdAt)));

      noteFuture = notes.filter(item => isFuture(parseISO(item.createdAt)));

      notePast.forEach((note, key) => {
        console.log("note.id", note.id);

        let icon = "far fa-sticky-note";

        let contact = contacts.filter(contact => contact.id === note.contactId);
        let contactId = contact[0].id;
        contact = contact[0].contactName;

        let org = orgs.filter(org => org.id === note.orgId);
        let orgId = org[0].id;
        org = org[0].orgName;

        let tempNote = {
          ts: note.createdAt,
          time: format(parseISO(note.createdAt), "HH:mm"),
          text: "",
          type: "Note",
          baseUrl: null,
          id: note.id,
          icon: icon,
          notes: note.content,
          contact: contact,
          org: org,
          done: true,
          contactId: contactId,
          orgId: orgId
        };
        console.log("tempNote", tempNote);
        events.push(tempNote);
      });

      console.log("events(object)", object);

      noteFuture.forEach((note, key) => {
        console.log("note.id", note.id);

        let icon = "far fa-sticky-note";

        let contact = contacts.filter(contact => contact.id === note.contactId);
        let contactId = contact[0].id;
        contact = contact[0].contactName;

        let org = orgs.filter(org => org.id === note.orgId);
        let orgId = org[0].id;
        org = org[0].orgName;

        let tempNote = {
          ts: note.createdAt,
          time: format(parseISO(note.createdAt), "HH:mm"),
          text: "",
          type: "Note",
          baseUrl: null,
          id: note.id,
          icon: icon,
          notes: note.content,
          contact: contact,
          org: org,
          done: true,
          contactId: contactId,
          orgId: orgId
        };
        console.log("tempNote", tempNote);
        futureEvents.push(tempNote);
      });
      console.log("events(object2)", object2);
    }

    //Push Emails also into timeline
    let emailsPast = [];
    let emailsFuture = [];

    if (emails.length > 0) {
      emailsPast = emails.filter(item => isPast(parseISO(item.timeStamp)));

      emailsFuture = emails.filter(item => isFuture(parseISO(item.timeStamp)));

      emailsPast.forEach((email, key) => {
        console.log("email.id", email.id);

        let icon = "fas fa-at";

        let contact =
          email.contactId !== null &&
          email.contactId !== undefined &&
          contacts.find(contact => contact.id === email.contactId)
            ? contacts.filter(contact => contact.id === email.contactId)
            : [];
        let contactId = contact.length > 0 ? contact[0].id : null;
        contact = contact.length > 0 ? contact[0].contactName : "";

        let org =
          email.orgId !== undefined &&
          email.orgId !== null &&
          orgs.find(org => org.id === email.orgId)
            ? orgs.filter(org => org.id === email.orgId)
            : [];
        let orgId = org.length > 0 ? org[0].id : null;
        org = org.length > 0 ? org[0].orgName : "";

        let tempEmail = {
          ts: email.timeStamp,
          time: format(parseISO(email.timeStamp), "HH:mm"),
          text: email.subject,
          type: "Mail",
          baseUrl: null,
          id: email.id,
          icon: icon,
          notes: <Markup content={email.content.data[0].value} />,
          contact: contact,
          org: org,
          done: true,
          contactId: contactId,
          orgId: orgId
        };
        console.log("tempEmail", tempEmail);
        events.push(tempEmail);
      });

      console.log("events(object)", object);

      emailsFuture.forEach((email, key) => {
        console.log("email.id", email.id);

        let icon = "fas fa-at";

        let contact =
          email.contactId !== null &&
          email.contactId !== undefined &&
          contacts.find(contact => contact.id === email.contactId)
            ? contacts.filter(contact => contact.id === email.contactId)
            : [];
        let contactId = contact.length > 0 ? contact[0].id : null;
        contact = contact.length > 0 ? contact[0].contactName : "";

        let org =
          email.orgId !== undefined &&
          email.orgId !== null &&
          orgs.find(org => org.id === email.orgId)
            ? orgs.filter(org => org.id === email.orgId)
            : [];
        let orgId = org.length > 0 ? org[0].id : null;
        org = org.length > 0 ? org[0].orgName : "";

        let tempEmail = {
          ts: email.timeStamp,
          time: format(parseISO(email.timeStamp), "HH:mm"),
          text: email.subject,
          type: "Mail",
          baseUrl: null,
          id: email.id,
          icon: icon,
          notes: <Markup content={email.content.data[0].value} />,
          contact: contact,
          org: org,
          done: true,
          contactId: contactId,
          orgId: orgId
        };
        console.log("tempEmail", tempEmail);
        futureEvents.push(tempEmail);
      });
      console.log("events(object2)", object2);
    }

    this.setState({
      futureEvents: futureEvents.sort(
        (a, b) => new Date(b.ts) - new Date(a.ts)
      ),
      events: events.sort((a, b) => new Date(b.ts) - new Date(a.ts))
    });
  };

  toggleICPEdit = deal => {
    this.setState({
      dataLoaded: false
    });
    if (deal !== null && deal !== undefined && !isEmpty(deal)) {
      this.setState({
        deal: deal
      });
    }
    this.setState({
      editICPData: !this.state.editICPData,
      dataLoaded: true
    });
  };

  toggleshowArchiveDeal = deal => {
    this.setState({
      dataLoaded: false
    });
    if (deal !== null && deal !== undefined && !isEmpty(deal)) {
      this.setState({
        deal: deal
      });
    }
    this.setState({
      showArchiveDeal: !this.state.showArchiveDeal,
      dataLoaded: true
    });
  };

  setReactivation = deal => {
    console.log("this.state.deal", this.state.deal);
    this.setState({
      dataLoaded: false
    });
    if (deal !== null && deal !== undefined && !isEmpty(deal)) {
      this.setState({
        deal: deal
      });
    }
    this.setState({
      showReactivate: !this.state.showReactivate,
      dataLoaded: true
    });
  };

  toggleDValue = () => {
    //console.log("this.state.dValueEditing", this.state.dValueEditing);
    this.setState({
      dValueEditing: !this.state.dValueEditing
    });
  };

  handleWon = () => {
    //event.preventDefault();
    this.setState({
      updateWon: !this.state.updateWon
    });
  };

  handleLost = () => {
    this.setState({
      updateLost: !this.state.updateLost
    });
  };

  handleConvertToMQL = () => {
    //event.preventDefault();
    this.setState({
      convertToMQL: !this.state.convertToMQL
    });
  };

  handleConvertToSQL = () => {
    //event.preventDefault();
    this.setState({
      convertToSQL: !this.state.convertToSQL
    });
  };

  toggleAddActivity = () => {
    //event.preventDefault();
    this.setState({
      addActivity: !this.state.addActivity
    });
  };

  handleEditAct = actId => {
    this.setState({
      editActivity: true,
      editingAct: this.state.activities.filter(
        ata => ata.id === parseInt(actId)
      )[0]
    });
  };

  handleCloseEditAct = () => {
    this.setState({
      editActivity: false
    });
  };

  stageClick(selectedStage) {
    this.setState({ selected: selectedStage }, () => {
      let stage = this.state.stages.filter(
        stage => parseInt(selectedStage) === parseInt(stage.id)
      );
      console.log("stage", stage);
      this.setState({
        stageName: stage[0].stageName
      });
    });
    console.log("selected", selectedStage);
    console.log("this.state.deal.stageId", this.state.deal.stageId);
    console.log("stageName", this.state.stageName);

    if (this.state.deal.stageId === selectedStage) return;

    axios({
      method: "PUT",
      url: `/api/v1/app/deals/${this.state.dealId}`,
      data: { stageId: selectedStage },
      headers: { Authorization: `${this.props.authToken}` }
    })
      .then(data => {
        console.log("updated stage for deal", data.data.data);

        this.setState({
          deal: data.data.data
        });
      })
      .catch(error => console.log("error", error));
  }

  handleSelectUser = event => {
    this.setState({
      [event.target.id]: parseInt(event.target.value)
    });
  };

  validateAssignUserForm = () => {
    return this.state.newUserId > 0;
  };

  submitAssignUser = event => {
    event.preventDefault();

    axios({
      method: "PUT",
      url: `/api/v1/app/deals/${this.state.dealId}`,
      data: { userId: this.state.newUserId },
      headers: { Authorization: `${this.props.authToken}` }
    }).then(data => {
      console.log("received data", data.data.data);
      let dealUserName = this.state.users.filter(
        u => u.id === this.state.newUserId
      )[0].userName;

      this.setState({
        deal: data.data.data,
        dealUserName
      });

      this.handleAssignUser();
    });
  };

  handleChangeNewPipe = event => {
    let newPipeId = parseInt(event.target.value);

    this.setState({
      newPipeId
    });

    if (newPipeId > 0) {
      let newFilteredStages = this.state.stages.filter(
        s => s.pipeId === newPipeId
      );
      this.setState({
        newFilteredStages
      });
    } else {
      this.setState({
        newFilteredStages: []
      });
    }
  };

  handleChangeNewStage = event => {
    let newStageId = parseInt(event.target.value);

    this.setState({
      newStageId
    });
  };

  closeMoveToNewPipe = () => {
    this.setState({
      changePipe: !this.state.changePipe
    });
  };

  handleChangeNotes = event => {
    //event.preventDefault();

    console.log("event.target.value", event.target.value);

    this.setState({
      note: event.target.value
    });

    console.log("event.target.id", event.target.id);

    //call axios here
  };

  handleSubmitNotes = event => {
    event.preventDefault();

    let data = {
      content: this.state.note,
      attachment: "",
      orgId: parseInt(this.state.deal.orgId),
      dealId: parseInt(this.state.dealId),
      contactId: parseInt(this.state.deal.contactId)
    };

    console.log("Notes data before submit", data);

    axios({
      method: "POST",
      url: `/api/v1/app/notes`,
      data: data,
      headers: { Authorization: `${this.props.authToken}` }
    }).then(data => {
      console.log("data", data.data.data);
      let notes = this.state.connectedNotes;
      notes.push(data.data.data);

      this.setState({
        connectedNotes: notes
      });

      this.createTimelines(
        this.state.activities,
        this.state.activityTypes,
        this.state.contacts,
        this.state.orgs,
        notes,
        this.state.syncedEmails
      );
    });

    this.setState({
      note: ""
    });
  };

  handleDealChange(event) {
    event.preventDefault();

    console.log("event.target.value", event.target.value);

    this.setState({
      [event.target.id]: event.target.value
    });

    console.log("event.target.id", event.target.id);
  }

  updateDealValue = dealValue => {
    this.setState({
      dealValue: dealValue
    });
  };

  handleSubmitDeal(event) {
    event.preventDefault();

    const { dealName, dealValue } = this.state;

    axios({
      method: "PUT",
      url: `/api/v1/app/deals/${this.state.dealId}`,
      data: { dealName: dealName, dealValue: dealValue },
      headers: { Authorization: `${this.props.authToken}` }
    });

    this.setState({
      dealName: dealName,
      dealValue: dealValue,
      dealEditing: false,
      dValueEditing: false
    });
    //this.refs["DealNameForm"].submit();

    //call axios to save
  }

  handleDValueChange = event => {
    //event.preventDefault();
    console.log("event.target.id", event.target.id);
    console.log("event.target.value", event.target.value);

    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmitDValue(event) {
    event.preventDefault();

    const { dealValue } = this.state;

    axios({
      method: "PUT",
      url: `/api/v1/app/deals/${this.state.dealId}`,
      data: { dealValue: dealValue },
      headers: { Authorization: `${this.props.authToken}` }
    });

    this.setState({
      dealValue: dealValue,
      dValueEditing: false
    });
  }

  changeToNewStage = event => {
    event.preventDefault();

    this.setState({
      dataLoaded: false
    });

    axios({
      method: "PUT",
      url: `/api/v1/app/deals/${this.state.dealId}`,
      data: { stageId: this.state.newStageId },
      headers: { Authorization: `${this.props.authToken}` }
    })
      .then(data => {
        console.log("update deal", data.data.data);

        this.setState({
          deal: data.data.data,
          dataLoaded: true
        });
        this.closeMoveToNewPipe();
      })
      .catch(error => console.log("error", error));
  };

  submitExpectedClosure = event => {
    event.preventDefault();

    this.setState({
      dataLoaded: false
    });

    axios({
      method: "PUT",
      url: `/api/v1/app/deals/${this.state.dealId}`,
      data: { closureDate: this.state.closureDate },
      headers: { Authorization: `${this.props.authToken}` }
    })
      .then(data => {
        console.log("update deal", data.data.data);

        this.setState({
          deal: data.data.data,
          dataLoaded: true
        });
        this.changeExpectedClosure();
      })
      .catch(error => console.log("error", error));
  };

  toggleDealName() {
    //const { dealEditing } = this.state;
    this.setState({ dealEditing: true });
  }

  changeExpectedClosure = () => {
    this.setState({
      openClosureDateForm: !this.state.openClosureDateForm
    });
  };

  setTakeNotes = () => {
    this.setState({ takeNotes: !this.state.takeNotes });
  };

  handleAssignUser = () => {
    this.setState({
      openAssignUserForm: !this.state.openAssignUserForm
    });
  };

  updateActivities = (activity, type) => {
    console.log("activity", activity);
    if (type === "new") {
      this.setState({
        addActivity: false
      });

      let activities = this.state.activities;

      activities.push(activity);

      this.setState({
        activities: activities
      });

      this.createTimelines(
        activities,
        this.state.activityTypes,
        this.state.contacts,
        this.state.orgs,
        this.state.note,
        this.state.syncedEmails
      );

      if (activity.isCompleted) {
        this.setState({
          addActivity: true
        });
      }
    } else {
      this.setState({
        editActivity: false
      });
      let activities = this.state.activities;

      activities = activities.map(a => {
        if (a.id === activity.id) {
          return activity;
        } else {
          return a;
        }
      });

      this.setState({
        activities: activities
      });

      this.createTimelines(
        activities,
        this.state.activityTypes,
        this.state.contacts,
        this.state.orgs,
        this.state.note,
        this.state.syncedEmails
      );
      if (activity.isCompleted) {
        this.setState({
          addActivity: true
        });
      }
    }
  };

  updateDealSource = deal => {
    this.setState({
      deal: deal
    });
  };

  updateDealOrg = org => {
    this.setState({
      org: org,
      orgName: org.orgName
    });

    console.log("this.state.org", this.state.org);
  };

  updateDealContact = contact => {
    this.setState({
      contact: contact
    });

    console.log("this.state.contact", this.state.contact);
  };

  updateContacts = (contact, type) => {
    let people = this.state.people;

    if (type === "new") {
      people.push(contact);
    }

    this.setState({
      people
    });
  };

  updateDeal = deal => {
    this.setState({
      deal: deal,
      statusId: deal.statusId,
      dealTeamId:
        deal.statusId !== undefined &&
        deal.statusId !== null &&
        !isNaN(deal.statusId)
          ? this.state.dealStatuses.filter(ds => ds.id === deal.statusId)[0]
              .teamId
          : 1,
      dealUserId:
        deal.userId !== undefined && deal.userId !== null ? deal.userId : null,
      dealUserName: this.state.users.filter(user => user.id === deal.userId)[0]
        .userName
    });
  };

  updateDealICP = deal => {
    this.setState({
      deal: deal
    });
  };

  updateSmartBcc = deal => {
    this.setState({
      deal: deal,
      smartBCC: deal.smartBCC
    });
  };

  nonexistantDeal = () => {
    return (
      <Alert
        style={{
          padding: "100px",
          textAlign: "center",
          fontSize: "24px",
          color: "#adadad"
        }}
      >
        Oops, it appears the deal does not exist or we were unable to retrieve
        the deal details at the moment. Please check if deal exists and is part
        of your organization.
      </Alert>
    );
  };

  renderNav() {
    /*
    const {
      //isLoading,
      //orgOptions,
      //contactOptions,
      //valueOrg,
      //valueContact,
      //filteredContacts,
      //filteredReasons,
      //filtered
    } = this.state;
*/
    return (
      <Navbar
        bg="dark"
        variant="light"
        expand="sm"
        border-radius="5"
        className="navbar"
        style={{ borderRadius: "0px 5px 5px 0px", color: "#dddddd" }}
      >
        {/*<Navbar.Toggle />*/}

        <Navbar.Collapse>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <Nav className="justify-content-center InnerNavTop">
                {this.state.dataLoaded && !this.state.dealEditing ? (
                  <p className="para">
                    <span
                      className="HeaderSpan"
                      onDoubleClick={() => this.setState({ dealEditing: true })}
                    >
                      {this.state.dealName}
                    </span>
                    {this.state.dataLoaded &&
                    this.state.deal.icpData !== null &&
                    !isEmpty(this.state.deal.icpData) &&
                    this.state.deal.icpData.scores.find(
                      score => score.teamId === this.state.dealTeamId
                    ) ? (
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="top">
                            ICP Score (Double Click to Edit)
                          </Tooltip>
                        }
                      >
                        <i
                          className="far fa-star"
                          style={{
                            marginLeft: "20px",
                            color:
                              this.state.deal.icpData.scores.filter(
                                score => score.teamId === this.state.dealTeamId
                              )[0].score >=
                              this.state.masterICP[0].teams.scores.filter(
                                score => score.id === this.state.dealTeamId
                              )[0].minScore
                                ? "#36a852"
                                : "#fff700",
                            paddingBottom: "20px",
                            paddingTop: "0px",
                            marginTop: "0px",
                            cursor: "pointer"
                          }}
                          onDoubleClick={() => this.toggleICPEdit(null)}
                        >
                          {" "}
                          {this.state.deal.icpData.scores
                            .filter(
                              score => score.teamId === this.state.dealTeamId
                            )[0]
                            .score.toFixed(2) + " %"}
                        </i>
                      </OverlayTrigger>
                    ) : null}
                  </p>
                ) : (
                  <Form ref="DealNameForm" onBlur={this.handleSubmitDeal}>
                    <FormGroup controlId="dealName">
                      <FormControl
                        onChange={this.handleDealChange}
                        value={this.state.dealName}
                        type="input"
                        size="sm"
                      />
                    </FormGroup>
                  </Form>
                )}
              </Nav>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              {/*<Nav
            className="mr-auto justify-content-center"
            defaultActiveKey="/deals/all"
          />*/}

              <Nav
                justify
                className="justify-content-end"
                style={{ float: "right" }}
              >
                <p className="para" />
                {this.state.deal.isActive ? (
                  this.state.deal.statusId !== 8 ? (
                    this.state.dealTeamId === 3 ? (
                      this.state.updateWon === false ? (
                        this.state.deal.statusId === 7 ? (
                          <LoaderButton
                            className="buttonDeal"
                            variant="outline-danger"
                            size="sm"
                            disabled
                            text="Lost"
                          />
                        ) : (
                          <React.Fragment>
                            <LoaderButton
                              className="buttonDeal"
                              variant="outline-info"
                              size="sm"
                              onClick={this.handleWon}
                              text="To Won"
                            />
                            <p className="para" />
                            <LoaderButton
                              className="buttonDeal"
                              variant="outline-warning"
                              size="sm"
                              onClick={this.handleLost}
                              text="To Lost"
                            />
                          </React.Fragment>
                        )
                      ) : null
                    ) : this.state.dealTeamId === 2 ? (
                      this.state.convertToSQL === false ? (
                        this.state.deal.statusId === 5 ? (
                          <LoaderButton
                            className="buttonDeal"
                            variant="outline-danger"
                            size="sm"
                            disabled
                            text="Lost"
                          />
                        ) : (
                          <React.Fragment>
                            <LoaderButton
                              className="buttonDeal"
                              variant="outline-info"
                              size="sm"
                              onClick={this.handleConvertToSQL}
                              text="To SQL"
                            />
                            <p className="para" />
                            <LoaderButton
                              className="buttonDeal"
                              variant="outline-warning"
                              size="sm"
                              onClick={this.handleLost}
                              text="To Lost"
                            />
                          </React.Fragment>
                        )
                      ) : null
                    ) : this.state.dealTeamId === 1 &&
                      this.state.convertToMQL === false ? (
                      this.state.deal.statusId === 2 ? (
                        <LoaderButton
                          className="buttonDeal"
                          variant="outline-danger"
                          size="sm"
                          disabled
                          text="Lost"
                        />
                      ) : (
                        <React.Fragment>
                          <LoaderButton
                            className="buttonDeal"
                            variant="outline-info"
                            size="sm"
                            onClick={this.handleConvertToMQL}
                            text="To MQL"
                          />
                          <p className="para" />
                          <LoaderButton
                            className="buttonDeal"
                            variant="outline-warning"
                            size="sm"
                            onClick={this.handleLost}
                            text="To Lost"
                          />
                        </React.Fragment>
                      )
                    ) : null
                  ) : (
                    <LoaderButton
                      className="buttonDeal"
                      variant="outline-success"
                      size="sm"
                      disabled
                      text="Won Deal"
                    />
                  )
                ) : (
                  <span
                    className="archivedSpan"
                    style={{ cursor: "pointer" }}
                    onDoubleClick={() => this.setReactivation(null)}
                  >
                    Archived
                  </span>
                )}
                <p className="para" />
                <p className="para" />
                <DropdownButton
                  title="..."
                  variant="outline-secondary"
                  size="sm"
                  drop="left"
                >
                  <Dropdown.Item onSelect={() => this.handleAssignUser()}>
                    Assign to new User
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={() => this.toggleshowArchiveDeal(null)}
                  >
                    Archive Deal
                  </Dropdown.Item>
                </DropdownButton>
                {this.state.openAssignUserForm && this.assignUserForm()}
                {/*
            <LoaderButton
              size="lg"
              text="..."
              variant="warning"
              onClick={this.closeMoveToNewPipe}
            />
            {this.state.changePipe ? this.moveToNewPipe() : null}
            */}
              </Nav>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  renderNav2() {
    return (
      <Navbar
        bg="dark"
        variant="light"
        expand="sm"
        border-radius="2"
        className="navbar"
        style={{ borderRadius: "5px", color: "#dddddd" }}
      >
        {/*<Navbar.Toggle />*/}

        <Navbar.Collapse>
          <Nav className="justify-content-center">
            {this.state.dataLoaded && this.state.dValueEditing === false ? (
              <p className="para">
                <i
                  className="NormalSpan fas fa-dollar-sign"
                  onDoubleClick={this.toggleDValue}
                />{" "}
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="top">
                      <strong>Double Click on "$" to Edit</strong>.
                    </Tooltip>
                  }
                >
                  <span className="NormalSpan">
                    {this.state.dealValue ? this.state.dealValue : 0}
                  </span>
                </OverlayTrigger>
              </p>
            ) : null}
            <p className="para" />
            <p className="para">
              <i className="NormalSpan fas fa-user" />{" "}
              <span className="NormalSpan">
                <a href={`/people/details/${this.state.contact.id}`}>
                  {this.state.contactName}
                </a>
              </span>
            </p>
            <p className="para" />
            <p className="para">
              <i className="NormalSpan fas fa-building" />{" "}
              <span className="NormalSpan">
                <a href={`/orgs/details/${this.state.org.id}`}>
                  {this.state.orgName}
                </a>
              </span>
            </p>
          </Nav>
          <Nav justify className="justify-content-end ml-auto">
            <span className="NormalSpan" onDoubleClick={this.handleAssignUser}>
              {this.state.dealUserName}
            </span>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  closureDateForm = () => {
    return (
      <Modal
        show={this.state.openClosureDateForm}
        onHide={this.changeExpectedClosure}
        size="md"
        centered
      >
        <Modal.Body>
          <Container fluid>
            <Form>
              <Form.Group as={Row} controlId="closureDate">
                <Col>
                  <Form.Label>Expected Closure Date</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="date"
                    value={this.state.closureDate}
                    onChange={this.handleDValueChange}
                  />
                </Col>
              </Form.Group>
              <Row>
                <Col>
                  <LoaderButton
                    variant="outline-warning"
                    text="Escape!"
                    size="sm"
                    block
                    onClick={this.changeExpectedClosure}
                  />
                </Col>
                <Col>
                  <LoaderButton
                    variant="outline-info"
                    text="Save"
                    size="sm"
                    block
                    onClick={this.submitExpectedClosure}
                  />
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    );
  };

  assignUserForm = () => {
    return (
      <Modal
        show={this.state.openAssignUserForm}
        onHide={this.handleAssignUser}
        size="md"
      >
        <Modal.Body>
          <Container fluid>
            <Form>
              <Form.Group as={Row} controlId="newUserId">
                <Col>
                  <Form.Label>Assign to User</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={this.state.newUserId}
                    onChange={this.handleSelectUser}
                  >
                    <option key={0} value={0}>
                      Select a User
                    </option>
                    {this.state.users && this.state.users.length > 0
                      ? this.state.users.map(u => (
                          <option key={u.id} value={u.id}>
                            {u.userName}
                          </option>
                        ))
                      : null}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Row>
                <Col>
                  <LoaderButton
                    variant="outline-warning"
                    text="Escape!"
                    size="sm"
                    block
                    onClick={this.handleAssignUser}
                  />
                </Col>
                <Col>
                  <LoaderButton
                    variant="outline-info"
                    text="Assign"
                    size="sm"
                    block
                    onClick={this.submitAssignUser}
                    disabled={!this.validateAssignUserForm()}
                  />
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    );
  };

  renderPipe() {
    return (
      <div className="Pipe">
        <ListGroup button="true" className="list-group-horizontal">
          {this.state.stages ? this.renderStages() : null}
        </ListGroup>

        <LoaderButton
          size="sm"
          text={"Stage - " + this.state.stageName}
          variant="outline-info"
          disabled
          className="SpanStage"
          style={{ marginTop: "5px" }}
        />

        <LoaderButton
          size="sm"
          text={
            "Expected Closure Date - " + this.state.deal.closureDate !== null &&
            isValid(parseISO(this.state.deal.closureDate))
              ? format(parseISO(this.state.deal.closureDate), "dd-MM-yyyy")
              : "Closure Date - Not set"
          }
          variant={
            isValid(parseISO(this.state.deal.closureDate)) &&
            isFuture(parseISO(this.state.deal.closureDate))
              ? "outline-dark"
              : "outline-danger"
          }
          className="SpanDate"
          onDoubleClick={this.changeExpectedClosure}
          style={{
            marginTop: "5px"
          }}
        />

        {this.state.dataLoaded && this.state.openClosureDateForm
          ? this.closureDateForm()
          : null}
      </div>
    );
  }

  renderStages() {
    return this.state.stages
      .sort((a, b) => a.order - b.order)
      .map((stage, i) => {
        if (stage.pipeId === this.state.pipeId) {
          return (
            <ListGroup.Item
              onClick={() => this.stageClick(stage.id)}
              className={
                this.state.selected === stage.id ? "LGItemActive" : "LGItem"
              }
              key={stage.id}
              value={stage.id}
              action
            >
              {stage.stageName}
            </ListGroup.Item>
          );
        } else {
          return null;
        }
      });
  }

  renderContentHeader() {
    return (
      <Card bg="dark" className="ContentHeader">
        <Card.Header>
          <Navbar
            bg="dark"
            variant="light"
            expand="sm"
            border-radius="2"
            className="navbar-content"
          >
            {/*<Navbar.Toggle />*/}

            <Navbar.Collapse>
              <Nav
                className="justify-content-center"
                style={{ textAlign: "right" }}
              >
                <p className="para">
                  <LoaderButton
                    variant="secondary"
                    size="sm"
                    onClick={this.setTakeNotes}
                    className="ContentSpan far fa-sticky-note"
                    text="  Take Notes"
                    loadingText="Enabling..."
                    style={{ color: "#dddddd" }}
                  />
                </p>

                {/*<p className="para" />*/}

                <p className="para">
                  <LoaderButton
                    variant="secondary"
                    size="sm"
                    onClick={this.toggleAddActivity}
                    className="far fa-calendar-plus ContentSpan"
                    text="  Add Activity"
                    loadingText="Opening window..."
                    style={{ color: "#dddddd" }}
                  />
                </p>

                <p className="para" />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Card.Header>
        <Card.Body className="CHCBody">
          {this.state.takeNotes && (
            <Form onSubmit={this.handleSubmitNotes}>
              <Form.Group controlId="note">
                <InputGroup className="mb-3" id="note">
                  <FormControl
                    onChange={this.handleChangeNotes}
                    value={this.state.note}
                    type="textarea"
                    size="lg"
                  />
                  <InputGroup.Append>
                    <LoaderButton
                      variant="outline-info"
                      type="submit"
                      text="Save"
                      size="sm"
                      disabled={this.state.note.length < 4}
                    />
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form>
          )}
        </Card.Body>
      </Card>
    );
  }

  moveToNewPipe = () => {
    return (
      <Modal
        size="md"
        show={this.state.changePipe}
        centered
        onHide={this.closeMoveToNewPipe}
      >
        <Modal.Header closeButton>Move to new Pipe</Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Form>
              <Form.Group as={Row} controlId="newPipeId">
                <Col>
                  <Form.Label>New Pipeline</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={this.state.newPipeId}
                    onChange={this.handleChangeNewPipe}
                  >
                    <option key={0} value={0}>
                      Select a Pipeline
                    </option>
                    {this.state.pipes &&
                      this.state.pipes.length > 0 &&
                      this.state.pipes
                        .filter(p => p.teamId <= 3)
                        .map(p => (
                          <option key={p.id} value={p.id}>
                            {p.pipeName}
                          </option>
                        ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="newStageId">
                <Col>
                  <Form.Label>New Stage</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={this.state.newStageId}
                    onChange={this.handleChangeNewStage}
                  >
                    <option key={0} value={0}>
                      Select a Stage
                    </option>
                    {this.state.newFilteredStages &&
                      this.state.newFilteredStages.length > 0 &&
                      this.state.newFilteredStages.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.stageName}
                        </option>
                      ))}
                  </Form.Control>
                </Col>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container fluid>
            <Row>
              <Col>
                <LoaderButton
                  text="Escape!"
                  variant="outline-warning"
                  size="sm"
                  onClick={this.closeMoveToNewPipe}
                  block
                />
              </Col>
              <Col>
                <LoaderButton
                  text="Save & Close"
                  variant="outline-info"
                  size="sm"
                  onClick={this.changeToNewStage}
                  block
                />
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    return (
      <Container fluid className="Timeline1">
        <Row>
          <Col>
            <Card bg="dark" className="CardHeader">
              <Card.Body>
                {this.state.dealDoesNotExist ? this.nonexistantDeal() : null}
                <div>{this.state.dataLoaded && this.renderNav()}</div>
                <div>{this.state.dataLoaded && this.renderNav2()}</div>
                <div>{this.state.dataLoaded && this.renderPipe()}</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="3" lg="3" md="3" sm="3" xl="3">
            {" "}
            {this.state.dataLoaded && (
              <ShowDetails
                deal={this.state.deal}
                dealStatuses={this.state.dealStatuses}
                reasons={this.state.reasons}
                updateDealSource={this.updateDealSource}
                authToken={this.props.authToken}
              />
            )}
            {this.state.dataLoaded && (
              <ShowOrgs
                companyTypes={this.state.companyTypes}
                org={this.state.org}
                deal={this.state.deal}
                authToken={this.props.authToken}
                updateDealOrg={this.updateDealOrg}
              />
            )}
            {this.state.dataLoaded && (
              <ShowOneContact
                contactTypes={this.state.contactTypes}
                contact={this.state.contact}
                authToken={this.props.authToken}
                updateDealContact={this.updateDealContact}
                updateFunction={this.updateDeal}
                deal={this.state.deal}
                people={this.state.people}
                type="deal"
              />
            )}
            {this.state.dataLoaded && (
              <ShowContacts
                people={this.state.people}
                authToken={this.props.authToken}
                contactTypes={this.props.commonData.contactTypes}
                tenantId={this.state.tenantId}
                userId={this.state.userId}
                org={this.state.org}
                updateFunction={this.updateContacts}
              />
            )}
            {this.state.dataLoaded && (
              <Overview
                deal={this.state.deal}
                activities={this.state.activities}
              />
            )}
            {this.state.dataLoaded && (
              <SmartBcc
                deal={this.state.deal}
                updateFunction={this.updateSmartBcc}
                authToken={this.props.authToken}
              />
            )}
          </Col>

          <Col
            xs="9"
            lg="9"
            md="9"
            sm="9"
            xl="9"
            style={{ margin: "0px", padding: "0px" }}
          >
            {this.state.dataLoaded && (
              <Card bg="dark" className="BadgeCard">
                <Card.Body>
                  {this.state.dataLoaded && this.renderContentHeader()}

                  <br />

                  <Badge className="badge" pill variant="info">
                    Planned
                  </Badge>
                  <br />
                  {this.state.dataLoaded &&
                  this.state.futureEvents.length > 0 ? (
                    <Timeline items={futureEvents} />
                  ) : (
                    <span className="SpanContacts">
                      Nothing scheduled for this deal
                    </span>
                  )}
                  <br />

                  <Badge className="badge" pill variant="info">
                    Past
                  </Badge>
                  <br />
                  {this.state.dataLoaded && this.state.events.length > 0 ? (
                    <Timeline items={events} />
                  ) : (
                    <span className="SpanContacts">
                      No actions have happened yet on this deal
                    </span>
                  )}
                </Card.Body>
              </Card>
            )}

            <br />
          </Col>
        </Row>
      </Container>
    );
  }
}
