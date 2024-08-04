```
# make sure postgres is running and set up the .env file based on the example.env
cd backend
npm i
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```


