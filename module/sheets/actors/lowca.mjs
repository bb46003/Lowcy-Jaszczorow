import { enrich } from "../../utilities/utils.mjs";
import lowcyRollDialog from "../../dialogs/roll.mjs";

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
      itemContextMenu: lowcaSheet.#itemContextMenu,
      dodaj: lowcaSheet.#dodaj,
      rzut_atrybut: lowcaSheet.#rzut_atrybut,
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
    ekwipunek: {
      id: "tabs",
      template:
        "systems/lowcy-jaszczorow/templates/actors/lowca/tab/lowca-tab-ekwipunek.hbs",
    },
    zdolnosci: {
      id: "tabs",
      template:
        "systems/lowcy-jaszczorow/templates/actors/lowca/tab/lowca-tab-zdolnosci.hbs",
    },
    umiejetnosci: {
      id: "tabs",
      template:
        "systems/lowcy-jaszczorow/templates/actors/lowca/tab/lowca-tab-umiejetnosci.hbs",
    },
    historia: {
      id: "tabs",
      template:
        "systems/lowcy-jaszczorow/templates/actors/lowca/tab/lowca-tab-historia.hbs",
    },
    o_tobie: {
      id: "tabs",
      template:
        "systems/lowcy-jaszczorow/templates/actors/lowca/tab/lowca-tab-o-tobie.hbs",
    },
  };
  static TABS = {
    items: {
      tabs: [
        { id: "ekwipunek", group: "items" },
        { id: "zdolnosci", group: "items" },
        { id: "umiejetnosci", group: "items" },
        { id: "historia", group: "items" },
        { id: "o_tobie", group: "items" },
      ],
      initial: "umiejetnosci",
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
    context.historia = {
      plemie: {
        value: this.actor.system.historia.plemie,
        enriched: await enrich(this.actor.system.historia.plemie),
        field: this.actor.system.schema.fields.historia.fields.plemie,
      },

      jak_zostales: {
        value: this.actor.system.historia.jak_zostales,
        enriched: await enrich(this.actor.system.historia.jak_zostales),
        field: this.actor.system.schema.fields.historia.fields.jak_zostales,
      },

      znany_lowca: {
        value: this.actor.system.historia.znany_lowca,
        enriched: await enrich(this.actor.system.historia.znany_lowca),
        field: this.actor.system.schema.fields.historia.fields.znany_lowca,
      },
    };
    context.o_tobie = {
      strach: {
        value: this.actor.system.o_tobie.strach,
        enriched: await enrich(this.actor.system.o_tobie.strach),
        field: this.actor.system.schema.fields.o_tobie.fields.strach,
      },

      marzenia: {
        value: this.actor.system.o_tobie.marzenia,
        enriched: await enrich(this.actor.system.o_tobie.marzenia),
        field: this.actor.system.schema.fields.o_tobie.fields.marzenia,
      },

      cel: {
        value: this.actor.system.o_tobie.cel,
        enriched: await enrich(this.actor.system.o_tobie.cel),
        field: this.actor.system.schema.fields.o_tobie.fields.cel,
      },

      zaufanie: {
        value: this.actor.system.o_tobie.zaufanie,
        enriched: await enrich(this.actor.system.o_tobie.zaufanie),
        field: this.actor.system.schema.fields.o_tobie.fields.zaufanie,
      },
    };
    context.umiejetnosci = await this.prepareItems("umiejetnosc");
    context.zdolnosci = await this.prepareItems("zdolnosc");
    context.ekwipunek = await this.prepareItems("przedmiot");
    return context;
  }
  async prepareItems(type) {
    const items = this.actor.items.filter((item) => item.type === type);
    const data = {};
    items.forEach((item) => {
      const itemID = item.id;
      const iamge = item.img;
      const itemName = item.name;
      const html = item.system.opis;
      data[itemID] = {
        img: iamge,
        name: itemName,
        html: html,
      };
    });

    return data;
  }
  static async #toggle(ev) {
    const target = ev.target;
    this.tokenDisplay = target.checked;
    this.render(true);
  }
  static async #itemContextMenu(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    const button = ev.target.closest(".threeDots");
    const itemId = button.dataset.item;
    const item = this.actor.items.get(itemId);
    const type = button.dataset.type;
    document.querySelector(".custom-context-menu")?.remove();

    const menu = document.createElement("div");
    menu.classList.add("custom-context-menu");
    const localizeType = game.i18n.localize("TYPES.item."+ type)
    const openLabel = game.i18n.format("LJ.lowca.otworz", { type: localizeType });
    const deleteLabel = game.i18n.format("LJ.lowca.usun", { type: localizeType });
    menu.innerHTML = `
    <div class="menu-option" data-action="open">${openLabel}</div>
    <div class="menu-option" data-action="delete">${deleteLabel}</div>
  `;

    menu.style.position = "absolute";
    menu.style.left = `${ev.pageX}px`;
    menu.style.top = `${ev.pageY}px`;
    menu.style.zIndex = 1000;

    document.body.appendChild(menu);

    menu.addEventListener("click", async (e) => {
      const action = e.target.dataset.action;

      if (action === "open") {
        const item = this.actor.items.get(itemId);
        item?.sheet.render(true);
      }

      if (action === "delete") {
        const item = this.actor.items.get(itemId);
        await item?.delete();
      }

      menu.remove();
    });
    setTimeout(() => {
      document.addEventListener("click", () => menu.remove(), { once: true });
    }, 10);
  }
  static async #dodaj(ev) {
    const target = ev.target;
    const type = target.dataset.type;
    const name = game.i18n.localize(`TYPES.Item.${type}`);
    const itemData = { type: type, name: name, system: {} };
    const item = await this.actor.createEmbeddedDocuments("Item", [itemData]);
    item[0].sheet.render({ force: true });
  }
  static async #rzut_atrybut(ev) {
    const actor = this.actor;
    const target = ev.target;
    const cechaName = target.dataset.atrybut;
    const cechaValue = actor.system.cechy[cechaName];
    const cecha = {
      name: cechaName,
      value: cechaValue,
    };
    const rollDialog = new lowcyRollDialog(actor, cecha);
    rollDialog.render({ force: true });
  }
    _processFormData(event, form, formData) {
       return super._processFormData(event, form, formData);
    }
}
