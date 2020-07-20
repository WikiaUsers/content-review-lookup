/*************

Generates a skeleton template data for a given template

Author User:Salix alba
Date: 28 July 2013
Version: 0.20

Heavily borrowed from TemplateDataEditor
http://fr.wikipedia.org/w/index.php?title=Utilisateur:Ltrlg/scripts/TemplateDataEditor.js

 ***************/



function TDSkel($) {

	////// Customization for local wikis

	lang = mw.config.get('wgUserLanguage');
	messages = {
			"en": {
				"toolbox-label": 'TD Skeleton',
				"toolbox-tooltip": 'Generates a skeleton of the TemplateData for a given template',
				"title": 'Skeleton TemplateData for ',
				'section-description': 'TemplateData',
				"close": 'Close'
			},
			"fr": {
				"toolbox-label": 'Ébauche de TD',
				"toolbox-tooltip": "Génère une ébauche pour le TemplateData d'un modèle",
				"title": 'Ébauche de TemplateData pour ',
				"section-description": 'TemplateData',
				"close": 'Fermer'
			},
                        "pt": {
                                "toolbox-label": 'Esqueleto de TD',
                                "toolbox-tooltip": 'Gera um esqueleto de TemplateData para uma predefinição dada',
                                "title": 'Esqueleto de TemplateData para ',
                                'section-description': 'TemplateData',
                                "close": 'Fechar'
                        },
                        "pt-br": {
                                "toolbox-label": 'Esqueleto de TD',
                                "toolbox-tooltip": 'Gera um esqueleto de TemplateData para uma predefinição dada',
                                "title": 'Esqueleto de TemplateData para ',
                                'section-description': 'TemplateData',
                                "close": 'Fechar'
                        }
	};
        if(messages[lang]==null) lang='en';

	// gets the basetemplate name, on en strips the /doc off the end

	function baseTemplateName(name) {
		return name.replace(/\/doc$/,"");
	}

	////// Global variables

	var $title, $body, $cont;
	var pagename;

	////// Called when toolbox link clicked

	function openSkel() {
		var fullpagename = mw.config.get('wgPageName');
		pagename = baseTemplateName(fullpagename);

		var URL = mw.util.wikiScript();
		$.ajax({
			url: URL,
			data: { title: pagename, action: "raw" },
			dataType: "text"
		}).done(doneAjax);
	}

	/////// Called when raw template code read in

	function doneAjax(data) {
		var params = findParams(data);
                var defaults = findDefaults(data,params);
		var code = generateSkel(params);
		//var aliases = findAliases(params);
                var aliases = genAliases(defaults);
		$cont.fadeIn('slow');

		$title.text( messages[lang]['title'] + pagename );
		$body.html( $('<textarea>')
				.attr('id', 'td-sk-code')
				.text(code+'\n'+aliases)
		);
	}

	////// Find all the possible parameters given the raw template data
        ////// return a 2D array with names and whether its probably required [ [1,true], [2,false], [link,false] ]

	function findParams(data) {
		//console.log("findParams");
		var pat = /\{\{\{([^\{\|\}\n<]+)(.)/g;  // '{{{' then any char other than {|}\n< 
		var matches;
		var obj = new Object();
		while((matches=pat.exec(data)) != null) {
                    var newReq = ( matches[2]== '}' );
                    var oldReq = ( obj[matches[1]] == null || obj[matches[1]] ); 
  	            //.log("V2 " + matches[1] + ' m2 ' + matches[2] + ' old ' + oldReq + ' new ' + newReq );
 
  	            obj[matches[1]] = newReq && oldReq;
                    pat.lastIndex--; // need to backtrack one character
                        
		}
		var params = new Array();
		var i=0;
                // put required first
		for(var x in obj) {
                    if(obj[x]) {
  		        //console.log("Var " + x + ' req ' + obj[x]);
			params[i++] = [x, obj[x]];
                    }
		}
                // then the rest
		for(var x in obj) {
                    if(!obj[x]) {
  		        //console.log("Var " + x + ' req ' + obj[x]);
			params[i++] = [x, obj[x]];
                    }
		}
		//console.log("findParams done");
		return params;
	}

        function findDefaults(data,params) {
            var res=new Object();
            for(var i=0;i<params.length;++i) {
                var pat = new RegExp("\\{\\{\\{"+params[i][0]+"\\|([^\\|\\}\\n<]*)","g");
		var matches;
		var obj = new Object();
                obj.aliases=new Object();
                obj.defaults=new Object();
                obj.count=0;
                obj.nalias=0;
                obj.ndefault=0;
		while((matches=pat.exec(data)) != null) {
                    ++obj.count;
                    if(matches[1]=="") {
                         obj.blank=1;
                    } else if(matches[1].slice(0,3)=="{{{") {
                         ++obj.nalias;
                         obj.aliases[matches[1].slice(3)]=1;
                    } else {
                         ++obj.ndefault;
                         obj.defaults[matches[1]]=1;
                    }
                }
                res[params[i][0]]=obj;
            }
            return res;
        }

// "name": { "default": 123, "aliases": [ "foo", "bar" ], "required": true }
        function genAliases(defaults) {
            var res="\nPossible defaults and aliases\n\n";
            for(var p in defaults) {
                var obj=defaults[p];
                res += '"' + p + '": { ';
                if(obj.ndefault==1) {
                      res += '"default": ';
                      for(var d in obj.defaults) {
                          res += '"'+d+'", ';
                      }
                }
                if(obj.nalias>0) {
                      res += '"aliases": [';
                      var c=0;
                      for(var a in obj.aliases) {
                          if(c>0) res += ',';
                          res += '"'+a+'"';
                      }
                      res += '], ';
                }
                if(obj.count==0) res += '"required": true ';
                else  res += '"required": false ';
                res += '}\n';
            }
            return res;
        }

	///// Generate the skeleton code for the template data
	function generateSkel(params) {
		//console.log("generateSkel");

		var res="";
		res += '<' +'templatedata>\n';
		res += '{\n';
		res += '    "description": "insert description here",\n';
		res += '    "params": {\n';
		for(var i = 0; i < params.length; ++i)
		{
			res += '        "' + params[i][0] + '": {\n';
			res += '            "label": "' + params[i][0] + '",\n';
			res += '            "description": "",\n';
			res += '            "type": "string",\n';
			res += '            "required": '+ params[i][1] +'\n';
			res += '        }';
			if(i < params.length-1 ) res += ',';
			res += '\n';
		}
		res += '    }\n';
		res += '}\n';
		res += '<'+'/templatedata>\n';
		return res;
	} 

        function findAliases(data) {
 		//console.log("findParams");
		var pat = /\{\{\{([^\{\|\}<]+)\|\{\{\{([^\{\|\}<]+)/g;  
		var matches;
		var obj = new Object();
		while((matches=pat.exec(data)) != null) {
  	            //console.log("Alias " + matches[1] + ' and ' + matches[2] );
 
  	            obj[matches[1]] = newReq && oldReq;
                    pat.lastIndex -= matches[2].length + 3 ; // need to start of second param
		}
        }

	///// Close the dialog
	function close() {
		$cont.fadeOut('slow', function(){
		});
	}

	////////// Building called after page loads 
	function buildHTML() {
		$body = $('<div>')
		.attr('id', 'td-sk-body');
		$title = $('<h2>').text( messages[lang]['title'] );
		$cont = $('<div>')
		.attr('id', 'td-sk-cont')
		.append($('<div>')
				.attr('id', 'td-sk-dialog')
				.append( $title )
				.append($('<a>')
						.attr({
							id: 'td-sk-close',
							href: '#',
							title: messages[lang]['close']
						})
						.click(function(){
							close();
							return false;
						})
						.append($('<img>')
								.attr({
									alt: messages[lang]['close'],
									src: '//upload.wikimedia.org/wikipedia/commons/thumb/8/8d/VisualEditor_-_Icon_-_Close.svg/24px-VisualEditor_-_Icon_-_Close.svg.png'
								})
						)
				)
				.append($body)
		)
		.hide();

		$(document.body).append($cont);
	}

	////// Adds a link in the toolbox
	function addPortletLink() {

		$(
				mw.util.addPortletLink('p-tb', '#', messages['en']['toolbox-label'], 'td-skel', messages['en']['toolbox-tooltip'] )
		).click(function(){
			openSkel();
			return false;
		})
	}

	/////// Actions to do once page loads, 
	function start() {
		//alert("TDSkel 0.21" + mw.config.get( 'wgPageName' ));
		addPortletLink();
		buildHTML();
	}

	////////// START //////////
	start(); 
}

/////// Wrapper code, only run if in user or template namespaces
if( $.inArray( mw.config.get('wgNamespaceNumber'), [ 2, 10 ] ) !== -1 
/* && $.inArray( mw.config.get('wgAction'), [ 'edit', 'submit' ] ) !== -1  */ ) {
	mw.loader.load( 
  	  '//en.wikipedia.org/w/index.php?title=User:Salix alba/TDSkell.css&action=raw&ctype=text/css&smaxage=21600&maxage=86400',
	'text/css' );
        mw.loader.using('mediawiki.util', function(){
	  $(document).ready(TDSkel);
        });
}