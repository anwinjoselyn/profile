import React, { useState, useEffect } from "react";

import {
  Button,
  Row,
  Col,
  Card,
  Tabs,
  Select,
  Input,
  Checkbox,
  Avatar,
  Tooltip,
  Drawer
} from "antd";

import {
  format,
  sub,
  parseISO,
  isFuture,
  isPast
  //isToday,
  //isTomorrow,
  //isThisWeek,
  //isSameWeek,
  //addDays
} from "date-fns";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

import { Editor } from "react-draft-wysiwyg";

import {
  CheckOutlined,
  SmileTwoTone,
  MehTwoTone,
  PhoneTwoTone,
  UserOutlined
} from "@ant-design/icons";

//import axios from "axios";

import { isEmpty } from "../../../../../libs/validators";

import InboxHeader from "./InboxComps/InboxHeader";
import OtherActs from "./InboxComps/OtherActs";

//import ButtonPB from "../../../components/ButtonPB";

import "../Activities.css";
//import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const toolbarOptions = require("./Editor/toolbarOptions.json").data;

const { TabPane } = Tabs;
const { Option } = Select;

const Inbox = props => {
  const [dataLoaded, setLoaded] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [changeUser, setChangeUser] = useState(false);
  const [showDealType, setShowDealType] = useState(false);
  const [showChangeDetails, setChangeDetails] = useState(false);
  const [currentAct, setCurrentAct] = useState({});
  const [currentActFlag, setCurrentActFlag] = useState(false);

  const [noActsToday, setNoActsToday] = useState(
    props.noActivitiesToday || false
  );
  const [dealType, setDealType] = useState(1);
  const [noActsPast, setNoActsPast] = useState(props.noPastActivities || false);
  const [allTodayActs, setTodayActs] = useState([]);
  const [allPastActs, setPastActs] = useState([]);
  const [allFutureActs, setFutureActs] = useState([]);
  const [localEditorState, setEditorState] = useState(
    EditorState.createEmpty()
  );
  const [filteredUserAct, setFilteredUserAct] = useState(
    props.processedActs.filter(ua => ua.userId === props.userId)[0]
  );
  const [selectedActId, setSelectedActId] = useState(null);
  /*
  useEffect(() => {
    setFilteredUserAct(
      props.processedActs.filter(ua => ua.userId === props.userId)[0]
    );
  }, [props.processedActs, props.userId]);
*/
  //console.log("filteredUserAct", filteredUserAct);
  //console.log("props.processedActs", props.processedActs);
  const selectActId = actId => {
    setSelectedActId(parseInt(actId));
  };

  useEffect(() => {
    if (
      selectedActId !== null &&
      selectedActId !== undefined &&
      parseInt(selectedActId) > 0
    ) {
      if (
        filteredUserAct !== undefined &&
        !isEmpty(props.processedActs) &&
        filteredUserAct.openUserActs !== undefined &&
        filteredUserAct.openUserActs.length > 0 &&
        filteredUserAct.openUserActs.find(a => a.id === selectedActId)
      ) {
        setCurrentAct(
          filteredUserAct.openUserActs.filter(a => a.id === selectedActId)[0]
        );
        setCurrentActFlag(true);
        //allTodayActivities = allTodayActs;
        //allPastActivities = allPastActs;
        //allFutureActivities = allFutureActs;
      }
    } else {
      if (
        filteredUserAct &&
        !isEmpty(props.processedActs) &&
        filteredUserAct.openUserActs !== undefined &&
        filteredUserAct.openUserActs.length > 0 &&
        filteredUserAct.openUserActs.find(
          a =>
            format(
              sub(parseISO(a.activityDate), {
                years: 0,
                months: 0,
                weeks: 0,
                days: 0,
                hours: 4 + props.dst,
                minutes: 30,
                seconds: 0
              }),
              "yyyy-MM-dd"
            ) === props.today
        )
      ) {
        console.log("if happened");
        /*
        allTodayActivities = getAllTodayActs(userActivity);
        console.log("allTodayActivities", allTodayActivities);

        allPastActivities = getAllPastActs(userActivity);
        console.log("allPastActivities", allPastActivities);

        allFutureActivities = getAllFutureActs(userActivity);
        console.log("allFutureActivities", allFutureActivities);
*/
        setCurrentAct(
          filteredUserAct.openUserActs
            .filter(
              a =>
                format(
                  sub(parseISO(a.activityDate), {
                    years: 0,
                    months: 0,
                    weeks: 0,
                    days: 0,
                    hours: 4 + props.dst,
                    minutes: 30,
                    seconds: 0
                  }),
                  "yyyy-MM-dd"
                ) === props.today
            )
            .sort(
              (a, b) => new Date(a.activityDate) - new Date(b.activityDate)
            )[0]
        );
        setCurrentActFlag(true);
        setNoActsToday(false);
        //noActivitiesToday = false;
      } else if (
        filteredUserAct !== undefined &&
        !isEmpty(filteredUserAct) &&
        filteredUserAct.openUserActs !== undefined &&
        filteredUserAct.openUserActs.length > 0
      ) {
        console.log("else if happened");
        setCurrentAct(
          filteredUserAct.openUserActs.sort(
            (a, b) => new Date(a.activityDate) - new Date(b.activityDate)
          )[0]
        );
        setCurrentActFlag(true);
        setNoActsToday(true);
        /*
        noActivitiesToday = true;

        allTodayActivities = getAllTodayActs(userActivity);
        console.log("allTodayActivities", allTodayActivities);

        allPastActivities = getAllPastActs(userActivity);
        console.log("allPastActivities", allPastActivities);

        allFutureActivities = getAllFutureActs(userActivity);
        console.log("allFutureActivities", allFutureActivities);
        */
      }
    }

    setTodayActs(
      filteredUserAct.openUserActs.filter(
        a =>
          format(
            sub(parseISO(a.activityDate), {
              years: 0,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 4 + props.dst,
              minutes: 30,
              seconds: 0
            }),
            "yyyy-MM-dd"
          ) === props.today
      )
    );

    setPastActs(
      filteredUserAct.openUserActs.filter(
        a =>
          isPast(
            sub(parseISO(a.activityDate), {
              years: 0,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 4 + props.dst,
              minutes: 30,
              seconds: 0
            }),
            "yyyy-MM-dd"
          ) &&
          format(
            sub(parseISO(a.activityDate), {
              years: 0,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 4 + props.dst,
              minutes: 30,
              seconds: 0
            }),
            "yyyy-MM-dd"
          ) !== props.today
      )
    );

    setFutureActs(
      filteredUserAct.openUserActs.filter(
        a =>
          isFuture(
            sub(parseISO(a.activityDate), {
              years: 0,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 4 + props.dst,
              minutes: 30,
              seconds: 0
            }),
            "yyyy-MM-dd"
          ) &&
          format(
            sub(parseISO(a.activityDate), {
              years: 0,
              months: 0,
              weeks: 0,
              days: 0,
              hours: 4 + props.dst,
              minutes: 30,
              seconds: 0
            }),
            "yyyy-MM-dd"
          ) !== props.today
      )
    );

    if (
      filteredUserAct.openUserActs.find(
        a => isPast(parseISO(a.activityDate)) && !a.isCompleted
      )
    ) {
      console.log("if happened");
      //noPastActivities = false;
      setNoActsPast(false);
    } else {
      console.log("else if happened");
      //noPastActivities = true;
      setNoActsPast(true);
    }
  }, [filteredUserAct, selectedActId]);

  useEffect(() => {
    if (currentActFlag) {
      console.log("currentAct", currentAct);
      //console.log("currentAct.content", currentAct.content);
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(currentAct.content))
        )
      );

      if (currentAct !== undefined && !isEmpty(currentAct)) {
        if (currentAct.hasOwnProperty("dealId")) {
          setDealType(1);
        } else if (currentAct.hasOwnProperty("rDealId")) {
          setDealType(3);
        } else if (currentAct.hasOwnProperty("customerId")) {
          setDealType(2);
        }
      }
      //console.log("dealType", dealType);

      setLoaded(true);
    }
  }, [currentAct, currentActFlag]);

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

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

  const handleChange = e => {
    console.log("e", e);
    setCurrentAct({
      ...currentAct,
      [e.target.name]: e.target.value
    });
  };

  const changeDealDetails = () => {
    return (
      <React.Fragment>
        <Row>
          <Col span={2}>
            <i
              className="far fa-clipboard"
              onDoubleClick={() => setChangeDetails(!showChangeDetails)}
              style={{ cursor: "pointer", color: "#19BAD1" }}
            />
          </Col>
          <Col span={20}>
            <Select
              name="dealId"
              value={currentAct.dealId}
              onChange={e => {
                let dealId = parseInt(e);
                let deal = props.allDeals.filter(d => d.id === dealId)[0];
                //console.log("deal", deal);
                setCurrentAct({
                  ...currentAct,
                  dealId: dealId,
                  orgId: deal.orgId,
                  contactId: deal.contactId
                });
              }}
            >
              {props.allDeals !== undefined && props.allDeals.length > 0 ? (
                props.allDeals.map(d => (
                  <Option value={d.id} key={d.id}>
                    {d.dealName}
                  </Option>
                ))
              ) : (
                <Option disabled value={0}>
                  Unable to retrieve Deals
                </Option>
              )}
            </Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={2}>
            <i className="fas fa-building" style={{ color: "#19BAD1" }} />
          </Col>
          <Col span={20}>
            <Select name="orgId" value={currentAct.orgId} disabled>
              {props.orgs !== undefined && props.orgs.length > 0 ? (
                props.orgs.map(d => (
                  <Option value={d.id} key={d.id}>
                    {d.orgName}
                  </Option>
                ))
              ) : (
                <Option disabled value={0}>
                  Unable to retrieve Orgs
                </Option>
              )}
            </Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={2}>
            <i className="fas fa-user" style={{ color: "#19BAD1" }} />
          </Col>
          <Col span={20}>
            <Select
              name="contactId"
              value={currentAct.contactId}
              onChange={e => {
                setCurrentAct({
                  ...currentAct,
                  contactId: parseInt(e)
                });
              }}
              onBlur={() => setChangeDetails(false)}
            >
              {props.people !== undefined && props.people.length > 0 ? (
                props.people
                  .filter(p => p.orgId === currentAct.orgId)
                  .map(p => (
                    <Option value={p.id} key={p.id}>
                      {p.contactName}
                    </Option>
                  ))
              ) : (
                <Option disabled value={0}>
                  Unable to retrieve Deals
                </Option>
              )}
            </Select>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  return (
    <Card
      className="Inbox"
      style={{ padding: "1px", margin: 0, textAlign: "center" }}
      bordered={false}
    >
      <div className="card-container">
        {dataLoaded && (
          <InboxHeader
            activity={currentAct}
            activityTypes={props.activityTypes}
            orgs={props.orgs}
            people={props.people}
          />
        )}
        <br />
        <Row gutter={8}>
          <Col span={openDrawer ? 6 : 8}>
            {dataLoaded && (
              <Card className="InboxSideCard">
                {!changeUser ? (
                  <Row>
                    <Col span={2}>
                      <i
                        className="fas fa-user-tie"
                        style={{ color: "#19BAD1" }}
                      />
                    </Col>
                    <Col span={6}>Owner</Col>
                    <Col span={16}>
                      {props.users !== undefined &&
                      props.users.length > 0 &&
                      currentAct &&
                      currentAct.userId &&
                      props.users.find(u => u.id === currentAct.userId) ? (
                        props.users.filter(u => u.id === currentAct.userId)[0]
                          .userAvatar ? (
                          <Tooltip
                            title={
                              props.users.filter(
                                u => u.id === currentAct.userId
                              )[0].userName
                            }
                            placement="right"
                            color="cyan"
                          >
                            <Avatar
                              src={
                                props.users.filter(
                                  u => u.id === currentAct.userId
                                )[0].userAvatar
                              }
                              onDoubleClick={e => setChangeUser(true)}
                              style={{ cursor: "pointer" }}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={
                              props.users.filter(
                                u => u.id === currentAct.userId
                              )[0].userName
                            }
                            placement="right"
                            color="cyan"
                          >
                            {
                              props.users.filter(
                                u => u.id === currentAct.userId
                              )[0].userName
                            }
                          </Tooltip>
                        )
                      ) : (
                        <span
                          onDoubleClick={e => setChangeUser(true)}
                          style={{ cursor: "pointer" }}
                        >
                          User Unassigned
                        </span>
                      )}
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col span={2}>
                      <i
                        className="fas fa-user-tie"
                        style={{ color: "#19BAD1" }}
                      />
                    </Col>
                    <Col span={6}> Owner</Col>
                    <Col span={16}>
                      <Select
                        name="userId"
                        value={currentAct.userId}
                        style={{ width: 120 }}
                        onChange={e =>
                          setCurrentAct({
                            ...currentAct,
                            userId: parseInt(e)
                          })
                        }
                        onBlur={e => setChangeUser(false)}
                      >
                        {props.users !== undefined && props.users.length > 0 ? (
                          props.users.map(u => (
                            <Option value={u.id} key={u.id}>
                              {u.userName}
                            </Option>
                          ))
                        ) : (
                          <Option disabled value={0}>
                            Unable to retrieve users
                          </Option>
                        )}
                      </Select>
                    </Col>
                  </Row>
                )}
                <br />
                {!showChangeDetails ? (
                  <React.Fragment>
                    <Row>
                      <Col span={2}>
                        <i
                          className="far fa-clipboard"
                          onDoubleClick={() =>
                            setChangeDetails(!showChangeDetails)
                          }
                          style={{ cursor: "pointer", color: "#19BAD1" }}
                        />
                      </Col>
                      <Col>
                        {dealType !== undefined ? (
                          dealType === 1 &&
                          props.allDeals !== undefined &&
                          props.allDeals.length > 0 &&
                          currentAct.dealId !== undefined &&
                          props.allDeals.find(
                            d => d.id === currentAct.dealId
                          ) ? (
                            <span>
                              {
                                props.allDeals.filter(
                                  d => d.id === currentAct.dealId
                                )[0].dealName
                              }
                            </span>
                          ) : dealType === 3 &&
                            props.rDeals !== undefined &&
                            props.rDeals.length > 0 &&
                            currentAct.rDealId !== undefined &&
                            props.rDeals.find(
                              d => d.id === currentAct.rDealId
                            ) ? (
                            <span>
                              {
                                props.rDeals.filter(
                                  d => d.id === currentAct.rDealId
                                )[0].dealName
                              }
                            </span>
                          ) : dealType === 2 &&
                            props.customers !== undefined &&
                            props.customers.length > 0 &&
                            currentAct.customerId !== undefined &&
                            props.customers.find(
                              d => d.id === currentAct.customerId
                            ) ? (
                            <span>
                              {
                                props.customers.filter(
                                  d => d.id === currentAct.customerId
                                )[0].customerName
                              }
                            </span>
                          ) : (
                            "Unconnected Record"
                          )
                        ) : (
                          "Unconnected Record"
                        )}
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col span={2}>
                        <i
                          className="fas fa-building"
                          style={{ cursor: "pointer", color: "#19BAD1" }}
                        />
                      </Col>
                      <Col>
                        {props.orgs !== undefined &&
                        props.orgs.length > 0 &&
                        currentAct.orgId !== undefined &&
                        currentAct.orgId !== null &&
                        props.orgs.find(o => o.id === currentAct.orgId) ? (
                          <span>
                            {
                              props.orgs.filter(
                                o => o.id === currentAct.orgId
                              )[0].orgName
                            }
                          </span>
                        ) : (
                          "Org - Unconnected"
                        )}
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col span={2}>
                        <i
                          className="fas fa-user"
                          style={{ cursor: "pointer", color: "#19BAD1" }}
                        />
                      </Col>
                      <Col>
                        {props.people !== undefined &&
                        props.people.length > 0 &&
                        currentAct.contactId !== undefined &&
                        currentAct.contactId !== null &&
                        props.people.find(
                          c => c.id === currentAct.contactId
                        ) ? (
                          <span>
                            {
                              props.people.filter(
                                c => c.id === currentAct.contactId
                              )[0].contactName
                            }
                          </span>
                        ) : (
                          "Contact - Unconnected"
                        )}
                      </Col>
                    </Row>
                  </React.Fragment>
                ) : (
                  changeDealDetails()
                )}
              </Card>
            )}
          </Col>
          <Col span={openDrawer ? 10 : 15}>
            {dataLoaded && (
              <Card className="InboxMidCard">
                <Row>
                  <Col span={8}>Status</Col>
                  <Col span={16}>
                    <Checkbox
                      checked={currentAct.isCompleted}
                      onChange={() =>
                        setCurrentAct({
                          ...currentAct,
                          isCompleted: !currentAct.isCompleted
                        })
                      }
                    >
                      {currentAct.isCompleted ? "Completed" : "Ongoing"}
                    </Checkbox>
                  </Col>
                </Row>
                <br />
                {currentAct.isCompleted ? (
                  <React.Fragment>
                    <Row>
                      <Col span={8}>Activity Result</Col>
                      <Col span={16}>
                        <Checkbox
                          checked={currentAct.success}
                          onChange={() =>
                            setCurrentAct({
                              ...currentAct,
                              success: !currentAct.success
                            })
                          }
                        >
                          {currentAct.success ? "Success" : "Fail"}
                        </Checkbox>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col span={8}>
                        {currentAct.success
                          ? "Success note (optional)"
                          : "Fail note (optional)"}
                      </Col>
                      <Col span={16}>
                        <Input
                          name="text"
                          size="small"
                          placeholder={"Quick note"}
                          onChange={e =>
                            setCurrentAct({
                              ...currentAct,
                              text: e.target.value
                            })
                          }
                          style={{ marginBottom: "5px" }}
                          value={currentAct.text}
                        />
                      </Col>
                    </Row>
                    <br />
                  </React.Fragment>
                ) : null}
                <Row>
                  <Col span={8}>Title</Col>
                  <Col span={16}>
                    <Input
                      name="activityTitle"
                      size="small"
                      placeholder="Enter Title"
                      onChange={e =>
                        setCurrentAct({
                          ...currentAct,
                          activityTitle: e.target.value
                        })
                      }
                      style={{ marginBottom: "5px" }}
                      value={currentAct.activityTitle}
                    />
                  </Col>
                </Row>
                <br />
                <div>
                  <Editor
                    toolbar={toolbarOptions}
                    editorState={localEditorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                  />
                  {/*<textarea
                  disabled
                  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />*/}
                </div>
                <br />
                <Row>
                  <Col span={8} />
                  <Col span={8}>
                    <Button
                      type="primary"
                      block={true}
                      loading={false}
                      size="medium"
                    >
                      Update Activity
                    </Button>
                  </Col>
                  <Col span={8} />
                </Row>
              </Card>
            )}
          </Col>
          {dataLoaded && !openDrawer ? (
            <Col span={1}>
              <i
                className="fas fa-chevron-left openDrawerSpan"
                onClick={() => setOpenDrawer(true)}
              />
            </Col>
          ) : (
            <Drawer
              className="InboxMainCard"
              title={
                <Row>
                  <Col span={24}>All Activities</Col>
                </Row>
              }
              placement="right"
              closable={true}
              onClose={() => setOpenDrawer(false)}
              visible={openDrawer}
              width={"40vw"}
            >
              <OtherActs
                activityTypes={props.activityTypes}
                orgs={props.orgs}
                people={props.people}
                allTodayActs={allTodayActs}
                allPastActs={allPastActs}
                allFutureActs={allFutureActs}
                allDeals={props.allDeals}
                activity={currentAct}
              />
            </Drawer>
          )}
        </Row>
      </div>
    </Card>
  );
};

export default Inbox;
