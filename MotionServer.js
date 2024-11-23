import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Klient podłączony");

  // Odbieranie wiadomości od klienta (np. aplikacji mobilnej)
  ws.on("message", (message) => {
    const messageString = message.toString();
    console.log("Odebrano wiadomość od klienta:", messageString);

    try {
      const data = JSON.parse(messageString); // Przekształcenie stringu w obiekt JSON

      // Przykład struktury danych: { type: "motion", accelX, accelY, accelZ, gyroX, gyroY, gyroZ }
      if (data.type === "motion") {
        console.log("Odebrane dane ruchu:", data);

        // Wysyłanie danych do wszystkich połączonych klientów
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data)); // Wysyłanie danych do klienta
          }
        });
      } else {
        console.log("Odebrano inny typ wiadomości:", data.type);
      }
    } catch (error) {
      console.error("Błąd przy parsowaniu wiadomości:", error);
    }
  });

  // Obsługa rozłączenia klienta
  ws.on("close", () => {
    console.log("Klient rozłączony");
  });
});
