importScript( 'User:Grunny/ajaxcloakrequest.js' );
 
// onload stuff
var firstRun = true;
 
function loadFunc() {
	if( firstRun ) {
		firstRun = false;
	} else {
		return;
	}
 
	window.pageName = wgPageName;
	window.storagePresent = (typeof(globalStorage) != 'undefined');
 
	// DEPRECATED
	if( document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null ) {
		document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
	}
 
	// Upload form - need to run before adding hide buttons
	if ( wgCanonicalSpecialPageName === 'Upload' ) {
		setupUploadForm();
	}
 
	addHideButtons();
 
	if( document.getElementById('mp3-navlink') !== null ) {
		document.getElementById('mp3-navlink').onclick = onArticleNavClick;
		document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
	}
 
	if( window.storagePresent ) {
		initVisibility();
	}
 
	fillEditSummaries();
	fillPreloads();
 
	substUsername();
	substUsernameTOC();
	rewriteTitle();
	showEras('title-eraicons');
	showEras('title-shortcut');
	rewriteHover();
	addAlternatingRowColors();
	// replaceSearchIcon(); this is now called from MediaWiki:Monobook.js
	fixSearch();
	hideContentSub();
 
	var body = document.getElementsByTagName('body')[0];
	var bodyClass = body.className;
 
	if( !bodyClass || (bodyClass.indexOf('page-') === -1) ) {
		var page = window.pageName.replace(/\W/g, '_');
		body.className += ' page-' + page;
	}
 
	if( typeof(onPageLoad) != "undefined" ) {
		onPageLoad();
	}
} 
     
    //------------------------------------
    // Кнопка сворачивания инфобокса
    //--
    function infoboxToggle() {
            var page = window.pageName.replace(/\W/g, '_');
            var nowShown;
     
            if(document.getElementById('infoboxtoggle').innerHTML == '[Скрыть]') {
                    document.getElementById('infoboxinternal').style.display = 'none';
                    document.getElementById('infoboxtoggle').innerHTML = '[Открыть]';
                    nowShown = false;
            } else {
                    document.getElementById('infoboxinternal').style.display = 'block';
                    document.getElementById('infoboxtoggle').innerHTML = '[Скрыть]';
                    nowShown = true;
            }
     
            if(window.storagePresent) {
                    var storage = globalStorage[window.location.hostname];
                    storage.setItem('infoboxshow-' + page, nowShown);
            }
    }
    //--
     
     
    //------------------------------------
    function fillEditSummaries() {
            var label = document.getElementById("wpSummaryLabel");
     
            if( label == null )
                    return;
     
            var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
            comboString += "</select><br />";
            label.innerHTML = comboString + label.innerHTML;
     
            requestComboFill('stdSummaries', 'Template:Stdsummaries');
    }
     
    function onStdSummaryChange() {
            var value = $('#stdSummaries').val();
     
            if( value != "" ) {
                    $('#wpSummary').val(value);
            }
    }
    //--
     
     
    //------------------------------------
    // Скрипт для переписывания наименования страницы, отредактирован Grunny
    //--
     function rewriteTitle() {
            if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
                    return;
            }
     
            if( $('#title-meta').length == 0 ) {
                    return;
            }
     
            var newTitle = $('#title-meta').html();
            if( skin == "oasis" ) {
                    $('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
                    $('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
            } else {
                    $('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
                    $('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
            }
    }
     
    function showEras(className) {
            if( skin == 'oasis' ) {
                    return;
            }
     
            if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
                    return;
     
            var titleDiv = document.getElementById( className );
     
            if( titleDiv == null || titleDiv == undefined )
                    return;
     
            var cloneNode = titleDiv.cloneNode(true);
            var firstHeading = getFirstHeading();
            firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
            cloneNode.style.display = "block";
    }
    //--
    // Конец скрипта
    //------------------------------------
     
     
     
    function initVisibility() {
            var hidables = getElementsByClass('hidable');
     
            for(var i = 0; i < hidables.length; i++) {
                    var content = getElementsByClass('hidable-content', hidables[i]);
                    var button = getElementsByClass('hidable-button', hidables[i]);
     
                    if( content != null && content.length > 0 &&
                            button != null && button.length > 0 && content[0].style.display == 'none' )
                    {
                            button[0].onclick('bypass');
                    }
            }
    }
     
    function onArticleNavClick() {
            var div = document.getElementById('mp3-nav');
     
            if( div.style.display == 'block' )
                    div.style.display = 'none';
            else
                    div.style.display = 'block';
    }
     
    function addAlternatingRowColors() {
            var infoboxes = getElementsByClass('infobox', document.getElementById('content'));
     
            if( infoboxes.length == 0 )
                    return;
     
            for( var k = 0; k < infoboxes.length; k++ ) {
                    var infobox = infoboxes[k];
     
                    var rows = infobox.getElementsByTagName('tr');
                    var changeColor = false;
     
                    for( var i = 0; i < rows.length; i++ ) {
                            if(rows[i].className.indexOf('infoboxstopalt') != -1)
                            break;
     
                            var ths = rows[i].getElementsByTagName('th');
     
                            if( ths.length > 0 ) {
                                    continue;
                            }
     
                            if(changeColor)
                                    rows[i].style.backgroundColor = '#f9f9f9';
                            changeColor = !changeColor;
                    }
            }
    }
     
    function addHideButtons() {
            var hidables = getElementsByClass('hidable');
     
            for( var i = 0; i < hidables.length; i++ ) {
                    var box = hidables[i];
                    var button = getElementsByClass('hidable-button', box, 'span');
     
                    if( button != null && button.length > 0 ) {
                            button = button[0];
     
                            button.onclick = toggleHidable;
                            button.appendChild( document.createTextNode('[Скрыть]') );
     
                            if( new ClassTester('start-hidden').isMatch(box) )
                                    button.onclick('bypass');
                    }
            }
    }
     
    function toggleHidable(bypassStorage) {
            var parent = getParentByClass('hidable', this);
            var content = getElementsByClass('hidable-content', parent);
            var nowShown;
     
            if( content != null && content.length > 0 ) {
                    content = content[0];
     
                    if( content.style.display == 'none' ) {
                            content.style.display = content.oldDisplayStyle;
                            this.firstChild.nodeValue = '[Скрыть]';
                            nowShown = true;
                    } else {
                            content.oldDisplayStyle = content.style.display;
                            content.style.display = 'none';
                            this.firstChild.nodeValue = '[Открыть]';
                            nowShown = false;
                    }
     
                    if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
                            var page = window.pageName.replace(/\W/g, '_');
                            var items = getElementsByClass('hidable');
                            var item = -1;
     
                            for( var i = 0; i < items.length; i++ ) {
                                    if( items[i] == parent ) {
                                            item = i;
                                            break;
                                    }
                            }
     
                            if( item == -1 ) {
                                    return;
                            }
     
                            var storage = globalStorage[window.location.hostname];
                            storage.setItem('hidableshow-' + item + '_' + page, nowShown);
                    }
            }
    }
     
    function substUsernameTOC() {
            var toc = document.getElementById('toc');
            var userpage = document.getElementById('pt-userpage');
     
            if( !userpage || !toc )
                    return;
     
            var username = userpage.firstChild.firstChild.nodeValue;
            var elements = getElementsByClass('toctext', toc, 'span');
     
            for( var i = 0; i < elements.length; i++ )
                    elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
    }
     
     
    //------------------------------------
    // Улучшенное AJAX-автообновление статей
    // Код честно стырен у "pcj" с WoWWiki.
    // Баги правил Grunny
    //--
    var indicator = 'https://images.wikia.nocookie.net/__cb20100617113125/dev/images/8/82/Facebook_throbber.gif';
    if (!window.ajaxPages) ajaxPages = new Array("Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:NewFiles", "Special:AbuseLog");
    var ajaxTimer;
    var ajaxRefresh = 60000;
    var refreshText = 'Автообновление';
    if( typeof AjaxRCRefreshText == "string" ) {
            refreshText = AjaxRCRefreshText;
    }
    var refreshHover = 'Включить автообновление при загрузке';
    if( typeof AjaxRCRefreshHoverText == "string" ) {
            refreshHover = AjaxRCRefreshHoverText;
    }
    var doRefresh = true;
    function setCookie(c_name,value,expiredays) {
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }
     
    function getCookie(c_name) {
    if (document.cookie.length>0) {
    c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1) {
    c_start=c_start + c_name.length+1
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    }
    }
    return ""
    }
     
    function preloadAJAXRL() {
    ajaxRLCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
    appTo = ($("#WikiaPageHeader").length)?$("#WikiaPageHeader"):$(".firstHeading");
    appTo.append(' <span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="AJAX operation in progress" /></span></span>');
    $("#ajaxLoadProgress").bind("ajaxSend", function (){
    $(this).show();
    }).bind("ajaxComplete", function (){
    $(this).hide();
    });
    $("#ajaxToggle").click(toggleAjaxReload);
    $("#ajaxToggle").attr("checked", ajaxRLCookie);
    if (getCookie("ajaxload-"+wgPageName)=="on") loadPageData();
    }
     
    function toggleAjaxReload() {
    if ($("#ajaxToggle").attr("checked") == true) {
    setCookie("ajaxload-"+wgPageName, "on", 30);
    doRefresh = true;
    loadPageData();
    } else {
    setCookie("ajaxload-"+wgPageName, "off", 30);
    doRefresh = false;
    clearTimeout(ajaxTimer);
    }
    }
     
    function loadPageData() {
    var cC = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
    $(cC).load(location.href + " " + cC + " > *", function (data) {
    if (doRefresh) ajaxTimer = setTimeout("loadPageData();", ajaxRefresh);
    });
    }
     
    $(function () {
    for (x in ajaxPages) {
    if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) preloadAJAXRL();
    }
    });
    //--
    // Конец скрипта AJAX автообновления
    //------------------------------------
     
     
    //------------------------------------
    // Ссылка на избранную статью (может не работать в нашей вики)
    //--
    var FA_enabled  = true;
     
    function addfaicon() {
            // if disabled
            if (!FA_enabled) return;
            var pLang = document.getElementById("p-lang");
            if (!pLang) return;
            var lis = pLang.getElementsByTagName("li");
            for (var i = 0; i < lis.length; i++) {
                    var li = lis[i];
                    // only links with a corresponding Link_FA template are interesting
                    if (!document.getElementById(li.className + "-fa"))   continue;
                    // additional class so the template can be hidden with CSS
                    li.className += " FA";
                    // change title (mouse over)
                    li.title = "Эта статья является избранной.";
            }
    }
    addOnloadHook(addfaicon);
     
     /*
    Нужно для шаблона {{USERNAME}}
    */
