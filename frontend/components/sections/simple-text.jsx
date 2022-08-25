import { colors } from '@/styles/colors';

export default function SimpleText({ data }) {
  return (
    <div
      className={`${data.text.center ? 'text-center' : ''} text-${
        colors[data.textColor] || 'mediumBlue'
      }`}
    >
      <span>{data.text.text}</span>
    </div>
  );
}
