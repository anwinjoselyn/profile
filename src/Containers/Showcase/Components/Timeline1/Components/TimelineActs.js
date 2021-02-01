import React, { Fragment } from "react";
import { format } from "date-fns";
import TimelineItemActs from "./TimelineItem";

//

import "./style1.scss";

/**
 * Converts array of events in to object having date as the key and list of
 * event for that date as the value
 *
 * @param {Array} items Array of events in the form of ts and text
 * @returns {Object} return object with key as date and values array in events for that date
 */
function getFormattedData(items) {
  const activities = {};
  items.forEach(({ ts, text }, index) => {
    const date = new Date(ts);
    const dateStr = format(date, "DD/MM/YYYY");
    const list = activities[dateStr] || [];
    list.push({
      time: format(date, "hh:mm"),
      text,
      key: index
    });
    activities[dateStr] = list;
  });
  return activities;
}

function TimelineActs({ items }) {
  const activities = getFormattedData(items);
  const dates = Object.keys(activities);
  return (
    <div className="time-line-ctnr">
      {dates.map(d => (
        <ul className="time-line" key={d}>
          {activities[d].map(({ time, text, key }) => (
            <Fragment>
              <li className="time-label">
                <span>{time}</span>
              </li>
              <TimelineItemActs time={time} text={text} key={key} />
            </Fragment>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default TimelineActs;
