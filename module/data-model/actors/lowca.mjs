const {
  StringField,
  BooleanField,
  SchemaField,
  NumberField,
  HTMLField,
  SetField,
  ArrayField,
  DocumentUUIDField,
  IntegerSortField,
} = foundry.data.fields;

export class lowcaDataModel extends foundry.abstract.TypeDataModel {
  static metadata = Object.freeze({});

  static defineSchema() {
    return {
      plemie: new StringField({}),
      sciezka: new StringField({}),
      kondycja: new SchemaField({
        current: new NumberField({
          initial: 0,
        }),
        max: new NumberField({
          initial: 5,
        }),
      }),
      prog_ran: new NumberField({
        initial: 0,
        label: "LJ.lowca.progRanny",
      }),
      rany: new SchemaField({
        current: new NumberField({
          initial: 0,
        }),
        max: new NumberField({
          initial: 0,
        }),
      }),
      ruch: new StringField({
        choices: {
          wolny: "LJ.ruch.wony",
          normalny: "LJ.ruch.normalny",
          szybki: "LJ.ruch.szybki",
        },
        initial: "normalny",
        required: true,
        label: "LJ.lowca.ruch",
      }),
      dziki_zeton: new BooleanField({
        initial: true,
        label: "LJ.lowca.dzikiZeton",
      }),
      pancerz: new NumberField({
        initial: 0,
        label: "LJ.lowca.pancerz",
      }),
      obrazenia: new NumberField({
        initial: 0,
        label: "LJ.lowca.obrazenia",
      }),
      cechy: new SchemaField({
        brutalnosc: new StringField({
          choices: {
            d12: "LJ.lowca.k12",
            d10: "LJ.lowca.k10",
            d8: "LJ.lowca.k8",
          },
          initial: "d12",
          label: "LJ.lowca.cechy.brutalnosc",
          required: true,
        }),
        determinacja: new StringField({
          choices: {
            d12: "LJ.lowca.k12",
            d10: "LJ.lowca.k10",
            d8: "LJ.lowca.k8",
          },
          initial: "d12",
          label: "LJ.lowca.cechy.determinacja",
          required: true,
        }),
        przebieglosc: new StringField({
          choices: {
            d12: "LJ.lowca.k12",
            d10: "LJ.lowca.k10",
            d8: "LJ.lowca.k8",
          },
          initial: "d12",
          label: "LJ.lowca.cechy.przebieglosc",
          required: true,
        }),
        przyroda: new StringField({
          choices: {
            d12: "LJ.lowca.k12",
            d10: "LJ.lowca.k10",
            d8: "LJ.lowca.k8",
          },
          initial: "d12",
          label: "LJ.lowca.cechy.przyroda",
          required: true,
        }),
        refleks: new StringField({
          choices: {
            d12: "LJ.lowca.k12",
            d10: "LJ.lowca.k10",
            d8: "LJ.lowca.k8",
          },
          initial: "d12",
          label: "LJ.lowca.cechy.reflkes",
          required: true,
        }),
        rzemioslo: new StringField({
          choices: {
            d12: "LJ.lowca.k12",
            d10: "LJ.lowca.k10",
            d8: "LJ.lowca.k8",
          },
          initial: "d12",
          label: "LJ.lowca.cechy.rzemioslo",
          required: true,
        }),
        rytualy: new StringField({
          choices: {
            d12: "LJ.lowca.k12",
            d10: "LJ.lowca.k10",
            d8: "LJ.lowca.k8",
          },
          initial: "d12",
          label: "LJ.lowca.cechy.rytualy",
          required: true,
        }),
        wladza: new StringField({
          choices: {
            d12: "LJ.lowca.k12",
            d10: "LJ.lowca.k10",
            d8: "LJ.lowca.k8",
          },
          initial: "d12",
          label: "LJ.lowca.cechy.wladza",
          required: true,
        }),
        zew: new StringField({
          choices: {
            d12: "LJ.lowca.k12",
            d10: "LJ.lowca.k10",
            d8: "LJ.lowca.k8",
          },
          initial: "d12",
          label: "LJ.lowca.cechy.zew",
          required: true,
        }),
      }),
      historia: new SchemaField({
        plemie: new HTMLField({
          label: "LJ.lowca.pamiec",
        }),
        jak_zostales: new HTMLField({
          label: "LJ.lowca.jakZostales",
        }),
        znany_lowca: new HTMLField({
          label: "LJ.lowca.znanyLowca",
        }),
      }),
      o_tobie: new SchemaField({
        strach: new HTMLField({
          label: "LJ.lowca.strach",
        }),
        marzenia: new HTMLField({
          label: "LJ.lowca.marzenia",
        }),
        osoba: new HTMLField({
          label: "LJ.lowca.osoba",
        }),
        cel: new HTMLField({
          label: "LJ.lowca.cel",
        }),
        zaufanie: new HTMLField({
          label: "LJ.lowca.zaufanie",
        }),
      }),
    };
  }
}
