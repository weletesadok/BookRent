```
# make sure postgres is running and set up the .env file based on the example.env
cd backend
npm i
npx prisma migrate dev --name init
# if it didn't automatically generates you prisma client use the next else run the server
npx prisma generate
npm run dev

#navigate to frontedn directory
npm i
npm run dev
```
