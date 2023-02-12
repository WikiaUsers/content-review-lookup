//============================================================
// Map generator: add map-button & manipulate with map-toolbar
//============================================================

/**
 *
 * English: Generate an Google Map using Mediawiki syntax (for template {{Google map}})
 *
 * @author: ru:user:gm2wiki
 * @version: see value of var gm2wiki_version into http://ru.gm2.wikia.com/wiki/MediaWiki:GmapsLoader.js
 */

var map_thumb = "yes"; 
var map_error = 0; 

function generateMap(map_url, map_width, map_height, map_align, map_thumb, map_text)
{
   var URL = map_url;
   URL = URL.slice(7);
   URL = URL.replace(/amp;/gi,'');
   URL = URL.replace(/&output=embed/gi,'');
   if (URL == 'maps.google.ru' || URL == 'maps.google.com') {URL += '/?';}
   URL = '{{Google map|width=' + map_width + '|height=' + map_height + '|align=' + map_align + '|thumb=' + map_thumb + '|text=' + map_text + '|url=' + URL + '}}';
   insertTags('','',URL); 
}

/**
 *
 * English: Open a map-toolbar with parameters to generate an map. 
 *
 * @author: ru:user:gm2wiki
 * @version: see value of var gm2wiki_version into http://ru.gm2.wikia.com/wiki/MediaWiki:GmapsLoader.js
 */

function insertCodeMap()
{
   if (gm2wiki_language == "EN") {
        msg_insertMap_url_error = msg_insertMap_url_error_en;
        msg_insertMap_width_error = msg_insertMap_width_error_en;
        msg_insertMap_height_error = msg_insertMap_height_error_en;
   }
   var map_width = parseInt(document.editform.inputWidth.value,10);
   var map_height = parseInt(document.editform.inputHeight.value,10);
   var map_align = "left"; var i = 0;
   var map_text = document.editform.inputText.value;
   var map_url = document.editform.inputUrl.value;
   for (i = 0; i < document.editform.inputAlign.length; i++) {
        if (document.editform.inputAlign[i].checked) {map_align = document.editform.inputAlign[i].value;}
   }
   if (map_url == "" || map_url.lenth <= 7 || map_url.indexOf("http:") == -1 || map_url.indexOf("maps.google") == -1 || map_url.indexOf("?") == -1) {
       alert(msg_insertMap_url_error); map_error = 1;
   } else {
       if(isNaN(map_width)) {map_error = 1; alert(msg_insertMap_width_error);} else {map_error = 0;}
       if(isNaN(map_height)) {map_error = 1; alert(msg_insertMap_height_error);} else {map_error = 0;}        
   }
   if (map_error == 0) {generateMap(map_url, map_width, map_height, map_align, map_thumb, map_text); close_map_toolbar();}
}

function thumb_box()
{
    var Height = document.getElementById("wpTextbox1");
    if(Height) {
       var int_height_text = 0; 
       var height_text = Height.style.height;
       height_text = height_text.replace(/px/gi,'');
    }
    if (document.editform.notice.checked) {
       map_thumb = "yes"; 
       document.getElementById("notice_field").style.display = "block";
       document.getElementById("thumb_text").style.display = "block";
       document.getElementById("insert_google_map").style.height = "160px";
       if(Height) {int_height_text = parseInt(height_text) - 30;}
    } else {
       map_thumb = "no"; 
       document.getElementById("notice_field").style.display = "none";
       document.getElementById("thumb_text").style.display = "none";
       document.getElementById("insert_google_map").style.height = "130px";
       if(Height) {int_height_text = parseInt(height_text) + 30;}
    }
    if(Height) {
       height_text = int_height_text + "px";
       Height.style.height = height_text;
    }
}

function clear_field(){document.editform.inputUrl.value = "";}

