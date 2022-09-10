import { useState } from 'react';

import { useForm } from 'react-hook-form';

import Layout from '@/components/layout';

import { forgotPassword } from 'utils/api';

export default function ForgotPassword() {
  const [submitErrors, setSubmitErrors] = useState(null);
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setAlert(null);
    setLoading(true);
    if (data.honeypot === '') {
      try {
        const forgotRes = await forgotPassword({ email: data.email });
        if (forgotRes?.error) {
          setSubmitErrors({
            error:
              forgotRes.error?.message ||
              'There was en error sending your email',
          });
          reset();
        } else {
          setAlert({
            success: true,
            message:
              'Please check your email for a link to reset your password.',
          });
          reset();
          setSubmitErrors(null);
        }
        setLoading(false);
      } catch (error) {
        setSubmitErrors({
          error:
            'There was an error. Please check your internet connection or try again later.',
        });
        setLoading(false);
      }
    }
  };
  return (
    <Layout>
      <div>
        {alert && alert.message && (
          <div className="flex items-center justify-center mx-auto p-2 max-w-md bg-imconYellow/10">
            {alert.message}
          </div>
        )}

        {submitErrors && submitErrors.error && (
          <div className="flex items-center justify-center mx-auto p-2 max-w-md bg-red-500/10">
            {submitErrors.error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="hidden"
            name="honeypot"
            id="honeypot"
            {...register('honeypot')}
          />
          <div className="flex flex-col items-center justify-center mx-auto max-w-2xl group gap-y-4">
            <label htmlFor="metro-state" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="appearance-none w-2/3 rounded-md relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="text-sm text-red-600">
                This field is required
              </span>
            )}
            <button
              className="group relative w-2/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-mediumBlue hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
              diabled={loading}
            >
              {loading ? 'Processing...' : 'Send password reset email'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
