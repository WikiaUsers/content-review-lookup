importMW('Wikificator')
mwCustomEditButtons['wikif'] = [function(){Wikify()}, 'commons/0/06/Wikify-toolbutton.png', 'Викификатор — автоматический обработчик текста']


if( mw.user.options.get('usebetatoolbar') ){
  var gTlbLoc = '#wikiEditor-ui-toolbar'
  mw.util.addCSS('#gadget-toolbar {height:26px; border-right:1px solid #ddd; margin:3px; padding-right:6px} #gadget-toolbar img {padding:2px}')
  $('#wpTextbox1').bind('wikiEditor-toolbar-buildSection-main', function(e, sec){
     sec.groups.insert.tools.file.action.options.post = '|thumb]]'
  })
}else if( document.getElementById('toolbar') ){
   var gTlbLoc = '#toolbar'
   mwCustomEditButtons['wikif'][1] = 'commons/3/38/Button_wikify.png'
   importMW('ToolbarOld')
 }else{
   var gTlbLoc = '#editform'
   importMW('ToolbarNone')
 }


$(function(){
 gToolbar()
 setTimeout(gToolbar, 2000)
 setTimeout(gToolbar, 6000)
})



function gToolbar(){

 if( !document.getElementById('gadget-toolbar') ){
   var where = $(gTlbLoc)
   if( !where.length ) return //beta toolbar not  ready yet
   $('<div id=gadget-toolbar style="float:left" />').prependTo(where)
 }
   
 for( var id in mwCustomEditButtons ){
   var b = mwCustomEditButtons[id]
   if( ! b.length ) continue
   createFuncBtn(id, b[0], b[1], b[2])
   delete mwCustomEditButtons[id]
 }
 
}



function createFuncBtn(id, func, img, tip){
 $('<img id="'+id+'" src="'+wgImg(img)+'" style="cursor:pointer" '
     +'title="'+tip+'" alt="'+tip.substr(0,3)+'" />')
  .appendTo('#gadget-toolbar')
  .click(func)
}


function wgImg(img){
 return '//upload.wikimedia.org/wikipedia/' + img
}


//for userscripts
function addFuncBtn(id, func, img, tip){
 if( document.getElementById('gadget-toolbar') )
   createFuncBtn(id, func, img, tip)
 else
   mwCustomEditButtons[id] = [func, img, tip]
}





//Summary buttons

function insertSummary(txt){
 if( typeof txt != 'string' ) txt = this.title
 var vv = $('#wpSummary').val()
 if( vv.indexOf(txt) != -1 ) return
 if( /[^,; \/]$/.test(vv) ) vv += ','
 if( /[^ ]$/.test(vv) ) vv += ' '
 $('#wpSummary').val(vv + txt)
}
 
function addSumButton(btn, txt){
 $('<a title="' + txt + '">' + btn + '</a>')
 .appendTo('#userSummaryButtonsA')
 .click(insertSummary)
}

$(function(){
 var frm = document.getElementById('editform')
 if( !wgArticleId || !frm || $(frm.wpSection).val() == 'new' ) return
 mw.util.addCSS('\
 input#wpSummary {margin-bottom: 0}\
 #userSummaryButtonsA a {background:#cef; border:1px solid #adf; padding:0 2px;\
  margin:0 2px;cursor:pointer; font-size:80%; color:#666}\
 #userSummaryButtonsA a:hover {background:#bdf; color:black; text-decoration:none}')
 $('<div id=userSummaryButtonsA />').insertAfter('#wpSummary')
 $.each( ['викиф|икация', 'оформл|ение', 'стил|евые правки', 'орфогр|афия',
  'пункт|уация', 'интервики', 'кат|егория', 'шаб|лон', 'к удал|ению', 'иллюстрация',
  'источ|ники', 'доп|олнение', 'уточ|нение', 'обнов|ление данных'],
  function(i,s){  addSumButton( s.replace(/\|.*/,''), s.replace(/\|/,'') )  }
 )
})



if (wgAction=='edit' && / rv:1\.[0-8].+Gecko/.test(navigator.userAgent))
  importMW('Firefox2')


if( window.opera && /11\.6[01]/.test(opera.version()) )
 $('#wpTextbox1')
 .mousedown(function(){ this.sT = this.scrollTop })
 .click(function(){ if( this.scrollTop == 0 ) this.scrollTop = this.sT });

/** Tabbed Edittools *************************************
  *
  *  Description: Делает из таблицы edittools страницы с табами.
  *  Made by:  Tachikoma, Anotubus
  */

