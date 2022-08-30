import Link from 'next/link';

import { useForm } from 'react-hook-form';

import { LockClosedIcon } from '@heroicons/react/solid';

export default function SignInForm({ onSubmit, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="remember" defaultValue="true" />
      <input type="hidden" name="honeypot" id="honeypot" value="" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="text-sm text-red-600">This field is required</span>
          )}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className="text-sm text-red-600">This field is required</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link href="/auth/forgot-password">
            <a
              onClick={onClose}
              className="font-medium text-lightBlue hover:text-mediumBlue"
            >
              Forgot your password?
            </a>
          </Link>
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
          Sign in
        </button>
      </div>
    </form>
  );
}
