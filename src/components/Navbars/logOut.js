import React, { useContext } from 'react';
import AdminContext from '../../context/adminContext';

import {
    DropdownItem,
    NavLink,
  } from "reactstrap";


const LogOut = () => {
    const { dispatch } = useContext(AdminContext);
    return (
        <NavLink tag="li" onClick={() => {
            dispatch({
                type: 'SET_IS_AUTH',
                payload: false
            })
            window.sessionStorage.removeItem('userData')
        }}>
         <DropdownItem className="nav-item">Log out</DropdownItem>
        </NavLink>
    )
}
export default LogOut;