import { useContext, useEffect, useState } from 'react';
import Navbar from './elements/navbar';
import Footer from './elements/footer';

import { GlobalContext } from 'pages/_app';

export default function Layout({ children }) {
  const { global } = useContext(GlobalContext);
  const { navbar, footer } = global.global.data.attributes;

  return (
    <div className="relative min-h-screen">
      <Navbar navbar={navbar} />
      <main className="top-0 h-full container mx-auto pt-2 pb-20 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer footer={footer} />
    </div>
  );
}
