importScriptPage("MediaWiki:Wikia.js/userRightsIcons.js");
importScriptPage("ExtendedNavigation/code.js", "dev");


function addComboBox(){
    var comboBoxHTML = 
            '<nav class="wikia-combo-box combo-box">' +
                      '<ul class="textfield">' +
                          '<li class="combo-box-textfield">' +
                              '<input type="text" placeholder="Type here!" />' +
                          '</li>' +
                          '<li class="combo-box-arrow combo-box-menu-parent">' +
                              '<a style="cursor: pointer;" class="toggle-combo-box-menu">' +
                                  '<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron" />' +
                              '</a>' +
                              '<ul class="combo-box-menu" style="overflow-x: auto; max-height: 300px;">' +
                                  '<li>' +
                                      '<a href="#" class="combo-box-option">Test</a>' +
                                  '</li>' +
                                  '<li>' +
                                      '<a href="#" class="combo-box-option">Hello World</a>' +
                                  '</li>' +
                              '</ul>' +
                          '</li>' +
                      '</ul>' +
                  '</nav>';
    $('div.combo-box-wrapper').append(comboBoxHTML);
}

$('.toggle-combo-box-menu').click(function(){
    $('.combo-box-menu').toggle();
});

$('.combo-box-option').click(function(){
    $('.combo-box-textfield input').val($(this).text());
});

if ($('div.combo-box-wrapper').length >= 1){
    addOnloadHook(addComboBox);
}

window.importArticle({
    type: 'style',
    article: 'MediaWiki:ComboBox.css'
});

(function(mw, $){
   if (wgUserGroups.indexOf('sysop') != -1 || wgUserGroups.indexOf('bureaucrat') != -1){
      $('.WikiaUserPagesHeader .tabs').append('<li><a href="/wiki/Special:AdminDashboard">Dashboard</a></li>');
   }
}(mediawiki, jQuery));