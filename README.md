## TodoApp

---

This is a simple to todo app, built with [Next.js](https://github.com/vercel/next.js), [Prisma](https://github.com/prisma/prisma), [NextAuth.js](https://github.com/nextauthjs/next-auth) and [NextUI](https://github.com/nextui-org/nextui).
By [Tom Smits](https://github.com/teumaas)

I built this for learning Next.js.

**Demo**: [https://todo-app-teumaas.vercel.app](https://todo-app-teumaas.vercel.app)

## Screenshots

---

<img src="https://tomsmits.nl/assets/screen1.jpeg" width="800" height="437">

<img src="https://tomsmits.nl/assets/screen2.jpeg" width="800" height="437">

<img src="https://tomsmits.nl/assets/screen3.jpeg" width="800" height="437">

<img src="https://tomsmits.nl/assets/screen4.jpeg" width="800" height="437">

<img src="https://tomsmits.nl/assets/screen5.jpeg" width="800" height="437">

## Requirement

---

You need a local or remote database with the type of

- PostgreSQL
- MySQL SQL Server
- SQLite
- MongoDB

## Getting Started

---

First, install al the essential npm packages:

```bash
npm install
# or
yarn install
```

Second go to **lib/prisma.ts** and change the database engine to whatever you prefer by default it's MySQL.

```typescript
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Third set the values of **.env** file.

```bash
# App
NEXT_PUBLIC_APP_NAME="TodoApp"
NEXT_PUBLIC_APP_DESCRIPTION="A simple To-Do webapp."

# Prisma
DATABASE_URL="engine://USERNAME:PASSWORD@URL:3306/DATABASE"

# NEXT-AUTH
SECRET="SECRECT KEY"
NEXTAUTH_URL=URL/api/auth

# OAuth
GITHUB_CLIENT_SECRET=SECRECT KEY
GITHUB_CLIENT_ID=CLIENT KEY

# Nodemailer
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_FROM=

```

Fourth run the db push command to migrate the **schema.prisma**:

```bash
npx prisma db push
```

As last run:

```bash
npm run dev
# or
yarn run dev
```

**Done!** Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

---

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
