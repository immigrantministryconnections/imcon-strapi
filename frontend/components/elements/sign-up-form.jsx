import { useRef } from 'react';

import { useForm } from 'react-hook-form';

import { LockClosedIcon } from '@heroicons/react/solid';

export default function SignUpForm({ onSubmit }) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
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

      <div>
        <label htmlFor="metro-state" className="sr-only">
          State / metro area of residence
        </label>
        <input
          id="state"
          name="state"
          type="state"
          autoComplete="state"
          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="State of residence"
          {...register('state')}
        />
      </div>

      <div>
        <label htmlFor="ethnicities" className="sr-only">
          Ethnicities served
        </label>
        <input
          id="ethnicitesServed"
          name="ethnicities"
          type="text"
          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Ethnicities served"
          {...register('ethnicities')}
        />
      </div>

      <div>
        <label htmlFor="ministries" className="sr-only">
          Types of ministry
        </label>
        <input
          id="ministryTypes"
          name="ministries"
          type="text"
          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Types of ministry"
        />
      </div>

      <div>
        <p>Are you in salaried ministry?</p>
        <fieldset className="mt-2">
          <legend className="sr-only">Salaried ministry choice</legend>
          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            <div className="flex items-center">
              <input
                id="salaried-yes"
                name="salariedMinistry"
                type="radio"
                value={true}
                defaultChecked={false}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                {...register('salariedMinistry')}
              />
              <label
                htmlFor="salaried-yes"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="salaried-no"
                name="salariedMinistry"
                type="radio"
                value={false}
                defaultChecked={true}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                {...register('salariedMinistry')}
              />
              <label
                htmlFor="salaried-no"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                No
              </label>
            </div>
          </div>
        </fieldset>
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
