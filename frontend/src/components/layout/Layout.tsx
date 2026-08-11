// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Sidebar from './Sidebar'


// const Layout = () => {
//   return (
//     <div className="flex min-h-screen">
//   <Sidebar />
//   <main className="flex-1">
//     <Outlet />
//   </main>
// </div>
//   )
// }

// export default Layout

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileFooter from "./MobileFooter";


const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <main className="pb-20">
          <Outlet />
        </main>

        <MobileFooter />
      </div>
    </div>
  );
};

export default Layout;