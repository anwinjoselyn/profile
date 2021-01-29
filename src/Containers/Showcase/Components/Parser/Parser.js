import React from "react";

import { Card, Row, Col } from "antd";

import Leads from "./Components/Leads";

import "./Parser.css";

const leadsData = require("../../../../libs/leadsData.json");
const tenantData = require("../../../../libs/tenantData.json");
const token = require("../../../../libs/token.json");

const Parser = props => {
  return (
    <Card className="Parser" bordered={false}>
      <Row>
        <Col span={24}>
          <Leads
            leadsData={leadsData}
            theme="light"
            tenantId={1}
            userId={1}
            tenantData={tenantData}
            stage="dev"
            authToken=""
            commonData={props.commonData}
            token={token}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Parser;