function map_toolbar_switch_language(lang)  // lang: 0 = RU, 1 = EN
{
    if (lang == "1") {
        if (gm2wiki_language == "EN") {return false;}
        gm2wiki_language = "EN";
        document.getElementById("msg_insertMap_header").innerHTML = msg_insertMap_header_en;
        document.getElementById("msg_insertMap_url").innerHTML = msg_insertMap_url_en;
        document.getElementById("msg_insertMap_width").innerHTML = msg_insertMap_width_en;
        document.getElementById("msg_insertMap_height").innerHTML = msg_insertMap_height_en;
        document.getElementById("msg_insertMap_align").innerHTML = msg_insertMap_align_en;
        document.getElementById("msg_insertMap_left").innerHTML = msg_insertMap_left_en;
        document.getElementById("msg_insertMap_center").innerHTML = msg_insertMap_center_en;
        document.getElementById("msg_insertMap_right").innerHTML = msg_insertMap_right_en;
        document.getElementById("msg_insertMap_text").innerHTML = msg_insertMap_text_en;
        document.getElementById("msg_insertMap_thumb").innerHTML = msg_insertMap_thumb_en;
        document.getElementById("msg_insertMap_note").innerHTML = msg_insertMap_note_en;
        document.getElementById("mw-insert-map").title = msg_insertMap_button_cancel_title_en;
        document.getElementById("mw-insert-map").alt = msg_createMap_alt_en;
        document.editform.inputUrl.title = msg_insertMap_url_title_en;
        document.editform.msg_insertMap_clear.title = msg_insertMap_clear_title_en;
        document.editform.msg_insertMap_clear.value = msg_insertMap_clear_en;
        document.editform.msg_insertMap_button_insert.title = msg_insertMap_button_insert_title_en;
        document.editform.msg_insertMap_button_insert.value = msg_insertMap_button_insert_en;
        document.editform.msg_insertMap_button_cancel.title = msg_insertMap_button_cancel_title_en;
        document.editform.msg_insertMap_button_cancel.value = msg_insertMap_button_cancel_en;
        document.editform.msg_insertMap_help.value = msg_insertMap_help_en;
    } else {
        if (gm2wiki_language == "RU") {return false;}
        gm2wiki_language = "RU";
        document.getElementById("msg_insertMap_header").innerHTML = msg_insertMap_header_ru;
        document.getElementById("msg_insertMap_url").innerHTML = msg_insertMap_url_ru;
        document.getElementById("msg_insertMap_width").innerHTML = msg_insertMap_width_ru;
        document.getElementById("msg_insertMap_height").innerHTML = msg_insertMap_height_ru;
        document.getElementById("msg_insertMap_align").innerHTML = msg_insertMap_align_ru;
        document.getElementById("msg_insertMap_left").innerHTML = msg_insertMap_left_ru;
        document.getElementById("msg_insertMap_center").innerHTML = msg_insertMap_center_ru;
        document.getElementById("msg_insertMap_right").innerHTML = msg_insertMap_right_ru;
        document.getElementById("msg_insertMap_text").innerHTML = msg_insertMap_text_ru;
        document.getElementById("msg_insertMap_thumb").innerHTML = msg_insertMap_thumb_ru;
        document.getElementById("msg_insertMap_note").innerHTML = msg_insertMap_note_ru;
        document.getElementById("mw-insert-map").title = msg_insertMap_button_cancel_title_ru;
        document.getElementById("mw-insert-map").alt = msg_createMap_alt_ru;
        document.editform.inputUrl.title = msg_insertMap_url_title_ru;
        document.editform.msg_insertMap_clear.title = msg_insertMap_clear_title_ru;
        document.editform.msg_insertMap_clear.value = msg_insertMap_clear_ru;
        document.editform.msg_insertMap_button_insert.title = msg_insertMap_button_insert_title_ru;
        document.editform.msg_insertMap_button_insert.value = msg_insertMap_button_insert_ru;
        document.editform.msg_insertMap_button_cancel.title = msg_insertMap_button_cancel_title_ru;
        document.editform.msg_insertMap_button_cancel.value = msg_insertMap_button_cancel_ru;
        document.editform.msg_insertMap_help.value = msg_insertMap_help_ru;
    }
}

