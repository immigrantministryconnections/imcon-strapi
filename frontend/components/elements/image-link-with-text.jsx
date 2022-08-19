import Link from 'next/link';

import { useSession } from 'next-auth/react';

import { useModalContext, MODAL_TYPES } from 'utils/context/modal-context';

import NextImage from './image';

export default function ImageLinkWithText({ imageLink }) {
  const { data: session, status } = useSession();
  const { showModal } = useModalContext();
  const createModal = () => {
    showModal(MODAL_TYPES.SIGNIN_MODAL, {});
  };
  return (
    <div className="flex flex-col items-center cursor-pointer">
      {imageLink.imageLink.protected && !session ? (
        <button onClick={createModal}>
          <a>
            <NextImage
              media={imageLink.imageLink.image}
              height={200}
              width={600}
            />
          </a>
        </button>
      ) : (
        <Link
          as={`${imageLink.imageLink.url}`}
          href={`${imageLink.imageLink.url}`}
        >
          <a>
            <NextImage
              media={imageLink.imageLink.image}
              height={200}
              width={600}
            />
          </a>
        </Link>
      )}
      <h3 className="font-medium text-lg text-[#1e1e1e]">
        {imageLink.text || imageLink.title}
      </h3>
    </div>
  );
}
