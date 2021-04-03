(function() {
    if(!$('#WikiaRail').exists()) {
        return;
    }
    $.get('https://services.wikia.com/discussion/2575/threads', function(d) {
        var elements = d._embedded.contributors[0].userInfo.splice(0, 5).map(function(el) {
            return $('<a>', {
                href: mw.util.wikiGetlink('User:' + el.name),
                class: 'wds-avatar-stack__avatar',
                title: el.name
            }).append(
                $('<img>', {
                    class: 'wds-avatar',
                    src: (el.avatarUrl || 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest') + '/scale-to-width-down/30'
                })
            );
        });
        if($('.discussions-module').exists()) {
            $('.discussions-module .wds-avatar-stack').append(elements);
        } else {
            var interval = setInterval(function() {
                if($('.discussions-module').exists()) {
                    clearInterval(interval);
                    $('.discussions-module .wds-avatar-stack').append(elements);
                }
            }, 100);
        }
    });
})();

$(function(){
    $('a[data-canonical="random"]').text("Randomizer");
})

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:

$('<a>', {
	href: '#toc',
	class: 'toc-link',
	title: 'Table of Contents'
}).insertBefore('#mw-content-text h2 .editsection, #mw-content-text h3 .editsection');

$('.Wall.Board').on('input','.cke_source',function() {
    parent = $(this).closest('.SpeechBubble');
    if(parent.hasClass('new-reply')) {
        sessionStorage.setItem('message_wall_' + wgArticleId + '_tread_' + parent.parents('.SpeechBubble').data('id'),$(this).val());
    }
    else if(parent.hasClass('new-message')) {
        sessionStorage.setItem('message_wall_' + wgArticleId + '_tread_new',$(this).val());
    }
});
 
$('.Wall.Board').on('focus','.cke_source',function() {
    parent = $(this).closest('.SpeechBubble');
    if(parent.hasClass('new-reply')) {
        $(this).val(sessionStorage.getItem('message_wall_' + wgArticleId + '_tread_' + parent.parents('.SpeechBubble').data('id')));
    }
    else if(parent.hasClass('new-message')) {
        $(this).val(sessionStorage.getItem('message_wall_' + wgArticleId + '_tread_new'));
    }
});
 
$('.Wall.Board').on('keypress','.cke_source',function(e) {
    if(e.which === 13 && e.ctrlKey) {
        $(this).closest('.SpeechBubble').find('.replyButton').click();
    }
});

toolbar = skin == 'oasis' ? $('.wikia-bar .toolbar .tools') : $('.portlet#p-tb .pBody > ul');
$(toolbar).append(
    $('<li />').append(
        $('<a />').attr('href','#').text('Invert Color Brightness').click(function() { 
            $('body').toggleClass('body.theme-bright')
        })
    )
);