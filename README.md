# recipe-app-server
An express server connected to mongo db for my recipe app. <br />

to get the server running: <br />
step 1: make an account on mongodb and create a cluster. <br />
step 2: Once the cluster is created, click on connect under the cluster page, connect your application and then copy the connection string. <br />
step 3: paste the connection string into the mongoUri quotes inside src/index.js and replace <password> with your cluster password. <br />
step 4: install ngrok with "npm install -g ngrok". <br />
step 5: in your console enter "ngrok http 3000". <br />
step 6: copy the forwarding http link, not the https one (for example "http://foobar.ngrok.io"). <br />
step 7: in the recipe app folder (not recipe server) paste the ngrok http link in the instance baseUrl inside of recipe-react/src/api/online.js <br />
step 8: in another console tab/window, cd into the server folder. <br />
step 9: enter "npm run dev" and the server will console log "Connected to Mongo instance" once the connection has succeeded. <br />
