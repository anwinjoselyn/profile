import React, { useState, useEffect } from "react";

import {
  Card,
  Row,
  Col,
  Space,
  Spin,
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Radio,
  Select,
  //Pagination,
  //List,
  //Skeleton,
  //Checkbox,
  Layout,
  //Tooltip,
  Menu,
  Dropdown,
  Upload,
  message,
  Alert,
  InputNumber,
  Switch
} from "antd";

import { UploadOutlined } from "@ant-design/icons";

import { format, parseISO } from "date-fns";
//import { mutate } from "swr";

//import axios from "axios";
import Papa from "papaparse";

import { isEmpty } from "../../../../../libs/validators";

//import Sidebar from "./Sidebar";
import Campaigns from "./Campaigns";
import Explanation from "./Explanation";

import "../Parser.css";

//const uuidv1 = require("uuid/v1");

const { Content } = Layout;
const { Option } = Select;
const { Dragger } = Upload;

const dealTemplate = require("../../../../../libs/newSampleDeals.json")
  .dealTemplate;
const contactTemplate = require("../../../../../libs/newSampleDeals.json")
  .contactTemplate;
//const notTemplate = require("../../../libs/notifications.json");
const currencies = require("../../../../../libs/Currencies.json");
const cmTemplate = require("../../../../../libs/newCampaign.json");
const industries = require("../../../../../libs/industries.json").industries
  .data;
const config = require("../../../../../config");

