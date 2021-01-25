import React from "react";

import { Row, Col, Card } from "antd";

import "./Kanban2.css";

const PipeView = props => {
  return (
    <div className="PipeView2">
      <div className="drag-container2">
        <Row>
          {props.filteredStages !== null &&
          props.filteredStages !== undefined &&
          props.filteredStages.length > 0
            ? props.filteredStages
                .sort((a, b) => a.order - b.order)
                .map((stage, key) => {
                  return (
                    <Col
                      key={stage.id}
                      order={stage.order}
                      span={parseInt(24 / props.filteredStages.length)}
                      className="pipeCol"
                    >
                      <div
                        className="droppable2"
                        key={stage.id}
                        onDragOver={event => props.onDragOver(event)}
                        onDrop={event => {
                          props.onDrop(event, stage.id);
                        }}
                      >
                        <Card
                          hoverable
                          className="dropCard"
                          style={
                            key === props.filteredStages.length - 1
                              ? {
                                  borderTop: `2px solid ${
                                    props.topColors[props.topColors.length - 1]
                                  }`,
                                  cursor: "default"
                                }
                              : {
                                  borderTop: `2px solid ${props.topColors[key]}`,
                                  cursor: "default"
                                }
                          }
                        >
                          <Row>
                            <Col span={24}>
                              <span className="group-header2" key={stage.id}>
                                {stage.stageName}
                              </span>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <span
                                className="dealLength2"
                                key={stage.stageName}
                              >
                                {props.currentPipeDeals &&
                                  props.currentPipeDeals.length > 0 &&
                                  props.currentPipeDeals.find(
                                    deal => deal.stageId === stage.id
                                  ) &&
                                  props.currentPipeDeals.filter(
                                    deal => deal.stageId === stage.id
                                  ).length}{" "}
                                Deals
                              </span>
                            </Col>

                            <Col span={12}>
                              <span className="dealValue2" key={stage.pipeId}>
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
                        </Card>
                        {props.dealsInDND
                          ? props.dealsInDND.map((deal, index) => {
                              if (stage.id === index) {
                                return props.dealsInDND[index];
                              } else {
                                return null;
                              }
                            })
                          : null}
                      </div>
                    </Col>
                  );
                })
            : null}
        </Row>
      </div>
    </div>
  );
};

export default PipeView;
