## How signaling server handling gonna work
- A host creates a room -> sends a request to signaling server
- Signaling server generates a 20 digit code -> sends the data about the lobby to db server where it's saved into the database
- A client uses 20 digit code to join -> request to signaling server sent
- Signaling server decides if a client is allowed to join or not based on the info read from db server
- Signaling server creates a handshake between host and client(player) and allows him to join the lobby -> sends the data about the lobby to db server

## The id
The code that signaling server creates is send to db server and saved as Unique Identifier

## TTL(Time to live) - Lobby lifespan
Host sends a signal to the signaling server(Heartbeat) every 10 seconds, if the hearbeat is stable it's a successful state.
If signaling server doesn't recieve the heartbeat:
- try1: wait 3 seconds until recovery signal
- try2: wait 6 seconds until recovery signal
- try3: wait 12 seconds until recovery signal
If the server recieved recovery signal -> all good
Didn't recieve recovery signal & wait time is over -> remove the lobby from database