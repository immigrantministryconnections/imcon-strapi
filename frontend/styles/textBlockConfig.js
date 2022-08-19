export const config = {
  code: {
    className: 'language-js my-8',
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
};
