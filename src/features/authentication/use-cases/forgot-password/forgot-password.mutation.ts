'use server';

import { render } from '@react-email/components';
import { Schema } from 'effect';
import nodemailer from 'nodemailer';
import { type ServerActionResult, ServerActionSuccess } from '@/libraries/server-action';
import { publicProcedure } from '@/libraries/trpc';
import { ResetPasswordEmail } from './emails/forgot-password.email';
import { forgotPasswordValidation } from './forgot-password.validation';

export const forgotPasswordMutation = publicProcedure
  .input(Schema.decodeUnknownSync(forgotPasswordValidation))
  .mutation(async ({ input: { username } }): Promise<ServerActionResult> => {
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

    return ServerActionSuccess();
  });
