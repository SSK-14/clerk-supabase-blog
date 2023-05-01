# **Clerk Supabase Blog**

## Demo [🔗](https://instapost-demo.vercel.app)

https://user-images.githubusercontent.com/45158568/235469362-323192cf-82e6-4be8-9e2b-6887f72a03ce.mp4

## Overview

Simple Blogging web application that allows users to login, create posts, view posts, like posts, and edit and update their own posts.
Build for learning purposes only.

- **NextJS** 💻 - SSR and performant frontend with API routes built in [learn more](https://nextjs.org/)
- **Clerk** 🔑 - Clerk is the easiest way to add authentication and user management to your Next.js application [learn more](https://clerk.com/docs)
- **Supabase** 🔥 - For PostgresSQL DB [learn more](https://supabase.io/)
- **TailwindCSS** 🖼 - Utility style CSS for quickly building out the interface

Users can sign up for an account using Clerk's authentication system and login to the application. Once logged in, they can create a post with a title and a description. Users can also view other users' posts and like them. Additionally, users can edit and update their own posts.

## Getting Started

First, we will need to create a [Clerk project](https://dashboard.clerk.com/). Once that is setup now create a Supabase project which you can do by heading over to https://supabase.io.

## Development

1. Clone the repo

```
git clone https://github.com/SSK-14/clerk-supabase-blog
```

2. Install packages

```
npm install
```

3. Then we can create our environment file as follows:

```
# .env

NEXT_PUBLIC_SUPABASE_URL="https://__PROJECT_ID__.supabase.co"
NEXT_PUBLIC_SUPABASE_KEY="your-supabase-anon-key"
NEXT_PUBLIC_CLERK_FRONTEND_API = "your-clerk-frontend-api"
```

4. Run the app

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

The MIT License (MIT). Please see LICENSE.md for more info
