# TuFonoAyuda Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Claude API key from Anthropic
- Git installed

## Step 1: Clone and Install

\`\`\`bash
# Install dependencies
npm install
\`\`\`

## Step 2: Set Up Supabase

1. Go to [Supabase](https://app.supabase.com) and create a new project
2. Wait for the project to finish setting up (this takes ~2 minutes)
3. Go to Project Settings > API
4. Copy your project URL and anon/public key

## Step 3: Get Claude API Key

1. Go to [Anthropic Console](https://console.anthropic.com)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key and copy it

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

2. Fill in your credentials in `.env.local`:
\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback

# Claude AI Configuration
CLAUDE_API_KEY=your-claude-api-key-here
\`\`\`

## Step 5: Set Up Database

The database schema is defined in the `scripts/` folder. To set up your database:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL scripts in order:
   - `scripts/01-create-tables.sql` - Creates all database tables
   - `scripts/02-row-level-security.sql` - Sets up Row Level Security
   - `scripts/03-seed-data.sql` - Adds sample data (optional)

Alternatively, you can run these scripts directly from v0 if you're working in the v0 environment.

## Step 6: Configure Authentication (Optional)

### Email Authentication
Email/password authentication is enabled by default in Supabase.

### Google OAuth (Optional)
To enable Google sign-in:

1. Go to Authentication > Providers in your Supabase dashboard
2. Enable Google provider
3. Follow the instructions to set up Google OAuth credentials
4. Add authorized redirect URIs:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://your-domain.com/auth/callback`

## Step 7: Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 8: Create Your First User

1. Navigate to `/register`
2. Create an account with your email
3. Check your email for the confirmation link (if email confirmation is enabled)
4. Log in at `/login`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add the same environment variables from `.env.local` to Vercel:
   - Go to Project Settings > Environment Variables
   - Add all variables (update `NEXT_PUBLIC_APP_URL` to your production URL)
   - **Important**: Add `CLAUDE_API_KEY` as a secret environment variable
4. Deploy!

### Update Supabase Redirect URLs

After deploying, update your Supabase authentication settings:

1. Go to Authentication > URL Configuration
2. Add your production URL to Site URL
3. Add your production callback URL to Redirect URLs:
   - `https://your-domain.vercel.app/auth/callback`

## AI Features

This application uses Claude AI (Anthropic) for:
- Generating personalized therapy activities
- Analyzing reference documents
- Enhancing intervention plans
- Providing clinical recommendations

Make sure your `CLAUDE_API_KEY` is properly configured for these features to work.

## Troubleshooting

### "Invalid API key" error
- Double-check your Supabase URL and anon key in `.env.local`
- Verify your Claude API key is correct
- Make sure there are no extra spaces or quotes

### AI features not working
- Verify `CLAUDE_API_KEY` is set correctly
- Check your Anthropic account has sufficient credits
- Review the browser console for detailed error messages

### Authentication not working
- Verify your redirect URLs are correctly configured in Supabase
- Check that `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` matches your local URL

### Database errors
- Ensure all SQL scripts have been run in order
- Check the Supabase logs in your dashboard for detailed error messages

### RLS (Row Level Security) issues
- Make sure you've run the RLS policies script
- Verify that users are properly authenticated before accessing protected data

## Next Steps

- Customize the app for your needs
- Add more features and pages
- Configure email templates in Supabase
- Set up monitoring and analytics
- Add custom domain in Vercel
- Explore AI-powered features for therapy planning

## Support

For issues or questions:
- Check the [Supabase Documentation](https://supabase.com/docs)
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Check the [Anthropic Documentation](https://docs.anthropic.com)
- Review the code comments for implementation details
