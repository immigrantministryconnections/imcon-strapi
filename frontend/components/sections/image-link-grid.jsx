import ImageLinkWithText from '@/components/elements/image-link-with-text';

export default function ImageLinkGrid({ data }) {
  return data.imageLink?.map((imageLink) => {
    return (
      <div
        key={imageLink.text}
        className="mb-6 last:mb-0 items-center w-full text-center"
      >
        <ImageLinkWithText imageLink={imageLink} />
      </div>
    );
  });
}
