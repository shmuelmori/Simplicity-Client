import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import Side from "./Side";

const Layout: React.FC = () => {
  const [isAsideOpen, setAsideOpen] = useState<boolean>(window.innerWidth > 500); // התחל כנסתר

  const toggleAside = () => {
    setAsideOpen(!isAsideOpen);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header toggleAside={toggleAside} isAsideOpen={isAsideOpen} />

      {/* תוכן מרכזי */}
      <main className={`flex-grow transition-transform duration-300`}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer isAsideOpen={isAsideOpen} />

      {/* Side bar */}
      <Side isOpen={isAsideOpen} />
    </div>
  );
}

export default Layout;
