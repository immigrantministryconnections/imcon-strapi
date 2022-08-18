import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from '../../../utils/api';
import Logo from '../../../public/imcon_icon.png';

const options = {
  theme: {
    colorScheme: 'light',
    brandColor: '#001D3D',
    logo: Logo,
    buttonText: '#575757',
  },
  providers: [
    CredentialsProvider({
      name: 'email',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const { user, jwt, error } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) return null;

          return { ...user, jwt };
        } catch (error) {
          console.log({ error });
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.jwt = token.jwt;
      session.id = token.id;
      return Promise.resolve(session);
    },
    jwt: async ({ token, account, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
        );
        const resData = await response.json();
        token.jwt = resData.jwt;
        token.id = resData.user.id;
      }
      return Promise.resolve(token);
    },
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