const Leads = props => {
  //console.log("props.commonData", props.commonData);
  //console.log("props.props.props", props.props.props);
  //console.log("props.props", props.props);
  //console.log("props.props.props.token", props.props.props.token);
  const [minorTab, setMinor] = useState("new");
  const [searchContacts, setContacts] = useState(null);
  const [fullView, setView] = useState({ view: false, record: {} });
  const [createView, setCreate] = useState({ view: false, record: {} });
  const [dealData, setDeal] = useState({
    isBulk: false,
    single: dealTemplate,
    bulk: [],
    commonValues: {
      type: "Deal",
      currentTeam: 1,
      pipeId: 1,
      stageId: 1,
      statusId: null,
      reasonId: null,
      userId: null,
      source: null
    }
  });
  const [pages, setPages] = useState({
    current: 1,
    pageSize: 5,
    total: 0
  });
  const [selectedRecords, setSelected] = useState({
    loading: false,
    hasSelected: false,
    selectedRowKeys: []
  });
  /*
  const [rightMenu, setRightMenu] = useState({
    show: false,
    data: "stats"
  });
  */
  const [addLeads, setAddLeads] = useState({
    show: false,
    isBulk: false,
    single: {},
    newContact: true,
    newPerson: false,
    bulk: [],
    file: null,
    fileList: [],
    showBulkData: false,
    contactId: 0,
    dataError: false
  });
  const [addCampaigns, setAddCampaigns] = useState({
    show: false,
    selectedCampaignId: null,
    single:
      props.leadsData.campaigns.length > 0
        ? cmTemplate.template
        : cmTemplate.first,
    records: []
  });
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  const showTotal = total => {
    return `Total ${total} items`;
  };

  const onChange = checked => {
    //console.log(`switch to ${checked}`);

    setToggle(checked);
  };

  const fileProps = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      //console.log("status", status);
      setAddLeads({
        ...addLeads,
        file: info.file,
        fileList: info.fileList
      });
      if (status !== "uploading") {
        //console.log("info.fileList", info.fileList);
        //console.log("info.file", info.file);
      }
      if (status === "done") {
        message.success(`${info.file.name} file parsed successfully.`);
      } else if (status === "error") {
        message.error(
          `${info.file.name} file parsing failed. Please check your file for any data mismatch errors`
        );
      }
    },
    onRemove(file) {
      setAddLeads({
        ...addLeads,
        file: null
      });
    }
  };

  const handleRemove = fileId => {
    const fileList = addLeads.fileList.filter(item => item.uid !== fileId);
    setAddLeads({
      ...addLeads,
      fileList: fileList,
      file: null
    });
  };

  const onSelectChange = selectedRowKeys => {
    //console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelected({
      ...selectedRecords,
      selectedRowKeys: selectedRowKeys,
      hasSelected: selectedRowKeys.length > 0
    });
  };

  const handleSearch = value => {
    let records = [];
    if (value && value.length >= 3) {
      let origin = value;
      value = value.toLowerCase();
      props.leadsData.contacts.forEach(c => {
        let lc = c.orgName.toLowerCase();
        if (lc.includes(value)) {
          records.push(c);
        }
      });

      if (records.length > 0) setContacts(records);
      else {
        let record = addLeads.single;
        record.orgName = origin;
        records = [record];
        setContacts(records);
      }
    } else {
      setContacts([...props.leadsData.contacts, addLeads.single]);
    }
  };

  const updateRecordsBulk = async e => {
    e.preventDefault();

    setSelected({
      ...selectedRecords,
      loading: true
    });

    setView({ view: false, record: {} });
    setCreate({
      view: false,
      record: {}
    });

    try {
      let selectedDeals = [];
      /*
      console.log(
        "selectedRecords.selectedRowKeys",
        selectedRecords.selectedRowKeys
      );
*/
      selectedRecords.selectedRowKeys.forEach(r => {
        let record = props.leadsData.unassigned.all.filter(
          rec => rec.id === r
        )[0];
        //console.log("record", record);

        selectedDeals.push({
          tenantId: props.tenantId,
          userId: props.userId,
          orgId: record.id,
          pipeId: 1,
          type: {
            options: ["Deal", "Renewal"],
            type: "Deal",
            currentTeam: 1,
            customerId: null
          },
          owner: {
            tenantId: props.tenantId,
            userId: props.userId
          },
          details: {
            name: record.orgName.toUpperCase() + " Deal",
            source: record.source,
            smartBCC: "",
            icpData: {}
          },
          contacts: {
            orgId: record.id,
            mainContactId: record.people.data[0].id
              ? record.people.data[0].id
              : 1,
            orgName: record.orgName
          },
          stage: {
            pipeId: 1,
            stageId: 1,
            checklistId: null
          },
          moreDetails: {
            expectedClosureDate: "",
            statusId: 1,
            reasonId: 1
          },
          dealValue: {
            totalValue: 0,
            products: []
          },
          isActive: true,
          mqlJourney: {
            date: "",
            reasonId: null,
            userId: null
          },
          sqlJourney: {
            date: "",
            reasonId: null,
            userId: null
          },
          wonJourney: {
            date: "",
            reasonId: null,
            userId: null
          },
          renewalJourney: {
            date: "",
            reasonId: null,
            userId: null
          },
          maCLJourney: {
            data: [
              {
                stageId: null,
                stageName: "",
                CLId: null,
                CLName: "",
                completedDate: "",
                completedBy: null
              }
            ]
          },
          sdCLJourney: {
            data: [
              {
                stageId: null,
                stageName: "",
                CLId: null,
                CLName: "",
                completedDate: "",
                completedBy: null
              }
            ]
          },
          saCLJourney: {
            data: [
              {
                stageId: null,
                stageName: "",
                CLId: null,
                CLName: "",
                completedDate: "",
                completedBy: null
              }
            ]
          },
          reCLJourney: {
            data: [
              {
                stageId: null,
                stageName: "",
                CLId: null,
                CLName: "",
                completedDate: "",
                completedBy: null
              }
            ]
          },
          lostDetails: {
            isLost: false,
            lostDate: "",
            reasonId: null
          },
          notes: {
            data: [{ id: null, text: "", entryDate: "", entryBy: null }]
          }
        });
      });

      //console.log("selectedDeals", selectedDeals);

      setDeal({
        isBulk: true,
        single: {},
        bulk: selectedDeals,
        commonValues: {
          type: "Deal",
          currentTeam: 1,
          pipeId: 1,
          stageId: 1,
          statusId: 1,
          reasonId: 1,
          userId: props.userId,
          pipeName: props.leadsData.pipelines[0].pipelines.data.filter(
            p => p.id === 1
          )[0].name,
          stageName: props.leadsData.pipelines[0].stages.data.filter(
            s => s.id === 1
          )[0].stageName,
          source: null
        }
      });

      setSelected({
        ...selectedRecords,
        loading: false
      });
    } catch (error) {
      //console.log("error", error);
    }
  };

  const validateDealDataBulk = () => {
    return (
      dealData.commonValues.pipeId > 0 &&
      dealData.commonValues.stageId > 0 &&
      dealData.commonValues.pipeName &&
      dealData.commonValues.pipeName.length > 0 &&
      dealData.commonValues.stageName &&
      dealData.commonValues.stageName.length > 0 &&
      dealData.commonValues.currentTeam &&
      dealData.commonValues.currentTeam > 0 &&
      dealData.commonValues.userId > 0 &&
      dealData.commonValues.statusId &&
      dealData.commonValues.statusId > 0 &&
      dealData.commonValues.reasonId &&
      dealData.commonValues.reasonId > 0 &&
      dealData.commonValues.source &&
      dealData.commonValues.source > 0
    );
  };

  const validateDealData = () => {
    //console.log("dealData.single", dealData.single);
    return (
      !isEmpty(dealData.single) &&
      !isEmpty(dealData.single.contacts) &&
      dealData.single.contacts.orgId > 0 &&
      dealData.single.contacts.orgName &&
      dealData.single.contacts.orgName.length > 2 &&
      dealData.single.contacts.mainContactId > 0 &&
      !isEmpty(dealData.single.details) &&
      dealData.single.details.name &&
      dealData.single.details.name.length > 0 &&
      dealData.single.details.source &&
      dealData.single.details.source > 0 &&
      dealData.single.orgId > 0 &&
      dealData.single.pipeId > 0 &&
      !isEmpty(dealData.single.stage) &&
      dealData.single.stage.pipeId > 0 &&
      dealData.single.stage.stageId > 0 &&
      dealData.single.stage.pipeName &&
      dealData.single.stage.pipeName.length > 0 &&
      dealData.single.stage.stageName &&
      dealData.single.stage.stageName.length > 0 &&
      dealData.single.tenantId > 0 &&
      !isEmpty(dealData.single.type) &&
      dealData.single.type.type &&
      dealData.single.type.type.length > 0 &&
      dealData.single.type.currentTeam &&
      dealData.single.type.currentTeam > 0 &&
      dealData.single.userId > 0 &&
      dealData.single.moreDetails.statusId &&
      dealData.single.moreDetails.statusId > 0 &&
      dealData.single.moreDetails.reasonId &&
      dealData.single.moreDetails.reasonId > 0
    );
  };

  const validateLeadForm = () => {
    return (
      addLeads.single.orgName !== "" &&
      addLeads.single.orgName.length > 2 &&
      addLeads.single.people.data[addLeads.contactId].profile.fullName !== "" &&
      addLeads.single.people.data[addLeads.contactId].profile.fullName.length >=
        2 &&
      addLeads.single.people.data[addLeads.contactId].type !== "" &&
      addLeads.single.details.companyType !== "" &&
      !isNaN(addLeads.single.details.companyTypeId)
    );
  };

  const tabListNoTitle = [
    {
      key: "new",
      tab: (
        <span>
          Unclaimed{" "}
          <small className="superscript">
            <sup>
              (
              {props.leadsData &&
              props.leadsData.unassigned &&
              props.leadsData.unassigned.all
                ? props.leadsData.unassigned.all.length
                : null}
              )
            </sup>
          </small>
        </span>
      )
    },
    {
      key: "today",
      tab: (
        <span>
          Today{" "}
          <small className="superscript">
            <sup>
              (
              {props.leadsData &&
              props.leadsData.unassigned &&
              props.leadsData.unassigned.todayUnassigned
                ? props.leadsData.unassigned.todayUnassigned.length
                : null}
              )
            </sup>
          </small>
        </span>
      )
    },
    {
      key: "week",
      tab: (
        <span>
          This Week{" "}
          <small className="superscript">
            <sup>
              (
              {props.leadsData &&
              props.leadsData.unassigned &&
              props.leadsData.unassigned.weekUnassigned
                ? props.leadsData.unassigned.weekUnassigned.length
                : null}
              )
            </sup>
          </small>
        </span>
      )
    },
    {
      key: "month",
      tab: (
        <span>
          This Month{" "}
          <small className="superscript">
            <sup>
              (
              {props.leadsData &&
              props.leadsData.unassigned &&
              props.leadsData.unassigned.monthUnassigned
                ? props.leadsData.unassigned.monthUnassigned.length
                : null}
              )
            </sup>
          </small>
        </span>
      )
    },
    {
      key: "all",
      tab: (
        <span>
          Claimed{" "}
          <small className="superscript">
            <sup>
              (
              {props.leadsData && props.leadsData.assigned
                ? props.leadsData.assigned.length
                : null}
              )
            </sup>
          </small>
        </span>
      )
    }
  ];

  const claimedColumns = [
    {
      title: "Org. Name",
      dataIndex: "orgName",
      width: "10%"
    },
    {
      title: "Contact Name",
      dataIndex: "people",
      render: people =>
        people.data &&
        Array.isArray(people.data) &&
        people.data.length > 0 &&
        people.data[0].profile &&
        people.data[0].profile.fullName
          ? people.data[0].profile.fullName.split(" ")[0]
          : "---"
    },
    {
      title: "City",
      dataIndex: "address",
      render: address => (address.city ? address.city : "---")
    },
    {
      title: "Emp Size",
      dataIndex: "details",
      render: details =>
        details.empSize ? details.empSize.toLocaleString() : "---"
    },
    {
      title: "Website",
      dataIndex: "details",
      render: details => (details.website ? details.website : "---")
    },
    {
      title: "Type",
      dataIndex: "people",
      render: people =>
        people.data &&
        Array.isArray(people.data) &&
        people.data.length > 0 &&
        people.data[0].type
          ? people.data[0].type.toUpperCase()
          : "---"
    },
    {
      title: "Source",
      dataIndex: "source",
      render: source => (source ? source.toUpperCase() : "---")
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: createdAt => format(parseISO(createdAt), "dd MMM")
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Button
            type="default"
            size="small"
            onClick={() => setView({ view: true, record: record })}
          >
            View
          </Button>
        </Space>
      )
    }
  ];

  const bulkColumns = [
    {
      title: "Org. Name",
      dataIndex: "orgName",
      width: "15%"
    },
    {
      title: "City",
      dataIndex: "address",
      render: address => (address.city ? address.city : "---"),
      sorter: (a, b) => a.address.city.length - b.address.city.length,
      sortDirections: ["descend", "ascend"],
      width: "10%"
    },
    {
      title: "Country",
      dataIndex: "address",
      render: address => (address.country ? address.country : "---"),
      width: "10%"
    },
    {
      title: "Website",
      dataIndex: "details",
      render: details => (details.website ? details.website : "---"),
      width: "15%"
    },
    {
      title: "Industry",
      dataIndex: "details",
      render: details => (details.industry ? details.industry : "---"),
      width: "15%"
    },
    {
      title: "Emp Size",
      dataIndex: "details",
      render: details =>
        details.empSize ? details.empSize.toLocaleString() : "---",
      sorter: (a, b) => a.empSize - b.empSize,
      sortDirections: ["descend", "ascend"],
      width: "10%"
    },
    {
      title: "Annual Revenue",
      dataIndex: "details",
      render: details =>
        details.annualRevenue ? details.annualRevenue.toLocaleString() : "---",
      width: "10%"
    },
    {
      title: "Description",
      dataIndex: "details",
      render: details => (details.description ? details.description : "---"),
      width: "20%"
    },
    {
      title: "Gen. Phone",
      dataIndex: "contactInfo",
      render: contactInfo =>
        contactInfo.mainPhone ? contactInfo.mainPhone : "---",
      sorter: (a, b) => a.mainPhone - b.mainPhone,
      sortDirections: ["descend", "ascend"],
      width: "15%"
    },
    {
      title: "Gen Email",
      dataIndex: "contactInfo",
      render: contactInfo =>
        contactInfo.mainEmail ? contactInfo.mainEmail : "---",
      sorter: (a, b) => a.mainEmail - b.mainEmail,
      sortDirections: ["descend", "ascend"],
      width: "15%"
    },
    {
      title: "Contact Name",
      dataIndex: "people",
      render: people =>
        people.data &&
        people.data.length > 0 &&
        people.data[0].profile &&
        people.data[0].profile.fullName
          ? people.data[0].profile.fullName
          : "---",
      width: "15%"
    },
    {
      title: "Title",
      dataIndex: "people",
      render: people =>
        people.data &&
        people.data.length > 0 &&
        people.data[0].profile &&
        people.data[0].profile.title
          ? people.data[0].profile.title
          : "---",
      width: "10%"
    },
    {
      title: "Department",
      dataIndex: "people",
      render: people =>
        people.data &&
        people.data.length > 0 &&
        people.data[0].profile &&
        people.data[0].profile.department
          ? people.data[0].profile.department
          : "---",
      width: "10%"
    },
    {
      title: "Email",
      dataIndex: "people",
      render: people =>
        people.data &&
        people.data.length > 0 &&
        people.data[0].contactInfo &&
        people.data[0].contactInfo.mainEmail
          ? people.data[0].contactInfo.mainEmail
          : "---",
      width: "15%"
    },
    {
      title: "Phone",
      dataIndex: "people",
      render: people =>
        people.data &&
        people.data.length > 0 &&
        people.data[0].contactInfo &&
        people.data[0].contactInfo.mainPhone
          ? people.data[0].contactInfo.mainPhone
          : "---",
      width: "15%"
    },
    {
      title: "Alt. Email",
      dataIndex: "people",
      render: people =>
        people.data &&
        people.data.length > 0 &&
        people.data[0].contactInfo &&
        people.data[0].contactInfo.altEmail
          ? people.data[0].contactInfo.altEmail
          : "---",
      width: "10%"
    },
    {
      title: "Alt. Phone",
      dataIndex: "people",
      render: people =>
        people.data &&
        people.data.length > 0 &&
        people.data[0].contactInfo &&
        people.data[0].contactInfo.altPhone
          ? people.data[0].contactInfo.altPhone
          : "---",
      width: "10%"
    },
    {
      title: "Linkedin URL",
      dataIndex: "people",
      render: people =>
        people.data &&
        people.data.length > 0 &&
        people.data[0].contactInfo &&
        people.data[0].contactInfo.linkedInUrl
          ? people.data[0].contactInfo.linkedInUrl
          : "---",
      width: "15%"
    },
    {
      title: "Contact Description",
      dataIndex: "people",
      render: people =>
        people.data &&
        people.data.length > 0 &&
        people.data[0].contactInfo &&
        people.data[0].contactInfo.description
          ? people.data[0].contactInfo.description
          : "---",
      width: "20%"
    },
    {
      title: "Contact Type",
      dataIndex: "people",
      render: people =>
        people.data && people.data.length > 0 && people.data[0].contactType
          ? getContactType2(people.data[0].contactType).toUpperCase()
          : "---",
      width: "15%"
    },
    {
      title: "Lead Type",
      dataIndex: "people",
      filters: [
        {
          text: "Signup",
          value: "signup"
        },
        {
          text: "Lead",
          value: "lead"
        },
        {
          text: "Potential",
          value: "potential"
        },
        {
          text: "Newsletter",
          value: "newsletter"
        }
      ],
      filterMultiple: true,
      onFilter: (value, record) =>
        record.people.data[0].type.indexOf(value) === 0,
      render: people =>
        people.data && people.data.length > 0 && people.data[0].type
          ? people.data[0].type.toUpperCase()
          : "---",
      sorter: (a, b) =>
        a.people.data[0].type.length - b.people.data[0].type.length,
      sortDirections: ["descend", "ascend"],
      width: "10%"
    }
  ];

  const columns = [
    {
      title: "Org. Name",
      dataIndex: "orgName",
      width: "10%"
    },
    {
      title: "Contact Name",
      dataIndex: "people",
      render: people =>
        people.data &&
        Array.isArray(people.data) &&
        people.data.length > 0 &&
        people.data[0].profile &&
        people.data[0].profile.fullName
          ? people.data[0].profile.fullName.split(" ")[0]
          : "---"
    },
    {
      title: "City",
      dataIndex: "address",
      render: address => (address.city ? address.city : "---"),
      sorter: (a, b) => a.address.city.length - b.address.city.length,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Emp Size",
      dataIndex: "details",
      render: details =>
        details.empSize ? details.empSize.toLocaleString() : "---",
      sorter: (a, b) => a.empSize - b.empSize,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Website",
      dataIndex: "details",
      render: details => (details.website ? details.website : "---")
    },
    {
      title: "Type",
      dataIndex: "people",
      filters: [
        {
          text: "Signup",
          value: "signup"
        },
        {
          text: "Lead",
          value: "lead"
        },
        {
          text: "Potential",
          value: "potential"
        },
        {
          text: "Newsletter",
          value: "newsletter"
        }
      ],
      filterMultiple: true,
      onFilter: (value, record) =>
        record.people.data[0].type.toLowerCase().indexOf(value) === 0,
      render: people =>
        people.data &&
        Array.isArray(people.data) &&
        people.data.length > 0 &&
        people.data[0].type
          ? people.data[0].type.toUpperCase()
          : "---",
      sorter: (a, b) =>
        a.people.data[0].type.length - b.people.data[0].type.length,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: createdAt => format(parseISO(createdAt), "dd MMM")
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Menu selectable={selectedRecords.selectedRowKeys.length === 0}>
          <Menu.SubMenu
            title="Assign"
            disabled={selectedRecords.selectedRowKeys.length > 0}
          >
            <Menu.Item
              className="tableSubmenuItem"
              key="dealAdd"
              onClick={() => {
                //console.log("record", record);
                setView({ view: true, record: record });
                setCreate({
                  view: true,
                  record: record
                });
                setDeal({
                  isBulk: false,
                  single: {
                    ...dealData.single,
                    tenantId: props.tenantId,
                    contacts: {
                      ...dealData.single.contacts,
                      orgId: record.id,
                      orgName: record.orgName,
                      mainContactId: record.people.data[0].id
                        ? record.people.data[0].id
                        : 1
                    },
                    details: {
                      ...dealData.single.details,
                      name: record.orgName.toUpperCase() + " Deal",
                      source: record.source,
                      smartBCC: ""
                    },
                    isActive: true,
                    moreDetails: {
                      ...dealData.single.moreDetails,
                      reasonId: 1,
                      statusId: 1
                    },
                    orgId: record.id,
                    owner: {
                      userId: props.userId,
                      tenantId: props.tenantId
                    },
                    pipeId: 1,
                    stage: {
                      ...dealData.single.stage,
                      pipeId: 1,
                      stageId: 1,
                      pipeName: props.leadsData.pipelines[0].pipelines.data.filter(
                        p => p.id === 1
                      )[0].name,
                      stageName: props.leadsData.pipelines[0].stages.data.filter(
                        s => s.id === 1
                      )[0].stageName
                    },
                    type: {
                      ...dealData.single.type,
                      type: "Deal",
                      currentTeam: 1
                    },
                    userId: props.userId,
                    dealValue: {
                      ...dealData.single.dealValue,
                      totalValue: 0
                    }
                  },
                  bulk: []
                });
              }}
            >
              To a User as a DEAL
            </Menu.Item>
            <Menu.Item
              className="tableSubmenuItem"
              key="cmAdd"
              onClick={() => {
                setSelected({
                  ...selectedRecords,
                  hasSelected: true,
                  selectedRowKeys: [record.id]
                });
                setAddCampaigns({
                  ...addCampaigns,
                  show: true,
                  records: [record.id]
                });
              }}
            >
              To a CAMPAIGN
            </Menu.Item>
            <Menu.Item
              className="tableSubmenuItem"
              onClick={() => setView({ view: true, record: record })}
              key="view"
            >
              View Contact
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      )
    }
  ];

  const rowSelection = {
    selectedRowKeys: selectedRecords.selectedRowKeys,
    onChange: onSelectChange
  };

  const contentListNoTitle = {
    new: (
      <Table
        dataSource={
          props.leadsData &&
          props.leadsData.unassigned &&
          props.leadsData.unassigned.all
            ? props.leadsData.unassigned.all
            : []
        }
        rowSelection={rowSelection}
        columns={columns}
        size="small"
        pagination={{
          size: "small",
          total:
            props.leadsData &&
            props.leadsData.unassigned &&
            props.leadsData.unassigned.unassigned
              ? props.leadsData.unassigned.unassigned.length
              : 0,
          showSizeChanger: true,
          pageSizeOptions: [10, 25, 50, 100],
          showTotal: showTotal
        }}
        rowKey="id"
        bordered={false}
        locale={{ emptyText: "No incoming leads" }}
        scroll={{ scrollToFirstRowOnChange: true, x: 100, y: "67vh" }}
      />
    ),
    today: (
      <Table
        dataSource={
          props.leadsData &&
          props.leadsData.unassigned &&
          props.leadsData.unassigned.todayUnassigned
            ? props.leadsData.unassigned.todayUnassigned
            : []
        }
        rowSelection={rowSelection}
        columns={columns}
        size="small"
        pagination={{
          size: "small",
          total:
            props.leadsData &&
            props.leadsData.unassigned &&
            props.leadsData.unassigned.todayUnassigned
              ? props.leadsData.unassigned.todayUnassigned.length
              : 0,
          showSizeChanger: true,
          pageSizeOptions: [10, 25, 50, 100],
          showTotal: showTotal
        }}
        rowKey="id"
        bordered={false}
        locale={{ emptyText: "No incoming leads" }}
        tableLayout="fixed"
      />
    ),
    week: (
      <Table
        dataSource={
          props.leadsData &&
          props.leadsData.unassigned &&
          props.leadsData.unassigned.weekUnassigned
            ? props.leadsData.unassigned.weekUnassigned
            : []
        }
        rowSelection={rowSelection}
        columns={columns}
        size="small"
        pagination={{
          size: "small",
          total:
            props.leadsData &&
            props.leadsData.unassigned &&
            props.leadsData.unassigned.weekUnassigned
              ? props.leadsData.unassigned.weekUnassigned.length
              : 0,
          showSizeChanger: true,
          pageSizeOptions: [10, 25, 50, 100],
          showTotal: showTotal
        }}
        rowKey="id"
        bordered={false}
        locale={{ emptyText: "No incoming leads" }}
        tableLayout="fixed"
      />
    ),
    month: (
      <Table
        dataSource={
          props.leadsData &&
          props.leadsData.unassigned &&
          props.leadsData.unassigned.monthUnassigned
            ? props.leadsData.unassigned.monthUnassigned
            : []
        }
        rowSelection={rowSelection}
        columns={columns}
        size="small"
        pagination={{
          size: "small",
          total:
            props.leadsData &&
            props.leadsData.unassigned &&
            props.leadsData.unassigned.monthUnassigned
              ? props.leadsData.unassigned.monthUnassigned.length
              : 0,
          showSizeChanger: true,
          pageSizeOptions: [10, 25, 50, 100],
          showTotal: showTotal
        }}
        rowKey="id"
        bordered={false}
        locale={{ emptyText: "No incoming leads" }}
        tableLayout="fixed"
      />
    ),
    all: (
      <Table
        dataSource={
          props.leadsData && props.leadsData.assigned
            ? props.leadsData.assigned
            : []
        }
        columns={claimedColumns}
        size="small"
        pagination={{
          size: "small",
          total:
            props.leadsData && props.leadsData.assigned
              ? props.leadsData.assigned.length
              : 0,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 25, 50, 100],
          showTotal: showTotal
        }}
        rowKey="id"
        bordered={false}
        locale={{ emptyText: "No claimed leads" }}
        scroll={{ scrollToFirstRowOnChange: true, x: 100, y: "67vh" }}
      />
    )
  };

  useEffect(() => {
    setLoading(false);
  }, [props.leadsData]);

  const onTabChange = key => {
    //console.log("key", key);
    setMinor(key);
  };

  const submitSingleDeal = async e => {
    e.preventDefault();

    //console.log("dealData.single", dealData.single);

    let contact = props.leadsData.unassigned.all.filter(
      l => l.id === parseInt(dealData.single.orgId)
    )[0];

    if (contact) {
      contact.lastUpdateBy = props.userId;
      contact.people.data[contact.people.data.length - 1].exposure = {
        ...contact.people.data[contact.people.data.length - 1].exposure,
        source: dealData.single.details.source
      };
      contact.people.data[contact.people.data.length - 1].id = contact.people
        .data[contact.people.data.length - 1].id
        ? contact.people.data[contact.people.data.length - 1].id
        : contact.people.data.length;
      contact.people.data[contact.people.data.length - 1].lastUpdatedBy =
        props.userId;
      contact.people.data[contact.people.data.length - 1].owner = contact.people
        .data[contact.people.data.length - 1].owner
        ? contact.people.data[contact.people.data.length - 1].owner
        : props.userId;
    }
    //console.log("contact", contact);

    let team = dealData.single.type.currentTeam;
    if (team === "Sales Dev") team = "SDR";

    let notFlag = {
      update: false,
      updateContact: contact ? true : false,
      contact: contact,
      data: [],
      users: [],
      team: team
    };

    switch (team.toLowerCase()) {
      default:
        break;
      case "marketing":
        if (props.tenantData.maUsers.length > 0) {
          notFlag.update = true;
          props.tenantData.maUsers.forEach(u => {
            notFlag.users.push(u);

            notFlag.data.push({
              date: new Date(),
              dealId: null,
              dealName: dealData.single.details.name,
              source: dealData.single.details.source,
              userId: dealData.single.userId,
              orgId: dealData.single.orgId,
              contactId: dealData.single.contacts.mainContactId,
              readReceipt: false
            });
          });
        }
        break;
      case "sdr":
        if (props.tenantData.sdUsers.length > 0) {
          notFlag.update = true;
          props.tenantData.sdUsers.forEach(u => {
            notFlag.users.push(u);
            notFlag.data.push({
              date: new Date(),
              dealId: null,
              dealName: dealData.single.details.name,
              source: dealData.single.details.source,
              userId: dealData.single.userId,
              orgId: dealData.single.orgId,
              contactId: dealData.single.contacts.mainContactId,
              readReceipt: false
            });
          });
        }
        break;
      case "sales":
        if (props.tenantData.saUsers.length > 0) {
          notFlag.update = true;
          props.tenantData.saUsers.forEach(u => {
            notFlag.users.push(u);
            notFlag.data.push({
              date: new Date(),
              dealId: null,
              dealName: dealData.single.details.name,
              source: dealData.single.details.source,
              userId: dealData.single.userId,
              orgId: dealData.single.orgId,
              contactId: dealData.single.contacts.mainContactId,
              readReceipt: false
            });
          });
        }
        break;
    }
    /*
    let updatedData = {
      deal: dealData.single,
      notFlag: notFlag
    };
*/
    //console.log("updatedData", updatedData);

    try {
      /*
      const result = await axios({
        method: "POST",
        url: `/${props.stage}/v3/deals/create`,
        headers: { Authorization: `${props.authToken}` },
        data: updatedData
      });
      console.log("result.data", result.data);
*/
      if (contact) {
        /*
        let newContacts = props.leadsData.contacts.map(c => {
          if (contact.id === c.id) {
            return contact;
          } else {
            return c;
          }
        });
*/
        setDeal({
          ...dealData,
          isBulk: false,
          single: dealTemplate,
          bulk: [],
          commonValues: {
            type: "Deal",
            currentTeam: 1,
            pipeId: 1,
            stageId: 1,
            statusId: null,
            reasonId: null,
            userId: null,
            source: null
          }
        });

        message.success("Successfully created Deal from Lead");

        //props.recalculateContactData(newContacts);

        //props.props.props.updateNotifications();

        setCreate({ view: false, record: {} });
        setView({ view: false, record: {} });
      } else {
        message.error("Sorry, something went wrong in saving the deal");
      }
    } catch (error) {
      message.error("Sorry, something went wrong in saving the deal");
      //console.log("error", error);
    }
  };

  const submitBulkDeal = async e => {
    e.preventDefault();

    //console.log("dealData.bulk", dealData.bulk);
    //console.log("dealData.commonValues", dealData.commonValues);

    let deals = dealData.bulk;

    deals.forEach(d => {
      d.pipeId = dealData.commonValues.pipeId;
      d.moreDetails = {
        ...d.moreDetails,
        reasonId: dealData.commonValues.reasonId,
        statusId: dealData.commonValues.statusId
      };
      d.owner.userId = dealData.commonValues.userId;
      d.stage = {
        ...d.stage,
        pipeId: dealData.commonValues.pipeId,
        pipeName: dealData.commonValues.pipeName,
        stageId: dealData.commonValues.stageId,
        stageName: dealData.commonValues.stageName
      };
      d.type = {
        ...d.type,
        currentTeam: dealData.commonValues.currentTeam
      };
      d.userId = dealData.commonValues.userId;
      d.details.source = dealData.commonValues.source;
    });
    let contacts = [];

    selectedRecords.selectedRowKeys.forEach(id =>
      contacts.push(
        props.leadsData.unassigned.all.filter(l => l.id === parseInt(id))[0]
      )
    );

    if (contacts.length > 0) {
      contacts.forEach(c => {
        c.lastUpdateBy = props.userId;
        c.userId = c.userId ? c.userId : dealData.commonValues.userId;
        c.people.data[c.people.data.length - 1].exposure = {
          ...c.people.data[c.people.data.length - 1].exposure,
          source: dealData.commonValues.source
        };
        c.people.data[c.people.data.length - 1].id = c.people.data[
          c.people.data.length - 1
        ].id
          ? c.people.data[c.people.data.length - 1].id
          : c.people.data.length;
        c.people.data[c.people.data.length - 1].lastUpdatedBy = c.people.data[
          c.people.data.length - 1
        ].lastUpdatedBy
          ? c.people.data[c.people.data.length - 1].lastUpdatedBy
          : props.userId;
        c.people.data[c.people.data.length - 1].owner = c.people.data[
          c.people.data.length - 1
        ].owner
          ? c.people.data[c.people.data.length - 1].owner
          : props.userId;
      });
    }

    //console.log("contacts", contacts);

    //let notificationData = [];

    //let notificationUsers = [];

    let team = dealData.commonValues.currentTeam;
    if (team === "Sales Dev") team = "SDR";

    let notFlag = {
      update: false,
      updateContacts: contacts.length > 0 ? true : false,
      contacts: contacts,
      data: [],
      users: [],
      team: team
    };

    switch (team.toLowerCase()) {
      default:
        break;
      case "marketing":
        if (props.tenantData.maUsers.length > 0) {
          notFlag.update = true;
          props.tenantData.maUsers.forEach(u => {
            notFlag.users.push(u);
            //console.log("deals", deals);
            deals.forEach(d => {
              //console.log("d", d);
              notFlag.data.push({
                date: new Date(),
                dealId: null,
                dealName: d.details.name,
                source: dealData.commonValues.source,
                userId: d.userId,
                orgId: d.orgId,
                contactId: d.contacts.mainContactId,
                readReceipt: false
              });
            });
          });
        }
        break;
      case "sdr":
        if (props.tenantData.sdUsers.length > 0) {
          notFlag.update = true;
          props.tenantData.sdUsers.forEach(u => {
            notFlag.users.push(u);
            deals.forEach(d => {
              notFlag.data.push({
                date: new Date(),
                dealId: null,
                dealName: d.details.name,
                source: dealData.commonValues.source,
                userId: d.userId,
                orgId: d.orgId,
                contactId: d.contacts.mainContactId,
                readReceipt: false
              });
            });
          });
        }
        break;
      case "sales":
        if (props.tenantData.saUsers.length > 0) {
          notFlag.update = true;
          props.tenantData.saUsers.forEach(u => {
            notFlag.users.push(u);
            deals.forEach(d => {
              notFlag.data.push({
                date: new Date(),
                dealId: null,
                dealName: d.details.name,
                source: dealData.commonValues.source,
                userId: d.userId,
                orgId: d.orgId,
                contactId: d.contacts.mainContactId,
                readReceipt: false
              });
            });
          });
        }
        break;
    }
    /*
    let updatedData = {
      deals: deals,
      notFlag: notFlag
    };
*/
    //console.log("updatedData", updatedData);

    try {
      /*
      const result = await axios({
        method: "POST",
        url: `/${props.stage}/v3/deals/bulk/create`,
        headers: { Authorization: `${props.authToken}` },
        data: updatedData
      });
      console.log("result.data", result.data);
*/
      if (contacts && contacts.length > 0) {
        /*
        let newContacts = props.leadsData.contacts.map(c => {
          if (contacts.find(contact => contact.id === c.id)) {
            return contacts.filter(contact => contact.id === c.id)[0];
          } else {
            return c;
          }
        });
*/
        setDeal({
          ...dealData,
          isBulk: false,
          bulk: [],
          commonValues: {
            type: "Deal",
            currentTeam: 1,
            pipeId: 1,
            stageId: 1,
            statusId: null,
            reasonId: null,
            userId: null,
            source: null
          }
        });

        message.success("Successfully assigned Leads to Deals");

        //props.recalculateContactData(newContacts);

        //props.props.props.updateNotifications();

        setSelected({
          ...selectedRecords,
          hasSelected: false,
          selectedRowKeys: []
        });
      } else {
        message.error("Sorry, something went wrong in saving the deals");
      }
    } catch (error) {
      message.error("Sorry, something went wrong in saving the deals");
      //console.log("error", error);
    }
  };

  const submitBulkLeads = async e => {
    e.preventDefault();

    //  console.log("addLeads.bulk", addLeads.bulk);

    try {
      /*
      const result = await axios({
        method: "POST",
        url: `/${props.stage}/v3/contacts/create/bulk`,
        headers: { Authorization: `${props.authToken}` },
        data: addLeads.bulk
      });
      console.log("result.data", result.data);
*/
      if (addLeads.bulk) {
        setAddLeads({
          ...addLeads,
          showBulkData: false,
          show: false,
          isBulk: false,
          bulk: [],
          file: null,
          contactId: 0,
          dataError: false
        });

        message.success("Successfully created bulk contacts");
        /*
        props.recalculateContactData([
          ...props.leadsData.contacts,
          ...addLeads.bulk
        ]);
        */
      } else {
        message.error("Sorry, something went wrong in saving the contact");
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const submitSingleLead = async e => {
    e.preventDefault();

    //console.log("addLeads.single", addLeads.single);
    let updatedData = addLeads.single;

    try {
      if (addLeads.newContact) {
        updatedData.fullDomain = updatedData.details.website
          ? updatedData.details.website.split("//")[1]
          : updatedData.people.data[addLeads.contactId].contactInfo.mainEmail
          ? updatedData.people.data[
              addLeads.contactId
            ].contactInfo.mainEmail.split("@")[1]
          : "";
        updatedData.lastUpdateBy = props.userId;
        updatedData.tenantId = props.tenantId;
        updatedData.userId = props.userId;

        updatedData.people.data[addLeads.contactId].owner = props.userId;
        updatedData.people.data[addLeads.contactId].lastUpdatedBy =
          props.userId;
        updatedData.people.data[
          addLeads.contactId
        ].profile.shortName = updatedData.people.data[
          addLeads.contactId
        ].profile.fullName.split(" ")[0];

        let notFlag = {
          update: false,
          data: [],
          users: []
        };
        if (props.tenantData.maUsers.length > 0) {
          notFlag.update = true;
          props.tenantData.maUsers.forEach(u => {
            notFlag.users.push(u.id);
            notFlag.data.push({
              type: updatedData.people.data[0].type,
              remarks: updatedData.people.data[0].contactInfo.description,
              userId: updatedData.userId,
              orgId: null,
              contactId: updatedData.people.data[0].id,
              readReceipt: false
            });
          });
        }

        updatedData = { ...updatedData, notFlag };
        //console.log("updatedData", updatedData);
        /*
        const result = await axios({
          method: "POST",
          url: `/${props.stage}/v3/contacts/create`,
          headers: { Authorization: `${props.authToken}` },
          data: updatedData
        });
        console.log("result.data", result.data);
*/
        if (updatedData) {
          setAddLeads({
            ...addLeads,
            show: false,
            single: contactTemplate,
            contactId: 0,
            dataError: false
          });

          message.success("Successfully created contact");
          //props.props.props.updateNotifications();
          /*
          props.recalculateContactData([
            ...props.leadsData.contacts,
            updatedData
          ]);
          */
        } else {
          message.error("Sorry, something went wrong in saving the contact");
        }
      } else {
        updatedData.lastUpdateBy = props.userId;

        updatedData.people.data[addLeads.contactId].owner = props.userId;
        updatedData.people.data[addLeads.contactId].lastUpdatedBy =
          props.userId;
        updatedData.people.data[
          addLeads.contactId
        ].profile.shortName = updatedData.people.data[
          addLeads.contactId
        ].profile.fullName.split(" ")[0];

        let notFlag = {
          update: false,
          data: [],
          users: []
        };
        if (props.tenantData.maUsers.length > 0) {
          notFlag.update = true;
          props.tenantData.maUsers.forEach(u => {
            notFlag.users.push(u.id);
            notFlag.data.push({
              type: updatedData.people.data[addLeads.contactId].type,
              remarks:
                updatedData.people.data[addLeads.contactId].contactInfo
                  .description,
              userId: updatedData.people.data[addLeads.contactId].owner,
              orgId: null,
              contactId: updatedData.people.data[addLeads.contactId].id,
              readReceipt: false
            });
          });
        }

        updatedData = { ...updatedData, notFlag };
        //console.log("updatedData", updatedData);
        /*
        const result = await axios({
          method: "PUT",
          url: `/${props.stage}/v3/contacts/byid/${updatedData.id}`,
          headers: { Authorization: `${props.authToken}` },
          data: updatedData
        });
        console.log("result.data", result.data);
*/
        if (updatedData) {
          setAddLeads({
            ...addLeads,
            show: false,
            single: contactTemplate,
            contactId: 0,
            dataError: false
          });

          message.success("Successfully created contact");
          //props.props.props.updateNotifications();
          /*
          props.recalculateContactData([
            ...props.leadsData.contacts,
            updatedData
          ]);
          */
        } else {
          message.error("Sorry, something went wrong in saving the contact");
        }
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const getCompanyType = type => {
    type = type.toLowerCase();

    if (type === "startup") {
      return 1;
    }
    if (type === "micro sme") {
      return 2;
    }
    if (type === "sme") {
      return 3;
    }
    if (type === "medium enterprise") {
      return 4;
    }
    if (type === "large enterprise") {
      return 5;
    }
    if (type === "corporate") {
      return 6;
    }
  };

  const getContactType = type => {
    type = type.toLowerCase();

    if (type === "user") {
      return 1;
    }
    if (type === "influencer") {
      return 2;
    }
    if (type === "champion") {
      return 3;
    }
    if (type === "decision maker") {
      return 4;
    }
    if (type === "payment authority") {
      return 5;
    }
    if (type === "gatekeeper") {
      return 6;
    }
  };

  const getContactType2 = type => {
    if (type === 1) {
      return "user";
    }
    if (type === 2) {
      return "influencer";
    }
    if (type === 3) {
      return "champion";
    }
    if (type === 4) {
      return "decision maker";
    }
    if (type === 5) {
      return "payment authority";
    }
    if (type === 6) {
      return "gatekeeper";
    }
  };

  const checkData = (data, dataError) => {
    if (dataError) {
      setAddLeads({
        ...addLeads,
        dataError: true
      });
      message.error(
        "There was some data mismatch, please check the data again"
      );
      return;
    }
    let newData = [];
    //console.log("data", data);

    data.forEach(dat => {
      newData.push({
        tenantId: props.tenantId,
        userId: props.userId,
        lastUpdateBy: props.userId,
        fullDomain: dat.GeneralEmail
          ? dat.GeneralEmail.split("@")[1]
          : dat.ContactEmail
          ? dat.ContactEmail.split("@")[1]
          : dat.Website
          ? dat.Website.split("//")
            ? dat.Website.split("//")[1]
            : dat.Website
          : "",
        orgName: dat.OrgName,
        address: {
          city: dat.City,
          country: dat.Country,
          state: "",
          locality: "",
          street: "",
          door: "",
          zip: ""
        },
        details: {
          website: dat.Website
            ? dat.Website
            : dat.GeneralEmail
            ? dat.GeneralEmail.split("@")[1]
            : dat.ContactEmail
            ? dat.ContactEmail.split("@")[1]
            : "",
          industry: dat.Industry,
          companyType: dat.CompanyType,
          companyTypeId: getCompanyType(dat.CompanyType),
          empSize: dat.EmpSize ? parseInt(dat.EmpSize) : 0,
          annualRevenue: dat.AnnualRevenue ? parseInt(dat.AnnualRevenue) : 0,
          logoSlug: "",
          description: dat.Description
        },
        contactInfo: {
          mainEmail: dat.GeneralEmail,
          altEmail: "",
          mainPhone: dat.GeneralPhone,
          altPhone: ""
        },
        isActive: true,
        people: {
          data: [
            {
              id: 1,
              profile: {
                fullName: dat.ContactPersonName,
                shortName: dat.ContactPersonName.split(" ")[0],
                title: dat.ContactTitle,
                department: dat.ContactDepartment,
                avatar: "",
                persona: ""
              },
              contactInfo: {
                mainEmail: dat.ContactEmail,
                altEmail: dat.ContactAltEmail,
                mainPhone: dat.ContactPhone,
                altPhone: dat.ContactAltPhone,
                linkedInUrl: dat.LinkedinURL,
                IMs: [],
                socialMedia: [],
                others: [],
                description: dat.ContactDescription
              },
              owner: props.userId,
              contactType: getContactType(dat.ContactType),
              persona: null,
              isActive: true,
              lastUpdatedBy: props.userId,
              previousHistory: [
                {
                  dates: "",
                  company: "",
                  designation: "",
                  role: "",
                  remarks: ""
                }
              ],
              type: dat.LeadType,
              exposure: {
                campaigns: [],
                deals: [],
                renewals: [],
                customers: [],
                unassigned: true,
                source: null
              }
            }
          ]
        }
      });
    });

    //console.log("newData", newData);
    setAddLeads({
      ...addLeads,
      bulk: newData,
      showBulkData: true
    });

    message.success("Successfully uploaded Leads");
  };

  const updateData = result => {
    const data = result.data;
    //console.log("result", result);
    //console.log("result.data", result.data);
    //let newData = [];
    let dataError = false;

    data.forEach(o => {
      if (
        o.OrgName.length < 3 ||
        o.City.length < 3 ||
        o.CompanyType.length < 3 ||
        o.ContactPersonName.length < 3 ||
        o.ContactType.length < 3 ||
        o.LeadType.length < 3
      ) {
        dataError = true;
      }
    });
    //console.log("newData", newData);
    checkData(data, dataError);
  };

  const handleSubmitFile = async e => {
    e.preventDefault();

    if (addLeads.file && addLeads.file.size > config.MAX_ATTACHMENT_SIZE) {
      message.error(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    try {
      await Papa.parse(addLeads.file, {
        header: true,
        download: true,
        skipEmptyLines: true,
        // Here this is also available. So we can call our custom class method
        complete: updateData
      });

      //console.log("this.state.orgUpData", this.state.orgUpData);
      setAddLeads({
        ...addLeads,
        file: null
      });
    } catch (e) {
      alert(e);
      //console.log("e", e);
    }
  };

  return (
    <Layout className="LeadsLayout">
      <Content className="Leads">
        <Row style={{ margin: "0.5em 0 1em 0" }}>
          <Col span={24} style={{ textAlign: "center", display: "block" }}>
            <h2
              style={{
                textAlign: "center",
                padding: "0.3em",
                fontSize: "1.2em"
              }}
            >
              {toggle ? " Leads " : " Brief Explanation "}{" "}
              <Switch
                size="small"
                style={{ padding: "0.3em" }}
                defaultChecked
                onChange={onChange}
              />
            </h2>
          </Col>
        </Row>
        {!loading ? (
          toggle ? (
            <Row>
              <Col span={24}>
                <Card
                  bordered={false}
                  style={{ width: "100%" }}
                  tabList={tabListNoTitle}
                  activeTabKey={minorTab}
                  onTabChange={key => {
                    if (key === "week") {
                      setPages({
                        ...pages,
                        total: props.leadsData.unassigned.all.length
                      });
                    }
                    onTabChange(key);
                  }}
                  className="LeadsCard"
                  tabBarExtraContent={
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item
                            key="add"
                            onClick={() => {
                              setContacts(props.leadsData.contacts);
                              setAddLeads({
                                ...addLeads,
                                show: true,
                                isBulk: false,
                                single: {
                                  ...contactTemplate,
                                  orgName: ""
                                }
                              });
                            }}
                          >
                            Add a Lead
                          </Menu.Item>
                          <Menu.Item
                            key="bulk"
                            onClick={() =>
                              setAddLeads({
                                ...addLeads,
                                show: true,
                                isBulk: true
                              })
                            }
                          >
                            Upload Leads
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
                      {selectedRecords.hasSelected ? (
                        <Space size="small" style={{ marginLeft: 8 }}>
                          <Button
                            type="default"
                            size="small"
                            onClick={updateRecordsBulk}
                          >
                            {selectedRecords.hasSelected
                              ? `Bulk Create ${selectedRecords.selectedRowKeys.length} Deals`
                              : ""}
                          </Button>
                          <Button
                            type="default"
                            size="small"
                            onClick={() => {
                              setAddCampaigns({
                                ...addCampaigns,
                                show: true,
                                records: selectedRecords.selectedRowKeys
                              });
                            }}
                          >
                            {selectedRecords.hasSelected
                              ? `Bulk Assign ${selectedRecords.selectedRowKeys.length} to Campaigns`
                              : ""}
                          </Button>
                        </Space>
                      ) : null}
                      {contentListNoTitle[minorTab]}
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Drawer
                title="Details"
                width={"25vw"}
                closable={true}
                onClose={() => setView({ view: false, record: {} })}
                visible={fullView.view}
              >
                {!isEmpty(fullView.record) && (
                  <React.Fragment>
                    <Row>
                      <Col span={3}>
                        <i className="far fa-user" />{" "}
                      </Col>
                      <Col span={21}>
                        {fullView.record.people.data[0].profile.fullName
                          ? fullView.record.people.data[0].profile.fullName
                          : "---"}
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col span={3}>
                        <i className="far fa-file" />
                      </Col>
                      <Col span={21}>
                        {fullView.record.people.data[0].type
                          ? fullView.record.people.data[0].type.toUpperCase()
                          : "---"}
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col span={3}>
                        <i className="far fa-building" />{" "}
                      </Col>
                      <Col span={21}>{fullView.record.orgName}</Col>
                    </Row>
                    <br />
                    <Row>
                      <Col span={3}>
                        <i className="fas fa-city" />{" "}
                      </Col>
                      <Col span={21}>
                        {fullView.record.address.city},{" "}
                        {fullView.record.address.country}
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col span={3}>
                        <i className="fas fa-globe" />{" "}
                      </Col>
                      <Col span={21}>
                        {fullView.record.details.website ? (
                          <a
                            href={
                              fullView.record.details.website.includes(
                                "https://"
                              )
                                ? fullView.record.details.website
                                : "https://" + fullView.record.details.website
                            }
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {fullView.record.details.website}
                          </a>
                        ) : (
                          "---"
                        )}
                      </Col>
                    </Row>
                    {/*<br />
                  <Row>
                    <Col span={3}>
                      <i className="far fa-flag" />{" "}
                    </Col>
                    <Col span={21}>{fullView.record.source.toUpperCase()}</Col>
                  </Row>*/}
                    <br />
                    <Row>
                      <Col span={3}>
                        <i className="fas fa-at" />
                      </Col>
                      <Col span={21}>
                        {fullView.record.people.data[0].contactInfo
                          .mainEmail ? (
                          <a
                            href={`mailto:${fullView.record.people.data[0].contactInfo.mainEmail}`}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {
                              fullView.record.people.data[0].contactInfo
                                .mainEmail
                            }
                          </a>
                        ) : (
                          "---"
                        )}
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col span={3}>
                        <i className="fas fa-phone" />
                      </Col>
                      <Col span={21}>
                        {fullView.record.people.data[0].contactInfo
                          .mainPhone ? (
                          <a
                            href={`tel:${fullView.record.people.data[0].contactInfo.mainPhone}`}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {
                              fullView.record.people.data[0].contactInfo
                                .mainPhone
                            }
                          </a>
                        ) : (
                          "---"
                        )}
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col span={3}>
                        <i className="far fa-calendar" />{" "}
                      </Col>
                      <Col span={21}>
                        {format(
                          parseISO(fullView.record.createdAt),
                          "dd MMM yyyy"
                        )}
                      </Col>
                    </Row>
                    <br />
                    {minorTab !== "all" && (
                      <Row>
                        <Col span={24}>
                          <Button
                            type="primary"
                            onClick={() =>
                              setCreate({ view: true, record: {} })
                            }
                            size="small"
                          >
                            Create and Assign Deal
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </React.Fragment>
                )}
                {!isEmpty(createView.record) && (
                  <Drawer
                    title="Create Deal"
                    width={"33vw"}
                    closable={true}
                    onClose={() => {
                      setCreate({ view: false, record: {} });
                      setView({ view: false, record: {} });
                    }}
                    visible={createView.view}
                  >
                    <Form
                      layout="vertical"
                      size="default"
                      initialValues={dealData.single}
                    >
                      {props.leadsData.campaigns &&
                      props.leadsData.campaigns.length > 0 ? (
                        <React.Fragment>
                          <Form.Item label="Source">
                            <Select
                              placeholder="Select a Source"
                              optionFilterProp="children"
                              showSearch
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={value => {
                                setDeal({
                                  ...dealData,
                                  single: {
                                    ...dealData.single,
                                    details: {
                                      ...dealData.single.details,
                                      source: value
                                    }
                                  }
                                });
                              }}
                              value={dealData.single.details.source}
                              bordered={false}
                            >
                              {props.leadsData.campaigns.map(c => (
                                <Option key={c.id} value={c.id}>
                                  {c.cmDetails.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item label="Deal Name">
                            <Input
                              value={dealData.single.details.name}
                              onChange={event =>
                                setDeal({
                                  ...dealData,
                                  single: {
                                    ...dealData.single,
                                    details: {
                                      ...dealData.single.details,
                                      name: event.target.value
                                    }
                                  }
                                })
                              }
                            />
                          </Form.Item>

                          <Form.Item label="Team / Pipeline">
                            <Select
                              placeholder="Select a Team Pipeline"
                              optionFilterProp="children"
                              onChange={value => {
                                let data = props.leadsData.pipelines[0].pipelines.data.filter(
                                  p => p.id === value
                                )[0];
                                //console.log("data", data);

                                if (data.team === "Sales Dev")
                                  data.team = "SDR";
                                setDeal({
                                  ...dealData,
                                  single: {
                                    ...dealData.single,
                                    pipeId: data.id,
                                    stage: {
                                      ...dealData.single.stage,
                                      pipeId: data.id,
                                      pipeName: data.name,
                                      stageId: null,
                                      stageName: ""
                                    },
                                    type: {
                                      ...dealData.single.type,
                                      currentTeam: data.team
                                    },
                                    moreDetails: {
                                      ...dealData.single.moreDetails,
                                      statusId: null,
                                      reasonId: null
                                    }
                                  }
                                });
                              }}
                              value={dealData.single.pipeId}
                              bordered={false}
                            >
                              {props.leadsData &&
                              props.leadsData.pipelines &&
                              props.leadsData.pipelines[0].pipelines.data &&
                              dealData.single.type.type
                                ? dealData.single.type.type === "Deal"
                                  ? props.leadsData.pipelines[0].pipelines.data
                                      .filter(p => p.id <= 3)
                                      .map(p => (
                                        <Option key={p.id} value={p.id}>
                                          {p.name}
                                        </Option>
                                      ))
                                  : dealData.single.type.type === "Renewal"
                                  ? props.leadsData.pipelines[0].pipelines.data
                                      .filter(p => p.id === 5)
                                      .map(p => (
                                        <Option key={p.id} value={p.id}>
                                          {p.name}
                                        </Option>
                                      ))
                                  : "Unable to retrieve data"
                                : "Unable to retrieve data"}
                            </Select>
                          </Form.Item>
                          <Form.Item label="Stage">
                            <Select
                              placeholder="Select a Stage"
                              optionFilterProp="children"
                              onChange={value => {
                                let data = props.leadsData.pipelines[0].stages.data.filter(
                                  p => p.id === value
                                )[0];
                                setDeal({
                                  ...dealData,
                                  single: {
                                    ...dealData.single,
                                    stage: {
                                      ...dealData.single.stage,
                                      stageId: data.id,
                                      stageName: data.stageName
                                    }
                                  }
                                });
                              }}
                              value={dealData.single.stage.stageId}
                              bordered={false}
                            >
                              {props.leadsData &&
                              props.leadsData.pipelines &&
                              props.leadsData.pipelines[0].stages.data &&
                              dealData.single.pipeId &&
                              props.leadsData.pipelines[0].stages.data.find(
                                s => s.pipeId === dealData.single.pipeId
                              )
                                ? props.leadsData.pipelines[0].stages.data
                                    .filter(
                                      s => s.pipeId === dealData.single.pipeId
                                    )
                                    .map(s => (
                                      <Option key={s.id} value={s.id}>
                                        {s.stageName}
                                      </Option>
                                    ))
                                : "Unable to retrieve data"}
                            </Select>
                          </Form.Item>
                          <Form.Item label="Status of Deal">
                            <Select
                              placeholder="Select a Status"
                              optionFilterProp="children"
                              onChange={value =>
                                setDeal({
                                  ...dealData,
                                  single: {
                                    ...dealData.single,
                                    moreDetails: {
                                      ...dealData.single.moreDetails,
                                      statusId: value
                                    }
                                  }
                                })
                              }
                              value={dealData.single.moreDetails.statusId}
                              bordered={false}
                            >
                              {props.commonData &&
                              props.commonData.dealStatuses &&
                              dealData.single.type.currentTeam &&
                              props.commonData.dealStatuses.find(
                                ds =>
                                  ds.teamId === dealData.single.type.currentTeam
                              )
                                ? props.commonData.dealStatuses
                                    .filter(
                                      ds =>
                                        ds.teamId ===
                                        dealData.single.type.currentTeam
                                    )
                                    .map(ds => (
                                      <Option key={ds.id} value={ds.id}>
                                        {ds.dealStatusName}
                                      </Option>
                                    ))
                                : "Unable to retrieve data"}
                            </Select>
                          </Form.Item>
                          <Form.Item label="Reason for Status">
                            <Select
                              placeholder="Select a Reason"
                              optionFilterProp="children"
                              onChange={value =>
                                setDeal({
                                  ...dealData,
                                  single: {
                                    ...dealData.single,
                                    moreDetails: {
                                      ...dealData.single.moreDetails,
                                      reasonId: value
                                    }
                                  }
                                })
                              }
                              value={dealData.single.moreDetails.reasonId}
                              bordered={false}
                            >
                              {props.commonData &&
                              props.commonData.reasons &&
                              dealData.single.moreDetails.statusId &&
                              props.commonData.reasons.find(
                                r =>
                                  r.statusId ===
                                  dealData.single.moreDetails.statusId
                              )
                                ? props.commonData.reasons
                                    .filter(
                                      r =>
                                        r.statusId ===
                                        dealData.single.moreDetails.statusId
                                    )
                                    .map(r => (
                                      <Option key={r.id} value={r.id}>
                                        {r.reasonName}
                                      </Option>
                                    ))
                                : "Unable to retrieve data"}
                            </Select>
                          </Form.Item>
                          <Form.Item label="Owner (User)">
                            <Select
                              placeholder="Select a User"
                              optionFilterProp="children"
                              onChange={value =>
                                setDeal({
                                  ...dealData,
                                  single: {
                                    ...dealData.single,
                                    userId: value,
                                    owner: {
                                      ...dealData.single.owner,
                                      userId: value
                                    }
                                  }
                                })
                              }
                              value={dealData.single.userId}
                              bordered={false}
                            >
                              {props.tenantData &&
                              props.tenantData.users &&
                              props.tenantData.users.length > 0 &&
                              props.tenantData.users.find(u =>
                                u.responsibilities.teams.find(
                                  t =>
                                    t === 0 ||
                                    t === dealData.single.pipeId ||
                                    t === 6
                                )
                              )
                                ? props.tenantData.users
                                    .filter(u =>
                                      u.responsibilities.teams.find(
                                        t =>
                                          t === 0 ||
                                          t === dealData.single.pipeId ||
                                          t === 6
                                      )
                                    )
                                    .map(u => (
                                      <Option key={u.id} value={u.id}>
                                        {u.profile.fullName}
                                      </Option>
                                    ))
                                : "Unable to retrieve data"}
                            </Select>
                          </Form.Item>
                          <Row>
                            <Col span={24}>
                              <Button
                                type="primary"
                                size="small"
                                disabled={!validateDealData()}
                                onClick={submitSingleDeal}
                              >
                                Submit
                              </Button>
                            </Col>
                          </Row>
                        </React.Fragment>
                      ) : (
                        <div>
                          Please create appropriate campaigns first which will
                          be the source for all deals.
                        </div>
                      )}
                    </Form>
                  </Drawer>
                )}
              </Drawer>
              {dealData.isBulk && dealData.bulk.length > 0 ? (
                <Drawer
                  title="Bulk Create Deals"
                  width={"33vw"}
                  closable={true}
                  onClose={() => {
                    setDeal({
                      ...dealData,
                      isBulk: false,
                      bulk: [],
                      commonValues: {
                        type: "Deal",
                        currentTeam: 1,
                        pipeId: 1,
                        stageId: 1,
                        statusId: null,
                        reasonId: null,
                        userId: null,
                        source: null
                      }
                    });
                  }}
                  visible={dealData.isBulk}
                >
                  <Form
                    layout="vertical"
                    size="default"
                    initialValues={dealData.commonValues}
                  >
                    {props.leadsData.campaigns &&
                    props.leadsData.campaigns.length > 0 ? (
                      <React.Fragment>
                        <Form.Item label="Source">
                          <Select
                            placeholder="Select a Source"
                            optionFilterProp="children"
                            showSearch
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={value => {
                              setDeal({
                                ...dealData,
                                commonValues: {
                                  ...dealData.commonValues,
                                  source: value
                                }
                              });
                            }}
                            value={dealData.commonValues.source}
                            bordered={false}
                          >
                            {props.leadsData.campaigns.map(c => (
                              <Option key={c.id} value={c.id}>
                                {c.cmDetails.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item label="Team / Pipeline">
                          <Select
                            placeholder="Select a Team Pipeline"
                            optionFilterProp="children"
                            onChange={value => {
                              let data = props.leadsData.pipelines[0].pipelines.data.filter(
                                p => p.id === value
                              )[0];
                              //console.log("data", data);

                              if (data.team === "Sales Dev") data.team = "SDR";
                              setDeal({
                                ...dealData,
                                commonValues: {
                                  ...dealData.commonValues,
                                  pipeId: data.id,
                                  pipeName: data.name,
                                  stageId: null,
                                  stageName: "",
                                  currentTeam: data.team,
                                  statusId: null,
                                  reasonId: null
                                }
                              });
                            }}
                            value={dealData.commonValues.pipeId}
                            bordered={false}
                          >
                            {props.leadsData &&
                            props.leadsData.pipelines &&
                            props.leadsData.pipelines[0].pipelines.data &&
                            dealData.commonValues.type
                              ? dealData.commonValues.type === "Deal"
                                ? props.leadsData.pipelines[0].pipelines.data
                                    .filter(p => p.id <= 3)
                                    .map(p => (
                                      <Option key={p.id} value={p.id}>
                                        {p.name}
                                      </Option>
                                    ))
                                : dealData.commonValues.type === "Renewal"
                                ? props.leadsData.pipelines[0].pipelines.data
                                    .filter(p => p.id === 5)
                                    .map(p => (
                                      <Option key={p.id} value={p.id}>
                                        {p.name}
                                      </Option>
                                    ))
                                : "Unable to retrieve data"
                              : "Unable to retrieve data"}
                          </Select>
                        </Form.Item>
                        <Form.Item label="Stage">
                          <Select
                            placeholder="Select a Stage"
                            optionFilterProp="children"
                            onChange={value => {
                              let data = props.leadsData.pipelines[0].stages.data.filter(
                                p => p.id === value
                              )[0];
                              setDeal({
                                ...dealData,
                                commonValues: {
                                  ...dealData.commonValues,
                                  stageId: data.id,
                                  stageName: data.stageName
                                }
                              });
                            }}
                            value={dealData.commonValues.stageId}
                            bordered={false}
                          >
                            {props.leadsData &&
                            props.leadsData.pipelines &&
                            props.leadsData.pipelines[0].stages.data &&
                            dealData.commonValues.pipeId &&
                            props.leadsData.pipelines[0].stages.data.find(
                              s => s.pipeId === dealData.commonValues.pipeId
                            )
                              ? props.leadsData.pipelines[0].stages.data
                                  .filter(
                                    s =>
                                      s.pipeId === dealData.commonValues.pipeId
                                  )
                                  .map(s => (
                                    <Option key={s.id} value={s.id}>
                                      {s.stageName}
                                    </Option>
                                  ))
                              : "Unable to retrieve data"}
                          </Select>
                        </Form.Item>
                        <Form.Item label="Status of Deal">
                          <Select
                            placeholder="Select a Status"
                            optionFilterProp="children"
                            onChange={value =>
                              setDeal({
                                ...dealData,
                                commonValues: {
                                  ...dealData.commonValues,
                                  statusId: value
                                }
                              })
                            }
                            value={dealData.commonValues.statusId}
                            bordered={false}
                          >
                            {props.commonData &&
                            props.commonData.dealStatuses &&
                            dealData.commonValues.currentTeam &&
                            props.commonData.dealStatuses.find(
                              ds =>
                                ds.teamId === dealData.commonValues.currentTeam
                            )
                              ? props.commonData.dealStatuses
                                  .filter(
                                    ds =>
                                      ds.teamId ===
                                      dealData.commonValues.currentTeam
                                  )
                                  .map(ds => (
                                    <Option key={ds.id} value={ds.id}>
                                      {ds.dealStatusName}
                                    </Option>
                                  ))
                              : "Unable to retrieve data"}
                          </Select>
                        </Form.Item>
                        <Form.Item label="Reason for Status">
                          <Select
                            placeholder="Select a Reason"
                            optionFilterProp="children"
                            onChange={value =>
                              setDeal({
                                ...dealData,
                                commonValues: {
                                  ...dealData.commonValues,
                                  reasonId: value
                                }
                              })
                            }
                            value={dealData.commonValues.reasonId}
                            bordered={false}
                          >
                            {props.commonData &&
                            props.commonData.reasons &&
                            dealData.commonValues.statusId &&
                            props.commonData.reasons.find(
                              r => r.statusId === dealData.commonValues.statusId
                            )
                              ? props.commonData.reasons
                                  .filter(
                                    r =>
                                      r.statusId ===
                                      dealData.commonValues.statusId
                                  )
                                  .map(r => (
                                    <Option key={r.id} value={r.id}>
                                      {r.reasonName}
                                    </Option>
                                  ))
                              : "Unable to retrieve data"}
                          </Select>
                        </Form.Item>
                        <Form.Item label="Owner (User)">
                          <Select
                            placeholder="Select a User"
                            optionFilterProp="children"
                            onChange={value =>
                              setDeal({
                                ...dealData,
                                commonValues: {
                                  ...dealData.commonValues,
                                  userId: value
                                }
                              })
                            }
                            value={dealData.commonValues.userId}
                            bordered={false}
                          >
                            {props.tenantData &&
                            props.tenantData.users &&
                            props.tenantData.users.length > 0 &&
                            props.tenantData.users.find(u =>
                              u.responsibilities.teams.find(
                                t =>
                                  t === 0 ||
                                  t === dealData.commonValues.pipeId ||
                                  t === 6
                              )
                            )
                              ? props.tenantData.users
                                  .filter(u =>
                                    u.responsibilities.teams.find(
                                      t =>
                                        t === 0 ||
                                        t === dealData.commonValues.pipeId ||
                                        t === 6
                                    )
                                  )
                                  .map(u => (
                                    <Option key={u.id} value={u.id}>
                                      {u.profile.fullName}
                                    </Option>
                                  ))
                              : "Unable to retrieve data"}
                          </Select>
                        </Form.Item>
                        <Row>
                          <Col span={24}>
                            <Button
                              type="primary"
                              size="small"
                              disabled={!validateDealDataBulk()}
                              onClick={submitBulkDeal}
                            >
                              Submit
                            </Button>
                          </Col>
                        </Row>
                      </React.Fragment>
                    ) : (
                      <div>
                        Please create appropriate campaigns first which will be
                        the source for all deals.
                      </div>
                    )}
                  </Form>
                </Drawer>
              ) : null}
              {addLeads.show ? (
                addLeads.isBulk ? (
                  <Drawer
                    style={{
                      marginTop: "3.5em",
                      height: "87vh"
                    }}
                    title="Upload Leads"
                    width={"33vw"}
                    closable={true}
                    onClose={() => {
                      setAddLeads({
                        ...addLeads,
                        show: false,
                        isBulk: false,
                        bulk: []
                      });
                    }}
                    visible={addLeads.show && addLeads.isBulk}
                  >
                    <Alert
                      message={
                        <React.Fragment>
                          <Row>
                            <Col span={24}>
                              Download as CSV <strong>(important)</strong>{" "}
                              <a
                                href="https://docs.google.com/spreadsheets/d/1R7AREHDESAyDixq-qCHmclxwe4kQp6K37ClnMMF76L4/edit?usp=sharing"
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                Leads Template (CSV file)
                              </a>{" "}
                              and fill in as many details as is known before
                              uploading.
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col span={24}>
                              <strong>Mandatory fields: </strong>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col span={24}>
                              Org Name, City, Company Type, Contact Person Name,
                              Contact Person Type, Lead Type
                            </Col>
                          </Row>
                        </React.Fragment>
                      }
                      type="info"
                    />

                    <br />
                    <Dragger
                      {...fileProps}
                      accept=".csv"
                      disabled={
                        addLeads.file !== null && addLeads.file.size > 0
                      }
                      showUploadList={false}
                      fileList={addLeads.fileList}
                    >
                      <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file here to upload
                      </p>
                      <p className="ant-upload-hint">
                        Verify data before uploading
                      </p>
                    </Dragger>
                    {addLeads.fileList.map(file => (
                      <div key={file.uid}>
                        {file.name}{" "}
                        <i
                          onClick={() => handleRemove(file.uid)}
                          className="far fa-trash-alt"
                          style={{
                            cursor: "pointer",
                            float: "right",
                            marginTop: "0.4em",
                            color: "3ff0000"
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    <Row>
                      <Col span={24}>
                        <Button
                          type="default"
                          size="small"
                          onClick={handleSubmitFile}
                        >
                          Upload
                        </Button>
                      </Col>
                      {/*<Col span={12}>
                      <Button
                        type="default"
                        size="small"
                        onClick={() =>
                          setAddLeads({
                            ...addLeads,
                            file: null
                          })
                        }
                      >
                        Reset
                      </Button>
                    </Col>*/}
                    </Row>
                    <Drawer
                      style={{ marginTop: "3em", marginLeft: "4em" }}
                      title={
                        <Row>
                          <Col span={12}>Uploaded Leads</Col>
                          <Col span={12}>
                            <Button
                              size="small"
                              type="default"
                              onClick={submitBulkLeads}
                              disabled={addLeads.dataError}
                            >
                              Save uploaded Leads
                            </Button>{" "}
                            <Alert
                              message={
                                <div>
                                  Note: I have disconnected the backend so the
                                  data is not "actually" saved.
                                </div>
                              }
                              type="info"
                            />
                          </Col>
                        </Row>
                      }
                      width={"100vw"}
                      closable={true}
                      onClose={() => {
                        setAddLeads({
                          ...addLeads,
                          showBulkData: false,
                          file: null
                        });
                      }}
                      visible={addLeads.showBulkData}
                    >
                      <Table
                        dataSource={addLeads.bulk}
                        columns={bulkColumns}
                        size="small"
                        pagination={{
                          size: "small",
                          total: addLeads.bulk.length,
                          showSizeChanger: true,
                          pageSizeOptions: [10, 25, 50, 100],
                          showTotal: showTotal
                        }}
                        rowKey="orgName"
                        bordered={false}
                        locale={{ emptyText: "No data detected" }}
                        scroll={{
                          scrollToFirstRowOnChange: true,
                          x: 2000,
                          y: "67vh"
                        }}
                        className="LargeTable"
                      />
                    </Drawer>
                  </Drawer>
                ) : !isEmpty(addLeads.single) ? (
                  <Drawer
                    title="Create New Contact (Lead)"
                    width={"33vw"}
                    closable={true}
                    onClose={() => {
                      setAddLeads({
                        ...addLeads,
                        show: false,
                        contactId: 0,
                        single: contactTemplate
                      });
                      setContacts(props.leadsData.contacts);
                    }}
                    visible={addLeads.show && !addLeads.isBulk}
                  >
                    <Form
                      layout="vertical"
                      size="default"
                      initialValues={addLeads.single}
                    >
                      <Form.Item
                        label="Org Name"
                        name="orgName"
                        value={addLeads.single.orgName}
                      >
                        <Select
                          showSearch
                          value={addLeads.single.orgName}
                          placeholder={"Select existing Org or Create New"}
                          defaultActiveFirstOption={false}
                          filterOption={false}
                          onSearch={handleSearch}
                          onChange={value => {
                            //console.log("value", value);

                            if (value === null) {
                              //let people = addLeads.single.people;
                              //people.data.push(contactTemplate.people.data[0]);

                              setAddLeads({
                                ...addLeads,
                                newContact: true,
                                newPerson: true
                              });
                            } else {
                              let org = props.leadsData.contacts.filter(
                                c => c.id === value
                              )[0];

                              //org.people.data.push(contactTemplate.people.data[0]);
                              setAddLeads({
                                ...addLeads,
                                single: org,
                                newContact: false
                              });
                            }
                          }}
                          notFoundContent={null}
                          bordered={false}
                        >
                          {searchContacts.map(c => (
                            <Option key={c.id} value={c.id}>
                              {c.orgName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      {!addLeads.newContact && (
                        <Form.Item label="Add New Contact Person to Org?">
                          <Radio.Group
                            name="newPerson"
                            value={addLeads.newPerson}
                          >
                            <Radio.Button
                              checked={addLeads.newPerson}
                              value={true}
                              onChange={event => {
                                let people = addLeads.single.people;
                                people.data.push(
                                  contactTemplate.people.data[0]
                                );
                                people.data[people.data.length - 1].id =
                                  people.data.length;
                                setAddLeads({
                                  ...addLeads,
                                  newPerson: event.target.value,
                                  single: {
                                    ...addLeads.single,
                                    people: people
                                  },
                                  contactId: addLeads.contactId + 1
                                });
                              }}
                              label="Yes"
                            >
                              Yes
                            </Radio.Button>
                            <Radio.Button
                              checked={!addLeads.newPerson}
                              value={false}
                              onChange={event =>
                                setAddLeads({
                                  ...addLeads,
                                  newPerson: event.target.value
                                })
                              }
                            >
                              No
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      )}
                      {addLeads.newPerson ? (
                        <React.Fragment>
                          <Form.Item label="Contact Name" name="fullName">
                            <Input
                              value={
                                addLeads.single.people.data[addLeads.contactId]
                                  .profile.fullName
                              }
                              onChange={event => {
                                //console.log("addLeads", addLeads);
                                let data = addLeads.single.people.data;
                                //console.log("temp data", data);
                                data[addLeads.contactId].profile.fullName =
                                  event.target.value;
                                data[addLeads.contactId].id =
                                  addLeads.contactId + 1;

                                setAddLeads({
                                  ...addLeads,
                                  single: {
                                    ...addLeads.single,
                                    people: {
                                      data: data
                                    }
                                  }
                                });
                              }}
                            />
                          </Form.Item>
                          <Form.Item label="Contact Type" name="contactType">
                            <Select
                              placeholder="Select a Contact Type"
                              optionFilterProp="children"
                              onChange={value => {
                                let data = addLeads.single.people.data;
                                //console.log("temp data", data);
                                data[addLeads.contactId].contactType = value;
                                setAddLeads({
                                  ...addLeads,
                                  single: {
                                    ...addLeads.single,
                                    people: {
                                      data: data
                                    }
                                  }
                                });
                              }}
                              value={
                                addLeads.single.people.data[addLeads.contactId]
                                  .contactType
                              }
                              bordered={false}
                            >
                              {props.commonData &&
                              props.commonData.contactTypes &&
                              props.commonData.contactTypes.length > 0 ? (
                                props.commonData.contactTypes.map(ct => (
                                  <Option key={ct.id} value={ct.id}>
                                    {ct.contactTypeName}
                                  </Option>
                                ))
                              ) : (
                                <Option key={0} value={0}>
                                  Unable to retrieve data
                                </Option>
                              )}
                            </Select>
                          </Form.Item>
                          <Form.Item label="Lead Type" name="type">
                            <Select
                              placeholder="Select a Lead Type"
                              optionFilterProp="children"
                              onChange={value => {
                                //console.log("addLeads", addLeads);
                                let data = addLeads.single.people.data;
                                //console.log("temp data", data);
                                data[addLeads.contactId].type = value;
                                setAddLeads({
                                  ...addLeads,
                                  single: {
                                    ...addLeads.single,
                                    people: {
                                      data: data
                                    }
                                  }
                                });
                              }}
                              value={
                                addLeads.single.people.data[addLeads.contactId]
                                  .type
                              }
                              bordered={false}
                            >
                              <Option key={1} value={"lead"}>
                                Lead
                              </Option>
                              <Option key={2} value={"signup"}>
                                Signup
                              </Option>
                              <Option key={3} value={"potential"}>
                                Potential
                              </Option>
                              <Option key={4} value={"newsletter"}>
                                Newsletter
                              </Option>
                            </Select>
                          </Form.Item>
                          {props.leadsData.campaigns &&
                            props.leadsData.campaigns.length > 0 && (
                              <Form.Item label="Source">
                                <Select
                                  placeholder="Select a Source"
                                  optionFilterProp="children"
                                  showSearch
                                  filterOption={(input, option) =>
                                    option.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                  onChange={value => {
                                    let peopleData =
                                      addLeads.single.people.data;
                                    peopleData[
                                      addLeads.contactId
                                    ].exposure.source = value;
                                    setAddLeads({
                                      ...addLeads,
                                      single: {
                                        ...addLeads.single,
                                        people: {
                                          ...addLeads.single.people,
                                          data: peopleData
                                        }
                                      }
                                    });
                                  }}
                                  value={
                                    addLeads.single.people.data[
                                      addLeads.contactId
                                    ].exposure.source
                                  }
                                  bordered={false}
                                >
                                  {props.leadsData.campaigns &&
                                  props.leadsData.campaigns.length > 0 ? (
                                    props.leadsData.campaigns.map(c => (
                                      <Option key={c.id} value={c.id}>
                                        {c.cmDetails.name}
                                      </Option>
                                    ))
                                  ) : (
                                    <Option key={0} value={0}>
                                      Please create a campaign first
                                    </Option>
                                  )}
                                </Select>
                              </Form.Item>
                            )}
                          <Form.Item label="City">
                            <Input
                              value={addLeads.single.address.city}
                              onChange={event => {
                                setAddLeads({
                                  ...addLeads,
                                  single: {
                                    ...addLeads.single,
                                    address: {
                                      ...addLeads.single.address,
                                      city: event.target.value
                                    }
                                  }
                                });
                              }}
                            />
                          </Form.Item>
                          <Form.Item label="Company Type">
                            <Select
                              placeholder="Select a Company Type"
                              optionFilterProp="children"
                              onChange={value => {
                                let ct = props.commonData.companyTypes.filter(
                                  ct => ct.id === value
                                )[0];
                                setAddLeads({
                                  ...addLeads,
                                  single: {
                                    ...addLeads.single,
                                    details: {
                                      ...addLeads.single.details,
                                      companyType: ct.typeName,
                                      companyTypeId: ct.id
                                    }
                                  }
                                });
                              }}
                              value={addLeads.single.details.companyTypeId}
                              bordered={false}
                            >
                              {props.commonData &&
                              props.commonData.companyTypes &&
                              props.commonData.companyTypes.length > 0 ? (
                                props.commonData.companyTypes.map(ct => (
                                  <Option key={ct.id} value={ct.id}>
                                    {ct.typeName}
                                  </Option>
                                ))
                              ) : (
                                <Option key={0} value={0}>
                                  Unable to retrieve data
                                </Option>
                              )}
                            </Select>
                          </Form.Item>
                          <Form.Item label="Industry">
                            <Select
                              placeholder="Select an Industry"
                              optionFilterProp="children"
                              showSearch
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={value => {
                                setAddLeads({
                                  ...addLeads,
                                  single: {
                                    ...addLeads.single,
                                    details: {
                                      ...addLeads.single.details,
                                      industry: value
                                    }
                                  }
                                });
                              }}
                              value={addLeads.single.details.industry}
                              bordered={false}
                            >
                              {industries && industries.length > 0 ? (
                                industries.map(ct => (
                                  <Option key={ct} value={ct}>
                                    {ct}
                                  </Option>
                                ))
                              ) : (
                                <Option key={0} value={0}>
                                  Unable to retrieve data
                                </Option>
                              )}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            label="Emp. Size"
                            value={addLeads.single.details.empSize}
                          >
                            <InputNumber
                              type="number"
                              value={addLeads.single.details.empSize}
                              onChange={value => {
                                if (!isNaN(value)) {
                                  setAddLeads({
                                    ...addLeads,
                                    single: {
                                      ...addLeads.single,
                                      details: {
                                        ...addLeads.single.details,
                                        empSize: value
                                      }
                                    }
                                  });
                                }
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            label="Website URL"
                            value={addLeads.single.details.website}
                          >
                            <Input
                              value={addLeads.single.details.website}
                              onChange={event => {
                                setAddLeads({
                                  ...addLeads,
                                  single: {
                                    ...addLeads.single,
                                    details: {
                                      ...addLeads.single.details,
                                      website: event.target.value
                                    }
                                  }
                                });
                              }}
                            />
                          </Form.Item>
                          <Form.Item label="Contact Phone" name="mainPhone">
                            <Input
                              type="tel"
                              value={
                                addLeads.single.people.data[addLeads.contactId]
                                  .contactInfo.mainPhone
                              }
                              onChange={event => {
                                let peopleData = addLeads.single.people.data;
                                peopleData[
                                  addLeads.contactId
                                ].contactInfo.mainPhone = event.target.value;

                                setAddLeads({
                                  ...addLeads,
                                  single: {
                                    ...addLeads.single,
                                    people: {
                                      ...addLeads.single.people,
                                      data: peopleData
                                    }
                                  }
                                });
                              }}
                            />
                          </Form.Item>
                          <Form.Item label="Contact Email" name="mainEmail">
                            <Input
                              type="email"
                              value={
                                addLeads.single.people.data[addLeads.contactId]
                                  .contactInfo.mainEmail
                              }
                              onChange={event => {
                                let peopleData = addLeads.single.people.data;
                                peopleData[
                                  addLeads.contactId
                                ].contactInfo.mainEmail = event.target.value;

                                setAddLeads({
                                  ...addLeads,
                                  single: {
                                    ...addLeads.single,
                                    people: {
                                      ...addLeads.single.people,
                                      data: peopleData
                                    }
                                  }
                                });
                              }}
                            />
                          </Form.Item>
                          <br />
                          <Row>
                            <Col span={24}>
                              <Button
                                type="default"
                                size="small"
                                onClick={submitSingleLead}
                                disabled={!validateLeadForm()}
                              >
                                Save Lead
                              </Button>
                            </Col>
                          </Row>
                        </React.Fragment>
                      ) : !addLeads.newContact ? (
                        <React.Fragment>
                          <Row>
                            <Col span={24}>
                              Org and Contact exists. To make edits please
                              choose Contacts from the side menu.
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col span={24}>
                              <strong>Current Contact Person</strong>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col span={8}>Name</Col>
                            <Col span={16}>
                              {addLeads.single.people.data[0].profile.fullName
                                ? addLeads.single.people.data[0].profile
                                    .fullName
                                : addLeads.single.people.data[0].profile.name
                                ? addLeads.single.people.data[0].profile.name
                                : ""}
                            </Col>
                          </Row>
                          <Row>
                            <Col span={8}>Type</Col>
                            <Col span={16}>
                              {addLeads.single.people.data[0].type}
                            </Col>
                          </Row>
                          <Row>
                            <Col span={8}>Email</Col>
                            <Col span={16}>
                              {
                                addLeads.single.people.data[0].contactInfo
                                  .mainEmail
                              }
                            </Col>
                          </Row>
                          <Row>
                            <Col span={8}>Phone</Col>
                            <Col span={16}>
                              {
                                addLeads.single.people.data[0].contactInfo
                                  .mainPhone
                              }
                            </Col>
                          </Row>
                        </React.Fragment>
                      ) : null}
                    </Form>
                  </Drawer>
                ) : null
              ) : null}
              <Campaigns
                visible={addCampaigns.show}
                contacts={props.leadsData.unassigned.all}
                addCampaigns={addCampaigns}
                setAddCampaigns={setAddCampaigns}
                campaigns={props.leadsData.campaigns}
                selectedRecords={selectedRecords}
                setLeads={props.setLeads}
                leadsData={props.leadsData}
                masterCampaigns={props.leadsData.campaigns}
                cmTemplate={
                  props.leadsData.campaigns.length > 0
                    ? cmTemplate.template
                    : cmTemplate.first
                }
                currency={props.tenantData.tenant.moreDetails.currency}
                currencies={currencies}
                tenantId={props.tenantId}
                userId={props.userId}
                users={props.tenantData.users}
                stage={props.stage}
                authToken={props.authToken}
                setSelected={setSelected}
              />
            </Row>
          ) : (
            <Explanation />
          )
        ) : (
          <Space size="large" style={{ height: "60vh" }}>
            <Spin tip="Getting stuff organized..." size="large" />
          </Space>
        )}
      </Content>
      {/*<Sider>
        <Sidebar
          collapsed={true}
          theme={props.theme}
          setRightMenu={setRightMenu}
          rightMenu={rightMenu}
        />
      </Sider>*/}
    </Layout>
  );
};

export default Leads;
