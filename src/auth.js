import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import purl from 'url'
import connectDB from "./utils/lib/connectDb";
import User from "./models/students";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        rollNo: {},
        password: {},
      },
      authorize: async (credentials) => {
        
        await connectDB();
        /*const userF = await User.findOne({ rollNo: credentials.rollNo, password: credentials.password });
        console.log(userF);*/
        
        let user = {};

        let student = await User.findOne({ rollNo: credentials.rollNo });
        if (student) {
          user.rollNo = student.rollNo;
          user.name = student.username;
          user.department = student.course.department;
          user.year = student.course.year;
          user.semmester = student.course.sem;  
        }
        
        if (!student) {
          return { error: 'Student not found' }
        }

        if (student && student.password !== credentials.password) {
          return { error: 'Incorrect password' }
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
        if (user?.error) {
          throw new Error(user.error);
        }
        
        return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { rollNo: token.rollNo, name: token.name, username: token.username, department: token.department, year: token.year, semmester: token.semmester, ...session.user };
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});
