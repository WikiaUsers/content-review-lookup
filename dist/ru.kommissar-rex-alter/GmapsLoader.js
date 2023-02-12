/** Parse a objects of classes "googlemaps/googlemaps_link" and create the map-toolbar  *****
 *
 * English: this script allows to do mapping of Google Maps on wiki-pages
 * (see also: {{Google map}} and {{Gm notice}} templates)
 * Additional: look the "Map generator" in the file MediaWiki:Map_generator.js
 *
 * @author: ru:user:gm2wiki
 * @version: see value of var gm2wiki_version
*/

var gm2wiki_version = "0.1.2"; // Main version number of GM2Wiki system
var gm2wiki_url = "http://ru.gm2.wikia.com/wiki/GM2Wiki";
var gm2wiki_external_target = "_blank";

var map_toolbar_display = "off";
var map_url_value = "http://maps.google. …";
var map_width_value = "300";
var map_height_value = "200";

var msg_createMap_title_ru  = 'Вставить карту "Google Maps"';
var msg_insertMap_button_cancel_title_ru  = "Закрыть панель ввода параметров карты";
var msg_insertMap_url_error_ru  = "Некорректный URL карты!";
var msg_insertMap_width_error_ru  = "Некорректное значение ширины карты!";
var msg_insertMap_height_error_ru  = "Некорректное значение высоты карты!";

var msg_insertMap_header_ru = "Введите параметры карты ";
var msg_insertMap_url_ru = "Введите URL карты:";
var msg_insertMap_url_title_ru = "Внимание: поддерживаются только интерактивные карты Google Maps™";
var msg_insertMap_width_ru = "Ширина:";
var msg_insertMap_height_ru = "Высота:";
var msg_insertMap_align_ru = "Расположение:";
var msg_insertMap_left_ru = "слева";
var msg_insertMap_center_ru = "по центру";
var msg_insertMap_right_ru = "справа";
var msg_insertMap_thumb_ru = "Описание:";
var msg_insertMap_note_ru = "(карта в рамке)";
var msg_insertMap_text_ru = "Подпись (wiki-текст):";
var msg_insertMap_button_insert_ru = "Вставить карту";
var msg_insertMap_button_insert_title_ru = "Вставить заполненный шаблон {{Google map}} в wiki-текст";
var msg_insertMap_button_cancel_ru = "Отмена";
var msg_insertMap_help_ru = "Справка";
var msg_insertMap_clear_ru = "Очистить";
var msg_insertMap_clear_title_ru = "Обнулить все параметры";

var msg_createMap_title_en = 'Insert map by "Google Maps"';
var msg_insertMap_button_cancel_title_en = "Close map-toolbar";
var msg_insertMap_url_error_en = "Map URL is incorrect!";
var msg_insertMap_width_error_en = "Map width is incorrect!";
var msg_insertMap_height_error_en = "Map height is incorrect!";

var msg_insertMap_header_en = "Enter parameters of map ";
var msg_insertMap_url_en = "Enter URL of map:";
var msg_insertMap_url_title_en = "Warning: interactive maps Google Maps™ are supported only";
var msg_insertMap_width_en = "Width:";
var msg_insertMap_height_en = "Height:";
var msg_insertMap_align_en = "Layout:";
var msg_insertMap_left_en = "left";
var msg_insertMap_center_en = "center";
var msg_insertMap_right_en = "right";
var msg_insertMap_thumb_en = "Thumbnail:";
var msg_insertMap_note_en = "(map in the frame)";
var msg_insertMap_text_en = "Caption (wiki-text):";
var msg_insertMap_button_insert_en = "Insert map";
var msg_insertMap_button_insert_title_en = "Insert the filled template {{Google map}} into wiki-text";
var msg_insertMap_button_cancel_en = "Cancel";
var msg_insertMap_help_en = "Help";
var msg_insertMap_clear_en = "Clear";
var msg_insertMap_clear_title_en = "Clear all fields";

var GM_color = "<font color=blue>G</font><font color=red>o</font><font color=yellow>o</font>";
GM_color += "<font color=blue>g</font><font color=green>l</font><font color=red>e</font> Maps:";

