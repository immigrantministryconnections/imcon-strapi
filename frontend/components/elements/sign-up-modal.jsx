import { Fragment, useRef, useState, useContext } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useModalContext } from 'utils/context/modal-context';
import NextImage from 'next/image';
import SignUpForm from './sign-up-form';
import OptionalForm from './optional-form';
import { getStrapiURL, signUp, updateUser } from 'utils/api';
import SuccessSection from './success-section';

import { GlobalContext } from 'pages/_app';
import RichText from './rich-text';

export default function SignInModal() {
  const { hideModal } = useModalContext();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState();
  const [email, setEmail] = useState();
  const [richTextColor, setRichTextColor] = useState('#00000');
  const [password, setPassword] = useState();
  const [hubspotUser, setHubspotUser] = useState();

  const { global } = useContext(GlobalContext);

  const { content } = global.global.data.attributes.popupText;

  const handleModalToggle = () => {
    localStorage.setItem('imcon_modal', Date.now());
    hideModal();
  };

  const cancelButtonRef = useRef(null);

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
          setEmail(data.email);
          setPassword(data.password);
        } catch (error) {
          setErrors({
            error:
              'Server error. Check your internet connection or please try again at another time.',
          });
        }

        // send to hubspot
        const hubspotRes = await fetch(getStrapiURL('/api/hubspot-subscribe'), {
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
        const hubspotJson = await hubspotRes.json();
        setHubspotUser(hubspotJson.id);
        setLoading(false);
        if (!errors) {
          setSuccess(true);
          setStep(step + 1);
        }
      } else {
        setErrors({ error: 'Form submit only works in production' });
      }
    }
  };

  const onSubmitOptional = async (data) => {
    if (data.honeypot === '') {
      setLoading(true);
      // Send to hubspot in prod only
      if (
        true
        // process.env.NODE_ENV === 'production' &&
        // process.env.NEXT_PUBLIC_NETLIFY_CONTEXT === 'production'
      ) {
        await fetch(getStrapiURL('/api/hubspot-subscribe'), {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            id: hubspotUser,
            state: data?.state || '',
            ministryfocus: data?.ministryTypes || '',
            ethnicfocus: data?.ethnicities || '',
            salariedministry: data?.salariedMinistry === true ? 'yes' : 'no',
          }),
        });
      }
      setErrors(null);
      setLoading(false);
      setStep(step + 1);
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
              <Dialog.Panel className="relative bg-imconYellow rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="absolute top-0 right-0 pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-imconYellow text-darkBlue hover:darkBlue focus:outline-none focus:ring-2 focus:ring-mediumBlue focus:ring-offset-2"
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
                        src="/popup_image.jpg"
                        width={300}
                        height={128}
                      />

                      <Dialog.Title
                        as="h3"
                        className={`text-lg text-center leading-6 font-bold text-darkBlue mt-4`}
                      >
                        {step === 1 && <RichText data={JSON.parse(content)} />}

                        {step === 2 &&
                          'Optional: To better serve you and others, please provide the following voluntary information'}
                      </Dialog.Title>
                    </div>
                    {step === 1 && (
                      <div className="flex items-center justify-center flex-col gap-y-4">
                        <SignUpForm
                          onSubmit={onSubmitSignup}
                          loading={loading}
                          submitErrors={errors}
                          buttonText="Request My Copy"
                          inModal={true}
                        />
                      </div>
                    )}
                    {step === 2 && (
                      <OptionalForm
                        loading={loading}
                        submitErrors={errors}
                        onClose={() => setStep(step + 1)}
                        onSubmit={onSubmitOptional}
                        email={email}
                        password={password}
                      />
                    )}
                    {step === 3 && (
                      <SuccessSection closeModal={handleModalToggle} />
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
