//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝【Random】＝＝＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// Author: Slyst                                                      //
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
$(function() {
    $.fn.extend({
        randomize: function(parent, child) {
            var $this = $(this);
            var r = {
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
                    r.items = [];
                    var items;
                    if (!$this.find('[class^="item-"]').length) {
                        this.index();
                    }
                    $this.find('[class^="item-"]').each(function() {
                        r.items.push($(this).html());
                    });
                },
                generate: function(limit) {
                    var array = this.shuffle(this.items);
                    for (var i = 0; i < limit; i++) {
                        $this.find('.item-' + i).html(array[i]).removeClass();
                    }
                    $this.find('[class^="item-"]').remove();
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
            return r.init();
        }
    });
    if ($('.randomize').length) {
        $('.randomize').each(function() {
            $(this).randomize();
        });
    }
});

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//