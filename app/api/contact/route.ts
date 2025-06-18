import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    // Validate that at least one contact method is provided
    const hasEmail = email && email.trim().length > 0;
    const hasPhone = phone && phone.trim().length > 0;

    if (!hasEmail && !hasPhone) {
      return NextResponse.json(
        { error: 'Please provide either an email address or phone number' },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (hasEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Please provide a valid email address' },
          { status: 400 }
        );
      }
    }

    // Validate phone format if provided
    if (hasPhone) {
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          { error: 'Please provide a valid phone number' },
          { status: 400 }
        );
      }
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format current timestamp
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Prepare clean contact information
    const contactDetails = [];
    if (hasEmail) contactDetails.push({ label: 'Email', value: email, type: 'email' });
    if (hasPhone) contactDetails.push({ label: 'Phone', value: phone, type: 'phone' });

    // Build text version
    const textContactInfo = contactDetails
      .map(detail => `${detail.label}: ${detail.value}`)
      .join('\n        ');

    // Build HTML version with better formatting
    const htmlContactInfo = contactDetails
      .map(detail => {
        if (detail.type === 'email') {
          return `
            <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
              <p style="margin: 0; font-size: 16px; font-weight: 600; color: #374151;">
                <strong>Email:</strong> <a href="mailto:${detail.value}" style="color: #3b82f6; text-decoration: none;">${detail.value}</a>
              </p>
            </div>`;
        } else {
          return `
            <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
              <p style="margin: 0; font-size: 16px; font-weight: 600; color: #374151;">
                <strong>Phone:</strong> <a href="tel:${detail.value}" style="color: #10b981; text-decoration: none;">${detail.value}</a>
              </p>
            </div>`;
        }
      })
      .join('');

    // Email content with professional design
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || 'info@lostescapes.com',
      subject: `🌟 New Inquiry regarding ${message} - Adiyogi Foundation`,
      text: `
=== NEW CONTACT FORM SUBMISSION ===

📅 Received: ${timestamp}
👤 Name: ${name}

📞 Contact Information:
        ${textContactInfo}

💬 Message:
${message}

---
This inquiry was submitted through the Adiyogi Foundation contact form.
Please respond promptly.
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            
            <!-- Header -->
            <div style="background-color: #f9fafb; padding: 30px; text-align: center;">
              <h1 style="color: #6b7280; margin: 0; font-size: 24px; font-weight: 700;">
                🌟 Inquiry
              </h1>
              <p style="color: #6b7280; margin: 8px 0 0 0; font-size: 14px;">
                Adiyogi Foundation Contact Form
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 30px;">
              
              <!-- Timestamp -->
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 12px 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #10b981; font-size: 14px; font-weight: 600;">
                  Received: ${timestamp}
                </p>
              </div>

              <!-- User Details -->
              <div style="margin-bottom: 24px;">
                <h2 style="color: #1f2937; margin: 0 0 16px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
                  👤 User Details
                </h2>
                
                <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                  <p style="margin: 0; font-size: 16px; font-weight: 600; color: #374151;">
                    <strong>Name:</strong> ${name}
                  </p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
                  ${htmlContactInfo}
                </table>
              </div>

              <!-- Message -->
              <div style="margin-bottom: 24px;">
                <h2 style="color: #1f2937; margin: 0 0 16px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
                  User Message
                </h2>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; line-height: 1.6;">
                  <p style="margin: 0; color: #374151; font-size: 15px; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                This inquiry was submitted through the <strong>Adiyogi Foundation</strong> contact form.<br>
                Please respond within 24 hours.
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}