import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  turnstileToken: string;
}

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

async function verifyTurnstile(token: string, clientIP: string): Promise<boolean> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error('CLOUDFLARE_TURNSTILE_SECRET_KEY is not set');
    return false;
  }

  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    formData.append('remoteip', clientIP);

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    );

    const result: TurnstileResponse = await response.json();
    return result.success;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

function validateFormData(data: Partial<ContactFormData>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.firstName?.trim()) errors.push('First name is required');
  if (!data.lastName?.trim()) errors.push('Last name is required');
  if (!data.email?.trim()) errors.push('Email is required');
  if (!data.subject?.trim()) errors.push('Subject is required');
  if (!data.message?.trim()) errors.push('Message is required');
  if (!data.turnstileToken?.trim()) errors.push('Security verification is required');

  // Email validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Message length validation
  if (data.message && data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return { isValid: errors.length === 0, errors };
}

async function sendEmail(formData: ContactFormData): Promise<boolean> {
  // TODO: Implement your email sending logic here
  // You can use services like:
  // - Resend
  // - SendGrid
  // - Nodemailer with SMTP
  // - AWS SES
  
  console.log('Email would be sent with data:', {
    ...formData,
    turnstileToken: '[REDACTED]' // Don't log the token
  });

  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return true; // Return true for success, false for failure
}

export async function POST(request: NextRequest) {
  try {
    const formData: Partial<ContactFormData> = await request.json();

    // Validate form data
    const { isValid, errors } = validateFormData(formData);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Get client IP for Turnstile verification
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';

    // Verify Turnstile token
    const isVerified = await verifyTurnstile(formData.turnstileToken!, clientIP);
    if (!isVerified) {
      return NextResponse.json(
        { success: false, error: 'Security verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Send email
    const emailSent = await sendEmail(formData as ContactFormData);
    if (!emailSent) {
      return NextResponse.json(
        { success: false, error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}