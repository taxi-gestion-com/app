import { render } from '@react-email/components';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import nodemailer from 'nodemailer';
// todo: solve dependencies inversion issue
import { EmailVerificationEmail } from '@/features/authentication/use-cases/register/emails/email-verification.email';
import { db } from '@/libraries/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  emailVerification: {
    sendVerificationEmail: async ({ user, token }) => {
      const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        secure: false
      });

      await transporter.sendMail({
        from: 'support@taxi-gestion.com',
        to: user.name,
        subject: 'Activez votre compte Taxi Gestion',
        html: await render(EmailVerificationEmail({ baseUrl: 'http://localhost:3000', token }))
      });
    },
    autoSignInAfterVerification: true
  },
  plugins: [nextCookies()],
  advanced: {
    useSecureCookies: true
  }
});
