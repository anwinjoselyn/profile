import React, { useState, useEffect } from "react";

import {
  //Tabs,
  Select,
  Row,
  Col,
  Skeleton,
  Card,
  Input,
  Space,
  DatePicker,
  //TimePicker,
  Drawer,
  Tooltip,
  Button,
  Checkbox,
  message
} from "antd";

//import { CalendarOutlined } from "@ant-design/icons";

import {
  format,
  parseISO,
  isValid,
  isFuture,
  isPast,
  isToday,
  isTomorrow,
  addDays,
  isSameWeek,
  isThisWeek,
  sub
} from "date-fns";
import moment from "moment";

import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import { isEmpty } from "../../../../../libs/validators";

import Inbox from "./Inbox";
import Explanation from "./Explanation";

import "../Activities.css";
import "../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const { Option } = Select;
const period = [
  { id: 1, name: "Planned" },
  { id: 2, name: "Overdue" },
  { id: 3, name: "Today" },
  { id: 4, name: "Tomorrow" },
  { id: 5, name: "This Week" },
  { id: 6, name: "Next Week" }
];

const toolbarOptions = require("./Editor/toolbarOptions.json").data;

const AllActivities = props => {
  //console.log("props.saTeamActs", props.saTeamActs);
  const [actSelectFlag, setSelectFlag] = useState(false);
  //const [dealType, setDealType] = useState(null);
  const [selectedAct, setActSelect] = useState({});
  const [localEditorState, setEditorState] = useState(
    EditorState.createEmpty()
  );

  const [actType, setActType] = useState(0);
  const [actPeriod, setActPeriod] = useState(2);
  const [actTeam, setActTeam] = useState(1);
  const [actUser, setActUser] = useState(props.userId);
  const [localActs, setLocalActs] = useState([]);

  const [visible, setVisible] = useState(false);

  const [processedActs, setProcessedActs] = useState([]);
  //const [filteredActs, setFilteredActs] = useState([]);
  const [userActs, setUserActs] = useState([]);
  const [maTeamActs, setMaTeamActs] = useState([]);
  //const [maTeamUsers, setMaTeamUsers] = useState([]);
  const [sdTeamActs, setSdTeamActs] = useState([]);
  //const [sdTeamUsers, setSdTeamUsers] = useState([]);
  const [saTeamActs, setsaTeamActs] = useState([]);
  //const [saTeamUsers, setSaTeamUsers] = useState([]);
  //const [csTeamUsers, setCsTeamUsers] = useState([]);
  const [csTeamActs, setCsTeamActs] = useState([]);
  //const [reTeamUsers, setReTeamUsers] = useState([]);
  const [reTeamActs, setReTeamActs] = useState([]);
  //const [allTeamActs, setAllTeamActs] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const changeAct = a => {
    console.log("a", a);
    if (!actSelectFlag) {
      setActSelect(a);
      setVisible(true);
    } else {
      setActSelect({});
      setVisible(false);
    }
    setSelectFlag(!actSelectFlag);
  };

  const onClose = () => {
    setVisible(false);
    setActSelect({});
    setSelectFlag(false);
  };

  useEffect(() => {
    let allActivitiesNew = [];

    props.users.forEach(u => {
      let userActs = props.activities.filter(a => a.userId === u.id);
      let userCActs = [];
      let userRActs = [];
      console.log("userActs", userActs);

      let userSEmails = props.syncedEmails.filter(se => se.userId === u.id);

      let allUserActs = [];
      if (userActs !== undefined && userActs.length > 0) {
        userActs.forEach(a => allUserActs.push(a));
      }
      if (userRActs !== undefined && userRActs.length > 0) {
        userRActs.forEach(a => allUserActs.push(a));
      }
      if (userCActs !== undefined && userCActs.length > 0) {
        userCActs.forEach(a => allUserActs.push(a));
      }

      let allUserDealsNew = props.allDeals.filter(d => d.userId === u.id);
      let allUserRDealsNew = [];
      let allUserCustsNew = [];

      allActivitiesNew.push({
        userId: u.id,
        openUserActs: allUserActs.filter(a => !a.isCompleted),
        allUserActs: allUserActs,
        allUserDeals: allUserDealsNew,
        allUserRDeals: allUserRDealsNew,
        allUserCusts: allUserCustsNew,
        userSEmails: userSEmails
      });
    });

    let mteamUsers = props.users.filter(
      tu => tu.teamId === 1 || tu.teamId === 6
    );
    console.log("mteamUsers", mteamUsers);
    let sdteamUsers = props.users.filter(
      tu => tu.teamId === 2 || tu.teamId === 6
    );
    console.log("sdteamUsers", sdteamUsers);
    let sateamUsers = props.users.filter(
      tu => tu.teamId === 3 || tu.teamId === 6
    );
    console.log("sateamUsers", sateamUsers);
    let csteamUsers = props.users.filter(
      tu => tu.teamId === 4 || tu.teamId === 6
    );
    console.log("csteamUsers", csteamUsers);
    let reteamUsers = props.users.filter(
      tu => tu.teamId === 5 || tu.teamId === 6
    );
    console.log("reteamUsers", reteamUsers);
    let mteamActivities = [];
    let sdteamActivities = [];
    let sateamActivities = [];
    let csteamActivities = [];
    let reteamActivities = [];
    //console.log("mteamUsers", mteamUsers);
    //console.log("sdteamUsers", sdteamUsers);
    //console.log("sateamUsers", sateamUsers);
    //console.log("csteamUsers", csteamUsers);
    //console.log("reteamUsers", reteamUsers);

    for (let i = 0; i < mteamUsers.length; i++) {
      mteamActivities.push({
        id: mteamUsers[i].id,
        name: mteamUsers[i].userName,
        activities: allActivitiesNew.filter(
          aan => aan.userId === mteamUsers[i].id
        )[0].openUserActs,
        allActivities: allActivitiesNew.filter(
          aan => aan.userId === mteamUsers[i].id
        )[0].allUserActs,
        allSEmails: allActivitiesNew.filter(
          aan => aan.userId === mteamUsers[i].id
        )[0].userSEmails
      });
    }
    console.log("mteamActivities", mteamActivities);

    for (let i = 0; i < sdteamUsers.length; i++) {
      sdteamActivities.push({
        id: sdteamUsers[i].id,
        name: sdteamUsers[i].userName,
        activities: allActivitiesNew.filter(
          aan => aan.userId === sdteamUsers[i].id
        )[0].openUserActs,
        allActivities: allActivitiesNew.filter(
          aan => aan.userId === sdteamUsers[i].id
        )[0].allUserActs,
        allSEmails: allActivitiesNew.filter(
          aan => aan.userId === sdteamUsers[i].id
        )[0].userSEmails
      });
    }
    console.log("sdteamActivities", sdteamActivities);

    for (let i = 0; i < sateamUsers.length; i++) {
      sateamActivities.push({
        id: sateamUsers[i].id,
        name: sateamUsers[i].userName,
        activities: allActivitiesNew.filter(
          aan => aan.userId === sateamUsers[i].id
        )[0].openUserActs,
        allActivities: allActivitiesNew.filter(
          aan => aan.userId === sateamUsers[i].id
        )[0].allUserActs,
        allSEmails: allActivitiesNew.filter(
          aan => aan.userId === sateamUsers[i].id
        )[0].userSEmails
      });
    }
    console.log("sateamActivities", sateamActivities);

    for (let i = 0; i < csteamUsers.length; i++) {
      csteamActivities.push({
        id: csteamUsers[i].id,
        name: csteamUsers[i].userName,
        activities: allActivitiesNew.filter(
          aan => aan.userId === csteamUsers[i].id
        )[0].openUserActs,
        allActivities: allActivitiesNew.filter(
          aan => aan.userId === csteamUsers[i].id
        )[0].allUserActs,
        allSEmails: allActivitiesNew.filter(
          aan => aan.userId === csteamUsers[i].id
        )[0].userSEmails
      });
    }
    console.log("csteamActivities", csteamActivities);

    for (let i = 0; i < reteamUsers.length; i++) {
      reteamActivities.push({
        id: reteamUsers[i].id,
        name: reteamUsers[i].userName,
        activities: allActivitiesNew.filter(
          aan => aan.userId === reteamUsers[i].id
        )[0].openUserActs,
        allActivities: allActivitiesNew.filter(
          aan => aan.userId === reteamUsers[i].id
        )[0].allUserActs,
        allSEmails: allActivitiesNew.filter(
          aan => aan.userId === reteamUsers[i].id
        )[0].userSEmails
      });
    }
    console.log("reteamActivities", reteamActivities);

    let allTeamActivities = [];

    mteamActivities.forEach(ta => {
      if (ta.activities !== undefined && ta.activities.length > 0) {
        ta.activities.forEach(ta => allTeamActivities.push(ta));
      }
    });
    sdteamActivities.forEach(ta => {
      if (ta.activities !== undefined && ta.activities.length > 0) {
        ta.activities.forEach(ta => allTeamActivities.push(ta));
      }
    });
    sateamActivities.forEach(ta => {
      if (ta.activities !== undefined && ta.activities.length > 0) {
        ta.activities.forEach(ta => allTeamActivities.push(ta));
      }
    });
    csteamActivities.forEach(ta => {
      if (ta.activities !== undefined && ta.activities.length > 0) {
        ta.activities.forEach(ta => allTeamActivities.push(ta));
      }
    });
    reteamActivities.forEach(ta => {
      if (ta.activities !== undefined && ta.activities.length > 0) {
        ta.activities.forEach(ta => allTeamActivities.push(ta));
      }
    });

    //console.log("unfiltered allTeamActivities", allTeamActivities);

    let jsonObject = allTeamActivities.map(JSON.stringify);

    //console.log(jsonObject);

    let uniqueSet = new Set(jsonObject);
    allTeamActivities = Array.from(uniqueSet).map(JSON.parse);

    console.log("filtered allTeamActivities", allTeamActivities);
    //console.log("allActivitiesNew", allActivitiesNew);

    let newUserActivities = allActivitiesNew.filter(
      aan => aan.userId === props.userId
    )[0].openUserActs;

    console.log(
      "activities from filtering newUserActivities",
      newUserActivities
    );

    setUserActs(newUserActivities);
    /*
    setFilteredActs(
      newUserActivities.length > 0
        ? newUserActivities.filter(a => isToday(parseISO(a.activityDate)))
        : []
    );
    */
    setProcessedActs(allActivitiesNew);
    console.log("allActivitiesNew", allActivitiesNew);

    if (
      mteamActivities &&
      sdteamActivities &&
      sateamActivities &&
      csteamActivities &&
      reteamActivities &&
      allTeamActivities
    ) {
      setMaTeamActs(mteamActivities);
      //setMaTeamUsers(mteamUsers);
      setSdTeamActs(sdteamActivities);
      //setSdTeamUsers(sdteamUsers);
      setsaTeamActs(sateamActivities);
      //setSaTeamUsers(sateamUsers);
      setCsTeamActs(csteamActivities);
      //setCsTeamUsers(csteamUsers);
      setReTeamActs(reteamActivities);
      //setReTeamUsers(reteamUsers);
      //setAllTeamActs(allTeamActivities);
      setLocalActs(newUserActivities);
      setLoaded(true);
    }
  }, [
    props.users,
    props.activities,
    props.userId,
    props.allDeals,
    props.syncedEmails
  ]);

  useEffect(() => {
    if (!isEmpty(selectedAct) && selectedAct.content) {
      if (selectedAct.content) {
        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(selectedAct.content))
          )
        );
      } else {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [selectedAct]);

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };
  /*
  const saveEditorContent = data => {
    localStorage.setItem("editorData", JSON.stringify(data));
  };

  const getSavedEditorData = () => {
    const savedData = localStorage.getItem("editorData");

    return savedData ? JSON.parse(savedData) : null;
  };

  const renderContentAsRawJs = () => {
    const contentState = localEditorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    return JSON.stringify(raw, null, 2);
  };
*/
  const getFilteredActs = (type, id) => {
    console.log("type, id", type, id);
    let filteredActs = [];
    console.log("processedActs", processedActs);

    let currentUserActivities = [];

    if (type === "user" && id > 0) {
      let userId = id;
      currentUserActivities = processedActs.filter(
        aa => aa.userId === userId
      )[0].openUserActs;
    } else if (type === "user" && id === 0) {
      console.log("Else if happened");
      let value = actTeam;
      currentUserActivities = [];

      if (value === 1)
        maTeamActs.forEach(data => {
          //console.log("data.activities", data.activities);
          currentUserActivities = [
            ...currentUserActivities,
            ...data.activities
          ];
          //console.log("acts", acts);
        });
      if (value === 2)
        sdTeamActs.forEach(data => {
          currentUserActivities = [
            ...currentUserActivities,
            ...data.activities
          ];
          //console.log("data.activities", data.activities);
        });
      if (value === 3)
        saTeamActs.forEach(
          data =>
            (currentUserActivities = [
              ...currentUserActivities,
              ...data.activities
            ])
        );
      if (value === 4)
        csTeamActs.forEach(
          data =>
            (currentUserActivities = [
              ...currentUserActivities,
              ...data.activities
            ])
        );
      if (value === 5)
        reTeamActs.forEach(
          data =>
            (currentUserActivities = [
              ...currentUserActivities,
              ...data.activities
            ])
        );
    }

    if (parseInt(actType) > 0) {
      //console.log("actType > 0 happened");
      let type = props.activityTypes.filter(act => actType === act.id);
      //console.log("Act Type", type);
      //let activityTypeFilter = type === null ? "All" : type[0].name;
      //let activityTypeIdFilter = type[0].id;
      currentUserActivities = currentUserActivities.filter(
        act => act.activityTypeId === type[0].id
      );
    }

    let selectedPeriodId = actPeriod;
    console.log("currentUserActivities", currentUserActivities);

    if (type === "period") {
      //currentUserActivities = userActs;
      selectedPeriodId = id;
    }
    console.log("selectedPeriodId", selectedPeriodId);

    if (type === "actType") {
      currentUserActivities = userActs;
      let selectedActType = id;
      //let activityTypeFilter = "";
      //let activityTypeIdFilter = 0;

      if (selectedActType === 0) {
        console.log("Act Type", selectedActType);

        //activityTypeFilter = "All";
        //activityTypeIdFilter = 0;
      } else {
        let type = props.activityTypes.filter(
          act => selectedActType === act.id
        );
        console.log("Act Type", type);
        //activityTypeFilter = type === null ? "All" : type[0].name;
        //activityTypeIdFilter = type[0].id;
        currentUserActivities = currentUserActivities.filter(
          act => act.activityTypeId === type[0].id
        );
      }
    }

    console.log("currentUserActivities", currentUserActivities);

    switch (selectedPeriodId) {
      case 1:
        filteredActs = currentUserActivities.filter(act =>
          isFuture(
            sub(parseISO(act.activityDate), {
              years: 0,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 4 + props.dst,
              minutes: 30,
              seconds: 0
            })
          )
        );
        console.log("filteredActs", filteredActs);
        break;
      case 2:
        filteredActs = currentUserActivities.filter(act =>
          isPast(
            sub(parseISO(act.activityDate), {
              years: 0,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 4 + props.dst,
              minutes: 30,
              seconds: 0
            })
          )
        );
        console.log("filteredActs", filteredActs);
        break;
      case 3:
        filteredActs = currentUserActivities.filter(act =>
          isToday(
            sub(parseISO(act.activityDate), {
              years: 0,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 4 + props.dst,
              minutes: 30,
              seconds: 0
            })
          )
        );
        //console.log("today date", format(new Date(), "DD-MM-YYYY"));
        console.log("filteredActs", filteredActs);
        break;
      case 4:
        filteredActs = currentUserActivities.filter(act =>
          isTomorrow(
            sub(parseISO(act.activityDate), {
              years: 0,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 4 + props.dst,
              minutes: 30,
              seconds: 0
            })
          )
        );
        console.log("filteredActs", filteredActs);
        break;
      case 5:
        filteredActs = currentUserActivities.filter(act =>
          isThisWeek(
            sub(parseISO(act.activityDate), {
              years: 0,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 4 + props.dst,
              minutes: 30,
              seconds: 0
            })
          )
        );
        console.log("filteredActs", filteredActs);
        break;
      case 6:
        let nextWeekDate = addDays(parseISO(props.today), 7);
        filteredActs = currentUserActivities.filter(act =>
          isSameWeek(
            sub(parseISO(act.activityDate), {
              years: 0,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 4 + props.dst,
              minutes: 30,
              seconds: 0
            }),
            nextWeekDate
          )
        );
        console.log("filteredActs", filteredActs);
        break;
      default:
        //console.log("selectedPeriodId not between 1 & 5");
        break;
    }

    setLocalActs(filteredActs);
  };

  const handleChangeType = value => {
    setActType(value);
    getFilteredActs("actType", value);
  };

  const handleChangePeriod = value => {
    setActPeriod(value);
    getFilteredActs("period", value);
  };

  const handleChangeTeam = value => {
    console.log("value", value);
    value = parseInt(value);
    setActTeam(value);
    setActUser(0);

    //console.log("sdTeamActs", sdTeamActs);
    //console.log("maTeamActs", maTeamActs);
    let acts = [];

    if (value === 1)
      maTeamActs.forEach(data => {
        //console.log("data.activities", data.activities);
        acts = [...acts, ...data.activities];
        //console.log("acts", acts);
      });
    if (value === 2)
      sdTeamActs.forEach(data => {
        acts = [...acts, ...data.activities];
        //console.log("data.activities", data.activities);
      });
    if (value === 3)
      saTeamActs.forEach(data => (acts = [...acts, ...data.activities]));
    if (value === 4)
      csTeamActs.forEach(data => (acts = [...acts, ...data.activities]));
    if (value === 5)
      reTeamActs.forEach(data => (acts = [...acts, ...data.activities]));

    setLocalActs(acts);
  };

  const handleChangeUser = value => {
    setActUser(value);
    getFilteredActs("user", value);
  };

  const submitEditedAct = async e => {
    e.preventDefault();

    console.log("selectedAct", selectedAct);
    try {
      let newActs = props.activities.map(a => {
        if (a.id === selectedAct.id) {
          return selectedAct;
        } else {
          return a;
        }
      });

      console.log("newActs", newActs);
      setActSelect({});
      setVisible(false);
      setSelectFlag(false);
      message.success("Activity updated successfully!");
      props.updateActivities(newActs);
    } catch (error) {
      message.error("Umm...something went wrong!");
      setActSelect({});
      setVisible(false);
    }
  };

  const showAllActs = () => {
    return (
      <Row>
        <Col span={!actSelectFlag ? 24 : 12} className="allTasksRow">
          {loaded && localActs && localActs.length > 0 ? (
            localActs.map(a => (
              <Card
                className={
                  selectedAct.id === a.id ? "actCard activeAct" : "actCard"
                }
                size="small"
                onClick={() => changeAct(a)}
                key={a.id}
              >
                <Row>
                  <Col span={1}>
                    <Checkbox />
                  </Col>
                  <Col span={1}>
                    {props.activityTypes !== undefined &&
                    props.activityTypes.length > 0 &&
                    props.activityTypes.find(
                      at => at.id === a.activityTypeId
                    ) ? (
                      <i
                        className={
                          props.activityTypes.filter(
                            at => at.id === a.activityTypeId
                          )[0].activityTypeSlug + " allTasksIcon"
                        }
                      />
                    ) : (
                      "--"
                    )}
                  </Col>
                  <Col span={6}>
                    <span className="allTasksTitleSpan">{a.activityTitle}</span>
                  </Col>
                  <Col span={3}>
                    <span className="allTasksDealSpan">
                      {props.allDeals !== undefined &&
                      props.allDeals.length > 0 &&
                      a.dealId &&
                      props.allDeals.find(d => d.id === a.dealId)
                        ? props.allDeals.filter(d => d.id === a.dealId)[0]
                            .dealName
                        : "Unconnected record"}
                    </span>
                  </Col>
                  <Col span={3}>
                    <span className="allTasksOrgSpan">
                      {props.orgs !== undefined &&
                      props.orgs.length > 0 &&
                      a.orgId &&
                      props.orgs.find(d => d.id === a.orgId)
                        ? props.orgs.filter(d => d.id === a.orgId)[0].orgName
                        : "Org - Unconnected"}
                    </span>
                  </Col>
                  <Col span={3}>
                    <span className="allTasksContactSpan">
                      {props.people !== undefined &&
                      props.people.length > 0 &&
                      a.contactId &&
                      props.people.find(d => d.id === a.contactId)
                        ? props.people.filter(d => d.id === a.contactId)[0]
                            .contactName
                        : "Contact - Unconnected"}
                    </span>
                  </Col>
                  <Col span={3}>
                    <span className="allTasksDateSpan">
                      {a.activityDate && isValid(parseISO(a.activityDate))
                        ? format(parseISO(a.activityDate), "dd MMM yyyy")
                        : "No date"}
                    </span>
                  </Col>
                  <Col span={2}>
                    <span className="allTasksTimeSpan">
                      {a.activityTime ? a.activityTime : "No Time"}
                    </span>
                  </Col>
                  <Col span={2}>
                    <span className="allTasksDurationSpan">
                      {a.duration ? a.duration : 0} minutes
                    </span>
                  </Col>
                </Row>
              </Card>
            ))
          ) : (
            <Card bordered={false} style={{ padding: "5rem", margin: "5rem" }}>
              No Activities Scheduled for Selection
            </Card>
          )}
        </Col>
        {actSelectFlag && (
          <Drawer
            title={
              <Row>
                <Col span={2}>
                  <label>
                    <i className="far fa-file-alt PBRed" />
                  </label>
                </Col>
                <Col span={22}>
                  <Input
                    placeholder="Title"
                    value={selectedAct.activityTitle}
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                    bordered={false}
                    onChange={e =>
                      setActSelect({
                        ...selectedAct,
                        activityTitle: e.target.value
                      })
                    }
                  />
                </Col>
              </Row>
            }
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visible}
            width={"40vw"}
            className="detailsCard"
          >
            {selectedAct !== undefined && !isEmpty(selectedAct) ? (
              <Space direction="vertical" style={{ width: "100%" }}>
                <Card
                  className="TimeCard"
                  size="small"
                  title="Date & Time"
                  bordered={false}
                >
                  <Row className="TasksFormRow">
                    <Col span={24}>
                      <label>
                        <i className="far fa-calendar PBRed" />
                      </label>{" "}
                      <DatePicker
                        allowClear={false}
                        showTime={{
                          defaultValue: moment(
                            selectedAct.activityDate,
                            "HH:mm"
                          )
                        }}
                        showToday
                        bordered={false}
                        value={moment(selectedAct.activityDate)}
                        format="YYYY-MM-DD HH:mm"
                        size="small"
                        onChange={(date, dateString) => {
                          console.log("dateString", dateString);
                          console.log("date._d", date._d);
                          setActSelect({
                            ...selectedAct,
                            activityDate: date._d
                          });
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </Col>
                    {/*<Col span={12}>
                      <i className="far fa-clock PBRed" />{" "}
                      <TimePicker
                        allowClear={false}
                        value={moment(selectedAct.activityDate).subtract(
                          props.dst + 4.5,
                          "hours"
                        )}
                        format="h:mm"
                        size="small"
                        onChange={(date, dateString) => {
                          console.log("dateString", dateString);
                          console.log("date", date);
                          let time = dateString;
                          let newDate = moment(selectedAct.activityDate);
                          console.log("newDate", newDate);
                          let fullDate = moment(
                            newDate + " " + time,
                            "DD/MM/YYYY HH:mm"
                          );
                          console.log("fullDate", fullDate);

                          setActSelect({
                            ...selectedAct,
                            activityTime: dateString,
                            activityDate: date._i
                          });
                        }}
                      />
                    </Col>*/}
                  </Row>
                </Card>
                <Card
                  className="DetailsCard2"
                  size="small"
                  title="Details"
                  bordered={false}
                >
                  <Row className="TasksFormRow">
                    <Col span={1}>
                      <i className="fas fa-user-tie PBRed" />
                    </Col>
                    <Col span={11}>Assigned to</Col>
                    <Col span={12}>
                      <Select
                        name="userId"
                        placeholder="Select User"
                        size="small"
                        bordered={false}
                        className="detailsSelect"
                        onChange={e =>
                          setActSelect({
                            ...selectedAct,
                            userId: parseInt(e)
                          })
                        }
                        value={selectedAct.userId}
                      >
                        {props.users !== undefined && props.users.length > 0 ? (
                          props.users.map(d => (
                            <Option value={d.id} key={d.id}>
                              {d.userName}
                            </Option>
                          ))
                        ) : (
                          <Option disabled value={0}>
                            Unable to retrieve data
                          </Option>
                        )}
                      </Select>
                    </Col>
                  </Row>
                  {/*<Row>
                    <Col span={12}>Type</Col>
                    <Col span={12}>
                      <Select
                        placeholder="Deal"
                        size="small"
                        bordered={false}
                        className="detailsSelect"
                        onChange={e => setDealType(e.target.value)}
                      ></Select>
                    </Col>
                  </Row>*/}
                  <Row className="TasksFormRow">
                    <Col span={1}>
                      <i className="far fa-file PBRed" />
                    </Col>
                    <Col span={11}>Record</Col>
                    <Col span={12}>
                      <Select
                        placeholder="Select Deal"
                        size="small"
                        bordered={false}
                        className="detailsSelect"
                        onChange={e =>
                          setActSelect({
                            ...selectedAct,
                            dealId: e.target.value
                          })
                        }
                        value={selectedAct.dealId}
                      >
                        {props.allDeals !== undefined &&
                        props.allDeals.length > 0 ? (
                          props.allDeals.map(d => (
                            <Option value={d.id} key={d.id}>
                              {d.dealName}
                            </Option>
                          ))
                        ) : (
                          <Option disabled value={0}>
                            Unable to retrieve data
                          </Option>
                        )}
                      </Select>
                    </Col>
                  </Row>
                  <Row className="TasksFormRow">
                    <Col span={1}>
                      <i className="far fa-building PBRed" />
                    </Col>
                    <Col span={11}>Organization</Col>
                    <Col span={12}>
                      <Select
                        placeholder="Select Org"
                        size="small"
                        bordered={false}
                        className="detailsSelect"
                        onChange={e =>
                          setActSelect({
                            ...selectedAct,
                            orgId: e.target.value
                          })
                        }
                        value={selectedAct.orgId}
                      >
                        {props.orgs !== undefined && props.orgs.length > 0 ? (
                          props.orgs.map(d => (
                            <Option value={d.id} key={d.id}>
                              {d.orgName}
                            </Option>
                          ))
                        ) : (
                          <Option disabled value={0}>
                            Unable to retrieve data
                          </Option>
                        )}
                      </Select>
                    </Col>
                  </Row>
                  <Row className="TasksFormRow">
                    <Col span={1}>
                      <i className="far fa-user PBRed" />
                    </Col>
                    <Col span={11}>Contact</Col>
                    <Col span={12}>
                      <Select
                        placeholder="Select Contact"
                        size="small"
                        bordered={false}
                        className="detailsSelect"
                        onChange={e =>
                          setActSelect({
                            ...selectedAct,
                            contactId: e.target.value
                          })
                        }
                        value={selectedAct.contactId}
                      >
                        {props.people !== undefined &&
                        props.people.length > 0 ? (
                          props.people.map(d => (
                            <Option value={d.id} key={d.id}>
                              {d.contactName}
                            </Option>
                          ))
                        ) : (
                          <Option disabled value={0}>
                            Unable to retrieve data
                          </Option>
                        )}
                      </Select>
                    </Col>
                  </Row>
                </Card>
                <Card
                  className="StatusCard"
                  size="small"
                  title="Status"
                  bordered={false}
                >
                  <Row className="TasksFormRow">
                    <Col span={1}>
                      <i className="far fa-check-circle PBRed" />
                    </Col>
                    <Col span={11}>Complete Activity?</Col>
                    <Col span={12}>
                      <Checkbox
                        size="small"
                        name="isCompleted"
                        value={selectedAct.isCompleted}
                        checked={selectedAct.isCompleted}
                        onChange={e =>
                          setActSelect({
                            ...selectedAct,
                            isCompleted: !selectedAct.isCompleted
                          })
                        }
                      >
                        {selectedAct.isCompleted ? "DONE" : "ONGOING"}
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="TasksFormRow">
                    <Col span={1}>
                      <i className="far fa-thumbs-up PBRed" />
                    </Col>
                    <Col span={11}>Did activity succeed?</Col>
                    <Col span={12}>
                      <Checkbox
                        size="small"
                        value={selectedAct.success}
                        checked={selectedAct.success}
                        onChange={e =>
                          setActSelect({
                            ...selectedAct,
                            success: !selectedAct.success
                          })
                        }
                      >
                        {selectedAct.success ? "YES" : "NO"}
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="TasksFormRow">
                    <Col span={1}>
                      <i className="far fa-sticky-note PBRed" />
                    </Col>
                    <Col span={11}>
                      {selectedAct.success ? "Success note" : "Fail note"}
                    </Col>
                    <Col span={12}>
                      <Input
                        placeholder="Simple note"
                        value={selectedAct.text}
                        size="small"
                        bordered={false}
                        onChange={e =>
                          setActSelect({
                            ...selectedAct,
                            text: e.target.value
                          })
                        }
                      />
                    </Col>
                  </Row>
                </Card>
                <Card
                  className="EditorCard"
                  size="small"
                  title="Activity Notes"
                  bordered={false}
                >
                  <Row className="TasksFormRow">
                    <Col span={24}>
                      <div>
                        <Editor
                          toolbar={toolbarOptions}
                          editorState={localEditorState}
                          wrapperClassName="demo-wrapper"
                          editorClassName="demo-editor"
                          onEditorStateChange={onEditorStateChange}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card>
                <Card size="small" bordered={false}>
                  <Row className="TasksFormRow">
                    <Col span={24}>
                      <Button
                        type="primary"
                        block={true}
                        loading={false}
                        size="medium"
                        onClick={submitEditedAct}
                      >
                        Update Activity
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Space>
            ) : (
              "Unable to retrieve Task"
            )}
          </Drawer>
        )}
      </Row>
    );
  };

  return (
    <div
      className="card-container"
      style={{ padding: "1px", margin: 0, textAlign: "center" }}
    >
      {loaded ? (
        props.view === "all" ? (
          <Card className="AllTasksTab" size="small" bordered={false}>
            <Card className="TasksTopCard">
              <Row>
                <Col span={6}>
                  <Tooltip title="Activity Type" color="cyan" placement="right">
                    <i
                      className={
                        actType === 0
                          ? "far fa-clone selectSpan"
                          : `${
                              props.activityTypes.filter(
                                at => at.id === actType
                              )[0].activityTypeSlug
                            } + " selectSpan"`
                      }
                    />
                    <Select
                      value={actType}
                      size="small"
                      bordered={false}
                      className="allTasksSelect"
                      onChange={handleChangeType}
                    >
                      <Option value={0}>All Tasks</Option>
                      {props.activityTypes !== undefined &&
                      props.activityTypes.length > 0 ? (
                        props.activityTypes.map(at => (
                          <Option key={at.id} value={at.id}>
                            {at.name}
                          </Option>
                        ))
                      ) : (
                        <Option value={-1} disabled>
                          Unable to retrieve
                        </Option>
                      )}
                    </Select>
                  </Tooltip>
                </Col>
                <Col span={6}>
                  <Tooltip title="Time Period" color="cyan" placement="right">
                    <i className="far fa-calendar-alt selectSpan" />
                    <Select
                      value={actPeriod}
                      size="small"
                      bordered={false}
                      className="allTasksSelect"
                      onChange={handleChangePeriod}
                    >
                      {period !== undefined && period.length > 0 ? (
                        period.map(p => (
                          <Option value={p.id} key={p.id}>
                            {p.name}
                          </Option>
                        ))
                      ) : (
                        <Option value={-1} disabled>
                          Unable to retrieve
                        </Option>
                      )}
                    </Select>
                  </Tooltip>
                </Col>
                <Col span={6}>
                  <Tooltip title="Team" color="cyan" placement="right">
                    <i className="fas fa-users selectSpan" />
                    <Select
                      value={actTeam}
                      size="small"
                      bordered={false}
                      className="allTasksSelect"
                      onChange={handleChangeTeam}
                    >
                      {props.teams !== undefined && props.teams.length > 0 ? (
                        props.teams
                          .filter(t => t.id < 6)
                          .map(p => (
                            <Option value={p.id} key={p.id}>
                              {p.teamName}
                            </Option>
                          ))
                      ) : (
                        <Option value={-1} disabled>
                          Unable to retrieve
                        </Option>
                      )}
                    </Select>
                  </Tooltip>
                </Col>
                <Col span={6}>
                  <Tooltip title="User" color="cyan" placement="left">
                    <i className="far fa-user selectSpan" />
                    <Select
                      value={actUser}
                      size="small"
                      bordered={false}
                      className="allTasksSelect"
                      onChange={handleChangeUser}
                    >
                      <Option value={0}>ALL</Option>
                      {props.users !== undefined && props.users.length > 0 ? (
                        props.users
                          .filter(u => u.teamId === actTeam)
                          .map(p => (
                            <Option value={p.id} key={p.id}>
                              {p.userName}
                            </Option>
                          ))
                      ) : (
                        <Option value={-1} disabled>
                          Unable to retrieve
                        </Option>
                      )}
                    </Select>
                  </Tooltip>
                </Col>
              </Row>
            </Card>
            {props.activities !== undefined && props.activities.length > 0 ? (
              showAllActs()
            ) : (
              <Skeleton />
            )}
          </Card>
        ) : props.view === "inbox" ? (
          <Inbox
            processedActs={processedActs}
            noActivitiesToday={true}
            noPastActivities={false}
            userId={props.userId}
            dst={1}
            today={props.today}
            activityTypes={props.activityTypes}
            companyTypes={props.companyTypes}
            contactTypes={props.contactTypes}
            dealStatuses={props.dealStatuses}
            reasons={props.reasons}
            roles={props.roles}
            teams={props.teams}
            users={props.users}
            targetTypes={props.targetTypes}
            people={props.people}
            orgs={props.orgs}
            pipelines={props.pipelines}
            stages={props.stages}
            orgTargets={props.teamTargets}
            userTargets={props.userTargets}
            allDeals={props.allDeals}
            syncedEmails={props.syncedEmails}
            updateActivities={props.updateActivities}
            rDeals={[]}
            customers={[]}
          />
        ) : props.view === "exp" ? (
          <Explanation />
        ) : (
          "Unable to retrieve data"
        )
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default AllActivities;
