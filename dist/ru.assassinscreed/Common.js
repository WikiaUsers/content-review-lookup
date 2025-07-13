/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Инструмент описания правок */

// ================================================================
// Standard edit summaries
// Source Editor - Original RuneScape Wiki with slight label change
// Visual Editor - Modified by Casualty Wiki from here
// with slight label change
// Updated by Assassin's Creed Wiki/ru
// ================================================================

$(function() {
	function createCombo(inputSelector) {
        var $combo = $('<select />').attr('id', 'stdSummaries').on('change', function() {
            var val = $(this).val();
            if (val !== '') {
                $(inputSelector).val(val);
            }
        });
        $combo.append($('<option>').val('').prop('selected', true).text('Ничего не выбрано'));
        return $combo;
    }

    function loadSummaries($combo) {
        $.ajax({
            dataType: 'text',
            data: {
                title: 'Template:Stdsummaries',
                action: 'raw',
                ctype: 'text/plain'
            },
            url: mw.config.get('wgScript'),
            success: function(data) {
                var lines = data.split("\n");
                $.each(lines, function(index, line) {
                    var val = (line.indexOf('-- ') === 0) ? line.substring(3) : '';
                    var text = (line.indexOf('-- ') === 0) ? '  ' + line.substring(3) : line;
                    var disable = (line.indexOf('-- ') === 0 || line.indexOf('(') === 0) ? '' : 'disabled';
                    var $opt = $('<option>').val(val).prop('disabled', !!disable).text(text);
                    $combo.append($opt);
                });
            },
            error: function() {
                console.error('Failed to load Template:Stdsummaries');
            }
        });
    }

    // ====================
    // Source Editor
    // ====================
	if ($('#wpSummaryLabel').length) {
    	var $container = $('#wpSummaryLabel');

    	var $label = $container.find('label[for="wpSummary"]');
    	if (!$label.length) {
    		return;
    	}
    	
    	var $combo = createCombo('#wpSummary');
    	$label.after($combo);
    	loadSummaries($combo);
    	
    	$('#stdSummaries').css({
    		'margin-left': '5px',
    		'display': 'inline-block'
    	});
    }

    // ====================
    // Visual Editor
    // ====================
    mw.hook('ve.activationComplete').add(function() {
    	var $container = $('.ve-ui-summaryPanel-summaryInputField');
    	if (!$container.length) {
    		return;
    	}

    	var $existingCombo = $('#stdSummaries');
    	if ($existingCombo.length) {
    		$existingCombo.remove();
    	}

    	var $combo = createCombo('input[name="wpSummary"]');
    	$container.after($combo);
    	loadSummaries($combo);

    	$('input[name="wpSummary"]').css({'margin-bottom': '5px'});
    });
});