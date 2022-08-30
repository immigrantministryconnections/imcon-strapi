export default function SuccessSection({ signInModal }) {
  return (
    <div className="flex flex-col item-center justify-center">
      <span className="flex text-white items-center justify-center rounded-lg bg-lightBlue/50 p-2 mb-4">
        Your account has been successfully created.
      </span>
      <button
        onClick={signInModal}
        className="group mb-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-mediumBlue hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Click here to sign in
      </button>
    </div>
  );
}
