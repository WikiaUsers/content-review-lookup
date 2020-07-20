/** 
**Author: T3CHNOCIDE (http://community.wikia.com/wiki/User:T3CHNOCIDE)
**Webside: Destiny Wiki (http://destiny.wikia.com)
**License: CC-BY-SA 3.0
**Version: v1.0
**Function:
**	Creates a graphical upload form which allows users to select from pre-defined values of the
**	image type, subject, source, copyright holder and image license before uploading. This is to 
**	insure all images are correctly attributed and categorised or highlighted for attention when 
**	uploading. The form design is pulled from a JSON file to allow ease of editing/updating.
**To Do:
**	1) Tidy code and correct bodge job work arounds
**	2) Use actual cookies to save data in case of accidental page closure
**	3) Use Wikia API & sandbox page to keep track of most used options for later tweaking of json
**/

//Ensures graphical form calculations and DOM changes are only impletemented
//On the Special:Upload page, reduces precious computer memory for users
if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload' && !mw.config.get('wpForReUpload')) {
	//Saves upgrade form as JSON variable for ease of editing/updating
	var uploadList = {"types":[{"name":"Screenshot","category":"Screenshots","description":"Screen capture of computer or in-game image.\nIncludes: Weapon screenshots, armor screenshots, boss screenshots, etc."},{"name":"Concept Art","category":"Concept art","description":"Bungie concept art of current or future Destiny content.\nIncludes: Map concept art, weapon concept art, character concept art, etc."},{"name":"Graphic","category":"Graphics","description":"Digital art work or designs.\nIncludes: Backgrounds, weapon or armor exhibits, banners, etc."},{"name":"Animation","category":"Animations","description":"Any animated images.\nIncludes: Emote animations, reload animations, etc."},{"name":"Icon","category":"Icons","description":"Images representing specific topic or content.\nIncludes: Grimoire cards, inventory icons, link icons, etc."},{"name":"Photograph","category":"Photographs","description":"Images taken with a camera.\nIncludes: Employee images, gaming event images, etc."},{"name":"Box Art","category":"Box art","description":"The cover art work from merchandise boxes.\nIncludes: Game covers, book covers, sound track covers, etc."},{"name":"Drawing","category":"Drawings","description":"Pencil or fine pen drawings and designs of Destiny content.\nIncludes: Character drawings, etc."},{"name":"Scan","category":"Scans","description":"Scanned images of physical objects.\nIncludes: "},{"name":"Diagram","category":"Graphs","description":"Images of graphs, digrams or tables.\nIncludes: "},{"name":"Advert","category":"Adverts","description":"Images of advertisements"},{"name":"Logo","category":"Logos","description":"Images of in-game or real life logos.\nIncludes: Hakke logo, Bungie logo, etc."},{"name":"Poster","category":"Posters","description":"Destiny poster art.\nIncludes: Destiny Poster, Destiny Guardian Fireteam Poster, etc."},{"name":"3D Render","category":"3D renders","description":"Images of 3D game models.\nIncludes: 3D weapon models, 3D armor models, 3D character models, etc."},{"name":"Other","category":"Unknown type images","description":"Any images not covered by pre-existing images."}],"subjects-content":[{"name":"Item","more":"True","description":"All images of in-game Destiny items.","list":[{"name":"Weapon","category":"Weapon images","description":"All images of weapons or weapon stats/perks."},{"name":"Armor","category":"Armor images","description":"All iamges of armor or armor stats/perks."},{"name":"Artefact","category":"Artefact images","description":"All images of artefacts and artefact perks."},{"name":"Emblem","category":"Emblem images","description":"All images of emblems."},{"name":"Shader","category":"Shader images","description":"All images of shaders and shade changed armor."},{"name":"Ghost Shell","category":"Ghost Shell images","description":"All images of ghost shells."},{"name":"Emote","category":"Emote images","description":"All images and animations of guardian emotes."},{"name":"Sparrow","category":"Sparrow images","description":"All images of sparrows."},{"name":"Jumpship","category":"Jumpship images","description":"All images of jumpships."},{"name":"Treasure Key","category":"Treasure Key images","description":"All images of treasue keys and treasure chests."},{"name":"Consumable","category":"Consumable images","description":"All images of consumable items."},{"name":"Material","category":"Material images","description":"All images of material items."},{"name":"Currency","category":"Currency images","description":"All images of currencies."},{"name":"Other","category":"Unknown subject images","description":"Any item images not already covered."}]},{"name":"Activity","more":"True","description":"All images of in-game Destiny activities and game modes.","list":[{"name":"Prison of Elders","category":"Prison of Elder images","description":"All images of the Prison of Elders activity."},{"name":"Raid","category":"Raid images","description":"All images of the Vault of Glass, Crota's End or King's Fall activities."},{"name":"Story","category":"Story images","description":"All images of the Story mode activity."},{"name":"Strike","category":"Strike images","description":"All images of Strikes."},{"name":"The Tower","category":"Tower images","description":"All images of the The Tower."},{"name":"Vestian Outpost","category":"Vestian Point images","description":"All images of the Vestian Outpost."},{"name":"Patrol","category":"Patrol images","description":"All images of the Patrol activity."},{"name":"Quests","category":"Quest images","description":"All images of Quests."},{"name":"Bounty","category":"Bounty images","description":"All images of the Bounties."},{"name":"Crucible","category":"Crucible images","description":"All images of the Crucible activity."},{"name":"Other","category":"Unknown subject images","description":"Any activity images not already covered."}]},{"name":"Player","more":"True","description":"All images pertaining to the Destiny in-game player character.","list":[{"name":"Guardian","category":"Guardian images","description":"All images of Guardians."},{"name":"Ability","category":"Ability images","description":"All images of guardian abilities."},{"name":"Class","category":"Class images","description":"All images of guardian classes"},{"name":"Reputation","category":"Reputation images","description":"All images of guardian reputation."},{"name":"Combat","category":"Reputation images","description":"All images of player combat."},{"name":"Player Stat","category":"Player stat images","description":"All images of player stats."},{"name":"Race","category":"Race images","description":"All images of guardian races."},{"name":"Other","category":"Unknown subject images","description":"Any player images not already covered."}]},{"name":"Character","more":"True","description":"All images of in-game Destiny characters.","list":[{"name":"Race","category":"Race images","description":"All images of guardian and enemy races."},{"name":"Enemy","category":"Enemy images","description":"All images of enemy characters."},{"name":"Ally","category":"Ally images","description":"All images of ally characters."},{"name":"Vendor","category":"Vendor images","description":"All images of vendors."},{"name":"Faction","category":"Faction images","description":"All images of faction characters or gear."},{"name":"Other","category":"Unknown subject images","description":"Any character images not already covered."}]},{"name":"Location","more":"True","description":"All images of in-game Destiny locations.","list":[{"name":"Map","category":"Map images","description":"All images of crucible or playable maps."},{"name":"Mercury","category":"Mercury images","description":"All images of Mercury."},{"name":"Venus","category":"Venus images","description":"All images of Venus."},{"name":"Earth","category":"Earth images","description":"All images of Earth."},{"name":"Mars","category":"Mars images","description":"All images of Mars."},{"name":"The Reef","category":"The Reef images","description":"All images of The Reef."},{"name":"Jupiter","category":"Jupiter images","description":"All images of Jupiter."},{"name":"Saturn","category":"Saturn images","description":"All images of Saturn."},{"name":"The Dreadnaught","category":"The Dreadnaught images","description":"All images of The Dreadnaught."},{"name":"Scenery","category":"Scenery images","description":"All images of map or location scenery, such as buildings or caves."},{"name":"Objects","category":"Object images","description":"All images of probs or objects on a map or location, such as beacons or chests."},{"name":"Other","category":"Unknown subject images","description":"Any location images not already covered."}]},{"name":"Merhcandise","more":"True","description":"All images of Destiny merchandise.","list":[{"name":"Game","category":"Game images","description":"All images of games or expansions."},{"name":"Soundtrack","category":"Soundtrack images","description":"All images of sountracks or scores."},{"name":"Apparel","category":"Apparel images","description":"All images of Destiny related apparel."},{"name":"Accessory","category":"Accessory images","description":"All images of Destiny related accessories."},{"name":"Figure","category":"Figure images","description":"All images of Destiny action figures, statues or plush toys."},{"name":"Art","category":"Art images","description":"All images of Destiny posters, art, banners or prints."},{"name":"Book","category":"Book images","description":"All images of Destiny books or novels."},{"name":"Other","category":"Unknown subject images","description":"Any merchandise images not already covered."}]},{"name":"People","more":"True","description":"All images of real life people.","list":[{"name":"Employee","category":"Employee images","description":"Images of Bungie, Activision or other company employees."},{"name":"Actor","category":"Actor images","description":"Images of voice actors or models starring on Destiny."},{"name":"Notable Person","category":"Notable people images","description":"Images of community celebrities or notable real world individuals."},{"name":"Other","category":"Unknown subject images","description":"Any real life people images not already covered."}]},{"name":"Grimoire","more":"False","category":"Grimoire images","description":"All images of grimoire cards or grimoire content."},{"name":"Event","more":"False","category":"Event images","description":"All images of real life Destiny and gaming events, such as E3 or Gamescom."},{"name":"Easter Egg","more":"False","category":"Easter egg images","description":"All images of in game easter eggs."},{"name":"Game Design","more":"False","category":"Game design images","description":"All images relating to the design of the game."},{"name":"Other","more":"False","category":"Unknown subject images","description":"Any content images not already covered."}],"subjects-maintenance":[{"name":"Wikia Images","more":"False","category":"Wikia images","description":"All images uploaded by Wikia for use on the wiki."},{"name":"Template Images","more":"False","category":"Template images","description":"All images uploaded for use on templates."},{"name":"Category Images","more":"False","category":"Category images","description":"All images uploaded for use on categories."},{"name":"Policy Images","more":"False","category":"Policy images","description":"All images uploaded for use on policy, help or project pages."},{"name":"Theme Images","more":"False","category":"Theme images","description":"All images uploaded to be used for the wiki theme."},{"name":"Flag Images","more":"False","category":"Flag images","description":"All images of world flags."},{"name":"Raiting Images","more":"False","category":"Rating images","description":"All images of game ratings."},{"name":"Other","more":"False","category":"Unknown subject images","description":"Any maintenance images not already covered."}],"sources":[{"name":"Game","description":"If the image was taken from a game."},{"name":"Book","description":"If the image was taken from a book."},{"name":"Magazine","description":"If the image was taken from a magazine."},{"name":"Video","description":"If the image was taken from a video."},{"name":"Website","description":"If the image was taken from a website."},{"name":"Other","description":"If the image was taken from somewhere else."}],"copyrights":[{"name":"Bungie","description":"If the image was created by Bungie, or the image is of content created by Bungie."},{"name":"Activision","description":"If the image was created by Activision, or the image is of content created by Activision."},{"name":"Self","description":"If the image was created and owned by yourself."},{"name":"Other","description":"If the image was created by someone else."}],"licenses":[{"name":"Copyright","description":"If the image is owned by someone but permission was given."},{"name":"Fair Use","description":"If the image is copyrighted but it'll be used to illistrate the article and there's no free version available."},{"name":"Share Alike","description":"If the image has been published under the CC-BY-SA license."},{"name":"GNU GPL","description":"If the image has been published under the GNU General Public License."},{"name":"Public Domain","description":"If the image has been taken from or published into the public domain."},{"name":"Other","description":"If the image has been published under a different license or you do not know what license the image was published under.\nPlease remember the source of the image."}]}
	//Saves revised DOM structure as variable for later implementation
	var uploadBackground = "#000000"
	var uploadFormHTML = '<table id="upload-options" style="width:100%;"><tr><!-- Image Types --><div style="border-bottom:2px solid ' + uploadBackground + '; margin-bottom:10px; margin-top:10px; font-size:20px;">Image Type</div><div id="upload-types-warning" class="upload-warning-box"></div><table id="upload-types" style="width:100%;"></table><!-- Image Types END --></tr><tr><!-- Image Subjects --><div style="border-bottom:2px solid ' + uploadBackground + '; margin-bottom:10px; margin-top:10px; font-size:20px;">Image Subject(s)</div><div id="upload-subjects-warning" class="upload-warning-box"></div><table id="upload-options" style="width:100%;"><tr><td id="upload-option-content" style="height:30px; background:' + uploadBackground + '; color:#FFF; cursor:pointer; text-align:center; width:50%;">Content Images</td><td id="upload-option-maintenance" style="height:30px; background:' + uploadBackground + '; color:#FFF; cursor:pointer; text-align:center; width:50%;">Maintenance Images</td></tr></table><!-- Subjects Content --><table id="upload-subjects-content" style="width:100%;"></table><table id="upload-subject-content-more" style="width:100%;"><tr><td id="upload-subject-content-back" style="height:30px; background:' + uploadBackground + '; color:#FFF; cursor:pointer; text-align:center; width:40px;"><</td><td id="upload-subject-content-title" style="height:30px; background:' + uploadBackground + '; color:#FFF; text-align:left; padding-left:15px;">Title</td></tr><tr><table id="upload-subjects-content-list" style="width:100%;"></table></tr></table><!-- Subjects Maintenance --><table id="upload-subjects-maintenance" style="width:100%;"></table><table id="upload-subject-maintenance-more" style="width:100%;"><tr><td id="upload-subject-maintenance-back" style="height:30px; background:' + uploadBackground + '; color:#FFF; cursor:pointer; text-align:center; width:40px;"><</td><td id="upload-subject-maintenance-title" style="height:30px; background:' + uploadBackground + '; color:#FFF; text-align:left; padding-left:15px;">Title</td></tr><tr><table id="upload-subjects-maintenance-list" style="width:100%;"></table></tr></table><!-- Image Subjects END --></tr><tr><!-- Image Descriptions --><div style="border-bottom:2px solid ' + uploadBackground + '; margin-bottom:10px; margin-top:10px; font-size:20px;">Image Description</div><div id="upload-description-warning" class="upload-warning-box"></div><table id="upload-description" style="width:100%;"></table><!-- Image Descriptions END --></tr><tr><!-- Image Sources --><div style="border-bottom:2px solid ' + uploadBackground + '; margin-bottom:10px; margin-top:10px; font-size:20px;">Image Source</div><div id="upload-sources-warning" class="upload-warning-box"></div><table id="upload-sources" style="width:100%;"></table><table style="width:100%;"><tr id="upload-sources-textarea" style="display:none;"></tr><!-- Image Source Descriptions --><tr class="upload-sources-description" id="upload-sources-description-Game" style="display:none;"><td colspan="2" class="upload-options-description">Enter the name of the game which the image was taken from.<br/>Using this example format: \'\'Destiny: The Taken King\'\'<br>&bull; You can include the mission or activity by using a hyphen, i.e. " - The King\'s Fall".<br>&bull; You can also include the location by using a hyphen again " - The Tower, Earth".</td></tr><tr class="upload-sources-description" id="upload-sources-description-Book" style="display:none;"><td colspan="2" class="upload-options-description">Enter the name of the book and the page number(s) which the image was taken from.<br/>Using this example format: \'\'\'Destiny Limited Edition Strategy Guide\'\'\- \'\'152\'\'<br>&bull; Use # for one page or #-# for a range of pages.</td></tr><tr class="upload-sources-description" id="upload-sources-description-Magazine" style="display:none;"><td colspan="2" class="upload-options-description">Enter the name of the magazine and the page number(s) which the image was taken from.<br/>Using this example format: \'\'\'Official Xbox Magazine\'\'\- \'\'13-14\'\'<br>&bull; Use # for one page or #-# for a range of pages.</td></tr><tr class="upload-sources-description" id="upload-sources-description-Video" style="display:none;"><td colspan="2" class="upload-options-description">Enter the link to the video and time which the image was taken from.<br/>Using this example format: \'\'https://www.youtube.com/watch?v=SXyMmrgH5d8\'\' (00:52)<br>&bull; (00:00) is the time of the video when the image was seen.<br>&bull; If there is no link, give the full name of the video.</td></tr><tr class="upload-sources-description" id="upload-sources-description-Website" style="display:none;"><td colspan="2" class="upload-options-description">Enter the link to the website where the image was taken from.<br/>Using this example format: \'\'https://www.bungie.net/en/pub/TheTakenKing\'\'<br>&bull; For images from the API include the whole API call URL with parameters.</td></tr><tr class="upload-sources-description" id="upload-sources-description-Other" style="display:none;"><td colspan="2" class="upload-options-description">Enter as much information as possible about the source of the image, including links and/or titles of the source.</td></tr></table><!-- Image Sources END --></tr><tr><!-- Image Copyright Holders --><div style="border-bottom:2px solid ' + uploadBackground + '; margin-bottom:10px; margin-top:10px; font-size:20px;">Image Copyright Holder</div><div id="upload-holders-warning" class="upload-warning-box"></div><table id="upload-holders" style="width:100%;"><tr id="upload-holders-textarea"></tr><tr class="upload-holders-description" id="upload-holders-description-Other"><td colspan="2" class="upload-options-description">Enter the name/username of the individual or company who originally created this image.<br>&bull; If the image is edited from an original, the original author is the copyright holder.<br>&bull; If possible, link the name to the individual\'s personal page or company\'s about page using: [URL author].</td></tr></table><!-- Image Copyright Holders END --></tr><tr><!-- Image Licenses --><div style="border-bottom:2px solid ' + uploadBackground + '; margin-bottom:10px; margin-top:10px; font-size:20px;">Image License</div><div id="upload-licenses-warning" class="upload-warning-box"></div><table id="upload-licenses" style="width:100%;"></table><!-- Image Licenses END --></tr></table>';
	//Creates blank json to remember what options have been selected for the file page
	var uploadCookies = {"types":[], "subjects-content":[], "subjects-maintenance":[], "sources":"", "holders":"", "licenses":[]};


	//Creates form section from json object in specified element
	//If the option has more sub-options this will also update the more options tables
	//If a sub-option has been selected previously, this will auto colourise when updating the table
	function createFormTypes(jsonInput, elementId) {
		var i = 1;
		var e = i;
		while (i <= jsonInput.length) {
			//Checks if upload option is the first of a new line by checking if it is a multiple of 5
			//If the upload option is the first of a new line, <tr> element is added before button.
			if ((i % 5)==1 && i!=1) {e++;};
			if ((i % 5)==1) {$('#upload-' + elementId).append('<tr id="upload-' + elementId + '-' +  e + '">');};
				
			//By passes the issue of duplicate id's when selecting "other" as an option
			if (jsonInput[i - 1]["name"] == "Other") {
				var other_class = " other-" + elementId.split("-list")[0];
			} else {
				var other_class = "";
			};
			
			//By passes button option clicking and allows buttons to trigger text areas
			if (elementId == "sources" || elementId == "holders") {
				var button_class = "upload-text";
			} else {
				var button_class = "upload-option";
			};
			
			if (jsonInput[i - 1].hasOwnProperty('more')) {			
				//Creates button for upload option with relevant data attributes for later
				if (jsonInput[i - 1]["more"] == "True") {
					//Checks if option has previously been selected from JSON list, and adds upload-colourise class
					if (jQuery.inArray(jsonInput[i - 1]["name"], uploadCookies[elementId.split("-list")[0]]) > -1) {
						$('#upload-' + elementId + '-' + e).append('<td class="upload-more-content upload-colourise' + other_class + ' ' + button_class + '" style="width:20%;" id="upload-button-id-' + jsonInput[i - 1]["name"].replace(/\s/, "-") + '" data-name="' + jsonInput[i - 1]["name"] + '" title="' + jsonInput[i - 1]["description"] + '" data-iteration="' + (i - 1) + '">' + jsonInput[i - 1]["name"] + ' + </td>');
					} else {
						$('#upload-' + elementId + '-' + e).append('<td class="upload-more-content' + other_class + ' ' + button_class + '" style="width:20%;" id="upload-button-id-' + jsonInput[i - 1]["name"].replace(/\s/, "-") + '" data-name="' + jsonInput[i - 1]["name"] + '" title="' + jsonInput[i - 1]["description"] + '" data-iteration="' + (i - 1) + '">' + jsonInput[i - 1]["name"] + ' + </td>');
					}
				} else {		
					//Checks if option has previously been selected from JSON list, and adds upload-colourise class
					if (jQuery.inArray(jsonInput[i - 1]["name"], uploadCookies[elementId.split("-list")[0]]) > -1) {
						$('#upload-' + elementId + '-' + e).append('<td class="upload-button-type upload-colourise' + other_class + ' ' + button_class + '" style="width:20%;" id="upload-button-id-' + jsonInput[i - 1]["name"].replace(/\s/, "-") + '" data-name="' + jsonInput[i - 1]["name"] + '" title="' + jsonInput[i - 1]["description"] + '" onclick="selectImageOption(\'' + jsonInput[i - 1]["name"] + '\', \'' + elementId.split("-list")[0] + '\', \'' + button_class + '\')">' + jsonInput[i - 1]["name"] + '</td>');
					} else {
						$('#upload-' + elementId + '-' + e).append('<td class="upload-button-type' + other_class + ' ' + button_class + '" style="width:20%;" id="upload-button-id-' + jsonInput[i - 1]["name"].replace(/\s/, "-") + '" data-name="' + jsonInput[i - 1]["name"] + '" title="' + jsonInput[i - 1]["description"] + '" onclick="selectImageOption(\'' + jsonInput[i - 1]["name"] + '\', \'' + elementId.split("-list")[0] + '\', \'' + button_class + '\')">' + jsonInput[i - 1]["name"] + '</td>');
					}
				}
			} else {
				//Checks if option has previously been selected from JSON list, and adds upload-colourise class
				if (jQuery.inArray(jsonInput[i - 1]["name"], uploadCookies[elementId.split("-list")[0]]) > -1) {
					$('#upload-' + elementId + '-' + e).append('<td class="upload-button-type upload-colourise' + other_class + ' ' + button_class + '" style="width:20%;" id="upload-button-id-' + jsonInput[i - 1]["name"].replace(/\s/, "-") + '" title="' + jsonInput[i - 1]["description"] + '" onclick="selectImageOption(\'' + jsonInput[i - 1]["name"] + '\', \'' + elementId.split("-list")[0] + '\', \'' + button_class + '\')">' + jsonInput[i - 1]["name"] + '</td>');
				} else {
					$('#upload-' + elementId + '-' + e).append('<td class="upload-button-type' + other_class + ' ' + button_class + '" style="width:20%;" id="upload-button-id-' + jsonInput[i - 1]["name"].replace(/\s/, "-") + '" title="' + jsonInput[i - 1]["description"] + '" onclick="selectImageOption(\'' + jsonInput[i - 1]["name"] + '\', \'' + elementId.split("-list")[0] + '\', \'' + button_class + '\')">' + jsonInput[i - 1]["name"] + '</td>');
				}
			}
			
			//Checks if upload option is last of row (row comprises of 5 options) and adds </tr> to close row
			if ((i % 5)==0) {$('#upload-' + elementId).append('</tr>');};
			
			//Increases loop iteration
			i++;
		};
		
		//Ensures new buttons have tooltip active
		$('.upload-button-type').tooltip()
	};

	//Takes values from filled out form and generates page syntax, places syntax in page preview box
	function updateForm() {
		//Creates temporary initial variables
		var file_page_categories = [];
		var file_page_contents = "{{Image summary\n|type= ";
		
		//Fetches the image type and places in image summary form and adds to correct category
		var update_form_types = uploadCookies["types"];
		file_page_contents += update_form_types.join(", ");
		
		for (fli1 = 0; fli1 < update_form_types.length; fli1++) { 
			for (fli2 = 0; fli2 < uploadList["types"].length; fli2++) {
				if (update_form_types[fli1] == uploadList["types"][fli2]["name"]) {
					file_page_categories.push("[[Category:" + uploadList["types"][fli2]["category"] + "]]")
				} else {
					//pass
				}
			};
		};
		
		//Fetches the image subjects and adds to correct categories
		var update_form_subjects = uploadCookies["subjects-content"];
		for (fli1 = 0; fli1 < update_form_subjects.length; fli1++) { 
			for (fli2 = 0; fli2 < uploadList["subjects-content"].length; fli2++) {
				if (uploadList["subjects-content"][fli2]["more"] == "True") {
					for (fli3 = 0; fli3 < uploadList["subjects-content"][fli2]["list"].length; fli3++) {
						if (update_form_subjects[fli1] == uploadList["subjects-content"][fli2]["list"][fli3]["name"]) {
							file_page_categories.push("[[Category:" + uploadList["subjects-content"][fli2]["list"][fli3]["category"] + "]]")
						} else {
							//pass
						};
					};
				} else {
					if (update_form_subjects[fli1] == uploadList["subjects-content"][fli2]["name"]) {
						file_page_categories.push("[[Category:" + uploadList["subjects-content"][fli2]["category"] + "]]")
					} else {
						//pass
					}
				};
			};
		};
		
		var update_form_subjects = uploadCookies["subjects-maintenance"];
		for (fli1 = 0; fli1 < update_form_subjects.length; fli1++) { 
			for (fli2 = 0; fli2 < uploadList["subjects-maintenance"].length; fli2++) {
				if (uploadList["subjects-maintenance"][fli2]["more"] == "True") {
					for (fli3 = 0; fli3 < uploadList["subjects-maintenance"][fli2]["list"].length; fli3++) {
						if (update_form_subjects[fli1] == uploadList["subjects-maintenance"][fli2]["list"][fli3]["name"]) {
							file_page_categories.push("[[Category:" + uploadList["subjects-maintenance"][fli2]["list"][fli3]["category"] + "]]")
						} else {
							//pass
						};
					};
				} else {
					if (update_form_subjects[fli1] == uploadList["subjects-maintenance"][fli2]["name"]) {
						file_page_categories.push("[[Category:" + uploadList["subjects-maintenance"][fli2]["category"] + "]]")
					} else {
						//pass
					}
				};
			};
		};
		
		//Fetches the image description and adds it to the image summary
		var update_form_description = $('#textarea-description').val();
		file_page_contents += "\n|description= " + update_form_description;
		
		//Fetches the image source and adds it to the image summary
		var update_form_sources = $('#textarea-sources').val();
		file_page_contents += "\n|source= " + update_form_sources;

		//Fetches the image source and adds it to the image summary
		var update_form_holders = $('#textarea-holders').val();
		file_page_contents += "\n|holder= " + update_form_holders;
		
		//Fetches the image license and adds it to the image summary
		var update_form_licenses = uploadCookies["licenses"];
		var file_page_licenses = [];
		
		for (fli1 = 0; fli1 < update_form_licenses.length; fli1++) { 
			file_page_licenses.push("{{" + update_form_licenses[fli1] + "}}")
		};
		
		file_page_contents += "\n|license= " + file_page_licenses.join("\n");
		
		//Caps end of template and adds categories, then refreshes page preview with new data
		file_page_contents += "\n}}\n\n" + file_page_categories.join("\n");
		$('#wpUploadDescription').val(file_page_contents);
	};


	//Toggles display of file summary box as a page preview
	function toggleFilePage() {
		if ($('#wpUploadDescription').css('display') == "none") {
			$('#wpUploadDescription').show();
		} else {
			$('#wpUploadDescription').hide();
		}
	}


	//Updates button colour and makes selection when option is clicked
	function selectImageOption(buttonValue, cookiesList, buttonType) {
		var button_value = buttonValue;
		var cookies_list = cookiesList;
		var button_type = buttonType;
		
		if (button_type == "upload-option") {
		
			//Checks if option has already been selected
			if (jQuery.inArray(button_value, uploadCookies[cookies_list]) > -1) {
				//If the option has been selected and saved in cookies json, decolourise and remove from json
				if (button_value == "Other") {
					//If the option is "other", updates all "other" options simultaneously
					$(".other-" + cookiesList).removeClass("upload-colourise");
					uploadCookies[cookies_list].splice(jQuery.inArray(button_value, uploadCookies[cookies_list]), 1);
				} else {
					//If the option is not "other", updates this option alone
					$("#upload-button-id-" + buttonValue.replace(/\s/, "-")).removeClass("upload-colourise");
					uploadCookies[cookies_list].splice(jQuery.inArray(button_value, uploadCookies[cookies_list]), 1);
					//Updates parent option colour for navigational purposes
					if (parent_option != "") {
						$("#upload-button-id-" + parent_option).removeClass("upload-colourise");
					}
				}
			} else {
				//If the option has not been selected or saved in cookies json, colourise and add to json
				if (button_value == "Other") {
					//If the option is "other", updates all "other" options simultaneously
					$(".other-" + cookiesList).addClass("upload-colourise");
					uploadCookies[cookies_list].push(button_value);
				} else {
					//If the option is not "other", updates this option alone
					$("#upload-button-id-" + buttonValue.replace(/\s/, "-")).addClass("upload-colourise");
					uploadCookies[cookies_list].push(button_value);
					//Updates parent option colour for navigational purposes
					if (parent_option != "") {
						$("#upload-button-id-" + parent_option).addClass("upload-colourise");
					}
				}
			}
			
		} else {
		
			//Treats item highlight and text area information different if option button is "other"
			if (button_value == "Other") {
				$(".other-" + cookiesList).addClass("upload-colourise");
				$("#upload-button-id-" + uploadCookies[cookies_list]).removeClass("upload-colourise");
				uploadCookies[cookies_list] = buttonValue;
				$(".upload-" + cookies_list + "-description").hide()
				$("#upload-" + cookies_list + "-description-" + button_value + ", #upload-sources-textarea").show()
			} else {
				$("#upload-button-id-" + buttonValue.replace(/\s/, "-")).addClass("upload-colourise");
				$("#upload-button-id-" + uploadCookies[cookies_list]).removeClass("upload-colourise");
				$(".other-" + cookiesList).removeClass("upload-colourise");
				uploadCookies[cookies_list] = buttonValue;
				$(".upload-" + cookies_list + "-description").hide()
				$("#upload-" + cookies_list + "-description-" + button_value + ", #upload-sources-textarea").show()
				
			}
		}
		
		//Updates page preview to reflect new option values
		updateForm()
	}

	//Creates warning messages and information when one or more fields have not been filled correctly
	function uploadWarning() {
		//Keeps track of the number of warnings
		var warning_number = 0;
		
		//Checks the correct number of image type images have been selected
		if (uploadCookies["types"].length == 0) {
			$('#upload-types-warning').text("Please select the type of image you are uploading.");
			warning_number += 1;
			$('#upload-types-warning').show();
		} else if (uploadCookies["types"].length > 1) {
			$('#upload-types-warning').text("No more than one image type should be selected before uploading.")
			warning_number += 1;
			$('#upload-types-warning').show();
		} else {
			$('#upload-types-warning').text("");
			$('#upload-types-warning').hide();
		}
		
		//Checks at least on image subject has been selected 
		if (uploadCookies["subjects-content"].length < 1 && uploadCookies["subjects-maintenance"].length < 1) {
			$('#upload-subjects-warning').text("Please select at least one image subject you are uploading.");
			warning_number += 1;
			$('#upload-subjects-warning').show();
		} else {
			$('#upload-subjects-warning').text("");
			$('#upload-subjects-warning').hide();
		}
		
		//Checks if the a description has been added for the image
		if ($('#textarea-description').val() === '') {
			$('#upload-description-warning').text("Please give a short description of the image.");
			warning_number += 1;
			$('#upload-description-warning').show();
		} else {
			$('#upload-description-warning').text("");
			$('#upload-description-warning').hide();
		}
		
		//Checks if the a source has been added for the image
		if ($('#textarea-sources').val() === '') {
			$('#upload-sources-warning').text("Please enter the source of the image.");
			warning_number += 1;
			$('#upload-sources-warning').show();
		} else {
			$('#upload-sources-warning').text("");
			$('#upload-sources-warning').hide();
		}
		
		//Checks if the a copyright holder has been added for the image
		if ($('#textarea-holders').val() === '') {
			$('#upload-holders-warning').text("Please enter the appropriate copyright holder of the image.");
			warning_number += 1;
			$('#upload-holders-warning').show();
		} else {
			$('#upload-holders-warning').text("");
			$('#upload-holders-warning').hide();
		}
		
		//Checks the correct number of image licenses have been selected
		if (uploadCookies["licenses"].length == 0) {
			$('#upload-licenses-warning').text("Please select the license image you are uploading is held under or used.");
			warning_number += 1;
			$('#upload-licenses-warning').show();
		} else if (uploadCookies["licenses"].length > 1) {
			$('#upload-licenses-warning').text("No more than one image license should be selected before uploading.")
			warning_number += 1;
			$('#upload-licenses-warning').show();
		} else {
			$('#upload-licenses-warning').text("");
			$('#upload-licenses-warning').hide();
		}
		
		return warning_number;
	}


	//Builds upload form and inserts on page
	//Rearranges the DOM ready for form addition
	//Removes license drop down in favour of more appropriate selection
	$('.mw-htmlform-field-Licenses,.mw-label:contains("Summary")').remove();
	$('#mw-htmlform-description').append($('.mw-htmlform-field-HTMLTextAreaField'));
	$('#wpUploadDescription').attr("cols", 100).attr("rows", 15);
	$('#wpUploadDescription').parent().attr('colspan', '2');
	$('#wpUploadDescription').hide();
	$('.mw-htmlform-field-HTMLTextAreaField').children().prepend('<div style="text-align:center;"><a class="wikia-button" title="Preview page file mark up code." href="javascript:toggleFilePage()">Page Preview</a></div><br>');
	$('#mw-htmlform-description').css('width', '100%');
	$('.mw-htmlform-field-HTMLTextField').before('<tr colspan="2"><td colspan="2" id="upload-form-section-1"><div style="border-bottom:2px solid #000; margin-bottom:10px; margin-top:10px; font-size:20px;">Image Name</div></td></tr>');
	$('.mw-htmlform-field-HTMLTextField').after('<tr colspan="2"><td colspan="2" id="upload-form-section-2"></td></tr>');
	$('#upload-form-section-2').append(uploadFormHTML);
	//Hides and selects appropriate sections and buttons on page load
	$("#upload-subjects-maintenance, #upload-subject-content-more, #upload-subject-maintenance-more, .upload-warning-box").hide();
	$("#upload-option-content").addClass("upload-colourise");
	//Builds all the form sections on page load
	createFormTypes(uploadList["types"], "types");
	createFormTypes(uploadList["subjects-content"], "subjects-content");
	createFormTypes(uploadList["subjects-maintenance"], "subjects-maintenance");
	createFormTypes(uploadList["sources"], "sources");
	createFormTypes(uploadList["licenses"], "licenses");
	//Creates text boxes
	$("#upload-description").html('<tr><td class="mw-label" style="text-align:left;">Image description: </td><td><textarea class="formTextBox" style="resize:none;" rows="2" cols="60" id="textarea-description" title="Enter a short description of the image."></textarea></td></tr>')
	$("#upload-holders-textarea").html('<td class="mw-label" style="text-align:left;">Copyright holder: </td><td><textarea class="formTextBox" style="resize:none;" rows="2" cols="60" id="textarea-holders" title="Enter the official copyright holder or owner of the image, or the original image (if this image is edited)."></textarea></td>')
	$("#upload-sources-textarea").html('<td class="mw-label" style="text-align:left;">Image Source: </td><td><textarea class="formTextBox" style="resize:none;" rows="2" cols="60" id="textarea-sources" title="Enter the source of the image following the instructions below."></textarea></td>')


	//Updates image subjects table and switches view if option has more sub-options 
	//Saves parent option for colour update
	var parent_option = "";
	//Creates and updates more options table using json, hides subjects options table and shows more options table
	$(".upload-more-content").click(function() {
		parent_option = jQuery(this).data('name');
		$('#upload-subject-content-title').text(jQuery(this).data('name') + " images");
		createFormTypes(uploadList["subjects-content"][jQuery(this).data('iteration')]["list"], "subjects-content-list");
		$("#upload-subjects-content").hide();
		$("#upload-subject-content-more").show();
	});
	$(".upload-more-maintenance").click(function() {
		parent_option = jQuery(this).data('name');
		$('#upload-subject-maintenance-title').text(jQuery(this).data('name') + " images");
		createFormTypes(uploadList["subjects-content"][jQuery(this).data('iteration')]["list"], "subjects-maintenance-list");
		$("#upload-subjects-maintenance").hide();
		$("#upload-subject-maintenance-more").show();
	});
	//Hides subjects options table and shows more options table, clears more options table for next time
	$("#upload-subject-content-back").click(function() {
		parent_option = "";
		$("#upload-subjects-content").show();
		$("#upload-subject-content-more").hide();
		$('#upload-subjects-content-list, #upload-subjects-maintenance-list').html('');
	});
	$("#upload-subject-maintenance-back").click(function() {
		parent_option = "";
		$("#upload-subjects-maintenance").show();
		$("#upload-subject-maintenance-more").hide();
		$('#upload-subjects-content-list, #upload-subjects-maintenance-list').html('');
	});
	//Toggles between image subject types - content images and maintenance images
	$("#upload-option-content").click(function() {
		$("#upload-option-content").addClass("upload-colourise");
		$("#upload-option-maintenance").removeClass("upload-colourise");
		$("#upload-subjects-content").show();
		$("#upload-subject-content-more, #upload-subjects-maintenance, #upload-subject-maintenance-more").hide();
		$('#upload-subjects-content-list, #upload-subjects-maintenance-list').html('');
	});
	$("#upload-option-maintenance").click(function() {
		$("#upload-option-content").removeClass("upload-colourise");
		$("#upload-option-maintenance").addClass("upload-colourise");
		$("#upload-subjects-content, #upload-subject-content-more, #upload-subject-maintenance-more").hide();
		$("#upload-subjects-maintenance").show();
		$('#upload-subjects-content-list, #upload-subjects-maintenance-list').html('');
	});


	//Updates page preview to reflect new content values when a text box is filled
	$('.formTextBox').bind('input propertychange', function() {
		updateForm()
	});


	//Adds auto link complete to textboxes
	$.getScript(
		'/load.php?debug=false&lang=en&mode=articles&skin=oasis&missingCallback=importArticleMissing&articles=u%3Acamtest%3AMediaWiki%3ATextareaHelper.js%7Cu%3Adev%3AColors%2Fcode.js%7Cu%3Adev%3AMiniComplete%2Fcode.js&only=scripts', function () {
		dev.minicomplete.load(
			$('#mw-htmlform-description').find('.formTextBox')
		);
	});

	//Forces upload warnings if any fields are empty or not filled out correctly
	//And delays submission of upload form
	$('#wpUploadDescription').closest('form').submit(function( event ) {
		if (uploadWarning() != 0) {
			event.preventDefault();
			window.alert('One or more errors have been found on upload.\nPlease check the form for warning messages and correct the error(s).');
		}
	});
}

//Redirects new file upload button to special upload page
//Rather than removing functionality, this adds functionality and allows
//Better adherence to copyright/copyleft rules by forcing attribution ()Win win!)
if (mw.config.get('wgCanonicalSpecialPageName') === 'Images') {
	//Force page change to Special:Upload on upload click
	$('.wikia-button.upphotos').click(function() {
		window.location.href = '/wiki/Special:Upload'
	});
}

//Pre-enters image summary template to multiple upload description box
//Saves time on writing
if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload') {
	multipleLayout =
		'{{Image summary\n'
		+ '|type= \n'
		+ '|description= \n'
		+ '|source= \n'
		+ '|holder= \n'
		+ '|license= \n'
		+ '|variants= \n'
		+ '}}\n'
	
	$('#wpUploadDescription').val(multipleLayout)
	$('.mw-htmlform-field-Licenses').remove()
}

//Modifies titles to tooltip boxes to explain what each button does
$('.upload-button-type, .upload-more-content, .formTextBox').tooltip()