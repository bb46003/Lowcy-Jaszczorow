import { enrich } from "../../utilities/utils.mjs";

const { api, sheets } = foundry.applications;

export class baseItemSheet extends api.HandlebarsApplicationMixin(
  sheets.ItemSheetV2,
) {
  constructor(...args) {
    super(...args);
    this.y = 0;
    /** @type {CharacterActor} */
    this.item;
  }
  static DEFAULT_OPTIONS = {
    classes: ["base-sheet"],
    position: { width: 500, height: 550 },
    form: {
      submitOnChange: true,
    },
  };
  static PARTS = {
    tabs: {
      id: "main",
      template: `systems/lowcy-jaszczorow/templates/items/base.hbs`,
    },
  };
  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    Object.assign(context, {
      item: this.item,
      source: this.item.toObject(),
      system: this.item.system,
      fields: this.item.schema.fields,
      systemFields: this.item.system.schema.fields,
    });
    context.opis = {
      value: this.item.system.opis,
      enriched: await enrich(this.item.system.opis),
      field: this.item.system.schema.fields.opis,
    };
    return context;
  }
}
