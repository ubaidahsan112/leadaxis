import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendBookingEmail = async (booking) => {
  const {
    id,
    name,
    email,
    business,
    industry,
    location,
    website,
    phone,
    service,
    budget,
    monthly_leads,
    goals,
  } = booking;

  await transporter.sendMail({
    from: `"LeadAxis Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `🚀 New LeadAxis Lead — ${name}`,

    html: `
      <div style="font-family: Arial, sans-serif; background:#f4f5f3; padding:30px;">
        
        <div style="max-width:700px; margin:auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          
          <div style="background:#111811; padding:28px 30px;">
            <h1 style="margin:0; color:#c7f36b; font-size:26px;">
              New Lead Received
            </h1>

            <p style="margin:8px 0 0; color:#d1d5d1; font-size:14px;">
              A new customer submitted the LeadAxis booking form.
            </p>
          </div>

          <div style="padding:30px;">

            <h2 style="color:#111811; font-size:20px; margin-top:0;">
              Customer Information
            </h2>

            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0; font-weight:bold;">Lead ID</td>
                <td style="padding:10px 0;">#${id}</td>
              </tr>

              <tr>
                <td style="padding:10px 0; font-weight:bold;">Name</td>
                <td style="padding:10px 0;">${name || "N/A"}</td>
              </tr>

              <tr>
                <td style="padding:10px 0; font-weight:bold;">Email</td>
                <td style="padding:10px 0;">${email || "N/A"}</td>
              </tr>

              <tr>
                <td style="padding:10px 0; font-weight:bold;">Phone</td>
                <td style="padding:10px 0;">${phone || "N/A"}</td>
              </tr>

              <tr>
                <td style="padding:10px 0; font-weight:bold;">Location</td>
                <td style="padding:10px 0;">${location || "N/A"}</td>
              </tr>
            </table>

            <hr style="border:none; border-top:1px solid #e5e7eb; margin:25px 0;" />

            <h2 style="color:#111811; font-size:20px;">
              Business & Service Details
            </h2>

            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0; font-weight:bold;">Business</td>
                <td style="padding:10px 0;">${business || "N/A"}</td>
              </tr>

              <tr>
                <td style="padding:10px 0; font-weight:bold;">Industry</td>
                <td style="padding:10px 0;">${industry || "N/A"}</td>
              </tr>

              <tr>
                <td style="padding:10px 0; font-weight:bold;">Website</td>
                <td style="padding:10px 0;">${website || "N/A"}</td>
              </tr>

              <tr>
                <td style="padding:10px 0; font-weight:bold;">Service</td>
                <td style="padding:10px 0;">${service || "N/A"}</td>
              </tr>

              <tr>
                <td style="padding:10px 0; font-weight:bold;">Monthly Budget</td>
                <td style="padding:10px 0;">${budget || "N/A"}</td>
              </tr>

              <tr>
                <td style="padding:10px 0; font-weight:bold;">Monthly Leads</td>
                <td style="padding:10px 0;">${monthly_leads || "N/A"}</td>
              </tr>
            </table>

            <hr style="border:none; border-top:1px solid #e5e7eb; margin:25px 0;" />

            <h2 style="color:#111811; font-size:20px;">
              Customer Goals
            </h2>

            <div style="background:#f7f9f5; border-left:4px solid #c7f36b; padding:16px; border-radius:8px;">
              <p style="margin:0; color:#374151; line-height:1.6;">
                ${goals || "No goals provided."}
              </p>
            </div>

          </div>

          <div style="background:#111811; padding:20px 30px; text-align:center;">
            <p style="margin:0; color:#ffffff; font-weight:bold;">
              LeadAxis
            </p>

            <p style="margin:6px 0 0; color:#9ca3af; font-size:12px;">
              New lead notification from LeadAxis website
            </p>
          </div>

        </div>

      </div>
    `,
  });
};