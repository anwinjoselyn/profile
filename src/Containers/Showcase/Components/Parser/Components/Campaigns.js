//import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import {
  Drawer,
  Row,
  Col,
  Form,
  Select,
  Button,
  Input,
  DatePicker,
  InputNumber,
  Divider,
  Checkbox,
  message,
  Radio
} from "antd";

import { parseISO, isValid } from "date-fns";
import moment from "moment";

import axios from "axios";

import "../Parser.css";

const { Option } = Select;
const { TextArea } = Input;

const Campaigns = props => {
  //console.log("props.addCampaigns.single", props.addCampaigns.single);
  const [newCampaign, setNewCampaign] = useState({
    addNew: false,
    data: {
      ...props.cmTemplate,
      cmDates: {
        startDate: new Date(),
        endDate: new Date(),
        actualStartDate: new Date(),
        actualEndDate: new Date()
      },
      createdBy: props.userId,
      userId: props.userId,
      tenantId: props.tenantId
    },
    confirm: false
  });

  const validateForm = () => {
    return (
      newCampaign.data.cmDetails.name.length > 2 &&
      newCampaign.data.cmDetails.objective.length > 2 &&
      newCampaign.data.cmType.length > 2 &&
      newCampaign.data.cmMedium.length > 2 &&
      newCampaign.data.cmChannelType.length > 2 &&
      newCampaign.data.cmChannel.length > 2 &&
      (newCampaign.confirm ||
        (newCampaign.data.cmDates.startDate !== "" &&
          isValid(parseISO(newCampaign.data.cmDates.startDate)) &&
          (newCampaign.data.cmDates.endDate !== "" &&
            isValid(parseISO(newCampaign.data.cmDates.endDate))) &&
          (newCampaign.data.cmDates.actualStartDate !== "" &&
            isValid(parseISO(newCampaign.data.cmDates.actualStartDate))) &&
          (newCampaign.data.cmDates.actualEndDate !== "" &&
            isValid(parseISO(newCampaign.data.cmDates.actualEndDate))))) &&
      !isNaN(newCampaign.data.cmBudgets.estCost) &&
      !isNaN(newCampaign.data.cmBudgets.estEarning) &&
      !isNaN(newCampaign.data.cmBudgets.actCost) &&
      !isNaN(newCampaign.data.cmBudgets.actEarning) &&
      !isNaN(newCampaign.data.userId) &&
      !isNaN(newCampaign.data.createdBy) &&
      !isNaN(newCampaign.data.tenantId)
    );
  };

  const submitCampaigns = async e => {
    e.preventDefault();

    //console.log("newCampaign.data", newCampaign.data);

    let contacts = [];
    /*
    let contacts = props.contacts.filter(c => {
      if (
        newCampaign.data.cmOutput.estReach.find(id => parseInt(id) === c.id)
      ) {
        return c;
      }
    });


    newCampaign.data.cmOutput.estReach.forEach(id => {
      let cont = props.contacts.filter(c => c.id === parseInt(id))[0];
      console.log("cont", cont);
      contacts = [...contacts, cont];
    });
*/

    newCampaign.data.cmOutput.estReach.forEach(id => {
      //console.log("id", id);
      contacts = [
        ...contacts,
        props.contacts.filter(c => c.id === parseInt(id))[0]
      ];
    });

    //console.log("contacts", contacts);

    let updatedData = {
      campaign: newCampaign.data,
      updateContacts: true,
      contacts: contacts
    };

    //console.log("updatedData", updatedData);

    try {
      const result = await axios({
        method: "POST",
        url: `/${props.stage}/v3/campaigns/create`,
        headers: { Authorization: `${props.authToken}` },
        data: updatedData
      });
      //console.log("result.data", result.data);

      if (
        result.data &&
        result.data !== "Tenant ID does not match resource requested"
      ) {
        message.success("Campaign created and contacts assigned to campaign");
        setNewCampaign({
          addNew: false,
          data: {
            ...props.cmTemplate,
            cmDates: {
              startDate: new Date(),
              endDate: new Date(),
              actualStartDate: new Date(),
              actualEndDate: new Date()
            }
          },
          confirm: false
        });

        props.setLeads({
          ...props.leadsData,
          campaigns: [...props.leadsData.campaigns, result.data.campaign]
        });

        props.recalculateContactData([
          ...props.leadsData.contacts,
          ...result.data.contacts
        ]);

        props.setAddCampaigns({
          show: false,
          single: props.cmTemplate,
          records: []
        });

        props.setSelected({
          ...props.selectedRecords,
          hasSelected: false,
          selectedRowKeys: []
        });
      } else {
        message.error("Sorry, something went wrong!");
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const updateToCampaign = async e => {
    e.preventDefault();

    //console.log("props.addCampaigns.single", props.addCampaigns.single);

    let contacts = [];

    props.selectedRecords.selectedRowKeys.forEach(id => {
      //console.log("id", id);
      contacts = [
        ...contacts,
        props.contacts.filter(c => c.id === parseInt(id))[0]
      ];
    });

    //console.log("contacts", contacts);

    let updatedData = {
      campaign: props.addCampaigns.single,
      updateContacts: true,
      contacts: contacts
    };

    //console.log("updatedData", updatedData);

    try {
      const result = await axios({
        method: "PUT",
        url: `/${props.stage}/v3/campaigns/byid/${updatedData.campaign.id}`,
        headers: { Authorization: `${props.authToken}` },
        data: updatedData
      });
      //console.log("result.data", result.data);

      if (
        result.data &&
        result.data !== "Tenant ID does not match resource requested"
      ) {
        message.success("Contacts assigned to selected campaign");
        setNewCampaign({
          addNew: false,
          data: {
            ...props.cmTemplate,
            cmDates: {
              startDate: new Date(),
              endDate: new Date(),
              actualStartDate: new Date(),
              actualEndDate: new Date()
            }
          },
          confirm: false
        });

        props.setLeads({
          ...props.leadsData,
          campaigns: [...props.leadsData.campaigns, result.data.campaign]
        });

        props.recalculateContactData([
          ...props.leadsData.contacts,
          ...result.data.contacts
        ]);

        props.setAddCampaigns({
          show: false,
          single: props.cmTemplate,
          records: []
        });

        props.setSelected({
          ...props.selectedRecords,
          hasSelected: false,
          selectedRowKeys: []
        });
      } else {
        message.error("Sorry, something went wrong!");
      }
    } catch (error) {
      //console.log("error", error);
    }
  };

  const createNewForm = () => {
    return (
      <React.Fragment>
        {!newCampaign.addNew && (
          <Row>
            <Col span={24}>
              No Campaigns created yet.
              <br />
              <br />
              <Button
                size="small"
                type="default"
                onClick={() =>
                  setNewCampaign({
                    ...newCampaign,
                    addNew: true
                  })
                }
              >
                Add New Campaign
              </Button>
            </Col>
          </Row>
        )}
        {newCampaign.addNew && (
          <Form initialValues={newCampaign.data}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item>
                  <label>Name</label>
                  <Input
                    value={newCampaign.data.cmDetails.name}
                    onChange={event =>
                      setNewCampaign({
                        ...newCampaign,
                        data: {
                          ...newCampaign.data,
                          cmDetails: {
                            ...newCampaign.data.cmDetails,
                            name: event.target.value
                          }
                        }
                      })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <label>Objective</label>
                  <TextArea
                    rows={1}
                    value={newCampaign.data.cmDetails.objective}
                    onChange={event =>
                      setNewCampaign({
                        ...newCampaign,
                        data: {
                          ...newCampaign.data,
                          cmDetails: {
                            ...newCampaign.data.cmDetails,
                            objective: event.target.value
                          }
                        }
                      })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item>
                  <label>Description</label>
                  <TextArea
                    rows={2}
                    value={newCampaign.data.cmDetails.description}
                    onChange={event =>
                      setNewCampaign({
                        ...newCampaign,
                        data: {
                          ...newCampaign.data,
                          cmDetails: {
                            ...newCampaign.data.cmDetails,
                            description: event.target.value
                          }
                        }
                      })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <label>Campaign Owner</label>
                  <Select
                    placeholder="Select a User"
                    optionFilterProp="children"
                    onChange={value => {
                      setNewCampaign({
                        ...newCampaign,
                        data: {
                          ...newCampaign.data,
                          userId: value
                        }
                      });
                    }}
                    value={newCampaign.data.userId}
                    bordered={false}
                  >
                    {props.users && props.users.length > 0 ? (
                      props.users.map(u => (
                        <Option key={u.id} value={u.id}>
                          {u.profile.fullName}
                        </Option>
                      ))
                    ) : (
                      <Option key={0} value={0}>
                        Unable to retrieve Users
                      </Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Divider plain>Sources / Tools</Divider>
            <Row gutter={8}>
              <Col span={6}>
                <Form.Item>
                  <label>Type</label>
                  <Select
                    placeholder="Select a Campaign Type"
                    optionFilterProp="children"
                    onChange={value => {
                      setNewCampaign({
                        ...newCampaign,
                        data: {
                          ...newCampaign.data,
                          cmType: value
                        }
                      });
                    }}
                    value={newCampaign.data.cmType}
                    bordered={false}
                  >
                    {props.masterCampaigns &&
                    props.masterCampaigns.cmTypes &&
                    props.masterCampaigns.cmTypes.length > 0 ? (
                      props.masterCampaigns.cmTypes.map(cm => (
                        <Option key={cm.id} value={cm.name}>
                          {cm.name}
                        </Option>
                      ))
                    ) : (
                      <Option key={0} value={0}>
                        Unable to retrieve data
                      </Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <label>Medium</label>
                  <Select
                    placeholder="Select a Medium"
                    optionFilterProp="children"
                    onChange={value => {
                      setNewCampaign({
                        ...newCampaign,
                        data: {
                          ...newCampaign.data,
                          cmMedium: value
                        }
                      });
                    }}
                    value={newCampaign.data.cmMedium}
                    bordered={false}
                  >
                    {props.masterCampaigns &&
                    props.masterCampaigns.cmMediums &&
                    props.masterCampaigns.cmMediums.length > 0 ? (
                      props.masterCampaigns.cmMediums.map(cm => (
                        <Option key={cm.id} value={cm.name}>
                          {cm.name}
                        </Option>
                      ))
                    ) : (
                      <Option key={0} value={0}>
                        Unable to retrieve data
                      </Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <label>Channel Type</label>
                  <Select
                    placeholder="Select a Channel Type"
                    optionFilterProp="children"
                    onChange={value => {
                      setNewCampaign({
                        ...newCampaign,
                        data: {
                          ...newCampaign.data,
                          cmChannelType: value
                        }
                      });
                    }}
                    value={newCampaign.data.cmChannelType}
                    bordered={false}
                  >
                    {props.masterCampaigns &&
                    props.masterCampaigns.cmChannelTypes &&
                    props.masterCampaigns.cmChannelTypes.length > 0 ? (
                      props.masterCampaigns.cmChannelTypes.map(cm => (
                        <Option key={cm.id} value={cm.name}>
                          {cm.name}
                        </Option>
                      ))
                    ) : (
                      <Option key={0} value={0}>
                        Unable to retrieve data
                      </Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <label>Channel</label>
                  <Select
                    placeholder="Select a Channel"
                    optionFilterProp="children"
                    onChange={value => {
                      setNewCampaign({
                        ...newCampaign,
                        data: {
                          ...newCampaign.data,
                          cmChannel: value
                        }
                      });
                    }}
                    value={newCampaign.data.cmChannel}
                    bordered={false}
                  >
                    {props.masterCampaigns &&
                    props.masterCampaigns.cmChannels &&
                    props.masterCampaigns.cmChannels.length > 0 ? (
                      props.masterCampaigns.cmChannels.map(cm => (
                        <Option key={cm.id} value={cm.name}>
                          {cm.name}
                        </Option>
                      ))
                    ) : (
                      <Option key={0} value={0}>
                        Unable to retrieve data
                      </Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Divider plain>Dates</Divider>
            <Row>
              <Col span={24}>
                <Checkbox
                  value={newCampaign.data.cmDetails.isForever}
                  checked={newCampaign.data.cmDetails.isForever}
                  onChange={e => {
                    setNewCampaign({
                      ...newCampaign,
                      data: {
                        ...newCampaign.data,
                        cmDetails: {
                          ...newCampaign.data.cmDetails,
                          isForever: e.target.checked
                        }
                      }
                    });
                  }}
                />
                <label>
                  Check this box for a generic campaign that has no start or end
                  date
                </label>
              </Col>
            </Row>
            <br />
            {!newCampaign.data.cmDetails.isForever && (
              <Row gutter={8}>
                <Col span={6}>
                  <Form.Item>
                    <Row>
                      <Col span={24}>
                        <label>Est. Start Date</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <DatePicker
                          allowClear={false}
                          value={moment(newCampaign.data.cmDates.startDate)}
                          format="YYYY-MM-DD"
                          size="small"
                          onChange={(date, dateString) =>
                            setNewCampaign({
                              ...newCampaign,
                              data: {
                                ...newCampaign.data,
                                cmDates: {
                                  ...newCampaign.data.cmDates,
                                  startDate: dateString,
                                  actualStartDate: dateString
                                }
                              }
                            })
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <Row>
                      <Col span={24}>
                        <label>Est. End Date</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <DatePicker
                          value={moment(newCampaign.data.cmDates.endDate)}
                          allowClear={false}
                          format="YYYY-MM-DD"
                          size="small"
                          disabledDate={date =>
                            date &&
                            moment(date).isBefore(
                              newCampaign.data.cmDates.startDate
                            )
                          }
                          onChange={(date, dateString) =>
                            setNewCampaign({
                              ...newCampaign,
                              data: {
                                ...newCampaign.data,
                                cmDates: {
                                  ...newCampaign.data.cmDates,
                                  endDate: dateString,
                                  actualEndDate: dateString
                                }
                              }
                            })
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <Row>
                      <Col span={24}>
                        <label>Actual Start Date</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <DatePicker
                          allowClear={false}
                          value={moment(
                            newCampaign.data.cmDates.actualStartDate
                          )}
                          format="YYYY-MM-DD"
                          size="small"
                          onChange={(date, dateString) =>
                            setNewCampaign({
                              ...newCampaign,
                              data: {
                                ...newCampaign.data,
                                cmDates: {
                                  ...newCampaign.data.cmDates,
                                  actualStartDate: dateString
                                }
                              }
                            })
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <Row>
                      <Col span={24}>
                        <label>Actual End Date</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <DatePicker
                          allowClear={false}
                          disabledDate={date =>
                            date &&
                            moment(date).isBefore(
                              newCampaign.data.cmDates.actualStartDate
                            )
                          }
                          value={moment(newCampaign.data.cmDates.actualEndDate)}
                          format="YYYY-MM-DD"
                          size="small"
                          onChange={(date, dateString) =>
                            setNewCampaign({
                              ...newCampaign,
                              data: {
                                ...newCampaign.data,
                                cmDates: {
                                  ...newCampaign.data.cmDates,
                                  actualEndDate: dateString
                                }
                              }
                            })
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
            )}
            <Divider plain>Costs</Divider>
            <Row gutter={8}>
              <Col span={6}>
                <Form.Item>
                  <label>Budgeted Cost</label>
                  <InputNumber
                    value={newCampaign.data.cmBudgets.estCost}
                    formatter={value =>
                      props.currency &&
                      props.currencies &&
                      props.currencies.data.find(c => c.cc === props.currency)
                        ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          " " +
                          props.currencies.data.filter(
                            c => c.cc === props.currency
                          )[0].symbol
                        : value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    onChange={value =>
                      setNewCampaign({
                        ...newCampaign,
                        data: {
                          ...newCampaign.data,
                          cmBudgets: {
                            ...newCampaign.data.cmBudgets,
                            estCost: value
                          }
                        }
                      })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <label>Est. Earnings</label>
                  <InputNumber
                    value={newCampaign.data.cmBudgets.estEarning}
                    formatter={value =>
                      props.currency &&
                      props.currencies &&
                      props.currencies.data.find(c => c.cc === props.currency)
                        ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          " " +
                          props.currencies.data.filter(
                            c => c.cc === props.currency
                          )[0].symbol
                        : value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    onChange={value =>
                      setNewCampaign({
                        ...newCampaign,
                        data: {
                          ...newCampaign.data,
                          cmBudgets: {
                            ...newCampaign.data.cmBudgets,
                            estEarning: value
                          }
                        }
                      })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <label>Actual Cost</label>
                  <InputNumber
                    value={newCampaign.data.cmBudgets.actCost}
                    formatter={value =>
                      props.currency &&
                      props.currencies &&
                      props.currencies.data.find(c => c.cc === props.currency)
                        ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          " " +
                          props.currencies.data.filter(
                            c => c.cc === props.currency
                          )[0].symbol
                        : value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    onChange={value =>
                      setNewCampaign({
                        ...newCampaign,
                        data: {
                          ...newCampaign.data,
                          cmBudgets: {
                            ...newCampaign.data.cmBudgets,
                            actCost: value
                          }
                        }
                      })
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <label>Actual Earnings</label>
                  <InputNumber
                    value={newCampaign.data.cmBudgets.actEarning}
                    formatter={value =>
                      props.currency &&
                      props.currencies &&
                      props.currencies.data.find(c => c.cc === props.currency)
                        ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          " " +
                          props.currencies.data.filter(
                            c => c.cc === props.currency
                          )[0].symbol
                        : value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    onChange={value =>
                      setNewCampaign({
                        ...newCampaign,
                        data: {
                          ...newCampaign.data,
                          cmBudgets: {
                            ...newCampaign.data.cmBudgets,
                            actEarning: value
                          }
                        }
                      })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Checkbox
                  value={newCampaign.confirm}
                  checked={newCampaign.confirm}
                  onChange={e => {
                    if (e.target.checked) {
                      setNewCampaign({
                        ...newCampaign,
                        confirm: e.target.checked,
                        data: {
                          ...newCampaign.data,
                          cmOutput: {
                            ...newCampaign.data.cmOutput,
                            estReach: [
                              ...newCampaign.data.cmOutput.estReach,
                              ...props.selectedRecords.selectedRowKeys
                            ]
                          }
                        }
                      });
                    } else {
                      let estReach = newCampaign.data.cmOutput.estReach;

                      if (
                        estReach.find(val =>
                          props.selectedRecords.selectedRowKeys.includes(val)
                        )
                      ) {
                        estReach = estReach.filter(
                          val =>
                            !props.selectedRecords.selectedRowKeys.includes(val)
                        );
                      }
                      setNewCampaign({
                        ...newCampaign,
                        confirm: e.target.checked,
                        data: {
                          ...newCampaign.data,
                          cmOutput: {
                            ...newCampaign.data.cmOutput,
                            estReach: estReach
                          }
                        }
                      });
                    }
                  }}
                />
                <label>Automatically add selected Leads to this Campaign</label>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <Button
                  size="small"
                  type="default"
                  disabled={!validateForm()}
                  onClick={submitCampaigns}
                >
                  Create New Campaign & Add the Selected Leads
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </React.Fragment>
    );
  };

  return (
    <div>
      {props.visible ? (
        <Drawer
          title={
            newCampaign.addNew ? "Create New Campaign" : "Assign to Campaign"
          }
          width={!newCampaign.addNew ? "33vw" : "50vw"}
          closable={true}
          visible={props.addCampaigns.show}
          className="Campaigns"
          onClose={() => {
            newCampaign.addNew
              ? setNewCampaign({
                  addNew: false,
                  data: {
                    ...props.cmTemplate,
                    cmDates: {
                      startDate: new Date(),
                      endDate: new Date(),
                      actualStartDate: new Date(),
                      actualEndDate: new Date()
                    }
                  },
                  confirm: false
                })
              : props.setAddCampaigns({
                  show: false,
                  single: props.cmTemplate,
                  records: []
                });
          }}
        >
          <Row>
            <Col span={24}>
              {!newCampaign.addNew &&
              props.campaigns &&
              props.campaigns.length > 0 ? (
                <React.Fragment>
                  <Form.Item label="Campaign">
                    <Select
                      placeholder="Select a Campaign"
                      optionFilterProp="children"
                      onChange={value => {
                        let cm = props.campaigns.filter(c => c.id === value)[0];

                        cm.cmOutput.estReach = [
                          ...cm.cmOutput.estReach,
                          ...props.selectedRecords.selectedRowKeys
                        ];

                        props.setAddCampaigns({
                          ...props.addCampaigns,
                          single: cm
                        });
                      }}
                      value={props.addCampaigns.single.id}
                      bordered={false}
                    >
                      {props.campaigns && props.campaigns.length > 0 ? (
                        props.campaigns.map(cm => (
                          <Option key={cm.id} value={cm.id}>
                            {cm.cmDetails.name}
                          </Option>
                        ))
                      ) : (
                        <Option key={0} value={0}>
                          Unable to retrieve data
                        </Option>
                      )}
                    </Select>
                  </Form.Item>
                  <Row>
                    <Col>
                      <Button
                        size="small"
                        type="default"
                        disabled={
                          props.addCampaigns.single.id &&
                          props.addCampaigns.single.id !== null
                            ? false
                            : true
                        }
                        onClick={updateToCampaign}
                      >
                        Add selected Leads to Campaign
                      </Button>
                    </Col>
                  </Row>
                  <Divider plain>Or</Divider>
                  <Form.Item>
                    <Col>
                      <label>Create New Campaign and assign Leads</label>
                    </Col>
                    <br />
                    <Col>
                      <Radio.Group name="addNew" value={newCampaign.addNew}>
                        <Radio.Button
                          value={true}
                          onChange={event =>
                            setNewCampaign({
                              ...newCampaign,
                              addNew: event.target.value
                            })
                          }
                        >
                          Yes
                        </Radio.Button>
                        <Radio.Button
                          value={false}
                          onChange={event =>
                            setNewCampaign({
                              ...newCampaign,
                              addNew: event.target.value
                            })
                          }
                        >
                          No
                        </Radio.Button>
                      </Radio.Group>
                    </Col>
                  </Form.Item>
                </React.Fragment>
              ) : (
                createNewForm()
              )}
            </Col>
          </Row>
        </Drawer>
      ) : null}
    </div>
  );
};

export default Campaigns;
