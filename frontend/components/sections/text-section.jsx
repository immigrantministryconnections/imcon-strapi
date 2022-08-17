import ReactMarkdown from 'react-markdown';

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
        <ReactMarkdown
          children={data.content}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="leading-loose" {...props} />
            ),
            li: ({ node, ordered = 'false', ...props }) => (
              <li className="list-disc" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a
                className="text-blue-500 underline hover:text-blue-400"
                {...props}
              />
            ),
            ul: ({ ordered = 'false', ...props }) => <ul {...props} />,
          }}
        />
      </div>
    </div>
  );
}
