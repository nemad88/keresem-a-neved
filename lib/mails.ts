import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "nemethadam88@gmail.com",
    subject: "Hello World",
    html: `<p>Click <a href="${confirmationLink}"}>here</a> to verify email</p>`,
  });
};
