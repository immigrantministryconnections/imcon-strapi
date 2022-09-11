import NextImage from '@/components/elements/image';
import PrimaryButton from '@/components/elements/primary-button';
import Layout from '@/components/layout';
import Sections from '@/components/sections';
import { getSignupPage } from 'utils/api';

import { useModalContext, MODAL_TYPES } from 'utils/context/modal-context';

export default function SignupPage({ content }) {
  const { sections } = content.attributes;
  const mainImage = content.attributes?.mainImage;
  const { showModal } = useModalContext();
  const signinModal = () => {
    showModal(MODAL_TYPES.SIGNIN_MODAL);
  };
  const signupModal = () => {
    showModal(MODAL_TYPES.SIGNUP_MODAL);
  };
  return (
    <Layout>
      <div className="min-h-screen">
        {mainImage?.data && <NextImage media={mainImage} />}
        <div className="">
          <Sections bottomPadding={false} sections={sections} />
          <div className="flex flex-col gap-y-2 items-center">
            <PrimaryButton
              size="medium"
              text="Create a free account"
              onClick={signupModal}
            />
            <PrimaryButton
              size="medium"
              text="Login here"
              onClick={signinModal}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const pageContent = await getSignupPage();

  if (!pageContent) {
    return { props: {} };
  }

  return { props: { content: pageContent.data } };
}
