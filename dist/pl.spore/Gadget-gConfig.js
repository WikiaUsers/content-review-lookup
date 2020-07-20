/**
 * gConfig is a handy tool to allow users to modify settings of your gadget, with little hassle on your or their side.
 * 
 * Synopsis:
 *  - register your gadget with its settings: gConfig.register('lipsum', 'Lorem ipsum gadget', [...])
 *  - access the configuration: gConfig.get('lipsum', 'setting')
 * 
 * For more examples, see per-function docs below.
 * 
 * See also gConfig.css.
 * 
 * Version: 0.3
 * Dual-licensed CC-BY-SA 3.0 or newer, GFDL 1.3 or newer
 * Author: [[w:pl:User:Matma Rex]]
 */
(function(mw, $){
	mw.loader.using(['jquery.cookie', 'mediawiki', 'mediawiki.api'], function(){
		mw.messages.set({
			'gConfig-prefs-page-info': "<p>Na tej stronie możesz zmienić ustawienia włączonych gadżetów.</p><p>Informacje i dokumentacja: <a href='/wiki/Wikipedia:Narzędzia/gConfig'>Wikipedia:Narzędzia/gConfig</a>.</p>",
			'gConfig-prefs-page-title': "Preferencje gadżetów",
			'gConfig-prefs-no-gadgets': "Obecnie nie masz włączonych żadnych gadżetów korzystających z gConfiga.",
			'gConfig-prefs-save': "Zapisz",
			'gConfig-prefs-saving': "Zapisywanie...",
			'gConfig-prefs-saved': "Zapisano!",
			'gConfig-prefs-invalid-values': "Nieprawidłowe wartości.",
			'gConfig-prefs-legacy-setting': "To ustawienie jest w tej chwili wpisane na stałe w jednym z twoich plików .js. Usuń je stamtąd, aby stało się modyfikowalne.",
			'gConfig-prefs-not-an-integer': "Podana wartość nie jest liczbą całkowitą.",
			'gConfig-prefs-out-of-range-min': "Podana wartość jest mniejsza od minimalnej dozwolonej.",
			'gConfig-prefs-out-of-range-max': "Podana wartość jest większa od maksymalnej dozwolonej."
		});
		
		// Global gConfig object.
		var gConfig = {};
		// Data of all managed gadgets and settings. 
		gConfig.data = {};
		// Current values of gadgets' settings.
		gConfig.settings = {};
		
		var api = new mw.Api();
		var optionsToken = null;
		
		// generate internal name for this setting.
		// used as input names, cookie names, options' names...
		function internalName(gadget, setting)
		{
			return 'gconfig-'+gadget+'-'+setting;
		}
		// parse internal name. returns array of [gadget, setting].
		function parseInternalName(name)
		{
			var match = name.match(/^gconfig-([a-zA-Z0-9_]+)-(.+)$/);
			var gadget = match[1], setting = match[2];
			return [gadget, setting];
		}
		
		var totalSettingsCount = 0;
		var settingsCurrentCount = 0;
		var saveSettingsUserCallback = null;
		// saves settings in cookies and in prefs
		// settings - array of arrays: [gadget, settingName, value]
		// calls saveSettingsCallback after every successful request
		function saveSettings(settings, callback)
		{
			if(!optionsToken) return false;
			
			totalSettingsCount = settings.length;
			settingsCurrentCount = 0;
			saveSettingsUserCallback = callback;
			
			var grouped = []
			
			for(var i=0; i<settings.length; i++) {
				var name = internalName(settings[i][0], settings[i][1]);
				var value = settings[i][2];
				
				$.cookie(name, value, {expires: 365, path:'/'});
				if((''+value).match(/\|/)) {
					api.post({
						action:'options', optionname:'userjs-'+name, optionvalue:value, token:optionsToken
					}).done(function(j){ saveSettingsCallback(1) });
				}
				else {
					grouped.push('userjs-'+name+'='+value);
				}
			}
			
			api.post({
				action:'options', change:grouped.join('|'), token:optionsToken
			}).done(function(j){ saveSettingsCallback(grouped.length) });
			
			return true;
		}
		function saveSettingsCallback(increment)
		{
			settingsCurrentCount += increment;
			if(settingsCurrentCount == totalSettingsCount)
			{
				if(saveSettingsUserCallback) saveSettingsUserCallback();
			}
		}
		
		// reads raw setting from mw.user.options or cookies.
		// returns undefined if it's not saved anywhere.
		// sets needSynchro to true if data differs or setting is missing.
		function readRawSetting(gadget, settingName)
		{
			var name = internalName(gadget, settingName);
			var value = mw.user.options.get('userjs-'+name);
			if(value == undefined) value = $.cookie(name);
			
			if(value == undefined || mw.user.options.get('userjs-'+name) != $.cookie(name) ) needSynchro = true;
			
			return value;
		}
		
		// validates and canonicalizes setting's values.
		// doesn't catch errors raised by validation().
		// can throw further errors (for numeric values: not an int, out of range)
		function validateAndCanonicalize(value, type, validation)
		{
			if(type == 'boolean') {
				value = (value ? '1' : '');
			} else if(type == 'string') {
				value = '' + value;
			} else if(type == 'integer') {
				if(parseInt(value, 10) != parseFloat(value)) throw mw.msg('gConfig-prefs-not-an-integer');
				value = parseInt(value, 10);
			} else if(type == 'numeric') {
				value = parseFloat(value);
			}
			
			if(typeof validation == 'function') {
				value = validation(value);
			} else if($.isArray(validation) && (type == 'integer' || type == 'numeric')) {
				var min = validation[0], max = validation[1];
				if(value < min) throw mw.msg('gConfig-prefs-out-of-range-min');
				if(value > max) throw mw.msg('gConfig-prefs-out-of-range-max');
			}
			
			return value;
		}
		
		// List of all registered gadgets.
		gConfig.registeredGadgets = [];
		// Map of internal gadget names => user-visible gadget names.
		gConfig.readableNames = {};
		// List of internal names of settings which were loaded using the legacy method.
		gConfig.legacySettings = [];
		
		// Register configuration for a new gadget.
		// 
		// * gadget is an internal name, must consist only of ASCII letters, numbers or underscore.
		// * readableName is an user-visible name, shown in preferences' headings.
		// * settings is an array of configuration options for this gadget. Each option is an object with the following keys:
		//   * name [required]: internal name of this setting, not shown anywhere
		//   * desc [required]: description shown on the prefs page
		//   * type [required]: boolean / integer / numeric / string, each type is handled differently on the prefs page and validated
		//   * deflt [required]: default value
		//   * validation: either an array [min, max] (for numeric/integer types), or a function that performs the validation.
		//     The function will receive value inputted by user as first (and only) parameter, and to indicate that the value
		//     is unacceptable must throw an error; the message used will be displayed on the prefs page to the user.
		//     It may also merely process values - it's return value will be used as the final value for the pref.
		//   * legacy: intended for migration of old scripts to gConfig. Can be either an array of [object, property] or
		//     just object, property will be assumed to be the same as setting's name. If object[property] will not be undefined,
		//     it's value will be taken as the value for this pref and the pref will be marked as legacy and become non-editable.
		// 
		// A lengthy example:
		//   gConfig.register('lipsum', 'Lorem ipsum gadget', [
		//     {
		//       name: 'boolean',
		//       desc: 'Boolean value.',
		//       type: 'boolean',
		//       deflt: true
		//     }, {
		//       name: 'integer',
		//       desc: 'Integral number between 0 and 30.',
		//       type: 'integer',
		//       deflt: 20,
		//       validation: [0, 30]
		//     }, {
		//       name: 'float',
		//       desc: 'Floating-point number between -1 and 1.',
		//       type: 'numeric',
		//       deflt: 0.5,
		//       validation: [-1, 1]
		//     }, {
		//       name: 'string',
		//       desc: 'Text value.',
		//       type: 'string',
		//       deflt: 'test'
		//     }, {
		//       name: 'evenonly-passive',
		//       desc: 'Even numbers only. Will be rounded down if an odd number is given.',
		//       type: 'integer',
		//       deflt: 0,
		//       validation: function(n){ return n%2!=0 ? n-1 : n; }
		//     }, {
		//       name: 'evenonly-agressive',
		//       desc: 'Even numbers only. Will prevent saving if an odd number is given.',
		//       type: 'integer',
		//       deflt: 0,
		//       validation: function(n){ if(n%2!=0){ throw 'Requires an even number!' }; return n; }
		//     }
		//   ]);
		gConfig.register = function(gadget, readableName, settings)
		{
			gConfig.data[gadget] = settings;
			gConfig.settings[gadget] = {};
			
			for(var i=0; i<settings.length; i++) {
				var sett = settings[i];
				var value;
				
				// do some basic input validation to prevent nondescriptive errors later
				var errorMessage = "missing % in setting #"+i+" for "+gadget;
				if(!sett.name) throw errorMessage.replace('%', 'name')
				if(!sett.desc) throw errorMessage.replace('%', 'desc')
				if(!sett.type) throw errorMessage.replace('%', 'type')
				if(sett.deflt == undefined) throw errorMessage.replace('%', 'deflt')
				
				var isLegacy = false;
				if(sett.legacy) {
					var object, property;
					if($.isArray(sett.legacy)) { // [object, 'prop name']
						object = sett.legacy[0]; property = sett.legacy[1];
					} else { // object, prop name = sett.name
						object = sett.legacy; property = sett.name;
					}
					
					if(object[property] != undefined) {
						try {
							value = validateAndCanonicalize(object[property], sett.type, sett.validation);
							gConfig.legacySettings.push( internalName(gadget, sett.name) );
							isLegacy = true;
						} catch(er) {} // if validation error, ignore this
					}
				}
				if(!isLegacy) {
					value = readRawSetting(gadget, sett.name)
					if(value == undefined) value = sett.deflt;
					value = validateAndCanonicalize(value, sett.type, sett.validation);
				}
				
				gConfig.settings[gadget][sett.name] = value;
			}
			
			gConfig.registeredGadgets.push(gadget);
			gConfig.readableNames[gadget] = readableName;
			
			if(needSynchro) {
				needSynchro = false;
				gConfig.synchronise(function(){});
			}
			specialPage();
		}
		
		// Return the current value for given setting.
		// 
		// Do note that while integer, numeric and string values will always be of the corresponding JavaScript type,
		// boolean values need not be true/false, but merely truthy/falsy.
		gConfig.get = function(gadget, setting)
		{
			return gConfig.settings[gadget][setting];
		}
		
		// Set the current value for given setting. It is not validated.
		// 
		// For the value to be actually saved, you need to call gConfig.synchronise().
		gConfig.set = function(gadget, setting, value)
		{
			return gConfig.settings[gadget][setting] = value;
		}
		
		
		var needSynchro = false;
		var synchroRunning = false;
		var synchroDelayedCallbacks = [];
		
		// Asynchronously saves current values of all settings.
		gConfig.synchronise = function(callback)
		{
			// a lot of ugly elaborate code to make sure bad things don't happen
			// if synchronise() is called when a synchro is already running.
			
			if(synchroRunning) {
				synchroDelayedCallbacks.push(callback);
				return;
			}
			synchroRunning = true;
			
			var meat = function(){
				var toSave = [];
				for(var i=0; i<gConfig.registeredGadgets.length; i++) {
					var gadget = gConfig.registeredGadgets[i];
					for(var j=0; j<gConfig.data[gadget].length; j++) {
						var setting = gConfig.data[gadget][j].name;
						toSave.push([gadget, setting, gConfig.get(gadget, setting)]);
					}
				}
				
				saveSettings(toSave, function(){
					synchroRunning = false;
					callback();
					if(synchroDelayedCallbacks.length > 0) {
						// this means there were calls to synchronise() while we were working.
						// we need to synchronise again, then call the callbacks.
						var cbs = synchroDelayedCallbacks;
						synchroDelayedCallbacks = [];
						gConfig.synchronise(function(){
							for(var i=0; i<cbs.length; i++) cbs[i]();
						})
					}
				});
			}
			
			if(!optionsToken) {
				api.get({action:'tokens', type:'options'}).done(function(json){
					optionsToken = json['tokens']['optionstoken'];
					meat();
				});
			} else {
				meat();
			}
		}
		
		function inputFor(value, type, validation)
		{
			input = null;
			
			if(type == 'boolean') {
				input = $('<input type=checkbox>').prop('checked', !!value);
			} else if(type == 'string') {
				input = $('<input type=text>').prop('value', value);
			} else if(type == 'integer' || type == 'numeric') {
				input = $('<input type=number>').attr('step', (type == 'integer' ? 1 : 'any'))
				if(validation && $.isArray(validation)) {
					var min = validation[0], max = validation[1];
					input.attr({min: min, max: max});
				}
				input.prop('value', value);
			}
			
			return input;
		}
		
		var nowSaving = false;
		function specialPage()
		{
			if(mw.config.get('wgTitle') != "GadgetPrefs" || mw.config.get('wgCanonicalNamespace') != "Special") return false;
			
			api.get({action:'tokens', type:'options'}).done(function(json){ optionsToken = json['tokens']['optionstoken'] });
			
			
			var onsubmit = function(e){
				if(!nowSaving) {
					nowSaving = true;
					$content.find('.gconfig-pref-error').empty(); // remove infos about invalid values, if any
					
					var toSave = [];
					var errors = [];
					var $inputs = $content.find('input');
					
					for(var i=0; i<$inputs.length; i++) {
						var input = $inputs[i];
						if(input.type == 'submit') continue;
						
						var name = parseInternalName(input.name);
						var gadget = name[0], setting = name[1];
						
						var value = (input.type=='checkbox' ? input.checked : input.value);
						try {
							value = validateAndCanonicalize( value, $(input).data('gconfig-type'), $(input).data('gconfig-validation') );
						}
						catch(err) {
							errors.push([input.name, err]);
							continue;
						}
						
						toSave.push([gadget, setting, value]);
					}
					
					if(errors.length > 0) {
						$('#gconfig-save-status').attr('class', 'gconfig-save-error').text( mw.msg('gConfig-prefs-invalid-values') );
						for(var i=0; i<errors.length; i++) {
							var id = errors[i][0], info = errors[i][1];
							$('#'+id).closest('tr').find('.gconfig-pref-error').text(info)
						}
						nowSaving = false;
					}
					else {
						$('#gconfig-save-status').attr('class', '').text( mw.msg('gConfig-prefs-saving') );
						saveSettings(toSave, function(){
							nowSaving = false;
							$('#gconfig-save-status').attr('class', 'gconfig-save-success').text( mw.msg('gConfig-prefs-saved') );
						})
					}
				}
				
				e.preventDefault();
				return false;
			}
			
			var $content;
			if(gConfig.registeredGadgets.length > 0) {
				$content = $('<table>');
				for(var i=0; i<gConfig.registeredGadgets.length; i++) {
					var gadget = gConfig.registeredGadgets[i];
					$content.append(
						$('<tr>').append(
							$('<td>').attr('colspan', 2).append(
								$('<h2>').text(gConfig.readableNames[gadget])
							)
						)
					);
					
					for(var j=0; j<gConfig.data[gadget].length; j++) {
						var setting = gConfig.data[gadget][j];
						var inputName = internalName(gadget, setting.name);
						
						var $input = inputFor( gConfig.get(gadget, setting.name), setting.type, setting.validation );
						$input.attr('name', inputName).attr('id', inputName);
						$input.data({ 'gconfig-type': setting.type, 'gconfig-validation': setting.validation });
						
						var isLegacy = !!($.inArray(inputName, gConfig.legacySettings) != -1);
						
						$content.append(
							$('<tr>').append(
								$('<td>').append( $input.prop('disabled', !!isLegacy) ),
								$('<td>').append(
									$('<p>').addClass('gconfig-pref-label').append( $('<label>').attr('for', inputName).text(setting.desc) ),
									$('<p>').addClass('gconfig-pref-legacy-note').text( isLegacy ? mw.msg('gConfig-prefs-legacy-setting') : '' ),
									$('<p>').addClass('gconfig-pref-error')
								)
							)
						)
					}
				}
				
				// save button
				$content.append(
					$('<tr>').append(
						$('<td>'),
						$('<td>').append(
							$('<input type=submit>').attr('id', 'gconfig-save-button').attr('value', mw.msg('gConfig-prefs-save') ),
							$('<p>').attr('id', 'gconfig-save-status')
						)
					)
				)
			}
			else {
				$content = $('<p>').text( mw.msg('gConfig-prefs-no-gadgets') );
			}
			
			$form = $('<form>').attr('id', 'gconfig-form').append( $content );
			$form.on('submit', onsubmit);
			$form.on('invalid', onsubmit); // we do our own validation - stop the browser from showing its error messages
			
			var info = $.parseHTML( mw.msg('gConfig-prefs-page-info') );
			document.title = mw.msg('gConfig-prefs-page-title');
			$('h1').first().text( mw.msg('gConfig-prefs-page-title') );
			$('#mw-content-text').empty().append(info, $form);
		}
		
		window.gConfig = gConfig;
		specialPage();
	})
})(mediaWiki, jQuery);