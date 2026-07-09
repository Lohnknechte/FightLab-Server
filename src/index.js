// index.js
const { WebSocketServer } = require('ws');

// Port mapping for Render or local testing
const PORT = process.env.PORT || 3000;
const wss = new WebSocketServer({ port: PORT });

// Structure: Map of roomCodes -> { host: WebSocket, clients: Map(peerId -> WebSocket) }
const rooms = new Map();
let nextPeerId = 2; // Godot expects Host to be 1. Clients get 2, 3, 4, etc.

wss.on('connection', (ws) => {
    let currentRoom = null;
    let myId = null;
    let isHost = false;

    ws.on('message', (messageAsString) => {
        let msg;
        try { 
            msg = JSON.parse(messageAsString); 
        } catch (e) { 
            return; 
        }

        // ==========================================
        // 1. HOST CREATES A ROOM
        // ==========================================
        if (msg.type === "host_room") {
            // Generate a random 4-character code (e.g. "X8K9")
            const roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
            
            rooms.set(roomCode, { host: ws, clients: new Map() });
            currentRoom = roomCode;
            myId = 1;
            isHost = true;
            
            console.log(`[ROOM CREATED] Code: ${roomCode}`);
            ws.send(JSON.stringify({ type: "room_created", room: roomCode, id: myId }));
            return;
        }

        // ==========================================
        // 2. CLIENT JOINS A ROOM
        // ==========================================
        if (msg.type === "join_room") {
            const requestedRoom = msg.room.toUpperCase();
            const room = rooms.get(requestedRoom);
            
            if (!room) {
                ws.send(JSON.stringify({ type: "error", message: "Room not found" }));
                return;
            }

            // Max players check (32 players = 1 host + 31 clients)
            if (room.clients.size >= 31) {
                ws.send(JSON.stringify({ type: "error", message: "Room is full (Max 32 players)" }));
                return;
            }
            
            currentRoom = requestedRoom;
            myId = nextPeerId++;
            isHost = false;
            room.clients.set(myId, ws);

            console.log(`[CLIENT JOINED] ID: ${myId} joined Room: ${currentRoom}`);
            ws.send(JSON.stringify({ type: "joined", id: myId }));
            
            // Alert the Host to create a WebRTCPeerConnection for this specific client
            if (room.host.readyState === 1) {
                room.host.send(JSON.stringify({ type: "client_connected", id: myId }));
            }
            return;
        }

        // ==========================================
        // 3. WEBRTC HANDSHAKE ROUTING (SDP / ICE)
        // ==========================================
        if (currentRoom && rooms.has(currentRoom)) {
            const room = rooms.get(currentRoom);
            
            // If the HOST sends WebRTC data, they must specify a target_id
            if (isHost && msg.target_id) {
                const targetClient = room.clients.get(msg.target_id);
                if (targetClient && targetClient.readyState === 1) {
                    msg.from_id = 1; // Tag it from host
                    targetClient.send(JSON.stringify(msg));
                }
            } 
            // If a CLIENT sends WebRTC data, it always goes to the Host
            else if (!isHost) {
                if (room.host.readyState === 1) {
                    msg.from_id = myId; // Tag it with client's ID
                    room.host.send(JSON.stringify(msg));
                }
            }
        }
    });

    // ==========================================
    // 4. DISCONNECTION HANDLING
    // ==========================================
    ws.on('close', () => {
        if (currentRoom && rooms.has(currentRoom)) {
            const room = rooms.get(currentRoom);
            
            if (isHost) {
                console.log(`[ROOM DESTROYED] Host left. Closing room ${currentRoom}`);
                // Tell all clients the host died
                room.clients.forEach(client => {
                    if (client.readyState === 1) {
                        client.send(JSON.stringify({ type: "host_disconnected" }));
                    }
                });
                rooms.delete(currentRoom);
            } else {
                console.log(`[CLIENT LEFT] ID: ${myId} left Room: ${currentRoom}`);
                room.clients.delete(myId);
                // Tell the host the client died so they can clean up the WebRTCPeerConnection
                if (room.host.readyState === 1) {
                    room.host.send(JSON.stringify({ type: "client_disconnected", id: myId }));
                }
            }
        }
    });
});

console.log(`Signaling server running on port ${PORT}...`);