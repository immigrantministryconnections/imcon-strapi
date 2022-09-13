import { useState, useEffect } from 'react';

import Link from 'next/link';

import { useModalContext, MODAL_TYPES } from 'utils/context/modal-context';

import { useSession, getSession } from 'next-auth/react';

import NextImage from './image';
import { colors } from '@/styles/colors';
import { textSize } from '@/styles/text-size';

export default function ImageLinkWithText({ imageLink }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [userSession, setUserSession] = useState(null);
  const { showModal } = useModalContext();
  const createModal = () => {
    showModal(MODAL_TYPES.MEZZ_MODAL, {});
  };

  useEffect(() => {
    const sessionRes = async () => {
      const session = await getSession();
      setUserSession(session);
      setLoading(false);
    };
    sessionRes();
  }, [session]);

  return loading ? (
    <></>
  ) : (
    <div className="flex flex-col items-center cursor-pointer">
      {imageLink.imageLink.protected && !userSession ? (
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
      <h3
        className={`font-bold text-${
          textSize[imageLink.textSize || 'large']
        } text-${colors[imageLink.textColor || 'mediumBlue']}`}
      >
        {imageLink.text || imageLink.title}
      </h3>
    </div>
  );
}
