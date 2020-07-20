window.CustomUI = window.CustomUI || {};
CustomUI.elements = {
    radio: {
        html:
            '<div class="custom-ui custom-ui-radio-wrapper" data-name="${radio-name}"> \
                <input type="radio" id="${radio-id}" class="custom-ui-radio-elem" name="${radio-name}" /> \
                <label for="${radio-id}" class="custom-ui-radio-label"> \
                    <span class="custom-ui-radio custom-ui-radio-button"></span> \
                    <span class="custom-ui-radio-text">${radio-text || ""}</span> \
                </label> \
            </div>',
        bind: function($content, config){
            $content.find('.custom-ui-radio-elem').on('change', function(event){
                var $radio = $(event.target),
                    id = $radio.attr('id'),
                    $label = $radio.next('.custom-ui-radio-label[for="' + id + '"]'),
                    name = $radio.attr('name');
                $radio.parents('.custom-ui-radio-group').children().each(function(){
                    var $c = $(this);
                    if ($c.attr('data-name') == name){
                        $c.children('')
                    }
                });
                if ($radio.is(':checked') && $label.hasClass('custom-ui-label-checked')){
                    $label.removeClass('custom-ui-label-checked');
                } else {
                    $label.addClass('custom-ui-label-checked');
                }
            });
            $content.find('.custom-ui-radio-label').on('click', function(event){
                var $label = $(event.target).is('.custom-ui-radio-label') ? $(event.target) : $(event.target).parents('.custom-ui-radio-label'),
                    id = $label.attr('for');
                $label.prev('.custom-ui-radio-elem#' + id).trigger('change');
            });
            if (config.checked === true){
                $content.find('.custom-ui-radio-elem').prop('checked', true);
                $content.find('.custom-ui-radio-label').addClass('custom-ui-label-checked');
            }
            if (config.disabled === true){
                $content.find('.custom-ui-radio-elem').prop('disabled', true).off('change');
                $content.find('.custom-ui-radio-elem').off('click');
            }
            return $content;
        }
    },
    'switch': {
        html: {
            wrapper: '',
            content: ''
        }
    },
    checkbox: {
        html: ''
    },
    input: {
        html: ''
    },
    dropdown: {
        html: {
            wrapper: '',
            items: ''
        }
    },
    combobox: {
        html: {
            wrapper: '',
            items: ''
        }
    }
};

CustomUI.parse = function parse(html, data){
    return String(html).replace(/\$\{(.*)\}/g, function(match){
        var identifiers = ['&&', '||', ['?', ':']],
            hasIdentifiers = Array.apply(null, identifiers).some(function(identifier){
                if (typeof identifier == 'object' && identifier instanceof Array){
                    return Array.apply(null, identifier).every(function(ident){
                        return match.indexOf(ident) > -1;
                    });
                } else {
                    return match.indexOf(identifier) > -1;
                }
            }),
            string = '';
        if (hasIdentifiers === true){
            var ids = {
                'and': {
                    handler: function($1, $2){
                        $1 = $1.replace('-', '_');
                        $1 = data[$1];
                        return $1 && $2;
                    }
                },
                'or': {
                    handler: function($1, $2){
                        $1 = $1.replace('-', '_');
                        $1 = data[$1];
                        return $1 || $2;
                    }
                },
                'conditional': {
                    handler: function($1, $2, $3){
                        $1 = $1.replace('-', '_');
                        $1 = data[$1];
                        $2 = $2.replace('-', '_');
                        $2 = data[$2];
                        return $1 ? $2 : $3;
                    }
                }
            };
            Array.apply(null, identifiers).forEach(function(identifier){
                var $1 = '', $2 = '';
                if (typeof identifier == 'string'){
                    if (identifier === '&&'){
                        string = match.split('&&');
                        $1 = match[0],
                        $2 = match[1];
                        $2 = JSON.parse($2);
                        string = ids['and'].call(window, $1, $2);
                    } else if (identifier === '||'){
                        string = match.split('&&');
                        $1 = match[0],
                        $2 = match[1];
                        $2 = JSON.parse($2);
                        string = ids['or'].call(window, $1, $2);
                    }
                } else {
                    if (Array.apply(null, identifier).length){
                        var regex = new RegExp(identifier.map(function(ident){
                            return '\\' + ident;
                        }).join(''), 'g');
                        string = match.split(regex);
                        $1 = match[0],
                        $2 = match[1];
                        var $3 = match[2];
                        $2 = JSON.parse($3);
                        string = ids['conditional'].call(window, $1, $2);
                    }
                }
            });
        } else {
            string = data[match.replace('-', '_')];
        }
        return string;
    });
};