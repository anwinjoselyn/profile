import React, { useState, useEffect } from "react";

import { Tabs, Row, Col } from "antd";

import { Card, Tooltip, OverlayTrigger } from "react-bootstrap";

//import axios from "axios";

import { format, parseISO, isAfter, isEqual } from "date-fns";

import { isEmpty } from "../../libs/validators.js";

import Kanban1 from "./Components/Kanban1/Kanban1";
import Kanban2 from "./Components/Kanban2/Kanban2";
import Activities from "./Components/Tasks/Tasks";

import "./Showcase.css";

const { TabPane } = Tabs;

let currentMonthNumber = parseInt(format(new Date(), "MM"));
let monthStartNumber = 1;

const pipelines = require("./Data/pipelines.json").data;
const deals = require("./Data/deals.json").data;
const common = require("./Data/common.json");
const usersByTeam = require("./Data/temp.json").data;
const activities = require("./Data/activities.json").data;
const contacts = require("./Data/contacts.json").data;
const orgs = require("./Data/orgs.json").data;
const stages = require("./Data/stages.json").data;
const users = require("./Data/users.json").data;

const ShowCase = props => {
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [allDeals, setAllDeals] = useState(deals);
  //const [localDeals, setLocalDeals] = useState(deals);
  const [dealsValue, setDealsValue] = useState(24000);
  const [selectedUserId, setSelectedUserId] = useState(2);
  const [userQuota, setUserQuota] = useState(1000);
  const [teamQuota, setTeamQuota] = useState(1000);
  const [userAchieved, setUserAch] = useState(0);
  const [teamAchieved, setTeamAch] = useState(0);
  const [pipeId, setPipeId] = useState(1);
  const [teamId, setTeamId] = useState(1);
  const [counter, setCounter] = useState(0);
  const [currentUserTarget, setUserTarget] = useState(null);
  const [currentTeamTarget, setTeamTarget] = useState(null);
  const [total, setTotal] = useState([]);
  const [pipeDeals, setPipeDeals] = useState(null);
  const [maDeals, setMaDeals] = useState([]);
  const [sdDeals, setSdDeals] = useState([]);
  const [saDeals, setsaDeals] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [tabKey, setTabKey] = useState("3");
  const [theActs, setTheActs] = useState([]);
  const [dataLoaded, setLoaded] = useState(false);

  useEffect(() => {
    let filteredDeals = [];

    let filtered = stages.filter(s => s.pipeId === parseInt(pipeId));
    console.log("filtered", filtered);
    setFiltered(filtered);

    if (pipeId)
      updatePipeDeals(
        stages.filter(s => s.isActive),
        pipelines.filter(pipe => pipe.teamId === teamId)[0].id,
        deals,
        orgs,
        activities,
        selectedUserId,
        filtered
      );

    if (deals && deals.length > 0) {
      filteredDeals = deals.filter(d =>
        filtered.find(stage => stage.id === d.stageId)
      );
    }

    console.log("deals", deals);
    console.log("filteredDeals", filteredDeals);

    if (common.tenant && common.tenant.fyStartMonth === "January") {
      monthStartNumber = 1;
    } else {
      monthStartNumber = 4;
    }
    console.log("currentMonthNumber", currentMonthNumber);
    currentMonthNumber =
      currentMonthNumber - monthStartNumber >= 0
        ? currentMonthNumber - monthStartNumber + 1
        : currentMonthNumber - monthStartNumber + 13;

    let maPipeId = pipelines.filter(p => p.teamId === 1)[0].id;
    let sdPipeId = pipelines.filter(p => p.teamId === 2)[0].id;
    let saPipeId = pipelines.filter(p => p.teamId === 3)[0].id;

    let filteredMaStages = stages
      .filter(s => s.isActive)
      .filter(s => s.pipeId === maPipeId);
    let filteredSdStages = stages
      .filter(s => s.isActive)
      .filter(s => s.pipeId === sdPipeId);
    let filteredSaStages = stages
      .filter(s => s.isActive)
      .filter(s => s.pipeId === saPipeId);

    let maDeals = deals.filter(ad =>
      filteredMaStages.find(fms => fms.id === ad.stageId)
    );
    //console.log("maDeals", maDeals);

    let sdDeals = deals.filter(ad =>
      filteredSdStages.find(fms => fms.id === ad.stageId)
    );
    //console.log("sdDeals", sdDeals);

    let saDeals = deals.filter(ad =>
      filteredSaStages.find(fms => fms.id === ad.stageId)
    );

    setSdDeals(sdDeals);
    setMaDeals(maDeals);
    setsaDeals(saDeals);
    setFilteredDeals(filteredDeals);
    setTheActs(activities);
    setLoaded(true);
  }, [pipeId, selectedUserId, teamId]);

  const updateTargetsAndAchieved = teamId => {
    let currentUserTarget =
      common.userTargets !== null &&
      common.userTargets !== undefined &&
      selectedUserId !== 0 &&
      common.userTargets.find(ut => ut.userId === selectedUserId)
        ? common.userTargets.filter(ut => ut.userId === selectedUserId)[0]
        : {};

    let currentTeamTarget =
      common.teamTargets !== null &&
      common.teamTargets !== undefined &&
      common.teamTargets.find(tt => tt.teamId === teamId)
        ? common.teamTargets.filter(tt => tt.teamId === teamId)[0]
        : {};

    let userAchieved = 0;
    let userQuota = 0;
    let teamAchieved = 0;
    let teamQuota = 0;
    let cMN = currentMonthNumber;
    console.log("cMN", cMN);
    let currentMonth =
      cMN !== undefined && cMN !== null
        ? cMN === 1
          ? "m1"
          : cMN === 2
          ? "m2"
          : cMN === 3
          ? "m3"
          : cMN === 4
          ? "m4"
          : cMN === 5
          ? "m5"
          : cMN === 6
          ? "m6"
          : cMN === 7
          ? "m7"
          : cMN === 8
          ? "m8"
          : cMN === 9
          ? "m9"
          : cMN === 10
          ? "m10"
          : cMN === 11
          ? "m11"
          : cMN === 12
          ? "m12"
          : null
        : null;
    console.log("currentMonth", currentMonth);
    if (!isEmpty(currentUserTarget)) {
      switch (currentMonth) {
        default:
          break;
        case "m1":
          userQuota = currentUserTarget.m1;
          break;
        case "m2":
          userQuota = currentUserTarget.m2;
          break;
        case "m3":
          userQuota = currentUserTarget.m3;
          break;
        case "m4":
          userQuota = currentUserTarget.m4;
          break;
        case "m5":
          userQuota = currentUserTarget.m5;
          break;
        case "m6":
          userQuota = currentUserTarget.m6;
          break;
        case "m7":
          userQuota = currentUserTarget.m7;
          break;
        case "m8":
          userQuota = currentUserTarget.m8;
          break;
        case "m9":
          userQuota = currentUserTarget.m9;
          break;
        case "m10":
          userQuota = currentUserTarget.m10;
          break;
        case "m11":
          userQuota = currentUserTarget.m11;
          break;
        case "m12":
          userQuota = currentUserTarget.m12;
          break;
      }
    } else {
      userQuota = 0;
      switch (currentMonth) {
        default:
          break;
        case "m1":
          teamQuota = currentTeamTarget.m1;
          break;
        case "m2":
          teamQuota = currentTeamTarget.m2;
          break;
        case "m3":
          teamQuota = currentTeamTarget.m3;
          break;
        case "m4":
          teamQuota = currentTeamTarget.m4;
          break;
        case "m5":
          teamQuota = currentTeamTarget.m5;
          break;
        case "m6":
          teamQuota = currentTeamTarget.m6;
          break;
        case "m7":
          teamQuota = currentTeamTarget.m7;
          break;
        case "m8":
          teamQuota = currentTeamTarget.m8;
          break;
        case "m9":
          teamQuota = currentTeamTarget.m9;
          break;
        case "m10":
          teamQuota = currentTeamTarget.m10;
          break;
        case "m11":
          teamQuota = currentTeamTarget.m11;
          break;
        case "m12":
          teamQuota = currentTeamTarget.m12;
          break;
      }
    }
    console.log("userQuota", userQuota);
    console.log("selectedUserId", selectedUserId);
    console.log("teamId", teamId);
    deals.forEach(ad => {
      if (teamId === 3) {
        if (
          ad.wonDate !== null &&
          ad.wonDate !== undefined &&
          parseInt(format(parseISO(ad.wonDate), "MM")) === cMN
        ) {
          teamAchieved += 1;
          if (
            ad.wonUserId !== null &&
            ad.wonUserId !== undefined &&
            selectedUserId !== 0 &&
            ad.wonUserId === selectedUserId
          ) {
            userAchieved += 1;
          }
        }
      } else if (teamId === 1) {
        if (
          ad.mqlDate !== null &&
          ad.mqlDate !== undefined &&
          parseInt(format(parseISO(ad.mqlDate), "MM")) === cMN
        ) {
          teamAchieved += 1;
          if (
            ad.mqlUserId !== null &&
            ad.mqlUserId !== undefined &&
            selectedUserId !== 0 &&
            ad.mqlUserId === selectedUserId
          ) {
            userAchieved += 1;
          }
        }
      } else if (teamId === 2) {
        if (
          ad.sqlDate !== null &&
          ad.sqlDate !== undefined &&
          parseInt(format(parseISO(ad.sqlDate), "MM")) === cMN
        ) {
          teamAchieved += 1;
          if (
            ad.sqlUserId !== null &&
            ad.sqlUserId !== undefined &&
            selectedUserId !== 0 &&
            ad.sqlUserId === selectedUserId
          ) {
            userAchieved += 1;
          }
        }
      }
    });
    console.log("userAchieved", userAchieved);
    console.log("teamAchieved", teamAchieved);

    setTeamQuota(teamQuota);
    setTeamAch(userAchieved);
    setUserAch(userAchieved);
    setUserQuota(userQuota);
    setUserTarget(currentUserTarget);
    setTeamTarget(currentUserTarget);
  };

  const onDragStart = (event, id) => {
    console.log("dragstart on div/deal: ", id);
    event.dataTransfer.setData("id", id);
  };

  const onDragOver = event => {
    event.preventDefault();
  };

  const onDrop = (event, stageId) => {
    event.preventDefault();
    let dealId = event.dataTransfer.getData("id");

    let originalStageID = deals.filter(deal => deal.id === parseInt(dealId))[0]
      .stageId;
    //console.log("dealId", dealId);
    //console.log("originalStageID", originalStageID);

    if (originalStageID !== parseInt(stageId)) {
      let allDealsTemp = allDeals;
      let dealsTemp = deals;
      let id = parseInt(dealId);

      if (allDealsTemp.find(ad => ad.id === id)) {
        allDealsTemp = allDealsTemp.map(ad => {
          if (ad.id === id) {
            ad.stageId = stageId;
          }
          return ad;
        });
      }
      if (dealsTemp.find(d => d.id === id)) {
        dealsTemp = dealsTemp.map(d => {
          if (d.id === id) {
            d.stageId = stageId;
          }
          return d;
        });
      }

      setAllDeals(allDealsTemp);
      //setLocalDeals(dealsTemp);

      updatePipeDeals(
        stages,
        pipeId,
        allDealsTemp,
        orgs,
        activities,
        selectedUserId,
        filtered
      );
    }
  };

  const updatePipeDeals = (
    stages,
    pipeId,
    deals,
    orgs,
    activities,
    selectedUserId,
    filtered
  ) => {
    let object = [];
    let filteredDeals = [];

    console.log("selectedUserId", selectedUserId);
    console.log("maDeals", maDeals);
    console.log("teamId", teamId);
    console.log("sdDeals", sdDeals);
    console.log("saDeals", saDeals);

    if (parseInt(selectedUserId) === -1) {
      if (teamId === 1) {
        filteredDeals = maDeals.filter(deal =>
          filtered.find(stage => parseInt(deal.stageId) === parseInt(stage.id))
        );
      } else if (teamId === 2) {
        filteredDeals = sdDeals.filter(deal =>
          filtered.find(stage => parseInt(deal.stageId) === parseInt(stage.id))
        );
      } else if (teamId === 3) {
        filteredDeals = saDeals.filter(deal =>
          filtered.find(stage => parseInt(deal.stageId) === parseInt(stage.id))
        );
      }
      //console.log("filteredDeals", filteredDeals);
      //console.log("usersByTeam[6]", usersByTeam[6]);
      filteredDeals = filteredDeals.filter(fd =>
        usersByTeam[6].find(u => u.id === fd.userId)
      );
      //console.log("filteredDeals", filteredDeals);
    } else if (parseInt(selectedUserId) === 0) {
      filteredDeals = deals.filter(deal =>
        filtered.find(stage => parseInt(deal.stageId) === parseInt(stage.id))
      );
    } else {
      filteredDeals = deals.filter(deal =>
        filtered.find(
          stage =>
            parseInt(deal.stageId) === parseInt(stage.id) &&
            parseInt(deal.userId) === parseInt(selectedUserId)
        )
      );
    }

    console.log("filteredDeals", filteredDeals);
    let insideTotal = [];

    filtered.forEach(stage => {
      insideTotal[stage.id] = 0;
      filteredDeals.forEach(deal => {
        //console.log("deal.dealValue", deal.dealValue);

        if (deal.stageId === stage.id) {
          insideTotal[stage.id] +=
            deal.dealValue !== null &&
            deal.dealValue !== undefined &&
            !isNaN(parseInt(deal.dealValue))
              ? parseInt(deal.dealValue)
              : 0;
        }
      });
    });

    console.log("insideTotal", insideTotal);
    setTotal(insideTotal);

    //console.log("filteredDeals", filteredDeals);
    //filteredDeals = filteredDeals[0];

    let sum = 0;
    if (filteredDeals !== undefined && filteredDeals.length > 0)
      filteredDeals.forEach(deal => {
        sum +=
          deal.dealValue !== null &&
          deal.dealValue !== undefined &&
          !isNaN(parseInt(deal.dealValue))
            ? parseInt(deal.dealValue)
            : 0;
      });

    console.log("sum", sum);

    filtered.forEach(stage => (object[stage.id] = []));
    console.log("object", object);

    if (
      filteredDeals &&
      filteredDeals.length > 0 &&
      filteredDeals !== undefined
    ) {
      filteredDeals.forEach(deal => {
        object[parseInt(deal.stageId)].push(
          <Card
            onDragStart={event => onDragStart(event, deal.id)}
            draggable
            key={deal.id}
            className="draggable"
            bg="dark"
          >
            <span className="SpanDetails">
              <span href={`#`}>{deal.dealName}</span>
              <a
                href={`/people/details/${deal.contactId}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <OverlayTrigger
                  placement="left"
                  overlay={
                    <Tooltip
                      style={{
                        background: "#343a40",
                        color: "#fcfcfc",
                        textAlign: "left"
                      }}
                      className="dealTooltip"
                    >
                      {contacts !== undefined &&
                      contacts !== null &&
                      contacts.length > 0 &&
                      deal.contactId !== undefined &&
                      deal.contactId !== null &&
                      contacts.find(p => p.id === deal.contactId)
                        ? contacts
                            .filter(p => p.id === deal.contactId)
                            .map(p => (
                              <div
                                key={p.id}
                                style={{ textAlign: "left", color: "orange" }}
                              >
                                <Row>
                                  <Col
                                    xs={4}
                                    sm={4}
                                    md={4}
                                    lg={4}
                                    xl={4}
                                    style={{ textAlign: "center" }}
                                  >
                                    <i className="far fa-user" />
                                  </Col>
                                  <Col>
                                    <span>
                                      {p.contactName !== null &&
                                      p.contactName !== undefined &&
                                      p.contactName !== ""
                                        ? p.contactName
                                        : "Not defined"}
                                    </span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    xs={4}
                                    sm={4}
                                    md={4}
                                    lg={4}
                                    xl={4}
                                    style={{ textAlign: "center" }}
                                  >
                                    <i className="fas fa-mobile-alt" />
                                  </Col>
                                  <Col>
                                    <span>
                                      {p.contactMainPhone !== null &&
                                      p.contactMainPhone !== undefined &&
                                      p.contactMainPhone !== ""
                                        ? p.contactMainPhone
                                        : "---"}
                                    </span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    xs={4}
                                    sm={4}
                                    md={4}
                                    lg={4}
                                    xl={4}
                                    style={{ textAlign: "center" }}
                                  >
                                    <i className="far fa-envelope" />
                                  </Col>
                                  <Col>
                                    <span>
                                      {p.contactEmail !== null &&
                                      p.contactEmail !== undefined &&
                                      p.contactEmail !== ""
                                        ? p.contactEmail
                                        : "---"}
                                    </span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col
                                    xs={4}
                                    sm={4}
                                    md={4}
                                    lg={4}
                                    xl={4}
                                    style={{ textAlign: "center" }}
                                  >
                                    <i className="far fa-id-badge" />
                                  </Col>
                                  <Col>
                                    <span>
                                      {" "}
                                      {p.contactTypeId !== null &&
                                      p.contactTypeId !== undefined &&
                                      !isNaN(p.contactTypeId) &&
                                      common.contactTypes !== null &&
                                      common.contactTypes !== undefined &&
                                      common.contactTypes.length > 0 &&
                                      common.contactTypes.find(
                                        ct => ct.id === p.contactTypeId
                                      )
                                        ? common.contactTypes.filter(
                                            ct => ct.id === p.contactTypeId
                                          )[0].contactTypeName
                                        : "Contact Type - NULL"}
                                    </span>
                                  </Col>
                                </Row>
                              </div>
                            ))
                        : "Unable to retrieve contact record"}
                    </Tooltip>
                  }
                >
                  <i className="far fa-user" />
                </OverlayTrigger>
              </a>
            </span>

            <Card.Body>
              {deal.orgId !== null &&
              deal.orgId !== undefined &&
              orgs.find(org => org.id === deal.orgId) ? (
                <span>
                  {orgs.filter(org => org.id === deal.orgId)[0].orgName}
                </span>
              ) : null}
            </Card.Body>
            <Card.Footer>
              <span className="footerSpan">
                ${" "}
                {!isNaN(parseInt(deal.dealValue))
                  ? parseInt(deal.dealValue).toLocaleString()
                  : 0}
              </span>
              <button className="actButton">
                {/*<button
                onClick={() => this.handleShowAct(deal.id)}
                className="actButton"
              >*/}
                <i
                  className={
                    activities !== undefined &&
                    activities !== null &&
                    activities.length > 0 &&
                    activities.find(
                      act => act.dealId === deal.id && !act.isCompleted
                    )
                      ? activities.find(
                          act =>
                            act.dealId === deal.id &&
                            !act.isCompleted &&
                            isAfter(
                              parseISO(act.activityDate),
                              parseISO(new Date())
                            )
                        )
                        ? "fas fa-ellipsis-h green"
                        : activities.find(
                            act =>
                              act.dealId === deal.id &&
                              !act.isCompleted &&
                              isEqual(
                                parseISO(act.activityDate),
                                parseISO(new Date())
                              )
                          )
                        ? "fas fa-ellipsis-h orange"
                        : "fas fa-ellipsis-h yellow"
                      : "fas fa-ellipsis-h red"
                  }
                  style={{
                    borderRadius: "20px",
                    background: "#fcfcfc",
                    fontSize: "16px"
                  }}
                />
              </button>
            </Card.Footer>
          </Card>
        );
      });
    }

    setDealsValue(sum);
    setPipeDeals(object);
    setFilteredDeals(filteredDeals);

    updateTargetsAndAchieved(pipelines.filter(p => p.id === pipeId)[0].teamId);
    //console.log("this.state.pipeDeals", pipeDeals);
    //console.log("this.state.filteredDeals", filteredDeals);
  };

  const updateActivities = acts => {
    setTheActs(acts);
  };

  const callback = key => {
    //console.log(key);
    setTabKey(key);
  };

  const handleSelectPipe = e => {
    e.preventDefault();
    console.log("selecing pipe", e.target.value);

    if (
      e.target.value &&
      !isNaN(e.target.value) &&
      parseInt(e.target.value) > 0
    )
      setPipeId(parseInt(e.target.value));
  };

  const handleSelectUser = e => {
    e.preventDefault();
    console.log("selecing user", e.target.value);

    if (e.target.value && !isNaN(e.target.value))
      setSelectedUserId(parseInt(e.target.value));
  };

  return (
    <Row className="ShowMainRow">
      <Col span={24} className="ShowMainColumn">
        <Row className="MainRow">
          <Col span={24} className="MainColumn">
            <div className="sec-t">
              <h2>
                <span>Showcase</span>
              </h2>
            </div>
          </Col>
        </Row>
        <Tabs
          className="ShowCase"
          onChange={callback}
          type="card"
          activeKey={tabKey}
        >
          <TabPane tab="Kanban 1" key="1">
            {dataLoaded ? (
              <Kanban1
                filteredDeals={filteredDeals}
                dealsValue={dealsValue}
                setDealsValue={setDealsValue}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
                userQuota={userQuota}
                teamQuota={teamQuota}
                userAchieved={userAchieved}
                teamAchieved={teamAchieved}
                pipeId={pipeId}
                setPipeId={setPipeId}
                teamId={teamId}
                setTeamId={setTeamId}
                usersByTeam={usersByTeam}
                pipelines={pipelines}
                common={common}
                activities={activities}
                contacts={contacts}
                orgs={orgs}
                stages={stages}
                users={users}
                handleSelectPipe={handleSelectPipe}
                handleSelectUser={handleSelectUser}
                counter={counter}
                total={total}
                currentUserTarget={currentUserTarget}
                currentTeamTarget={currentTeamTarget}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onDragOver={onDragOver}
                pipeDeals={pipeDeals}
                filtered={filtered}
                setCounter={setCounter}
              />
            ) : (
              "Loading..."
            )}
          </TabPane>
          <TabPane tab="Kanban 2" key="2">
            {dataLoaded ? (
              <Kanban2
                filteredDeals={filteredDeals}
                dealsValue={dealsValue}
                setDealsValue={setDealsValue}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
                userQuota={userQuota}
                teamQuota={teamQuota}
                userAchieved={userAchieved}
                teamAchieved={teamAchieved}
                pipeId={pipeId}
                setPipeId={setPipeId}
                teamId={teamId}
                setTeamId={setTeamId}
                usersByTeam={usersByTeam}
                pipelines={pipelines}
                common={common}
                activities={activities}
                contacts={contacts}
                orgs={orgs}
                stages={stages}
                users={users}
                handleSelectPipe={handleSelectPipe}
                handleSelectUser={handleSelectUser}
                counter={counter}
                total={total}
                currentUserTarget={currentUserTarget}
                currentTeamTarget={currentTeamTarget}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onDragOver={onDragOver}
                pipeDeals={pipeDeals}
                filtered={filtered}
                setCounter={setCounter}
                deals={deals}
                teamTargets={common.teamTargets}
                userTargets={common.userTargets}
              />
            ) : (
              "Loading..."
            )}
          </TabPane>
          <TabPane tab="Tasks" key="3">
            {dataLoaded ? (
              <Activities
                pipelines={pipelines}
                common={common}
                activities={theActs}
                contacts={contacts}
                orgs={orgs}
                stages={stages}
                users={users}
                loggedinUserId={selectedUserId}
                deals={deals}
                teamTargets={common.teamTargets}
                userTargets={common.userTargets}
                updateActivities={updateActivities}
              />
            ) : (
              "Loading..."
            )}
          </TabPane>
          <TabPane
            disabled
            tab={
              <div>
                Templates<sup>*</sup>
              </div>
            }
            key="4"
          >
            Content of Tab Pane 4
          </TabPane>
          <TabPane
            disabled
            tab={
              <div>
                CSS Parser<sup>*</sup>
              </div>
            }
            key="5"
          >
            Content of Tab Pane 5
          </TabPane>
          <TabPane
            disabled
            tab={
              <div>
                Vis Charts<sup>*</sup>
              </div>
            }
            key="6"
          >
            Content of Tab Pane 6
          </TabPane>
          <TabPane
            disabled
            tab={
              <div>
                AntD Charts<sup>*</sup>
              </div>
            }
            key="7"
          >
            Content of Tab Pane 7
          </TabPane>
          <TabPane
            disabled
            tab={
              <div>
                Timeline 1<sup>*</sup>
              </div>
            }
            key="8"
          >
            Content of Tab Pane 8
          </TabPane>
          <TabPane
            disabled
            tab={
              <div>
                Timeline 2<sup>*</sup>
              </div>
            }
            key="9"
          >
            Content of Tab Pane 9
          </TabPane>
          <TabPane
            disabled
            tab={
              <div>
                Stripe<sup>*</sup>
              </div>
            }
            key="10"
          >
            Content of Tab Pane 10
          </TabPane>
          <TabPane
            disabled
            tab={
              <div>
                Image Crop<sup>*</sup>
              </div>
            }
            key="11"
          >
            Content of Tab Pane 11
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default ShowCase;
