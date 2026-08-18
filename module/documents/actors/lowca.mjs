export class lowcacActor extends foundry.documents.Actor {
  /** @override */
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);

    if (this.type === "lowca") {
      await this.updateSource({
        "prototypeToken.actorLink": true,
        "prototypeToken.sight.enabled": true,
        "prototypeToken.disposition": 1,
      });
    }
  }
}
