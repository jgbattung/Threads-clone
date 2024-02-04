# Threads Clone

## Overview
Threads Clone is a streamlined version of Meta's Threads app. This platform allows users to engage in discussions by creating and responding to threads. It also provides notifications for thread activity and enables users to explore threads from other users.

A deployed version of this app is available here: [Threads Clone](https://threads-clone-two-rho.vercel.app/)

## Built with
This project leverages Next.js 14 with TypeScript and TailwindCSS for a robust and scalable front-end experience. <br>
User authentication is seamlessly integrated through Clerk. <br>
Forms are crafted using shadcn and React Hook Form, with validation powered by zod. <br>
The backend is driven by MongoDB with Mongoose for data management, and uploadthing is utilized for efficient asset storage.

## Features
1. **User Authentication**: Secure registration and login system enabling users to participate in thread creation, replies, and viewing. Users are also directing to an onboarding page where they can setup their user information.
2. **Create and Reply to Threads**: Users can express their thoughts by initiating new threads or contributing to existing discussions with replies.
3. **Profile**: Profiles showcase individual user's threads, offering insights into their activity and interests.
4. **Notifications**: The Activities section alerts users to new replies on their threads, facilitating ongoing engagement and conversation.
5. **Search**: Through Search, users can see all other existing users of Threads.
6. **Responsive Layout**: This Threads clone app can be used in big monitors, regular laptop screens, and even small phone screens.

## Screens
### Authentication Page
![auth](https://github.com/jgbattung/Threads-clone/assets/100396329/773b2208-2d38-49e0-ad36-1b8e26856492)

### Onboarding
![onboarding](https://github.com/jgbattung/Threads-clone/assets/100396329/38f96402-e5b9-4513-a4b9-2045e0be6502)

### Homepage
![home](https://github.com/jgbattung/Threads-clone/assets/100396329/424b0b37-a12c-408f-8c20-e1a97992b094)
![home-phone](https://github.com/jgbattung/Threads-clone/assets/100396329/ec2159ab-ed04-4f6d-ba9b-b10cbefd1b26)

### Create Thread
![create](https://github.com/jgbattung/Threads-clone/assets/100396329/b831ed7c-9226-451a-bfd6-8b04964e9571)

### Reply to Thread
![reply](https://github.com/jgbattung/Threads-clone/assets/100396329/cd370e9a-cb9e-4cce-a5c8-3780a6e16797)

### Profile
![profile](https://github.com/jgbattung/Threads-clone/assets/100396329/ba08d167-7496-4c05-b41e-53212d7d4ec5)

### Activities
![activities](https://github.com/jgbattung/Threads-clone/assets/100396329/66ec39e2-d844-4f7b-9613-ae3b12c007a0)

### Search
![search](https://github.com/jgbattung/Threads-clone/assets/100396329/3149d692-b5bd-4371-921d-30cad7accbe4)

## Run the project locally
1. Clone the repository
 ```
 git clone https://github.com/jgbattung/Threads-clone.git
 ```
2. Create a [clek](https://clerk.com/), [MongoDB](https://www.mongodb.com/), and [uploadting](https://uploadthing.com/) account to get your secret keys and other .env variables
3. Create a `.env` file in the root directory of the project and add your IMDb API key.
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-key-here
CLERK_SECRET_KEY=your-key-here

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

MONGODB_URL=url-here

UPLOADTHING_SECRET=your-secret-here
UPLOADTHING_APP_ID=your-app-id-here
```
4. Install the dependencies
```
npm install
```
5. Run the development server
```
npm run dev
```
6. Open [localhost:3000](localhost:3000) on your browser.

**Enjoy sharing your thoughts with Threads clone!**

###### This project was created as a personal project in 2024.

