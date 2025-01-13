import WebSocket, { WebSocketServer } from "ws";

// Pierwszy serwer na porcie 8080
const wss1 = new WebSocketServer({ port: 8080 });
wss1.on("connection", (ws) => {
  console.log("Klient podłączony do portu 8080");

  ws.on("message", (message) => {
    const messageString = message.toString();
    console.log("Odebrano wiadomość od klienta na porcie 8080:", messageString);

    try {
      const data = JSON.parse(messageString);

      if (
        data.type === "motion" ||
        data.type === "rotation" ||
        data.type === "GameRotation"
      ) {
        console.log("Odebrane dane ruchu:", data);

        wss1.clients.forEach((client) => {
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
    console.log("Klient rozłączony z portu 8080");
  });
});

// Drugi serwer na porcie 9090
const wss2 = new WebSocketServer({ port: 9090 });
wss2.on("connection", (ws) => {
  console.log("Klient podłączony do portu 9090");

  ws.on("message", (message) => {
    const messageString = message.toString();
    console.log("Odebrano wiadomość od klienta na porcie 9090:", messageString);

    try {
      const data = JSON.parse(messageString);

      if (
        data.type === "motion" ||
        data.type === "rotation" ||
        data.type === "GameRotation"
      ) {
        console.log("Odebrane dane ruchu:", data);

        wss2.clients.forEach((client) => {
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
    console.log("Klient rozłączony z portu 9090");
  });
});
