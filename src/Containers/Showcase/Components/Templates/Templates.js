import React, { useState, useEffect } from "react";

import {
  Card,
  Row,
  Col,
  Layout,
  Space,
  Spin,
  Table,
  Dropdown,
  Menu,
  Button,
  message
} from "antd";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

//import axios from "axios";

import CreateTemplate from "./Components/Create";
import TemplateView from "./Components/View";
import EditTemplate from "./Components/Edit";
import Explanation from "./Components/Explanation";

import "./Template.css";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const template = require("../../../../libs/playbook.json");
const toolbarOptions = require("../../../../libs/toolbarOptions.json").data;
const { isEmpty } = require("../../../../libs/validators");
const tenantData = require("../../../../libs/tenantData.json");
const token = require("../../../../libs/token.json");

const { Content } = Layout;

const Template = props => {
  const [loading, setLoading] = useState(true);
  /*  const [rightMenu, setRightMenu] = useState({
    show: false,
    data: "stats"
  });*/
  const [minorTab, setMinor] = useState("templates");
  const [selectedRecords, setSelected] = useState({
    loading: false,
    hasSelected: false,
    selectedRowKeys: []
  });
  const [selectedPlaybook, setSelectedPlaybook] = useState({
    view: false,
    edit: false,
    type: "none",
    record: {},
    options: ["play", "script", "template", "collateral", "none"],
    viewICP: false,
    editICP: false,
    delete: false
  });
  const [playbookData, setPlaybookData] = useState(null);
  const [newPlaybook, setNewPlaybook] = useState({
    flag: false,
    type: "none",
    record: {},
    options: ["play", "script", "template", "collateral", "none"],
    isICP: false
  });
  const [localEditorState, setEditorState] = useState(
    EditorState.createEmpty()
  );

  useEffect(() => {
    async function onLoad() {
      try {
        let data = {
          allPlaybooks: props.leadsData.playbooks,
          allPlays: props.leadsData.playbooks.filter(
            pb => pb.details.type === "play"
          ),
          allScripts: props.leadsData.playbooks.filter(
            pb => pb.details.type === "script"
          ),
          allTemplates: props.leadsData.playbooks.filter(
            pb => pb.details.type === "template"
          ),
          allCollaterals: props.leadsData.playbooks.filter(
            pb => pb.details.type === "collateral"
          ),
          allICP: props.leadsData.playbooks.filter(
            pb => pb.details.type === "icp"
          )
        };

        setPlaybookData(data);
        setLoading(false);
      } catch (error) {
        //console.log("error", error);
      }
    }
    //console.log("props.leadsData", props.leadsData);
    if (props.leadsData.playbooks) onLoad();
  }, [props.leadsData]);

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };
  /*
  const saveEditorContent = data => {
    localStorage.setItem("editorData", JSON.stringify(data));
  };

  const getSavedEditorData = () => {
    const savedData = localStorage.getItem("editorData");

    return savedData ? JSON.parse(savedData) : null;
  };

  const renderContentAsRawJs = () => {
    const contentState = localEditorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    return JSON.stringify(raw, null, 2);
  };
*/
  const recalculatePlaybooks = playbooks => {
    setLoading(true);

    if (playbooks && playbooks.length > 0) {
      let data = {
        allPlaybooks: playbooks,
        allPlays: playbooks.filter(pb => pb.details.type === "play"),
        allScripts: playbooks.filter(pb => pb.details.type === "script"),
        allTemplates: playbooks.filter(pb => pb.details.type === "template"),
        allCollaterals: playbooks.filter(
          pb => pb.details.type === "collateral"
        ),
        allICP: playbooks.filter(pb => pb.details.type === "icp")
      };

      setPlaybookData(data);
    }
    setLoading(false);
  };

  const onTabChange = key => {
    //console.log("key", key);
    setMinor(key);
  };

  const onSelectChange = selectedRowKeys => {
    //console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelected({
      ...selectedRecords,
      selectedRowKeys: selectedRowKeys,
      hasSelected: selectedRowKeys.length > 0
    });
  };

  const rowSelection = {
    selectedRowKeys: selectedRecords.selectedRowKeys,
    onChange: onSelectChange
  };

  const showTotal = total => {
    return `Total ${total} items`;
  };

  const submitDeletePlaybook = async e => {
    e.preventDefault();

    //console.log("selectedPlaybook.record", selectedPlaybook.record);
    /*
    try {

      const result = await axios({
        method: "DELETE",
        url: `/${"dev"}/v3/playbooks/byid/${selectedPlaybook.record.id}`,
        headers: { Authorization: `${token.authToken}` }
      });

      console.log("result.data", result.data);

      if (
        result.data &&
        result.data !== "Tenant ID does not match resource requested"
      ) {
        let playbooks = props.leadsData.playbooks.filter(p => p.id !== result.data.id);

        recalculatePlaybooks(playbooks);
        props.setLeads({
          ...props.leadsData,
          playbooks: playbooks
        });
        message.success("Successfully deleted Script");

        setSelectedPlaybook({
          ...selectedPlaybook,
          edit: false
        });
      }
    } catch (error) {
      console.log("error", error);
    }
    */
  };

  const submitEditPlaybook = async e => {
    e.preventDefault();

    //console.log("selectedPlaybook.record", selectedPlaybook.record);

    let playbook = selectedPlaybook.record;
    playbook.owner.lastUpdatedBy = token.id;

    let dataToUpdate = {
      playbook: playbook,
      dataChanged: "scriptData"
    };

    //console.log("dataToUpdate", dataToUpdate);

    try {
      /*
      const result = await axios({
        method: "PUT",
        url: `/${"dev"}/v3/playbooks/byid/${dataToUpdate.playbook.id}`,
        headers: { Authorization: `${token.authToken}` },
        data: dataToUpdate
      });
      console.log("result.data", result.data);
*/
      if (dataToUpdate) {
        let playbooks = props.leadsData.playbooks.map(p => {
          if (p.id !== playbook.id) {
            return p;
          } else {
            return playbook;
          }
        });

        recalculatePlaybooks(playbooks);
        props.setLeads({
          ...props.leadsData,
          playbooks: playbooks
        });
        message.success("Successfully edited Script");

        setSelectedPlaybook({
          ...selectedPlaybook,
          edit: false
        });
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
  /*
  const submitNewPlaybook = async e => {
    e.preventDefault();
    //console.log("newPlaybook.record", newPlaybook.record);

    try {

      const result = await axios({
        method: "POST",
        url: `/${"dev"}/v3/playbooks/create`,
        headers: { Authorization: `${token.authToken}` },
        data: newPlaybook.record
      });
      console.log("result.data", result.data);

      if (newPlaybook.record) {
        let playbooks = props.leadsData.playbooks;
        playbooks.push(newPlaybook.record);

        recalculatePlaybooks(playbooks);
        props.setLeads({
          ...props.leadsData,
          playbooks: playbooks
        });
        message.success("Successfully created Script");

        setNewPlaybook({
          ...newPlaybook,
          flag: false,
          type: "none",
          record: {}
        });
      }
    } catch (error) {
      //console.log("error", error);
    }
  };
*/
  const submitNewPlaybookE = async e => {
    e.preventDefault();
    //console.log("newPlaybook.record", newPlaybook.record);

    let data = newPlaybook.record;
    let contentState = localEditorState.getCurrentContent();
    //console.log("contentState", contentState);
    let raw = convertToRaw(contentState);
    //console.log("raw", raw);
    let eBody = JSON.stringify(raw, null, 2);
    //console.log("eBody", eBody);
    data.eTemplateData.eBody = eBody;

    //console.log("data", data);

    try {
      /*
      const result = await axios({
        method: "POST",
        url: `/${"dev"}/v3/playbooks/create`,
        headers: { Authorization: `${token.authToken}` },
        data: newPlaybook.record
      });
      console.log("result.data", result.data);
*/
      if (data) {
        let playbooks = props.leadsData.playbooks;
        playbooks.push(data);

        recalculatePlaybooks(playbooks);
        props.setLeads({
          ...props.leadsData,
          playbooks: playbooks
        });
        message.success("Successfully created Email Template");

        setNewPlaybook({
          ...newPlaybook,
          flag: false,
          type: "none",
          record: {}
        });
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "details",
      width: "10%",
      render: details => (details && details.name ? details.name : "---")
    },
    {
      title: "Type",
      dataIndex: "details",
      render: details =>
        details && details.type ? details.type.toUpperCase() : "---"
    },
    {
      title: "Description",
      dataIndex: "details",
      width: "15%",
      render: details =>
        details && details.description ? details.description : "---"
    },
    {
      title: "Category",
      dataIndex: "details",
      render: (details, record) =>
        details.type
          ? details.type === "script"
            ? record.scriptData.categoryId &&
              props.commonData.masterCategories.find(
                c => c.id === record.scriptData.categoryId
              )
              ? props.commonData.masterCategories.filter(
                  c => c.id === record.scriptData.categoryId
                )[0].categoryName
              : "---"
            : details.type === "play"
            ? record.playData.categoryId &&
              props.commonData.masterCategories.find(
                c => c.id === record.playData.categoryId
              )
              ? props.commonData.masterCategories.filter(
                  c => c.id === record.playData.categoryId
                )[0].categoryName
              : "---"
            : details.type === "collateral"
            ? record.collateralData.categoryId &&
              props.commonData.masterCategories.find(
                c => c.id === record.collateralData.categoryId
              )
              ? props.commonData.masterCategories.filter(
                  c => c.id === record.collateralData.categoryId
                )[0].categoryName
              : "---"
            : details.type === "template"
            ? record.eTemplateData.categoryId &&
              props.commonData.masterCategories.find(
                c => c.id === record.eTemplateData.categoryId
              )
              ? props.commonData.masterCategories.filter(
                  c => c.id === record.eTemplateData.categoryId
                )[0].categoryName
              : "---"
            : "---"
          : "---"
    },
    {
      title: "Up Votes",
      dataIndex: "details",
      render: (details, record) =>
        details.type
          ? details.type === "script"
            ? record.scriptData.upVotes
              ? record.scriptData.upVotes
              : 0
            : details.type === "play"
            ? record.playData.upVotes
              ? record.playData.upVotes
              : 0
            : details.type === "collateral"
            ? record.collateralData.upVotes
              ? record.collateralData.upVotes
              : 0
            : details.type === "template"
            ? record.eTemplateData.upVotes
              ? record.eTemplateData.upVotes
              : 0
            : "---"
          : "---"
    },
    {
      title: "Down Votes",
      dataIndex: "details",
      render: (details, record) =>
        details.type
          ? details.type === "script"
            ? record.scriptData.downVotes
              ? record.scriptData.downVotes
              : 0
            : details.type === "play"
            ? record.playData.downVotes
              ? record.playData.downVotes
              : 0
            : details.type === "collateral"
            ? record.collateralData.downVotes
              ? record.collateralData.downVotes
              : 0
            : details.type === "template"
            ? record.eTemplateData.downVotes
              ? record.eTemplateData.downVotes
              : 0
            : "---"
          : "---"
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            size="small"
            type="default"
            onClick={() => {
              if (record.details.type === "template") {
                setEditorState(
                  EditorState.createWithContent(
                    convertFromRaw(JSON.parse(record.eTemplateData.eBody))
                  )
                );
              }
              setSelectedPlaybook({
                ...selectedPlaybook,
                view: true,
                record: record,
                type: record.details.type
              });

              setMinor("selected");
            }}
          >
            View
          </Button>
          <Button
            size="small"
            type="default"
            onClick={() => {
              if (record.details.type === "template") {
                setEditorState(
                  EditorState.createWithContent(
                    convertFromRaw(JSON.parse(record.eTemplateData.eBody))
                  )
                );
              }
              setSelectedPlaybook({
                ...selectedPlaybook,
                edit: true,
                record: record,
                type: record.details.type
              });
            }}
          >
            Edit
          </Button>
        </Space>
      )
    }
  ];

  const contentList = {
    about: <Explanation />,
    templates: (
      <Table
        dataSource={
          !loading &&
          playbookData &&
          playbookData.allTemplates &&
          playbookData.allTemplates.length > 0
            ? playbookData.allTemplates
            : []
        }
        rowSelection={rowSelection}
        columns={columns}
        size="small"
        pagination={{
          size: "small",
          total:
            !loading &&
            playbookData &&
            playbookData.allTemplates &&
            playbookData.allTemplates.length > 0
              ? playbookData.allTemplates.length
              : 0,
          showSizeChanger: true,
          pageSizeOptions: [10, 25, 50, 100],
          showTotal: showTotal
        }}
        rowKey="id"
        bordered={false}
        locale={{ emptyText: "No Playbooks created...yet!" }}
        scroll={{ scrollToFirstRowOnChange: true, x: 100, y: "67vh" }}
      />
    ),
    selected:
      !loading && (selectedPlaybook.view || selectedPlaybook.edit) ? (
        selectedPlaybook.type === "template" ? (
          <TemplateView
            record={selectedPlaybook.record}
            categories={props.commonData.masterCategories}
            users={tenantData.users}
            setSelectedPlaybook={setSelectedPlaybook}
            selectedPlaybook={selectedPlaybook}
            submitDeletePlaybook={submitDeletePlaybook}
            toolbar={toolbarOptions}
            editorState={localEditorState}
            onEditorStateChange={onEditorStateChange}
            convertToRaw={convertToRaw}
            isEmpty={isEmpty}
            setEditorState={setEditorState}
            convertFromRaw={convertFromRaw}
            EditorState={EditorState}
          />
        ) : null
      ) : null
  };

  const tabList = [
    {
      key: "about",
      tab: <span>About</span>
    },
    {
      key: "templates",
      tab: (
        <span>
          Templates{" "}
          <small className="superscript">
            <sup>
              (
              {!loading &&
              playbookData &&
              playbookData.allTemplates &&
              playbookData.allTemplates.length > 0
                ? playbookData.allTemplates.length
                : 0}
              )
            </sup>
          </small>
        </span>
      )
    },
    {
      key: "selected",
      tab:
        !loading &&
        selectedPlaybook.view &&
        selectedPlaybook.record &&
        selectedPlaybook.record.details ? (
          <span>{selectedPlaybook.record.details.name}</span>
        ) : null
    }
  ];

  return (
    <Layout className="PlaybookLayout">
      <Content className="Templates">
        {!loading ? (
          <Row>
            <Col span={24}>
              <Card
                bordered={false}
                style={{ width: "100%" }}
                tabList={tabList}
                activeTabKey={minorTab}
                onTabChange={key => {
                  onTabChange(key);
                }}
                className="PlaybookCard"
                tabBarExtraContent={
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item
                          key="template"
                          onClick={() => {
                            setNewPlaybook({
                              ...newPlaybook,
                              flag: true,
                              type: "template",
                              record: {
                                ...template.playbookTemplate,
                                tenantId: token.tId,
                                userId: token.id,
                                owner: {
                                  ...template.playbookTemplate.owner,
                                  createdBy: token.id,
                                  lastUpdatedBy: token.id
                                },
                                details: {
                                  ...template.playbookTemplate.details,
                                  type: "template"
                                }
                              }
                            });
                          }}
                        >
                          New Email Template
                        </Menu.Item>
                      </Menu>
                    }
                    placement="bottomRight"
                  >
                    <span
                      className="far fa-plus-square"
                      style={{ opacity: "0.6" }}
                    />
                  </Dropdown>
                }
              >
                <Row>
                  <Col span={24}>
                    {!loading && contentList[minorTab]}

                    {newPlaybook.flag ? (
                      newPlaybook.type === "template" ? (
                        <CreateTemplate
                          setNewPlaybook={setNewPlaybook}
                          newPlaybook={newPlaybook}
                          commonData={props.commonData}
                          template={template}
                          submitNewPlaybook={submitNewPlaybookE}
                          toolbar={toolbarOptions}
                          editorState={localEditorState}
                          onEditorStateChange={onEditorStateChange}
                          convertToRaw={convertToRaw}
                          isEmpty={isEmpty}
                        />
                      ) : null
                    ) : null}

                    {selectedPlaybook.edit ? (
                      selectedPlaybook.type === "template" ? (
                        <EditTemplate
                          selectedPlaybook={selectedPlaybook}
                          setSelectedPlaybook={setSelectedPlaybook}
                          commonData={props.commonData}
                          template={template}
                          tenantId={token.tId}
                          userId={token.id}
                          authToken={token.authToken}
                          stage={"dev"}
                          submitEditPlaybook={submitEditPlaybook}
                          categories={props.commonData.masterCategories}
                          users={tenantData.users}
                          toolbar={toolbarOptions}
                          editorState={localEditorState}
                          onEditorStateChange={onEditorStateChange}
                          convertToRaw={convertToRaw}
                          isEmpty={isEmpty}
                          setEditorState={setEditorState}
                          convertFromRaw={convertFromRaw}
                          EditorState={EditorState}
                        />
                      ) : null
                    ) : null}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        ) : (
          <Space size="large" style={{ height: "60vh" }}>
            <Spin tip="Getting stuff organized..." size="large" />
          </Space>
        )}
      </Content>
    </Layout>
  );
};

export default Template;
