# EG3301R: Web-application to Visualise Vitals Signs Data
This repository houses both the client and server components of the MERN stack.

## Setting Up
Requirements:

- npm
- yarn

<br>Install dependencies for frontend by entering the frontend folder and running:

### `yarn install`

Install dependencies for backend by entering the backend folder and running:

### `npm install`

## Running the Application
To start the frontend application, enter the frontend folder and run:

### `yarn start`

This runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.<br><br>

To start the backend application, enter the backend folder on a separate terminal and run:

### `npm dev`

## Hosting
The entire stack is hosted on a Digital Ocean droplet using Docker. Docker images are uploaded onto
DockerHub and `docker-compose.prd.yml` is uploaded onto the droplet. To deploy the application, ssh into the droplet's IP address and run the docker-compose file: <br>
```
ssh root@128.199.106.255
docker-compose -f docker-compose.prd.yml up -d --build
```

This will create a "docker network" and attach the three running containers (consisting of the client 
listening at port `3000`, server listening at port `5000` and mongo database listening at port `27017` on `mongo`)
to it.
