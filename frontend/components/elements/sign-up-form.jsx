import { useForm } from 'react-hook-form';

import { LockClosedIcon } from '@heroicons/react/solid';

export default function SignUpForm({ onSubmit, submitErrors }) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="remember" defaultValue="true" />
      <input
        type="hidden"
        name="honeypot"
        id="honeypot"
        value=""
        {...register('honeypot')}
      />
      <div className="rounded-md shadow-sm -space-y-px">
        {submitErrors && (
          <div className="text-red-600 text-center bg-red-400/25 rounded p-2">
            {submitErrors.error}
          </div>
        )}
        <div>
          <label htmlFor="first-name" className="sr-only">
            First name
          </label>
          <input
            id="first-name"
            name="firstName"
            type="firstName"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="First name"
            {...register('firstName', { required: true })}
          />
          {errors.firstName && (
            <span className="text-sm text-red-600">First name is required</span>
          )}
        </div>
        <div>
          <label htmlFor="last-name" className="sr-only">
            Last name
          </label>
          <input
            id="last-name"
            name="lastName"
            type="lastName"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Last name"
            {...register('lastName', { required: true })}
          />
          {errors.lastName && (
            <span className="text-sm text-red-600">Last name is required</span>
          )}
        </div>
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="text-sm text-red-600">
              The email field is required
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            {...register('password', {
              required: true,
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            })}
          />
          {errors.password && (
            <span className="text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="confirm-password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
        </div>
      </div>

      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="subscribe"
            aria-describedby="comments-description"
            name="subscribe"
            type="checkbox"
            defaultChecked={true}
            className="h-4 w-4 rounded border-gray-300 text-lightBlue focus:ring-mediumBlue"
            {...register('subscribe')}
          />
        </div>
        <div className="ml-3 text-sm">
          <span id="comments-description" className="text-mediumBlue">
            Please subscribe me to your blogs
          </span>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-mediumBlue hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          Sign up
        </button>
      </div>
    </form>
  );
}
