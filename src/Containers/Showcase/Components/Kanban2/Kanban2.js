import React, {
  useState,
  useEffect
  //useCallback
} from "react";

import { isAfter, parseISO, isEqual, format } from "date-fns";

import {
  Button,
  Card,
  //Table,
  Row,
  Col,
  Select,
  //Tabs,
  Switch
} from "antd";

import {
  UserOutlined,
  CalendarOutlined,
  FilterOutlined
  //UnorderedListOutlined,
  //MailOutlined,
  //DollarTwoTone,
  //ContactsOutlined,
  //HomeOutlined
} from "@ant-design/icons";

//import axios from "axios";

import PipeView from "./PipeView";
import Explanation from "./Explanation";

import "./Kanban2.css";

const { Option } = Select;
//const { TabPane } = Tabs;

//const mockDeals = require("./Mockdata/mockDeals.json").data;
//const mockActivities = require("../../mockdata/activities.json").data;

const Kanban2 = props => {
  const [dataLoaded, setLoaded] = useState(false);

  const topColors = ["#FC902B", "#2ADDF5", "#2A45F7", "#87ED90"];
  const todaysDate = format(new Date(), "yyyy-MM-dd");
  const [allDeals, setAllDeals] = useState([]);
  //const [activities, setActivities] = useState(props.activities);

  const [selectedTeamId, setTeamId] = useState(0);
  const [selectedPipeId, setPipeId] = useState(0);
  const [filteredStages, setFilteredStages] = useState([]);
  const [currentPipeDeals, setCurrentPipeDeals] = useState([]);
  const [total, setTotal] = useState([]);
  const [selectedUserId, setUserId] = useState(0);

  const [currentDealActs, setCurrentDealActs] = useState([]);
  //const [actShow, setActShow] = useState(true);
  const [currentDeal, setCurrentDeal] = useState({});

  const [currentTeamTarget, setCurrentTeamTarget] = useState(
    props.currentTeamTarget
  );
  const [currentUserTarget, setCurrentUserTarget] = useState(
    props.currentUserTarget
  );
  const [userQuota, setUserQuota] = useState(0);
  const [userAchieved, setUserAchieved] = useState(0);
  const [teamAchieved, setTeamAchieved] = useState(0);
  const [teamQuota, setTeamQuota] = useState(0);
  const [dealsInDND, setDNDDeals] = useState([]);
  const [dealsValue, setDealsValue] = useState(0);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    //setAllDeals(props.deals);
    //console.log("allDeals", allDeals);
    //console.log("activities", activities);
    //console.log("props.users", props.users);

    let deals = props.deals.filter(
      deal =>
        deal.isActive &&
        (deal.statusId === 1 ||
          deal.statusId === 3 ||
          deal.statusId === 4 ||
          deal.statusId === 6)
    );

    let teamId = props.teamId;
    let pipeId = props.pipeId;
    let stages = [];

    if (pipeId > 0) {
      stages = props.stages.filter(s => s.pipeId === pipeId && s.isActive);
    }

    let filteredDeals = [];

    if (stages.length > 0) {
      //console.log("stages length", stages.length);
      filteredDeals = deals.filter(ad => stages.find(s => s.id === ad.stageId));
    }

    setTeamId(teamId);
    setPipeId(pipeId);
    setFilteredStages(stages);
    setCurrentPipeDeals(filteredDeals);
    setUserId(props.selectedUserId);
    setAllDeals(deals);

    //console.log("teamId", teamId);
    //console.log("pipeId", pipeId);
    //console.log("stages", stages);
    //console.log("currentPipeDeals", currentPipeDeals);
    //console.log("currentPipeDeals", filteredDeals);

    updatePipeDeals(
      stages,
      pipeId,
      filteredDeals,
      props.orgs,
      props.activities,
      props.selectedUserId,
      teamId
    );
  }, [
    props.deals,
    props.activities,
    props.orgs,
    props.pipelines,
    props.stages,
    props.selectedUserId,
    props.teamId,
    props.pipeId
  ]);

  const selectPipe = value => {
    console.log("value");
    let pipeId = parseInt(value);
    console.log("pipeId");
    let filtered = props.stages.filter(
      stage => parseInt(stage.pipeId) === pipeId
    );

    let teamId = props.pipelines.filter(pipe => pipe.id === pipeId)[0].teamId;
    console.log("teamId", teamId);
    let filteredDeals = [];
    if (filtered.length > 0) {
      //console.log("stages length", stages.length);
      filteredDeals = props.deals.filter(ad =>
        filtered.find(s => s.id === ad.stageId)
      );
    }

    setPipeId(pipeId);
    setFilteredStages(filtered);
    setTeamId(teamId);
    setUserId(0);
    //setCurrentPipeDeals(filteredDeals)

    console.log("filtered", filtered);

    //console.log("teamId", teamId);

    updatePipeDeals(
      filtered,
      pipeId,
      filteredDeals,
      props.orgs,
      props.activities,
      0,
      teamId
    );
  };

  const handleSelectUser = value => {
    console.log("value", value);
    let selectedUserId = parseInt(value);
    setUserId(selectedUserId);
    console.log("selectedUserId", selectedUserId);
    console.log("selectedPipeId", selectedPipeId);
    console.log("selectedTeamId", selectedTeamId);

    let filteredDeals = [];
    if (selectedUserId > 0) {
      //console.log("stages length", stages.length);
      filteredDeals = allDeals.filter(deal =>
        filteredStages.find(
          stage =>
            parseInt(deal.stageId) === parseInt(stage.id) &&
            parseInt(deal.userId) === parseInt(selectedUserId)
        )
      );
    } else if (selectedUserId === -1) {
      filteredDeals = allDeals.filter(
        ad =>
          props.usersByTeam[6].find(u => u.id === ad.userId) &&
          filteredStages.find(s => s.id === ad.stageId)
      );
    } else if (selectedUserId === 0) {
      filteredDeals = allDeals.filter(ad =>
        filteredStages.find(s => s.id === ad.stageId)
      );
    }

    updatePipeDeals(
      filteredStages,
      selectedPipeId,
      filteredDeals,
      props.orgs,
      props.activities,
      selectedUserId,
      selectedTeamId
    );
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

    let originalStageID = currentPipeDeals.filter(
      deal => deal.id === parseInt(dealId)
    )[0].stageId;
    //console.log("dealId", dealId);
    //console.log("originalStageID", originalStageID);
    /*
    let newStageId = {
      stageId: parseInt(stageId)
    };
*/
    if (originalStageID !== parseInt(stageId)) {
      let tempAllDeals = props.deals;
      let tempFilteredDeals = currentPipeDeals;
      let id = parseInt(dealId);

      if (tempAllDeals.find(ad => ad.id === id)) {
        tempAllDeals = tempAllDeals.map(ad => {
          if (ad.id === id) {
            ad.stageId = stageId;
          }
          return ad;
        });
      }
      if (tempFilteredDeals.find(d => d.id === id)) {
        tempFilteredDeals = tempFilteredDeals.map(d => {
          if (d.id === id) {
            d.stageId = stageId;
          }
          return d;
        });
      }
      setCurrentPipeDeals(tempFilteredDeals);
      setAllDeals(tempAllDeals);

      updatePipeDeals(
        filteredStages,
        selectedPipeId,
        tempAllDeals,
        props.orgs,
        props.activities,
        selectedUserId,
        selectedTeamId
      );
    }
  };

  const updateTargetsAndAchieved = teamId => {
    console.log("props.userTargets", props.userTargets);
    let currentUserTarget =
      props.userTargets !== null &&
      props.userTargets !== undefined &&
      selectedUserId !== 0 &&
      props.userTargets.find(ut => ut.userId === selectedUserId)
        ? props.userTargets.filter(ut => ut.userId === selectedUserId)[0]
        : {};

    let currentTeamTarget =
      props.teamTargets !== null &&
      props.teamTargets !== undefined &&
      props.teamTargets.find(tt => tt.teamId === teamId)
        ? props.teamTargets.filter(tt => tt.teamId === teamId)[0]
        : {};

    console.log("currentTeamTarget", currentTeamTarget);
    console.log("currentUserTarget", currentUserTarget);
    let userAchieved = 0;
    let userQuota = 0;
    let teamAchieved = 0;
    let teamQuota = 0;
    let cMN = parseInt(format(new Date(), "MM"));
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
    if (currentUserTarget) {
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
    allDeals.forEach(ad => {
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

    setCurrentTeamTarget(currentTeamTarget);
    setCurrentUserTarget(currentUserTarget);
    setUserQuota(userQuota);
    setUserAchieved(userAchieved);
    setTeamAchieved(teamAchieved);
    setTeamQuota(teamQuota);
    setLoaded(true);
  };

  const updatePipeDeals = (
    filteredStages,
    pipeId,
    deals,
    orgs,
    activities,
    selectedUserId,
    teamId
  ) => {
    if (dataLoaded) setLoaded(false);
    let object = [];
    let filteredDeals = props.deals.filter(d =>
      filteredStages.find(s => s.id === d.stageId)
    );
    let tempTotal = [];
    //console.log("filteredDeals", filteredDeals);

    if (parseInt(selectedUserId) > 0) {
      filteredDeals = filteredDeals.filter(
        deal => deal.userId === parseInt(selectedUserId)
      );

      setCurrentPipeDeals(filteredDeals);
    }
    console.log("filteredDeals", filteredDeals);

    filteredStages.forEach(stage => {
      tempTotal[stage.id] = 0;
      filteredDeals.forEach(deal => {
        //console.log("deal.dealValue", deal.dealValue);

        if (deal.stageId === stage.id) {
          tempTotal[stage.id] +=
            deal.dealValue !== null &&
            deal.dealValue !== undefined &&
            !isNaN(parseInt(deal.dealValue))
              ? parseInt(deal.dealValue)
              : 0;
        }
      });
    });

    console.log("tempTotal", tempTotal);
    setTotal(tempTotal);

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
    console.log("filteredDeals", filteredDeals);
    filteredStages.forEach(stage => (object[stage.id] = []));
    console.log("object", object);

    if (filteredDeals !== undefined && filteredDeals.length > 0) {
      filteredDeals.forEach((deal, key) => {
        //console.log("deal.stageId", deal.stageId);
        //console.log("deal", deal);
        console.log("deal.stageId", deal.stageId);
        if (deal && deal.stageId)
          object[deal.stageId].push(
            <Card
              hoverable
              size="small"
              bordered={false}
              onDragStart={event => onDragStart(event, deal.id)}
              draggable
              key={deal.id}
              className="draggable2"
            >
              <p className="detailsP">
                <span
                  style={
                    deal.stageId ===
                    filteredStages.sort((a, b) => a.order - b.order)[
                      filteredStages.length - 1
                    ].id
                      ? {
                          color: `${topColors[topColors.length - 1]}`
                        }
                      : deal.stageId ===
                        filteredStages.sort((a, b) => a.order - b.order)[0].id
                      ? {
                          color: `${topColors[0]}`
                        }
                      : {
                          color: `${topColors[1]}`
                        }
                  }
                >
                  {deal.dealName}
                </span>
                <span className="userIconDraggable">
                  <UserOutlined />
                </span>
              </p>

              <p>
                {deal.orgId !== null &&
                deal.orgId !== undefined &&
                props.orgs.find(org => org.id === deal.orgId) ? (
                  <span>
                    {props.orgs.filter(org => org.id === deal.orgId)[0].orgName}
                  </span>
                ) : null}
              </p>
              <p>
                <span className="footerSpan2">
                  ${" "}
                  {!isNaN(parseInt(deal.dealValue))
                    ? parseInt(deal.dealValue).toLocaleString()
                    : 0}
                </span>
                <Button
                  onClick={() => handleShowAct(deal.id)}
                  className="actButton2"
                >
                  {props.activities !== undefined &&
                  props.activities !== null &&
                  props.activities.length > 0 &&
                  props.activities.find(
                    act => act.dealId === deal.id && !act.isCompleted
                  ) ? (
                    props.activities.find(
                      act =>
                        act.dealId === deal.id &&
                        !act.isCompleted &&
                        isAfter(
                          parseISO(act.activityDate),
                          parseISO(todaysDate)
                        )
                    ) ? (
                      <CalendarOutlined className="PBLightGreen" />
                    ) : activities.find(
                        act =>
                          act.dealId === deal.id &&
                          !act.isCompleted &&
                          isEqual(
                            parseISO(act.activityDate),
                            parseISO(todaysDate)
                          )
                      ) ? (
                      <CalendarOutlined className="orange" />
                    ) : (
                      <CalendarOutlined className="PBRed" />
                    )
                  ) : (
                    <CalendarOutlined className="PBYellow" />
                  )}
                </Button>
              </p>
            </Card>
          );
      });
    }
    console.log("object", object);
    setDealsValue(sum);
    setDNDDeals(object);

    updateTargetsAndAchieved(teamId);
  };

  const handleShowAct = dealId => {
    //console.log("dealId", dealId);
    let filteredacts = props.activities.filter(
      act => act.dealId === dealId && !act.isCompleted
    );
    //console.log("filteredacts", filteredacts);
    let currentDeal = allDeals.find(deal => deal.id === dealId)
      ? allDeals.filter(deal => deal.id === dealId)[0]
      : {};
    //console.log("currentDeal", currentDeal);

    setCurrentDealActs(filteredacts);
    //setActShow(true);
    setCurrentDeal(currentDeal);

    //console.log("this.state.actShow", this.state.actShow);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onChange = checked => {
    console.log(`switch to ${checked}`);

    setToggle(checked);
  };

  const topData = () => {
    return (
      <div>
        <Row style={{ margin: "0.5em 0 1em 0" }}>
          <Col span={24} style={{ textAlign: "center", display: "block" }}>
            <h2
              style={{
                textAlign: "center",
                padding: "0.3em",
                fontSize: "1.2em"
              }}
            >
              {toggle ? " Pipelines Kanban View " : " Brief Explanation "}{" "}
              <Switch
                size="small"
                style={{ padding: "0.3em" }}
                defaultChecked
                onChange={onChange}
              />
            </h2>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Card size="small" className="statsCardDeals">
              {currentPipeDeals !== undefined &&
              currentPipeDeals !== null &&
              currentPipeDeals.length > 0
                ? currentPipeDeals.length.toString()
                : 0}{" "}
              <small style={{ color: "#19BAD1" }}>Deal(s)</small>
            </Card>
          </Col>
          <Col span={3}>
            <Card size="small" className="statsCardDeals">
              <small style={{ color: "#19BAD1" }}>Worth </small>{" "}
              {!isNaN(dealsValue) ? parseInt(dealsValue).toLocaleString() : 0}
            </Card>
          </Col>
          <Col span={3}>
            <Card size="small" className="statsCardDeals">
              <small style={{ color: "#19BAD1" }}>To Win </small>{" "}
              {selectedUserId !== 0 ? userQuota : teamQuota}
            </Card>
          </Col>
          <Col span={3}>
            <Card size="small" className="statsCardDeals">
              {selectedUserId !== 0 ? userAchieved : teamAchieved}{" "}
              <small style={{ color: "#19BAD1" }}>Achieved </small>
            </Card>
          </Col>
          <Col span={3}>
            <Card size="small" className="statsCardDeals">
              {selectedUserId !== 0
                ? userQuota - userAchieved
                : teamQuota - teamAchieved}{" "}
              <small style={{ color: "#19BAD1" }}>Remaining </small>
            </Card>
          </Col>
          <Col span={3}>
            <Card size="small" className="statsCardDeals">
              <small style={{ color: "#19BAD1" }}>Team Acheved </small>{" "}
              {teamAchieved}
            </Card>
          </Col>
          <Col span={3}>
            <Card size="small" className="statsCardDeals">
              <Select
                size="small"
                value={selectedPipeId}
                onChange={selectPipe}
                bordered={false}
                suffixIcon={<FilterOutlined className="selectIcon" />}
              >
                {props.pipelines
                  .filter(pipe => pipe.teamId <= 3)
                  .sort((a, b) => a.teamId - b.teamId)
                  .map(p => (
                    <Option key={p.id} value={p.id}>
                      {p.pipeName}
                    </Option>
                  ))}
              </Select>
            </Card>
          </Col>
          <Col span={3}>
            <Card size="small" className="statsCardDeals">
              <Select
                size="small"
                bordered={false}
                value={selectedUserId}
                onChange={handleSelectUser}
                suffixIcon={<UserOutlined className="selectIcon" />}
              >
                {props.usersByTeam !== undefined && props.usersByTeam.length > 0
                  ? props.usersByTeam[selectedTeamId].map(user => (
                      <Option value={user.id} id={user.id} key={user.id}>
                        {user.nickName ? user.nickName : user.userName}
                      </Option>
                    ))
                  : null}
                <Option value={0} id={0} key={0}>
                  All Users
                </Option>
              </Select>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div className="Kanban2">
      {dataLoaded && topData()}
      <div className="card-container">
        <Card bordered={false}>
          {dataLoaded ? (
            toggle ? (
              <PipeView
                currentMenu={props.currentMenu}
                deals={props.deals}
                activityTypes={props.activityTypes}
                companyTypes={props.companyTypes}
                contactTypes={props.contactTypes}
                dealStatuses={props.dealStatuses}
                reasons={props.reasons}
                roles={props.roles}
                teams={props.teams}
                users={props.users}
                targetTypes={props.targetTypes}
                activities={props.activities}
                allDeals={allDeals}
                selectedTeamId={selectedTeamId}
                selectedPipeId={selectedPipeId}
                filteredStages={filteredStages}
                currentPipeDeals={currentPipeDeals}
                total={total}
                selectedUserId={selectedUserId}
                currentDealActs={currentDealActs}
                currentDeal={currentDeal}
                currentTeamTarget={currentTeamTarget}
                currentUserTarget={currentUserTarget}
                userQuota={userQuota}
                userAchieved={userAchieved}
                teamAchieved={teamAchieved}
                teamQuota={teamQuota}
                dealsValue={dealsValue}
                dealsInDND={dealsInDND}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                topColors={topColors}
              />
            ) : (
              <Explanation />
            )
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default Kanban2;