function substUsername() {
	$('.insertusername').html(wgUserName);
}

function substUsernameTOC() {
	var toc = $('#toc');
	var userpage = $('#pt-userpage');

	if( !userpage || !toc )
		return;

	var username = $('#pt-userpage').children(':first-child').html();
	$('span.toctext:not(:has(*)), span.toctext i', toc).each(function()
	{
		$(this).html($(this).html().replace('<insert name here>', username));
	});
}

/************************************************************
 * Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/
 
/*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
*/
function getElementsByClass(searchClass, node, tag)
{
	var classElements = new Array();
 
	if(node == null)
		node = document;
 
	if(tag == null)
		tag = '*';
 
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var tester = new ClassTester(searchClass);
 
	for(i = 0, j = 0; i < elsLen; i++)
	{
		if(tester.isMatch(els[i]))
		{
			classElements[j] = els[i];
			j++;
		}
	}
 
	return classElements;
}
 
function ClassTester(className)
{
	this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}
 
ClassTester.prototype.isMatch = function(element)
{
	return this.regex.test(element.className);
}
/*
    end getElementsByClass
*/
 
function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection)
	{
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if(myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	}
	else
	{
		myField.value += myValue;
	}
}
 
function getFirstHeading() {
	var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
	return (elements != null && elements.length > 0) ? elements[0] : null;
}
 
