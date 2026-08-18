import * as models from "./data-model/actors/_module.mjs";
import { lowcacActor } from "./documents/actors/lowca.mjs";
import * as utils from "./utilities/utils.mjs";
import { registerHandlebarsHelpers } from "./utilities/handlebars.mjs";
import { lowcaSheet } from "./sheets/actors/lowca.mjs";

Hooks.once("init", async function () {
  CONFIG.Actor.documentClass = lowcacActor;
  CONFIG.Actor.dataModels = {
    lowca: models.lowcaDataModel,
  };
  foundry.applications.apps.DocumentSheetConfig.unregisterSheet(
    foundry.documents.Actor,
    "core",
    foundry.applications.sheets.ActorSheet,
  );
  foundry.applications.apps.DocumentSheetConfig.unregisterSheet(
    foundry.documents.Item,
    "core",
    foundry.applications.sheets.ItemSheetV2,
  );
  utils.registerSystemSheet(foundry.documents.Actor, lowcaSheet, "lowca");
  registerHandlebarsHelpers();
});
