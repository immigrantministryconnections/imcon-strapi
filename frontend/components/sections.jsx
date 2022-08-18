import Hero from '@/components/sections/hero';
import ImageLinkGrid from '@/components/sections/image-link-grid';
import BlogStyleSection from '@/components/sections/blog-style-section';
import TextSection from '@/components/sections/text-section';
import LeadershipSection from '@/components/sections/leadership-section';
import SimpleText from '@/components/sections/simple-text';
import EmbeddedForm from '@/components/sections/embedded-form';
import LinkList from '@/components/sections/link-list-section';

// Map Strapi sections to section components
const sectionComponents = {
  ComponentSectionsHero: Hero,
  ComponentSectionsBlogStyleSection: BlogStyleSection,
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

export default function Sections({ sections }) {
  return (
    <div className="flex flex-col mx-auto max-w-5xl pb-16">
      {sections.map((section) => (
        <section key={`${section.__typename}${section.id}`} className="my-8">
          <Section sectionData={section} />
        </section>
      ))}
    </div>
  );
}
