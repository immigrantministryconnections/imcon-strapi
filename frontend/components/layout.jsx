import { useContext } from 'react';
import Navbar from './elements/navbar';
import Footer from './elements/footer';

import { GlobalContext } from 'pages/_app';

const Layout = ({ children }) => {
  const { global } = useContext(GlobalContext);
  const { navbar, footer } = global;
  return (
    <div className="realtive flex flex-col min-h-screen">
      <Navbar navbar={navbar} />
      <main className="top-0 h-full container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer footer={footer} />
    </div>
  );
};

export default Layout;
