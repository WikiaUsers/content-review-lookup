importScriptPage('Standard_Edit_Summary/code.js', 'dev');

// Новые статьи //
$(function(){
	$('<section class="rail-module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Шаблон:RailModule&action=render');
});

// Спойлеры //
if ($('.js-items-spoilers').length) {
    // Controls row HTML
    var controls = '<tr colspan="2" class="js-items-controls"><td><div class="js-items-buttons">' +
        '<span class="button" data-type="show">&darr;</span>' +
        '<span class="button" data-type="hide">&uarr;</span>' +
        '</div></td></tr>';
 
    // Adding controls row
    $('.js-items-spoilers').prepend(controls);
 
    // Initialize click event
    $('.js-items-controls .button').click(function() {
        var $jsItemsParent = $(this).closest('.js-items-spoilers'),
            toggleType = $(this).data('type');
 
        // For each show/hide actions
        $jsItemsParent.find('.t_show_hide').each(function() {
            var $btnIndex = $(this).find('a').attr('id').replace(/\D/g, ''),
                $tableBody = $('#collapsibleTable' + $btnIndex + '>tbody>tr:last-child');
 
            if ((toggleType === 'show' && $tableBody.attr('style')) 
                || (toggleType === 'hide' && !$tableBody.attr('style'))
               ) {
                collapseTable($btnIndex);
            }
        });
    });
}

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };