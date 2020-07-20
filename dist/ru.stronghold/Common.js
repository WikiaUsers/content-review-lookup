/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

function infoboxToggle() {
	var page = window.pageName.replace(/\W/g, '_');
	var nowShown;
 
	if(document.getElementById('infoboxtoggle').innerHTML == '[Hide]') {
		document.getElementById('infoboxinternal').style.display = 'none';
		document.getElementById('infoboxtoggle').innerHTML = '[Show]';
		nowShown = false;
	} else {
		document.getElementById('infoboxinternal').style.display = 'block';
		document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
		nowShown = true;
	}
 
	if(window.storagePresent) {
		var storage = globalStorage[window.location.hostname];
		storage.setItem('infoboxshow-' + page, nowShown);
	}
}
 

/*Добавляет дополнительные "статусы" участников. Однако прав не дает.*/
 
// rights[""] = [""];
 
// Код написан: Rappy_4187 для англовики.
 
$(function() {
 var rights = {};
 
 
   //Участники, имеющие более одного статуса
 rights["FRAER"]                     = ["ЛОРД,", "КОРОЛЬ"];
 rights["Vladislav4ik"]                     = ["ОСНОВОПОЛОЖНИК"];
 rights["Гриф"]                     = ["ЕГЕРЬ"];
 rights["Крестоносец"]                     = ["ЕГЕРЬ"];
 
 if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});

/*Для шаблона "Ник*/

if (wgUserName != 'null') {
    $('.insertusername').text(wgUserName);
}

/*Для изменения текста в зависимости от пола читателя*/
(function ($, mw) {
    'use strict';
    var userGender = mw.user ? mw.user.options.values.gender : 'unknown';
    if ($('.client-gender-based-text').length) {
        $('.client-gender-based-text').each(function () {
            $(this).html($(this).data(userGender));
        });
    }
}(this.jQuery, this.mediaWiki));