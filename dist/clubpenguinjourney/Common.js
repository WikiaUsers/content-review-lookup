/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		'wikifounder': { u:'Wiki Founder', order: 0 },
		bureaucrat: { order: 1 },
		sysop: { order: 2 },
		contentmoderator: { order: 3 },
		threadmoderator: { order: 4 },
		rollback: { order: 5 },
		'trialmoderator': { u:'Trial Moderator', order: 6 },
		'topmonth': { u:'Top Monthly Editor', order: 7 },
	},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.custom = {
	'Hermbeurg': ['wikifounder'],
	'CPJ.Annie': ['topmonth'],
	'Tenny407': ['trialmoderator'],
};
UserTagsJS.modules.mwGroups = ['content-moderator', 'threadmoderator'];
UserTagsJS.modules.inactive = 90; // 90 days

(window.dev = window.dev || {}).profileTags = { noHideTags: true };

$(function() {
	if (mw.config.get('wgNamespaceNumber') === 2) {		// testing on userpage
		mw.util.addCSS(
			'.pc-generator p {\n' + 
			'\tpadding: 2px 8px;\n' +
			'}\n\n' + 
			'.pc-generator-field input[type="text"] {\n' +
			'\tborder: 1px solid #ccc;\n' +
    		'\tborder-radius: 8px 8px 8px 8px;\n' +
			'}\n\n' +
			'.pc-generator-field input[type="text"] {\n' +
			'\twidth: 100px;\n' +
    		'\tpadding-left: 3px;\n' +
    		'\tbackground: #f2fcf5;\n' +
    		'\tborder-color: #ccc;\n' +
    		'\tborder-style: solid;\n' +
    		'\tborder-width: 1px 0;\n' +
			'}\n\n' +
			'.pc-generator .explain {\n' +
			'\tfont-weight: bold;\n' +
			'}\n\n' +
			'#pc-generator-background {\n' +
			'\tdisplay: none;\n' +
			'}\n\n' +
			'#pc-generator-pin {\n' +
			'\tdisplay: none;\n' +
			'}\n\n' +
			'#pc-generator-background + label span {\n' +
			'\tdisplay: inline-block;\n' +
    		'\twidth: 15px;\n' +
    		'\theight: 15px;\n' +
			'\tbackground: linear-gradient(to bottom, #fa0000, #e00);\n' +
    		'\tborder: 1px solid #ccc;\n' +
    		'\tborder-radius: 4px;\n' +
			'}\n\n' +
			'#pc-generator-pin + label span {\n' +
			'\tdisplay: inline-block;\n' +
    		'\twidth: 15px;\n' +
    		'\theight: 15px;\n' +
    		'\tbackground: linear-gradient(to bottom, #fa0000, #e00);\n' +
    		'\tborder: 1px solid #ccc;\n' +
    		'\tborder-radius: 4px;\n' +
			'}\n\n' +
			'#pc-generator-background:checked + label span {\n' +
			'\tbackground: linear-gradient(to bottom, #0b0, #0d0);\n' +
			'}\n\n' +
			'#pc-generator-pin:checked + label span {\n' +
			'\tbackground: linear-gradient(to bottom, #0b0, #0d0);\n' +
			'}\n\n'
		);
		
		$(".pc-generator").replaceWith('<div class="pc-generator" style="width: 400px; margin: auto; border-radius: 10px; border: 1px solid #ccc; background: radial-gradient(circle,#0280cd 50%,#0059a3 80%); text-align: center; color: white">\n' +
			'\t<h3 style="font-weight: bold; font-size: 20px;">Player Card Generator</h3>\n' +
			'\t<img id="player-card-image" width="400px">\n' +
			'\t<p style="text-align: center;">\n' +
			'\t\t<span class="explain" title="Enter your penguin username to generate your Player Card">Penguin Name:</span>\n' +
			'\t\t<input type="text" id="username-input" placeholder="name" />\n' +
			'\t</p>\n' +
			'\t<p style="text-align: left; display: inline-block;">\n' +
			'\t\t<input type="checkbox" id="pc-generator-background" style="display: none;" />\n' +
			'\t\t<label for="pc-generator-background"><span class="pc-generator-checkbox"></span> Background</label>\n' +
			'\t</p>\n' +
			'\t<p style="text-align: left; display: inline-block;">\n' +
			'\t\t<input type="checkbox" id="pc-generator-pin" style="display: none;" />\n' +
			'\t\t<label for="pc-generator-pin"><span class="pc-generator-checkbox"></span> Pin</label>\n' +
			'\t</p>\n' +
			'</div>'
		);
		
		var usernameInput = document.getElementById("username-input");
		var backgroundCheckbox = document.getElementById("pc-generator-background");
		var pinCheckbox = document.getElementById("pc-generator-pin");
		var playerCardImage = document.getElementById("player-card-image");

		function generateImageLink() {
    		var username = usernameInput.value;
    		var Background = backgroundCheckbox.checked;
    		var Pin = pinCheckbox.checked;

    		var imageUrl = "https://cpjourney.net/api/player/playercard";
    		if (!username) {
        		imageUrl += "?name=Hermbeurg&background=" + Background + "&pin=" + Pin;
    		}
    		else {
        		imageUrl += "?name=" + username + "&background=" + Background + "&pin=" + Pin;
    		}

    		playerCardImage.src = imageUrl;
    		console.log("Image source changed to", imageUrl);
		}

		usernameInput.addEventListener("input", generateImageLink);
		backgroundCheckbox.addEventListener("change", generateImageLink);
		pinCheckbox.addEventListener("change", generateImageLink);
		console.log("Listening")

		generateImageLink();
	}
});