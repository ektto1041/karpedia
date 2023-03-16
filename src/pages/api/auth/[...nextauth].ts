import NextAuth, { Account, Awaitable, Profile, Session, User } from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import { CredentialInput } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google"

type SignInParams = {
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  email?: { verificationRequest?: boolean | undefined; } | undefined;
  credentials?: Record<string, CredentialInput> | undefined;
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: SignInParams) {
      // 현재 내 계정이 아니면 로그인 할 수 없게 설정
      const isAdmin = user.email === 'dhkdwk1041@gmail.com';

      return isAdmin;
    }
  }
}

export default NextAuth(authOptions)