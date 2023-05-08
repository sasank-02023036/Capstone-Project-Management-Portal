import React from 'react';
import jwt_decode from 'jwt-decode';
import ClientDashBoard from 'components/Dashboard/ClientDashboard';
import AdminDashboard from 'components/Dashboard/AdminDashboard';

export default function DashBoardPage() {
  
  const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
  const decodedToken = jwt_decode(token);
  const role = decodedToken.role;

  return (
    <div>
      {role === "ADMIN" && <AdminDashboard />}
      {role === "STUDENT" && <>STUDENT</>}
      {role === "CLIENT" && <ClientDashBoard />}
    </div>
  );
}
