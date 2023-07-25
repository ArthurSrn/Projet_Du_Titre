import React from 'react';
import FollowBar from "@/components/layout/FollowBar"
import Sidebar from "@/components/layout/Sidebar"

// import FollowBar from "@/components/layout/FollowBar"
// import Sidebar from "@/components/layout/Sidebar"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
            <Sidebar />
            {children}
            {/* <div className='flex'><FollowBar /></div> */}
    </div>

  )
}

export default Layout;