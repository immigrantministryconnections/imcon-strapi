import NextImage from 'next/image';
import PrimaryButton from '@/components/elements/primary-button';
import Sections from '@/components/sections';

import { useModalContext, MODAL_TYPES } from 'utils/context/modal-context';

import { Fragment, useContext, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { GlobalContext } from 'pages/_app';

export default function SignInModal() {
  const { mezzaninePage } = useContext(GlobalContext);
  const { hideModal, showModal } = useModalContext();

  const cancelButtonRef = useRef(null);

  const handleModalToggle = () => {
    hideModal();
  };

  const signInModal = () => {
    showModal(MODAL_TYPES.SIGNIN_MODAL);
  };

  const signUpModal = () => {
    showModal(MODAL_TYPES.SIGNUP_MODAL);
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
          <div className="flex center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
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
                    <div className="min-h-screen">
                      {mezzaninePage.attributes.mainImage?.data && (
                        <div className="flex items-center justify-center">
                          <NextImage
                            height={227}
                            width={500}
                            src={
                              mezzaninePage.attributes.mainImage.data.attributes
                                .url
                            }
                          />
                        </div>
                      )}
                      <div className="">
                        <Sections
                          bottomPadding={false}
                          sections={mezzaninePage.attributes.sections}
                        />
                        <div className="flex flex-col gap-y-2 items-center">
                          <PrimaryButton
                            size="medium"
                            text="Create a free account"
                            onClick={signUpModal}
                          />
                          <PrimaryButton
                            size="medium"
                            text="Login here"
                            onClick={signInModal}
                          />
                          <button
                            className="underline text-darkBlue text-base mt-2"
                            onClick={handleModalToggle}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
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
