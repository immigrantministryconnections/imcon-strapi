import { useContext } from 'react';
import Navbar from './elements/navbar';
import Footer from './elements/footer';

import { GlobalContext } from 'pages/_app';

const Layout = ({ children }) => {
  const { global } = useContext(GlobalContext);
  const { navbar, footer } = global;
  return (
    <div className="flex flex-col justify-between">
      <Navbar navbar={navbar} />
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      {/* Aligned to the bottom */}
      <div className="absolute bottom-0 w-full">
        <Footer footer={footer} />
      </div>
    </div>
  );
};

export default Layout;
