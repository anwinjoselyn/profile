import React from "react";

import { Card, Row, Col } from "antd";

//import { CloudDownloadOutlined } from "@ant-design/icons";

import "./Resume.css";

import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";

const Resume = props => {
  return (
    <Card className="Resume c22" bordered={false}>
      <Row className="MainRow">
        <Col span={24} className="MainColumn">
          <p className="c20 c36">
            <span className="c33 c7 c34"></span>
          </p>
          {/*<a id="t.e25317bfa24bf1a0a2c2f0474c5fac8ad2806728"></a>
          <a id="t.0"></a>*/}
          <table className="c13">
            <tbody>
              <tr className="c35">
                <td className="c28" colSpan="1" rowSpan="1">
                  <p className="c31 title" id="h.x8fm1uorkbaw">
                    <span className="c4 c43">Anwin Joselyn</span>
                    <span className="PseudoButton">
                      <a
                        href="../../assets/FullStackAnwin.pdf"
                        download
                        target="_blank"
                      >
                        <i className="fas fa-cloud-download-alt" /> Download CV
                      </a>
                    </span>
                  </p>
                  <p className="c15 subtitle" id="h.ymi089liagec">
                    <span className="c1 c27">Full Stack Engineer </span>
                    <span className="c1 c7 c27 c39">(Frontend focus)</span>
                  </p>
                </td>
                <td className="c42" colSpan="1" rowSpan="1">
                  <p className="c15">
                    <span className="c8 c7">
                      <i className="fas fa-map-marker-alt TopRightIcon" /> Pune,
                      (Remote OK)
                    </span>
                  </p>
                  <p className="c15">
                    <span className="c4 c8">
                      <i className="fas fa-mobile-alt TopRightIcon" /> +91 96200
                      23555
                    </span>
                  </p>
                  <p className="c15 c20">
                    <span className="c8 c4"></span>
                  </p>
                  <p className="c15">
                    <span className="c24 c4">
                      <i className="fas fa-at TopRightIcon" />{" "}
                      <a className="c26" href="mailto:anwinjpb@gmail.com">
                        anwinjpb@gmail.com
                      </a>
                    </span>
                  </p>
                  <p className="c15">
                    <i className="fas fa-globe TopRightIcon" />{" "}
                    <span className="c4 c24">
                      <a className="c26" href="https://myplaybook.in/">
                        https://myplaybook.in/
                      </a>
                    </span>
                  </p>
                </td>
              </tr>
              <tr className="c35">
                <td className="c28" colSpan="1" rowSpan="1">
                  <p className="c10">
                    <span className="c2">
                      Problem solver with an analytical and driven mindset.
                      Dedicated to achieving demanding development objectives
                      according to tight schedules and producing good code.
                      Completely self-taught and able to find effective
                      solutions to complex product requirements.
                    </span>
                  </p>
                  <h1 className="c19" id="h.2atmuaw6ke1l">
                    <span className="c14 c4">EXPERIENCE</span>
                  </h1>
                  <h2 className="c6" id="h.i2bpt3h8qvw8">
                    <span>Playbook Software,</span>
                    <span className="c7">&nbsp;Pune &mdash; </span>
                    <span className="c7 c40">Full Stack Engineer</span>
                  </h2>
                  <h3 className="c12" id="h.j6jk9y9ljyou">
                    <span>April 2019</span>
                    <span className="c23 c7">&nbsp;- PRESENT</span>
                  </h3>
                  <ul className="c3 lst-kix_lec2477ivtm7-0 start">
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Developed the Idea behind Playbook - a Sales &amp;
                        Revenue Management software
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Created the Architecture for the web app
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Coded, tested and deployed back-end APIs on an
                        Express/Node server on EC2 instance
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Designed, coded, tested and deployed front-end via
                        Cloudfront/S3 written using Javascript &amp; ReactJS
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Bug fixes, maintenance and further enhancements
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        RDS Postgres Engine for persistent storage
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        New version development with back-end on AWS-Serverless
                        Microservices
                      </span>
                    </li>
                  </ul>
                  <h2 className="c6" id="h.1yv1lfuyt9g">
                    <span>sumHR Software, </span>
                    <span className="c7">Pune &mdash; </span>
                    <span className="c7 c21">
                      Head - Biz Dev &amp; Renewals
                    </span>
                  </h2>
                  <h3 className="c12" id="h.ab0z80mtfh1j">
                    <span>April 2016 &ndash; January 2019</span>
                  </h3>
                  <ul className="c3 lst-kix_qw52od1oyadm-0 start">
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Grew from a Senior executive role to a Management role
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Responsible for all incoming revenues
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Developed, deployed and maintained successful Sales
                        strategies
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Grew company from 20+ customers to 400+ customers
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Helped plan and execute Customer Success program
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Developed complex Playbooks for Sales, Marketing,
                        Renewal &amp; Customer Success teams
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        &nbsp;Involved in successful Series A funding
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Responsible for Target setting, breakup of revenue
                        goals, reporting and complete Revenue Management
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Worked closely with the Product team in bringing out
                        features
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Got direct access to development teams which later
                        helped create Playbook software
                      </span>
                    </li>
                  </ul>
                  <h2 className="c6" id="h.g2lg27afyiyb">
                    <span>Greytip Software (greytHR), </span>
                    <span className="c7">Bangalore</span>
                    <span>&nbsp;</span>
                    <span className="c7">&mdash; </span>
                    <span className="c21 c7">
                      Manager - Channel Development
                    </span>
                  </h2>
                  <h3 className="c12" id="h.3ffewi2zpi21">
                    <span>May 2013 &ndash; October 2015</span>
                  </h3>
                  <ul className="c3 lst-kix_7ewhrxfqlg08-0 start">
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Planned and developed Channel Partners in Tier &ndash; 1
                        and Tier &ndash; 2 cities in India and drove sales
                        through partners.
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Responsible for South, North and East regions
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Opened new markets in new cities with help of reselling
                        partners
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Achieved targets through partner contribution
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Identified, recruited, trained and managed the right
                        partners
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Monitored and measured performance of Channel Managers
                        and Partners on weekly / monthly basis and provided
                        positive reinforcement as required
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Identified useful conferences / events in partner active
                        cities and generated leads for partners
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Collaborated with direct sales teams, implementation and
                        support teams, billing and accounts team on a daily
                        basis
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Helped partners plan their targets, strategies,
                        campaigns and put in action their business plan
                      </span>
                    </li>
                  </ul>
                  <h2 className="c6" id="h.abkm2nad8y4q">
                    <span>Indiblogger.in, </span>
                    <span className="c7">Bangalore</span>
                    <span>&nbsp;</span>
                    <span className="c7">&mdash; </span>
                    <span className="c21 c7">Director</span>
                  </h2>
                  <h3 className="c12" id="h.pbb3jbfgu7xo">
                    <span>July 2007 &ndash; March 2013</span>
                  </h3>
                  <ul className="c3 lst-kix_s3odskcgmnn5-0 start">
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Helped create a vibrant blogger community in India
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Hosted monthly blogger events across major cities
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Managed the online community via Indiblogger.in
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Brought in sponsors like Microsoft, Hindustan Unilever
                        etc for events
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Helped create first Blogger awards in India
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Involved in Product idea &amp; design
                      </span>
                    </li>
                  </ul>
                  <h1 className="c19" id="h.yk8luflkpwij">
                    <span>EDUCATION</span>
                  </h1>
                  <h2 className="c6" id="h.6wymnhinx9q5">
                    <span>Madurai Kamaraj University</span>
                    <span>, </span>
                    <span className="c7">Madurai &mdash; </span>
                    <span className="c21 c7">Bach. Engg. (CS)</span>
                  </h2>
                  <h3 className="c12" id="h.7vtcyzeczjot">
                    <span>July 1997 &ndash; April 2001</span>
                  </h3>
                  <ul className="c3 lst-kix_8z6y753bmshn-0 start">
                    <li className="c0 li-bullet-0">
                      <span className="c2">Computer Science graduate</span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">Did well in C programming</span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Project in ASP web development (before .Net)
                      </span>
                    </li>
                    <li className="c0 li-bullet-0">
                      <span className="c2">
                        Found Neural Networks &amp; Artificial Intelligence one
                        of the most interesting subjects
                      </span>
                    </li>
                  </ul>
                  <h1 className="c19" id="h.jhv78pp9wtzd">
                    <span>COURSES</span>
                  </h1>
                  <h2 className="c6" id="h.vm051rmyhoww">
                    <span>Web Development Pro </span>
                    <span className="c7">&mdash; </span>
                    <span className="c21 c7">Codecademy</span>
                  </h2>
                  <p className="c32">
                    <span className="c7 c41">
                      October 2018 &ndash; February 2019
                    </span>
                  </p>
                  <p className="c10">
                    <span className="c2">
                      HTML, CSS, Javascript, React, Node.js, SQL, TTD
                    </span>
                  </p>
                </td>
                <td className="c42" colSpan="1" rowSpan="1">
                  <h1 className="c19" id="h.ca0awj8022e2">
                    <span className="c4 c14">SKILLS</span>
                  </h1>
                  <p className="c10">
                    <span className="c1">
                      &#9733;&#9733;&#9733;&#9733;&#9734;
                    </span>
                    <span className="c2">&nbsp;Frontend Dev</span>
                  </p>
                  <p className="c10">
                    <span className="c1">
                      &#9733;&#9733;&#9733;&#9733;&#9734;
                    </span>
                    <span className="c2">&nbsp;React</span>
                  </p>
                  <p className="c10">
                    <span className="c1">
                      &#9733;&#9733;&#9733;&#9733;&#9734;
                    </span>
                    <span className="c2">&nbsp;JavaScript</span>
                  </p>
                  <p className="c10">
                    <span className="c1">
                      &#9733;&#9733;&#9733;&#9733;&#9734;
                    </span>
                    <span className="c2">&nbsp;HTML &amp; CSS</span>
                  </p>
                  <p className="c10">
                    <span className="c1">
                      &#9733;&#9733;&#9733;&#9734;&#9734;
                    </span>
                    <span className="c2">&nbsp;AWS-Serverless</span>
                  </p>
                  <p className="c10">
                    <span className="c1">
                      &#9733;&#9733;&#9733;&#9734;&#9734;
                    </span>
                    <span className="c2">&nbsp;Node.js</span>
                  </p>
                  <p className="c10">
                    <span className="c1">
                      &#9733;&#9733;&#9733;&#9734;&#9734;
                    </span>
                    <span className="c2">&nbsp;Express.js</span>
                  </p>
                  <p className="c10">
                    <span className="c1">
                      &#9733;&#9733;&#9733;&#9734;&#9734;
                    </span>
                    <span className="c2">&nbsp;RDBMS</span>
                  </p>
                  <p className="c10">
                    <span className="c1">
                      &#9733;&#9733;&#9733;&#9734;&#9734;
                    </span>
                    <span className="c2">&nbsp;REST APIs</span>
                  </p>
                  <p className="c10">
                    <span className="c1">
                      &#9733;&#9733;&#9733;&#9733;&#9734;
                    </span>
                    <span className="c2">&nbsp;React-Bootstrap</span>
                  </p>
                  <p className="c10">
                    <span className="c1">
                      &#9733;&#9733;&#9733;&#9734;&#9734;
                    </span>
                    <span className="c2">&nbsp;AntD</span>
                  </p>
                  <h1 className="c19" id="h.tuxh7mwdaxox">
                    <span className="c14 c4">SHOWCASE</span>
                  </h1>
                  <p className="c16">
                    <span className="c4 c1">Kanban View</span>
                    <span className="c2">&nbsp;- HTML5 DND</span>
                  </p>
                  <p className="c10">
                    <span className="c4">WYSIWYG Rich Editor</span>
                    <span>&nbsp;using Draft.js for </span>
                    <span className="c1 c7 c9">Task Management</span>
                  </p>
                  <p className="c10">
                    <span className="c4">WYSIWYG Rich Editor</span>
                    <span>&nbsp;to create </span>
                    <span className="c9 c1 c7">Email Templates</span>
                  </p>
                  <p className="c10">
                    <span className="c1 c4">Parse CSS</span>
                    <span className="c2">
                      &nbsp;Upload css files and parse with Papaparse to upload
                      data to CRM
                    </span>
                  </p>
                  <p className="c10">
                    <span className="c4 c1">Charts</span>
                    <span className="c2">
                      &nbsp;with react-vis &amp; Antd-Charts for statistics
                    </span>
                  </p>
                  <p className="c10">
                    <span className="c4 c1">Timeline View</span>
                    <span className="c2">
                      &nbsp;to show tasks and interactions in CRM
                    </span>
                  </p>
                  <p className="c10">
                    <span className="c4 c1">Stripe Integration</span>
                    <span className="c2">&nbsp;for billing in CRM</span>
                  </p>
                  <p className="c10">
                    <span className="c4 c1">Image Crop</span>
                    <span className="c2">&nbsp;for profile pics</span>
                  </p>
                  <h1 className="c19" id="h.cxxkes25b26">
                    <span className="c14 c4">Social Profile</span>
                  </h1>
                  <p className="c16">
                    <span className="AnImageSpan">
                      <img alt="" src={image2} title="" />
                    </span>
                    <span className="c5">
                      <a
                        className="c26"
                        href="https://www.google.com/url?q=https://linkedin.com/in/anwin&amp;sa=D&amp;ust=1610809209171000&amp;usg=AOvVaw22obeJxUGqX5i35UhQXCwy"
                      >
                        LinkedIn
                      </a>
                    </span>
                  </p>
                  <p className="c25">
                    <span className="AnImageSpan2">
                      <img alt="" src={image3} title="" />
                    </span>
                    <span className="c5">
                      <a
                        className="c26"
                        href="https://www.google.com/url?q=https://twitter.com/anwinj&amp;sa=D&amp;ust=1610809209171000&amp;usg=AOvVaw2zvygScmmHubk10TmdOlP3"
                      >
                        Twitter
                      </a>
                    </span>
                  </p>
                  <p className="c16">
                    <span className="AnImageSpan3">
                      <img alt="" src={image1} title="" />
                    </span>
                    <span className="c5">
                      <a
                        className="c26"
                        href="https://www.google.com/url?q=https://theplaybook.company&amp;sa=D&amp;ust=1610809209172000&amp;usg=AOvVaw263H6XwgjwdNEiEUC2uK1R"
                      >
                        Blog
                      </a>
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="c20 c38">
            <span className="c2"></span>
          </p>
          <div>
            <p className="c10 c20">
              <span className="c2"></span>
            </p>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default Resume;
