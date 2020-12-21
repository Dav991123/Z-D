import React, {useCallback, useEffect, useState} from "react";

import {
  BreadcrumbItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Pagination,
  Table,
  Row,
  Col,
  UncontrolledTooltip, Label, FormGroup, Input, Form,
} from "reactstrap";
import Select from "react-select";
import { withRouter } from 'react-router-dom';
import EditModal from "../components/EditModal";
import AddModal from "../components/AddModal";
import { useHistory } from 'react-router-dom';
import ReactBSAlert from "react-bootstrap-sweetalert";
import useFetch from "../../core/useFetch";
import useQuery from '../../Hooks/useQuery';
import {combineQuery, parseQuery} from "../../core/queryHelper";
import './table.scss';

//see
const ExtendedTables = (props) => {
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedUserType, setSelectedUserType] = useState('firstAttachedPerson')
  const [modalShow, setModalShow] = useState({
    editModal: false,
    addModal: false
  });
  const [alert, setAlert] = useState(null);
  const [tableData, setTableData] = useState({
    loading: false,
    data: {},
  });

  const history = useHistory();

  const { get } = useFetch("card");

  const { queryObject, query } = useQuery();

  const [page, setPage] = useState(+queryObject.page);

  const handleChangePageSize = useCallback((value) => {
    history.push(combineQuery({...parseQuery(window.location.search), size: value, page: queryObject.page }))
  }, [history])

  const handleChangePagination = useCallback(value => {
    let nextPage = page;
    nextPage = value === 'next' ? nextPage + 1 : nextPage -1;
    setPage(nextPage)
    history.push(combineQuery({...parseQuery(window.location.search), page: nextPage, size: queryObject.size}))
  }, [query]);

  const handleGetCardData = useCallback(() => {
    setTableData({
      ...tableData,
      loading: true,
    });

    get(query).then(
        (data) => {
          setTableData({
            loading: false,
            data,
          });
        }
    );
  });

  useEffect(() => {
    setPage(+queryObject.page)
    handleGetCardData()
  }, [query]);

  const { data, loading: cardLoading } = tableData;
  const { content = [] } = data;

  const handleIsOpenModal = (modalType) => {
    setModalShow((prevData) => ({
        ...prevData,
      [modalType]: !prevData[modalType]
    }));
  };
  const hideAlert = () => {
    setAlert(null);
  };


  const openRemoveConfirmModal = () => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => successDelete()}
        onCancel={() => cancelDelete()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
        btnSize=""
      >
        You will not be able to recover this imaginary file!
      </ReactBSAlert>
    );
  };
  const successDelete = () => {
    setAlert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Deleted!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        btnSize=""
      >
        Your imaginary file has been deleted.
      </ReactBSAlert>
    );
  };

  const cancelDelete = () => {
    setAlert(
      <ReactBSAlert
        danger
        style={{ display: "block", marginTop: "-100px" }}
        title="Cancelled"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        btnSize=""
      >
        Your imaginary file is safe :)
      </ReactBSAlert>
    );
  };


  return (
    <>
      <div className="content">
        {alert}
        <EditModal
            selectedRow={selectedRow}
            show={modalShow.editModal}
            onHide={() => handleIsOpenModal('editModal')}
            onRefreshPage={handleGetCardData}
        />
        <AddModal
            show={modalShow.addModal}
            onRefreshPage={handleGetCardData}
            onHide={() => handleIsOpenModal('addModal')}
        />
        <Row>
          <ol className="breadcrumb bg-transparent ml-3">
            <BreadcrumbItem>
              <div className={'add-card-button-content'}>
                <Button
                    outline
                    color="success"
                    id="tooltip967556665"
                    onClick={() => handleIsOpenModal('addModal')}
                >
                  ADD CARD
                </Button>

                <UncontrolledTooltip
                    delay={0}
                    target="tooltip967556665"
                >
                  ADD CARD
                </UncontrolledTooltip>

              </div>

            </BreadcrumbItem>
          </ol>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h2">Card</CardTitle>

                <div>
                  <CardTitle tag="h4">To See</CardTitle>
                  <Form onChange={(e) => {
                    setSelectedUserType(e.target.name)
                  }}>
                  <Row>
                    {/*<Label sm="2">Inline checkboxes</Label>*/}
                    <Col sm="10">
                      <FormGroup check inline className="form-check-radio">
                        <Label check>
                          <Input
                              defaultValue="option1"
                              id="exampleRadios3"
                              name="firstAttachedPerson"
                              type="radio"
                              checked={selectedUserType === 'firstAttachedPerson'}
                          />
                          <span className="form-check-sign" />
                          First Attached Person
                        </Label>
                      </FormGroup>

                      <FormGroup check inline className="form-check-radio">
                        <Label check>
                          <Input
                              defaultValue="option1"
                              id="exampleRadios3"
                              name="owner"
                              type="radio"
                              checked={selectedUserType === 'owner'}
                          />
                          <span className="form-check-sign" />
                          Owner
                        </Label>
                      </FormGroup>

                      <FormGroup check inline className="form-check-radio">
                        <Label check>
                          <Input
                              defaultValue="option1"
                              id="exampleRadios3"
                              name="secondAttachedPerson"
                              type="radio"
                              checked={selectedUserType === 'secondAttachedPerson'}
                          />
                          <span className="form-check-sign" />
                          Second Attached Person
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  </Form>
                </div>

              </CardHeader>

              {cardLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  <CardBody>
                    <Table>
                      <thead className="text-primary">
                        <tr>
                          <th className="text-center">ID</th>
                          <th>Name</th>
                          <th>SURNAME</th>
                          <th className="text-left">CARD TYPE</th>
                          <th className="text-left">PIN</th>
                          <th className="text-left">EMAIL</th>
                          <th className="text-left">CREATION DATE</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {content.map(
                          ({
                            pin,
                            code,
                            creationDate,
                              ...userData
                           }) => {
                            return (
                              <tr
                                style={{ cursor: "pointer" }}
                                className="btn-round"
                                onClick={e =>  {

                                  props.history.push(`/admin/detail/?cardId=${pin}`)
                                }}
                              >
                                <td className="text-center">
                                  <div className="photo">{userData[selectedUserType].id}</div>
                                </td>
                                <td>{userData[selectedUserType].name}</td>

                                <td>{userData[selectedUserType].surname}</td>

                                <td>{code.type}</td>

                                <td>{code.pin}</td>

                                <td>{new Date(creationDate).toDateString()}</td>
                                <td>{userData[selectedUserType].email}</td>

                                <td className="text-right">
                                  <Button
                                    className="btn-link btn-icon btn-neutral"
                                    color="success"
                                    id="tooltip967557276"
                                    size="sm"
                                    onClick={(row) => {
                                      row.stopPropagation()
                                      const { owner, firstAttachedPerson, secondAttachedPerson } = userData;
                                      setSelectedRow(
                                          {
                                            owner,
                                            firstAttachedPerson,
                                            secondAttachedPerson,
                                            pin: code.pin
                                          })
                                      handleIsOpenModal('editModal')
                                    }}
                                  >
                                    <i className="tim-icons icon-pencil" />
                                  </Button>
                                  <UncontrolledTooltip
                                    delay={0}
                                    target="tooltip967557276"
                                  >
                                    Edit Card
                                  </UncontrolledTooltip>
                                  {/*<Button*/}
                                  {/*  className="btn-link btn-neutral"*/}
                                  {/*  color="danger"*/}
                                  {/*  id="tooltip467555755"*/}
                                  {/*  size="sm"*/}
                                  {/*  onClick={() => openRemoveConfirmModal()}*/}
                                  {/*>*/}
                                  {/*  <i className="tim-icons icon-simple-remove" />*/}
                                  {/*</Button>*/}
                                  {/*<UncontrolledTooltip*/}
                                  {/*  delay={0}*/}
                                  {/*  target="tooltip467555755"*/}
                                  {/*>*/}
                                  {/*  Tooltip on top*/}
                                  {/*</UncontrolledTooltip>*/}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </>
              )}
              <Row>
                <Col>
                  <Pagination>
                      <Button
                          color="info"
                          size="sm"
                          disabled={page === 1}
                          onClick={(e) => {
                            handleChangePagination('prev')
                            e.preventDefault()
                          }}

                      >
                           <span aria-hidden={true}>
                          <i
                              aria-hidden={true}
                              className="tim-icons icon-double-left"
                          />
                        </span>
                      </Button>

                    <span className={'pagination-info'}>
                      page <b> {page} </b>  of <b> {data.total_pages} </b>
                    </span>

                    <Button
                        color="info"
                        size="sm"
                        disabled={page === data.total_pages}
                        onClick={(e) => {
                          handleChangePagination('next')
                          e.preventDefault()
                        }}

                    >
                        <span aria-hidden={true}>
                          <i
                              aria-hidden={true}
                              className="tim-icons icon-double-right"
                          />
                        </span>
                    </Button>

                  </Pagination>
                </Col>

                <Col lg="2" md="3" sm="3">
                  <Select
                    className="react-select info mr-2"
                    classNamePrefix="react-select"
                    name="singleSelect"
                    onChange={(data) => {
                      handleChangePageSize(data.value)
                    }}
                    options={[
                      {
                        value: "",
                        label: "Select Table",
                        isDisabled: true,
                      },
                      { value: "5", label: "5" },
                      { value: "10", label: "10" },
                      { value: "25", label: "25" },
                      { value: "50", label: "50" },
                    ]}
                    placeholder="Single Select"
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default withRouter(ExtendedTables);