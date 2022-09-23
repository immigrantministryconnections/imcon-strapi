import PrimaryButton from './primary-button';

export default function SuccessSection({ closeModal }) {
  return (
    <div className="flex flex-col item-center justify-center">
      <span className="flex text-darkBlue items-center justify-center text-center mb-4">
        Your request has been received. Within 5 minutes you will receive an
        email with your PDF
      </span>
      <PrimaryButton onClick={closeModal} size="medium" text="Close" />
    </div>
  );
}
