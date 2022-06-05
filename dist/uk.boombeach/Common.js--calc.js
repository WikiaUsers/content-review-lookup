/* <pre> */
//Original file from the RuneScape Wiki
//see documentation at http://runescape.wikia.com/wiki/User:Quarenon/Scripts/Calc
$('.jcConfig').each(function () {
    'use strict';
    var lines = $(this).text().split(($(this).text().indexOf('\r') !== -1) ? '\r' : '\n'),
        template = '',
        formId = '',
        resultId = '',
        tplParams = [],
        acInputs = [],
        suggestNs = [],
        lookups = {},
        i,
        temp,
        vals,
        j,
        ind2,
        $input2,
        $form,
        ind3,
        tParam,
        $table,
        guid,
        $tr,
        $td,
        $select,
        opts,
        j2,
        $option,
        range,
        range2;
 
    // Generate a globally unique ID for an input
    function getGuid(inputId) {
        return formId + resultId + inputId;
    }
 
    // Give an error in the results area
    // TODO For errors on parsing a config, put the error after the config section
    function showError(str) {
        $('#' + resultId).empty().append($('<span />').addClass('jcError').text(str));
    }
 
    // Parse config
    for (i in lines) {
        if (lines.hasOwnProperty(i)) {
            temp = lines[i].split('=');
 
            if (temp.length < 2) {
                continue;
            } else if (temp.length > 2) {
                temp[1] = temp.slice(1,temp.length).join("=");
            }
 
            vals = temp[1].split('|');
 
            for (j in vals) {
                if (vals.hasOwnProperty(j)) {
                    vals[j] = $.trim(vals[j]);
                }
            }
 
            switch ($.trim(temp[0])) {
            case 'template':
                template = vals[0];
                break;
            case 'form':
                formId = vals[0];
                break;
            case 'result':
                resultId = vals[0];
                break;
            case 'suggestns':
                suggestNs = vals[0].split(',');
                break;
            case 'param':
                tplParams.push({name: vals[0], label: (vals[1] === '') ? vals[0] : vals[1], def: vals[2], type: vals[3], range: vals[4]});
                break;
            }
        }
    }
 
    $form = $('<form />').attr({'action': '#', 'id': 'jcForm' + formId}).submit(function () {
        var code, formError, ind, val, tParam2, $input;
 
        function dispResult(response) {
            $('#' + formId + ' .jcSubmit input').val('Submit').removeAttr('disabled');
            $('#bodyContent #' + resultId + ',#WikiaArticle #' + resultId).empty().removeClass('jcError').html(response.parse.text['*']);
            mw.loader.using('jquery.tablesorter', function () {
                $('table.sortable').tablesorter();
            });
            // run a callback, if it exists
			if (window.jccalc && $.isFunction(window.jccalc[resultId])) {
				window.jccalc[resultId]();
			}
        }
 
        function validRange(x, range) {
            if (range === null || range === undefined || range === '') {
                return true;
            }
            var parts = range.split('-');
            if (parts[0] !== '' && x < parseInt(parts[0], 10)) {
                return false;
            }
 
            if (parts[1] !== '' && x > parseInt(parts[1], 10)) {
                return false;
            }
 
            return true;
        }
 
        code = '{{' + template;
        formError = false;
 
        //load template function - queries the wiki api with the template params
        function loadTemplate() {
            code += '}}';
            $('#' + formId + ' .jcSubmit input').val('Loading...').attr('disabled', 'disabled');
 
            $.ajax({
                data: {
                    action: 'parse',
                    text: code,
                    prop: 'text',
                    title: template,
                    format: 'json',
                    disablepp: 'true'
                },
                dataType: 'json',
                type: 'POST',
                url: wgScriptPath + '/api.php',
                success: dispResult,
                error: function (xhr, error) {
                    $('#' + formId + ' .jcSubmit input').val('Submit').removeAttr('disabled');
                    showError(error);
                },
                timeout: window.calcTimeoutLength || 10000 // msec
            });
        }
 
        //setup template for submission
        for (ind in tplParams) {
            if (tplParams.hasOwnProperty(ind)) {
                val = '';
                tParam2 = tplParams[ind];
 
                if (tParam2.type === 'fixed' || tParam2.type === 'hidden') {
                    val = tParam2.def;
                } else {
                    $input = $('#' + getGuid(tParam2.name));
                    val = $input.val();
                    if (tParam2.type === 'int') {
                        val = val.split(',').join('');
                    } else if (tParam2.type === 'check') {
                        val = $input.attr('checked') === 'checked';
                        if (tParam2.range !== undefined) {
                            val = tParam2.range.split(',')[val ? 0 : 1];
                        }
                    }
 
                    if (tParam2.type === 'int' && (val.search(/^-?[0-9]+$/) === -1 || !validRange(val, tParam2.range))) { //int types must be an valid integer or range
                        formError = true;
                    }
                    if (tParam2.type === 'number' && (val.search(/^-?[.0-9]+$/) === -1 || !validRange(val, tParam2.range))) { //number types must be a valid number or range
                        formError = true;
                    }
 
                    if (formError) {
                        $input.addClass('jcInvalid');
                    } else {
                        $input.removeClass('jcInvalid');
                    }
                }
 
                code += '|' + tParam2.name + '=' + val;
            }
        }
 
        if (formError) {
            showError('One or more fields contains an invalid value.');
        } else {
            loadTemplate();
        }
 
        return false;
    });
 
    for (ind2 in suggestNs) {
        if (suggestNs.hasOwnProperty(ind2)) {
            $input2 = $('<input />').attr({'type': 'hidden', 'name': 'ns' + suggestNs[ind2]}).val('1');
            $form.append($input2);
        }
    }
 
    $table = $('<table />').addClass('wikitable jcTable');
 
    //setup form
    for (ind3 in tplParams) {
        if (tplParams.hasOwnProperty(ind3)) {
            tParam = tplParams[ind3];
            $input2 = {};
            if (tParam.type === 'hidden') {
                continue;
            }
 
            guid = getGuid(tParam.name);
 
            $tr = $('<tr />');
            $tr.append($('<th />').append($('<label />').attr('for', guid).html(tParam.label)));
            $td = $('<td />');
            if (tParam.type === 'fixed') {
                $td.text(tParam.def);
            } else if (tParam.type === 'select') {
                $select = $('<select />').attr({name: guid, id: guid});
                opts = tParam.range.split(',');
                for (j2 in opts) {
                    if (opts.hasOwnProperty(j2)) {
                        $option = $('<option />').val(opts[j2]).text(opts[j2]);
                        if (opts[j2] === tParam.def) {
                            $option.attr('selected', 'selected');
                        }
                        $select.append($option);
                    }
                }
                $td.append($select);
            } else if (tParam.type === 'check') {
                $input2 = $('<input />').attr({type: 'checkbox', name: guid, id: guid});
                if (tParam.def === 'true' || (tParam.range !== undefined && tParam.def === tParam.range.split(',')[0])) {
                    $input2.attr('checked', 'checked');
                }
                $td.append($input2);
            } else if (tParam.type === 'hs') {
                range = tParam.range.split(';');
                lookups[tParam.name] = {id: guid, params: []};
                for (i = 0; i < range.length; i++) {
                    range2 = range[i].split(',');
                    lookups[tParam.name].params.push({param: range2[0], skill: range2[1], value: range2[2]});
                }
                $input2 = $('<input />').attr({type: 'text', name: guid, id: guid});
                if (window.localStorage.hsname !== undefined) {
                    $input2.val(window.localStorage.hsname);
                }
                //prevent submission of form when pressing enter
                $input2.keydown(function (e) {
                    if (e.which === 13) {
                        $('#' + $(e.currentTarget).attr('id') + '-button').click();
                        e.preventDefault();
                    }
                });
                $td.append($input2);
                $input2 = $('<input />').attr({class: 'jcLookup', type: 'button', value: 'Lookup', name: guid + '-button', id: guid + '-button', 'data-param': tParam.name});
                $input2.click(function (event) {
                    $('#' + formId + ' input[type="button"].jcLookup').val('Looking up...').attr('disabled', 'disabled');
                    var lkup = lookups[$(event.currentTarget).attr('data-param')], name = $('#' + lkup.id).val().replace(/\s+/g, '_');  //replace spaces with _ for the query
                    $.ajax({
                        url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fservices.runescape.com%2Fm%3Dhiscore%2Findex_lite.ws%3Fplayer%3D" + name + "%22&format=xml'&callback=?",
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            if (data.results[0]) {
                                for (i = 0; i < lkup.params.length; i++) {
                                    $('#' + getGuid(lkup.params[i].param)).val($.trim($(data.results[0]).text()).replace(/\s+/g, '_').split('_')[lkup.params[i].skill].split(',')[lkup.params[i].value]);
                                }
                                window.localStorage.hsname = name;
                            } else {
                                showError("Гравця '" + name + "' не існує, його забанено або не має рейтингу, або ми не змогли отримати ваші результати. Будь ласка, введіть дані вручну.");
                            }
                            $('#' + formId + ' input[type="button"].jcLookup').val('Lookup').removeAttr('disabled');
                        },
                        error: function (xhr, status, error) {
                            $('#' + formId + ' input[type="button"].jcLookup').val('Lookup').removeAttr('disabled');
                            showError(xhr + ': ' + status + ': ' + error);
                        },
                        timeout: 10000 // msec
                    });
 
                });
                $td.append($input2);
            } else {
                $input2 = $('<input />').attr({type: 'text', name: guid, id: guid, value: tParam.def});
                if (tParam.type === 'color') {
                    $input2 = $('<input />').attr({type: 'text', name: guid, id: guid, value: tParam.def}).addClass('color');
                }
                $td.append($input2);
 
                if (tParam.type === 'semihidden') {
                    $tr.css('display', 'none');
                }
 
                if (tParam.type === 'article') {
                    acInputs.push(guid);
                }
            }
            $tr.append($td);
            $table.append($tr);
        }
    }
 
    $tr = $('<tr />');
    $td = $('<td />').addClass('jcSubmit').attr({colSpan: '2'});
    $td.append($('<input />').attr({type: 'submit', value: 'Submit'}));
    $tr.append($td);
    $table.append($tr);
 
    $form.append($table);
    $('#bodyContent #' + formId + ',#WikiaArticle #' + formId).empty().append($form);
 
    // Enable suggest on article fields
    mw.loader.using( ['mediawiki.api','jquery.ui.autocomplete'], function () {
        for (i in acInputs) {
            if (acInputs.hasOwnProperty(i)) {
                var cache = {}; // Cache the results.
                $( '#' + acInputs[i] ).autocomplete( {
                    minLength: 3, // Matching Wikia's search minLength.
                    source: function( request, response ) {
                        var term = request.term;
                        if ( term in cache ) {
                            response( cache[ term ] );
                            return;
                        }
 
                        var api = new mw.Api();
                        api.get( {
                            action: 'opensearch',
                            search: term,
                            namespace: suggestNs.join('|') || 0, // Default to main namespace.
                            suggest: ''
                         } ).done( function ( data ) {
                            cache[ term ] = data[1];
                            response( data[1] );
                         } );
                    }
                });
            }
        }
    });
});
/* </pre> */