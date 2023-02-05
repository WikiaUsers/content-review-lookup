/* Any JavaScript here will be loaded for all users on every page load. */

// Randomizer for "Did You Know" section of the main page. Author: Slyst

$(function() {
    $.fn.extend({
        randomize: function(parent, child) {
            var $this = $(this);
            var randomize = {
                items: [],
                index: function() {
                    if (!parent) {
                        parent = $this.data('parent') || $this.find(':first-child');
                    }
                    if (!child) {
                        child = $this.data('child') || parent.children(':first-child') || parent;
                    }
                    var elem = (parent !== child) ? $this.find(parent).find(child).eq(0).parent().children(child) : $this.find(parent);
                    elem.each(function(i) {
                        $(this).addClass('item-' + i);
                    });
                },
                store: function() {
                    randomize.items = [];
                    if (!$this.find('[class^="item-"]').length) {
                        this.index();
                    }
                    $this.find('[class^="item-"]').each(function() {
                        randomize.items.push($(this).html());
                    });
                },
                generate: function(limit) {
                    var array = this.shuffle(this.items);
                    for (var i = 0; i < limit; i++) {
                        $this.find('.item-' + i).html(array[i]).addClass('shuffled');
                    }
                    $this.find('[class^="item-"]').not('.shuffled').remove();
                },
                shuffle: function(array) {
                    for (var i = array.length - 1; i > 0; i--) {
                        var random = Math.floor(Math.random() * (i + 1)),
                            temp = array[i];
                        array[i] = array[random];
                        array[random] = temp;
                    }
                    return array;
                },
                init: function() {
                    this.store();
                    if (!$this.data('limit')) {
                        $this.attr('data-limit', $this.find('[class^="item-"]').length);
                    }
                    this.generate($this.data('limit'));
                }
            };
            return randomize.init();
        }
    });
    if ($('.randomize').length) {
        $('.randomize').each(function() {
            $(this).randomize();
        });
    }
});

// Welcome module. More info on the page "Forum:Welcome messages and spoilers". Author:Slyst
$(function() {
    var welcome;
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:Welcome',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').append(
                $('<section>')
                    .addClass('module')
                    .addClass('welcome-module')
                    .append(
                        $('<h2>')
                            .addClass('activity-heading')
                            .html($.parseHTML(data.parse.text['*'])[0].innerHTML)
                    )
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                $.parseHTML(data.parse.text['*'])[1].innerHTML.replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'passer-by'))
                            )
                            .append(
                                $('<div>')
                                    .addClass('buttons-container')
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .attr('id', 'remove')
                                            .text('Don\'t show again')
                                    )
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .addClass('talk')
                                            .addClass('comments')
                                            .addClass('secondary')
                                            .attr('id', 'cancel')
                                            .text('Dismiss')
                                    )
                            )  
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('.welcome-module .anons').show();
            }
            $('.welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('.welcome-module').fadeOut('slow');
            });
            $('.welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('.welcome-module').fadeOut('slow');
            });
        });
    }
});