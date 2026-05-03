import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing.jsx';
import DashboardLayout from '../pages/dashboard/DashboardLayout.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import MedicineVerify from '../pages/dashboard/MedicineVerify.jsx';
import PharmacyLocator from '../pages/dashboard/PharmacyLocator.jsx';
import History from '../pages/dashboard/History.jsx';
import Prescriptions from '../pages/dashboard/Prescriptions.jsx';
import Settings from '../pages/dashboard/Settings.jsx';

import Notifications from '../pages/dashboard/Notifications.jsx';
import Profile from '../pages/dashboard/Profile.jsx';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="verify" element={<MedicineVerify />} />
                <Route path="locator" element={<PharmacyLocator />} />
                <Route path="history" element={<History />} />
                <Route path="prescriptions" element={<Prescriptions />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
