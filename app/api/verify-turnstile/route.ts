import { NextRequest, NextResponse } from 'next/server';

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Turnstile token is required' },
        { status: 400 }
      );
    }

    const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.error('CLOUDFLARE_TURNSTILE_SECRET_KEY is not set');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify the token with Cloudflare
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    
    // Optional: Add remote IP for additional security
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';
    formData.append('remoteip', clientIP);

    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!verifyResponse.ok) {
      throw new Error(`Turnstile API responded with status: ${verifyResponse.status}`);
    }

    const result: TurnstileResponse = await verifyResponse.json();

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Verification successful' 
      });
    } else {
      console.error('Turnstile verification failed:', result['error-codes']);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Verification failed',
          details: result['error-codes']
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}