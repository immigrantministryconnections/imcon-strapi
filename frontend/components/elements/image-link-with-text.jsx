import { useState, useEffect } from 'react';

import Link from 'next/link';

import { useModalContext, MODAL_TYPES } from 'utils/context/modal-context';

import NextImage from './image';
import { colors } from '@/styles/colors';
import { textSize } from '@/styles/text-size';

export default function ImageLinkWithText({ imageLink }) {
  const { showModal } = useModalContext();
  const createModal = () => {
    showModal(MODAL_TYPES.MEZZ_MODAL, {});
  };

  return (
    <div className="flex flex-col items-center cursor-pointer">
      {imageLink.imageLink.url?.startsWith('http') ? (
        <a
          href={imageLink.imageLink.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <NextImage
            media={imageLink.imageLink.image}
            height={200}
            width={600}
          />
        </a>
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
        } text-${colors[imageLink.textColor || 'black']}`}
      >
        {imageLink.text || imageLink.title}
      </h3>
    </div>
  );
}
