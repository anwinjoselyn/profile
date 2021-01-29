import React from "react";

import { Row, Col, Drawer, Button, Input, Select, Form } from "antd";

import { Editor } from "react-draft-wysiwyg";

//import axios from "axios";

import "../../Playbook.css";

const { Option } = Select;
const { TextArea } = Input;

const EditTemplate = props => {
  const validateForm = () => {
    return (
      props.selectedPlaybook.record.tenantId &&
      !isNaN(props.selectedPlaybook.record.tenantId) &&
      props.selectedPlaybook.record.userId &&
      !isNaN(props.selectedPlaybook.record.userId) &&
      props.selectedPlaybook.record.owner.createdBy &&
      !isNaN(props.selectedPlaybook.record.owner.createdBy) &&
      props.selectedPlaybook.record.owner.lastUpdatedBy &&
      !isNaN(props.selectedPlaybook.record.owner.lastUpdatedBy) &&
      props.selectedPlaybook.record.details.name &&
      props.selectedPlaybook.record.details.name !== "" &&
      props.selectedPlaybook.record.details.type &&
      props.selectedPlaybook.record.details.type !== "" &&
      props.selectedPlaybook.record.details.description &&
      props.selectedPlaybook.record.details.description !== "" &&
      props.selectedPlaybook.record.eTemplateData.categoryId &&
      !isNaN(props.selectedPlaybook.record.eTemplateData.categoryId) &&
      props.selectedPlaybook.record.eTemplateData.templateName &&
      props.selectedPlaybook.record.eTemplateData.templateName !== "" &&
      props.selectedPlaybook.record.eTemplateData.templateDesc &&
      props.selectedPlaybook.record.eTemplateData.templateDesc !== "" &&
      props.selectedPlaybook.record.eTemplateData.eSubjects &&
      props.selectedPlaybook.record.eTemplateData.eSubjects.length > 0 &&
      props.selectedPlaybook.record.eTemplateData.eBody &&
      props.selectedPlaybook.record.eTemplateData.isActive
    );
  };

  return (
    <Drawer
      title="Edit Email Template"
      width={"50vw"}
      closable={true}
      onClose={() => {
        props.setSelectedPlaybook({
          ...props.selectedPlaybook,
          edit: false
        });
      }}
      visible={props.selectedPlaybook.edit}
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
              onClick={e => props.submitEditPlaybook(e)}
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
        initialValues={props.selectedPlaybook.record}
      >
        <Row>
          <Col span={12}>
            <Form.Item label="Template Name">
              <Input
                allowClear
                bordered={false}
                value={props.selectedPlaybook.record.details.name}
                onChange={event =>
                  props.setSelectedPlaybook({
                    ...props.selectedPlaybook,
                    record: {
                      ...props.selectedPlaybook.record,
                      details: {
                        ...props.selectedPlaybook.record.details,
                        name: event.target.value
                      },
                      eTemplateData: {
                        ...props.selectedPlaybook.record.eTemplateData,
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
                value={props.selectedPlaybook.record.details.description}
                onChange={event =>
                  props.setSelectedPlaybook({
                    ...props.selectedPlaybook,
                    record: {
                      ...props.selectedPlaybook.record,
                      details: {
                        ...props.selectedPlaybook.record.details,
                        description: event.target.value
                      },
                      eTemplateData: {
                        ...props.selectedPlaybook.record.eTemplateData,
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
              props.setSelectedPlaybook({
                ...props.selectedPlaybook,
                record: {
                  ...props.selectedPlaybook.record,
                  eTemplateData: {
                    ...props.selectedPlaybook.record.eTemplateData,
                    categoryId: value
                  }
                }
              })
            }
            value={props.selectedPlaybook.record.eTemplateData.categoryId}
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
          {props.selectedPlaybook.record.eTemplateData.eSubjects.map(
            (sub, index) => (
              <Row key={index}>
                <Col span={22}>
                  <Input
                    allowClear
                    bordered={false}
                    value={sub}
                    onChange={event => {
                      let eTemplateData =
                        props.selectedPlaybook.record.eTemplateData;
                      eTemplateData.eSubjects[index] = event.target.value;

                      props.setSelectedPlaybook({
                        ...props.selectedPlaybook,
                        record: {
                          ...props.selectedPlaybook.record,
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
                        props.selectedPlaybook.record.eTemplateData;

                      eTemplateData.eSubjects.splice(index, 1);

                      props.setSelectedPlaybook({
                        ...props.selectedPlaybook,
                        record: {
                          ...props.selectedPlaybook.record,
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
                let eTemplateData = props.selectedPlaybook.record.eTemplateData;
                eTemplateData.eSubjects.push("");

                props.setSelectedPlaybook({
                  ...props.selectedPlaybook,
                  record: {
                    ...props.selectedPlaybook.record,
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
        {props.selectedPlaybook.record.eTemplateData.attachments.length > 0 && (
          <Form.Item label="Attachments">
            {props.selectedPlaybook.record.eTemplateData.attachments.map(
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
                            props.selectedPlaybook.record.eTemplateData;
                          eTemplateData.attachments[index].fileName =
                            event.target.value;

                          props.setSelectedPlaybook({
                            ...props.selectedPlaybook,
                            record: {
                              ...props.selectedPlaybook.record,
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
                            props.selectedPlaybook.record.eTemplateData;
                          eTemplateData.attachments[index].fileURL =
                            event.target.value;

                          props.setSelectedPlaybook({
                            ...props.selectedPlaybook,
                            record: {
                              ...props.selectedPlaybook.record,
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
                            props.selectedPlaybook.record.eTemplateData;

                          eTemplateData.attachments.splice(index, 1);

                          props.setSelectedPlaybook({
                            ...props.selectedPlaybook,
                            record: {
                              ...props.selectedPlaybook.record,
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
                            props.selectedPlaybook.record.eTemplateData;
                          eTemplateData.attachments[index].fileDesc =
                            event.target.value;

                          props.setSelectedPlaybook({
                            ...props.selectedPlaybook,
                            record: {
                              ...props.selectedPlaybook.record,
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
            {props.selectedPlaybook.record.eTemplateData.attachments.length > 0
              ? "Add another Attachment "
              : "Add attachment "}
            <i
              className="far fa-plus-square brightGreen"
              style={{
                cursor: "pointer"
              }}
              onClick={() => {
                let eTemplateData = props.selectedPlaybook.record.eTemplateData;
                eTemplateData.attachments.push({
                  fileName: "",
                  fileURL: "",
                  fileDesc: "",
                  fileType: "",
                  fileSize: ""
                });

                props.setSelectedPlaybook({
                  ...props.selectedPlaybook,
                  record: {
                    ...props.selectedPlaybook.record,
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

export default EditTemplate;
