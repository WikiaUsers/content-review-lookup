/ From: http://ru.siegenax.wikia.com/wiki/Участник:Kopcap94/Something.js /

$(function() {
    if (!$('li.new-reply').length) {
        return;
    }
    
    answer_object = {
        prepare: function() {
            var data_answers = {
                'Темы' : 'Используйте [[Справка:Конструктор тем|конструктор тем]].',
                'Чат'  : 'Ознакомьте со следующими справочными статьями: [[Справка:Чат|Чат]]'
            };
            
            var answer_button = '<button class="ansbutton" style="margin:0 10px 5px 0; min-width:95px; height:15px; line-height:14px" onclick="answer_object.buttons($(this))" ';
            
            var answers_form = $(
                '<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;">' +
                    '<textarea class="answerfield" style="width:100%; height:50px;" />' +
                    '<div class="buttonfield" style="border-top:1px solid black; border-bottom:1px solid black; margin-top:5px; max-height:150px; overflow-y:scroll; padding:5px; text-align:center;" />' +
                '</fieldset>'
            );
    
            $.each(data_answers, function(k,v) {
                answers_form.find('.buttonfield').append(
                    answer_button + 'data-message="' + v + '">' + k + '</button>'
                );
            });
            
            answer_object.init(answers_form);
        },
        
        init: function(modalForm) {
            $('.MiniEditorWrapper').bind("DOMSubtreeModified", function() {
                switch(mw.config.get('skin')) {
                    case 'oasis':
                        if (!$(this).hasClass('editor-open')) {
                            return;
                        }
                        text_area = '.new-message';
                        break;
                    case 'monobook':
                        if (!$(this).parent().hasClass('open')) {
                            return;
                        }
                        text_area = '.replyBody';
                        break;
                }
 
                var $that = $(this);
        
                $that.unbind("DOMSubtreeModified");
                $that.find('.speech-bubble-buttons').prepend('<button class="AddText secondary" style="display:inline-block; float:left; margin-top:10px; margin-left:10px;">Ответы</button>');
                
                $that.find('.AddText').click(function() {
                    answer_object.modal(modalForm, $that, text_area);
                });
            });
        },
        
        modal: function(modalForm, that, add_to) {
            $.showCustomModal('Варианты ответы', modalForm, {
                id: 'answersForm',
                width: 600,
                buttons: [{
                    message: "Готово",
                    handler: function() {
                        that.find(add_to).val($('.answerfield').val());
                        $("#answersForm").closeModal();
                    }
                },{
                    message: "Отменить изменение",
                    handler: function () {
                        $('.answerfield').val(prev_message);
                    }
                },{
                    message: "Отчистить",
                    handler: function () {
                        $('.ansbutton.secondary').toggleClass('secondary');
                        $('.answerfield').val(default_message);
                    }
                },{
                    message: "Закрыть",
                    handler: function () {
                        $("#answersForm").closeModal();
                    }
                }]
            });
            
            default_message = prev_message = that.find(text_area).val();
            $('.answerfield').val(default_message);
        },
        
        buttons: function(that) {
            prev_message = $('.answerfield').val();
            $('.answerfield').val(default_message + ((default_message === '') ? '':' ') +$(that).attr('data-message'));
        }
    };
    
    answer_object.prepare();
});