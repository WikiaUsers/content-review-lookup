$(document).ready(function(){
    if ($('div.randomizer').length){
        var digits = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?:~'.split('');
        $('div.randomizer').html([
            $('<input />', {
                'type': 'text',
                'class': 'randomizer-input',
                'id': 'randomizer-input',
                prop: {
                    'readonly': true
                }
            }),
            $('<a />', {
                'href': '#',
                'class': 'wds-button wds-is-squished',
                text: 'Generate',
                on: {
                    'click': function(event){
                        event.preventDefault();
                        var $s = $('input#randomizer-input'),
                            s = '';
                        for (
                            var i = 0;
                            i < $('div.randomizer').attr('data-langth') ? Number($('div.randomizer').attr('data-length')) : 10;
                            i++
                        ){
                            s += digits[Math.floor(Math.random() * digits.length)];
                        }
                        $s.val(s);
                    }
                }
            })
        ]);
    }
});