import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "components/auth/Auth";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";

const App = () => {
  return (
    <Routes>
        {/* <Route element={ <Auth/>}> */}
          <Route path="auth/*" element={<AuthLayout />} />
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="rtl/*" element={<RtlLayout />} />
        {/* </Route> */}
    </Routes>
  );
};


export default App;
