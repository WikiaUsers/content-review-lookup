/*  ______________________________________________________________________________________
 * |                                                                                     |
 * |                    === WARNING: GADGET FILE ===                                     |
 * |                  Changes to this page affect many users.                            |
 * | Please discuss changes on the talk page or on [[MediaWiki_talk:Gadgets-definition]] |
 * |	 before editing.                                                                 |
 * |_____________________________________________________________________________________|
 *
 * "Forms" feature, to be used by the Wikimedia Foundation's Grants Programme
 */
//<nowiki>
var formsGadget = {
	'createDialog' : function(){
		var that = this;
		var dialogDict = {
							dialogClass: 'formsGadget',
							autoOpen: false,
							//title: that.formDict.config['dialog-title'],
							width: '495px',
							modal: true,
							closeOnEscape: true,
							resizable: false,
							draggable: false,
					};
		if($('#formsDialog').length){
			this.dialog = $('#formsDialog').dialog(dialogDict);
		}
		else{
			this.dialog = $('<div id="formsDialog"></div>').dialog(dialogDict);
		}
		$('#formsDialog').append('<div class="loading"></div>');

	},
	'dialog' : null,
	'openPanel': function(){
		this.dialog.dialog('open');
	},
	'openDialog' : function () {
		if (this.dialog === null){
			this.createDialog();
		}
		else{
			this.dialog.dialog('open');
		}
	},
	'cleanupDialog': function (){
		if (this.dialog){
			this.dialog.dialog('destroy');
		}
		this.dialog = null;
		$('#formsDialog').text('');
	},
	'utilities' : {
		/*
		 * Path to the gadget config file
		 */
		'configPath' : 'Naruto Original Content Wiki:FormWizard/Config',
		'apiUrl' : 'https://naruto--oc.fandom.com/api.php?callback=?',
		'getPageTitle': function(){
			return true;
		},
		'grantType' : function(){
			var grant = mw.config.get('wgTitle').split('/')[0].replace(/ /g,'_');
			return grant;
		},
		/*
		 * To detect the users default language
		 */
		'userLanguage' : function(){
			return mw.config.get('wgUserLanguage');
		},
		/*
		 * To detect the language of the page
		 */
		'contentLanguage' : function(){
			return mw.config.get('wgContentLanguage');
		},
		/*
		 * Removes leading/trailing spaces & user signature
		 * ( It is added through the code)
		 */
		'cleanupText' : function(text){
				text = $.trim(text)+' ';
				var indexOf = text.indexOf('~~~~');
				if ( indexOf == -1 ){
					return text;
				}
				else{
					return text.slice(0,indexOf)+text.slice(indexOf+4);
				}
		},
		/*
		 * The config files which can be translated with the help of the
		 * translation tool generates the dict with the values having a
		 * lot of space in the key value pairs. This function strips the
		 * whitespace.
		 */
		'stripWhiteSpace' : function(dict){
			for (key in dict){
				dict[key] = typeof(dict[key]) == 'object' ? this.stripWhiteSpace(dict[key]) : $.trim(dict[key]);
			}
			return dict;
		},
	},
	'formElement' : {
		/*
		 * Elements being supported
		 * Small textbox
		 * Large textbox
		 * Checkbox list
		 * Radio button list
		 * Stepper list
		 * Image/s
		 * Dropdown
		 * Link
		 * Text
		 */
		'hiddenInfoboxFields' : [],
		'found' : false,
		'timestamp' : 0,
		'defaultTextBoxConfig': {
			'type': 'smallTextBox',
			'placeholder': 'Enter the text',
			'title': 'Textbox',
			'characterLength':100,
			'mandatory':false,
			//'validate': '',
			'error-messageLength': 'Max length reached',
			'error-notFilled': 'Mandatory field',
			'value': '',
			'parent': '',
			'id': null,
			'comment': ''
		},
		'elementContainer' : function(){
			var div = document.createElement('div');
			div.className = 'elementContainer';
			return div;
		},
		'addDescription': function(dict,div){
			for (key in dict){
				if(key.indexOf('text') != -1){
					this.addText(div,dict[key],'text');
					delete dict[key];
				}
			}
			return div;
		},
		'checkTitle' : function(string,exists,titleStem,type){
			var that = this;
			var apiUrl = formsGadget.utilities.apiUrl;
			var title = titleStem + string;
			var searchDict = {
					'action':'query',
					'format':'json',
					'titles':title,
					'prop':'imageinfo'
				};
				var timestamp = Date.now();
				console.log('String before ajax', string);
				return $.getJSON(apiUrl,searchDict,function(data){
					var query = data['query'];
					var pages = data['query']['pages'];
					var pageId = Object.keys(pages);
					var pageExists = pageId != -1 ? true : false;
					var imageExists = pages[pageId]['imagerepository'] ? true : false;
					var value = 0;
					if (type == 'image'){
						value = imageExists;
					}
					else{
						value = pageExists;
					}

					if(that.timestamp < timestamp){
						that.timestamp = timestamp;
						that.found =  !(value ^ exists) ;
						//temp
						console.log('String ',string, 'found ',that.found);
					}

				});
		},
		'inputList': function(type,list,title,dict,role){
			var div = this.elementContainer();
			div = this.addText(div,title,'title');
			this.addDescription(dict,div);
			for (elem in list){
				var label = document.createElement('div');
				var input = document.createElement('input');
				var key = list[elem]['key'];
				var value = list[elem]['value'];
				input.type = type;
				if (type == 'number'){
					input.min = dict['min'];
					input.max = dict['max'];
				}
				input.value = value;
				input.setAttribute('data-add-to',dict['add-to']);
				if(role){
					input.setAttribute('data-role',true);
				}
				input.className = 'inputListItem';

				input.setAttribute('data-add-to-attribute',key);
				var descriptionText = key.replace(/_/g,' ');
				descriptionText = descriptionText.slice(0,1).toUpperCase() + descriptionText.slice(1);
				var description = document.createElement('span');
				description.className = 'inputListItemDescription';
				description.textContent = descriptionText;
				label.appendChild(input);
				label.appendChild(description);
				div.appendChild(label);
			}
			return div;
		},
		'createTextBoxConfig':function(defaultConfig,actualConfig){
			var config = {};
			for (key in defaultConfig){
				actualConfig[key] = key in actualConfig? actualConfig[key] : defaultConfig[key];
				if (key == 'mandatory' && (typeof(actualConfig[key]) == 'string')){
					if (actualConfig[key] == 'true'){
						actualConfig[key] = true;
					}
					else{
						actualConfig[key] = false;
					}
				}
			}
			return actualConfig;
		},
		'textBox': function(dict,type,callback,element){
			var config = this.createTextBoxConfig(this.defaultTextBoxConfig,dict);
			var className  = type == 'small'? 'smallTextBox': 'largeTextBox';
			var div = this.elementContainer();

			div = this.addText(div,config['title'],'title');
			this.addDescription(dict,div);
			if (type == 'large'){
				var input = document.createElement('textarea');
			}
			else{
				var input = document.createElement('input');
			}
			//cleanup
			if(dict['visibility'] == 'hidden'){
				div.style['display'] = 'none';
				input.value = dict['value'];
			}
			//Cleanup
			if('page-title' in dict){
				input.setAttribute('page-title',true);
			}
			if (dict['id']){
				input.id = dict['id'];
			}

			input.setAttribute('type','textbox');
			input.setAttribute('class',className);
			input.setAttribute('placeholder',config['placeholder']);
			input.setAttribute('data-character-length',config['characterLength']);
			input.setAttribute('data-mandatory',config['mandatory']);
			input.setAttribute('data-comment',config['comment']);
			input.setAttribute('data-add-to',config['add-to']);
			var conditionalAttr = config['add-to'] == 'infobox' ? config['infobox-param'] : config['section-header'];
			input.setAttribute('data-add-to-attribute',conditionalAttr);
			var that = this;
			/* Word limit */
			$(input).on('change keyup paste',function(){
				/* Checking if link/file/page exists */
				var inputTextBox = this;
				var enteredString = $(this).val();
				if(!enteredString && !dict['mandatory']){
					$('#formsDialog [elemType="button"]').trigger('enableButtons');
					$(inputTextBox).parent().removeClass('entrySatisfying entryNotSatisfying');
					that.timestamp = Date.now();
					that.found = true;
				}
				else{
					if( 'validate' in dict && enteredString){
						var exists = dict['validate'] == 'exists' ? 1:0;
						//$(this).addClass(checkTitle(enteredString,exists));
						var titleStem = 'image' in dict ? '' : that.formDict.config['page-title-stem'];
						$.when(that.checkTitle(enteredString,exists,titleStem,dict['type'])).then(function(){
							//Cleanpup & remove redundant code
							$(inputTextBox).removeClass('entrySatisfying entryNotSatisfying');
							$(inputTextBox).addClass(that.found ? 'entrySatisfying' : 'entryNotSatisfying');
							$(inputTextBox).parent().removeClass('entrySatisfying entryNotSatisfying');
							$(inputTextBox).parent().addClass(that.found ? 'entrySatisfying' : 'entryNotSatisfying');
							if (that.found){
								$('#formsDialog [elemType="button"]').trigger('enableButtons');
								if(typeof(callback) === 'function' && that.found){
									var apiUrl = formsGadget.utilities.apiUrl;
									$.getJSON(apiUrl,{'action':'parse',
												'format':'json',
												'text':'[['+enteredString+']]'
											},function(data){
												console.log(data['parse']['text']['*']);
												var src = $('<div>').html(data['parse']['text']['*']).find('img').attr('src');
												if(src){
													callback(element, src);
												}
											});
								}
							}
							else{
								$('#formsDialog [elemType="button"]').trigger('disableButtons');
							}
						});
					}
				}

			});
			//To show validation

				inputElementWrapper = document.createElement('span');
				$(inputElementWrapper).addClass('inputElementWrapper');
				if('validate' in dict){
					$(inputElementWrapper).addClass('validationContainer');
				}
				if(dict['mandatory']){
					$(inputElementWrapper).addClass('mandatoryContainer');
				}
				inputElementWrapper.appendChild(input);
				div.appendChild(inputElementWrapper);

			return div;
		},
		'smallTextBox': function (dict,callback,element) {
			return this.textBox(dict,'small',callback,element);
		},
		'largeTextBox': function (dict,callback,element) {
			return this.textBox(dict,'large',callback,element);
		},
		'checkboxList': function (dict) {
			var list = dict['choiceList'];
			var hidden = dict['hidden'];
			if('hidden' in dict){
				this.hiddenInfoboxFields = this.hiddenInfoboxFields.concat(dict['hidden']);
			}
			return this.inputList('checkbox',list,dict['title'],dict);
		},

		'addText': function(container,text,type){
			var textHolder = $('<p>');
			textHolder.text(text);
			if (type == 'title'){
				textHolder.addClass('title');
			}
			else if (type == 'text'){
				textHolder.addClass('text');
			}
			else{
				textHolder.addClass(type);
			}
			container.appendChild(textHolder[0]);
			return container;
		},
		'text': function(dict){
			var textHolder = $('<p>');
			return textHolder.text(dict['string'])[0];
		},
		'stepperList': function (dict) {
			var list = dict['choiceList'];
			if('hidden' in dict){
				this.hiddenInfoboxFields = this.hiddenInfoboxFields.concat(dict['hidden']);
			}
			dict['min'] = 0;
			if(!('max' in dict)){
				dict['max'] = 9;
			}
			return this.inputList('number',list,dict['title'],dict,true);
		},
		'dropdownList': function(dict){
			var div = this.elementContainer();
			div = this.addText(div,dict['title'],'title');
			this.addDescription(dict,div);
			var values = dict['values'];
			var select = document.createElement('select');
			select.setAttribute('type','textbox');
			select.setAttribute('class','dropdown');
			select.setAttribute('data-placeholder',dict['placeholder']);
			select.setAttribute('data-add-to',dict['add-to']);
			select.setAttribute('data-add-to-attribute',dict['infobox-param']);
			var option;
			for (elem in values){
				/*
				option = document.createElement('option');
				option.value = values[elem];
				option.innerText = values[elem];
				select.appendChild(option);
				*/
				option = $('<option>').attr('value',values[elem]).text(values[elem]);
				select.appendChild(option[0]);
			}
			/*
			$('.formsGadget .dropdown').chosen({
								disable_search: true,
								width: '50%',
							})*/
			div.appendChild(select);
			return div;
		},
		'link': function(dict){
			var link = document.createElement('a');
			link.href = 'href' in dict? dict['href'] : 'https://commons.wikimedia.org/wiki/Main_Page';
			link.target = '_blank';
			var innerText = 'link' in dict? dict['link'] : 'Search Wikimedia Commons for an image';
			$(link).text(innerText);
			return link;
		},
		'image': function (dict) {
			var url = dict['url'];
			var text = dict['title'];
			dict['add-to'] = 'infobox';
			dict['infobox-param'] = 'image';
			dict['validate'] = 'exists';
			//cleanup
			dict['placeholder'] = 'placeholder' in dict ? dict['placeholder'] : 'File:Test.png';
			var div = this.elementContainer();
			this.addText(div,dict['title'],'title');
			this.addDescription(dict,div);
			var img = document.createElement('img');
			img.src = url;
			dict['title'] = 'imageTitleBox' in dict ? dict['imageTitleBox'] : 'Enter the file name';
			//cleanup
			dict['image'] = true;
			var textbox = this.smallTextBox(dict,function(elem,src){
				img.src = src;
			},img);
			var description = document.createTextNode(text);
			div.appendChild(img);
			div.appendChild(textbox);
			var commonsLink = this.link(dict);
			div.appendChild(commonsLink);
			return div;
		},
		'button': function(type,text){
			var a = document.createElement('input');
			a.type='submit';
			a.setAttribute('elemType','button');
			if(type == 'cancel' || type == 'back'){
				a.className = 'mw-ui-button cancel mw-ui-quiet';
			}
			else {
				a.className = 'mw-ui-button mw-ui-constructive';
			}
			a.value = text;
			$(a).on('disableButtons',function(){
				$(this).attr('disabled',true);
			});
			$(a).on('enableButtons',function(){
				$(this).attr('disabled',false);
			});
			return a;
		},
		'cancelButton': function(dict){
			var button = this.button('cancel',dict['title']);
			button.onclick = function(){
				formsGadget.dialog.dialog('close');
			};
			return button;
		},
		'doneButton': function(dict){
			var that = this;
			var button = this.button('done',dict['title']);
			button.onclick = function(){
				that.validateForm();
			};
			return button;
		},
		'nextButton': function(dict){
			var button = this.button('next',dict['title']);
			var that = this;
			button.onclick = function(){
				$('#formsDialog [step]').hide();
				$('#formsDialog'+' #'+dict['step']).next().show();
			};
			return button;
		},
		'backButton': function(dict){
			var button = this.button('back',dict['title']);
			var that = this;
			button.onclick = function(){
				$('#formsDialog [step]').hide();
				$('#formsDialog'+' #'+dict['step']).prev().show();
			};
			return button;
		},
		'validateForm': function(){
			var counter = 0;
			var firstElem;
			$('#formsDialog [data-mandatory="true"]').each(function(){
				var elem = $(this);
				if(!elem.val()){
					if (counter == 0){
						firstElem = elem;
					}
					counter++;
					elem.addClass('mandatoryInput');
				}
			});
			//Add mandatory filed Event & styling
			if(firstElem){
				$('#formsDialog [step]').hide();
				while(true){
					if (firstElem.attr('step')){
						firstElem.show();
						break;
					}
					firstElem = firstElem.parent();
				}
			}
			else{
				if (formsGadget.type == 'create'){
					this.createWikiPage();
				}
				else{
					this.modifyWikiPage();
				}
			}
		},
		'infoboxString': '',
		'remainingSectionString': '',
		'extractInfobox' : function(markup, infoboxTemplate){
			var startIndex = markup.indexOf('{{' + infoboxTemplate);
			var counter = 0;
			var endIndex = 0;
			for (i=startIndex;i<markup.length;i++){
				if(markup[i] == '}' && markup[i+1] == '}'){
						counter++;
				}
				if(markup[i] == '{' && markup[i+1] == '{'){
					counter--;
				}
				if(counter == 0){
					var endIndex = i+2;
					break;
				}
			}
			if (counter != 0){
				return '';
			}
			var infobox = {
				'infobox' : markup.slice(startIndex,endIndex),
				'before' : markup.slice(0,startIndex),
				'after' : markup.slice(endIndex),
			};
			return infobox;
		},
		'infoboxObjectify': function(infoboxString){
			var paramRe = /( )*\|( )*[A-Za-z0-9_]+( )*=/gi;
			//this.extractInfoboxString(wikitext);
			var units = infoboxString.split('\n');
			var infobox = [];
			var infoboxParams = {};
			var parts,line,param,value;
			for (unit in units){
				line = units[unit];
				if(line.search(paramRe) != -1){
					parts = line.split('=');
					param = $.trim(parts[0].replace('|',''));
					value = $.trim(parts[1]);
					//infoboxParams[param] = value;
					infobox.push({'param': param, 'value': value});
				}
				else{
					infobox.push($.trim(line));
				}
			}
			return infobox;
		},
		'modifyInfoboxParam': function(infobox,param,newValue){
			var flag = true;
			for (elem in infobox){
				if(typeof(infobox[elem]) == 'object' && infobox[elem]['param'] == param){
					infobox[elem]['value'] = newValue;
					flag = false;
				}
			}
			if (flag){
				infobox.splice(-1,0,{'param':param, 'value':newValue});
			}
			return infobox;
		},
		'stringifyInfobox' : function(infobox){
			var infoboxString = '';
			for (elem in infobox){
				if (typeof(infobox[elem]) == 'object'){
					if(infobox[elem]['value']){
						infoboxString = infoboxString + '|' + infobox[elem]['param'] + '=' + infobox[elem]['value'] + '\n';
					}
					else{
						infoboxString = infoboxString + '|' + infobox[elem]['param'] + '=' + '\n';
					}
				}
				else{
					infoboxString = infoboxString + infobox[elem] +'\n';
				}
			}
			return infoboxString;
		},
		'createEditSummary' : function(title,subcomment){
			var summary = '';
			var formsConfig = formsGadget.formDict['config'];
			if (formsConfig['edit-comment-prefix']){
				summary = formsConfig['edit-comment-prefix'] + ' ';
			}
			else{
				summary = formsConfig['edit-comment-default'] + ' ';
			}
			if(subcomment){
				summary = summary + title + ' (' + subcomment + ') ';
			}
			else{
				summary = summary + title + ' ';
			}
			if (formsConfig['edit-comment-suffix']){
				summary = summary + formsConfig['edit-comment-suffix'];
			}
			return summary;
		},
		'modifyWikiPage' : function(){
			var that = this;
			var infobox = '';
			var infoboxString = '';
			var sections = '';
			var api = new mw.Api();

			var roots = this.wikiSectionTree.roots;

			for (elem in roots){
				console.log('---------');
				this.wikiSectionTree.traverse([roots[elem]],1,function(id){
					var elem = $('#formsDialog #'+id);
					value = elem.val() ? elem.val() : '';
					var heading = elem.attr('data-add-to-attribute');
					return { 'heading': heading, 'value': value};
				});
			}
			//Disabling buttons on ajax post
			$('#formsDialog [elemType="button"]').trigger('disableButtons');

			//should not hard code '/Toolkit'
			var title = mw.config.get('wgPageName').replace('/Toolkit','');
			//Getting the infobox
			var gettingInfobox = api.get({
						'format':'json',
						'action':'query',
						'prop':'revisions',
						'rvprop': 'content',
						'rvsection':0,
						'titles': title,
					}).then(function(result){
						var pages = result.query.pages;
						var key = Object.keys(result.query.pages)[0];
						var content = pages[key]['revisions'][0]['*'];
						var infoboxTemplate = formsGadget.formDict.config['infobox'] ? formsGadget.formDict.config['infobox'] : 'Probox/Idealab';
						var elements = that.extractInfobox(content, infoboxTemplate);
						var infobox = that.infoboxObjectify(elements['infobox']);
						var before = elements['before'];
						var after = elements['after'];
						$('#formsDialog [data-add-to]').each(function(index,elem){
							var elem = $(elem);
							if(elem.attr('data-add-to') == 'infobox' ){
								if(elem.attr('type') == 'checkbox'){
									if (elem.is(':checked')){
										infobox = that.modifyInfoboxParam(infobox,elem.attr('data-add-to-attribute'),elem.val());
									}
									else{
										infobox = that.modifyInfoboxParam(infobox,elem.attr('data-add-to-attribute'),null);
									}
								}
								else if(elem.attr('data-role')){
									for (var i=0;i<elem.val(); i++){
										infobox = that.modifyInfoboxParam(infobox,elem.attr('data-add-to-attribute')+(i+1), null);
									}
								}
								else{
									infobox = that.modifyInfoboxParam(infobox,elem.attr('data-add-to-attribute'),elem.val());
								}
							}
						});
						/*
						* infobox entries
						*/
						var hiddenFields = that.hiddenInfoboxFields;
						for(entry in hiddenFields){
							infobox = infobox.push({'param':hiddenFields[entry]['key'],'value':hiddenFields[entry]['value']});
						}
						var modifiedSection = before + $.trim(that.stringifyInfobox(infobox)) + after;
						var formsConfig = formsGadget.formDict['config'];
						api.post({
							'action' : 'edit',
							'title' : title,
							'text' : modifiedSection,
							'summary' : that.createEditSummary(title,'editing infobox parameters'),
							'section': 0,
							'watchlist':'watch',
							'token' : mw.user.tokens.get('csrfToken')
						}).then(function(){
							var newSections = '\n' + that.wikiSectionTree.sections;
							api.post({
								'action' : 'edit',
								'title' : title,
								//'text' : sections,
								'summary' : that.createEditSummary(title,'editing section'),
								'appendtext':newSections,
								'watchlist':'watch',
								'token' : mw.user.tokens.get('csrfToken')
							}).then(function(){
								// Redirecting to idea page
								console.log('Successfully Added new sections & modified the infobox');
								var postEditMessage = formsGadget.formDict['config']['post-edit'];
								//Cleanup
								formsGadget.dialog.dialog('close');
								mw.cookie.set('formsGadgetNotify',postEditMessage);
								window.location.href = location.origin + '/wiki/' + title;
							});
						});
					});
		},
		'createWikiPage' :  function(){
			var that = this;
			var infobox = '';
			var page = '';
			var api = new mw.Api();
			var pageTitle = $('#formsDialog [page-title]').val();

			var roots = this.wikiSectionTree.roots;

			for (elem in roots){
				console.log('---------');
				this.wikiSectionTree.traverse([roots[elem]],1,function(id){
					var elem = $('#formsDialog #'+id);
					value = elem.val() ? elem.val() : '';
					var heading = elem.attr('data-add-to-attribute');
					var comment = elem.attr('data-comment');
					return { 'heading': heading, 'value': value, 'comment': comment };
				});
			}

			$('#formsDialog [data-add-to]').each(function(index,elem){
				var elem = $(elem);
				if(elem.attr('data-add-to') == 'section' ){
					//var value = elem.val() ? elem.val() : '';
					//var section = '==' + elem.attr('data-add-to-attribute') + '==' + '\n' + elem.val() + '\n';
					//page = page + section;
				}
				else{
					//Cleanup & Simplify
					if (elem.attr('data-role')){
						for (var i=0;i<elem.val(); i++){
							infobox = infobox + '|'+ elem.attr('data-add-to-attribute') + (i+1) + '=\n';
						}
					}
					else if(elem.attr('type') == 'checkbox'){
						if (elem.is(':checked')){
							infobox = infobox + '|'+ elem.attr('data-add-to-attribute') + '=' + elem.val() + '\n';
						}
						else{
							infobox = infobox + '|'+ elem.attr('data-add-to-attribute') + '=\n';
						}
					}
					//Fix this hardcoding more elegantly
					else if(elem.attr('data-add-to-attribute') == 'image'){
						var image = elem.val() ? elem.val() : elem.attr('placeholder');
						infobox = infobox + '|'+ elem.attr('data-add-to-attribute') + '=' + image + '\n';
					}
					else{
						infobox = infobox + '|'+ elem.attr('data-add-to-attribute') + '=' + elem.val() + '\n';
					}
				}
			});
			/*
			* infobox entries
			*/
			var hiddenFields = this.hiddenInfoboxFields;
			for(entry in hiddenFields){
				infobox = infobox + '|' + hiddenFields[entry]['key'] + '=' + hiddenFields[entry]['value'] + '\n';
			}
			//Hardcoding creator/timestamp

			infobox = infobox + '|' + 'timestamp = ~~~~~' + '\n' ;
			infobox = infobox + '|' + 'creator = ' + mw.user.getName() + '\n' ;
			//infobox = infobox.join('');

			var probox = this.formDict.config['infobox'] ? this.formDict.config['infobox'] : 'Probox/Idealab';
			infobox = '{{' + probox + '\n' + infobox + '}} \n';
			page = infobox + this.wikiSectionTree.sections;

			/*
			 * Creating a new page
			 *
			 */

			var title = formsGadget.formDict['config']['page-title-stem'] + pageTitle;
			//Disabling buttons on ajax post
			$('#formsDialog [elemType="button"]').trigger('disableButtons');
						api.post({
						'action': 'edit',
						//Cleanup
						'title': title,
						'summary': that.createEditSummary(title),
						'text': page,
						'watchlist':'watch',
						token: mw.user.tokens.get('csrfToken')
					}).then(function () {
						//Creating Idea Toolkit
						var formsConfig = formsGadget.formDict['config'];
						var toolkit = formsConfig['toolkit-name'];
						var toolkitContent = '{{' + formsConfig['toolkit-template'] + '}}';
						var createToolkit = true;
						if (toolkit && toolkitContent){
							var toolkitTitle = title + '/' + toolkit;
							var summary = 'Adding the toolkit for ' + title;
							createToolkit = api.post({
								'action': 'edit',
								//Cleanup
								'title': toolkitTitle,
								'summary': summary,
								'text': toolkitContent,
								'watchlist':'watch',
								token: mw.user.tokens.get('csrfToken')
							});
						}

						// Redirecting to idea page
						console.log('Successfully created new page');
						//Cleanup
						$.when(createToolkit).then(function(){
							formsGadget.dialog.dialog('close');
							var postEditMessage = formsGadget.formDict['config']['post-edit'];
							mw.cookie.set('formsGadgetNotify',postEditMessage);
							window.location.href = location.origin + '/wiki/' + title;
						},function(){
							$('#formsDialog [elemType="button"]').trigger('enableButtons');
						});
					},function(){
						$('#formsDialog [elemType="button"]').trigger('enableButtons');
					});

			console.log(title,page);
		}
	},
	'createForm' : function(formDict){
		//cleanup fixing the fallbacks
		formDict.config['page-title-stem'] = formDict.config['namespace'] + formDict.config['portal-page'];
		this.formDict = formDict;
		this.formElement.formDict = formDict;
		this.formElement.wikiSectionTree = this.wikiSectionTree;
		var dialogInternal = document.createElement('div');
		//User not logged in
		if (! mw.user.getName()){
			var errorMessage = formDict['config']['error-not-logged-in'];
			var errorDiv = document.createElement('div');
			errorDiv.className = 'mw-ui-vform';
			this.formElement.addText(errorDiv,errorMessage,'error');
			dialogInternal.appendChild(errorDiv);
		}
		var counter = 0;
		for (step in formDict){
			if (step != 'config'){
				counter++;
				var stepDict = formDict[step];
				var panel = document.createElement('div');
				panel.id = step;
				if(counter != 1){
					panel.style['display'] = 'none';
				}
				panel.setAttribute('step',step);
				for (elem in stepDict){
					elemDict = stepDict[elem];
					elemDict['elem'] = elem;
					elemDict['step'] = step;
					elemDict['id'] = elem;
					panel.appendChild(this.formElement[elemDict.type](elemDict));
					//Creating the hierarchial structure of the sections & subsections
					if (elemDict['add-to'] == 'section' ){
						var parent = 'parent' in elemDict ? elemDict['parent'] : null;
						var node = elem;
						if(parent){
							this.wikiSectionTree.addLink(parent,node);
						}
						else{
							this.wikiSectionTree.addLink(node);
						}

					}
				}
				dialogInternal.appendChild(panel);
			}
		}
		$('#formsDialog').append(dialogInternal);
		$('.formsGadget .dropdown').chosen({
								disable_search: true,
								width: '50%',
						});
		return true;
	},
	'Tree' : function(){
		var rootList = {};
		var nodeList = {};
		this.sections = '';
		this.roots = rootList;
		var node = function(parent,child,id){
			this.parent = parent;
			this.id = id;
			this.child = child;
		};
		var getNode = function(id){
			if (id in nodeList){
				return nodeList[id];
			}
			else{
				var Node = new node(null,null,id);
				nodeList[id] = Node;
				rootList[id] = Node;
				return Node;
			}
		};
		this.addLink = function(startId,endId){
			if (endId){
				var startNode = getNode(startId);
				var endNode = getNode(endId);
				endNode.parent = startNode;
				if (startNode.child){
					startNode.child.push(endNode);
				}
				else{
					startNode.child = [endNode];
				}
				delete rootList[endNode.id];
			}
			else{
				getNode(startId);
			}
		};
		var sectionLevel = function(indent){
			var string = '';
			for (var i=0;i<indent;i++){
				string = string + '=';
				}
			return string;
		};
		this.traverse = function(rootList,level,callback){
			if(!rootList){
				return;
			}
			level++;
			var wikiSectionHeaderMarkup = sectionLevel(level);
			for (elem in rootList){
				var root = rootList[elem];
				var sectionValues = callback(root.id);
				var section = wikiSectionHeaderMarkup + sectionValues['heading'] + wikiSectionHeaderMarkup + '\n' ;
				var section = section + ( sectionValues['comment'] ? sectionValues['comment'] + '\n' : '' ) + sectionValues['value'] + '\n';
				this.sections = this.sections + section;
				root = root.child;
				this.traverse(root,level,callback);
			}
		};
	}
};

