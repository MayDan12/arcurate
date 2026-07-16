// lib/email/send.ts
import { getResendClient } from "../resend";

type SendEmailProps = {
  to: string;
  subject: string;
  react?: React.ReactElement;
  html?: string;
};

export async function sendEmail({ to, subject, react, html }: SendEmailProps) {
  const from = process.env.RESEND_FROM!;
  const resend = getResendClient();

  if (react) {
    return resend.emails.send({
      from,
      to,
      subject,
      react,
    });
  }

  if (html) {
    return resend.emails.send({
      from,
      to,
      subject,
      html,
    });
  }

  throw new Error("Either react or html must be provided");
}