var msg_insertMap_header = msg_insertMap_header_ru;
var msg_insertMap_url = msg_insertMap_url_ru;
var msg_insertMap_url_title = msg_insertMap_url_title_ru;
var msg_insertMap_width = msg_insertMap_width_ru;
var msg_insertMap_height = msg_insertMap_height_ru;
var msg_insertMap_align = msg_insertMap_align_ru;
var msg_insertMap_left = msg_insertMap_left_ru;
var msg_insertMap_center = msg_insertMap_center_ru;
var msg_insertMap_right = msg_insertMap_right_ru;
var msg_insertMap_thumb = msg_insertMap_thumb_ru;
var msg_insertMap_note = msg_insertMap_note_ru;
var msg_insertMap_text = msg_insertMap_text_ru;
var msg_insertMap_button_insert = msg_insertMap_button_insert_ru;
var msg_insertMap_button_insert_title = msg_insertMap_button_insert_title_ru;
var msg_insertMap_button_cancel = msg_insertMap_button_cancel_ru;
var msg_insertMap_button_cancel_title = msg_insertMap_button_cancel_title_ru;
var msg_insertMap_help = msg_insertMap_help_ru;
var msg_insertMap_clear = msg_insertMap_clear_ru;
var msg_insertMap_clear_title = msg_insertMap_clear_title_ru;

var msg_createMap_title = msg_createMap_title_ru;
var msg_insertMap_button_cancel_title = msg_insertMap_button_cancel_title_ru;
var msg_insertMap_url_error = msg_insertMap_url_error_ru;
var msg_insertMap_width_error = msg_insertMap_width_error_ru;
var msg_insertMap_height_error = msg_insertMap_height_error_ru;

var msg_insertMap_switch_language_title_ru = "Переключиться на русский язык";
var msg_insertMap_switch_language_title_en = "Switch to english language";

var msg_createMap_alt_ru = "Карта";
var msg_createMap_alt_en = "Map";
var msg_createMap_alt = msg_createMap_alt_ru;

var msg_createMap_gm2wiki_title = "GM2Wiki™ ver. " + gm2wiki_version;

var msg_templateMap_ru = "Эта кнопка работает только в режиме редактирования";
var msg_templateMap_en = "This button works in edit mode only";
var msg_templateMap = msg_templateMap_ru;

var map_thumb_title_ru = "Посмотреть увеличенную карту со всеми подробностями";
var map_thumb_title_en = "To look the increased card with all details";
var map_thumb_title = map_thumb_title_ru;
var map_thumb_alt_ru = "Эскиз";
var map_thumb_alt_en = "Thumbnail";
var map_thumb_alt = map_thumb_alt_ru;

function Gmaps_display() 
{
    var Page = document.getElementById("bodyContent");
    if (!Page) {return false;}
    var i = 0; var URL = ""; var content = ""; 

    var image = null;

    var content_loader = '<img border="0" src="https://images.wikia.nocookie.net/gm2/ru/images/1/14/Loading2.gif">';
    if (gm2wiki_language == "EN") {
        map_thumb_alt = map_thumb_alt_en;
        map_thumb_title = map_thumb_title_en;
    }
    var spanList = Page.getElementsByTagName("span");
	for ( i = 0; i < spanList.length; i++ ) {
		if (spanList[i].className == "googlemaps_link") {
                    URL = spanList[i].title; 
	            if (URL == "{{{2}}}") {break;}
                    spanList[i].title = "";
/*
                    content = '<a target="_blank" href="' + URL;
                    content += '" title="' + map_thumb_title;
                    content += '"><img alt="' + map_thumb_alt;
                    content += ' border="0" src="https://images.wikia.nocookie.net/gm2/ru/images/6/6b/Magnify-clip.png"></a>';
                    spanList[i].innerHTML = content;
*/
                    image = document.createElement("img");
                    image.width = 15;
                    image.height = 11;
                    image.src = 'https://images.wikia.nocookie.net/gm2/ru/images/6/6b/Magnify-clip.png';
                    image.border = 0;
                    image.alt = map_thumb_alt;
                    image.title = map_thumb_title;
                    image.style.cursor = "pointer";
                    image.onclick = function() {window.open(gm2wiki_url,gm2wiki_external_target); return false;}
                    spanList[i].appendChild(image);
                }       
            if (spanList[i].className == "googlemaps_loading") {spanList[i].innerHTML = content_loader;}
        }
    var divList = Page.getElementsByTagName("div");
	for ( i = 0; i < divList.length; i++ ) {
		if (divList[i].className == "googlemaps") {
		    URL = divList[i].title;
	            if (URL == "{{{url}}}") {break;}
                    divList[i].title = "";
                    content = '<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0"';
                    content += ' width="' + divList[i].style.width;
                    content += '" height="' + divList[i].style.height;
                    content += '" src="http://' + URL + '&output=embed"></iframe>';
 		    divList[i].innerHTML = content;
		}
	}
}

