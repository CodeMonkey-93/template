const room: string = "ROOM";

export default defineWebSocketHandler({
  open: (peer) => {
    console.log("Opened WebSocket!", peer);
    peer.subscribe(room);
    peer.publish(room, "Another user joined the chat.");
  },
  close: (peer, event) => {
    const { code, reason } = event;
    console.log("Closed WebSocket.", peer, code, reason);
  },
  error: (peer, error) => {
    console.log("Error on WebSocket.", peer, error);
  },
  message: (peer, message) => {
    console.log("Message on WebSocket.", peer, message);
    if (message.text() === "ping") {
      peer.send("pong");
      return;
    }
    peer.publish(room, message.text());
  },
});