function clear_map() 
{
    document.editform.inputUrl.value = map_url_value;
    document.editform.inputWidth.value = map_width_value;
    document.editform.inputHeight.value = map_height_value;
    document.editform.inputAlign[0].checked = true;
    document.editform.inputAlign[1].checked = false;
    document.editform.inputAlign[2].checked = false;
    document.editform.inputText.value = "";
    if (map_thumb == "no") {
        map_thumb = "yes";
        document.editform.notice.checked = true;
        if (map_toolbar_display == "on") {
            var Height = document.getElementById("wpTextbox1");
            if(Height) {
                var height_text = Height.style.height;
                height_text = height_text.replace(/px/gi,'');
                var int_height_text = parseInt(height_text) - 30;
                height_text = int_height_text + "px";
                Height.style.height = height_text;
            }
        }
    }
    document.getElementById("notice_field").style.display = "block";
    document.getElementById("insert_google_map").style.height = "160px";
}

function close_map_toolbar() 
{
    var Map = document.getElementById("insert_google_map");
    if (!Map) {return false;} 
     map_toolbar_display = "off";
    var Height = document.getElementById("wpTextbox1");
    if(Height) {
        var height_text = Height.style.height;
        height_text = height_text.replace(/px/gi,'');
        var int_height_text = parseInt(height_text) + 130; 
        if (map_thumb == "yes") {int_height_text += 30;}
    }
    clear_map(); 
    if (gm2wiki_language == "EN") {msg_createMap_title = msg_createMap_title_en;}
    document.getElementById("mw-insert-map").title = msg_createMap_title;
    Map.style.display = "none";
    if(Height) {
        height_text = int_height_text + "px";
        Height.style.height = height_text;
    }
}

function open_map_toolbar() 
{
    var Map = document.getElementById("insert_google_map");
    if (!Map) {return false;}
    map_toolbar_display = "on";
    var Height = document.getElementById("wpTextbox1");
    if(Height) {
        var height_text = Height.style.height;
        height_text = height_text.replace(/px/gi,'');
    }
    clear_map();
    if (gm2wiki_language == "EN") {msg_insertMap_button_cancel_title = msg_insertMap_button_cancel_title_en;}
    document.getElementById("mw-insert-map").title = msg_insertMap_button_cancel_title;
    Map.style.display = "block";
    if(Height) {
        var int_height_text = parseInt(height_text) - 160;
        height_text = int_height_text + "px";
        Height.style.height = height_text;
    }
}

function insertMap() {if (map_toolbar_display == "off") {open_map_toolbar();} else {close_map_toolbar();}}

/**
 *
 * English: Add Map button into toolbar before default buttons. 
 *
 * @author: ru:user:gm2wiki
 * @version: see value of var gm2wiki_version into http://ru.gm2.wikia.com/wiki/MediaWiki:GmapsLoader.js
 */

function createMap() 
{
     var toolbar = document.getElementById('toolbar');
     if (!toolbar) {return false;}
     var textbox = document.getElementById('wpTextbox1');
     if (!textbox) {return false;}
     if (!document.selection && textbox.selectionStart == null) {return false;}
     if (gm2wiki_language == "EN") {
         msg_createMap_alt = msg_createMap_alt_en;
         msg_createMap_title = msg_createMap_title_en;
     }
     var image = document.createElement("img");
     image.width = 23;
     image.height = 22;
     image.src = 'https://images.wikia.nocookie.net/gm2/ru/images/8/88/Button_insert_map.png';
     image.border = 0;
     image.alt = msg_createMap_alt;
     image.title = msg_createMap_title;
     image.style.cursor = "pointer";
     image.id = "mw-insert-map";
     image.onclick = function() {insertMap(); return false;}
     toolbar.appendChild(image);
}

addOnloadHook(createMap);

// END OF Map generator