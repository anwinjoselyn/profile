import React, { useState, useEffect } from "react";

import { Button } from "antd";

import {
  format,
  parseISO,
  //isFuture,
  isPast,
  isToday,
  isTomorrow,
  isThisWeek,
  isSameWeek,
  addDays,
  //add,
  sub
} from "date-fns";

//import axios from "axios";

import OverviewStats from "./Components/OverviewStats";
import Inbox from "./Components/Inbox";
import AllActivities from "./Components/AllActivities";

import "./Activities.css";

//const jsonActs = require("./Mockdata/Activities.json");
const syncedEmails = require("./Mockdata/syncedemails.json");

const allDeals = require("../Deals/Mockdata/mockdeals.json").data;

const Activities = props => {
  const [dataLoaded, setLoaded] = useState(false);
  const [processedActs, setProcessedActs] = useState([]);
  const [userActs, setUserActs] = useState([]);
  const [filteredActs, setFilteredActs] = useState([]);
  const [maTeamActs, setMaTeamActs] = useState([]);
  const [maTeamUsers, setMaTeamUsers] = useState([]);
  const [sdTeamActs, setSdTeamActs] = useState([]);
  const [sdTeamUsers, setSdTeamUsers] = useState([]);
  const [saTeamActs, setSaTeamActs] = useState([]);
  const [saTeamUsers, setSaTeamUsers] = useState([]);
  const [csTeamUsers, setCsTeamUsers] = useState([]);
  const [csTeamActs, setCsTeamActs] = useState([]);
  const [reTeamUsers, setReTeamUsers] = useState([]);
  const [reTeamActs, setReTeamActs] = useState([]);
  const [allTeamActs, setAllTeamActs] = useState([]);
  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    let allActivitiesNew = [];

    props.users.forEach(u => {
      let userActs = props.activities.filter(a => a.userId === u.id);
      let userCActs = [];
      let userRActs = [];
      //console.log("userActs", userActs);

      let userSEmails = syncedEmails.filter(se => se.userId === u.id);

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

      let allUserDealsNew = allDeals.filter(d => d.userId === u.id);
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

    console.log("allActivitiesNew", allActivitiesNew);

    let newUserActivities = allActivitiesNew.filter(
      aan => aan.userId === props.loggedinUserId
    )[0].openUserActs;
    /*
  console.log(
    "activities from filtering newUserActivities",
    newUserActivities
  );
  */

    setUserActs(newUserActivities);
    setFilteredActs(
      newUserActivities.length > 0
        ? newUserActivities.filter(a => isToday(parseISO(a.activityDate)))
        : []
    );
    setProcessedActs(allActivitiesNew);

    let mteamUsers = props.users.filter(
      tu => tu.teamId === 1 || tu.teamId === 6
    );
    //console.log("mteamUsers", mteamUsers);
    let sdteamUsers = props.users.filter(
      tu => tu.teamId === 2 || tu.teamId === 6
    );
    //console.log("sdteamUsers", sdteamUsers);
    let sateamUsers = props.users.filter(
      tu => tu.teamId === 3 || tu.teamId === 6
    );
    //console.log("sateamUsers", sateamUsers);
    let csteamUsers = props.users.filter(
      tu => tu.teamId === 4 || tu.teamId === 6
    );
    //console.log("csteamUsers", csteamUsers);
    let reteamUsers = props.users.filter(
      tu => tu.teamId === 5 || tu.teamId === 6
    );
    //console.log("reteamUsers", reteamUsers);
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
    //console.log("sdteamActivities", sdteamActivities);

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
    //console.log("sateamActivities", sateamActivities);

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
    //console.log("csteamActivities", csteamActivities);

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
    //console.log("reteamActivities", reteamActivities);

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

    //console.log("filtered allTeamActivities", allTeamActivities);

    setMaTeamActs(mteamActivities);
    setMaTeamUsers(mteamUsers);
    setSdTeamActs(sdteamActivities);
    setSdTeamUsers(sdteamUsers);
    setSaTeamActs(sateamActivities);
    setSaTeamUsers(sateamUsers);
    setCsTeamActs(csteamActivities);
    setCsTeamUsers(csteamUsers);
    setReTeamActs(reteamActivities);
    setReTeamUsers(reteamUsers);
    setAllTeamActs(allTeamActivities);
    setLoaded(true);
  }, [props.users, props.activities, props.loggedinUserId]);

  if (props.showInitialStats)
    return <OverviewStats activities={props.activities} />;
  else if (dataLoaded && props.currentMenu === "inboxView")
    return (
      <Inbox
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
        activities={props.activities}
        pipelines={props.pipelines}
        stages={props.stages}
        orgTargets={props.orgTargets}
        userTargets={props.userTargets}
        currentMenu={props.currentMenu}
        processedActs={processedActs}
        userActs={props.userActs}
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
        dst={props.dst}
        today={today}
        userId={props.loggedinUserId}
        allDeals={allDeals}
      />
    );
  else if (dataLoaded && props.currentMenu === "allTasks")
    return (
      <AllActivities
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
        activities={props.activities.filter(a => !a.isCompleted)}
        pipelines={props.pipelines}
        stages={props.stages}
        orgTargets={props.orgTargets}
        userTargets={props.userTargets}
        currentMenu={props.currentMenu}
        processedActs={processedActs}
        userActs={props.userActs}
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
        dst={props.dst}
        today={today}
        userId={props.loggedinUserId}
        allDeals={allDeals}
        updateActivities={props.updateActivities}
      />
    );
  else
    return (
      <div className="Activities">
        Some data
        <div>Some more data</div>
      </div>
    );
};

export default Activities;
