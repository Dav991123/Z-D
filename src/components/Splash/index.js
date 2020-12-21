import React, { memo, useEffect, useContext, Suspense, useState } from 'react';
import AdminContext from '../../context/adminContext';
import { withRouter, Redirect } from 'react-router-dom';
import { authLogin } from '../../authLogin/auth';

const Splash = ({ children, history, location }) => {
    console.log(location.pathname, '>')
    const { dispatch } = useContext(AdminContext);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const storageData = sessionStorage.getItem('userData');
        if(storageData) {
            const userData = JSON.parse(storageData);
            if(userData.login === 'admin') {
                dispatch({
                    type: 'SET_IS_AUTH',
                    payload: true
                })
                return setIsLoading(false)
            }else {
                history.push('/login')
                dispatch({
                    type: 'SET_IS_AUTH',
                    payload: false
                })
                return setIsLoading(true);
            }
        }
        // if(storageData) {
        //     const userData = JSON.parse(storageData);
        //     authLogin(userData).then(resp => {
        //       if(resp.ok) {
        //           history.push('/login')
        //         dispatch({
        //           type: 'SET_IS_AUTH', payload: true
        //         })
        //           setIsLoading(false);
        //       }
        //     })
        // }else {
        //   setIsLoading(false)
        // }
        setIsLoading(false)

    }, [dispatch, history]);

    return (
        <div>
        {
            isLoading ? (
                <div>
                  Loading...
                </div>
            ): (
                <Suspense fallback={<p>Loading...</p>}>
                    {children}
                </Suspense>
            )
        }
    </div>
    )
};

export default withRouter(memo(Splash));