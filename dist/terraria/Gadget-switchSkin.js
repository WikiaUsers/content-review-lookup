// Add a button to the "More" dropdown that changes the user's skin setting and reload the page with the new skin.

const l10n = (function() {
	const $text = {
		'buttonlabel': {
			'en': 'Switch to "$newskinname$"',
			'de': 'Zu „$newskinname$“ wechseln'
		},
		'hovertext': {
			'en': 'Change your skin setting from "$oldskinname$" to "$newskinname$" and reload the page',
			'de': 'Deine Skin-Einstellung von „$oldskinname$“ to „$newskinname$“ ändern und die Seite neu laden'
		},
		'error': {
			'en': 'Could not change the skin. Reason: ',
			'de': 'Konnte den Skin nicht wechseln. Grund: '
		}
	};
	const $lang = mw.config.get( 'wgUserLanguage' ) || 'en';
	return function(key) {
		return $text[key] && ($text[key][$lang] || $text[key]['en']) || '';
	};
})();

// this table defines the switching that is to be performed, depending on the current skin
const switchTable = {
	"hydra": "hydradark", // if current skin is "hydra", then switch to "hydradark"
	"hydradark": "hydra"
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
	skinnames_messages['skinname-' + switchTable[skinname]] = true; // add to set
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
			
			const targetSkin = switchTable[currentSkin];
			const newskinname = mw.msg('skinname-' + targetSkin);
			const oldskinname = mw.msg('skinname-' + currentSkin);
			
			const buttonlabel = l10n('buttonlabel').replace('$newskinname$', newskinname);
			const hovertext = l10n('hovertext').replace('$newskinname$', newskinname).replace('$oldskinname$', oldskinname);
			
			// create button in the dropdown menu
			$(mw.util.addPortletLink('p-cactions', 'javascript:;', buttonlabel, 'ca-switch-skin', hovertext)).click(function() {
				
				// upon clicking the button: switch skin
				new mw.Api().postWithToken('csrf', apiSetSkinOption(targetSkin)).done(function(data) {
					location.reload();
				}).fail(function(code, data) {
					alert(l10n('error') + code);
				});
			});
		});
	});
});