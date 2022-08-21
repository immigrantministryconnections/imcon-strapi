import Blocks from 'editorjs-blocks-react-renderer';

import { textBlockConfig } from '../../styles/textBlockConfig';

export default function TextSection({ data }) {
  return (
    <div className="w-full my-2">
      {data.title && (
        <h2
          className={`text-xl font-bold tracking-tight sm:text-3xl sm:tracking-tight ${
            data.centerText && 'text-center'
          }`}
        >
          {data.title}
        </h2>
      )}
      <div className={`${data.centerText && 'text-center'} my-8`}>
        <Blocks
          data={JSON.parse(data.content)}
          config={{
            code: {
              className: 'language-js my-16',
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
              className: 'text-base text-opacity-75',
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