(function(){

	appendCSS(
		'/* Tabbed edittools */'
		+'#switcher { font-family: sans-serif }'
		+'#switcher div { padding: 0px 3px; top: 1px; position: relative; z-index: 3; margin: 0 0.3em 0 0; overflow-y: visible; background: #ffffff; border: 1px solid #aaaaaa; display: inline-block; margin-right: 2px; margin-left: 2px; font-size: 95%; cursor: pointer}'
		+'#switcher div.selected { padding: 3px 3px 0px 3px; font-weight: normal; border: 1px solid #fabd23; border-bottom: none; top: 2px; margin-right: 2px; margin-left: 2px; background-color: #ffffff; text-decoration: none}'
		+'#switcher div.fixed { padding: 2px 3px 0px 3px; font-weight: bold; border: 1px solid #009933; border-bottom: dotted 1px #009933; top: 1px; margin-right: 2px; margin-left: 2px }'
		+'#switcher div u { text-decoration:none }'
		+'#switcher div.swoff { font-weight: bold; float:right; text-decoration: underline; color: blue; border: none }'
		+'#switcher div.swon { font-weight: bold; float:right; text-decoration: underline; color: blue }'
		+'#switcher div#pageHelp { padding-left: 10pt; border: none; font-weight: bold; float:right; text-decoration: underline; color: blue }'
		+'#editpage-specialchars {margin-top: 15px;}'
		+'#editpage-specialchars table { width: 100%; border-width:1px 1px 0 1px;border-style:solid;border-color:#dbdfe6;}'
		+'#editpage-specialchars table tr { z-index: 0 }'
		+'#editpage-specialchars table tr td:first-child { width: 9em }'
		+'#editpage-specialchars table tr.first { height: 9ex }'
		+'#editpage-specialchars table tr.visible { display: table-row }'
		+'#editpage-specialchars table tr.hidden { display: none }'
		+'#editpage-specialchars a {padding: 2px 3px;border:1px solid #fff;white-space:pre;display:inline-block}'
		+'#editpage-specialchars a:hover {text-decoration:none!important;border:1px solid #ccc}'
		+'#editpage-specialchars a:active {border:1px solid #fff;background:#f9f9f9}'
		+'#editpage-specialchars .morphlink:hover {color:#000!important}'
	);

	var TabSwitchTimer = null,
	    TabSwitchGlobState = 0,
	    MyEditTools = {

		updateFirstVisible: function() {
			$('.first').removeClass('first'); $("#editpage-specialchars table tr:visible").eq(0).addClass('first')
		},

		setAll: function(t) {
			var rows = $('#editpage-specialchars table tr'), sw = $("#switcher div")
			if (t) {
				var cl = t>0?"visible":"hidden"; rows.each(function(i) { if (!TabSwitchGlobState) $(this).data('prevstate', this.className); this.className = cl })
				var cl = t>0?"fixed":""; sw.each(function(i) { if (!TabSwitchGlobState) $(this).data('prevstate', this.className); this.className = cl })
			} else {
				rows.each(function(i) { this.className = $(this).data('prevstate') || '' })
				sw.each(function(i) { this.className = $(this).data('prevstate') || '' })
			}
			TabSwitchGlobState = t;
			$('#pageShowAll').attr('class', t > 0 ? 'swon' : 'swoff'); $('#pageHideAll').attr('class', t < 0 ? 'swon' : 'swoff');
			MyEditTools.updateFirstVisible();
		},

		clearTimer: function() {
			if (TabSwitchTimer) { window.clearTimeout(TabSwitchTimer); TabSwitchTimer = null }
		},

		clearSelected: function() {
			$('#switcher div.selected').removeClass('selected')
			$('#editpage-specialchars table tr.selected').removeClass('visible').addClass('hidden').removeClass('selected')
		},

		init: function() {
			if (!$('#editpage-specialchars').size()) return

			$('#editpage-specialchars').css('border', "none")

			//var switcher = $('<div id="switcher"/>').insertBefore($("#editpage-specialchars table"))
            var switcher = $('<caption style="text-align:left" id="switcher"/>').prependTo($("#editpage-specialchars table"));
			var rows = $("#editpage-specialchars table tr")
			rows.each(function(i) {
				var id = "page"+i,td = $('td:first', this)
				var row = $(this).attr('id', 'r'+id).addClass(i == 0 ? "visible" : "hidden").toggleClass("first", !i).toggleClass("selected",!i)
				var sw = $('<div/>')
					.attr("id", "sw"+id).html((td.html() || '').replace(/:/, ''))
					.hover(function(e) {
						MyEditTools.clearTimer()
						if (sw.hasClass("fixed")) return
						TabSwitchTimer = window.setTimeout(function() {
							MyEditTools.clearSelected()
							sw.addClass('selected'); row.addClass('selected').removeClass('hidden').addClass('visible')
							MyEditTools.updateFirstVisible()
						}, 50)
					}, MyEditTools.clearTimer)
					.click(function(e){
						MyEditTools.clearTimer()
						if (!sw.hasClass('fixed')) {
							sw.removeClass("selected").addClass("fixed")
							row.removeClass("selected").removeClass("hidden").addClass("visible")
						} else {
							MyEditTools.clearSelected()
							sw.removeClass("fixed").addClass("selected")
						}
						MyEditTools.updateFirstVisible()
					})
					.appendTo(switcher)
					.toggleClass("selected", !i)
			})

			with(switcher){
				append($('<div id="pageHideAll" class="swoff">Hide All</div>').click(function() {
					MyEditTools.clearTimer(); MyEditTools.setAll(TabSwitchGlobState<0?0:-1)
				}))
				append($('<div id="pageShowAll" class="swoff">Show All</div>').click(function() {
					MyEditTools.clearTimer(); MyEditTools.setAll(TabSwitchGlobState>0?0:1)
				}))
			}

			$('#toolbar').before($('.mw-editTools'));
		}
	}

    addOnloadHook(MyEditTools.init);
})();