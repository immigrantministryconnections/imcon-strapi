import { useContext, useEffect, useState } from 'react';
import Navbar from './elements/navbar';
import Footer from './elements/footer';

import { GlobalContext } from 'pages/_app';
import { getSession, useSession } from 'next-auth/react';

export default function Layout({ children }) {
  const { data: session } = useSession();
  const { global } = useContext(GlobalContext);
  const { navbar, footer } = global.global.data.attributes;
  const [userSession, setUserSession] = useState(session);

  useEffect(() => {
    const sessionRes = async () => {
      const session = await getSession();
      setUserSession(session);
    };
    sessionRes();
  }, [session]);

  return (
    <div className="relative min-h-screen">
      <Navbar navbar={navbar} session={userSession} />
      <main className="top-0 h-full container mx-auto pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer footer={footer} />
    </div>
  );
}
