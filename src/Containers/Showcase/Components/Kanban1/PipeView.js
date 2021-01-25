import React from "react";

import {
  //Form,
  Row,
  Col,
  //Navbar,
  // Nav,
  Container,
  //Modal,
  //DropdownButton,
  //Dropdown,
  //Button
  //Table,
  //Pagination
  Card
  //Modal,
  //InputGroup
} from "react-bootstrap";

//import axios from "axios";

//import { format, parseISO, isValid } from "date-fns";

//import LoaderButton from "../../../../utils/LoaderButton";

import "./Kanban1.css";

const PipeView = props => {
  console.log("stagesLength", props.stagesLength);

  return (
    <div className="drag-container">
      <Row>
        {props.filtered !== null &&
        props.filtered !== undefined &&
        props.filtered
          ? props.filtered
              .sort((a, b) => a.order - b.order)
              .map(stage => {
                return (
                  <Col key={stage.id} order={stage.order}>
                    <div
                      className="droppable"
                      style={{ width: 100 / props.stagesLength + "%" }}
                      xs={100 / props.stagesLength}
                      key={stage.id}
                      onDragOver={event => props.onDragOver(event)}
                      onDrop={event => {
                        props.onDrop(event, stage.id);
                      }}
                    >
                      <Card>
                        <Container fluid>
                          <Row>
                            <Col>
                              <span className="group-header" key={stage.id}>
                                {stage.stageName}
                              </span>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <span
                                className="dealLength"
                                key={stage.stageName}
                              >
                                {props.filteredDeals &&
                                  props.filteredDeals.length > 0 &&
                                  props.filteredDeals.find(
                                    deal => deal.stageId === stage.id
                                  ) &&
                                  props.filteredDeals.filter(
                                    deal => deal.stageId === stage.id
                                  ).length}{" "}
                                Deals
                              </span>
                            </Col>

                            <Col>
                              <span className="dealValue" key={stage.pipeId}>
                                ${" "}
                                {props.total[stage.id] !== undefined &&
                                !isNaN(props.total[stage.id])
                                  ? parseInt(
                                      props.total[stage.id]
                                    ).toLocaleString()
                                  : 0}
                              </span>
                            </Col>
                          </Row>
                        </Container>
                      </Card>
                      {props.pipeDeals
                        ? props.pipeDeals.map((deal, index) => {
                            if (stage.id === index) {
                              return props.pipeDeals[index];
                            } else {
                              return null;
                            }
                          })
                        : null}
                    </div>
                  </Col>
                );
              })
          : "Data not calculated...Yet!"}
      </Row>
    </div>
  );
};

export default PipeView;
