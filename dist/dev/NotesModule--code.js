// @author: [[w:c:dev:User:Original Authority]]
$(function () {
    'use strict';
 
    function langs (i18n) {
        $('#WikiaRail').prepend(
            '<section class="chat-module rail-module">' +
                '<h2 class="headernote">' + i18n.msg('notes').escape() + '</h2>' +
                '<ul id="notes" class="actualnotes"></ul>' +
                '<input type="text" id="txtNote" placeholder="' + i18n.msg('addNote').escape() + '">' +
                '<br />' +
                '<div class="entry-button wds-is-secondary wds-button wds-is-squished" id="btnSave">' + i18n.msg('save').escape() + '</div>' +
                '<div class="entry-button wds-is-secondary wds-button wds-is-squished" id="btnClear">' + i18n.msg('clear').escape() + '</div>' +
            '</section>'
        );
 
        var noteCount = 1;
 
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).indexOf('note') !== -1) {
               $('#notes').append('<li id="note' + noteCount + '" data-id="' + localStorage.key(i) + '">' + localStorage.getItem(localStorage.key(i)) + '</li>');
                noteCount += 1;
            }
        }
 
        $('#btnSave').on('click', function () {
            var noteVal = $('#txtNote').val();
 
            if (noteVal.trim() !== '') {
                localStorage.setItem('note' + noteCount, noteVal);
 
                var notevaluehtml = $('<li class="fadedin" id="note' + noteCount + '">' + noteVal + '</li>').css({
                    'background': wgSassParams['color-buttons'],
                    'padding': '10px',
                    'margin': '5px',
                    'color': 'white',
                    'text-align': 'center',
                    'font-size': '17px',
                    'font-style': 'italic',
                    'border': '1px solid'
                });
 
                $(notevaluehtml).hide().appendTo('#notes').fadeIn(1000);
                noteCount += 1;
            }
 
            $('#btnClear').on('click', function () {
                Object.keys(localStorage).forEach(function (key) {
                    if (key.startsWith('note')) {
                        localStorage.removeItem(key);
                    }
                });
                $('.actualnotes').fadeOut(1000);
            });
        });
 
         $('#notes li').on("click", function () {
	 var clickedBtnID = $(this).attr('id');
		var clearMe = $('li#' + clickedBtnID);
		localStorage.removeItem(clearMe.data('id'));
            clearMe.fadeOut(1000);
        });
 
        $('.headernote').css({
            'margin': '0 !important',
            'text-align': 'center',
            'font-size': '25px !important',
            'font-style': 'italic'
        });
 
        $('.actualnotes li').css({
            'background': wgSassParams['color-buttons'],
            'padding': '10px',
            'margin': '5px',
            'text-align': 'center',
            'font-size': '17px',
            'font-style': 'italic',
            'border': '1px solid'
        });
 
        $('#txtNote').css({
            'background': 'transparent',
            'border': 'none',
            'text-align': 'center',
            'margin-left': '20%',
            'float': 'center',
            'color': $('p').css('color'),
            'font-style': 'italic'
        });
 
        $('#btnClear').css({
            'float': 'right'
        });
    }
 
    mw.hook('dev.i18n').add(function (i18no) {
        i18no.loadMessages('NotesModule').then(langs);
    });
 
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});