import Hero from '@/components/sections/hero';
import ImageLinkGrid from '@/components/sections/image-link-grid';
import BlogStyleSection from '@/components/sections/blog-style-section';

// Map Strapi sections to section components
const sectionComponents = {
  ComponentSectionsHero: Hero,
  ComponentSectionsBlogStyleSection: BlogStyleSection,
  ComponentSectionsImageLinkGrid: ImageLinkGrid,
};

const Section = ({ sectionData }) => {
  const SectionComponent = sectionComponents[sectionData.__typename];

  if (!SectionComponent) return null;

  return <SectionComponent data={sectionData} />;
};

export default function Sections({ sections }) {
  return (
    <div className="flex flex-col">
      {sections?.map((section) => (
        <Section
          sectionData={section}
          key={`${section.__typename}${section.id}`}
        />
      ))}
    </div>
  );
}
