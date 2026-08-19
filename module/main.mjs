import * as models from "./data-model/actors/_module.mjs";
import { lowcacActor } from "./documents/actors/lowca.mjs";
import * as utils from "./utilities/utils.mjs";
import { registerHandlebarsHelpers } from "./utilities/handlebars.mjs";
import { lowcaSheet } from "./sheets/actors/lowca.mjs";
import { baseItemDataModel } from "./data-model/items/baseItem.mjs";
import { baseItemSheet } from "./sheets/items/baseItem.mjs";

Hooks.once("init", async function () {
  CONFIG.Actor.documentClass = lowcacActor;
  CONFIG.Actor.dataModels = {
    lowca: models.lowcaDataModel,
  };
  CONFIG.Item.dataModels = {
    "typ-lowcy": baseItemDataModel,
    zdolnosc: baseItemDataModel,
    umiejetnosc: baseItemDataModel,
    bron: baseItemDataModel,
    pancerz: baseItemDataModel,
    przedmiot: baseItemDataModel,
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
  utils.registerSystemSheet(foundry.documents.Item, baseItemSheet, "typ-lowcy");
  utils.registerSystemSheet(foundry.documents.Item, baseItemSheet, "zdolnosc");
  utils.registerSystemSheet(
    foundry.documents.Item,
    baseItemSheet,
    "umiejetnosc",
  );
  utils.registerSystemSheet(foundry.documents.Item, baseItemSheet, "bron");
  utils.registerSystemSheet(foundry.documents.Item, baseItemSheet, "pancerz");
  utils.registerSystemSheet(foundry.documents.Item, baseItemSheet, "przedmiot");

  registerHandlebarsHelpers();
});
