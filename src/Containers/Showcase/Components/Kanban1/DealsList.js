import React, { useState, useEffect } from "react";

import {
  Form,
  Row,
  Col,
  //Navbar,
  // Nav,
  Container,
  Button,
  Modal,
  //DropdownButton,
  //Dropdown,
  //Button
  Table,
  Pagination
  //Card,
  //Modal,
  //InputGroup
} from "react-bootstrap";

//import axios from "axios";

import { format, parseISO, isValid } from "date-fns";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import "./Kanban1.css";

const perPageOptions = [10, 25, 50, 100];

const DealsList = props => {
  console.log("props.filteredDeals", props.filteredDeals);
  //let [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  const [perPage, setPerPage] = useState(props.perPage);
  const [lastPage, setLastPage] = useState(props.lastPage);
  const [firstPage, setFirstPage] = useState(1);
  let [currentDeals, setCurrentDeals] = useState(props.filteredDeals);
  const [searchDeal, setsearchDeal] = useState("");
  const [indexOfLastDeal, setFirstIndex] = useState(1);
  const [indexOfFirstDeal, setSecondIndex] = useState(1);
  let [bulkDeals, setBulkDeals] = useState([]);
  let [newValues, setNewValues] = useState({
    isActive: true,
    source: "",
    stageId: 0,
    statusId: 0,
    userId: 0,
    pipeId: 0,
    reasonId: 0
  });
  let [showBulk, setShowBulk] = useState(false);
  let [error, setError] = useState({ error: false, message: "" });
  let [confirm, setConfirm] = useState(false);
  /*
  let [sort, setSort] = useState({
    column: null,
    direction: "desc"
  });
*/
  //let [searchDeals, setsearchDeals] = useState(props.filteredDeals)

  let searchDeals = props.filteredDeals;

  const [pages, setPages] = useState(() => {
    let initialArray = [];
    for (let i = 1; i <= props.lastPage; i++) {
      initialArray.push(i);
    }
    return initialArray;
  });

  useEffect(() => {
    let tempFirstPage = 0;
    let tempLastPage = 0;

    if (props.lastPage <= 10) {
      tempFirstPage = 1;
      tempLastPage = props.lastPage;
    } else {
      if (currentPage <= 6) {
        tempFirstPage = 1;
        tempLastPage = 10;
      } else if (currentPage + 4 >= props.lastPage) {
        tempFirstPage = props.lastPage - 9;
        tempLastPage = props.lastPage;
      } else {
        tempFirstPage = currentPage - 5;
        tempLastPage = currentPage + 4;
      }
    }
    setFirstPage(tempFirstPage);
    setLastPage(tempLastPage);
  }, [props.lastPage, currentPage]);
  //console.log("lastPage", lastPage);

  /*
  useEffect(() => {
    let initialArray = [];
    for (let i = 1; i <= props.lastPage; i++) {
      initialArray.push(i);
    }
    setPages(initialArray);
  }, [props.lastPage]);
*/
  //console.log("pages", pages);

  const handleSelectPages = event => {
    //event.preventDefault();
    //console.log("event.target.value", event.target.value);
    let value = parseInt(event.target.value);

    setLastPage(Math.ceil(props.filteredDeals.length / value));
    //console.log("lastPage", lastPage);

    setCurrentPage(1);
    setPerPage(value);
  };

  useEffect(() => {
    let tempFirstPage = 0;
    let tempLastPage = 0;

    if (lastPage <= 10) {
      tempFirstPage = 1;
      tempLastPage = lastPage;
    } else {
      if (currentPage <= 6) {
        tempFirstPage = 1;
        tempLastPage = 10;
      } else if (currentPage + 4 >= lastPage) {
        tempFirstPage = lastPage - 9;
        tempLastPage = lastPage;
      } else {
        tempFirstPage = currentPage - 5;
        tempLastPage = currentPage + 4;
      }
    }
    setFirstPage(tempFirstPage);
    setLastPage(tempLastPage);

    let tempSecondIndex = (currentPage - 1) * perPage;
    let tempFirstIndex = Math.min(
      tempSecondIndex + perPage,
      searchDeals.length - 1
    );
    /*
    let initialArray = [];
    for (let i = 1; i <= lastPage; i++) {
      initialArray.push(i);
    }
    */
    //setPages(initialArray);
    setPages(
      [...Array(tempLastPage + 1 - tempFirstPage).keys()].map(
        i => tempFirstPage + i
      )
    );
    setFirstIndex(tempFirstIndex);
    setSecondIndex(tempSecondIndex);
  }, [lastPage, firstPage, perPage, currentPage, searchDeals.length]);

  const updateSearch = e => {
    /*    searchDeals = props.filteredDeals;
    if (e.target.value !== "" && e.target.value.length >= 3) {
      searchDeals = searchDeals.filter(fd => {
        let lc = fd.dealName.toLowerCase();
        let filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
      searchDeals = searchDeals.slice(indexOfFirstDeal, indexOfLastDeal);
    }*/
    setsearchDeal(e.target.value);
  };

  useEffect(() => {
    //searchDeals = props.filteredDeals;
    let tempDeals = [];
    if (searchDeal !== "" && searchDeal.length >= 3) {
      tempDeals = searchDeals
        .filter(fd => {
          let lc = fd.dealName.toLowerCase();
          let filter = searchDeal.toLowerCase();
          return lc.includes(filter);
        })
        .slice(indexOfFirstDeal, indexOfLastDeal);
    } else {
      tempDeals = searchDeals.slice(indexOfFirstDeal, indexOfLastDeal);
    }

    setCurrentDeals(tempDeals);
    //setSortedData(tempDeals);
  }, [searchDeal, indexOfFirstDeal, searchDeals, indexOfLastDeal, pages]);

  const updateBulkSelection = (e, id) => {
    console.log("e.target.checked", e.target.checked);
    console.log("id", id);
    if (e.target.checked) {
      setBulkDeals([...bulkDeals, id]);
    } else {
      setBulkDeals(bulkDeals.filter(bd => bd !== id));
    }
  };

  const updateNewValuesId = e => {
    setNewValues({ ...newValues, [e.target.name]: parseInt(e.target.value) });
  };

  const updateNewValues = e => {
    setNewValues({ ...newValues, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let flag = false;
    console.log("newValues", newValues);

    if (
      newValues.userId > 0 ||
      (newValues.userId === 0 && newValues.isActive === false) ||
      newValues.source.length > 1 ||
      newValues.source === "" ||
      (newValues.pipeId === 0 &&
        newValues.stageId === 0 &&
        newValues.statusId === 0 &&
        newValues.reasonId === 0) ||
      (newValues.pipeId > 0 &&
        newValues.stageId > 0 &&
        newValues.statusId > 0 &&
        newValues.reasonId > 0)
    ) {
      flag = true;
    }

    console.log("flag", flag);

    if (
      (newValues.pipeId === 0 ||
        newValues.stageId === 0 ||
        newValues.statusId === 0 ||
        newValues.reasonId === 0) &&
      newValues.userId === 0 &&
      newValues.isActive === true &&
      newValues.source === ""
    ) {
      flag = false;
    }

    console.log("flag", flag);
    return flag;
  };

  const submitNewValues = e => {
    e.preventDefault();

    console.log("bulkDeals", bulkDeals);
    console.log("newValues", newValues);

    if (!newValues)
      setError({
        error: true,
        message: "Sorry, update failed. Please try again later."
      });
    /*
    axios({
      method: "POST",
      url: `/api/v2/app/deals/general/bulkupdate`,
      data: { bulkDeals: bulkDeals, newValues: newValues },
      headers: { Authorization: `${props.authToken}` }
    })
      .then(data => {
        console.log("data received", data);

        props.updateFunction(bulkDeals, newValues);
        setBulkDeals([]);
        setNewValues({
          isActive: true,
          source: "",
          stageId: 0,
          statusId: 0,
          userId: 0,
          pipeId: 0,
          reasonId: 0
        });
        setConfirm(false);
        setShowBulk(false);
      })
      .catch(error => {
        console.log("error", error);
        setError({
          error: true,
          message: "Sorry, update failed. Please try again later."
        });
      });
      */
  };

  const bulkReassign = () => {
    return (
      <Modal size="md" show={showBulk} onHide={() => setShowBulk(false)}>
        <Modal.Header closeButton>Bulk Updates</Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Form.Group as={Row}>
              <Col xs={12} md={4}>
                <Form.Label>Assign to New User</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  name="userId"
                  value={newValues.userId}
                  onChange={updateNewValuesId}
                  size="sm"
                >
                  <option value={0}>Select new User</option>
                  {props.users !== undefined && props.users.length > 0 ? (
                    props.users.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.userName}
                      </option>
                    ))
                  ) : (
                    <option value={-1}>Unable to retrieve users</option>
                  )}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col xs={12} md={4}>
                <Form.Label>Choose a Pipeline</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  name="pipeId"
                  value={newValues.pipeId}
                  onChange={updateNewValuesId}
                  size="sm"
                >
                  <option value={0}>Select</option>
                  {props.pipelines !== undefined &&
                  props.pipelines.length > 0 ? (
                    props.pipelines
                      .filter(p => p.teamId < 4)
                      .sort((a, b) => a.teamId - b.teamId)
                      .map(p => (
                        <option key={p.id} value={p.id}>
                          {p.pipeName}
                        </option>
                      ))
                  ) : (
                    <option value={-1}>Unable to retrieve Pipelines</option>
                  )}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col xs={12} md={4}>
                <Form.Label>Move to new Stage</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  name="stageId"
                  value={newValues.stageId}
                  onChange={updateNewValuesId}
                  size="sm"
                >
                  <option value={0}>Select Stage</option>
                  {props.stages !== undefined &&
                  props.stages.length > 0 &&
                  newValues.pipeId > 0 ? (
                    props.stages
                      .filter(s => s.pipeId === newValues.pipeId)
                      .map(s => (
                        <option key={s.id} value={s.id}>
                          {s.stageName}
                        </option>
                      ))
                  ) : (
                    <option value={-1}>Please select Pipeline first</option>
                  )}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col xs={12} md={4}>
                <Form.Label>Change Status</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  name="statusId"
                  value={newValues.statusId}
                  onChange={updateNewValuesId}
                  size="sm"
                >
                  <option value={0}>Select a Status</option>
                  {props.dealStatuses !== undefined &&
                  props.dealStatuses.length > 0 &&
                  newValues.pipeId > 0 &&
                  props.pipelines.find(p => p.id === newValues.pipeId) ? (
                    props.dealStatuses
                      .filter(
                        ds =>
                          props.pipelines.filter(
                            p => p.id === newValues.pipeId
                          )[0].teamId === ds.teamId
                      )
                      .map(ds => (
                        <option key={ds.id} value={ds.id}>
                          {ds.dealStatusName}
                        </option>
                      ))
                  ) : (
                    <option value={-1}>Please select Stage first</option>
                  )}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col xs={12} md={4}>
                <Form.Label>Choose Reason</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  name="reasonId"
                  value={newValues.reasonId}
                  onChange={updateNewValuesId}
                  size="sm"
                >
                  <option value={0}>Select</option>
                  {props.reasons !== undefined &&
                  props.reasons.length > 0 &&
                  newValues.statusId > 0 &&
                  props.reasons.find(r => r.statusId === newValues.statusId) ? (
                    props.reasons
                      .filter(r => r.statusId === newValues.statusId)
                      .map(r => (
                        <option key={r.id} value={r.id}>
                          {r.reasonName}
                        </option>
                      ))
                  ) : (
                    <option value={-1}>Please select a status first</option>
                  )}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col xs={12} md={4}>
                <Form.Label>Update Source</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="input"
                  name="source"
                  value={newValues.source}
                  onChange={updateNewValues}
                  size="sm"
                  placeholder="Type here..."
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col xs={12} md={4}>
                <Form.Label>Archive</Form.Label>
              </Col>
              <Col>
                <Form.Check
                  name="isActive"
                  value={newValues.isActive}
                  checked={!newValues.isActive}
                  onChange={e =>
                    setNewValues({
                      ...newValues,
                      [e.target.name]: !e.target.checked
                    })
                  }
                  size="sm"
                />
              </Col>
            </Form.Group>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container fluid>
            <Row>
              <Col>Deals that are being updated</Col>
            </Row>
            <Table size="sm" variant="light" hover>
              <tbody>
                {bulkDeals.length > 0 ? (
                  bulkDeals.map(bd => (
                    <tr key={bd}>
                      <td>
                        {currentDeals.filter(cd => cd.id === bd)[0].dealName}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>None selected</td>
                  </tr>
                )}
              </tbody>
            </Table>
            {error.error ? (
              <Row>
                <Col className="PBRed">{error.message}</Col>
              </Row>
            ) : null}
            <Row>
              <Col>
                <Button
                  text="Escape!"
                  size="sm"
                  block
                  variant="outline-warning"
                  onClick={() => setShowBulk(false)}
                />
              </Col>
              <Col>
                {confirm && validateForm() ? (
                  <Button
                    text="Save"
                    size="sm"
                    block
                    variant="outline-info"
                    onClick={submitNewValues}
                    disabled={!validateForm()}
                  />
                ) : (
                  <Form.Check
                    name="confirm"
                    value={confirm}
                    checked={confirm}
                    onChange={e => setConfirm(e.target.checked)}
                    size="sm"
                    label="Confirm"
                  />
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderPages = () => {
    return pages.map(page => (
      <Pagination.Item key={page} onClick={() => setCurrentPage(page)}>
        {page}
      </Pagination.Item>
    ));
  };

  return (
    <Container className="DealsList">
      <Row>
        <Col>
          <Table
            className="TableData"
            borderless
            hover
            variant="light"
            size="sm"
            id="downloadTable"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Stage</th>
                <th>Organization</th>
                <th>City</th>
                <th>Country</th>
                <th>Industry</th>
                <th>Contact</th>
                <th>Expected Closure</th>
                <th>Next Activity</th>
                <th>Owner</th>
                <th>Actions</th>
                <th>
                  {bulkDeals.length > 0 ? (
                    <Button
                      text="Bulk"
                      variant="outline-warning"
                      size="sm"
                      onClick={() => setShowBulk(true)}
                    />
                  ) : (
                    "Bulk"
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDeals !== undefined && currentDeals.length > 0 ? (
                currentDeals.map(deal => (
                  <tr key={deal.id} className="tData">
                    <td>
                      {deal ? (
                        <a
                          href={`/deals/deal/${deal.id}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {deal.dealName}
                        </a>
                      ) : null}
                    </td>
                    <td>
                      {!isNaN(parseInt(deal.dealValue))
                        ? parseInt(deal.dealValue).toLocaleString()
                        : 0}
                    </td>
                    <td>
                      {deal
                        ? props.stages
                          ? props.stages.map(stage => {
                              if (stage.id === deal.stageId)
                                return stage.stageName;
                              else {
                                return null;
                              }
                            })
                          : "stageName"
                        : null}
                    </td>
                    <td>
                      {deal
                        ? props.orgs
                          ? props.orgs.map(org => {
                              if (org.id === deal.orgId)
                                return (
                                  <a
                                    href={`/orgs/details/${deal.orgId}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    key={org.id}
                                  >
                                    {org.orgName}
                                  </a>
                                );
                              else {
                                return null;
                              }
                            })
                          : "orgName"
                        : null}
                    </td>
                    <td>
                      {props.orgs !== undefined &&
                      props.orgs.length > 0 &&
                      props.orgs.find(o => o.id === deal.orgId) &&
                      props.orgs.filter(o => o.id === deal.orgId)[0].city !==
                        null
                        ? props.orgs.filter(o => o.id === deal.orgId)[0].city
                        : "Not set"}
                    </td>
                    <td>
                      {props.orgs !== undefined &&
                      props.orgs.length > 0 &&
                      props.orgs.find(o => o.id === deal.orgId) &&
                      props.orgs.filter(o => o.id === deal.orgId)[0].country !==
                        null
                        ? props.orgs.filter(o => o.id === deal.orgId)[0].country
                        : "---"}
                    </td>
                    <td>
                      {props.orgs !== undefined &&
                      props.orgs.length > 0 &&
                      props.orgs.find(o => o.id === deal.orgId) &&
                      props.orgs.filter(o => o.id === deal.orgId)[0]
                        .industry !== null
                        ? props.orgs.filter(o => o.id === deal.orgId)[0]
                            .industry
                        : "---"}
                    </td>
                    <td>
                      {deal
                        ? props.people
                          ? props.people.map(person => {
                              if (person.id === deal.contactId)
                                return (
                                  <a
                                    href={`/people/details/${deal.contactId}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    key={person.id}
                                  >
                                    {person.contactName}
                                  </a>
                                );
                              else {
                                return null;
                              }
                            })
                          : "contactName"
                        : null}
                    </td>
                    <td>
                      {deal.closureDate !== null &&
                      deal.closureDate !== undefined &&
                      isValid(parseISO(deal.closureDate))
                        ? format(parseISO(deal.closureDate), "dd MMM yyyy")
                        : "Not set"}
                    </td>
                    <td>
                      {props.allTenantActs !== undefined &&
                      props.allTenantActs.length > 0 &&
                      props.allTenantActs.find(ata => ata.dealId === deal.id)
                        ? format(
                            parseISO(
                              props.allTenantActs
                                .filter(ata => ata.dealId === deal.id)
                                .sort(
                                  (a, b) =>
                                    new Date(a.activityDate) -
                                    new Date(b.activityDate)
                                )[0].activityDate
                            ),
                            "dd MMM yyyy"
                          )
                        : "None"}
                    </td>

                    <td>
                      {props.users !== undefined &&
                      props.users.length > 0 &&
                      props.users.find(u => u.id === deal.userId)
                        ? props.users.filter(u => u.id === deal.userId)[0]
                            .nickName !== null &&
                          props.users.filter(u => u.id === deal.userId)[0]
                            .nickName !== ""
                          ? props.users.filter(u => u.id === deal.userId)[0]
                              .nickName
                          : props.users
                              .filter(u => u.id === deal.userId)[0]
                              .userName.split(" ")[0]
                        : "User not retrieved"}
                    </td>
                    <td>
                      {deal ? (
                        <Button
                          variant="outline-warning"
                          size="sm"
                          key={deal.id}
                          value={deal.id}
                          text="Archive"
                        >
                          Archive
                        </Button>
                      ) : null}
                    </td>
                    <td>
                      <Form.Check
                        value={
                          bulkDeals.find(bd => bd === deal.id) ? true : false
                        }
                        checked={
                          bulkDeals.find(bd => bd === deal.id) ? true : false
                        }
                        onChange={e => updateBulkSelection(e, deal.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>Not enough deals. Add Deals please.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row
        style={{
          display: "inline-flex",
          width: "100%",
          marginBottom: "0.6em"
        }}
      >
        <Col style={{ width: "100%" }}>
          <Pagination size="sm">
            <Pagination.First onClick={() => setCurrentPage(1)} />
            <Pagination.Prev
              onClick={
                currentPage > 1 ? () => setCurrentPage(currentPage - 1) : null
              }
            />
            {renderPages()}

            <Pagination.Next
              onClick={
                currentPage < lastPage
                  ? () => setCurrentPage(currentPage + 1)
                  : null
              }
            />
            <Pagination.Last onClick={() => setCurrentPage(lastPage)} />
          </Pagination>
        </Col>
      </Row>
      <Row
        style={{
          display: "inline-flex",
          width: "100%",
          marginBottom: "0.6em"
        }}
      >
        <Col sm={1} xs={1} md={1} lg={1} xl={1} style={{ width: "100%" }}>
          <Form.Label style={{ color: "#343a40" }}>Search Deals</Form.Label>
        </Col>
        <Col sm={4} xs={4} md={4} lg={4} xl={4} style={{ width: "100%" }}>
          <Form.Control
            size="sm"
            type="input"
            value={searchDeal}
            onChange={updateSearch}
            name="searchDeal"
            placeholder="Start typing..."
          />
        </Col>
        <Col
          sm={1}
          xs={1}
          md={1}
          lg={1}
          xl={1}
          style={{ width: "100%", textAlign: "right", marginRight: "0.5em" }}
        >
          <Form.Label style={{ color: "#343a40" }}>Per page</Form.Label>
        </Col>
        <Col sm={1} xs={1} md={1} lg={1} xl={1} style={{ width: "100%" }}>
          <Form.Control
            as="select"
            onChange={handleSelectPages}
            value={perPage}
            size="sm"
            name="perPage"
          >
            {perPageOptions !== undefined && perPageOptions.length > 0
              ? perPageOptions.map(option => (
                  <option value={option} id={option} key={option}>
                    {option}
                  </option>
                ))
              : null}
          </Form.Control>
        </Col>
        {props.roleId !== undefined && props.roleId !== 4 ? (
          <Col
            sm={1}
            xs={1}
            md={1}
            lg={1}
            xl={1}
            style={{ width: "100%", textAlign: "right" }}
          >
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="downloadTable"
              filename="Deals"
              sheet="Deals"
              buttonText="Export to XLS"
            />
          </Col>
        ) : null}
      </Row>
      <Row>
        <Col>{showBulk && bulkReassign()}</Col>
      </Row>
    </Container>
  );
};

export default DealsList;
