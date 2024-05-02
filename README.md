# THE-FIRST

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/THE-FIRST-DANCE/the-first/blob/master/README.md)
[![ko](https://img.shields.io/badge/lang-ko-blue.svg)](https://github.com/THE-FIRST-DANCE/the-first/blob/master/README.ko.md)

**THE-FIRST-DANCE**'s first creation.  
It is a photo sharing social networking service that mimics Instagram.

## Introducing team members
|[Juhyeon Lee](https://github.com/juhyeonni)|[Jihun Kim](https://github.com/hetame1)|[Jaeil Lee](https://github.com/cheiru94)|[Youngjin An](https://github.com/0gene68)|
|:--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
| <img src="https://github.com/juhyeonni.png" width=400px alt="Juhyeon"/> | <img src="https://github.com/hetame1.png" width=400px alt="Jihun"/> | <img src="https://github.com/cheiru94.png" width=400px alt="Jaeil"> | <img src="https://github.com/0gene68.png" width=400px alt="Youngjin"/> | 
|Leader|Frontend|Frontend|Frontend|

---


## Background of Creation

The reason for planning `THE-FIRST` was to fill in the gaps left by the JavaScript project `2951` from the previous semester and to try using a more diverse library.

## Technologies Used

The requirement of the task is to focus on front-end development without implementing the backend.
This was considered when selecting technologies.

Here are the main technologies used:

- **React**: Dynamic component library
- **Styled-component**: Styling library for React applications (CSS-in-JS)
- **Vite**: Front-end tool for local development server and builds
- **framer-motion**: Animation and gesture control library for React applications
- **Json-server**: Package that creates a key-value based DB and API server
- **Json-server-auth**: jwt authentication middleware for `json-server`
- **Cors-anywhere**: Proxy server for bypassing Cors on web servers when using external OpenAPI
- **Docker**:

Among these, if you were to point out what differentiates this team, it would be the implementation of **user authentication without implementing the backend**.

-- Work in progress.

[👏 Go here](http://home.juhyeonni.co.kr:4000)

## Execution Method

### Local Development Server

1. Clone the project
2. Import the environment variable file (.env)
3. Enter `yarn install` to install the dependencies
4. Enter `yarn serve` to start json-server
5. Enter `yarn dev` to start the Vite local development server
6. Access the default Vite port in your browser

### Docker Deployment Environment

1. Clone the project
2. Import the environment variable file (.env)
3. With Docker installed, enter `docker compose up`
   - After a multi-stage build, deploy nginx (web application)
   - Use a custom `json-server` image with middleware to run json-server
4. Access port `3000` in your browser
