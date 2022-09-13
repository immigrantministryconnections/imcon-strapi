import RichText from '../elements/rich-text';

const alignment = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
  justified: 'text-justify',
};

export default function RichTextSection({ data }) {
  return (
    <div className="w-full my-2">
      <div
        className={`${alignment[data.alignment]} text-[${data.textColor}] my-8`}
      >
        {!!data.content && <RichText data={JSON.parse(data.content)} />}
      </div>
    </div>
  );
}
