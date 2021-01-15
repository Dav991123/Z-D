import React, { useEffect, useState, useCallback } from 'react';
import useFetch from '../../../core/useFetch';
import useQuery from '../../../Hooks/useQuery';
import { CardBody, Table, Col, Select, Button, Row, Form, Pagination, Label, FormGroup, Input } from 'reactstrap';
import AddModal from "../../components/AddModal";
import { withRouter } from 'react-router-dom';
import {combineQuery, parseQuery} from "../../../core/queryHelper";
import { useHistory } from 'react-router-dom';
import './index.css'
const Card = (props) => {
    const { get } = useFetch("code");
    const [ codeType, setCodeType ] = useState('DESC')
    const [pin, setPin] = useState('');
    const [attached, setAttached] = useState(false);
    const [filter, setFilter] = useState([]);
    const [month, setMonth] = useState(null);
    const [filterPin, setFilterPin] = useState('');
    const [filterCodeType, setFilterCodeType] = useState(null);;
    
    const [codeData, setCodeData] = useState({
        content: [],
        total_pages: 0
    });
    const { queryObject, query } = useQuery();


    const [page, setPage] = useState(+queryObject.page);
    const history = useHistory();

    const handleChangePageSize = useCallback((value) => {
        props.history.push(combineQuery({...parseQuery(window.location.search), size: value, page: queryObject.page }))
      }, [props.history, queryObject.page])
    
      const handleChangePagination = useCallback(value => {
        let nextPage = page;
        nextPage = value === 'next' ? nextPage + 1 : nextPage -1;
        setPage(nextPage)
        props.history.push(combineQuery({...parseQuery(window.location.search), page: nextPage, size: queryObject.size}))
      }, [page, props.history, queryObject.size]);

    const [modalShow, setModalShow] = useState({
        editModal: false,
        addModal: false
      });

      const { post } = useFetch(`code/search?page=0&size=10&attached=${attached}&sort=type,${codeType}`);

    useEffect(() => {
        get(`${query}&attached=${attached}&sort=type,${codeType}`)
        .then(data => {
            setCodeData(data)
        })
    }, [query, attached, codeType]);




    const handleFilter = () => {
        let model = [

        ];

        if(filterPin && filterCodeType && model) {
            model = [
                {
                    "name":"pin",
                    "value": filterPin,
                    "operation":"EQUALS"
                },
                {
                    "name":"type",
                    "value": +filterCodeType,
                    "operation":"EQUALS"
                },
                {
                    "name":"activeMonths",
                    "value": +month,
                    "operation":"EQUALS"
                }
            ]
        }else if(filterPin) {
            model = [
                {
                    "name":"pin",
                    "value": +filterPin,
                    "operation":"EQUALS"
                },
            ]
        }else if(filterCodeType) {
            model = [
                {
                    "name":"type",
                    "value": +filterCodeType,
                    "operation":"EQUALS"
                }
            ]
        }else if(month) {
            model = [
                {
                    "name":"activeMonths",
                    "value": +month,
                    "operation":"EQUALS"
                }
            ]
        }

          post(
            {
                "criteria": model
            }
        )
        .then(data=> {
            setCodeData(data);
        })
    }


  const handleIsOpenModal = (modalType) => {
    setModalShow((prevData) => ({
        ...prevData,
      [modalType]: !prevData[modalType]
    }));
  };

  const reset = () => {
    get(`${query}&attached=${attached}&sort=type,${codeType}`)
    .then(data => {
        setCodeData(data)
    })
  };
  
    return (
        <div className="content">
                <FormGroup check className="mt-3">
                    <Label check>
                        <Input 
                            type="checkbox"
                            checked={attached}
                            onChange={(e) => setAttached(e.target.checked)}
                        />
                        <span className="form-check-sign" />
                        Attached
                    </Label>
                </FormGroup>

                {/*  */}
                <Form 
                    onChange={e => {
                        setCodeType(e.target.value)
                      }}
                >
                <FormGroup check inline className="form-check-radio">
                    <Label check>
                          <Input
                              defaultValue="DESC"
                              id="exampleRadios3"
                              name="DESC"
                              type="radio"
                              checked={codeType === 'DESC'}
                          />
                          <span className="form-check-sign" />
                          GOLD
                        </Label>
                  </FormGroup> 

                   <FormGroup check inline className="form-check-radio">
                        <Label check>
                          <Input
                              defaultValue="asc"
                              id="exampleRadios3"
                              name="asc"
                              type="radio"
                              checked={codeType === 'asc'}
                          />
                          <span className="form-check-sign" />
                          BLACK
                        </Label>
                  </FormGroup>
                  </Form>
                    <hr />

                    <div className="filter-content">
                    <h2>Filter</h2>

                    <section>
                    <div className="pin-content">
                            <FormGroup check className="mt-3">
                                <Input 
                                    value={filterPin}
                                    type="number"
                                    placeholder="Pin"
                                    onChange={(e) => setFilterPin(e.target.value)}
                                />
                            </FormGroup>
                    </div>

                    <div className="pin-content">
                            <FormGroup check className="mt-3">
                                <Input 
                                    value={month}
                                    type="number"
                                    placeholder="Month"
                                    onChange={(e) => setMonth(e.target.value)}
                                />
                            </FormGroup>
                    </div>

                        <div className="type-content">
                            <Form 
                                onChange={(e) => {
                                    console.log(e.target.value, '07535316')
                                    setFilterCodeType(e.target.value)
                                }}
                            >
                            <FormGroup check inline className="form-check-radio">

                                <Label check>
                                    <Input
                                        defaultValue="1"
                                        id="exampleRadios3"
                                        name="1"
                                        type="radio"
                                        checked={filterCodeType === '1'}
                                    />
                                    <span className="form-check-sign" />
                                    GOLD
                                </Label>

                                <Label check>
                                    <Input
                                        defaultValue="0"
                                        id="exampleRadios3"
                                        name="0"
                                        type="radio"
                                        checked={filterCodeType === '0'}
                                    />
                                    <span className="form-check-sign" />
                                    BLACK
                                </Label>
                            </FormGroup>
                            </Form>
                        </div>

                        <div>
                            <Button onClick={handleFilter}>
                                Search
                            </Button>

                            <Button 
                                onClick={reset}
                            >
                                Reset
                            </Button>
                        </div>
                    </section>
                    </div>
              <AddModal
                show={modalShow.addModal}
                onRefreshPage={() => props.history.push('/')}
                onHide={() => handleIsOpenModal('addModal')}
                pin={pin}
            />
            <CardBody>
                <Table>
                    <thead className="text-primary">
                        <tr>
                            <th className="text-left">Active Months</th>
                            <th>Type</th>
                            <th>Pin</th>
                            <th className="text-left">Number</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            codeData.content?.map(card => {
                                return (
                                    <tr
                                    style={{ cursor: "pointer" }}
                                    className="btn-round card-table-row"
                                    onClick={() => {
                                        handleIsOpenModal('addModal')
                                        setPin(card.pin)
                                    }}
                                    >
                                        <td>{card.activeMonths}</td>
                                        <td>{card.type}</td> 
                                        <td>{card.pin}</td> 
                                        <td>{card.number}</td> 
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </CardBody>

            <Row>
            <Col>
                  <Pagination>
                      <Button
                          color="info"
                          size="sm"
                          disabled={page === 0}
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
                      page <b> {page + 1} of {codeData.total_pages}</b> 
                    </span>

                    <Button
                        color="info"
                        size="sm"
                        disabled={page === codeData.total_pages}
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
            </Row>
        </div>
    )
};

export default withRouter(Card);