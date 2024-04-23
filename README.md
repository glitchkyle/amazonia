# Amazonia E-commerce Application

## Setting Up

### Prerequisities and Dependencies

1. Docker Desktop (Specifically, Docker and Docker-Compose) - https://docs.docker.com/get-docker/
2. VS Code - https://code.visualstudio.com/download
3. Latest Environment Variables - Contact glitchkyle or your own Auth0 configurations

### Set up your local development environment

1. Clone the latest version of the repository `git clone https://github.com/glitchkyle/amazonia.git`
2. Navigate to the repository `cd amazonia`
3. Create an environment variable file `.env.local` in the root directory using `touch .env.local`.
4. Copy environment variables on to the `.env.local`
5. Start the development container `docker-compose up --build -d`
6. Install dependencies `yarn install`
7. Run latest migrations `yarn db:migrate`
8. Seed the database `npx ts-node prisma/seed.ts`
9. Code away!

## Primary Files

Huge thanks to MUI for developing themed reusable components, most of their work can be seen in src/@core

This is a list of directories and files that were added and/or modified:

1. src/config
2. src/lib
3. src/navigation
4. src/pages
5. src/store
6. src/tests
7. src/types
8. prisma
9. migrations
