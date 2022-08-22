import Blocks from 'editorjs-blocks-react-renderer';
import RichText from '../elements/rich-text';

export default function TextSection({ data }) {
  console.log(data.content);
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
        {!!data.content && <RichText data={JSON.parse(data.content)} />}
      </div>
    </div>
  );
}
