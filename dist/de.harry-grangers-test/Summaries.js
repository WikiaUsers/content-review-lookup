// ====================
// Original: http://admintools.wikia.com/wiki/MediaWiki:Common.js/standardeditsummaries.js
// Last edited: 23:04, July 13, 2013 (UTC) by SpikeToronto
// Rework by Agent Zuri
// ====================
function parse(text) {
    text = text.replace('/*', '%2F%2A').replace('*/', '%2A%2F');
    var re = new RegExp(/\*{2}/g);
    text = text.replace(re, '#=');
    re = new RegExp(/\*/g);
    text = text.replace(re, '#*');
    var lines = text.split('#*');
    lines.splice(0, 1);
    var elements = {};
    var sublines = [];
    for (var i in lines) {
        sublines[i] = lines[i].replace(/\s+$/, '').split('#=');
    }
    console.log('sublines',sublines);
    for (i in sublines) {
        elements[i] = {};
        elements[i].opt = sublines[i][0];
        var tmp = sublines[i];
        if (sublines[i].length > 1) {
            elements[i].children = [];
            tmp.splice(0, 1);
            elements[i].children.push(tmp);
        }
    }
    return elements;
}

function loadSummary(options) {
    $.ajax({
        'dataType': 'json',
        'data': {
            'titles': options.pagename,
            'action': 'query',
            'prop': 'revisions',
            'rvprop': 'content',
            'format': 'json'
        },
        'url': mw.util.wikiScript('api'),
        'success': function(data) {
            options.successCallback(data);
        },
        'error': function(data) {
            options.errorCallback(data);
        }
    });
}

defaultTemplateEnabled = false;
defaultPrepend = true;

var lodash = mw.loader.getModuleNames().filter(function(m) {
	return m.startsWith('lodash-');
})[0];
mw.loader.using(lodash, function(require) {
    var _ = require(lodash).lodash;
	$(function() {
	    urlparams = (function(str) {
		return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){
			n = n.split("=");
			this[n[0]] = n[1];
			return this;
		}.bind({}))[0];
	    })();
	    if (urlparams.hasOwnProperty('undo')) {
	    	summaryPage = 'MediaWiki:Deletereason-dropdown';
	    } else {
	    	var config = mw.config.get(['wgNamespaceIds', 'wgNamespaceNumber']);
	    	var invertNS = _.invert(config.wgNamespaceIds)[config.wgNamespaceNumber];
	    	summaryPage = 'MediaWiki:Custom-Summary-' + (invertNS == '' ? 'article' : invertNS);
	    }
	    
	    if(window.hasOwnProperty('defaultPrepend') && defaultPrepend) {
	        summaryPage += '|MediaWiki:Custom-Summary-prepend';
	    }
	
	    if (!$('select#stdSummaries').length) {
	        console.info('Load summary code for', summaryPage);
	        // Grafischer Editor (RTE)
	        if (!!$('.module_content #wpSummaryLabel').length) {
	            function RTESummary(pagename, defaultTmpl) {
	                options = {
	                    pagename: pagename,
	                    successCallback: function(data) {
	                        var revs = _.map(data.query.pages, 'revisions');
	                        data = '';
	                        for(var rev in revs) {
	                            data += revs[rev][0]['*'];
	                            if(rev != revs.length) {
	                                data += '\n';
	                            }
	                        }
	                        console.log('summary data', data);
	                        var $label = $('.module_content #wpSummaryLabel');
	
	                        $combo = $('<select />').attr('id', 'stdSummaries').change(function() {
	                            $(this).val() !== '' ? $('#wpSummaryEnhanced,#wpSummary').val($(this).val()) : null;
	                        });
	
	                        $label.after($combo);
	                        $combo.prepend(
	                            $('<option />').prop('disabled',true).text('(Zusammenfassung auswählen)')
	                        );
	
	                        var lines = data.split("\n");
	                        var elements = parse(data);
	                        var optgroup;
	                        var interations = 0;
	                        for (var i in lines) {
	                            interations++;
	                            if (/\*{2}/.test(lines[i])) {
	                                text = lines[i].replace(/\*{2}/, '');
	                                $('<option />').text(text).val(text).appendTo(optgroup);
	                            } else {
	                                $combo.append(optgroup);
	                                text = lines[i].replace(/\*/, '');
	                                optgroup = $('<optGroup />').attr('label', text);
	                            }
	                        }
	                        $('.module_content #wpSummary').css("margin-bottom", '8px');
	                        $('.module_content #stdSummaries').css("width", '258px');
	                        $('.module_content #stdSummaries').css("margin-bottom", '5px');
	                    }
	                };
	                if (defaultTmpl && defaultTemplateEnabled) {
	                    options.errorCallback = function(data) {
	                        pageExists('MediaWiki:Custom-Summary-default', function(data) {
	                            RTESummary('MediaWiki:Custom-Summary-default');
	                        }, function(error) {
	                            console.error('No summaries for this namespace aviable');
	                        });
	                    };
	                }
	                else {                    
	                    options.errorCallback = function(data) {
	                        if($.inArray('sysop', mw.config.get('wgUserGroups')) != -1) {
	                            $('.module_content #wpSummaryLabel').after(
	                                $('<div />')
	                                    .css('font-size','smaller')
	                                    .text('No summaries exist for this namespace')
	                                    .append(
	                                        ' (',
	                                        $('<a />').attr('href', mw.util.getUrl(pagename, { action: 'edit' })).text('create'),
	                                        ')'
	                                     )
	                            );
	                        }
	                    };
	                }
	                loadSummary(options);
	            }
	
	            RTESummary(summaryPage, true);
	        }
	        // Quelltexteditor
	        else {
	            skins = {
	                'oasis': $('#edit_enhancements_toolbar #wpSummaryLabel'),
	                'monobook': $('.editOptions #wpSummaryLabel')
	            };
	
	            $label = skins[mw.config.get('skin')];
	            console.log('haslabel', $label, !$label.size());
	            if (!$label.size()) {
	                return;
	            }
	
	            console.log('summary', summaryPage, 'defaultTmpl', defaultTmpl);
	            loadSummary({
	                pagename: pagename,
	                'success': function(data) {
	                    $combo = $('<select />').attr('id', 'stdSummaries').change(function() {
	                        $(this).val() !== '' ? $('#wpSummaryEnhanced,#wpSummary').val($(this).val()) : null;
	                    });
	
	                    $label.prepend('<br />').prepend($combo).prepend('Summaries: ');
	
	                    var lines = data.split("\n");
	                    var optgroup;
	                    for (var i in lines) {
	                        if (/\*{2}/.test(lines[i])) {
	                            text = lines[i].replace(/\*{2}/, '');
	                            $('<option />').text(text).val(text).appendTo(optgroup);
	                        } else {
	                            $combo.append(optgroup);
	                            text = lines[i].replace(/\*/, '');
	                            optgroup = $('<optGroup />').attr('label', text);
	                        }
	                    }
	                },
	                'error': function(data) {
	                    console.error('No summaries for this namespace aviable');
	                }
	            });
	        }
	    }
	});
});

// </source>