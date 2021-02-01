import React from "react";

import { Card, Row, Col, Tooltip, Popconfirm, Space } from "antd";
import { format, parseISO } from "date-fns";

//import axios from "axios";
import { Editor } from "react-draft-wysiwyg";

import "../Template.css";

const { Meta } = Card;

const TemplateView = props => {
  //console.log("props.users", props.users);
  return (
    <Card className="TemplateView" bordered={false}>
      <Row>
        <Col span={6}>
          <Card
            hoverable
            bordered={false}
            cover={
              <i
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  opacity: "0.8",
                  fontSize: "5em",
                  paddingTop: "0.5em"
                }}
                className="far fa-envelope red"
              />
            }
            style={{ cursor: "default" }}
          >
            <Meta
              title={
                <div
                  style={{
                    opacity: "0.8",
                    display: "block",
                    textAlign: "center",
                    padding: "1em"
                  }}
                >
                  <div style={{ float: "left" }}>
                    <i className="far fa-thumbs-up brightGreen opaqueIcon">
                      {" "}
                      {props.record.eTemplateData.upVotes}
                    </i>
                  </div>
                  <div style={{ float: "right" }}>
                    <i className="far fa-thumbs-down red opaqueIcon">
                      {" "}
                      {props.record.eTemplateData.downVotes}
                    </i>
                  </div>
                </div>
              }
            />
            <Row
              style={{
                marginBottom: "1em",
                marginTop: "4em",
                marginLeft: "1em"
              }}
            >
              <Col span={10} style={{ textAlign: "left" }}>
                Category
              </Col>
              <Col span={14} style={{ textAlign: "left" }}>
                {props.categories &&
                props.record.eTemplateData.categoryId &&
                props.categories.find(
                  c => c.id === props.record.eTemplateData.categoryId
                ) ? (
                  <div>
                    {
                      props.categories.filter(
                        c => c.id === props.record.eTemplateData.categoryId
                      )[0].categoryName
                    }{" "}
                    <Tooltip
                      placement="topRight"
                      title={
                        props.categories.filter(
                          c => c.id === props.record.eTemplateData.categoryId
                        )[0].categoryDesc
                      }
                    >
                      <i className="far fa-question-circle opaqueIcon" />
                    </Tooltip>
                  </div>
                ) : (
                  "---"
                )}
              </Col>
            </Row>
            <Row style={{ marginBottom: "1em", marginLeft: "1em" }}>
              <Col span={10} style={{ textAlign: "left" }}>
                Created By
              </Col>
              <Col span={14} style={{ textAlign: "left" }}>
                {props.users &&
                props.record.owner &&
                props.record.owner.createdBy &&
                props.users.find(
                  u => u.id === parseInt(props.record.owner.createdBy)
                )
                  ? props.users.filter(
                      u => u.id === parseInt(props.record.owner.createdBy)
                    )[0].profile.fullName
                  : "---"}
              </Col>
            </Row>
            <Row style={{ marginBottom: "1em", marginLeft: "1em" }}>
              <Col span={10} style={{ textAlign: "left" }}>
                Updated By
              </Col>
              <Col span={14} style={{ textAlign: "left" }}>
                {props.users &&
                props.record.owner &&
                props.record.owner.lastUpdatedBy &&
                props.users.find(
                  u => u.id === parseInt(props.record.owner.lastUpdatedBy)
                )
                  ? props.users.filter(
                      u => u.id === parseInt(props.record.owner.lastUpdatedBy)
                    )[0].profile.fullName
                  : "---"}
              </Col>
            </Row>
            <Row style={{ marginBottom: "1em", marginLeft: "1em" }}>
              <Col span={10} style={{ textAlign: "left" }}>
                Created On
              </Col>
              <Col span={14} style={{ textAlign: "left" }}>
                {props.record && props.record.createdAt
                  ? format(parseISO(props.record.createdAt), "dd MMM yyyy")
                  : "---"}
              </Col>
            </Row>
            <Row
              style={{
                marginLeft: "1em"
              }}
            >
              <Col span={10} style={{ textAlign: "left" }}>
                Updated On
              </Col>
              <Col span={14} style={{ textAlign: "left" }}>
                {props.record && props.record.updatedAt
                  ? format(parseISO(props.record.updatedAt), "dd MMM yyyy")
                  : "---"}
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={18}>
          <Card
            hoverable
            title={
              <div>
                {props.record.eTemplateData.templateName} -
                <small style={{ opacity: "0.6" }}>
                  ({props.record.eTemplateData.templateDesc})
                </small>
                <div style={{ float: "right" }}>
                  <Space>
                    <i
                      className="far fa-edit opaqueIcon orange"
                      style={{ float: "right", cursor: "pointer" }}
                      onClick={() => {
                        props.setEditorState(
                          props.EditorState.createWithContent(
                            props.convertFromRaw(
                              JSON.parse(props.record.eTemplateData.eBody)
                            )
                          )
                        );

                        props.setSelectedPlaybook({
                          ...props.selectedPlaybook,
                          edit: true
                        });
                      }}
                    />
                    <Popconfirm
                      title="Are you sure you want to delete this Script?"
                      onConfirm={props.submitDeletePlaybook}
                      okText="Definitely, Yes"
                      cancelText="Oops...No"
                      cancelButtonProps={{ type: "default", size: "small" }}
                      okButtonProps={{ type: "default", size: "small" }}
                    >
                      <i
                        className="far fa-trash-alt opaqueIcon red"
                        style={{ float: "right", cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </Space>
                </div>
              </div>
            }
            bordered={false}
            style={{ cursor: "default" }}
          >
            <Editor
              toolbarHidden={true}
              toolbar={props.toolbarOptions}
              editorState={props.editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={props.onEditorStateChange}
              readOnly={true}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default TemplateView;
