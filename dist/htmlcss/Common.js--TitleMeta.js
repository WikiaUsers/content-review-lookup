/* Any JavaScript here will be loaded for all users on every page load. */
/***
 * This is the script for the custom title script.
 * This script is based on the original title meta script.
 * 
 * Appropriated to the wiki by Ultimate Dark Carnage.
 ***/
 
const TitleMeta = {
    loaded: false,
    init: function(enabled){
        if (!enabled || TitleMeta.loaded) return;
        var _types = {
            'code': '<code>$1</code>',
            'class': '<code class="css-class-sel">$1</code>',
            'id': '<code class="css-id-sel">$1</code>',
            'html': '<code class="html">$1</code>',
            'attribute-sel': '<code class="attr-sel">$1</code>'
        };
        
        var $title_meta = $('#title-meta');
        switch (skin){
            case 'wikia':
            case 'oasis':
                var align = $title_meta.attr('data-align'),
                    type = $title_meta.attr('data-type'),
                    text = $title_meta.html(),
                    result = '',
                    title_cont = $('<span class="custom-title-container" />');
                if ('string' == typeof type)
                    result = _types[type].replace('$1', text);
                else
                    result = text;
                
                title_cont.html(result);
                $('#WikiaPageHeader').find('h1').html(title_cont);
                
                if ('string' == typeof align)
                    $('#WikiaPageHeader').find('h1').css('text-align', align);
                break;
            case 'monobook':
                var _align = $title_meta.attr('data-align'),
                    _type = $title_meta.attr('data-type'),
                    _text = $title_meta.html(),
                    _result = '',
                    _title_cont = $('<span class="custom-title-container" />');
                if ('string' == typeof _type)
                    _result = _types[_type].replace('$1', _text);
                else
                    _result = _text;
                
                _title_cont.html(_result);
                $('.firstHeading').find('h1').html(_title_cont);
                
                if ('string' == typeof _align)
                    $('.firstHeading').find('h1').css('text-align', _align);
                break;
            default:
                return;
        }
        TitleMeta.loaded = true;
    }
};

if ($('#title-meta').length === 1){
    $(document).ready(function(){
        TitleMeta.init((typeof SKIP_TITLE_REWRITE == 'boolean' && SKIP_TITLE_REWRITE === true) ? false : true);
    });
}