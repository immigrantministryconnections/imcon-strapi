import { useContext, useState, useRef } from 'react';

import { getStrapiURL } from 'utils/api';

import Navbar from './elements/navbar';
import Footer from './elements/footer';

import { useModalContext, MODAL_TYPES } from 'utils/context/modal-context';
import SignUpForm from '../components/elements/sign-up-form';

import { GlobalContext } from 'pages/_app';
import { useEffect } from 'react';

export default function Layout({ showSignup = false, children }) {
  const { global } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [success, setSuccess] = useState();
  const { navbar, footer } = global.global.data.attributes;
  const [modalExpired, setModalExpired] = useState(false);

  const { showModal } = useModalContext();
  const createModal = () => {
    showModal(MODAL_TYPES.SIGNUP_MODAL);
  };

  useEffect(() => {
    const modalCookie = localStorage.getItem('imcon_modal');
    const modalExpired =
      modalCookie !== null ? Date.now() - modalCookie > 3600000 : true;
    setModalExpired(modalExpired);
    if (modalExpired) {
      setTimeout(() => createModal(), 30000);
    }
  }, [modalExpired]);

  const onSubmitSignup = async (data) => {
    if (data.honeypot === '') {
      // Only send in production
      if (
        true
        // process.env.NODE_ENV === 'production' &&
        // process.env.NEXT_PUBLIC_NETLIFY_CONTEXT === 'production'
      ) {
        setLoading(true);
        try {
          // send to mailchimp
          const mailchimpRes = await fetch(
            getStrapiURL('/api/mailchimp-subscribe'),
            {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                subscribe: !!data.subscribe,
              }),
            }
          );

          if (!mailchimpRes.ok) {
            if (mailchimpRes.status === 400) {
              const message = await mailchimpRes.text();
              message = message.split('. ', 1)[0];
              setErrors({ error: message });
            }
            setLoading(false);
          }
        } catch (error) {
          setErrors({
            error:
              'Server error. Check your internet connection or please try again at another time.',
          });
        }

        // send to hubspot
        await fetch(getStrapiURL('/api/hubspot-subscribe'), {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          }),
        });
        setLoading(false);
        if (!errors) {
          setSuccess(true);
        }
      } else {
        setErrors({ error: 'Form submit only works in production' });
      }
    }
  };

  const renderContent = () => {
    if (!showSignup) {
      return children;
    }
    return (
      <>
        <div className="lg:col-span-6">{children}</div>
        <div className="mb-12 lg:mb-0 lg:col-span-2 ld:pt-12 text-darkBlue">
          <div className="border border-darkBlue rounded-md p-4">
            <h5 className="text-center">Subscribe to our weekly blogs</h5>
            <SignUpForm
              loading={loading}
              onSubmit={onSubmitSignup}
              submitErrors={errors}
              success={success}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="relative min-h-screen">
      <Navbar navbar={navbar} />
      <main
        className={`grid ${
          showSignup && 'lg:grid-cols-8'
        } top-0 h-full container mx-auto pt-2 pb-20 px-4 sm:px-6 lg:px-8`}
      >
        {renderContent()}
      </main>
      <Footer footer={footer} />
    </div>
  );
}
