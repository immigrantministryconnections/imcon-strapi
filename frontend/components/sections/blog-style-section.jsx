import Link from 'next/link';
import Blocks from 'editorjs-blocks-react-renderer';
import RichText from '../elements/rich-text';

export default function BlogStyleSection({ data }) {
  return (
    <div className="flex flex-col w-full my-2">
      {!!data.blogSectionTitle && (
        <h2
          className={`text-xl font-bold tracking-tight sm:text-3xl sm:tracking-tight ${
            data.centerText && 'text-center'
          }`}
        >
          {data.blogSectionTitle}
        </h2>
      )}
      {!!data.author && <div className="font-lg">{data.author}</div>}
      {!!data.authorLink && (
        <Link href={data.authorLink.url} passHref={true}>
          <a className="text-blue-500 underline">{data.authorLink.text}</a>
        </Link>
      )}
      <div className={`my-8`}>
        <RichText data={JSON.parse(data.content)} />
      </div>
    </div>
  );
}
