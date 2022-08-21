/* This example requires Tailwind CSS v2.0+ */

export default function Footer() {
  return (
    <footer className="bg-white absolute bottom-0 w-full">
      <div className="mx-auto py-4 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; 2022 IMCON
          </p>
        </div>
      </div>
    </footer>
  );
}
