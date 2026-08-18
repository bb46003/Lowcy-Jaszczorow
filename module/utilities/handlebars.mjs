export function registerHandlebarsHelpers() {
  Handlebars.registerHelper({
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
      return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
    range: (v1, v2, v3) => checkRange(v1, v2, v3),
    not: (v) => !v,
  });
  Handlebars.registerHelper("lowercase", function (str) {
    return str.toLowerCase();
  });

  function checkRange(v1, v2, v3) {
    const ouput = v1 >= v2 && v1 <= v3;
    return ouput;
  }
  Handlebars.registerHelper("log", function (log) {
    console.log(log);
  });

  Handlebars.registerHelper("isUserGM", function () {
    const isGM = game.user.isGM;
    return isGM;
  });

  Handlebars.registerHelper("range", function (start, end) {
    let s = start;
    let e = end;
    if (Array.isArray(s)) {
      s = s.length;
    }

    if (Array.isArray(e)) {
      e = e.length;
    }
    s = Number(s);
    e = Number(e);

    const result = [];

    for (let i = s; i <= e; i++) {
      result.push(i);
    }

    return result;
  });

  Handlebars.registerHelper("arrayLength", function (object) {
    const array = Object.keys(object);
    return array?.length || 0;
  });
  Handlebars.registerHelper("isFirst", function (index, object) {
    return Object.keys(object)[0] === index;
  });
  Handlebars.registerHelper("isLast", function (index, object) {
    const keys = Object.keys(object);
    return keys[keys.length - 1] === index;
  });
  Handlebars.registerHelper("array", (...args) => args.slice(0, -1));

  Handlebars.registerHelper("concat", (...args) => args.slice(0, -1).join(""));

  Handlebars.registerHelper("includes", function (element, expression) {
    if (typeof element === "string") {
      return element.includes(expression);
    }
    return false;
  });

  Handlebars.registerHelper("format", function (string, object) {
    const localization = game.i18n.format(string, object.hash);
    return localization;
  });
}
