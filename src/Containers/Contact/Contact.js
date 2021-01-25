import React, { useState } from "react";

import { Card, Row, Col, Form, Input, Button } from "antd";

import "./Contact.css";

const { TextArea } = Input;

const Contact = props => {
  const [emailData, setEmailData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const submitEmail = e => {
    e.preventDefault();

    console.log("emailData", emailData);
  };

  return (
    <Card
      className="Contact page py-100 container-fluid animated rollIn"
      id="contact"
      bordered={false}
    >
      <Row className="MainRow">
        <Col span={24} className="MainColumn">
          <div className="sec-t">
            <h2>
              Get In <span>Touch</span>
            </h2>
          </div>
        </Col>
      </Row>
      <Row className="MainRow">
        <Col span={24} className="MainColumn">
          <div className="sub-head">
            <h4 style={{ marginBottom: "1em" }}>
              <i className="fas fa-file-contract" /> Feel free to drop me a line
            </h4>
            <p>
              I am flexible regarding work hours and can contribute individually
              and in a team. Design of an APP is not yet my strongest point (key
              word being "YET"). But if given a design I can execute it to near
              perfection. <br />
              <br />
              Writing <strong>Backend APIs</strong> along with{" "}
              <strong>Front End</strong> code is my speciality. I am also pretty
              good at designing <strong>Database</strong> structures. Machine
              Learning and AI are in my sights for the long run.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="MainRow">
        <Col span={12} className="MainColumn">
          <Row>
            <Col span={12}>
              <Card
                hoverable
                className="ContactCard"
                title={
                  <div className="ContactCardIconDiv">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                }
              >
                Pune, India
                <p>
                  <br />
                  <br />
                  Remote Work -{" "}
                  <i className="far fa-check-circle PBLightGreen" />
                  <br />
                  Willingness to Relocate -{" "}
                  <i className="far fa-check-circle PBLightGreen" />
                </p>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                hoverable
                className="ContactCard2"
                title={
                  <div className="ContactCardIconDiv2">
                    <i className="far fa-address-card" />
                  </div>
                }
              >
                <Row>
                  <Col span={4} style={{ textAlign: "center" }}>
                    <i className="fas fa-globe PBBlack" />
                  </Col>
                  <Col span={20}>
                    <a
                      href="https://myplaybook.in"
                      target="_blank"
                      rel="noopener"
                    >
                      My Playbook
                    </a>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span={4} style={{ textAlign: "center" }}>
                    <i className="fas fa-mobile PBBlack" />
                  </Col>
                  <Col span={20}>
                    <a
                      href="tel://+91 96200 23555"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +91 96200 23555
                    </a>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span={4} style={{ textAlign: "center" }}>
                    <i className="far fa-paper-plane PBBlack" />
                  </Col>
                  <Col span={20}>
                    <a
                      href="mailto:anwinjpb@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      anwinjpb@gmail.com
                    </a>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card hoverable className="SocialCard">
                <Row>
                  <Col span={8}>
                    <a
                      href="anwinjpb@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter-square PBRed" />
                    </a>
                  </Col>
                  <Col span={8}>
                    <a
                      href="anwinjpb@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin PBRed" />
                    </a>
                  </Col>
                  <Col span={8}>
                    <a
                      href="anwinjpb@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-blog PBRed" />
                    </a>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={12} className="MainColumn">
          <Card className="ContactFormCard" hoverable>
            <Form initialValues={emailData}>
              <Form.Item>
                <Input
                  bordered={false}
                  value={emailData.name}
                  type="text"
                  onChange={event =>
                    setEmailData({
                      ...emailData,
                      name: event.target.value
                    })
                  }
                />
                <label>
                  Name{" "}
                  {emailData.name && emailData.name.length >= 2 && (
                    <i
                      style={{ float: "right" }}
                      className="far fa-check-circle PBLightGreen"
                    />
                  )}
                </label>
              </Form.Item>
              <Form.Item>
                <Input
                  bordered={false}
                  value={emailData.email}
                  onChange={event =>
                    setEmailData({
                      ...emailData,
                      email: event.target.value
                    })
                  }
                  type="email"
                />
                <label>
                  Email{" "}
                  {emailData.email && emailData.email.length >= 2 && (
                    <i
                      style={{ float: "right" }}
                      className="far fa-check-circle PBLightGreen"
                    />
                  )}
                </label>
              </Form.Item>
              <Form.Item>
                <Input
                  bordered={false}
                  value={emailData.phone}
                  onChange={event =>
                    setEmailData({
                      ...emailData,
                      phone: event.target.value
                    })
                  }
                  type="tel"
                />
                <label>
                  Phone <small>(Optional)</small>
                </label>
              </Form.Item>
              <Form.Item>
                <TextArea
                  rows={4}
                  bordered={false}
                  value={emailData.message}
                  onChange={event =>
                    setEmailData({
                      ...emailData,
                      message: event.target.value
                    })
                  }
                />
                <label>
                  Message{" "}
                  {emailData.message && emailData.message.length >= 10 && (
                    <i
                      style={{ float: "right" }}
                      className="far fa-check-circle PBLightGreen"
                    />
                  )}
                </label>
              </Form.Item>
              <Row>
                <Col span={24}>
                  <Button
                    type="primary"
                    block
                    size="middle"
                    onClick={submitEmail}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
            {/*<form
              className="contact_form"
              method="post"
              action="assets/php/mail.php"
            >
              <div className="row">
                <div className="col-12">
                  <div
                    className="alert alert-success contact_msg"
                    style={{ display: "none" }}
                    role="alert"
                  >
                    Your message was sent successfully.
                  </div>
                </div>
              </div>
              <div className="contact_input_area">
                <div className="form-group">
                  <i className="icon-user input-icon"></i>
                  <label htmlFor="name">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                      required
                      maxLength="50"
                      onChange={e =>
                        setEmailData({
                          ...emailData,
                          name: e.target.value
                        })
                      }
                    />
                  </label>
                </div>
                <div className="form-group">
                  <i className="icon-envelope input-icon"></i>
                  <label htmlFor="email">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Your Email"
                      id="email"
                      required
                      maxLength="50"
                    />
                  </label>
                </div>
                <div className="form-group">
                  <i className="icon-speech input-icon"></i>
                  <label htmlFor="subject">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Subject"
                      id="subject"
                      maxLength="50"
                      name="subject"
                      required
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <i className="icon-bubbles input-icon"></i>
                  <label htmlFor="message" className="text-area">
                    <textarea
                      className="form-control"
                      name="message"
                      id="message"
                      rows="3"
                      placeholder="Write Message"
                      maxLength="300"
                      required
                    ></textarea>
                  </label>
                </div>
                <div
                  className="g-recaptcha mb-4"
                  data-sitekey="6LeOUJwUAAAAADsG7Kvs9zSG2pGGa7ux4L-h73nL"
                ></div>
                <button
                  type="submit"
                  name="submit"
                  className="btn btn-brand2 pull-right"
                  id="btnContactUs"
                  onClick={submitEmail}
                >
                  Submit
                </button>
              </div>
            </form>*/}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Contact;
