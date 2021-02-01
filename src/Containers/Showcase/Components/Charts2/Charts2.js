import React, { useState, useEffect } from "react";

import { Card, Row, Col } from "antd";

import { Pie, Gauge } from "@ant-design/charts";

//import axios from "axios";

import "../../Showcase.css";

const Charts2 = props => {
  //console.log("props.data", props.data);
  const [percent, setPercent] = useState(0.2);
  const [rangeColor, setRangeColor] = useState("# F4664A");
  const color = ["#F4664A", "#FAAD14", "#30BF78"];
  let ref;
  const getColor = percent => {
    return percent < 0.4 ? color[0] : percent < 0.6 ? color[1] : color[2];
  };
  const config2 = {
    percent,
    range: { color: rangeColor },
    indicator: {
      pointer: { style: { stroke: "#D0D0D0" } },
      pin: { style: { stroke: "#D0D0D0" } }
    },
    axis: {
      label: {
        formatter: function formatter(v) {
          return Number(v) * 100;
        }
      },
      subTickLine: { count: 3 }
    },
    statistic: {
      content: {
        formatter: function formatter(_ref) {
          var percent = _ref.percent;
          return "Up Votes: ".concat((percent * 100).toFixed(0), "%");
        }
      },
      style: { fontSize: 60 }
    },
    animation: false
  };

  useEffect(() => {
    if (props.selectedPlaybook.view) {
      let data = 0;

      if (props.selectedPlaybook.type === "script")
        data = props.selectedPlaybook.record.scriptData.upVotes;
      if (props.selectedPlaybook.type === "template")
        data = props.selectedPlaybook.record.eTemplateData.upVotes;

      const interval = setInterval(function() {
        setPercent(data);
        setRangeColor(getColor(data));
      }, 500);
    }
  }, [props.selectedPlaybook]);

  const data = [
    {
      type: "Plays",
      value:
        props.data && props.data.allPlays && props.data.allPlays.length > 0
          ? props.data.allPlays.length
          : 0
    },
    {
      type: "Scripts",
      value:
        props.data && props.data.allScripts && props.data.allScripts.length > 0
          ? props.data.allScripts.length
          : 0
    },
    {
      type: "Templates",
      value:
        props.data &&
        props.data.allTemplates &&
        props.data.allTemplates.length > 0
          ? props.data.allTemplates.length
          : 0
    },
    {
      type: "Collaterals",
      value:
        props.data &&
        props.data.allCollaterals &&
        props.data.allCollaterals.length > 0
          ? props.data.allCollaterals.length
          : 0
    }
  ];

  const config = {
    autoFit: true,
    width: "auto",
    height: "auto",
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-20%",
      content: function content(_ref) {
        var percent = _ref.percent;
        return "".concat(percent * 100, "%");
      },
      style: {
        width: "100%",
        height: "100%",
        fontSize: 14,
        textAlign: "center"
      }
    },
    interactions: [{ type: "element-active" }]
  };

  return (
    <Card
      className="Charts2"
      bordered={false}
      title={
        props.selectedPlaybook &&
        props.selectedPlaybook.view &&
        props.selectedPlaybook.record &&
        props.selectedPlaybook.record.details
          ? props.selectedPlaybook.record.details.name + " Stats"
          : "Playbook Quick Stats"
      }
    >
      {props.selectedPlaybook && props.selectedPlaybook.view ? (
        <Row>
          <Col span={24}>
            <Gauge {...config2} chartRef={chartRef => (ref = chartRef)} />
          </Col>
        </Row>
      ) : (
        <React.Fragment>
          <Row>
            <Col span={24}>
              <Card
                size="small"
                className="LongCard"
                title={
                  <div
                    style={{
                      display: "block",
                      textAlign: "center",
                      opacity: "0.6"
                    }}
                  >
                    Total
                  </div>
                }
              >
                {props.data &&
                props.data.allPlaybooks &&
                props.data.allPlaybooks.length > 0
                  ? props.data.allPlaybooks.length
                  : 0}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Pie {...config} />
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Card>
  );
};

export default Charts2;
