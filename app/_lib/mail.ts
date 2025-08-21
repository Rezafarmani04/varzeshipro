import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const from = `"VarzeshiPro" <${
  process.env.EMAIL_FROM || process.env.EMAIL_USER
}>`;

export async function sendVerificationEmail(to: string, code: string) {
  await transporter.sendMail({
    from,
    to,
    subject: "کد تأیید ثبت‌نام",
    html: `
      <div style="font-family: sans-serif; padding: 20px">
        <h2>کد تایید شما</h2>
        <p>کد تأیید شما برای ثبت‌نام در سایت VarzeshiPro:</p>
        <h1 style="font-size: 32px; color: #f97316;">${code}</h1>
        <p>⏳ این کد تا ۵ دقیقه دیگر معتبر است.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(to: string, link: string) {
  await transporter.sendMail({
    from,
    to,
    subject: "بازیابی رمز عبور",
    html: `
      <div style="font-family:sans-serif; padding:20px">
        <h2>بازیابی رمز عبور 🔑</h2>
        <p>برای تعیین رمز عبور جدید روی دکمه زیر کلیک کنید (اعتبار ۱۵ دقیقه):</p>
        <p>
          <a href="${link}" 
             style="background:#f97316;color:#fff;padding:10px 16px;
                    border-radius:8px;text-decoration:none;display:inline-block">
            تعیین رمز جدید
          </a>
        </p>
        <p style="direction:ltr; font-size:12px; color:#666">${link}</p>
        <p>اگر شما چنین درخواستی نداشتید، این ایمیل را نادیده بگیرید.</p>
      </div>
    `,
  });
}
