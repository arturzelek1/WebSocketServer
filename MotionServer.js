import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Klient podłączony");

  ws.on("message", (message) => {
    const messageString = message.toString();
    console.log("Odebrano wiadomość od klienta:", messageString);

    try {
      const data = JSON.parse(messageString);

      if (data.type === "motion") {
        console.log("Odebrane dane ruchu:", data);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        });
      } else {
        console.log("Odebrano inny typ wiadomości:", data.type);
      }
    } catch (error) {
      console.error("Błąd przy parsowaniu wiadomości:", error);
    }
  });

  ws.on("close", () => {
    console.log("Klient rozłączony");
  });
});
