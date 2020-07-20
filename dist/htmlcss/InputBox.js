$(document).ready(function(){
    var $input = $('<form class="htmlcss-input create-box" id="create-box" onsubmit="return false;" name="create-box"><label /><input /><a /></form>'),
        $_data = $('div.createbox-data'),
        id = $_data.attr('data-id');
    $input.find('> label').attr('for', id);
    $input.find('> input').attr({
        'id': id,
        'type': 'text',
        'name': 'createbox'
    });
    $input.find('> a').attr({
        'class': 'htmlcss-button',
        'data-id': id
    })
});