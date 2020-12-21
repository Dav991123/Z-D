import React from "react";
import {Card, Table} from "reactstrap";

export const TableDetail = ({tableData}) => {
    return (
        <Table>
            <thead className="text-primary">
            <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Email</th>
                <th className="text-left">Name</th>
                <th className="text-left">Phone</th>
                <th className="text-left">Surname</th>
            </tr>
            </thead>

            <tbody>
            <th>{tableData?.id}</th>
            <td>{tableData?.name}</td>
            <td>{tableData?.email}</td>
            <td>{tableData?.phone}</td>
            <td>{tableData?.surname}</td>
            </tbody>
        </Table>
    )
};