// Check if [[MediaWiki:Gadget-formWizard.js]] set window.FormsGadget_enabled.
// If it did, load our dependencies and initialise the forms gadget.
if (window.FormsGadget_enabled) {
	$.when(
		mw.loader.using(['mediawiki.api', 'mediawiki.cookie', 'mediawiki.ui', 'mediawiki.user', 'jquery.chosen' , 'jquery.ui']),
		$.ready
	).then(function(){
		var api = new mw.Api();
		var utility = formsGadget.utilities;

		//Showing Post edit feedback if any
		var postEditMessage = mw.cookie.get('formsGadgetNotify');
		//Show post edit message
		if(postEditMessage){
			//clearing the cookie
			mw.cookie.set('formsGadgetNotify', null);

			//displaying the post edit message
			mw.notify(postEditMessage,{autoHide:false});
		}

		$('.wp-formsGadget').click(function(e){
			e.preventDefault();

			formsGadgetType = $(this).attr('data-type') || 'Idea';
			formsGadgetMode = $(this).attr('data-mode') || 'create';

			formsGadget.cleanupDialog();
			formsGadget.openDialog();
			formsGadget.openPanel();

			$('#formsDialog .loading').show();


			var configFullPath = utility.configPath+'/'+formsGadgetType+'/'+utility.userLanguage();

			api.get({'action':'query','titles':configFullPath,'format':'json'}).then(function(data){
				for (id in data.query.pages){
						if (id == -1){
							configFullPath = utility.configPath+'/'+formsGadgetType+'/en';
						}
				}
				var configUrl = 'https://meta.wikimedia.org/w/index.php?title='+configFullPath+'&action=raw';
				//Get the config for the detected language

				$.when(jQuery.get(configUrl)).then(function(dataStr){
					var data = RJSON.parse( dataStr );
					var config = utility.stripWhiteSpace(data[formsGadgetMode]);
					formsGadget['formDict'] = config;
					//Cleanup
					$('.formsGadget .ui-dialog-title').text(config.config['dialog-title']);
					formsGadget['wikiSectionTree'] = new formsGadget.Tree();
					formsGadget.openDialog();
					formsGadget.createForm(config);
					formsGadget.type = formsGadgetMode;
					formsGadget.openDialog();
					$('#formsDialog .loading').hide();
				});
			});
		});
	});
}
// </nowiki>