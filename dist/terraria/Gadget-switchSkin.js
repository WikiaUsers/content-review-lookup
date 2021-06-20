// Add buttons to the interface that change the user's skin setting and reload the page with the new skin.

const l10n = (function() {
	const $text = {
		'buttonlabel': {
			'en': 'Switch to "$newskinname$"',
			'de': 'Zu „$newskinname$“ wechseln',
			'fr': 'Changer pour "$newskinname$"'
		},
		'hovertext': {
			'en': 'Change your skin setting from "$oldskinname$" to "$newskinname$" and reload the page',
			'de': 'Deine Skin-Einstellung von „$oldskinname$“ zu „$newskinname$“ ändern und die Seite neu laden',
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
const switchTable = (function(){
	const skinnameList = ["hydra", "hydradark", "fandomdesktop"]; //all skin names.
	var t = {};
	skinnameList.forEach(function(skin) { t[skin] = skinnameList.filter(function(s){ return s != skin;}); });
	return t;
})();

const apiGetOptions = {
	action: "query",
	meta: "userinfo",
	uiprop: "options"
};

// function to execute when the button is clicked:
function changeSkin(targetSkin) {
	const apiParams = {
		action: "options",
		change: "skin=" + targetSkin
	};
	// perform skin change
	new mw.Api().postWithToken('csrf', apiParams)
	// and reload the page if successful
	.done(function(data) {
		location.reload();
	})
	.fail(function(code, data) {
		alert(l10n('error') + code);
	});
}

// this function is called for each of the target skins defined in the switchTable
function makeButtonForTargetSkin(targetSkin, currentSkin, oldskinname) {
	const newskinname = mw.msg('skinname-' + targetSkin);
	
	// note: targetSkin and currentSkin are the internal names of the skins (e.g. "hydradark"),
	// while newskinname and oldskinname are the localized display names of the skins (e.g. "Hydra Dark")
	
	const buttonlabel = l10n('buttonlabel').replace('$newskinname$', newskinname);
	const hovertext = l10n('hovertext').replace('$newskinname$', newskinname).replace('$oldskinname$', oldskinname);
	
	if (currentSkin == "fandomdesktop") {
		// FandomDesktop: add a button to the dropdown with the three vertical dots, in the very top right and in the sticky header
		$(".wiki-tools > .wds-dropdown > .wds-dropdown__content > .wds-list").each(function() {
			var newLi = document.createElement("li");
			var newA = document.createElement("a");
			newA.href = "javascript:void(0);";
			newA.textContent = buttonlabel;
			newA.title = hovertext;
			newLi.appendChild(newA);
			$(newLi).click(function() {
				changeSkin(targetSkin);
			});
			this.appendChild(newLi);
		});
	} else {
		// Hydra/HydraDark: add a button to the "More" dropdown
		$(mw.util.addPortletLink('p-cactions', 'javascript:;', buttonlabel, 'ca-switch-skin-' + targetSkin, hovertext)).click(function() {
			changeSkin(targetSkin);
		});
	}
}

// i18n: load the localized skin names of all skins defined in the table (only define the message names here, actual loading occurs once document is ready)
var skinnames_messages = {}; // set, to prevent duplicates
for (const skinname in switchTable) {
	skinnames_messages['skinname-' + skinname] = true; // add to set
	switchTable[skinname].forEach(function(targetskinname) { // iterate over all target skins
		skinnames_messages['skinname-' + targetskinname] = true; // add to set
	});
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
			switchTable[currentSkin].forEach(function(targetSkin) {
				makeButtonForTargetSkin(targetSkin, currentSkin, oldskinname);
			});
		});
	});
});