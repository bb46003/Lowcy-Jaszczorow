export class SocketHandler {
  constructor() {
    this.identifier = "system.lowcy-jaszczorow";
    this.registerSocketEvents();
  }
  registerSocketEvents() {
    game.socket.on("system.lowcy-jaszczorow", async (data) => {
      switch (data.type) {
      }
    });
  }
}
