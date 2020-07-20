// adds "tryme" button to sxhl or any .mw-geshi .css
// demo release
mw.hook('wikipage.content').add(function($content) {
    if (!$content.find('.mw-geshi .css').length) return;// abandon ship!
    var $btry = $('<span>', {
        class: 'tryme-css-button tryme-css-try wds-button',
        text:'tryme',
    }),
    $bedit = $('<span>', {
        class: 'tryme-css-button tryme-css-edit wds-button',
        text: 'editme',
    });

    $content.find('.tryme-css-button, .tryme-css-ta').remove();// dbl run protection
    $content.find('.mw-geshi .css').closest('.mw-geshi').append($btry.clone()).append($bedit.clone());
});

// dbl run protection
$('head #tryme-css-system').remove();
$('body').off('click.trymecss');

$('head').append(
    $('<style>', {
        id: 'tryme-css-system',
        text: '.tryme-css-button{float:right;margin-right:5px}',
    })
);

$('body').on('click.trymecss', '.tryme-css-try', function(e) {
    var css = $(this).parent('.mw-geshi').find('.tryme-css-ta.active').length
            ? $(this).parent('.mw-geshi').find('.tryme-css-ta.active').val()
            : $(this).parent('.mw-geshi').find('.css').text();
    $('head #tryme-css').remove();
    $('head').append(
        $('<style>', {
            id: 'tryme-css',
            text: css,
        })
    );
});

$('body').on('click.trymecss', '.tryme-css-edit', function(e) {
    var $parent = $(this).closest('.mw-geshi'),
        $el = $parent.find('.css'),
        $eel = $parent.find('.tryme-css-ta');
    if (!$eel.length) {
        $eel = $('<textarea>', {
            class: 'tryme-css-ta',
        });
        $eel.width($el.width());
        $eel.height($el.height());
        $eel.val($el.text());
        $parent.prepend($eel);
    }
    if ($eel.hasClass('active')) {
        $eel.hide();
        $el.show();
        this.innerText = 'editme';
    } else {
        $eel.show();
        $el.hide();
        this.innerText = 'imdone';
    }
    $eel.toggleClass('active');
});