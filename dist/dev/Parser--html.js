"use strict";

/**
 * @param { string } html 
 * @returns { DocumentFragment }
 */
function parse(html) {
    var before = { raw: html };
    parse.before.fire(before);
    parse.template.innerHTML = before.raw;
    var after = { parsed: document.createDocumentFragment() };
    after.parsed.append(parse.template.content);
    parse.after.fire(after);
    return after.parsed;
}
Object.defineProperty(parse, "template", {
    value: document.createElement("template"),
    configurable: false,
    enumerable: false,
    writable: false
});
Object.defineProperty(parse, "before", {
    value: mw.hook("parser.html.before"),
    configurable: false,
    enumerable: false,
    writable: false
});
Object.defineProperty(parse, "after", {
    value: mw.hook("parser.html.after"),
    configurable: false,
    enumerable: false,
    writable: false
});

module.exports = parse;