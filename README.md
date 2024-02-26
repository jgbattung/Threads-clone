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
1. **User Authentication**:  Implements a robust authentication system powered by Clerk that enables users to securely register and log in. Upon logging in, users are guided to an onboarding process to complete their profile setup, ensuring a personalized experience.
2. **Create and Reply to Threads**: Users can express their thoughts by initiating new threads or contributing to existing discussions with replies.
3. **Interaction**: Enhances community engagement by allowing users to interact through likes and replies on threads.
4. **Profile**: Profiles showcase individual user's threads, offering insights into their activity and interests. Users can also edit their profiles in side the Profile page.
5. **Replies**: Within the user's Profile Page, a dedicated Replies section showcases all the user's contributions to discussions.
6. **Likes**: The Likes section on the user's Profile Page aggregates all the threads a user has liked.
7. **Notifications**: The Activities section alerts users to new replies on their threads, facilitating ongoing engagement and conversation.
8. **Search**: Through Search, users can see all other existing users of Threads.
9. **Responsive Layout**: The Threads clone app is designed with a responsive layout, ensuring a seamless user experience across devices of varying sizes, from large monitors to compact smartphone screens.

## Screens
### Authentication Page
![auth](https://github.com/jgbattung/Threads-clone/assets/100396329/c6cba877-5bef-4e25-b24a-172c85aaa95a)

### Onboarding
![onboarding](https://github.com/jgbattung/Threads-clone/assets/100396329/38f96402-e5b9-4513-a4b9-2045e0be6502)

### Homepage
![home](https://github.com/jgbattung/Threads-clone/assets/100396329/288143f4-3e59-4adb-8ea5-5dcdf072ab69)
![home-phone](https://github.com/jgbattung/Threads-clone/assets/100396329/3bce8b93-39e2-46dd-be40-020d9fb94b32)

### Create Thread
![create](https://github.com/jgbattung/Threads-clone/assets/100396329/9d61d9a8-1be1-4243-9981-daf7642667b3)
![create-phone](https://github.com/jgbattung/Threads-clone/assets/100396329/48932049-a9d6-401a-b303-d74823b3b903)

### Reply to Thread
![reply](https://github.com/jgbattung/Threads-clone/assets/100396329/374e3525-32cd-45e3-b4bf-f9c5eb480edc)
![reply-phone](https://github.com/jgbattung/Threads-clone/assets/100396329/4ea934cd-13a7-49b1-b089-72aa441f1576)

### Profile
![profile-threads](https://github.com/jgbattung/Threads-clone/assets/100396329/fc472271-6a01-414b-b7b4-a120833cf279)
![profile-threads-phone](https://github.com/jgbattung/Threads-clone/assets/100396329/eb15b7cb-a285-4962-876e-1d133e74f022)
![profile-replies](https://github.com/jgbattung/Threads-clone/assets/100396329/96a76e7b-11d4-446c-9b97-7d7c2f205870)
![profile-replies-phone](https://github.com/jgbattung/Threads-clone/assets/100396329/063d636f-be1d-4ea0-8f40-c11df74299f6)
![profile-likes](https://github.com/jgbattung/Threads-clone/assets/100396329/0ca5c902-6600-4390-b1e7-897124205e13)
![profile-likes-phone](https://github.com/jgbattung/Threads-clone/assets/100396329/a5d521fa-6d11-4690-b852-043bbab81698)

### Activities
![activities](https://github.com/jgbattung/Threads-clone/assets/100396329/296a08c6-840e-48e2-92ef-b836479f29d3)
![activities-phone](https://github.com/jgbattung/Threads-clone/assets/100396329/ca552797-d332-4f04-9df5-a8cbc289a2d8)

### Search
![search](https://github.com/jgbattung/Threads-clone/assets/100396329/92801774-7ec4-4b3b-87fd-8d807a51dfed)
![search-phone](https://github.com/jgbattung/Threads-clone/assets/100396329/d230bf8a-2611-4da5-bb41-9509058c2953)

## Run the project locally
1. Clone the repository
 ```
 git clone https://github.com/jgbattung/Threads-clone.git
 ```
2. Create a [clerk](https://clerk.com/), [MongoDB](https://www.mongodb.com/), and [uploadting](https://uploadthing.com/) account to get your secret keys and other .env variables
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