/*
    Returns the element's nearest parent that has the specified CSS class.
*/
function getParentByClass(className, element) {
	var tester = new ClassTester(className);
	var node = element.parentNode;
 
	while(node != null && node != document)
	{
		if(tester.isMatch(node))
			return node;
 
		node = node.parentNode;
	}
 
	return null;
}
 
/*
    Performs dynamic hover class rewriting to work around the IE6 :hover bug
    (needs CSS changes as well)
*/
function rewriteHover() {
	var gbl = document.getElementById("hover-global");
 
	if(gbl == null)
		return;
 
	var nodes = getElementsByClass("hoverable", gbl);
 
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].onmouseover = function() {
			this.className += " over";
		}
		nodes[i].onmouseout = function() {
			this.className = this.className.replace(new RegExp(" over\\b"), "");
		}
	}
}
/************************************************************
 * End old Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

    //------------------------------------
    // Добавляет в шапку при редактировании избранной и хорошей статьи предупреждающий шаблон
    // Модификации для Monaco и Monobook написаны Sikon
    // Редактирование разделов: Green tentacle
    // Поддержка нового скина: Grunny
    //--
    function addEditIntro(name) {
            // Top link
            if( skin == 'oasis' ) {
                    $('a[data-id="edit"]').attr('href',$('a[data-id="edit"]').attr('href') + '&editintro=' + name);
                    $('span.editsection > a').each( function () {
                            $(this).attr('href',$(this).attr('href') + '&editintro=' + name);
                    } );
            } else {
                    var el = document.getElementById('ca-edit');
     
                    if( typeof(el.href) == 'undefined' ) {
                            el = el.getElementsByTagName('a')[0];
                    }
     
                    if (el)
                            el.href += '&editintro=' + name;
     
                    // Section links
                    var spans = document.getElementsByTagName('span');
                    for ( var i = 0; i < spans.length; i++ ) {
                            el = null;
     
                            if (spans[i].className == 'editsection') {
                                    el = spans[i].getElementsByTagName('a')[0];
                                    if (el)
                                            el.href += '&editintro=' + name;
                            } else if (spans[i].className == 'editsection-upper') {
                                    el = spans[i].getElementsByTagName('a')[0];
                                    if (el)
                                            el.href += '&editintro=' + name;
                            }
                    }
            }
    }
     
    $( function () {
            if ( wgNamespaceNumber === 0 ) {
                    var cats = document.getElementById( 'mw-normal-catlinks' );
                    if ( !cats ) {
                            return;
                    }
                    cats = cats.getElementsByTagName( 'a' );
                    for ( var i = 0; i < cats.length; i++ ) {
                            if ( cats[i].title === 'Категория:Вукипедия:Избранные_статьи' ) {
                                    addEditIntro( 'Template:Featured_editintro' );
                                    break;
                            } else if ( cats[i].title === 'Category:Wookieepedia good articles' ) {
                                    addEditIntro( 'Template:Good_editintro' );
                                    break;
                            } else if ( cats[i].title === 'Category:Articles undergoing major edits' || cats[i].title === 'Category:Works in progress' ) {
                                    addEditIntro( 'Template:Inuse_editintro‎' );
                                    break;
                            } else if ( wgPageName === 'Template:DYK editintro' ) {
                                    addEditIntro( 'Template:Good_editintro' );
                                    break;
                            }
                    }
            } else if ( wgPageName === 'Template:DidYouKnow' ) {
                    addEditIntro( 'Template:DYK_editintro' );
            }
    } );
    //--
    // Конец скрипта
    //------------------------------------
     
     
    /** Отключение вкладки редактирования архива
     * Отключает вкладку редактирования на старых топиках форума
     * топик можно отредактировать иными способами
     * к примеру, вбив вручную команду в адресную строку
     * Сделано [[:en:User:Spang|Spang]]
     * Версия для Monaco [[:en:User:Uberfuzzy|User:Uberfuzzy]]
     * Версия для Oasis [[:en:User:Uberfuzzy|User:Uberfuzzy]]
     * Скрытие кнопки редактирования разделов на страницах обсуждения написано [[User:Grunny|Grunny]]
     * User:/User talk: поддерживают новый стиль оформления [[User:Grunny|Grunny]]
     */
    function disableOldForumEdit() {
            if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
                    return;
            }
            if( !document.getElementById('old-forum-warning') ) {
                    return;
            }
     
            if( skin == 'oasis' ) {
                    if( wgNamespaceNumber == 2 || wgNamespaceNumber == 3 ) {
                            $("#WikiaUserPagesHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
                            $('span.editsection').remove();
                            return;
                    } else {
                            $("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
                            $('span.editsection').remove();
                            return;
                    }
            }
     
            if( !document.getElementById('ca-edit') ) {
                    return;
            }
     
            if( skin == 'monaco' ) {
                    editLink = document.getElementById('ca-edit');
            } else if( skin == 'monobook' ) {
                    editLink = document.getElementById('ca-edit').firstChild;
            } else {
                    return;
            }
     
            editLink.removeAttribute('href', 0);
            editLink.removeAttribute('title', 0);
            editLink.style.color = 'gray';
            editLink.innerHTML = 'Archived';
     
            $('span.editsection-upper').remove();
            $('span.editsection').remove();
     
            appendCSS( '#control_addsection, #ca-addsection { display: none !important; }' );
    }
    addOnloadHook( disableOldForumEdit );
     
    //Removes the "Featured on:" line on File pages -- By Grunny
    addOnloadHook( function (){
            if ( wgNamespaceNumber == 6 && $('#file').length != 0 ) {
                    $('#file').html($('#file').html().replace(/Featured on\:(.*?)\<br\>/, ''));
            }
    } );
     
    if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
                    "imageFile": "https://images.wikia.nocookie.net/__cb20110312002753/es.starwars/images/4/44/Button_comillas_latinas.png",
                    "speedTip": "Кавычки",
                    "tagOpen": "«",
                    "tagClose": "»",
                    "sampleText": "Текст"
            };
     
    mwCustomEditButtons[mwCustomEditButtons.length] = {
                    "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/6/63/Button_l_en.png",
                    "speedTip": "Межъязыковые ссылки",
                    "tagOpen": "{{Interlang|en=",
                    "tagClose":"         }}",
                    "sampleText": ""
            };
    }
     
     
    /**
     * Start upload form customisations
     * @author Green tentacle
     */
     
    function setupUploadForm(){
            // Check if cookie has been set for form style. Overrides URL parameter if set.
            var formstyle = getCookie("uploadform");
     
            $("#uploadBasicLinkJS").show();
            $("#uploadTemplateNoJS").hide();
     
            var wpLicense = $('#wpLicense');
     
            if ( wpLicense.length && window.location.search.indexOf('wpForReUpload=1') == -1){
                    if (formstyle == "guided" || (formstyle == "" && window.location.search.indexOf('basic=true') == -1)){
                            // Add link to basic form
                            $("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://starwars.wikia.com/index.php?title=Special:Upload&basic=true" onclick="javascript:setCookie(\'uploadform\', \'basic\', 30)">Switch to basic upload form</a></div>');
     
                            // Stretch table to full width
                            $('#mw-htmlform-description').css('width', '100%');
     
                            // Bind upload button to verify function
                            $('#mw-upload-form').bind('submit', verifySummary);
     
                            // Hide existing rows
                            var rows = $('#mw-htmlform-description').find('tr');
                            $('tr.mw-htmlform-field-HTMLTextAreaField').hide();
                            $('tr.mw-htmlform-field-HTMLTextAreaField').next().detach();
     
                            $('#mw-htmlform-description').addClass('hidable start-hidden');
     
                            // Add new required rows
                            rows.eq(1).after('<tr><td class="mw-label" style="width: 125px;">Source:</td><td class="mw-input"><textarea id="sourceBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
                            $('#mw-htmlform-description').append('<tbody class="hidable-content"></tbody>');
                            var tbody1 = $('#mw-htmlform-description').children('tbody').eq(0);
                            tbody1.append('<tr><td class="mw-label" style="width: 125px;">Description:</td><td class="mw-input"><textarea id="descriptionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
                            tbody1.append('<tr><td colspan="2" style="text-align: center;">Optional fields <span class="hidable-button"></span></td></tr>');
     
                            // Add new optional rows
                            var tbody2 = $('#mw-htmlform-description').children('tbody').eq(1);
                            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Attention:</td><td class="mw-input"><textarea id="attentionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
                            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Original designer / artist:</td><td class="mw-input"><textarea id="authorBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
                            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Conversion / editing / upload information:</td><td class="mw-input"><textarea id="filespecsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
                            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Other versions / source images:</td><td class="mw-input"><textarea id="versionsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
                            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Artist categories:</td><td class="mw-input"><textarea id="catartistBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
                            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Licensee categories:</td><td class="mw-input"><textarea id="catlicenseeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
                            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Subject categories:</td><td class="mw-input"><textarea id="catsubjectBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
                            tbody2.append('<tr><td class="mw-label" style="width: 125px;">Type categories:</td><td class="mw-input"><textarea id="cattypeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
                    } else {
                            // Old style form just needs Information template in the summary box
                            $('#wpUploadDescription').val('==Summary==\r\n{{Information\r\n|attention=\r\n|description=\r\n|source=\r\n|author=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|cat artist=\r\n|cat licensee=\r\n|cat subject=\r\n|cat type=\r\n}}');
     
                            // Add link to guided form
                            $("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://starwars.wikia.com/index.php?title=Special:Upload" onclick="javascript:setCookie(\'uploadform\', \'guided\', 30)">Switch to guided upload form</a></div>');
                    }
            }
    }

/**
 * Show/hide for media timeline -- Grunny
 **/
$( function () {
	if( !$( '.timeline-toggles' ).length ) {
		return;
	}
	$( '.timeline-toggles' ).find( 'td > a' ).click( function () {
		var	hideBtnClass = $( this ).parent().attr( 'class' ),
			$hideContent = $( 'tr.' + hideBtnClass );
		if( !$hideContent.length ) {
			return;
		}
		$hideContent.toggle();
		if ( $( this ).text().indexOf( 'hide' ) >= 1 ) {
			$( this ).text( $( this ).text().replace( 'hide', 'show' ) );
		} else {
			$( this ).text( $( this ).text().replace( 'show', 'hide' ) );
		}
	} );
} );
 
/**
 * Hides the link to parent pages from subpages if {{HideContentSub}} is included
 **/
function hideContentSub(){
	if( skin === 'oasis' ) {
		if ($("#hideContentSub").length > 0) {
			$("#WikiaPageHeader h2").hide();
		}
	} else {
		if ($("#hideContentSub").length > 0) {
			$("#contentSub span.subpages").hide();
		}
	}
}

// выполнение при готовности страницы
$(document).ready(function()
{ 
	// добавление возможности закрыть предупреждающее окно при щелчке по нему
    $('div.mw-editinginterface, div.mw-newarticletext, div.warningbox, div.mw-warning-with-logexcerpt').click(function()
	{
	  $(this).css('display', 'none');
	});
});	

// если страница редактируется
if (wgAction == 'edit' || wgAction == 'submit') 
{
	$.when( mw.loader.using( 'ext.wikiEditor' ), $.ready).then( SetToolbar );

    // добавление заголовка редактируемой статьи
	$('#content').prepend('<h3 class="" style="text-align: center;padding: 5px 0 2px;margin: 0;margin-bottom: 5px;">'+wgTitle+'</h3>');
}

function SetToolbar() 
{
	// кнопка-образец, где Т1 -- любой текст, вставляемый ДО курсора; Т2 -- после курсора; Т3 -- уникальный ID кнопки; Т4 -- всплывающая подсказка кнопки
    /*
	$('#wikiEditor-section-main div.group-insert').prepend(
	'<span onclick="InsertText(\'Т1\',\'Т2\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="Т3"><a class="oo-ui-buttonElement-button" role="button" title="Т4" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon" ></span></a></span>'
	);
    */	
	  
	$('#wikiEditor-section-main div.group-insert').prepend(
		'<span onclick="InsertText(\'«\',\'»\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_angle_qoutation_marks"><a class="oo-ui-buttonElement-button" role="button" title="Кавычки-ёлочки" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon" ></span></a></span>'+
		'<span onclick="InsertText(\'({{lang-en|\',\'}})\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_lang-en"><a class="oo-ui-buttonElement-button" role="button" title="Шаблон Lang-en" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon"></span></a></span>'+
		'<span onclick="InsertText(\'—\',\'\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_dash"><a class="oo-ui-buttonElement-button" role="button" title="Тире" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon"></span></a></span>'+
		'<span onclick="InsertText(\'[[\|\',\']]\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_square_brackets"><a class="oo-ui-buttonElement-button" role="button" title="Квадратные скобки с разделителем" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon"></span></a></span>'
	  );
	
	$('#wikiEditor-section-main div.group-insert').append(
		'<span onclick="InsertText(\'{{Цитата|\',\'||}}\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_quote"><a class="oo-ui-buttonElement-button" role="button" title="Шаблон цитаты" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon" ></span></a></span>'+
		'<span onclick="InsertText(\'\\n{{Interlang\\n|en=\',\'\\n}}\')" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_interlang"><a class="oo-ui-buttonElement-button" role="button" title="Шаблон межъязыковых ссылок" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon" ></span></a></span>'
	);
	
	// добавление кнопки "Подпись"
	if ($('span.oo-ui-icon-signature').length===0 ) 
	{
	  $('#btn_square_brackets').after(
	    '<span onclick="InsertText(\'--\~\~\~\~\',\'\')" class="tool oo-ui-widget oo-ui-widget-enabled oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement oo-ui-buttonWidget" aria-disabled="false" rel="signature"><a class="oo-ui-buttonElement-button" role="button" title="Подпись с отметкой времени" tabindex="0" aria-disabled="false" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-icon-signature"></span><span class="oo-ui-labelElement-label"></span></a></span>'
	  ); 
	}
	// добавление панели [Больше+]
		$('#wikiEditor-section-main div.group-codemirror').prepend(
			'<span onclick="ShowEditTools();" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_EditTools"><a class="oo-ui-buttonElement-button" role="button" title="Вставка вики-текста" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon"></span></a></span>'
		); 
		// добавление чёрной подложки для панели [Больше+]
		$('div.mw-editTools').after('<div id="EditTools_LayerBG"></div>').addClass('EditTools_FadeIn');
		// добавление заголовка на панель [Больше+]
		$('#editpage-specialchars').prepend('<h2>Вставка вики-текста</h2>');
		$('div.mw-editTools a, #EditTools_LayerBG').click(function()
		{
			$('div.mw-editTools, #EditTools_LayerBG').css('display', 'none');
		})
}

// функция вставки текста при щелчке по кнопке
function InsertText( sPre, sPost)
{
  $.wikiEditor.modules.toolbar.fn.doAction($('span.tool').data('context'), {type: 'encapsulate', options: {pre: sPre, post: sPost} });
}

// закрытие панели [Больше+]
function ShowEditTools()
{
  $('div.mw-editTools, #EditTools_LayerBG').fadeIn(150);
}