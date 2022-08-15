import ImageLinkwithText from '../elements/image-link-with-text';

export default function ImageLinkGrid({ images }) {
  images.map((imageLink) => {
    return <ImageLinkwithText imageLink={imageLink} />;
  });
}
