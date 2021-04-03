/**
 * DisableVisualEditor.js
 * @file Bypasses UCP's 2017 VisualEditor in both its source and visual forms
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @license CC-BY-SA 3.0
 */
;(function (window, $, mw) {
  "use strict";
  var globals = mw.config.get([
    "wgPageName",
    "wgVersion"
  ]);
  var config = $.extend(Object.seal({
    "action": "edit",     // Permissible: "edit" or "submit"
    "disable": "source",  // Permissible: "source", "visual", or "all"
  }), window.configDisableVisualEditor);
  if (window.parseFloat(globals.wgVersion) < 1.33) {
    return;
  }
  $.when($.ready, mw.loader.using([
    "ext.visualEditor.desktopArticleTarget.init",
    "mediawiki.util"
  ])).then(function () {
    mw.libs.ve.addPlugin(mw.hook("ve.activationComplete").add.bind(null,
      function () {
        if (config.disable !== "all" &&
            window.ve.init.target.getSurface().getMode() !== config.disable) {
          return;
        }
        window.location.href = mw.util.getUrl(globals.wgPageName, [
          {"action": "submit"},
          {"action": "edit", "venoscript": "1", "debug": "1"}
        ][+(config.action === "edit")]);
      }
    ));
  }, window.console.error);
}(this, this.jQuery, this.mediaWiki));