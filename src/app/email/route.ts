import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export type PostEmailRequestBody = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

export type PostEmailResponseBody = {
  result: boolean;
};

// eslint-disable-next-line import/prefer-default-export
export async function POST(
  request: NextRequest,
): Promise<NextResponse<PostEmailResponseBody>> {
  const token = request.cookies.get("token");

  if (!process.env.RECAPTCHA_SECRET_KEY || !token) {
    return NextResponse.json({ result: false }, { status: 500 });
  }

  const { value } = token;
  const {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: { success },
  } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${value}`,
  );

  if (!success) {
    return NextResponse.json({ result: false }, { status: 500 });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { email, message, name, subject }: PostEmailRequestBody =
    await request.json();

  try {
    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.NODEMAILER_AUTH_PASS,
        user: process.env.NODEMAILER_AUTH_USER,
      },
      port: 465,
      secure: true,
      service: "gmail",
    });

    await transporter.sendMail({
      replyTo: `${name} <${email}>`,
      subject: `【kk-web】${subject}`,
      text: message,
      to: process.env.NODEMAILER_AUTH_USER,
    });

    return NextResponse.json({ result: true }, { status: 200 });
  } catch {
    return NextResponse.json({ result: false }, { status: 500 });
  }
}
