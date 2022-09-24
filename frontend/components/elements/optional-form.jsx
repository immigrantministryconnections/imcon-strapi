import { useForm } from 'react-hook-form';

export default function OptionalForm({
  loading,
  onSubmit,
  onClose,
  submitErrors,
  email,
  password,
}) {
  const {
    register,
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
      {submitErrors && (
        <div className="text-red-600 text-center bg-red-400/25 rounded p-2">
          {submitErrors.error}
        </div>
      )}
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
          placeholder="In what metro / state do you reside?"
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
          placeholder="Which people groups are you most passionate about serving?"
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
          placeholder="What kinds of ministries are you most passionate about?"
          {...register('ministryTypes')}
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
          disabled={loading}
          type="submit"
          className="group mb-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-mediumBlue hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
        <button
          onClick={() => onClose()}
          className="group relative w-full flex justify-center py-2 px-4 border border-mediumBlue text-sm font-medium rounded-md text-darkBlue bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightBlue"
        >
          Skip
        </button>
      </div>
    </form>
  );
}