function Map_toolbar() 
{
    var Toolbar = document.getElementById("toolbar");
    if (!Toolbar) {return false;}
    if (gm2wiki_language == "EN") {
        msg_insertMap_header = msg_insertMap_header_en;
        msg_insertMap_url = msg_insertMap_url_en;
        msg_insertMap_url_title = msg_insertMap_url_title_en;
        msg_insertMap_width = msg_insertMap_width_en;
        msg_insertMap_height = msg_insertMap_height_en;
        msg_insertMap_align = msg_insertMap_align_en;
        msg_insertMap_left = msg_insertMap_left_en;
        msg_insertMap_center = msg_insertMap_center_en;
        msg_insertMap_right = msg_insertMap_right_en;
        msg_insertMap_thumb = msg_insertMap_thumb_en;
        msg_insertMap_note = msg_insertMap_note_en;
        msg_insertMap_text = msg_insertMap_text_en;
        msg_insertMap_button_insert = msg_insertMap_button_insert_en;
        msg_insertMap_button_insert_title = msg_insertMap_button_insert_title_en;
        msg_insertMap_button_cancel = msg_insertMap_button_cancel_en;
        msg_insertMap_button_cancel_title = msg_insertMap_button_cancel_title_en;
        msg_insertMap_help = msg_insertMap_help_en;
        msg_insertMap_clear = msg_insertMap_clear_en;
        msg_insertMap_clear_title = msg_insertMap_clear_title_en;
    }
    var Content = '<div id="insert_google_map" style="overflow: auto; height: 160px; display: none;"><p><table width="100%" border=0 cellspacing=0 cellpadding=0><tr width="100%"><td>&nbsp;<span id="msg_insertMap_header" style="font-size: 10pt; font-weight: bold;">' + msg_insertMap_header + '</span><span style="font-size: 10pt; font-weight: bold;">' + GM_color + '</span></td><td align="right"><img border=0 src="https://images.wikia.nocookie.net/gm2/ru/images/f/fb/Ru.png" alt="rus" title="' + msg_insertMap_switch_language_title_ru + '" style="cursor: pointer;" onClick="map_toolbar_switch_language(0);">&nbsp;<img border=0 src="https://images.wikia.nocookie.net/gm2/ru/images/c/ce/Gb.png" alt="eng" title="' + msg_insertMap_switch_language_title_en + '" style="cursor: pointer;" onClick="map_toolbar_switch_language(1);">&nbsp;</td></tr></table></p><p><table width="100%" border=0 cellspacing=0 cellpadding=0><tr width="100%"><td><nobr>&nbsp;<font color="#980000"><span id="msg_insertMap_url">' + msg_insertMap_url + '</span></font>&nbsp;</nobr></td><td width=100%><input title="' + msg_insertMap_url_title + '" type="text" name="inputUrl" value="' + map_url_value + '" style="width:100%;font-family:Arial,Verdana,Sans-serif;font-size:8pt;" onFocus="clear_field();"></td><td>&nbsp;&nbsp;</td></tr></table></p><p><nobr>&nbsp;<font color="#980000"><span id="msg_insertMap_width">' + msg_insertMap_width + '</span></font>&nbsp;<input type="text" name="inputWidth" value="' + map_width_value + '" style="width:50px">&nbsp;px,&nbsp;<font color="#980000"><span id="msg_insertMap_height">' + msg_insertMap_height + '</span></font>&nbsp;<input type="text" name="inputHeight" value="' + map_height_value + '" style="width:50px">&nbsp;px,</nobr> <nobr>&nbsp;<font color="#980000"><span id="msg_insertMap_align">' + msg_insertMap_align + '</span></font>&nbsp;<input type="radio" name="inputAlign" value="left" checked><span id="msg_insertMap_left">' + msg_insertMap_left + '</span>&nbsp;<input type="radio" name="inputAlign" value="center"><span id="msg_insertMap_center">' + msg_insertMap_center + '</span>&nbsp;<input type="radio" name="inputAlign" value="right"><span id="msg_insertMap_right">' + msg_insertMap_right + '</span></nobr></p><p id="notice_field"><table id="thumb_text" width="100%" border=0 cellspacing=0 cellpadding=0><tr width="100%"><td><nobr>&nbsp;<font color="#980000"><span id="msg_insertMap_text">' + msg_insertMap_text + '</span></font>&nbsp;</nobr></td><td width=100%><input type="input" name="inputText" value="" style="width:100%;font-family:Arial,Verdana,Sans-serif;font-size:10pt;"></td><td>&nbsp;&nbsp;</td></tr></table></p><p><nobr>&nbsp;<font color="#980000"><span id="msg_insertMap_thumb">' + msg_insertMap_thumb + '</span></font>&nbsp;<input type="checkbox" name="notice" value="thumb" checked onclick="thumb_box();">&nbsp;<span id="msg_insertMap_note">' + msg_insertMap_note + '</span></nobr> &nbsp;<input name="msg_insertMap_clear" title="' + msg_insertMap_clear_title + '" type="button" value="' + msg_insertMap_clear + '" onClick="clear_map();"> <input name="msg_insertMap_button_insert" title="' + msg_insertMap_button_insert_title + '" type="button" value="' + msg_insertMap_button_insert + '" onClick="insertCodeMap();" style="font-weight: bold;"> <input name="msg_insertMap_button_cancel" title="' + msg_insertMap_button_cancel_title + '" type="button" value="' + msg_insertMap_button_cancel + '" onClick="close_map_toolbar();"> <input name="msg_insertMap_help" title="' + msg_createMap_gm2wiki_title + '" type="button" value="' + msg_insertMap_help + '" onClick="window.open(gm2wiki_url,gm2wiki_external_target);"></p></div><div style="position: relative; float: right;"><small><a title="' + msg_createMap_gm2wiki_title + '" target="_blank" href="' + gm2wiki_url + '">GM2Wiki</a>™&nbsp;<i>inside</i></small>&nbsp;</div>'; 

    Toolbar.style.background = "#f9f9f9 url(\/skins\/monobook\/headbg.jpg)";
    Toolbar.innerHTML += Content;
}

