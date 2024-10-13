/**
 * 17:15, July 2, 2017 (UTC)
 * <source lang = "JavaScript">
 * Origin: https://naruto.fandom.com/wiki/MediaWiki:Common.js/FairUseUpload.js
 * ScriptPage: https://reddead.fandom.com/fr/wiki/MediaWiki:Common.js
 * Builds a form for easy uploading of images
 * and to ensure proper rationale and licensing
 * @author: UltimateSupreme (https://naruto.fandom.com/wiki/User:UltimateSupreme)
 * @author: Celdrøn (https://naruto.fandom.com/fr/wiki/User:Celdrøn)
 * @author: Thegamer1604 (https://reddead.fandom.com/fr/wiki/user:Thegamer1604 [Adaptation de la version de Celdrøn])
 * @License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
**/
 

/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
**/
window.getCookie = function(c_name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start !== -1) {
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end === -1) {
				c_end = document.cookie.length;
			}
			return decodeURIComponent(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
};
/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
**/
window.setCookie = function(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + encodeURIComponent(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
};

(function () {
	'use strict';
	jQuery(function ($) {
		var FairUseUpload = {
			preload: function() {
				this.api = new mw.Api();
				this.getContent(16435).then(this.init.bind(this));//mw.config.get('wgArticleId')
			},
			init: function(content) {
				this.api = new mw.Api();
				this.config = JSON.parse(content);
				this.loadForm();
			},
			getContent: function(pageid) {
				return this.api.get({
					action: 'query',
					prop: 'revisions',
					rvprop: 'content',
					rvslots: 'main',
					pageids: pageid
				}).then(function(data) {
					return data.query.pages[pageid].revisions[0].slots.main['*'];
				});
			},
			loadForm: function() {
				if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload') {
					var $desc = $('#wpUploadDescription');
					if ($desc.val()) return; // If not empty then don't do anything (i.e. error message confirm page)
					$desc.val('{{Fichier\n' +
							'| origine = \n' +
							'| jeu = \n' +
							'| année = \n' +
							'| cible2 = \n' +
							'| cible3 = \n' +
							'| cible4 = \n' +
							'| quoi = \n' +
							'| type = \n' + 
							'}}\n'
					);
				}

				/**
				 * Start upload form customisations
				 */
				if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
					// Check if cookie has been set for form style. Overrides URL parameter if set.
					var formstyle = getCookie("uploadform");
					$("#uploadBasicLinkJS").show();
					$("#uploadTemplateNoJS").hide();
					if (!mw.util.getParamValue('wpForReUpload')) {
						if (formstyle == "guided" || (formstyle == "" && window.location.search.indexOf('basic=true') == -1)) { // Add link to basic form
							$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="https://reddead.fandom.com/fr/index.php?title=Spécial:Téléverser&basic=true" onclick="javascript:setCookie(\'uploadform\', \'basic\', 30)">Basculer vers le formulaire basique</a></div>'); // Stretch table to full width
								var $description = $('#wpUploadDescription'),
									$customRows,
									customRows = '';
					
								if ($description.val()) {
									return; // error message confirm page
								}

								customRows += this.fromTemplate('Origine', 'origineBox', true, '[REQUIS] IG/URL source.');
								customRows += this.fromListboxTemplate('Jeu', 'jeuBox');
								customRows += this.fromListboxTemplate('Année', 'anneeBox');
								customRows += this.fromListboxTemplate('Quoi', 'quoiBox');
								customRows += this.fromListboxTemplate('Type', 'typeBox');

								// To real DOM
								$customRows = $(customRows);
								$description.closest('tr').hide().after($customRows);

								// Bind submit to verify function
								$description.closest('form').submit(this.verifySummary);
					
								// Bind change event to origineBox to update quoiBox options
								$('#origineBox').on('change', this.updateOrigineOptions.bind(this));

								// Initialize Quoi options based on selected Œuvres
								this.updateUniversOptions();
					
								// Bind change event to jeuBox to update anneeBox options
								$('#jeuBox').on('change', this.updateTypeOptions.bind(this));

								// Initialize Année and Type options based on selected Jeu
								this.updateTypeOptions();
					
								// Bind change event to anneeBox to update jeuBox options
								$('#anneeBox').on('change', this.updateJeuOptions.bind(this));

								// Initialize Jeu and Type options based on selected Annee
								this.updateJeuOptions();

								// Autocomplete links
								$.getScript(mw.util.wikiScript('load') + 
									'?debug=false&lang=en&mode=articles&skin=fandomdesktop&missingCallback=importArticleMissing&articles=u%3Acamtest%3AMediaWiki%3ATextareaHelper.js%7Cu%3Adev%3AMediaWiki%3AColors%2Fcode.js%7Cu%3Adev%3AMediaWiki%3AMiniComplete%2Fcode.js&only=scripts', function () {
									dev.minicomplete.load(
										$customRows.find('#origineBox'),$customRows.find('#jeuBox'),$customRows.find('#quoiBox')
									);
								});
						} else { // Old style form just needs Information template in the summary box
							$('#wpUploadDescription').val('{{Fichier\n' +
							'| origine = \n' +
							'| jeu = \n' +
							'| année = \n' +
							'| cible2 = \n' +
							'| cible3 = \n' +
							'| cible4 = \n' +
							'| quoi = \n' +
							'| type = \n' +
							'}}\n'); // Add link to guided form
							$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="https://reddead.fandom.com/fr/index.php?title=Spécial:Téléverser" onclick="javascript:setCookie(\'uploadform\', \'guided\', 30)">Basculer vers le formulaire avancé</a></div>');
						}
					}
				}
			},
			updateOrigineOptions: function() {
				var selectedOrigine = $('#origineBox').val();
				var $typeBox = $('#typeBox');
				
				var typeoptions = '';
				
				if (selectedOrigine === 'Jeu'){
					typeoptions += '<option value="Image tirée du jeu">Image tirée du jeu</option>';
				} else {
					typeoptions += '<option value="">-</option>';
					typeoptions += '<option value="Image officielle">Image officielle</option>';
					typeoptions += '<option value="Image tirée du jeu">Image tirée du jeu</option>';
					typeoptions += '<option value="Fichier du jeu">Fichier du jeu</option>';
					typeoptions += '<option value="Image du wiki>Image du wiki</option>';
					typeoptions += '<option value="Image du monde réel">Image du monde réel</option>';
					typeoptions += '<option value="Concept art">Concept art</option>';
				}
				
				$typeBox.html(typeoptions);
			},
			updateTypeOptions: function() {
				var selectedJeu = $('#jeuBox').val();
				var $anneeBox = $('#anneeBox');
				var $typeBox = $('#typeBox');

				var anneeoptions = '';

				if (selectedJeu === 'Red Dead Revolver') {
					anneeoptions += '<option value="">-</option>';
					anneeoptions += '<option value="1880\'s">1880\'s</option>';
				} else if (selectedJeu === 'Red Dead Redemption') {
					anneeoptions += '<option value="">-</option>';
					anneeoptions += '<option value="1911">1911</option>';
					anneeoptions += '<option value="1914">1914</option>';
				} else if (selectedJeu === 'Undead Nightmare' || selectedJeu === 'Red Dead Redemption: Multijoueur') {
					anneeoptions += '<option value="">-</option>';
					anneeoptions += '<option value="1911">1911</option>';
				} else if (selectedJeu === 'Red Dead Redemption II') {
					anneeoptions += '<option value="">-</option>';
					anneeoptions += '<option value="1899">1899</option>';
					anneeoptions += '<option value="1907">1907</option>';
				} else if (selectedJeu === 'Red Dead Online') {
					anneeoptions += '<option value="">-</option>';
					anneeoptions += '<option value="1898">1898</option>';
				} else {
					anneeoptions += '<option value="">-</option>';
					anneeoptions += '<option value="1880\'s">1880\'s</option>';
					anneeoptions += '<option value="1898">1898</option>';
					anneeoptions += '<option value="1899">1899</option>';
					anneeoptions += '<option value="1907">1907</option>';
					anneeoptions += '<option value="1911">1911</option>';
					anneeoptions += '<option value="1914">1914</option>';
				}

				$anneeBox.html(anneeoptions);

				// Update type options based on selected jeu
				var defaultTypeOptions = this.config['Type'];
				var typeoptions = '';
			
				for (var i = 0; i < defaultTypeOptions.length; i++) {
					var optionValue = defaultTypeOptions[i].value;
					var optionLabel = defaultTypeOptions[i].label || optionValue;
			
					var hidden = false;
			
					// Define the options to hide based on selected game
					if (selectedJeu === 'Red Dead Revolver') {
						hidden = ['Red Dead Redemption', 'Undead Nightmare', 'Red Dead Redemption II', 'Red Dead Online'].includes(optionValue);
					} else if (selectedJeu === 'Red Dead Redemption' || selectedJeu === 'Red Dead Redemption: Multijoueur') {
						hidden = ['Red Dead Revolver', 'Undead Nightmare', 'Red Dead Redemption II', 'Red Dead Online'].includes(optionValue);
					} else if (selectedJeu === 'Undead Nightmare') {
						hidden = ['Red Dead Revolver', 'Red Dead Redemption', 'Red Dead Redemption II', 'Red Dead Online'].includes(optionValue);
					} else if (selectedJeu === 'Red Dead Redemption II') {
						hidden = ['Red Dead Revolver', 'Red Dead Redemption', 'Undead Nightmare', 'Red Dead Online'].includes(optionValue);
					} else if (selectedJeu === 'Red Dead Online') {
						hidden = ['Red Dead Revolver', 'Red Dead Redemption', 'Undead Nightmare', 'Red Dead Redemption II'].includes(optionValue);
					} else {
						hidden = [].includes(optionValue);
					}
			
					// If the option is not hidden, add it normally
					if (!hidden) {
						typeoptions += '<option value="' + optionValue + '">' + optionLabel + '</option>';
					} else {
						typeoptions += '<option value="' + optionValue + '" disabled style="display: none;">' + optionLabel + '</option>';
					}
				}
			
				$typeBox.html(typeoptions);
			},
			
			updateJeuOptions: function() {
				var selectedAnnee = $('#anneeBox').val();
				var $jeuBox = $('#jeuBox');

				var jeuoptions = '';

				if (selectedAnnee === '1880\'s') {
					jeuoptions += '<option value="Red Dead Revolver">Red Dead Revolver</option>';
				} else if (selectedAnnee === '1898') {
					jeuoptions += '<option value="Red Dead Online">Red Dead Online</option>';
				} else if (selectedAnnee === '1899' || selectedAnnee === '1907') {
					jeuoptions += '<option value="Red Dead Redemption II">Red Dead Redemption II</option>';
				} else if (selectedAnnee === '1911') {
					jeuoptions += '<option value="">-</option>';
					jeuoptions += '<option value="Red Dead Redemption">Red Dead Redemption</option>';
					jeuoptions += '<option value="Undead Nightmare">Undead Nightmare</option>';
					jeuoptions += '<option value="Red Dead Redemption">Red Dead Redemption: Multijoueur</option>';
				} else if (selectedAnnee === '1914') {
					jeuoptions += '<option value="Red Dead Redemption">Red Dead Redemption</option>';
				} else {
					jeuoptions += '<option value="">-</option>';
					jeuoptions += '<option value="Red Dead Revolver">Red Dead Revolver</option>';
					jeuoptions += '<option value="Red Dead Redemption">Red Dead Redemption</option>';
					jeuoptions += '<option value="Undead Nightmare">Undead Nightmare</option>';
					jeuoptions += '<option value="Red Dead Redemption">Red Dead Redemption: Multijoueur</option>';
					jeuoptions += '<option value="Red Dead Redemption II">Red Dead Redemption II</option>';
					jeuoptions += '<option value="Red Dead Online">Red Dead Online</option>';
				}

				$jeuBox.html(jeuoptions);
			},
			verifySummary: function () {
				var $description = $('#wpUploadDescription');

				if (!$('#wpLicense').val()) {
					$.showModal('Licence Incomplète', 'Choisir la bonne licence depuis la liste.');
					return false;
				}
	
				if (!$.trim($('#origineBox').val())) {
					$.showModal('Origine Incomplète', 'Merci de renseigner l\'origine correcte pour votre image.');
					return false;
				} else if (/google/i.test($('#sourceBox').val())) {
					$.showModal('Source Incorrecte', 'Google n\'est pas une source valide pour les images. Merci de saisir l\'origine concrète du fichier.');
					$('#origineBox').val('');
					return false;
				}
	
				var template = '';
	
				var strBuilder = template;
				strBuilder += '{{Fichier\n';
				strBuilder += '| origine = ' + $.trim($('#origineBox').val()) + '\n';
				strBuilder += '| jeu = ' + $.trim($('#jeuBox').val()) + '\n';
				strBuilder += '| année = ' + $.trim($('#anneeBox').val()) + '\n';
				strBuilder += '| cible2 = ' + '\n';
				strBuilder += '| cible3 = ' + '\n';
				strBuilder += '| cible4 = ' + '\n';
				strBuilder += '| quoi = ' + $.trim($('#quoiBox').val()) + '\n';
				strBuilder += '| type = ' + $.trim($('#typeBox').val()) + '\n';
				strBuilder += '}}\n';
				$description.val(strBuilder);
				return true;
			},
			fromTemplate: function(name, id, required, title, elem) {
				elem = elem || '<textarea style="resize: none; overflow: auto;" rows="1" cols="60" id="' + id + (required ? '" required="required' : '') + (title ? '" title="' + title : '') + '"></textarea>';
				return '<tr>\n'
					+ '<td class="mw-label"><label style= "cursor: help;" for="' + id + (title ? '" title="' + title : '') + '">' + name + '&nbsp;:</label></td>\n'
					+ '<td class="mw-input">' + elem + '</td>\n'
					+ '</tr>\n';
			},
			fromListboxTemplate: function(name, id, elem) {
				var options = this.config[name],
					selOptions = "";
				
				for (var i = 0; i < options.length; i++) {
					selOptions += '<option value="' + options[i].value + '">' + (options[i].label || options[i].value) + '</option>';
				}
				
				elem = elem || '<select style="width: 455px; height: 22px;" id="' + id + '">' + selOptions + '</select>';
				return '<tr <style="height: 31.7px;">\n'
				+ '<td class="mw-label"><label>' + name + '&nbsp;:</label></td>\n'
				+ '<td class="mw-input">' + elem + '</td>\n'
				+ '</tr>\n';
			}
		};
		
		mw.loader.using([
			'mediawiki.api',
			'mediawiki.util'
		]).then(FairUseUpload.preload.bind(FairUseUpload));
	});
})();