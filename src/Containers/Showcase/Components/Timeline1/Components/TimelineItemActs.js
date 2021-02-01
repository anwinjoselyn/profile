import React from "react";
//import PropTypes from "prop-types";

/**
 * @usage
 * <TimlineItem time={time} text={text} />
 */
function TimelineItemActs({ time, text }) {
  return (
    <li>
      <i className="fa" />
      <div className="time-line-item">
        <div className="time-line-header">{text}</div>
      </div>
    </li>
  );
}

export default TimelineItemActs;
