/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1)
  importScriptPage('MediaWiki:AjaxRedirect/code.js', 'dev');