import Link from 'next/link';

import NextImage from './image';

export default function ImageLinkWithText({ imageLink }) {
  return (
    <div className="flex flex-col items-center cursor-pointer">
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
      <h3 className="font-medium text-lg text-[#1e1e1e]">
        {imageLink.text || imageLink.title}
      </h3>
    </div>
  );
}
