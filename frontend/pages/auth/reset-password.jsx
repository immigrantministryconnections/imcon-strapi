import { useState } from 'react';
import { useRouter } from 'next/router';

import { signIn } from 'next-auth/react';

import { useForm } from 'react-hook-form';

import Layout from '@/components/layout';

import { resetPassword } from 'utils/api';
import SignInForm from '@/components/elements/sign-in-form';

export default function ResetPassword() {
  const router = useRouter();
  const [submitErrors, setSubmitErrors] = useState();
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setAlert(null);
    setLoading(true);
    if (data.honeypot === '') {
      try {
        const resetRes = await resetPassword({
          password: data.password,
          code: router.query.code,
          passwordConfirmation: data.confirmPassword,
        });
        console.log({ resetRes });
        if (resetRes?.error) {
          setSubmitErrors({
            error:
              resetRes.error?.message ||
              'There was an error while resetting your password.',
          });
          reset();
        } else {
          setAlert({
            success: true,
            message:
              'Your password has been reset. Please sign in with your new password.',
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
  const onSignupSubmit = async (data) => {
    setAlert(null);
    if (data?.honeypot !== '') {
      setLoading(true);
      try {
        const signinRes = await signIn('credentials', {
          redirect: false,
          callbackUrl: '/',
          email: data.email,
          password: data.password,
        });
        if (!signinRes.ok) {
          setSubmitErrors({
            error: 'Please check you username and password and try again.',
          });
        } else {
          setSubmitErrors(false);
          router.push('/');
        }
        setLoading(false);
      } catch (error) {
        setSubmitErrors({
          error:
            'Server error. Check your internet connection or please try again at another time.',
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
          <div className="flex items-center max-w-sm justify-center mx-auto p-2 bg-red-500/10">
            {submitErrors.error}
          </div>
        )}

        {!alert && !alert?.success ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="hidden"
              name="honeypot"
              id="honeypot"
              {...register('honeypot')}
            />
            <div className="flex flex-col items-center justify-center mx-auto max-w-2xl group gap-y-4">
              <label htmlFor="metro-state" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                className="appearance-none relative block w-1/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-600">
                  This field is required
                </span>
              )}

              <label htmlFor="password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="confirm-password"
                className="appearance-none rounded-md relative block w-1/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm password"
                {...register('confirmPassword', {
                  required: true,
                  validate: (val) => {
                    if (watch('password') != val) {
                      return 'Your passwords do no match';
                    }
                  },
                })}
              />
              {errors.confirmPassword && (
                <span className="text-sm text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}

              <button
                className="group relative w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-mediumBlue hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Reset password
              </button>
            </div>
          </form>
        ) : (
          <SignInForm onSubmit={onSignupSubmit} />
        )}
      </div>
    </Layout>
  );
}
