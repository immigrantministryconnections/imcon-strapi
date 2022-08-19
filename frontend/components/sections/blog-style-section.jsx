import Link from 'next/link';
import Blocks from 'editorjs-blocks-react-renderer';

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
        <Blocks
          data={JSON.parse(data.content)}
          config={{
            code: {
              className: 'block my-4 language-js',
            },
            delimiter: {
              className: 'border border-2 w-16 mx-auto',
            },
            embed: {
              className: 'border-0',
            },
            header: {
              className: 'font-bold',
            },
            image: {
              className: 'w-full max-w-screen-md',
              actionsClassNames: {
                stretched: 'w-full h-80 object-cover',
                withBorder: 'border border-2',
                withBackground: 'p-2',
              },
            },
            list: {
              className: 'list-inside',
            },
            paragraph: {
              className:
                'my-2 text-base text-opacity-75 tracking-wide leading-relaxed',
              actionsClassNames: {
                alignment: 'text-{alignment}', // This is a substitution placeholder: left or center.
              },
            },
            quote: {
              className: 'py-3 px-5 italic font-serif',
            },
            table: {
              className: 'table-auto',
            },
          }}
        />
      </div>
    </div>
  );
}
