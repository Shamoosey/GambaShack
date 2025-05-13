## Gamba Shack

Fake gambling site using fake currencies and mini games.

To get started create a .env file in the base project dir and add relevant supabase data:

```
DATABASE_URL="postgres://[DB-USER].[PROJECT-REF]:[PRISMA-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgres://[DB-USER].[PROJECT-REF]:[PRISMA-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```
Install the relevant node modules
``` bash
npm i
```
Generate the prisma DB
```
npx prisma generate
```
Build and Run the Application
```
npm run start
OR
npm run dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser.