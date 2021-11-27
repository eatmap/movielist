# MovieList

CS 3300 - Team 4

## Project Structure
There are two main frameworks in our application:

- **Node.js**: This is used for our backend
- **React**: This is used for our frontend.

The project is structured as following:
- [`client/`](client): Contains almost all of our front-end code. This is where we put our React components, styles, package manager, and static files. It has following important sub-folders and files:
  - [`package.json`](client/package.json): Contains all the dependencies and commands to run and build React app
  - [`.prettierrc`](client/.prettierrc): Configuration file for Prettier to ensure same code style for the project
  - [`public`](client/public): Stores static files like icons, favicon, `robots.txt` and `manifest.json`
  - [`src/actions`](client/src/actions): Contains functions to make API calls to backend server
  - [`src/components`](client/src/components): Contains reusable React components
  - [`src/pages`](client/src/pages): Contains top-level page components
  - [`src/providers`](client/src/providers): Contains React providers to share data among components
  - [`src/utils`](client/src/utils): Contains miscellaneous helper codes

- [`server/`](server): Contains almost all of our back-end code. It has following important sub-folders and files:
  - [`auth/`](server/auth): This folder contains all the helper code to authenticate user, issue/verify JWT token
  - [`models/`](server/models): This folder contains database schemas
  - [`routes/`](server/routes): This folder contains all the API endpoints handlers
  - [`services/`](server/services): This folder contains all the code to interact with the database
  - [`utils/`](server/utils): This folder contains miscellaneous helper code
  - [`index.js`](server/index.js): This file initializes the Express server
  
- [`app.js`](app.js): Entry point for the application
- [`package.json`](package.json): Contains all the dependencies and commands to run our backend


  
## Pre-requisites
The following tools, software, and technologies are needed to run the application:

<ol>

<li> <b>Install Node.js</b>

Node.js is a JavaScript runtime that allows us to run JavaScript code outside of browser. <br />
For this project, please download 14.x LTS version from [here](https://nodejs.org/en/) and perform the installation.<br />
To verify the installation, run the following command:

```console
$ node -v
  v14.16.1
```

If successful, it should display the version number (eg: `v14.16.1` shown above). If there are errors performing installation, some helpful guides are listed below:

- [Installing Node.js on Windows 10](https://stackoverflow.com/questions/27344045/installing-node-js-and-npm-on-windows-10)
- [Installing Node.js on Mac](https://treehouse.github.io/installation-guides/mac/node-mac.html)

</li>

 <li> <b>Install npm (Node Package manager)</b>

We are using `npm` to install and manage "packages" (dependencies). <br />
Node.js installs NPM by default. To verify if NPM is already installed, run the following command:

```console
$ npm -v
7.22.0
```

If successful, it should display the version (example above).

Make sure you are running npm version 7.x. To update npm, run the following command:

```console
$ npm install -g npm@latest
```

However, if `npm` is missing, download npm from [here](https://www.npmjs.com/get-npm) (this includes all the installation guide).

 </li>

<li> <b>Docker</b> (Optional)

We are using Docker to run MongoDB locally. Similarly, if you do not want to install any other dependencies and simply run the application in production mode, you can use Docker. See details in [Containerizing the application](#containerizing-the-application) section.
</li>

<li> <b>MongoDB</b>

We are using MongoDB to store user data for authentication purposes and managing watchlists. If you are using Docker, simply run the following command to start the database locally:
```console
$ docker compose up mongo
```

Alternatively, you can use [MongoDB Atlas](https://www.mongodb.com/) to create a MongoDB cluster in cloud. Set the connection string to this cluster as the environment variable `MONGODB_URL`.

</li>
</ol>

## Running the application (Development mode)
### Environment variables
Copy `.env.example` to `.env.` file.
```console
$ cp .env.example .env
```
These environment variables will be available to the application on runtime.

**Notes**
- Ensure the connection string to the database is correct. By default, it assumes it is running locally (See instructions above for running the database locally).

### Frontend
Install all the required dependencies for frontend application:
```console
$ npm run client-install
```

To start the frontend application in development mode:
```
$ npm run client
```
By default, the frontend application will be available on `http://localhost:3000`.

### Backend
Install all the required dependencies for backend application:
```console
$ npm run install
```

To start the backend application in development mode:
```console
$ npm run server
```
By default, the backend application will be available on `http://localhost:8080`.


## Running the application (Production mode)
Install all the required dependencies for frontend and backend application:
```console
$ npm install client-install
$ npm install install
```

Create a production build for React app
```console
$ npm run build
```

Start the server in Production mode using `NODE_ENV` environment variable
```console
$ NODE_ENV=production npm run start
```

By default, the application will be available on `http://localhost:8080`.

## Containerizing the application

We can containerize the application using Docker. In the root directory, run the following command to build a docker image:
```console
$ docker build -f Dockerfile . -t movielist:latest
```

This will create a docker image `movielist` with `latest` tag. To run the container for this image, run the following command:
```console
$ docker run --env-file ./.env -p 8080:8080 movielist:latest
```
**Note**
- Set all the required environment variables in a `.env.` file. See `.env.example` file for all the environment variables that need to be set.
- By default, it uses port `8080` and the application can be used at `http://localhost:8080`. If you want to use different port, specify it with `-p` flag.

Alternatively, you can do both of the above step using the following command:
```console
$ docker compose up web
```
This command will build the image if required and run a container for the image for our application.


## Deploying the application
We are using GCP to manage Docker container images using [Container Registry](https://cloud.google.com/container-registry) and deploying our application using [Cloud Run](https://cloud.google.com/run).

First, ensure the correct project is set:
```console
$ gcloud config list project
  [core]
  project = my-project-123
```
If the correct project is not set, run the following command to specify the correct project id.
```console
$ gcloud config set project <project-id>
```

Create a Docker image for the application
```console
$ docker build -f Dockerfile . -t gcr.io/cs3300-movielist/app:latest
```
**Note**: Since we are using the GCP Container Registry, the image must have the prefix `gcr.io/project-name/`

Ensure you are authenticated with the GCP:
```console
$ gcloud auth login
$ gcloud auth configure-docker
```

Push the image to the existing registry.
```console
$ docker push gcr.io/cs3300-movielist/app:latest
```
**Note**: Ensure the image name matches from the build step.

Run the following command to deploy the application:
``` console
$ gcloud run deploy
```
This will use the latest Docker image and deploy the application.
