/*
Autocomplete for links and templates
Written by [[משתמש:ערן]]
*/
mw.loader.using(['jquery.ui.widget','jquery.ui.autocomplete','jquery.textSelection'],function(){
//extends jquery with autoCompleteWikiText functionality for autocomplete of links and templates
$.fn.autoCompleteWikiText=function(options){
	var mode="none";
	var ctrl=$(this);
	var settings = $.extend(true, {
		positionMy: $('body').is('.rtl')? "left top" : "right top", // be default, open below the control
		positionAt: $('body').is('.rtl')? "left bottom" : "right bottom",
		positionOf: ctrl, 
		positionOffset: "0",
		filterResponse: function(a){return a;}, // function that expects array of string and returns array of strings
		menuCSS: {width: 'auto', maxHeight: '30em', 'overflow-y': 'auto'},
		itemCSS: {},
		onselected: function(item){
			var pos=ctrl.textSelection('getCaretPosition')-1;
			var txt=ctrl.val();
			var link = mode == "link",
				open = link ? "[[" : "{{",
				close = link ? "]]" : "|}}",
				caretBackwards = link ? 0 : 2;
			switch(mode){
			case "none": return;
			case "template":
				item=item.substr(mw.config.get('wgFormattedNamespaces')[10].length+1);
				link = false;
				caretBackwards = 2;
				break;
			case "link":
				if(item[item.length-1]==')') item+='|';
				break;
			}
			var lastbegin=txt.lastIndexOf(open, pos);
			if (txt[lastbegin + 2] == ':')
				item = ':' + item;

			var newTxt=txt.substr(0,lastbegin)+ open +item+ close + txt.substr(pos+1);
			var orgScroll=ctrl.scrollTop();
			ctrl.val(newTxt);
			ctrl.textSelection('setSelection',{start:lastbegin + (open+item+close).length - caretBackwards});
			ctrl.scrollTop(orgScroll);
		}
	}, options);

	function findLinks(res){
		var pos=ctrl.textSelection('getCaretPosition')-1;
		var txt=ctrl.val();

		var lastbegin=txt.lastIndexOf("[[",pos);
		var lastend=txt.lastIndexOf("]]",pos);
		var isLink=lastbegin>lastend;
		if(isLink) {
			fillLinksList(res,txt.substr(lastbegin+2,pos-lastbegin));
			mode='link';
		}
		else{
			lastbegin=txt.lastIndexOf("{{",pos);
			lastend=txt.lastIndexOf("}}",pos);
			var isTemplate=lastbegin>lastend;
			if(isTemplate){
				var prefixName=mw.config.get('wgFormattedNamespaces')[10]+':'+txt.substr(lastbegin+2,pos-lastbegin);
				fillLinksList(res,prefixName);
				mode='template';
			}
			else{
				res([]);
				mode="none";
			}
		}
	}

	function fillLinksList(res,txt){
        txt = $.trim(txt);
		if(txt.length<=1 || txt.indexOf('|')>-1 || (txt.indexOf('#')>-1 && mw.config.get('wgNamespaceNumber')==0)) res([]);
		else if(txt.indexOf('#')>-1){ 
			var pageTitle=txt.substr(0,txt.indexOf('#'));
			var sectionPrefix=txt.substr(txt.indexOf('#')+1);
			$.getJSON(mw.util.wikiScript('api'),{action:'parse',page:pageTitle,prop:'sections',format:'json'},function(data){
				if(data && data.parse && data.parse.sections) res($(data.parse.sections).map(function(){return this.line.indexOf(sectionPrefix) ==0 ? (pageTitle+'#'+this.line):null;
				}));
			});
		}
		else $.getJSON(
            mw.util.wikiScript('api'),
            {action:'opensearch', search:txt, format:'json'},
            function(data){
                if(data[1]) 
                    res(settings.filterResponse(data[1]));
            });
	}

	ctrl.autocomplete( {
					source: function( request, response ) {
						if(fixArrowsBug(this))
							response([]);
						else
							findLinks(response);
					},
					focus:function(){return false;},
					select:function(e,ui){
						settings.onselected(ui.item.value);return false;
					},
					open:function(){
						$(".ui-autocomplete")
							.css(settings.menuCSS)
							.position({
								my: settings.positionMy,
								at: settings.positionAt,
								of: settings.positionOf,
								offset: settings.positionOffset,
								collision: 'none fit'
								})
							.find('li').css(settings.itemCSS);
					}
	});
	var fixed=false;
	//this is hack to prevent known serious bug in autocomplete.js that prevent default of the up and down key which may drive you crazy....
	function fixArrowsBug(self){
	if(fixed) return false;
	fixed=true;
	ctrl.unbind("keydown.autocomplete");
	ctrl.bind("keydown.autocomplete",
		function(event) {
			var keyCode = $.ui.keyCode;
			switch( event.keyCode ) {
				case keyCode.PAGE_UP:
					self._move( "previousPage", event );
					break;
				case keyCode.PAGE_DOWN:
					self._move( "nextPage", event );
					break;
				case keyCode.UP:
										if (!self.menu.element.is(":visible")) return;
					self._move( "previous", event );
					// prevent moving cursor to beginning of text field in some browsers
					event.preventDefault();
					break;
				case keyCode.DOWN:
										if (!self.menu.element.is(":visible")) return;
					self._move( "next", event );
					// prevent moving cursor to end of text field in some browsers
					event.preventDefault();
					break;
				case keyCode.ENTER:
				case keyCode.NUMPAD_ENTER:
					// when menu is open or has focus
					if ( self.menu.active ) {
						event.preventDefault();
					}
					//passthrough - ENTER and TAB both select the current element
				case keyCode.TAB:
					if ( !self.menu.active ) {
						return;
					}
					self.menu.select( event );
					break;
				case keyCode.ESCAPE:
					self.element.val( self.term );
					self.close( event );
					break;
				case keyCode.LEFT:
				case keyCode.RIGHT:
				case keyCode.SHIFT:
				case keyCode.CONTROL:
				case keyCode.ALT:
				case keyCode.COMMAND:
				case keyCode.COMMAND_RIGHT:
				case keyCode.INSERT:
				case keyCode.CAPS_LOCK:
				case keyCode.END:
				case keyCode.HOME:
					// ignore metakeys (shift, ctrl, alt)
					break;
				default:
					// keypress is triggered before the input value is changed
					clearTimeout( self.searching );
					self.searching = setTimeout(function() {
						self.search( null, event );
					}, self.options.delay );
					break;
			}
		});
		return true;
	}
}
});

if($.inArray(mw.config.get('wgAction'), ['edit', 'submit'])+1)
mw.loader.using(['jquery.ui.widget','jquery.ui.autocomplete','jquery.textSelection'],function(){
	//enable autocomplete for editbox, relative to editform in an offset of -80 vertical
	$( "#wpTextbox1" ).autoCompleteWikiText(
		{
		positionAt: $('#wpTextbox1').prop('dir')=='rtl'? "left top" : "right top",
		positionOf: '#editform', 
		positionOffset: "0 0",
		menuCSS: { background:'#E0EEF7', opacity:0.8},
		itemCSS: {padding: 0, margin: 0 }
		});
});