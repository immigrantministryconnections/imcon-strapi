import { useRouter } from 'next/router';

import Hero from '@/components/sections/hero';
import ImageLinkGrid from '@/components/sections/image-link-grid';
import TextSection from '@/components/sections/text-section';
import LeadershipSection from '@/components/sections/leadership-section';
import SimpleText from '@/components/sections/simple-text';
import EmbeddedForm from '@/components/sections/embedded-form';
import LinkList from '@/components/sections/link-list-section';

// Map Strapi sections to section components
const sectionComponents = {
  ComponentSectionsHero: Hero,
  ComponentSectionsImageLinkGrid: ImageLinkGrid,
  ComponentSectionsTextSection: TextSection,
  ComponentSectionsLeadershipSection: LeadershipSection,
  ComponentSectionsSimpleText: SimpleText,
  ComponentSectionsEmbeddedForm: EmbeddedForm,
  ComponentSectionsLinkList: LinkList,
};

const Section = ({ sectionData }) => {
  const SectionComponent = sectionComponents[sectionData.__typename];

  if (!SectionComponent) return null;

  return <SectionComponent data={sectionData} />;
};

const PreviewModeBanner = () => {
  const router = useRouter();
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`;

  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{' '}
        <a
          className="underline"
          href={`/api/exit-preview?redirect=${router.asPath}`}
        >
          Turn off
        </a>
      </div>
    </div>
  );
};

export default function Sections({ sections, preview }) {
  return (
    <div className="flex flex-col mx-auto max-w-5xl pb-16">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {sections?.map((section) =>
        section ? (
          <section key={`${section.__typename}${section.id}`} className="my-4">
            <Section sectionData={section} />
          </section>
        ) : (
          <></>
        )
      )}
    </div>
  );
}
