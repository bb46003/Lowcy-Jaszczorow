import { enrich } from "../../utilities/utils.mjs";

const { api, sheets } = foundry.applications;

export class lowcaSheet extends api.HandlebarsApplicationMixin(
  sheets.ActorSheetV2,
) {
  constructor(...args) {
    super(...args);
    this.y = 0;
    /** @type {CharacterActor} */
    this.actor;
  }
  static DEFAULT_OPTIONS = {
    classes: ["lowca-sheet"],
    position: { width: 1020, height: 1150 },
    actions: {
      toggle: lowcaSheet.#toggle,
    },
    form: {
      submitOnChange: true,
    },
  };
  static PARTS = {
    header: {
      id: "header",
      template:
        "systems/lowcy-jaszczorow/templates/actors/lowca/lowca-main.hbs",
    },
    nav: {
      id: "nav",
      template: "systems/lowcy-jaszczorow/templates/actors/lowca/lowca-nav.hbs",
    },
  };
  static TABS = {
    main: {
      tabs: [],
    },
  };
  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    Object.assign(context, {
      actor: this.actor,
      source: this.actor.toObject(),
      system: this.actor.system,
      fields: this.actor.schema.fields,
      systemFields: this.actor.system.schema.fields,
      tokenDisplay: this.tokenDisplay,
      tokenImg: this.actor.prototypeToken.texture.src,
    });
    return context;
  }
  static async #toggle(ev) {
    const target = ev.target;
    this.tokenDisplay = target.checked;
    this.render(true);
  }
}
