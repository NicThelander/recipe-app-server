# recipe-app-server
An express server connected to mongo db for my recipe app.

to get the server running:
step 1: install ngrok with "npm install -g ngrok"
step 2: in your console enter "ngrok http 3000"
step 3: copy the forwarding http link, not the https one (for example "http://foobar.ngrok.io")
step 3: in another console tab/window, cd into the server folder
step 4: enter "npm run dev" and the server will console log "Connected to Mongo instance" if it's succesful
