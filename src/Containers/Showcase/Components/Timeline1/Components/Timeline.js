//import moment from "moment";
import React from "react";
import { format } from "date-fns";
//import PropTypes from "prop-types";
import TimelineItem from "./TimelineItem";

import "./style.scss";
import "./Timeline.css";

/**
 * Converts array of events in to object having date as the key and list of
 * event for that date as the value
 *
 * @param {Array} items Array of events in the form of ts and text
 * @returns {Object} return object with key as date and values array in events for that date
 */
function getFormattedData(items) {
  const activities = {};
  items.forEach(
    (
      {
        ts,
        time,
        text,
        id,
        baseUrl,
        type,
        icon,
        notes,
        contact,
        org,
        done,
        contactId,
        orgId
      },
      index
    ) => {
      const date = new Date(ts);
      const dateStr = format(date, "dd/MM/yyyy");
      const dateFormat = format(date, "dd/MMM/yy");
      const list = activities[dateStr] || [];
      list.push({
        dateFormat,
        time,
        text,
        key: index,
        id,
        baseUrl,
        type,
        icon,
        notes,
        contact,
        org,
        done,
        contactId,
        orgId
      });
      activities[dateStr] = list;
    }
  );
  console.log("activities", activities);
  return activities;
}

function Timeline({ items }) {
  const activities = getFormattedData(items);
  const dates = Object.keys(activities);
  return (
    <div className="time-line-ctnr">
      {dates.map(d => (
        <ul className="time-line" key={d}>
          {activities[d].map(
            ({
              dateFormat,
              time,
              text,
              id,
              baseUrl,
              type,
              icon,
              notes,
              contact,
              org,
              done,
              key,
              contactId,
              orgId
            }) => (
              <TimelineItem
                time={time}
                text={text}
                key={key}
                id={id}
                baseUrl={baseUrl}
                type={type}
                icon={icon}
                contact={contact}
                org={org}
                notes={notes}
                done={done}
                dateFormat={dateFormat}
                contactId={contactId}
                orgId={orgId}
              />
            )
          )}
        </ul>
      ))}
    </div>
  );
}

/*
Timeline.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      ts: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired
};
*/

export default Timeline;
