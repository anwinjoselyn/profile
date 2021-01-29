import React from "react";

import { Row, Col, Drawer, Button, Input, Select, Form } from "antd";

import { Editor } from "react-draft-wysiwyg";

//import axios from "axios";

import "../../Playbook.css";

const { Option } = Select;
const { TextArea } = Input;

const CreateTemplate = props => {
  const validateForm = () => {
    return (
      props.newPlaybook.record.tenantId &&
      !isNaN(props.newPlaybook.record.tenantId) &&
      props.newPlaybook.record.userId &&
      !isNaN(props.newPlaybook.record.userId) &&
      props.newPlaybook.record.owner.createdBy &&
      !isNaN(props.newPlaybook.record.owner.createdBy) &&
      props.newPlaybook.record.owner.lastUpdatedBy &&
      !isNaN(props.newPlaybook.record.owner.lastUpdatedBy) &&
      props.newPlaybook.record.details.name &&
      props.newPlaybook.record.details.name !== "" &&
      props.newPlaybook.record.details.type &&
      props.newPlaybook.record.details.type !== "" &&
      props.newPlaybook.record.details.description &&
      props.newPlaybook.record.details.description !== "" &&
      props.newPlaybook.record.eTemplateData.categoryId &&
      !isNaN(props.newPlaybook.record.eTemplateData.categoryId) &&
      props.newPlaybook.record.eTemplateData.templateName &&
      props.newPlaybook.record.eTemplateData.templateName !== "" &&
      props.newPlaybook.record.eTemplateData.templateDesc &&
      props.newPlaybook.record.eTemplateData.templateDesc !== "" &&
      props.newPlaybook.record.eTemplateData.eSubjects &&
      props.newPlaybook.record.eTemplateData.eSubjects.length > 0 &&
      props.newPlaybook.record.eTemplateData.eBody &&
      props.newPlaybook.record.eTemplateData.isActive
    );
  };

  return (
    <Drawer
      title="Create New Email Template"
      width={"50vw"}
      closable={true}
      onClose={() => {
        props.setNewPlaybook({
          ...props.newPlaybook,
          flag: false,
          type: "none",
          record: {}
        });
      }}
      visible={props.newPlaybook.flag}
      className="CreateTemplate"
      footer={
        <Row>
          <Col
            span={24}
            style={{
              display: "block",
              textAlign: "center"
            }}
          >
            <Button
              type="default"
              size="small"
              disabled={!validateForm()}
              onClick={e => props.submitNewPlaybook(e)}
            >
              Save Email Template
            </Button>
          </Col>
        </Row>
      }
    >
      <Form
        layout="vertical"
        size="default"
        initialValues={props.newPlaybook.record}
      >
        <Row>
          <Col span={12}>
            <Form.Item label="Template Name">
              <Input
                allowClear
                bordered={false}
                value={props.newPlaybook.record.details.name}
                onChange={event =>
                  props.setNewPlaybook({
                    ...props.newPlaybook,
                    record: {
                      ...props.newPlaybook.record,
                      details: {
                        ...props.newPlaybook.record.details,
                        name: event.target.value
                      },
                      eTemplateData: {
                        ...props.newPlaybook.record.eTemplateData,
                        templateName: event.target.value
                      }
                    }
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Template Description">
              <TextArea
                allowClear
                autoSize={{ minRows: 1, maxRows: 2 }}
                value={props.newPlaybook.record.details.description}
                onChange={event =>
                  props.setNewPlaybook({
                    ...props.newPlaybook,
                    record: {
                      ...props.newPlaybook.record,
                      details: {
                        ...props.newPlaybook.record.details,
                        description: event.target.value
                      },
                      eTemplateData: {
                        ...props.newPlaybook.record.eTemplateData,
                        templateDesc: event.target.value
                      }
                    }
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Category (Type)">
          <Select
            placeholder="Select a Category"
            optionFilterProp="children"
            onChange={value =>
              props.setNewPlaybook({
                ...props.newPlaybook,
                record: {
                  ...props.newPlaybook.record,
                  eTemplateData: {
                    ...props.newPlaybook.record.eTemplateData,
                    categoryId: value
                  }
                }
              })
            }
            value={props.newPlaybook.record.eTemplateData.categoryId}
            bordered={false}
          >
            {props.commonData && props.commonData.categories
              ? props.commonData.categories.data.map(c => (
                  <Option key={c.id} value={c.id}>
                    {c.name} <small>({c.description})</small>
                  </Option>
                ))
              : "Unable to retrieve data"}
          </Select>
        </Form.Item>
        <Form.Item label="Subject Line">
          {props.newPlaybook.record.eTemplateData.eSubjects.map(
            (sub, index) => (
              <Row key={index}>
                <Col span={22}>
                  <Input
                    allowClear
                    bordered={false}
                    value={sub}
                    onChange={event => {
                      let eTemplateData =
                        props.newPlaybook.record.eTemplateData;
                      eTemplateData.eSubjects[index] = event.target.value;

                      props.setNewPlaybook({
                        ...props.newPlaybook,
                        record: {
                          ...props.newPlaybook.record,
                          eTemplateData: eTemplateData
                        }
                      });
                    }}
                  />
                </Col>
                <Col span={2}>
                  <i
                    className="far fa-minus-square orange"
                    style={{
                      cursor: "pointer",
                      display: "block",
                      textAlign: "center",
                      fontSize: "12px",
                      marginTop: "0.7em"
                    }}
                    onClick={() => {
                      let eTemplateData =
                        props.newPlaybook.record.eTemplateData;

                      eTemplateData.eSubjects.splice(index, 1);

                      props.setNewPlaybook({
                        ...props.newPlaybook,
                        record: {
                          ...props.newPlaybook.record,
                          eTemplateData: eTemplateData
                        }
                      });
                    }}
                  />
                </Col>
              </Row>
            )
          )}
        </Form.Item>
        <br />
        <Row>
          <Col
            span={24}
            style={{
              display: "block",
              textAlign: "center",
              fontSize: "12px"
            }}
          >
            Add another Subject Line{" "}
            <i
              className="far fa-plus-square brightGreen"
              style={{
                cursor: "pointer"
              }}
              onClick={() => {
                let eTemplateData = props.newPlaybook.record.eTemplateData;
                eTemplateData.eSubjects.push("");

                props.setNewPlaybook({
                  ...props.newPlaybook,
                  record: {
                    ...props.newPlaybook.record,
                    eTemplateData: eTemplateData
                  }
                });
              }}
            />
          </Col>
        </Row>
        <br />
        <br />

        <Row>
          <Col span={24}>
            <Editor
              toolbar={props.toolbarOptions}
              editorState={props.editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={props.onEditorStateChange}
            />
          </Col>
        </Row>
        <br />
        {props.newPlaybook.record.eTemplateData.attachments.length > 0 && (
          <Form.Item label="Attachments">
            {props.newPlaybook.record.eTemplateData.attachments.map(
              (sub, index) => (
                <div key={index}>
                  <Row>
                    <Col span={11}>
                      <Input
                        allowClear
                        bordered={false}
                        placeholder="Attachment File name"
                        value={sub.fileName}
                        onChange={event => {
                          let eTemplateData =
                            props.newPlaybook.record.eTemplateData;
                          eTemplateData.attachments[index].fileName =
                            event.target.value;

                          props.setNewPlaybook({
                            ...props.newPlaybook,
                            record: {
                              ...props.newPlaybook.record,
                              eTemplateData: eTemplateData
                            }
                          });
                        }}
                      />
                    </Col>
                    <Col span={11}>
                      <Input
                        allowClear
                        bordered={false}
                        placeholder="URL where file can be found (optional)"
                        value={sub.fileURL}
                        onChange={event => {
                          let eTemplateData =
                            props.newPlaybook.record.eTemplateData;
                          eTemplateData.attachments[index].fileURL =
                            event.target.value;

                          props.setNewPlaybook({
                            ...props.newPlaybook,
                            record: {
                              ...props.newPlaybook.record,
                              eTemplateData: eTemplateData
                            }
                          });
                        }}
                      />
                    </Col>
                    <Col span={2}>
                      <i
                        className="far fa-minus-square orange"
                        style={{
                          cursor: "pointer",
                          display: "block",
                          textAlign: "center",
                          fontSize: "12px",
                          marginTop: "0.7em"
                        }}
                        onClick={() => {
                          let eTemplateData =
                            props.newPlaybook.record.eTemplateData;

                          eTemplateData.attachments.splice(index, 1);

                          props.setNewPlaybook({
                            ...props.newPlaybook,
                            record: {
                              ...props.newPlaybook.record,
                              eTemplateData: eTemplateData
                            }
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <TextArea
                        allowClear
                        bordered={false}
                        placeholder="Description of attachment"
                        value={sub.fileDesc}
                        onChange={event => {
                          let eTemplateData =
                            props.newPlaybook.record.eTemplateData;
                          eTemplateData.attachments[index].fileDesc =
                            event.target.value;

                          props.setNewPlaybook({
                            ...props.newPlaybook,
                            record: {
                              ...props.newPlaybook.record,
                              eTemplateData: eTemplateData
                            }
                          });
                        }}
                      />
                    </Col>
                  </Row>
                </div>
              )
            )}
          </Form.Item>
        )}
        <br />
        <Row>
          <Col
            span={24}
            style={{
              display: "block",
              textAlign: "center",
              fontSize: "12px"
            }}
          >
            {props.newPlaybook.record.eTemplateData.attachments.length > 0
              ? "Add another Attachment "
              : "Add attachment "}
            <i
              className="far fa-plus-square brightGreen"
              style={{
                cursor: "pointer"
              }}
              onClick={() => {
                let eTemplateData = props.newPlaybook.record.eTemplateData;
                eTemplateData.attachments.push({
                  fileName: "",
                  fileURL: "",
                  fileDesc: "",
                  fileType: "",
                  fileSize: ""
                });

                props.setNewPlaybook({
                  ...props.newPlaybook,
                  record: {
                    ...props.newPlaybook.record,
                    eTemplateData: eTemplateData
                  }
                });
              }}
            />
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default CreateTemplate;
