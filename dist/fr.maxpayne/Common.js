/* Tout JavaScript ici sera chargé avec chaque page accédée par n'importe quel utilisateur. */
/**
 * 17:15, July 2, 2017 (UTC)
 * <source lang = "JavaScript">
 * Origin: https://naruto.fandom.com/wiki/MediaWiki:Common.js/FairUseUpload.js
 * ScriptPage: https://maxpayne.fandom.com/fr/wiki/MediaWiki:Common.js
 * Builds a form for easy uploading of images
 * and to ensure proper rationale and licensing
 * @author: UltimateSupreme (https://naruto.fandom.com/wiki/User:UltimateSupreme)
 * @author: Celdrøn (https://naruto.fandom.com/fr/wiki/User:Celdrøn)
 * @author: Thegamer1604 (https://maxpayne.fandom.com/fr/wiki/user:Thegamer1604 [Adaptation de la version de Celdrøn])
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
				this.getContent(909).then(this.init.bind(this));//mw.config.get('wgArticleId')
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
							$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="https://maxpayne.fandom.com/fr/index.php?title=Spécial:Téléverser&basic=true" onclick="javascript:setCookie(\'uploadform\', \'basic\', 30)">Basculer vers le formulaire basique</a></div>'); // Stretch table to full width
								var $description = $('#wpUploadDescription'),
									$customRows,
									customRows = '';
					
								if ($description.val()) {
									return; // error message confirm page
								}

								customRows += this.fromTemplate('Origine', 'origineBox', true, '[REQUIS] IG/URL source.');
								customRows += this.fromListboxTemplate('Jeu', 'jeuBox');
								customRows += this.fromListboxTemplate('Quoi', 'quoiBox');
								customRows += this.fromListboxTemplate('Type', 'typeBox');

								// To real DOM
								$customRows = $(customRows);
								$description.closest('tr').hide().after($customRows);
								$customRows.find("textarea").tooltip({trigger: 'focus'});
					
								// Bind submit to verify function
								$description.closest('form').submit(this.verifySummary);
					
								// Autocomplete links
								$.getScript(mw.util.wikiScript('load') + 
									'?debug=false&lang=en&mode=articles&skin=fandomdesktop&missingCallback=importArticleMissing&articles=u%3Acamtest%3AMediaWiki%3ATextareaHelper.js%7Cu%3Adev%3AMediaWiki%3AColors%2Fcode.js%7Cu%3Adev%3AMediaWiki%3AMiniComplete%2Fcode.js&only=scripts', function () {
									dev.minicomplete.load(
										$customRows.find('#origineBox'),$customRows.find('#jeuBox'),$customRows.find('#quoiBox')
									);
								});
						} else { // Old style form just needs Information template in the summary box
							$('#wpUploadDescription').val('{{Fichier\n| origine = \n| jeu = \n| quoi = \n| type = \n}}\n'); // Add link to guided form
							$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="https://maxpayne.fandom.com/fr/index.php?title=Spécial:Téléverser" onclick="javascript:setCookie(\'uploadform\', \'guided\', 30)">Basculer vers le formulaire avancé</a></div>');
						}
					}
				}
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