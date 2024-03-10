// Title of the gadget page, including the namespace.
var gadgetPageName = "Terraria Wiki:Compare page list";

// Because the ResourceLoader refuses to load scripts that use ES6 features,
// the code of the gadget is on the following page and is loaded separately here.
var codePageName = "MediaWiki:Gadget-comparePageList/app.js";

if (mw.config.get('wgPageName') === gadgetPageName.replace(/ /g, '_')) {
	mw.loader.load(mw.config.get('wgScript') + '?' + $.param({ title: codePageName, action: 'raw', ctype: 'text/javascript' }));
}