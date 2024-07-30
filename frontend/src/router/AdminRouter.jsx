import React from 'react';
import { Routes, Route } from "react-router-dom";
import { map } from 'lodash';
import { AdminLayout } from "../layouts";
import { Auth } from "../pages/admin";
import { Users } from "../pages/admin"; // Asumo que este componente existe

const user = { email:"test@test.com" }

export function AdminRouter(){

const loadLayout = (Layout, Page) => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};


return (
  <Routes>
    {user ? (
      <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
    ) : (
      <>
      {["/admin", "/admin/blog"].map((path)=>(
        <Route key={path} path={path} element={loadLayout(AdminLayout, Users)} />
  ))}
      <Route path="/admin/*" element={loadLayout(AdminLayout, Auth)} />
      </>
    )}
  </Routes>
);
}