import lowcyRzut from "../roll/rzuty.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ApplicationV2 } = foundry.applications.api;

export default class lowcyRollDialog extends HandlebarsApplicationMixin(
  ApplicationV2,
) {
  constructor(actor = {}, cechaPodstawowa = {}, ...args) {
    super(...args);

    this.actor = actor;
    this.cechaPodstawowa = cechaPodstawowa;
    this.activeTab = "main";
  }
  static DEFAULT_OPTIONS = {
    classes: ["lowca-roll-dialog"],
    position: { width: 450, height: 300 },
    actions: {
      prosty: lowcyRollDialog.#prosty,
      zlozony: lowcyRollDialog.#zlozony,
      advanceRoll: lowcyRollDialog.#advanceRoll
    },
    window: { title: "LJ.dialog.rzut" },
    form: {
      submitOnChange: false,
      submitOnClose: false,
    },
  };
  static PARTS = {
    main: {
      template:
        "systems/lowcy-jaszczorow/templates/dialogs/roll-dialog-main.hbs",
    },
    advande: {
      template:
        "systems/lowcy-jaszczorow/templates/dialogs/roll-dialog-advance.hbs",
    },
  };
  static TABS = {
    items: {
      tabs: [{ id: "advance" }, { id: "main" }],
      initial: "main",
    },
  };
  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.cechy = this._prepareCechy();
    context.cechaPodstawowa = this.cechaPodstawowa;
    const activeTab = this.activeTab;
    if (activeTab === "main") {
      context.tabs["main"].cssClass = "active";
      context.tabs["advance"].cssClass = "";
    } else {
      context.tabs["main"].cssClass = "";
      context.tabs["advance"].cssClass = "active";
    }
    return context;
  }
  _prepareCechy() {
    const cechaPodstawowa = this.cechaPodstawowa;
    const cechy = { ...this.actor.system.cechy };

    delete cechy[cechaPodstawowa.name];

    return Object.entries(cechy).map(([name, value]) => ({
        name,
        value
    }));
}
  static async #prosty() {
    const rzut = new lowcyRzut(this.actor,this.cechaPodstawowa);
    rzut.prosty();
     this.close()
  }
  static async #advanceRoll(ev) {
    const target = ev.target;
    const element = target.offsetParent;

    const wszystkieCechy = element.querySelectorAll('input[type="checkbox"]');

    const cechy = [];
    cechy.push(this.cechaPodstawowa);

    wszystkieCechy.forEach((element) => {
      if (element.checked) {
        const cechaDodatkowa = {
          name: element.dataset.cecha.trim(),
          value: element.dataset.kostka,
        };
        cechy.push(cechaDodatkowa);
      }
    });
    const rzut = new lowcyRzut(this.actor, cechy);
    rzut.zlozony();
    this.close()
  }
  static async #zlozony(ev) {
    this.activeTab = "advance";
    this.render({ force: true, position: { height: 450 } });
  }
}
