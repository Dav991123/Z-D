import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import { parseQuery } from "../../../core/queryHelper";
import useFetch from "../../../core/useFetch";
import useQuery from "../../../Hooks/useQuery";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Collapse,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Row,
    Col, Table
} from "reactstrap";
import { TableDetail } from './tableDetail';
import './index.scss';

const CardDetail = (props) => {
    const { cardId } = parseQuery(props.location.search);
    const [tableData, setTableData] = useState({
        loading: false,
        data: {}
    })

    const { queryObject, query } = useQuery();
    const { get } = useFetch(`card/${cardId}`);
    const handleGetCardDetail = () => {
        setTableData({
            ...tableData,
            loading: true,
        });

        get(query).then(data => {
            setTableData({
                loading: false,
                data,
            });
        })
    };

    console.log(tableData, '>>')

    useEffect(() => {
        handleGetCardDetail()
    }, [])

    const { pin, creationDate, code, firstAttachedPerson, owner, secondAttachedPerson } = tableData.data;
    console.log(tableData.data, '>>')

    if(tableData.loading) {
        return  (
            <div className="content">
                Loading
            </div>
        )
    }
    return (
        <div className="content">
            <div>
                <Row>
                    <Col >

                        <Card>
                            <CardHeader>
                                <div>
                                    <h2 className="card-derail-title">
                                        <p>
                                            Pin <b>{pin}</b>
                                        </p>

                                        <p>
                                            Type <b> {code?.type}</b>
                                        </p>

                                        <p>
                                            Creation Date <b>{new Date(creationDate).toDateString()}</b>
                                        </p>


                                    </h2>

                                </div>


                                <CardTitle tag="h3">First Attached Person</CardTitle>

                            </CardHeader>

                            <TableDetail
                                tableData={firstAttachedPerson}
                            />
                        </Card>
                    </Col>
                </Row>

               <Row>
                   <Col md="6">
                       <Card>
                           <CardHeader>
                               <CardTitle tag="h3">Owner</CardTitle>
                           </CardHeader>

                           <TableDetail
                               tableData={owner}
                           />
                       </Card>
                   </Col>

                   <Col md="6">
                       <Card>
                           <CardHeader>
                               <CardTitle tag="h3"> Second Attached Person</CardTitle>
                           </CardHeader>

                           <TableDetail
                               tableData={secondAttachedPerson}
                           />
                       </Card>
                   </Col>
               </Row>
            </div>
        </div>
    )
}
export default withRouter(CardDetail);