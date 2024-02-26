
# Uploading Images to Supabase using Express.js, Multer and Vue.js

The project demonstrates how to upload images to Supabase using Express.js, Multer and Vue.js. 


### Setting up Environment Variables

#### Client

Create a `.env` file in the root of the client folder. Add the following variables to the `.env` file:


```bash
VITE_SERVER_URL=http://localhost:3001
VITE_SERVER_API_PATH=/api
```

#### Server

Create a .env file in the root of the server folder. Add the following variables to the `.env` file:

```bash

PORT=3001

SUPABASE_PROJECT_URL=https://yourprojecturl.supabase.co
SUPABASE_ANON_KEY=someanonkey
```


### Running the Project

#### Client

```bash
cd client
npm install
npm run dev
```

#### Server

```bash
cd server
npm install
npm run dev
```
