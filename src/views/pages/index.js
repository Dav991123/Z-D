import React, { useReducer } from 'react';
import AdminContext from '../../context/adminContext';
import { reducers } from '../../reducers';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import IsNotAuthLayer from '../../routing/layers/IsNotAuthLayer';
import IsAuthLayer from '../../routing/layers/isAuthLayer';
import defineGuards from '../../routing/defineGuards';
import Splash from '../../components/Splash';
import Login from '../pages/Login';
import App from '../pages/App';

const AppWrapper = () => {
    const initialState = {
        isAuth: false,
    };
    const [state, dispatch] = useReducer(reducers, initialState);


    console.log(state.isAuth, '>')
    return (
        <AdminContext.Provider value={{state, dispatch}}>
            <BrowserRouter>
                <Splash>
                    <Switch>
                        {/*{*/}
                        {/*    state.isAuth && <Redirect to="/admin" />*/}
                        {/*}*/}
                        <Route exact path='/login' render={props => defineGuards([IsNotAuthLayer], Login, props)}/>
                        {/*<Route exact path={'/login'} render={() => <Login />} />*/}
                        <Route path='/' render={props => defineGuards([IsAuthLayer], App, props)}/>
                    </Switch>
                </Splash>
            </BrowserRouter>
        </AdminContext.Provider>
    )
};

export default AppWrapper;