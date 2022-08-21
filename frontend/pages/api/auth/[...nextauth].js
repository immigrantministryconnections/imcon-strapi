import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from '../../../utils/api';

const options = {
  theme: {
    colorScheme: 'light',
    brandColor: '#001D3D',
    logo: 'https://imconstrapi.blob.core.windows.net/imconuploads/assets/IMCON_Full_Color_7fe9e8694f.png?updated_at=2022-08-16T20:42:55.751Z',
    buttonText: '#575757',
  },
  secret: process.env.JWT_SECRET,
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
        token.jwt = user.jwt;
        token.id = user.id;
      }
      return Promise.resolve(token);
    },
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
