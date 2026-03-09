/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/dashboard/Home';
import Recognize from './pages/dashboard/Recognize';
import History from './pages/dashboard/History';
import HerbLibrary from './pages/dashboard/HerbLibrary';
import Users from './pages/dashboard/Users';
import Announcements from './pages/dashboard/Announcements';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="recognize" element={<Recognize />} />
          <Route path="history" element={<History />} />
          <Route path="herb-library" element={<HerbLibrary />} />
          <Route path="users" element={<Users />} />
          <Route path="announcements" element={<Announcements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
