import React from "react";

import {
  Card,
  Button,
  //CardDeck,
  //Badge,
  // Alert,
  // Modal,
  //ButtonToolbar,
  Container,
  Row,
  Col,
  //Alert,
  Form,
  Table
} from "react-bootstrap";

//import axios from "axios";

import DealsList from "./DealsList";
import PipeView from "./PipeView";
import Explanation from "./Explanation";

import "./Kanban1.css";

const Kanban1 = props => {
  const renderNavNew = () => {
    return (
      <Container fluid>
        <Row
          style={{
            display: "inline-flex",
            width: "100%",
            marginBottom: "0.6em"
          }}
        >
          <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ width: "100%" }}>
            <Button
              variant="light"
              size="sm"
              block
              style={{ cursor: "pointer" }}
              onClick={() => props.setCounter(0)}
              className={props.counter === 0 ? "SelectedButton" : null}
            >
              Pipeline View
            </Button>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ width: "100%" }}>
            <Button
              variant="light"
              size="sm"
              block
              style={{ cursor: "pointer" }}
              onClick={() => props.setCounter(1)}
              className={props.counter === 1 ? "SelectedButton" : null}
            >
              Table View
            </Button>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ width: "100%" }}>
            <Button
              variant="light"
              size="sm"
              block
              style={{ cursor: "pointer" }}
              onClick={() => props.setCounter(2)}
              className={props.counter === 2 ? "SelectedButton" : null}
            >
              Brief Explanation
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              variant="dark"
              size="md"
              hover
              style={{
                paddingTop: "0px",
                marginBottom: "0px",
                paddingBottom: "0px",
                fontSize: "1.2em",
                color: "orange",
                border: "0px !important"
              }}
            >
              <tbody
                style={{
                  marginBottom: "0px",
                  paddingBottom: "0px",
                  border: "0px"
                }}
              >
                <tr
                  style={{
                    marginBottom: "0px",
                    paddingBottom: "0px",
                    border: "0px"
                  }}
                >
                  <td>
                    {props.filteredDeals !== undefined &&
                    props.filteredDeals !== null &&
                    props.filteredDeals.length > 0
                      ? props.filteredDeals.length.toString()
                      : 0}{" "}
                    <small style={{ color: "#dee0e0" }}>Deal(s)</small>
                  </td>
                  <td>
                    <small style={{ color: "#dee0e0" }}>Worth </small>
                    {!isNaN(props.dealsValue)
                      ? "$ " + parseInt(props.dealsValue).toLocaleString()
                      : 0}
                  </td>
                  <td>
                    <small style={{ color: "#dee0e0" }}>To Win </small>
                    {props.selectedUserId !== 0
                      ? props.userQuota
                      : props.teamQuota}
                  </td>
                  <td>
                    {props.selectedUserId !== 0
                      ? props.userAchieved
                      : props.teamAchieved}{" "}
                    <small style={{ color: "#dee0e0" }}>Achieved </small>
                  </td>
                  <td>
                    {props.selectedUserId !== 0
                      ? props.userQuota - props.userAchieved
                      : props.teamQuota - props.teamAchieved}{" "}
                    <small style={{ color: "#dee0e0" }}>Remaining</small>
                  </td>
                  <td>
                    <small style={{ color: "#dee0e0" }}>Team Achieved</small>{" "}
                    {props.teamAchieved}
                  </td>

                  <td
                    style={{
                      maxWidth: "70px",
                      marginBottom: "0px",
                      paddingBottom: "0px"
                    }}
                  >
                    <Form.Group
                      controlId="pipeId"
                      style={{
                        marginBottom: "0px",
                        paddingBottom: "0px"
                      }}
                    >
                      <Form.Control
                        as="select"
                        onChange={props.handleSelectPipe}
                        value={props.pipeId}
                        size="sm"
                      >
                        {props.pipelines
                          ? props.pipelines
                              .filter(
                                pipe =>
                                  pipe.teamId === 1 ||
                                  pipe.teamId === 2 ||
                                  pipe.teamId === 3
                              )
                              .map(pipe => (
                                <option
                                  value={pipe.id}
                                  id={pipe.id}
                                  key={pipe.id}
                                >
                                  {pipe.pipeName}
                                </option>
                              ))
                          : null}
                      </Form.Control>
                    </Form.Group>
                  </td>
                  <td
                    style={{
                      maxWidth: "70px",
                      marginBottom: "0px",
                      paddingBottom: "0px"
                    }}
                  >
                    <Form.Group
                      controlId="selectedUserId"
                      style={{
                        marginBottom: "0px",
                        paddingBottom: "0px"
                      }}
                    >
                      <Form.Control
                        as="select"
                        onChange={props.handleSelectUser}
                        value={props.selectedUserId}
                        size="sm"
                      >
                        {props.usersByTeam.length > 0
                          ? props.usersByTeam[props.teamId].map(user => (
                              <option
                                value={user.id}
                                id={user.id}
                                key={user.id}
                              >
                                {user.nickName ? user.nickName : user.userName}
                              </option>
                            ))
                          : null}
                        <option value={0} id={0} key={0}>
                          All Users
                        </option>
                        <option value={-1} id={-1} key={-1}>
                          All Reps
                        </option>
                      </Form.Control>
                    </Form.Group>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Container fluid className="Kanban1">
      <Row style={{ margin: "0px", padding: "0px" }}>
        <Col
          xs={12}
          md={12}
          lg={12}
          sm={12}
          xl={12}
          style={{ margin: "0px", padding: "0px" }}
        >
          <Card style={{ border: "0px" }}>
            <Card.Header
              style={{
                margin: "0px",
                padding: "0px",
                border: "0px"
              }}
            >
              {renderNavNew()}
            </Card.Header>

            <Card.Body style={{ margin: "0px", padding: "0px" }}>
              {props.counter === 0 ? (
                <PipeView
                  filtered={props.filtered}
                  stagesLength={props.filtered.length}
                  onDragOver={props.onDragOver}
                  onDrop={props.onDrop}
                  filteredDeals={props.filteredDeals}
                  total={props.total}
                  pipeDeals={props.pipeDeals}
                />
              ) : props.counter === 1 ? (
                <DealsList
                  roleId={1}
                  filteredDeals={props.filteredDeals}
                  stages={props.stages}
                  orgs={props.orgs}
                  people={props.contacts}
                  tenantId={1}
                  tenant={props.tenant}
                  currency={"USD"}
                  dealStatuses={props.common.dealStatuses}
                  users={props.users}
                  userId={props.selectedUserId}
                  allTenantActs={props.activities}
                  currentPage={1}
                  perPage={10}
                  lastPage={Math.ceil(props.filteredDeals.length / 10)}
                  updateFunction={props.updateGeneralBulk}
                  pipelines={props.pipelines}
                  reasons={props.common.reasons}
                  common={props.common}
                />
              ) : props.counter === 2 ? (
                <Explanation />
              ) : (
                "Retrieving all your current deals..."
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Kanban1;
