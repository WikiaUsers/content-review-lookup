/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

mw.loader.implement("ext.popups@1wum5",function($,jQuery,require,module){mw.requestIdleCallback(function(){var isTouchDevice='ontouchstart'in document.documentElement;if(!isTouchDevice){mw.loader.using('ext.popups.main');}});});

$(document).ready(function () {

  $(document).on('click', '.spoiler-text', function() {
$(this).removeClass('on');
  });
});

// Configuring SpoilerAlert from dev.fandom.com/wiki/SpoilerAlert

window.SpoilerAlertJS = {
question: 'Данная часть статьи содержит спойлеры и/или домыслы, которые могут оказаться спойлерами в будущем. Ты точно уверен, чъто желаешь просмотреть?',
yes: 'Да',
no: 'Нет',
fadeDelay: 1600
};


// Expand All
var expandAllFlag = 0;
var $expandAll = $('.expandAll a');
$('.expandAll a').click(function(){
if (expandAllFlag === 0){
$('.mw-collapsible .mw-collapsible-toggle-collapsed').click();
expandAllFlag = 1;
$expandAll.text('Свьртнути вьсо');
} else {
$('.mw-collapsible .mw-collapsible-toggle-expanded').click();
expandAllFlag = 0;
$expandAll.text('Развьртнути вьсо');
}
});
// END of Expand All

// Шаблон:Вкладки / Template:Tabs
$(function() {
// If a sub-tab is "selected", make the parent tabs also "selected"
$('.at-selected').parents('.article-tabs li').each(function () {
$(this).addClass('at-selected');
});

// Margin fix
$('.article-tabs .at-selected .article-tabs').each(function () {
// Get height of subtabs
var $TabsHeight = $(this).height();

// Increase bottom margin of main tabs
$(this).parents('.article-tabs').last().css('margin-bottom' , '+=' + $TabsHeight);
});
});
// END of Template:Tabs