import Script from 'next/script';

export default function EmbeddedForm({ data }) {
  return (
    <div className="">
      <Script src={`${data.src}`} />
      <iframe
        id="mb-formbuilder-container"
        data-uniqueid="6475399883009931"
        className="w-full h-[1334px] border-none"
        src="https://forms.ministryforms.net/viewForm.aspx?formid=c321f2f8-dc8f-4a9c-b578-591712615dbf&direct-link=&embed=true&frameid=6475399883009931"
        frameborder="0"
      />
    </div>
  );
}
