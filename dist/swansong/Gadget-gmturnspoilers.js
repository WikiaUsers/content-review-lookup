window.spoilerTags = [
    {
        selector: '.GM-turn-spoilers',
        notice: '<p>This section contains spoilers from GM turns.</p><p><a href="#show">Click here to reveal it.</a></p><p style="margin-top:20px">You can make all spoilers visible by default by disabling the gadget in your <a href="/wiki/Special:Preferences#mw-prefsection-gadgets">preferences</a>.</p>'
    }
];

$(function(){
    $(spoilerTags).each(function(i, tag) {
        $('#mw-content-text').find(tag.selector).each(function(i, elem) {
            $e = $(elem);
            if($e.css('display') == 'inline') return;
            var notice = $('<div></div>').addClass('spoiler-section-notice').append($('<span></span>').html(tag.notice));
            notice.css({
                top: '-' + $e.css('border-top-width'),
                left: '-' + $e.css('border-left-width'),
                right: '-' + $e.css('border-right-width'),
                bottom: '-' + $e.css('border-bottom-width'),
            });
            $e.prepend(notice).css({'visibility':'visible'});
            notice.find('a[href=\'#show\']').click(function(e) {
                $this = $(this);
                $this.closest('.spoiler-section-notice').fadeOut(250).queue(function(){$this.remove()});
                e.preventDefault();
                return false;
            });
        });
    });
});