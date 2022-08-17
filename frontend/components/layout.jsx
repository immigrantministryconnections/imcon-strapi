import { useContext } from 'react';
import Navbar from './elements/navbar';
import Footer from './elements/footer';

import { GlobalContext } from 'pages/_app';

const Layout = ({ children }) => {
  const { global } = useContext(GlobalContext);
  const { navbar, footer } = global;
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar navbar={navbar} />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer footer={footer} />
    </div>
  );
};

export default Layout;
