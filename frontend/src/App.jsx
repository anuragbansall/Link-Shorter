import React from "react";
import { Routes, Route } from "react-router";
import MainLayout from "./Components/Common/MainLayout";
import Home from "./Pages/Home/Home";
import BankLayout from "./Components/Common/BankLayout";
import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
import DasboardPageLayout from "./Pages/Dashboard/DasboardPageLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CreateLink from "./Pages/Dashboard/CreateLink";
import MyLink from "./Pages/Dashboard/MyLink";
import Analytics from "./Pages/Dashboard/Analytics";
import Settings from "./Pages/Dashboard/Settings";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<BankLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <DasboardPageLayout title="Dashboard">
                  <Dashboard />
                </DasboardPageLayout>
              }
            />
            <Route
              path="/dashboard/create-link"
              element={
                <DasboardPageLayout title="Create Link">
                  <CreateLink />
                </DasboardPageLayout>
              }
            />
            <Route
              path="/dashboard/my-links"
              element={
                <DasboardPageLayout title="My Links">
                  <MyLink />
                </DasboardPageLayout>
              }
            />
            <Route
              path="/dashboard/analytics"
              element={
                <DasboardPageLayout title="Analytics">
                  <Analytics />
                </DasboardPageLayout>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <DasboardPageLayout title="Settings">
                  <Settings />
                </DasboardPageLayout>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
