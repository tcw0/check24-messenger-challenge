# check24-messenger-challenge

This repository contains the implementation of a messenger, a coding challenge for the CHECK24 GenDev Scholarship. The messenger consists of two components: the backend and the frontend.

## Project Structure

This project structure focuses on the most important files in this project.

```
check24-messenger-challenge
├── README.md
├── .husky                  -> pre-commit hooks
├── client
│   ├── node_modules        -> installed node modules (do not touch)
│   └── src
│       ├── assets          -> assets such as images & logos
│       ├── components      -> common components
│       ├── contexts        -> contexts for sharing global state accross the application
│       ├── helper          -> helper functions
│       ├── pages           -> individual pages
│       ├── routes          -> Routing
│       └── types           -> DataTransferObjects (DTOs) for communication with server
└── server
    ├── node_modules        -> installed node modules (do not touch)
    └── src
        ├── config          -> configuration files for db and authentication
        ├── controllers     -> implementation of controllers serving the routes (error handling & building response)
        ├── middleware      -> middleware handling errors, logging, and authentication
        ├── models          -> Data models & schemas
        ├── routes          -> individual routes
        └── server.ts

```

## Live Demo

[![CHECK24 GenDev Messenger Challenge](https://img.youtube.com/vi/kVMr2w_N9-M/default.jpg)](https://youtu.be/kVMr2w_N9-M)

## Project description using MERN Stack

This project leverages the MERN (MongoDB, Express.js, React, Node.js) Stack, a powerful combination of technologies, to build a comprehensive messenger application. The architecture is divided into the server side, where MongoDB, Node.js, and Express handle the backend, and the client side, where Typescript, React, and Material-UI contribute to a dynamic and user-friendly frontend.

### Server

- Install NodeJS on your machine. It is recommended to use [NVM (hombrew)](https://medium.com/devops-techable/how-to-install-nvm-node-version-manager-on-macos-with-homebrew-1bc10626181).

- We recommend to use the managed database which is set by the environment variable `MONGODB_MODE=REMOTE` in the `.env` file in the `server` directory.

### Environmnet variables

An example of the necessary environment variables can be found in `.env.example` in `server` and `client`.
The secrets are shared on demand. Reach out to one of the maintainers of the project to get access to the secrets.

The following environment variables are necessary to run the application:

`server`

- `PORT`: port on which the server is running
- `MONGODB_URI_REMOTE`: remote connection string to the database
- `MONGODB_MODE`: mode of the database (LOCAL or REMOTE)
- `JWT_SECRET`: secret key for JWT token generation

`client`

- `VITE_PROXY_API_URL`: proxy for vite server (not necessary)
- `VITE_MAPBOX`: private key for mapbox (used for map integration)
- `VITE_MAPS_API`: api key for google maps (used for location search)
- `VITE_STRIPE_PUB_KEY`: public key for stripe (used for payment)


## Get started

### Run application

1. Clone respository using `git clone: https://github.com/tcw0/check24-messenger-challenge.git`
2. Frontend:
   1. Move to the client folder using `cd client`
   2. Install the necessary dependencies using `npm install`
   3. Start the client using `npm run dev`
3. Backend:
   1. Move to the server folder using `cd server`
   2. Install the necessary dependencies using `npm install`
   3. Start the server using `npm start`

## Minimal Requirements

- **Chat View:** The messenger provides a chat view where the same conversation is viewable from both perspectives: customer and service provider. Each perspective has its own route and socket, enabling seamless communication between devices.

- **Chat Overview:** The application includes a chat overview over all of the users chat, allowing users to easily navigate and click into different chats.

- **Persistence:** Chats are mutable and persisted in a MongoDB database. They are accessible via a unique identifier, ensuring data integrity and consistency.

- **Scrolling Pagination:** The messenger supports scrolling pagination, enabling users to navigate through chat histories with a hypothetical length of thousands of messages per chat.

- **Attachments:** Users can send messages with optional attachments such as pictures or documents (PDFs), enhancing the communication experience.

- **Masking of Sensitive Information:** Any contactable data (phone numbers, emails, URLs) within messages is masked as long as the conversation status is "quoted," ensuring privacy.

- **Real-time Message Display:** Messages appear within the chat as they are sent, providing a seamless and real-time communication experience without the need for page refreshing.

- **Dynamic Message Field:** If a conversation status is "rejected," the message input field disappears, and actions become unavailable, providing a clear and intuitive interface.

- **Customer Reviews:** Service providers can receive reviews from customers within the chat, facilitating feedback and enhancing the user experience.


## Extra Features

- **Unread Banner Behavior:** The messenger includes an unread banner behavior highlighting the number of unread messages.

- **Typing Indicator:** A typing indicator is displayed when a conversation partner is typing, providing a more interactive and responsive user experience.

- **Scroll to Bottom:** A convenient "scroll to bottom" feature is implemented, allowing users to always see the latest messages in a chat.

- **Opening Email & Browser for Contact Data & URL:** The application includes the ability to open emails and browsers directly from contact data and URLs, improving user convenience.

- **JWT Authentication:** The messenger uses JWT authentication to ensure secure and authorized access to the application.

- **Web Cookies Storage:** Web cookies are utilized for efficient storage, enhancing the user experience by maintaining session information.

- **Extendable/Generic Message API Format:** The messaging API format is extendable and generic, extending the required functionality and allowing for easy integration of additional types.










