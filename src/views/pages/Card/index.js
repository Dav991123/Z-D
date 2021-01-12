import React, { useEffect, useState, useCallback } from 'react';
import useFetch from '../../../core/useFetch';
import useQuery from '../../../Hooks/useQuery';
import { CardBody, Table, Col, Select, Button, Row, Form, Pagination, Label, FormGroup, Input } from 'reactstrap';
import AddModal from "../../components/AddModal";
import { withRouter } from 'react-router-dom';
import {combineQuery, parseQuery} from "../../../core/queryHelper";
import { useHistory } from 'react-router-dom';

const Card = (props) => {
    const { get } = useFetch("code");
    const { post } = useFetch('code/search?page=0&size=10');

    useEffect(() => {
        post({
            name: 'pin',
            value: '63046716',
            operation: 'EQUALS'
        })
    }, [])


    const [ codeType, setCodeType ] = useState('DESC')
    const [pin, setPin] = useState('');
    const [attached, setAttached] = useState(false);
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

    useEffect(() => {
        get(`${query}&attached=${attached}&sort=type,${codeType}`)
        // get(`?attached=false&page=0&size=10&sort=type,${codeType}`)
        .then(data => {
            setCodeData(data)
        })
    }, [query, attached, codeType]);


  const handleIsOpenModal = (modalType) => {
    setModalShow((prevData) => ({
        ...prevData,
      [modalType]: !prevData[modalType]
    }));
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
                                    className="btn-round"
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