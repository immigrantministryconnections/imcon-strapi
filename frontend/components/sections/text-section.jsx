import RichText from '../elements/rich-text';
import { colors } from '@/styles/colors';

export default function TextSection({ data }) {
  return (
    <div className="w-full my-2">
      {data.title && (
        <h2
          className={`text-xl text-${
            colors[data.titleColor] || 'mediumBlue'
          } font-bold tracking-tight sm:text-3xl sm:tracking-tight ${
            data.centerText && 'text-center'
          }`}
        >
          {data.title}
        </h2>
      )}
      <div
        className={`${data.centerText && 'text-center'} text-${
          colors[data.contentColor] || 'mediumBlue'
        } my-8`}
      >
        {!!data.content && <RichText data={JSON.parse(data.content)} />}
      </div>
    </div>
  );
}
