import React, { useState } from "react";

import { Row, Col, Radio, Space } from "antd";

import {
  format
  //parseISO,
  //isFuture,
  //isPast,
  //isToday,
  //isTomorrow,
  //isThisWeek,
  //isSameWeek,
  //addDays,
  //add,
  //sub
} from "date-fns";

//import axios from "axios";

//import OverviewStats from "./Components/OverviewStats";
//import Inbox from "./Components/Inbox";
import AllActivities from "./Components/AllActivities";

import "./Activities.css";

//const jsonActs = require("./Mockdata/Activities.json");
const syncedEmails = require("./Mockdata/syncedemails.json");

const allDeals = require("../../Data/deals.json").data;

const Activities = props => {
  const [view, setView] = useState("inbox");
  const today = format(new Date(), "yyyy-MM-dd");

  const onChange = e => {
    console.log(`radio checked:${e.target.value}`);
    setView(e.target.value);
  };

  return (
    <div className="Activities">
      <Row style={{ marginBottom: "1em" }}>
        <Col span={24}>
          <Radio.Group onChange={onChange} value={view}>
            <Space
              className="TasksSpace"
              style={{ textAlign: "center", width: "100%" }}
              size="large"
            >
              <Radio.Button value="all">All Activities</Radio.Button>
              <Radio.Button value="inbox">Inbox View</Radio.Button>
              <Radio.Button value="exp">Brief Explanation</Radio.Button>
            </Space>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AllActivities
            view={view}
            setView={setView}
            activityTypes={props.common.activityTypes}
            companyTypes={props.common.companyTypes}
            contactTypes={props.common.contactTypes}
            dealStatuses={props.common.dealStatuses}
            reasons={props.common.reasons}
            roles={props.common.roles}
            teams={props.common.teams}
            users={props.users}
            targetTypes={props.common.targetTypes}
            people={props.contacts}
            orgs={props.orgs}
            activities={props.activities}
            pipelines={props.pipelines}
            stages={props.stages}
            orgTargets={props.teamTargets}
            userTargets={props.userTargets}
            currentMenu={props.currentMenu}
            maTeamActs={props.maTeamActs}
            maTeamUsers={props.maTeamUsers}
            sdTeamActs={props.sdTeamActs}
            sdTeamUsers={props.sdTeamUsers}
            saTeamActs={props.saTeamActs}
            saTeamUsers={props.saTeamUsers}
            csTeamUsers={props.csTeamUsers}
            csTeamActs={props.csTeamActs}
            reTeamUsers={props.reTeamUsers}
            reTeamActs={props.reTeamActs}
            allTeamActs={props.allTeamActs}
            dst={1}
            today={today}
            userId={props.loggedinUserId}
            allDeals={allDeals}
            syncedEmails={syncedEmails}
            updateActivities={props.updateActivities}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Activities;