function Set_version()
{
    var Page = document.getElementById("bodyContent");
    if (!Page) {return false;}
    var spanList = Page.getElementsByTagName("span");
    if (wgTitle == "Google map") {
        var i = 0; var image = null;
        if (gm2wiki_language == "EN") {
             msg_createMap_alt = msg_createMap_alt_en;
             msg_createMap_title = msg_createMap_title_en;
             msg_templateMap = msg_templateMap_en;
        }
    }
	for ( i = 0; i < spanList.length; i++ ) {
 		if (spanList[i].className == "gm2wiki_version") {spanList[i].innerHTML = gm2wiki_version;}
                if (wgTitle == "Google map") {
	             if (spanList[i].className == "googlemaps_template") {
                          spanList[i].innerHTML = "";
                          image = document.createElement("img");
                          image.width = 23;
                          image.height = 22;
                          image.src = 'https://images.wikia.nocookie.net/gm2/ru/images/8/88/Button_insert_map.png';
                          image.border = 0;
                          image.alt = msg_createMap_alt;
                          image.title = msg_createMap_title;
                          image.style.cursor = "pointer";
                          image.id = "mw-insert-map";
                          image.onclick = function() {alert(msg_templateMap); return false;}
                          spanList[i].appendChild(image);
                     }
               }
        }
}

function Gmaps_loader() 
{
    if (wgAction == "edit" || wgAction == "submit" || wgPageName == "Special:Upload") {
           Map_toolbar();
      } else {
           if (wgCanonicalNamespace == "Template" & wgAction == "view") { 
               if (wgTitle == "Google map" || wgTitle == "Gm notice") {Set_version();}
           } else {
               Gmaps_display();
           }
      }
}

addOnloadHook(Gmaps_loader); // include Google Maps Loader onload <body>

if (wgAction == "edit" || wgAction == "submit" || wgPageName == "Special:Upload") //include map-generator if edit
{
    document.write('<script type="text/javascript" src="http://ru.gm2.wikia.com/index.php?title=MediaWiki:MapGenerator.js&action=raw&ctype=text/javascript&dontcountme=s"></script>'); 
}

// END OF Gmaps loader