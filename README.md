# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Step 1: clone the repository:

```bash
git clone git@github.com:taxi-gestion-com/app.git
```

Step 2: configure the environment variables:

```bash
cp .env.example .env
```

And fill the environment variables with the correct values, especially:

- the database password `DB_PASSWORD`, that should be a robust random string

Step 3: run the following command to install the dependencies:

```bash
pnpm install
```

Step 4: run the docker-compose file to start the database:

```bash
docker-compose up -d
```

Step 5: run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
