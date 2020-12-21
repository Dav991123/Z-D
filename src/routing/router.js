import React, {lazy} from 'react';
import { Redirect } from 'react-router-dom';
const AdminLayout =  lazy(() => import('../layouts/Admin/Admin'));
const Buttons = lazy(() => import('../views/components/Buttons'))
const Wizard = lazy(() => import('../views/forms/Wizard'));
const ExtendedForms = lazy(() => import('../views/forms/ExtendedForms'));
const RegularForms = lazy(() => import('../views/forms/RegularForms'));
const Calendar = lazy(() => import('../views/Calendar'));
const SweetAlert = lazy(() => import('../views/components/SweetAlert'));
const Notifications = lazy(() => import('../views/components/Notifications'));
const Icons = lazy(() => import('../views/components/Icons'));
const User = lazy(() => import('../views/pages/User'));

const rootRoutes = [
    {
        path: '/admin',
        component: AdminLayout,
        exact: true,
    },

    {
        path: '/admin/buttons',
        component: Buttons ,
        exact: true,
    },

    {
        path: '/admin/wizard',
        component: Wizard ,
        exact: true,
    },

    {
        path: '/admin/extendedForms',
        component: ExtendedForms ,
        exact: true,
    },


    {
        path: '/',
        component: () => <Redirect to= '/admin/dashboard' />,
        exact: true
    },
    {
        path: '/admin/regularForms',
        component: RegularForms ,
        exact: true,
    },

    {
        path: '/admin/calendar',
        component: Calendar ,
        exact: true,
    },
    {
        path: '/admin/sweet-alert',
        component: SweetAlert ,
        exact: true,
    },
    {
        path: '/admin/notifications',
        component: Notifications ,
        exact: true,
    },
    {
        path: '/admin/icons',
        component: Icons ,
        exact: true,
    },
    {
        path: '/admin/user',
        component: User ,
        exact: true,
    },
]

export const defaultPath = '/';
export default rootRoutes;
