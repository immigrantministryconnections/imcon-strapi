/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useModalContext, MODAL_TYPES } from 'utils/context/modal-context';
import NextImage from 'next/image';
import { useRouter } from 'next/router';

import SignInForm from './sign-in-form';
import { signIn } from 'next-auth/react';

export default function SignInModal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const { hideModal, showModal, store } = useModalContext();

  const handleModalToggle = () => {
    hideModal();
  };

  const createModal = () => {
    showModal(MODAL_TYPES.SIGNUP_MODAL, {});
  };

  const cancelButtonRef = useRef(null);

  const onSubmit = async (data) => {
    if (data?.honeypot !== '') {
      setLoading(true);
      try {
        const signinRes = await signIn('credentials', {
          redirect: false,
          callbackUrl: router.asPath,
          email: data.email,
          password: data.password,
        });
        if (!signinRes.ok) {
          setErrors({
            error: 'Please check you username and password and try again.',
          });
        } else {
          setErrors(false);
          handleModalToggle();
        }
        setLoading(false);
      } catch (error) {
        setErrors({
          error:
            'Server error. Check your internet connection or please try again at another time.',
        });
        setLoading(false);
      }
    }
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleModalToggle}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-md w-full space-y-8">
                    <div className="flex flex-col items-center">
                      <NextImage src="/imcon_icon.png" height={50} width={50} />
                      <Dialog.Title
                        as="h3"
                        className="text-lg text-center leading-6 font-bold text-gray-900 mt-4"
                      >
                        Sign in to unlock free access to hundreds of ministry
                        resources
                      </Dialog.Title>
                      <p className="text-center text-md text-gray-600">
                        Or{' '}
                        <button
                          onClick={createModal}
                          className="font-medium text-indigo-600 hover:text-indigo-500 underline"
                        >
                          sign up for a free account
                        </button>
                      </p>
                    </div>
                    {errors && (
                      <div className="text-red-600 text-center bg-red-400/25 rounded p-2">
                        {errors.error}
                      </div>
                    )}
                    {!loading ? (
                      <SignInForm
                        loading={loading}
                        onSubmit={onSubmit}
                        onClose={handleModalToggle}
                      />
                    ) : (
                      <div className="my-8 text-center">Signing In...</div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
