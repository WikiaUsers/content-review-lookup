// Add a button to the "More" dropdown that changes the user's skin setting and reload the page with the new skin.

const l10n = (function() {
	const $text = {
		'buttonlabel': {
			'en': 'Switch to "$newskinname$"',
			'de': 'Zu „$newskinname$“ wechseln',
			'fr': 'Changer pour "$newskinname$"'
		},
		'hovertext': {
			'en': 'Change your skin setting from "$oldskinname$" to "$newskinname$" and reload the page',
			'de': 'Deine Skin-Einstellung von „$oldskinname$“ to „$newskinname$“ ändern und die Seite neu laden',
			'fr': 'Change votre paramètre d\'apparence de "$oldskinname$" à "$newskinname$" et recharge la page'
		},
		'error': {
			'en': 'Could not change the skin. Reason: ',
			'de': 'Konnte den Skin nicht wechseln. Grund: ',
			'fr': 'N\'a pas pu changer l\'apparence. Raison : '
		}
	};
	const $lang = mw.config.get( 'wgUserLanguage' ) || 'en';
	return function(key) {
		return $text[key] && ($text[key][$lang] || $text[key]['en']) || '';
	};
})();

// this table defines the switching that is to be performed, depending on the current skin
const switchTable = {
	"hydra": ["hydradark", "fandomdesktop"], // if current skin is "hydra", then switch to "hydradark" and "fandomdesktop"
	"hydradark": ["hydra", "fandomdesktop"]
};

const apiGetOptions = {
	action: "query",
	meta: "userinfo",
	uiprop: "options"
};
function apiSetSkinOption(skinname) {
	return {
		action: "options",
		change: "skin=" + skinname
	};
}

// i18n: load the localized skin names of all skins defined in the table
var skinnames_messages = {}; // set, to prevent duplicates
for (const skinname in switchTable) {
	skinnames_messages['skinname-' + skinname] = true; // add to set
	for (const targetskinname of switchTable[skinname]) { // iterate over all target skins
		skinnames_messages['skinname-' + targetskinname] = true; // add to set
	}
}

$(document).ready(function() {
	// load skin names
	new mw.Api().loadMessagesIfMissing(Object.keys(skinnames_messages)).then(function() {
		
		// get current skin name
		new mw.Api().get(apiGetOptions).done(function(data) {
			const currentSkin = data.query.userinfo.options.skin;
			
			if (switchTable[currentSkin] === undefined) {
				// the name of the current skin is not registered in our table, so we can't handle it
				return;
			}
			
			const oldskinname = mw.msg('skinname-' + currentSkin);
			for (const targetSkin of switchTable[currentSkin]) {
				const newskinname = mw.msg('skinname-' + targetSkin);
				
				const buttonlabel = l10n('buttonlabel').replace('$newskinname$', newskinname);
				const hovertext = l10n('hovertext').replace('$newskinname$', newskinname).replace('$oldskinname$', oldskinname);
				
				// create button in the dropdown menu
				$(mw.util.addPortletLink('p-cactions', 'javascript:;', buttonlabel, 'ca-switch-skin-' + targetSkin, hovertext)).click(function() {

				// upon clicking the button: switch skin
				new mw.Api().postWithToken('csrf', apiSetSkinOption(targetSkin)).done(function(data) {
						location.reload();
					}).fail(function(code, data) {
						alert(l10n('error') + code);
					});
				});
			}
		});
	});
});