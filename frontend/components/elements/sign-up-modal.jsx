import { Fragment, useRef, useState, useContext } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useModalContext } from 'utils/context/modal-context';
import NextImage from 'next/image';
import { getStrapiURL } from 'utils/api';

import { GlobalContext } from 'pages/_app';
import RichText from './rich-text';
import { useEffect } from 'react';

export default function SignInModal() {
  const { hideModal } = useModalContext();

  const { global } = useContext(GlobalContext);

  const { content } = global.global.data.attributes.popupText;

  const handleModalToggle = () => {
    hideModal();
  };

  const cancelButtonRef = useRef(null);

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
              <Dialog.Panel className="relative bg-veryLightBlue rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="absolute top-0 right-0 pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-veryLightBlue text-mediumBlue hover:mediumBlue focus:outline-none focus:ring-2 focus:ring-mediumBlue focus:ring-offset-2"
                    onClick={handleModalToggle}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-md w-full">
                    <div className="flex flex-col items-center">
                      <NextImage
                        src="/jumper_cables.jpg"
                        width={300}
                        height={128}
                      />

                      <Dialog.Title
                        as="h3"
                        className={`text-lg text-center leading-6 font-bold text-mediumBlue mt-4`}
                      >
                        <RichText data={JSON.parse(content)} />
                      </Dialog.Title>
                    </div>
                    <div className="flex items-center justify-center flex-col gap-y-4">
                      <a
                        href="https://www.immigrantministry.com/guidebook"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-white visited:text-white no-underline bg-darkBlue rounded-md p-4"
                      >
                        Request Our Free Guide
                      </a>
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
