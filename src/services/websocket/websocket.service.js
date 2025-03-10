import { WebSocketServer } from 'ws';
import url from 'url';

const activeUsers = new Map();

const initWebSocketServer = () => {
  console.log("Initializing WebSocket server...");
  
  const wss = new WebSocketServer({ port: 9090 }, () => {
    console.log('WebSocket server running on port 9090');
  });

  wss.on('connection', (ws, req) => {
    const query = url.parse(req.url, true).query;
    const user_id = query.user_id;

    if (!user_id) {
      console.error('No user_id provided. Closing connection.');
      ws.close();
      return;
    }

    activeUsers.set(user_id.toString(), ws);
    console.log(`User connected: ${user_id}`);
    
    ws.on('close', () => {
      activeUsers.delete(user_id);
      console.log(`User disconnected: ${user_id}`);
    });

    ws.on('error', (error) => {
      console.error(`WebSocket error for user ${user_id}:`, error);
    });
  });

};

const notifyUser = (user_id, uniqueKey) => {
    const userSocket = activeUsers.get(user_id.toString());
    
    if (userSocket) {
      userSocket.send(JSON.stringify({ message: "Your unique key", uniqueKey }));
      console.log(`Sent unique key to user ${user_id}`);
    } else {
      console.log(`User ${user_id} is not connected, unable to send unique key.`);
    }
  };

  const notifyAdmin = (admin_id, student_id) => {
    const adminSocket = activeUsers.get(admin_id.toString());
    
    if (adminSocket) {
      adminSocket.send(JSON.stringify({ message: `Student ${student_id} registered` }));
    } else {
      console.log(`Admin ${admin_id} is not connected, unable to send message.`);
    }
  };

export { initWebSocketServer, activeUsers, notifyUser, notifyAdmin };
