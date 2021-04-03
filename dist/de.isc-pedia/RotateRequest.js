// <nowiki>
// Invoke automated jsHint-validation on save: A feature on WikimediaCommons
// Interested? See [[:commons:MediaWiki:JSValidator.js]], [[:commons:Help:JSValidator.js]].
/*global jQuery:false, $:false, mw:false */
 
// Disable purging of thumbnails before displaying to speed-up the process
// Please re-enable in case of modifications to the MW-thumbnail engine
// that require fresh thumbs. Simply remove the following line.
window.rotateDontPurge = true;
 
 
/**************************************
   Request rotation of an image
   composed in 2011 by Rillke
 
   The following code is jsHint-valid.
**************************************/
(function($) {
'use strict';
if (window.rRot || mw.config.get('wgNamespaceNumber') !== 6) {
	return;
}
 
window.rRot = {
	dialog: function() {
		var dlgButtons = {};
		var _this = this;
 
		var fileExt = mw.config.get('wgPageName').slice(mw.config.get('wgPageName').lastIndexOf('.')+1).toLowerCase();
		var angleBotCompat = true;
		var lastAngle = 0;
		var lastOptionId = this.config.dlg.customOption;
		var cookie = $.cookie( 'rRotate' );
		this.usedBotOption = false;
		this.sending = false;
 
		cookie = cookie ? (cookie) : (this.config.dlg.customNumber);
		if ('string' === typeof cookie) {
			cookie = cookie.split('|');
			lastAngle = cookie[0] - 0;
			if (cookie[1] && ('B' === cookie[1])) {
				if (-1 !== $.inArray(lastAngle, this.config.botAcceptedAngels)) {
					this.usedBotOption = true;
					lastOptionId = $.inArray(lastAngle, this.config.botAcceptedAngels);
				}
			} else {
				lastOptionId = this.config.dlg.customOption;
			}
		} else {
			lastAngle = cookie - 0;
		}
 
		this.angle = 0;
		this.fileExtBotCompat = (-1 !== $.inArray(fileExt, this.config.botAcceptedFormats));
 
		var setAngle = function(newAngle) {
			if (!/\d+/.test(newAngle)) { 
				return false;
			}
			newAngle = newAngle - 0;
			if (newAngle < 0) { 
				newAngle = 360 + newAngle;
			}
			if (0 > newAngle || newAngle > 360) {
				return false;
			}
 
			_this.angle = newAngle;
			if (_this.purgeCompleted) {
				$('#uniqueImg').rotate({animateTo: newAngle});
			}
 
			var oldAngleBotCompat = angleBotCompat;
			angleBotCompat = (-1 !== $.inArray(newAngle, _this.config.botAcceptedAngels));
			if ((oldAngleBotCompat !== angleBotCompat)) {
				$(document).triggerHandler('rotaterequest', ['newAngleBotCompat', angleBotCompat]);
			}
			return true;
		};
 
		var botOptions = function() {
			var r = '', i = 0, a = 0, l = _this.config.botAcceptedAngels.length;
			for (i=0; i < l; i++) {
				a = _this.config.botAcceptedAngels[i];
				r += '<label for="rRot' + i + '" style="' + _this.config.dlg.labelStyle + '">' + 
					'<input name="angle" type="radio" id="rRot' + i + '" value="' + a + '" /> ' + a + '° </label><br/>';
			}
			return r;
		};
 
		var supportsCSS = $('img:first').rotate({ getSupportCSS: true });
 
		var purgeComplete = function(result) {
			// Add the image to the container
			var imgSrc = '';
			if (result) {
				try {
					_this.$imgNode = $('table.filehistory', $(result)).find('img').eq(0).clone().css('overflow', 'visible').attr('id', 'uniqueImg');
				} catch (e) {}
			}
			if (!_this.$imgNode || 0 === _this.$imgNode.length) {
				_this.$imgNode = $('table.filehistory').find('img').eq(0).clone().css('overflow', 'visible').attr('id', 'uniqueImg');
			}
			if (0 === _this.$imgNode.length) {
				_this.$imgNode = $('<img>', { 
					alt: 'no thumb available',
					title: 'This is NOT the actual image. There is no thumb available.',
					height: '120',
					width: '120',
					id: 'uniqueImg'
				}).css('overflow', 'visible');
				imgSrc = '//bits.wikimedia.org/skins-1.18/common/images/icons/fileicon.png';
			} else {
				imgSrc = _this.$imgNode.attr('src');
			}
			var w = _this.$imgNode.attr('width'),
				h = _this.$imgNode.attr('height');
			_this.$imgNode
			.css('top', Math.max(w/2 - h/2, 0)).css('position', 'relative')
			.load(function () {
				$('#loadContainer').fadeOut();
				$('#imgContainer').fadeIn();
				$('#uniqueImg').rotate({ angle:0 });
				$('#uniqueImg').rotate({animateTo: _this.angle});
			}).error(function () {
				$('#loadContainer').fadeOut();
				$('#imgContainer').fadeIn();
				$('#uniqueImg').rotate({ angle:0 });
				$('#uniqueImg').rotate({animateTo: _this.angle});
				_this.fail("The server was unable to create a thumbnail. You may close and re-open the dialog.");
			});
 
			if (!supportsCSS) {
				_this.$imgNode.attr('src', '//upload.wikimedia.org/wikipedia/commons/9/92/Bert2_transp_5B5B5B_cont_150ms.gif');
				$('#loadContainer').fadeOut();
				$('#imgContainer').fadeIn();
			}
 
			if (supportsCSS && !window.rotateDontPurge) {
				imgSrc = (imgSrc + '?dummy=' + Math.floor(Math.random()*10000000));
			}
			if (!window.rotateDontPurge) {
				window.rotateDontPurge = true;
				// Only added for old cached thumbs. Possible not a stable way to achieve this. Please remove it ASAP.
				var imgPathParts = imgSrc.split('\/');
				var imgLastPart = imgPathParts[imgPathParts.length-1].match(/(\D*|(?:\D*\d{1,3}\-)*)(\d+)(px.+)/);
				if (imgLastPart) {
					imgPathParts[imgPathParts.length-1] = imgLastPart[1] + (parseInt(imgLastPart[2], 10)+1) + imgLastPart[3];
					imgSrc = imgPathParts.join('\/');
				}
				// ---
			}
			_this.$imgNode.attr('src', imgSrc);
			_this.$dlgNode.find('#imgContainer').prepend(_this.$imgNode);
 
			_this.purgeCompleted = true;
			$('#uniqueImg').rotate({animateTo: _this.angle});
		};
 
		this.$dlgNode = $('<div>', {}).html(
			'<div id="loadContainer" style="position:absolute; right:15px; top:90px; width:128px; height:120px; overflow:visible; height:160px;' +
				'background: url(\'//upload.wikimedia.org/wikipedia/commons/9/92/Bert2_transp_5B5B5B_cont_150ms.gif\') no-repeat scroll center;">&nbsp;</div>' +
			'<div id="imgOuterContainer" style="position:absolute; right:30px; top:90px; max-width:120px; overflow:visible; height:160px;">' + 
				'<div id="imgContainer" style="display:none;"></div>' +
				'<div id="imgCaption" style="bottom: 0pt; position: absolute; width: 250px; right: -10px; font-size: 0.8em; text-align: right;">' + 
					mw.html.escape(this.i18n.imgCaption) + '</div></div>' +
			'<div id="readyContainer" style="position:absolute; right:160px; top:70px; width:120; height:120; display:none;">' + 
				'<img src="//upload.wikimedia.org/wikipedia/commons/3/32/Picframe_ok.png" height="120" width="120"/></div>' +
			'<div id="errorContainer" style="position:absolute; right:160px; top:70px; width:120; height:120; display:none; background:#F99 url(\'//upload.wikimedia.org/wikipedia/commons/c/ca/Crystal_error.png\') no-repeat scroll center; overflow:auto;"></div>' +
			'<div id="rRotOptions" style="float:left; max-width:270px;">' + '<p>' + mw.html.escape(this.i18n.intro) + '</p>' + mw.html.escape(this.i18n.clockwise) + '<br />' +
			botOptions() +
			'<span style="' + _this.config.dlg.labelStyle + '"><div style="position:relative;">' + 
				'<input name="angle" type="radio" id="rRotC" value="' + lastAngle + '" />' +
				'<div id="rRotCOverlay" style="position:absolute; left:0; right:0; top:0; bottom:0; z-index:1005;"></div>' +
				' <input name="customAngle" type="text" id="rRotCtext" size="6" maxlength="3" disabled="disabled" value="' + lastAngle + '" />°' +
			'</div></span><br style="clear:left;"/><br/>' + 
			'<div style="float:left; max-width:270px;"><b>' + mw.html.escape(this.i18n.noteheader) + '</b>' + 
				'<br/><span id="rRotNote"></span></div></div>'
		);
		this.$errorContainer = this.$dlgNode.find('#errorContainer');
		this.$rotNote = this.$dlgNode.find('#rRotNote');
 
		// Event handlers
		this.$dlgNode.find('input').bind('change', function() {
			if ('radio' === $(this).attr('type')) { 
				setAngle($(this).attr('value'));
				_this.usedBotOption = true;
				_this.$dButtons.eq(0).button('option', 'disabled', false);
			} else {
				setAngle($(this).val());
				_this.usedBotOption = false;
			}
			if ('rRotCtext' === $(this).attr('id')) {
				return true;
			}
			var $textnode = _this.$dlgNode.find('#rRotCtext');
			var $overlayNode = _this.$dlgNode.find('#rRotCOverlay');
			var state = ('rRotC' === $(this).attr('id'));
			if (state) {
				_this.usedBotOption = false;
				$textnode.removeAttr('disabled');
				setTimeout(function () {
					$overlayNode.hide();
					$textnode.focus();
					$textnode.select();
				}, 50);
			} else {
				_this.usedBotOption = true;
				$textnode.attr('disabled', 'disabled');
				$overlayNode.show();
			}
			return true;
		});
		this.$dlgNode.find('#rRotCtext').bind('input keyup', function() {
			$(this).val($(this).val().replace(/\D/g, ''));
			if (!setAngle($(this).val()) && $(this).val()) {
				$(this).val($(this).val()%360);
			}
			_this.$dlgNode.find('#rRotC').attr('value', $(this).val());
			_this.usedBotOption = false;
			return true;
		});
		this.$dlgNode.find('#rRotOptions').find('input').bind('keyup', function(e) {
			if (13 === e.which) {
				_this.sendRequest();
			}
			return true;
		});
		this.$dlgNode.find('#rRotCOverlay').bind('click', function(e) {
			_this.$dlgNode.find('#rRotC').click();
			_this.$dlgNode.find('#rRotC').triggerHandler('change');
			return false;
		});
 
		dlgButtons[this.i18n.submitButtonLabel] = function () {
			_this.sendRequest();
		};
		dlgButtons[this.i18n.cancelButtonLabel] = function () {
			$(this).dialog("close");
		};
		this.$dlgNode.dialog({
			modal: true,
			closeOnEscape: true,
			position: 'center',
			title: this.config.helpLink + ' ' + this.i18n.headline,
			height: this.config.dlg.height,
			maxHeight: $(window).height(),
			width: Math.min($(window).width(), this.config.dlg.width),
			buttons: dlgButtons,
			close: function () {
				$(this).dialog("destroy");
				$(this).remove();
				_this.dlgPresent = false;
			},
			open: function () {
				var $dlg = $(this);
 
				_this.$dButtons = $dlg.parent().find('.ui-dialog-buttonpane').find('button');
				_this.$dButtons.eq(0).specialButton('proceed');
				_this.$dButtons.eq(1).specialButton('cancel');
 
				$dlg.parents('.ui-dialog').css({
					position:'fixed', 
					top:Math.round(($(window).height() - Math.min($(window).height(), $('.ui-dialog.ui-widget').height())) / 2) + 'px'
				});
			}
		});
		if (!window.rotateDontPurge) {
			// send a purge-request
			var query = {
				title: mw.config.get('wgPageName'),
				action: 'purge'
			};
			$.get(mw.config.get('wgScript'), query, function(result) {
				purgeComplete(result);
			});
		} else {
			purgeComplete();
		}
		$(document).bind('rotaterequest', function(e, intE, p) {
			if (!intE || 'newAngleBotCompat' !== intE) {
				return;
			}
			var newText = '';
			if (p && _this.fileExtBotCompat) {
				newText = _this.i18n.noteBot;
			} else {
				if (!_this.fileExtBotCompat) { newText = _this.i18n.noteMime; }
				else {
					var st = _this.config.botAcceptedAngels.join(', ');
					st = st.substring(0, st.lastIndexOf(',') );
					newText = _this.i18n.noteAngle.replace('%1', st).replace('%2', _this.config.botAcceptedAngels[_this.config.botAcceptedAngels.length-1]);
				}
			}
			_this.$rotNote.html(newText);
		});
		angleBotCompat = true;
		setAngle(lastAngle);
		angleBotCompat = false;
		if ('none' === lastOptionId) {
			setAngle(0);
			_this.$dButtons.eq(0).button('option', 'disabled', true);
		} else { 
			setAngle(lastAngle);
			_this.$dlgNode.find('#rRot' + lastOptionId).click();
		}
		// Finally get some status information about the bot:
		var gotBotStatus = function(result) {
			if (!result) {
				return;
			}
			result = $('<div>' + result + '</div>').find('p').html();
			if (_this.i18n.noteBot === _this.$rotNote.html()) {
				_this.$rotNote.html(result);
			}
			_this.i18n.noteBot = result;
		};
		if (_this.config.currentBotStatus) {
			// create a cache-preventer (maxage is already 0) and send the XHR to obtain the current status
			var currentDate = new Date(),
				dummy = currentDate.getDate() + '-' + currentDate.getHours();
			$.get(mw.config.get('wgScript'), { 'action': 'render', title: _this.config.currentBotStatus, uselang: mw.config.get('wgUserLanguage'), dummy: dummy }, gotBotStatus);
			// Purge the template in some intervalls (each 10s only every 5th minute); something better would be appreciated
			if ((0 === currentDate.getSeconds()%10) && (0 === currentDate.getMinutes()%5)) {
				$.get(mw.config.get('wgScript'), { 'action': 'purge', title: _this.config.currentBotStatus });
			}
		}
	},
	sendRequest: function() {
		var _this = this;
		var a = 0;
 
		if (_this.sending || _this.$dButtons.eq(0).button('option', 'disabled')) {
			return;
		}
 
		_this.$dlgNode.parent().find('input, button').addClass('disabled').attr('disabled', 'disabled');
		_this.animationID = setInterval(function(){
			a+=10;
			var $img = $('#uniqueImg');
			$img.rotate({ angle: a });
			if ($img.length < 1) {
				clearInterval(_this.animationID);
			}
		}, 50);
 
		var doEdit = function (text) {
			var n_text = text.replace(_this.config.customTemplateRemoval, ''),
				tl = _this.config.customTemplate.replace('%1', _this.angle);
 
			var params = {
				action: 'edit',
				title: mw.config.get('wgPageName'),
				token: (window['wikilove-edittoken'] || mw.user.tokens.get('editToken')),
				nocreate: 1,
				redirect: 1,
				summary: '([[Help:RotateLink|Script]]) Requesting rotation of the image by ' + _this.angle + '°.'
			};
 
			if (n_text === text) {
				params.prependtext = tl;
			} else {
				params.text = _this.config.customTemplate.replace('%1', _this.angle) + n_text;
			}
 
			try { // silently fail
				$.cookie( 'rRot', (_this.angle + '|' + (_this.usedBotOption ? 'B' : 'C')), {
					expires: 14, // expires in 14 days
					path: '/' // domain-wide, entire wiki
				});
			} catch (ex) {}
 
			$(document).triggerHandler('rotaterequest', ['sendingRequest', params]);
			_this.sending = true;
 
			params.format = 'json';
			$.ajax({
				url: mw.util.wikiScript('api'),
				cache: false,
				dataType: 'json',
				data: params,
				type: 'POST',
				success: function (result, status, x) {
					if (!result) {
						return _this.fail("Receive empty API response:\n" + x.responseText);
					}
 
					// In case we get the mysterious 231 unknown error, just try again
					if (result.error && result.error.info.indexOf('231') !== -1) {
						_this.sending = false;
						return setTimeout(function () {
							_this.sendRequest();
						}, 500);
					}
					if (result.error) {
						return _this.fail("API request failed (" + result.error.code + "): " + result.error.info);
					}
					if (result.edit && result.edit.spamblacklist) {
						return _this.fail("The edit failed because " + result.edit.spamblacklist + " is on the Spam Blacklist");
					}
					try {
						_this.requestCB();
					} catch (e) {
						return _this.fail(e);
					}
				},
				error: function (x, status, error) {
					return _this.fail("API request returned code " + x.status + " " + status + "Error code is " + error);
				},
				complete: function () {
					_this.sending = false;
				}
			});
		};
		$.get(mw.config.get('wgScript'), { 'action': 'raw', title: mw.config.get('wgPageName'), '_': $.now() }, doEdit);
	},
	requestCB: function() {
		var _this = this;
		$(document).triggerHandler('rotaterequest', ['success']);
 
		clearInterval(_this.animationID);
		var doAfterAnimation = function() {
			window.location.href = encodeURI(mw.config.get('wgServer') + mw.config.get('wgArticlePath').replace('$1', mw.config.get('wgPageName')));
		};
		_this.$dlgNode.find('#readyContainer').fadeIn();
		$('#uniqueImg').rotate({animateTo: _this.angle, callback: doAfterAnimation });
		// If the browser-tab is idle, it fails sometime to call-back
		doAfterAnimation();
	},
	fail: function(err) {
		if ('object' === typeof err) {
			var stErr = err.message + '<br/>' + err.name;
			if (err.lineNumber) {
				stErr += ' @line' + err.lineNumber;
			}
			err = stErr;
		}
		this.$errorContainer.text(err);
		this.$errorContainer.fadeIn();
		$(document).triggerHandler('rotaterequest', ['failed', err]);
	},
	init: function() {
		var _this = this,
			botlink = '<a href="' + mw.util.wikiGetlink('User:Rotatebot') + '" target="_blank">Rotatebot</a>';
		// save some code-lines by assigning similar languages
		// -zh
		_this.i18n['zh-hk'] = _this.i18n['zh-mo'] = _this.i18n['zh-tw'] = _this.i18n['zh-hant']; // zh-hk, zh-mo, zh-tw get the zh-hant i18n
		// merge languages
		$.extend(_this.i18n, _this.i18n[mw.config.get('wgUserLanguage').split('-')[0]], _this.i18n[mw.config.get('wgUserLanguage')]);
 
		// inserting links
		_this.i18n.headline = _this.i18n.headline.replace('%ERRLINK%', 
			'href="' + mw.util.wikiGetlink('MediaWiki talk:Gadget-RotateLink.js') + '" target="_blank"');
		_this.i18n.noteMime = _this.i18n.noteMime.replace('Rotatebot', botlink);
		_this.i18n.noteAngle = _this.i18n.noteAngle.replace('Rotatebot', botlink);
		_this.i18n.noteBot = _this.i18n.noteBot.replace('Rotatebot', botlink);
		_this.i18n.noteMime = _this.i18n.noteMime.replace('%ROTATEBOTLINK%', 
			'href="' + mw.util.wikiGetlink('User:Rotatebot') + '" target="_blank"');
 
		// Finally set up event handlers
		$(document).bind('rotaterequest', function(evt, a, b) {
			if (a && 'start' === a) {
				_this.dialog();
			}
		});
		$(document).triggerHandler('scriptLoaded', ['rotaterequest', 'init']);
	},
	// Translation
	i18n: {
		'ca': {
			'submitButtonLabel': 'confirma la soŀlicitud de rotació',
			'cancelButtonLabel': 'canceŀla',
			'headline': 'Quants graus s’hauria de girar la imatge? ' + 
				'Podeu <a %ERRLINK%>informar</a> d’errades o suggeriments.',
			'intro': 'Podeu utilitzar aquesta funció per corregir imatges que es mostren en una orientació incorrecta (com passa sovint amb fotos digitals en vertical).',
			'clockwise': 'En sentit horari:',
			'noteheader': 'Nota: ',
			'noteAngle': 'Rotatebot pot girar %1° o %2° fent-ho en unes poques hores. Per a altres valors pot trigar més en ser atès.',
			'noteMime': 'Rotatebot no pot tractar aquest format de fitxer. Aquesta soŀlicitud pot trigar més en ser atesa.',
			'noteBot': 'Rotatebot pot executar aquesta soŀlicitud en unes poques hores.',
			'imgCaption': 'Corregiu l’orientació d’aquesta mostra seleccionant un angle.'
		},
		'cs': {
			'submitButtonLabel': 'Potvrdit požadavek na otočení',
			'cancelButtonLabel': 'Storno',
			'headline': 'O kolik stupňů se má tento obrázek otočit? ' + 
					'<a %ERRLINK%>Chyby a vylepšení</a>.',
			'intro': 'Touto funkcí můžete opravit obrázky, které se zobrazují špatně otočené (což se často stává u digitálních fotografií na výšku).',
			'clockwise': 'Ve směru hodinových ručiček',
			'noteheader': 'Poznámka: ',
			'noteAngle': 'Otočení o %1 nebo %2° bude Rotatebot schopen vyřídit během pár hodin.',
			'noteMime': 'Rotatebot neumí zpracovávat soubory tohoto typu nebo formátu. Na otočení si budete muset pravděpodobně počkat delší dobu.',
			'noteBot': 'Rotatebot by tento požadavek měl zvládnout během několika hodin.',
			'imgCaption': 'Opravte natočení tohoto náhledu volbou úhlu.'
		},
		'da': {
			'submitButtonLabel': 'Bekræft anmodning om rotation',
			'cancelButtonLabel': 'Afbryd',
			'headline': 'Hvor mange grader bør dette billede roteres? ' + 
					'<a %ERRLINK%>Rapporter</a> fejl og idéer.',
			'clockwise': 'Mod uret',
			'noteheader': 'Note: ',
			'noteAngle': 'Hvis du anmoder om en rotation på %1 eller %2° så vil Rotatebot gøre dette i løbet af få timer.',
			'noteMime': 'Rotatebot kan ikke behandle medier af denne filtype. Det vil sandsynligvis tage en del tid før det bliver muligt.',
			'noteBot': 'Rotatebot kan udføre denne anmodning i løbet af få timer.'
		},
		'de': {
			'submitButtonLabel': 'Drehung beauftragen',
			'cancelButtonLabel': 'Abbrechen',
			'headline': 'Um wie viele Grad soll das Bild gedreht werden? ' + 
				'Fehler im Script bitte <a %ERRLINK%>melden</a>.',
			'intro': 'Mit dieser Funktion können falsch gedrehte Bilder (wie es häufig bei Digitalfotos im Hochformat vorkommt) korrigiert werden.',
			'clockwise': 'Im Uhrzeigersinn',
			'noteheader': 'Hinweis: ',
			'noteAngle': 'Wenn eine Drehung um %1 oder %2° gefordert wird, wird der Rotatebot das in wenigen Stunden erledigen. Ansonsten kann es länger dauern.',
			'noteMime': 'Der Rotatebot kann Medien dieses Dateiformats nicht automatisch drehen. Die Drehung muss von Hand vorgenommen werden.',
			'noteBot': 'Der Rotatebot wird das Bild in wenigen Stunden drehen.',
			'imgCaption': 'Drehe dieses Vorschaubild in die richtige Ausrichtung, indem Du eine Option auswählst.'
		},
		'el': {
			'submitButtonLabel': 'Επιβεβαιώστε το αίτημα περιστροφής',
			'cancelButtonLabel': 'Άκυρο',
			'headline': 'Περίπου πόσες μοίρες πρέπει να περιστραφεί η εικόνα; ' + 
	'<a %ERRLINK%>Αναφέρετε</a> σφάλματα και ιδέες.',
			'intro': 'Με αυτή τη λειτουργία μπορείτε να διορθώσετε εικόνες που προβάλλονται με λάθος προσανατολισμό (όπως συμβαίνει μερικές φορές με τις "όρθιες" ψηφιακές φωτογραφίες).',
			'clockwise': 'Προς τα δεξιά:',
			'noteheader': 'Σημείωση: ',
			'noteAngle': 'Αν ζητήσετε περιστροφή κατά %1 ή %2° το Rotatebot θα εκτελέσει το αίτημα μέσα σε μερικές ώρες. Αν ζητήσετε άλλο αριθμό μοιρών, το αίτημα θα πρέπει να γίνει χειροκίνητα από κάποιον εθελοντή, και πιθανότατα θα πάρει περισσότερο χρόνο.',
			'noteMime': 'Αυτός ο τύπος αρχείου δεν μπορεί να <a %ROTATEBOTLINK%>περιστραφεί αυτόματα</a>. Η περιστροφή θα πρέπει να γίνει χειροκίνητα, κάτι που θα πάρει χρόνο.',
			'noteBot': 'Το Rotatebot μπορεί να εκτελέσει αυτό το αίτημα μέσα σε λίγες ώρες.',
			'imgCaption': 'Διορθώστε τον προσανατολισμό αυτής της μικρογραφίας επιλέγοντας γωνία περιστροφής.'
		},
		'es': {
			'submitButtonLabel': 'Confirmar la solicitud de rotación',
			'cancelButtonLabel': 'Cancelar',
			'headline': '¿Cuántos grados debería girarse esta imagen? ' + 
				'<a %ERRLINK%>Notificar fallos o ideas</a>.',
			'intro': 'Puedes usar esta funcionalidad para corregir imágenes que no muestran una orientación correcta (algo que ocurre con frecuencia en fotos digitales tomadas en vertical).',
			'clockwise': 'En el sentido de las agujas del reloj:',
			'noteheader': 'Nota: ',
			'noteAngle': 'Si solicitas una rotación de %1º o %2°, Rotatebot lo hará en unas horas. Para los otros valores tardará más tiempo en completar la tarea.',
			'noteMime': 'Este tipo de archivos no se puede <a %ROTATEBOTLINK%>rotar automáticamente</a>; la rotación tendrá que hacerse manualmente, algo que puede llevar más tiempo.',
			'noteBot': 'Rotatebot puede realizar esta solicitud en unas horas.',
			'imgCaption': 'Corrige la orientación de esta miniatura seleccionando un ángulo.'
		},
		'fa': {
			'submitButtonLabel': 'تأیید درخواست چرخش',
			'cancelButtonLabel': 'لغو',
			'headline': 'این تصویر حدوداً چند درجه باید چرخانده شود؟ ' + 
				'اشکالات و نظراتتان را <a %ERRLINK%>گزارش دهید</a>.',
			'intro': 'شما می\u200cتوانید از این ابزار برای تصحیح تصاویری که جهت\u200cگیری نادرستی دارند، استفاده کنید (مشابه این وضعیت مکرراً در تصاویر دیجیتالی ایستاده دیده می\u200cشود).',
			'clockwise': 'ساعت\u200cگرد:',
			'noteheader': 'توجه: ',
			'noteAngle': 'اگر درخواست چرخش %1 یا %2° است، ربات این عمل را ظرف چند ساعت انجام خواهد داد. در غیر این\u200cصورت، احتمالاً زمان بیشتری طول خواهد کشید تا درخواست شما انجام داده شود.',
			'noteMime': 'این نوع پرونده را نمی\u200cتوان به طور خودکار <a %ROTATEBOTLINK%>چرخاند</a>؛ چرخاندن پرونده باید به صورت دستی انجام گیرد که ممکن است مدتی طول بکشد.',
			'noteBot': 'ربات نمی\u200cتواند ظرف چند ساعت آینده درخواست چرخش را انجام دهد.',
			'imgCaption': 'جهت\u200cگیری تصویر بندانگشتی را با انتخاب زاویهٔ مناسب تصحیح نمایید.'
		},
		'fr': {
			'submitButtonLabel': 'Confirmer la demande de rotation',
			'cancelButtonLabel': 'Annuler',
			'headline': "De combien de degrés l’image doit-elle être tournée ? " + 
					'<a %ERRLINK%>Rapporter les bogues et les suggestions</a> s.v.p.',
			'clockwise': "dans le sens des aiguilles d’une montre",
			'noteheader': 'Note : ',
			'noteAngle': 'Si vous soumettez une rotation de %1° ou %2° Rotatebot le fera dans quelques heures.',
			'noteMime': 'Rotatebot ne prend pas en charge ce format de fichier.  Il y a de grande chances pour que cela prenne plus de temps.',
			'noteBot': "Rotatebot peut s’occuper de cette requête dans quelques heures.",
			'intro': 'Vous pouvez utiliser cet outil pour corriger les images ayant une mauvaise orientation (comme cela arrive fréquemment avec les photos numériques verticales).',
			'imgCaption': "Corrigez l’orientation de cette miniature en sélectionnant un angle."
		},
		'gl': {
			'submitButtonLabel': 'confirmar a solicitude de rotación',
			'cancelButtonLabel': 'cancelar',
			'headline': 'Cantos graos cómpre rotar esta imaxe? ' + 
					'<a %ERRLINK%>Achéguenos</a> erros e ideas.',
			'intro': 'Pode facer uso desta función para corrixir as imaxes que teñan unha orientación incorrecta (cousa que ocorre frecuentemente coas fotos dixitais tomadas en vertical).',
			'clockwise': 'No sentido das agullas do reloxo:',
			'noteheader': 'Nota: ',
			'noteAngle': 'Rotatebot pode realizar unha rotación en %1º ou %2° nunhas poucas horas. Para outros valores pode tardar máis tempo ou mesmo non completar a tarefa.',
			'noteMime': 'Este tipo de ficheiro non se pode <a %ROTATEBOTLINK%>rotar automaticamente</a>; cómpre facer a rotación de xeito manual, algo que pode levar algún tempo.',
			'noteBot': 'Rotatebot pode levar a cabo esta solicitude nunhas horas.',
			'imgCaption': 'Corrixa a orientación desta miniatura seleccionando un ángulo.'
		},
		'it': {
			'submitButtonLabel': 'conferma rotazione richiesta',
			'cancelButtonLabel': 'annulla',
			'headline': 'Di quanti gradi dovrebbe essere ruotata l\'immagine? ' + 
					'<a %ERRLINK%>Segnala bug o suggerimenti</a>.',
			'intro': 'Puoi usare questo strumento per correggere immagini orientate in modo errato (come capita spesso con immagini digitali scattate in verticale).',
			'clockwise': 'Senso orario:',
			'noteheader': 'Nota: ',
			'noteAngle': 'Se richiedi una rotazione di %1 o %2°, Rotatebot impiegherà qualche ora.',
			'noteMime': 'Rotatebot non è in grado di <a %ROTATEBOTLINK%>elaborare automaticamente</a> questo tipo di file. È necessario farlo manualmente, il che probabilmente richiederà più tempo.',
			'noteBot': 'Rotatebot può soddisfare questa richiesta in poche ore.',
			'imgCaption': 'Correggi l\'orientamento di questa miniatura selezionando un\'opzione.'
		},
		'ja': {
			'submitButtonLabel': '依頼を確認',
			'cancelButtonLabel': 'キャンセル',
			'headline': 'この画像を何度回転させますか？ ' + 
					'バグや提案は<a %ERRLINK%>こちら</a>',
			'intro': 'この機能では（主に縦長のデジタル画像でみられるような）正しくない向きに回転してしまった画像を正しい向きに直すことができます。',
			'clockwise': '時計回りで',
			'noteheader': 'お知らせ ',
			'noteAngle': '%1, %2°に回転させる場合は、Rotatebotによって数時間で回転されます。他の角度に回転させる場合は、それ以上の時間がかかります。',
			'noteMime': 'この形式のファイルは、<a %ROTATEBOTLINK%>Rotatebot</a>で回転させることができません。回転は人の手によっておこなわれるため、時間がかかります。',
			'noteBot': 'Rotatebotは数時間でこの画像を回転します。',
			'imgCaption': 'このサムネイルで正しい方向になるように角度を選択して下さい。'
		},
		'mk': {
			'submitButtonLabel': 'Потврди',
			'cancelButtonLabel': 'Откажи',
			'headline': 'За околу колку степени треба да се сврти сликата? ' + 
					'<a %ERRLINK%>Пријавувајте грешки и нови идеи</a>.',
			'intro': 'Со оваа функција можете да ги исправате погрешно свртените слики (како што често се случува кај дигиталните фотографии).',
			'clockwise': 'Надесно',
			'noteheader': 'Напомена: ',
			'noteAngle': 'Ако побарате свртување за %1 или %2° Rotatebot ќе го изврши вртењето за неколку часа.',
			'noteMime': 'Rotatebot не може да работи со ваква слика или формат. Веројатно ова би потрајало подолго.',
			'noteBot': 'Rotatebot може да го изврши бараното за неколку часа.',
			'imgCaption': 'Поправете ја насоченоста на минијатурава - одберете агол.'
		},
		'ml': {
			'submitButtonLabel': 'തിരിക്കൽ നിർദ്ദേശം സ്ഥിരീകരിക്കുക',
			'cancelButtonLabel': 'റദ്ദാക്കുക',
			'headline': 'ഏകദേശം എത്ര ഡിഗ്രിയാണ് ഈ ചിത്രം തിരിക്കേണ്ടത്? ' + 'പ്രശ്നങ്ങളും ആശയങ്ങളും <a %ERRLINK%>അറിയിക്കുക</a>.',
			'intro': 'തെറ്റായ ദിശയിൽ ചേർത്തിരിക്കുന്ന ചിത്രങ്ങൾ ശരിയാക്കാൻ ഈ സൗകര്യം ഉപയോഗിക്കാവുന്നതാണ് (ഉദാഹരണത്തിന് തലകീഴായി പോയ ഡിജിറ്റൽ ഫോട്ടോകൾ).',
			'clockwise': 'പ്രദക്ഷിണദിശ:',
			'noteheader': 'കുറിപ്പ്: ',
			'noteAngle': 'താങ്കൾ %1 അല്ലെങ്കിൽ %2° തിരിക്കാനാണ് ആവശ്യപ്പെടുന്നതെങ്കിൽ റൊട്ടേറ്റ്ബോട്ട് ഏതാനം മണിക്കൂറുകൾക്കുള്ളിൽ അത് ചെയ്യുന്നതായിരിക്കും. അതിനു സാധാരണയിലും കൂടുതൽ സമയമെടുത്തേക്കും.',
			'noteMime': 'ഈ പ്രമാണം <a %ROTATEBOTLINK%>മനുഷ്യസഹായമില്ലാതെ തിരിക്കാൻ</a> കഴിയില്ല; മനുഷ്യസഹായം ലഭിക്കാൻ സമയമെടുത്തേക്കാം.',
			'noteBot': 'റൊട്ടേറ്റ്ബോട്ട് ഈ നിർദ്ദേശം ഏതാനം മണിക്കൂറുകൾക്കുള്ളിൽ നടപ്പിലാക്കും.',
			'imgCaption': 'കോൺ തിരഞ്ഞെടുത്ത് ഈ ലഘുചിത്രത്തിന്റെ ദിശ ശരിയാക്കുക.'
		},
		'nl': {
			'submitButtonLabel': 'Rotatieverzoek bevestigen',
			'cancelButtonLabel': 'Annuleren',
			'headline': 'Hoeveel graden moet de afbeelding worden geroteerd? ' + 
					'<a %ERRLINK%>Rapporteer</a> bugs en ideeën.',
			'intro': 'U kunt deze functie gebruiken om afbeeldingen te corrigeren die worden weergegeven met een verkeerde oriëntatie (zoals dit vaak voorkomt met rechtopstaande digitale foto\'s).',
			'clockwise': 'Met de klok mee:',
			'noteheader': 'Noot: ',
			'noteAngle': 'Indien u een rotatie verzoekt van %1 of %2° voert Rotatebot dit binnen enkele uren uit. Andere rotaties nemen waarschijnlijk meer tijd in beslag.',
			'noteMime': 'Dit type bestand kan niet <a %ROTATEBOTLINK%>automatisch geroteerd</a> worden; de rotatie moet handmatig moeten uitgevoerd worden. Dit kan enige tijd kan duren.',
			'noteBot': 'Rotatebot kan dit verzoek binnen enkele uren uitvoeren.',
			'imgCaption': 'Corrigeer de oriëntatie van deze miniatuur door een rotatiehoek te selecteren.'
		},
		'pl': {
			'submitButtonLabel': 'Potwierdź wniosek',
			'cancelButtonLabel': 'Anuluj',
			'headline': 'O ile stopni powinna być obrócona ta grafika? ' + 
					'<a %ERRLINK%>Prosimy o zgłaszanie błędów lub nowych pomysłów</a>.',
			'intro': 'Możesz używać tej funkcji do poprawiania grafik o złej orientacji (np. w przypadku pionowych fotografii cyfrowych).',
			'clockwise': 'Zgodnie z ruchem wskazówek zegara',
			'noteheader': 'Uwaga: ',
			'noteAngle': 'Jeśli poprosisz o obrócenie grafiki o %1 lub %2°, Rotatebot zrobi to w ciągu kilku godzin.',
			'noteMime': 'Rotatebot nie jest w stanie obsłużyć pliku w tym formacie, w związku z czym wykonanie Twojego wniosku może potrwać nieco dłużej.',
			'noteBot': 'Rotatebot może wykonać ten wniosek w ciągu kilku godzin.'
		},
		'pt': {  // also correct for pt-br
			'submitButtonLabel': 'confirmar pedido de rotação',
			'cancelButtonLabel': 'cancelar',
			'intro': 'Podes usar esta função para corrigir imagens que estão a ser exibidas na orientação errada (como é comum acontecer com imagens digitais fotografadas na vertical).',
			'headline': 'Em quantos graus esta imagem deve ser rotacionada? ' + 
				'<a %ERRLINK%>Reporte bugs e ideias</a>.',
			'clockwise': 'sentido horário',
			'noteheader': 'Nota: ',
			'noteAngle': 'Se solicitar uma rotação de %1 ou %2° Rotatebot atenderá o pedido em algumas horas.',
			'noteMime': 'Rotatebot não consegue lidar com mídia neste formato de arquivo. Seu pedido poderá demorar mais para ser atendido.',
			'noteBot': 'Rotatebot pode executar este pedido em algumas horas.'
		},
		'ro': {
			'submitButtonLabel': 'confirmă cererea de rotire',
			'cancelButtonLabel': 'anulează',
			'headline': 'Cu câte grade trebuie rotită imaginea? ' + 
				'<a %ERRLINK%>Raportaţi</a> buguri şi idei de feature-uri.',
			'intro': 'Puteţi utiliza această funcţie pentru a corecta imaginile afişate cu o orientare greşită (aşa cum se întâmplă adesea în cazul unor fotografii făcute „în picioare”.',
			'clockwise': 'Sens orar:',
			'noteheader': 'Notă: ',
			'noteAngle': 'Dacă cereţi o rotaţie cu %1 sau %2° Rotatebot va face aceasta în câteva ore. Aceasta, însă, probabil va dura mult şi nu e sigur dacă se va face.',
			'noteMime': 'Rotatebot nu poate roti fişiere media în acest format. Probabil va dura ceva vreme până să se efectueze rotaţia.',
			'noteBot': 'Rotatebot poate executa această cerere în câteva ore.',
			'imgCaption': 'Corectaţi orientarea acestui thumbnail alegând un unghi.'
		},
		'ru': {
			'submitButtonLabel': 'Подтвердить запрос',
			'cancelButtonLabel': 'Отменить',
			'headline': 'На сколько градусов нужно повернуть изображение? ' + 
				'<a %ERRLINK%>Написать</a> об ошибках и идеях.',
			'intro': 'Вы можете воспользоваться этим инструментом для исправления изображений с неправильной ориентацией (зачастую это цифровые фото с вертикальной ориентацией).',
			'clockwise': 'По часовой стрелке:',
			'noteheader': 'Примечание: ',
			'noteAngle': 'Если вы запрашиваете вращение на %1 или %2°, Rotatebot выполнит его в течение нескольких часов. Если на другой угол, то это может занять больше времени.',
			'noteMime': 'Этот тип файла не может быть <a %ROTATEBOTLINK%>повёрнут автоматически</a>; вращение должно быть произведено вручную, что может потребовать некоторого времени.',
			'noteBot': 'Rotatebot может выполнить этот запрос в течение нескольких часов.',
			'imgCaption': 'Исправьте ориентацию этой миниатюры, выбрав угол.'
		},
		'sl': {
			'submitButtonLabel': 'potrdi zahtevo za zasuk',
			'cancelButtonLabel': 'prekliči',
			'headline': 'Za koliko stopinj je treba zavrteti sliko? ' + 
					'<a %ERRLINK%>Sporočite</a> hrošče in predloge.',
			'intro': 'To funkcijo lahko uporabite za popravo slik, ki so prikazane napačno usmerjene (pogosto pri pokončnih digitalnih fotografijah).',
			'clockwise': 'V smeri urnega kazalca:',
			'noteheader': 'Opomba: ',
			'noteAngle': 'Če boste zahtevali zasuk za %1 ali %2°, ga bo v nekaj urah opravil Rotatebot. Sicer bo to najverjetneje vzelo več časa.',
			'noteMime': 'Te vrste datoteke ni mogoče <a %ROTATEBOTLINK%>zasukati samodejno</a>; zasuk je treba opraviti ročno, kar lahko vzame nekaj časa.',
			'noteBot': 'To zahtevo lahko Rotatebot izvrši v nekaj urah.',
			'imgCaption': 'Z izbiro kota popravite usmerjenost predogledne sličice.'
		},
		'sr': {
			'submitButtonLabel': 'Потврди захтев за ротирање',
			'cancelButtonLabel': 'Откажи',
			'headline': 'За колико степени би требало ротирати слику? ' + 
					'<a %ERRLINK%>Пријави</a> грешке и идеје.',
			'intro': 'Овим алатом можете да поправите слике које су погрешно ротиране (као што се често дешава када се фото-апарт постави вертикално).',
			'clockwise': 'У смеру казаљке на сату:',
			'noteheader': 'Напомена: ',
			'noteAngle': 'Ако тражите ротацију од  %1 или %2° Rotatebot ће то урадити за неколико сати. Ако не, значи да му вероватно треба више времена да то изврши.',
			'noteMime': 'Овај тип фајла се не може <a %ROTATEBOTLINK%>аутоматски ротирати</a>; то ће морати да се обави ручно, што може да потраје неко време.',
			'noteBot': 'Rotatebot може да изврши овај захтев за неколико сати.',
			'imgCaption': 'Поправите оријентацију ове сличице избором одговарајућег угла.'
		},
		'sv': {
			'submitButtonLabel': 'bekräfta roteringsbegäran',
			'cancelButtonLabel': 'avbryt',
			'headline': 'Hur många grader ska denna bild roteras? ' + 
				'<a %ERRLINK%>Rapportera</a> buggar och idéer.',
			'intro': 'Du kan använda denna funktion för att korrigera bilder som visas i fel vinkel (vilket förekommer ofta med digitala bilder som är upprättstående).',
			'clockwise': 'Medurs:',
			'noteheader': 'OBS: ',
			'noteAngle': 'Om du begär en rotering med %1 eller %2° kommer Rotatebot göra detta inom några timmar. Troligt att det kommer att ta längre tid att utföras.',
			'noteMime': 'Denna filtyp kan inte <a %ROTATEBOTLINK%>roteras automatiskt</a>; roteringen kommer att utföras manuellt, som kan ta lite tid.',
			'noteBot': 'Rotatebot kan utföra denna begäran inom några timmar.',
			'imgCaption': 'Korrigera orienteringen för denna miniatyr genom att välja en vinkel.'
		},
		'zh': {  // also correct for zh-hans, zh-cn, zh-my, zh-sg
			'submitButtonLabel': '确认旋转请求',
			'cancelButtonLabel': '取消',
			'headline': '这个图像应该被旋转多少度？' + 
				'<a %ERRLINK%>报告</a>错误和想法。',
			'intro': '您可以使用这个功能来修正显示方向错误的图像（例如常见的纵向数码照片）。',
			'clockwise': '顺时针',
			'noteheader': '注：',
			'noteAngle': '如果您请求旋转%1或%2°，Rotatebot会在几个小时内完成旋转。',
			'noteMime': '此类型的文件不能被<a %ROTATEBOTLINK%>自动旋转</a>；旋转将人工完成，这可能需要更多的时间。',
			'noteBot': 'Rotatebot可以在几个小时内执行这个请求。',
			'imgCaption': '选择一个角度使此缩略图显示为正确的方向。'
		},
		'zh-hant': {  // also correct for zh-hk, zh-mo, zh-tw (enabled VIA HACK directly above "// merge languages" )
			'submitButtonLabel': '確認旋轉請求',
			'cancelButtonLabel': '取消',
			'headline': '這個圖像應該被旋轉多少度？' + 
				'<a %ERRLINK%>報告</a>錯誤和想法。',
			'intro': '您可以使用這個功能來修正顯示方向錯誤的圖像（例如常見的縱向數位照片）。',
			'clockwise': '順時針',
			'noteheader': '注：',
			'noteAngle': '如果您請求旋轉%1或%2°，Rotatebot會在幾個小時內完成旋轉。',
			'noteMime': '此類型的檔案不能被<a %ROTATEBOTLINK%>自動旋轉</a>；旋轉將人工完成，這可能需要更多的時間。',
			'noteBot': 'Rotatebot可以在幾個小時內執行這個請求。',
			'imgCaption': '選擇一個角度使此縮圖顯示爲正確的方向。'
		},
		'submitButtonLabel': 'confirm rotate request',
		'cancelButtonLabel': 'cancel',
		'headline': 'How many degrees this image should be rotated? ' + 
			'<a %ERRLINK%>Report</a> bugs and ideas.',
		'intro': 'You can use this function to correct images which display in the wrong orientation (as frequently occurs with vertical orientation digital photos).',
		'clockwise': 'Clockwise:',
		'noteheader': 'Note: ',
		'noteAngle': 'If you request a rotation by %1 or %2° Rotatebot will do this in a few hours. If you request a rotation by any other angle it will probably take longer.',
		'noteMime': 'This type of file cannot be <a %ROTATEBOTLINK%>rotated automatically</a>; rotation will have to be done manually, which may take some time.',
		'noteBot': 'Rotatebot can execute this request in a few hours.',
		'imgCaption': 'Correct the orientation of this thumbnail by selecting an angle.'
	},
	// Configuration
	config: {
		dlg: {
			width: 560,
			height: 'auto',
			labelStyle: 'width: 140px; display: inline-block; height:1.6em;',
			customNumber: '123', // like the Cookie: '<number>|B' OR just '123'
			customOption: 'none' // 'C' (custom) OR 'none' OR 0 to botAcceptedAngels.length-1
		},
		customTemplate: '{{rotate|%1}}\n',
		customTemplateRemoval: /\{\{rotate\|.+?\}\}\n?/ig,
		botAcceptedFormats: ['png', 'jpg', 'jpeg', 'gif'],
		botAcceptedAngels: [90, 180, 270],  // must be numbers only
		helpLink: '<a href="' + mw.util.wikiGetlink('Help:RotateLink') + '" target="_blank"><img src="//upload.wikimedia.org/wikipedia/commons/4/45/GeoGebra_icon_help.png" alt="?"/></a>',
		currentBotStatus: 'User:Rotatebot/approx max wait time rotatelink'
	}
};
 
if (!window.rRotSettings) {
	window.rRotSettings = {};
}
$.extend(window.rRot.config, window.rRotSettings);
 
mw.loader.using(['jquery.cookie', 'jquery.ui.dialog', 'mediawiki.user', 'mediawiki.util', 'ext.gadget.libJQuery', 'ext.gadget.jquery.rotate'], function(){ 
	window.rRot.init();
});
})(jQuery);
// Just for debugging
// $(document).unbind('rotaterequest');
// $(document).triggerHandler('rotaterequest', ['start']);
// </nowiki>