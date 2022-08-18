export default function SimpleText({ data }) {
  console.log({ data });
  return (
    <div className={`${data.text.center ? 'text-center' : ''}`}>
      <span>{data.text.text}</span>
    </div>
  );
}
