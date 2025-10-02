# Cloudflare Turnstile Integration

This project uses Cloudflare Turnstile for form protection to prevent spam and abuse.

## Setup Instructions

### 1. Get Cloudflare Turnstile Keys

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to Turnstile section
3. Create a new site
4. Get your **Site Key** and **Secret Key**

### 2. Environment Configuration

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Cloudflare Turnstile keys in `.env.local`:
   ```env
   NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=your_site_key_here
   CLOUDFLARE_TURNSTILE_SECRET_KEY=your_secret_key_here
   ```

### 3. Form Protection Features

The following forms are protected with Turnstile:
- **Contact Form** (`/contact` page)
- **Partner Application Form** (future implementation)

### 4. API Endpoints

- **`/api/contact`** - Handles contact form submissions with Turnstile verification
- **`/api/verify-turnstile`** - Standalone Turnstile verification endpoint

### 5. Components

- **`Turnstile`** (`/components/ui/Turnstile.tsx`) - Reusable Turnstile widget component
- **Contact Form** - Integrated with Turnstile verification

### 6. Security Features

- **Server-side verification** - All tokens are verified on the server
- **IP validation** - Client IP is included in verification for additional security
- **Error handling** - Comprehensive error handling for network issues
- **Automatic reset** - Failed verifications reset the widget
- **Multilingual support** - Error messages in English and German

### 7. Best Practices Implemented

- **Environment variables** - Sensitive keys stored securely
- **TypeScript** - Full type safety
- **Error boundaries** - Graceful error handling
- **Accessibility** - ARIA labels and semantic HTML
- **Responsive design** - Works on all device sizes
- **Professional UX** - Loading states and user feedback

### 8. Development Notes

- Turnstile widget loads asynchronously
- Automatic cleanup on component unmount
- Configurable themes (light/dark/auto)
- Configurable sizes (normal/compact)
- Widget methods exposed for manual control

### 9. Production Deployment

Make sure to:
1. Set correct environment variables on your hosting platform
2. Add your production domain to Cloudflare Turnstile site settings
3. Test form submissions in production environment

### 10. Monitoring

Monitor your Turnstile usage in the Cloudflare Dashboard:
- Request volume
- Block rate
- Error rates
- Performance metrics