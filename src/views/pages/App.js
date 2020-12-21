import React, { Suspense } from 'react';
import DefaultRoutes from '../../routing/DefaultRoutes';
import { withRouter } from 'react-router-dom';

const App = (props) => {

    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <DefaultRoutes {...props}/>
            </Suspense>
        </>
    )
};

export default withRouter(App);
