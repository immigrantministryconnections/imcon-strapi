export default function PrimaryButton({ size, text, onClick }) {
  switch (size) {
    case 'tiny':
      return (
        <button
          onClick={onClick}
          type="button"
          className="inline-flex items-center justify-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-mediumBlue hover:darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {text}
        </button>
      );
    case 'small':
      return (
        <button
          onClick={onClick}
          type="button"
          className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-mediumBlue hover:darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {text}
        </button>
      );
    case 'medium':
      return (
        <button
          onClick={onClick}
          type="button"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-mediumBlue hover:darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {text}
        </button>
      );
    case 'large':
      return (
        <button
          onClick={onClick}
          type="button"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-mediumBlue hover:darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {text}
        </button>
      );
    case 'extra-large':
      return (
        <button
          onClick={onClick}
          type="button"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-mediumBlue hover:darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {text}
        </button>
      );
    default:
      break;
  }
}
