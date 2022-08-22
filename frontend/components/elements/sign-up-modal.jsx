/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useModalContext, MODAL_TYPES } from 'utils/context/modal-context';
import NextImage from 'next/image';
import SignUpForm from './sign-up-form';
import OptionalForm from './optional-form';
import { signUp, updateUser } from 'utils/api';
import SuccessSection from './success-section';

export default function SignInModal() {
  const { hideModal, showModal, store } = useModalContext();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const handleModalToggle = () => {
    hideModal();
  };

  const createModal = () => {
    showModal(MODAL_TYPES.SIGNUP_MODAL, {});
  };

  const signInModal = () => {
    showModal(MODAL_TYPES.SIGNIN_MODAL);
  };

  const cancelButtonRef = useRef(null);

  const onSubmitSignup = async (data) => {
    if (data.honeypot === '') {
      setLoading(true);
      try {
        const signUpRes = await signUp({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        });
        if (signUpRes?.error) {
          setErrors({
            error: signUpRes.error?.message || 'There was en error signing up.',
          });
        } else {
          setErrors(null);
          setUser(signUpRes);
          setStep(step + 1);
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

  const onSubmitOptional = async (data) => {
    if (data.honeypot === '') {
      setLoading(true);
      try {
        const signUpRes = await updateUser({
          user,
          state: data.state,
          ethnicitiesServed: data.ethnicities,
          ministryTypes: data.ministryTypes,
          salariedMinistry: data.salariedMinistry,
        });
        if (signUpRes?.error) {
          setErrors({
            error: signUpRes.error?.message || 'There was en error signing up.',
          });
        } else {
          setErrors(null);
          setStep(step + 1);
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
                    <div className="flex flex-col items-center">
                      <NextImage src="/imcon_icon.png" height={50} width={50} />
                      <Dialog.Title
                        as="h3"
                        className="text-lg text-center leading-6 font-bold text-gray-900 mt-4"
                      >
                        {step === 1 &&
                          'Unlock free access to hundreds of ministry resources'}
                        {step === 2 &&
                          'Optional: To better serve you and others, please provide the following voluntary information'}
                      </Dialog.Title>
                    </div>
                    {step === 1 && (
                      <SignUpForm
                        submitErrors={errors}
                        onSubmit={onSubmitSignup}
                      />
                    )}
                    {step === 2 && (
                      <OptionalForm
                        onClose={handleModalToggle}
                        submitErrors={errors}
                        onSubmit={onSubmitOptional}
                      />
                    )}
                    {step === 3 && <SuccessSection signInModal={signInModal} />}
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
