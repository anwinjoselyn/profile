import React from "react";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
//import PropTypes from "prop-types";

/**
 * @usage
 * <TimlineItem time={time} text={text} />
 */
function TimelineItem({
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
  contactId,
  orgId
}) {
  return type === "Origin" ? (
    <li>
      <i className={"fa " + icon} />
      <div className="time-line-item">
        <Card className="time-line-header">
          <Card.Body>
            <span className="time">
              <i className="far fa-clock" />
              {"  "}
              {dateFormat}
              {" | "}
              {time}
            </span>
            <span>
              <strong>{text}</strong>
            </span>
          </Card.Body>
        </Card>
      </div>
    </li>
  ) : type === "Note" || type === "Mail" ? (
    <li>
      <i className={"fa " + icon} />
      <div className="time-line-item">
        <Card
          bg="dark"
          className="time-line-header"
          style={{ display: "block" }}
        >
          <Card.Header>
            {!done ? (
              <i className="far fa-circle"> {type}</i>
            ) : (
              <i className="far fa-check-circle"> {type}</i>
            )}
            <span className="topHeaderSpan">
              <strong>{text}</strong>
            </span>
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip id="timelineTooltip">{notes}</Tooltip>}
            >
              <i className="fas fa-chevron-down" style={{ float: "right" }} />
            </OverlayTrigger>
            <span className="time">
              <i className="far fa-clock" />
              {"  "}
              {dateFormat}
              {" | "}
              {time}
            </span>
          </Card.Header>
          <Card.Body className="" style={{ maxHeight: "250px" }}>
            <span className="notesSpan">{notes}</span>

            <br />
            <br />
            {contactId !== null &&
            contactId !== undefined &&
            !isNaN(contactId) ? (
              <>
                <i className="fas fa-user" />{" "}
                <a
                  className="contactSpan"
                  href={`/people/details/${contactId}`}
                >
                  {" "}
                  {contact}
                </a>
              </>
            ) : (
              <span className="contactSpan">{contact}</span>
            )}
            {"     |    "}
            {orgId !== null && orgId !== undefined && !isNaN(orgId) ? (
              <>
                <i className="fas fa-building" />{" "}
                <a className="contactSpan" href={`/orgs/details/${orgId}`}>
                  {" "}
                  {org}
                </a>
              </>
            ) : (
              <span className="contactSpan">{org}</span>
            )}
          </Card.Body>
        </Card>
      </div>
    </li>
  ) : (
    <li>
      <i className={"fa " + icon} />
      <div className="time-line-item">
        <Card bg="dark" className="time-line-header">
          <Card.Header className="HoverThing">
            {!done ? (
              <i
                className="far fa-circle"
                onClick={() => (baseUrl !== null ? baseUrl(id) : null)}
              >
                {" "}
                {type}{" "}
              </i>
            ) : (
              <i
                className="far fa-check-circle"
                onClick={() => (baseUrl !== null ? baseUrl(id) : null)}
              >
                {" "}
                {type}{" "}
              </i>
            )}
            <span className="topHeaderSpan">
              <strong>{text}</strong>
            </span>
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip id="timelineTooltip">{notes}</Tooltip>}
            >
              <i className="fas fa-chevron-down" style={{ float: "right" }} />
            </OverlayTrigger>
            <span className="time">
              <i className="far fa-clock" />
              {"  "}
              {dateFormat}
              {" | "}
              {time}
            </span>
          </Card.Header>
          <Card.Body>
            <span className="notesSpan">{notes}</span>
            <br />
            <br />
            {contactId !== null &&
            contactId !== undefined &&
            !isNaN(contactId) ? (
              <>
                <i className="fas fa-user" />{" "}
                <a
                  className="contactSpan"
                  href={`/people/details/${contactId}`}
                >
                  {" "}
                  {contact}
                </a>
              </>
            ) : (
              <span className="contactSpan">{contact}</span>
            )}
            {"     |    "}
            {orgId !== null && orgId !== undefined && !isNaN(orgId) ? (
              <>
                <i className="fas fa-building" />{" "}
                <a className="contactSpan" href={`/orgs/details/${orgId}`}>
                  {" "}
                  {org}
                </a>
              </>
            ) : (
              <span className="contactSpan">{org}</span>
            )}
          </Card.Body>
        </Card>
      </div>
    </li>
  );
}

/*
TimlineItem.defaultProps = {};

TimlineItem.propTypes = {
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
*/

export default TimelineItem;
