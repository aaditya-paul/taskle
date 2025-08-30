# NextAuth.js Integration Setup

This project now includes NextAuth.js for authentication with Google OAuth support.

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 2. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create a new OAuth 2.0 Client ID
5. Set the authorized redirect URIs to:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
6. Copy the Client ID and Client Secret to your `.env.local` file

### 3. NextAuth Secret

Generate a random secret for NextAuth:

```bash
openssl rand -base64 32
```

Add this to your `NEXTAUTH_SECRET` environment variable.

## Features

- **Google OAuth Authentication**: Users can sign in with their Google accounts
- **Protected Routes**: Dashboard and workspace routes are protected by authentication
- **Session Management**: User sessions are managed with JWT tokens
- **Automatic Redirects**: 
  - Authenticated users are redirected to dashboard from home page
  - Unauthenticated users are redirected to login when accessing protected routes
- **User Information Display**: Shows user's name and profile picture in the dashboard
- **Logout Functionality**: Users can sign out and be redirected to login page

## File Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth configuration
│   ├── (auth)/
│   │   ├── login/page.tsx              # Login page with Google OAuth
│   │   └── sign-up/page.tsx            # Sign-up page with Google OAuth
│   └── layout.tsx                      # Root layout with SessionProvider
├── components/
│   ├── Providers.tsx                   # SessionProvider wrapper
│   └── Dashboard.tsx                   # Updated with user info and logout
├── hooks/
│   └── useAuth.ts                      # Authentication hooks
└── middleware.ts                       # Route protection middleware
```

## Usage

### Authentication Hooks

```tsx
import { useRequireAuth } from "@/hooks/useAuth";

function ProtectedComponent() {
  const { session, loading } = useRequireAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return <div>Welcome, {session?.user?.name}!</div>;
}
```

### Sign In/Out

```tsx
import { signIn, signOut } from "next-auth/react";

// Sign in with Google
await signIn("google", { callbackUrl: "/dashboard" });

// Sign out
await signOut({ callbackUrl: "/login" });
```

## Development

Start the development server:

```bash
npm run dev
```

The authentication flow will work at `http://localhost:3000`.

## Production Deployment

1. Update `NEXTAUTH_URL` to your production domain
2. Update Google OAuth redirect URIs in Google Cloud Console
3. Deploy with your preferred hosting provider

## Security Notes

- Keep your `NEXTAUTH_SECRET` secure and never commit it to version control
- Use HTTPS in production
- Regularly rotate your Google OAuth credentials
- Review and update CORS settings as needed
