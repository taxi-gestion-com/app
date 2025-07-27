'use server';

import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import { Schema } from 'effect';
import { publicProcedure } from '@/libraries/trpc';
import { forgotPasswordValidation } from './forgot-password.validation';
import { ResetPasswordEmail } from './emails/forgot-password.email';

export const forgotPasswordMutation = publicProcedure
  .input(Schema.decodeUnknownSync(forgotPasswordValidation))
  .mutation(async ({ input: { username } }): Promise<void> => {
    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false
    });

    await transporter.sendMail({
      from: 'support@taxi-gestion.com',
      to: username,
      subject: 'Réinitialisation de votre mot de passe',
      html: await render(ResetPasswordEmail({ updatedDate: new Date(), baseUrl: 'http://localhost:3000' }))
    });
  });
