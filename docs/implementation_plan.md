### 1. How is connection going to work

> Lobby : IP : Port(to define? ex. 4500)

IP = Is the ip of the host

### 2. How does the joining work
After the host creates a room his ip is being saved(more about it later), then the host is able to create the game under a port(ex. 5000), after that the client checks if the ports ex. 5001-5008(if there more players than more ports are checked) are available if so, then the game is allowed to start, the lobby is kept *alive* in case anyone loses connection or something so that they can recconect, also helpful in case if players want to restart the game quickly or make a rematch.

### 3. How does port definition work
Basically the client checks dynamically which ports are available or uses a structure of predefined ports (ex. 4500, 4560, 4580, 4600, 5100 etc.), keeps looking for the available port until found, the same with the game port but also there would be a need to check if all 8(or whatever the amount of players) ports are available, for example (6001, 6002, 6003, 6004, 6005, 6006, 6007, 6008).

### 4. Network Arch

After the user creates creates a lobby it's given a random name that a lobby owner can change, and an optional password. This data is sent into the server and then people that wanna join either gonna be joining a random room without a password or they can open a lobby explorer where they can select which lobby they want to join. The lobby owner is also able to change the game mode, the max player amount is gonna be changed based on the gamemode.

|Lobby|
|---|
|name|
|pw|
|mode|
|players|
|players_max|

### 5. Server structure

Vercel + Neon Postgres(for db) + Nuxt.js(for backend) + drizzle(ORM)
