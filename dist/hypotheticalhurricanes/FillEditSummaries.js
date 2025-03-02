/**
 * fillEditSummaries for VisualEditor, based on Grunny's jQuery version of Sikon's original version
 * @author 01miki10
 * @taken from w:c:starwars:MediaWiki:Common.js
 * @modified by StrawberryMaster so it aligns more with the SES script on w:c:dev
 */

function fillEditSummariesVisualEditor() {
    mw.hook('ve.activationComplete').add(function () {
        if ($('#stdEditSummaries').length) return;
        $.get(mw.config.get('wgScript'), { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' }).done(function (data) {
            var $summaryOptionsList,
                $summaryLabel = $('.ve-ui-summaryPanel'),
                $summaryInput = $('.ve-ui-summaryPanel-summaryInputField > input'),
                lines = data.split('\n'),
                $wrapper = $('<div>').addClass('edit-widemode-hide').css('margin', '-.5rem 0 1rem 0').text('Standard summaries: ');

            $summaryOptionsList = $('<select />').attr('id', 'stdEditSummaries').change(function () {
                var editSummary = $(this).val();
                if (editSummary !== '') {
                    $summaryInput.val(editSummary).trigger('change');
                }
            });

            for (var i = 0; i < lines.length; i++) {
                var containsNonWhitespace = /\S/.test(lines[i]);

                if (containsNonWhitespace) {
                    var startsWithNumber = /^\s*\d/.test(lines[i]);
                
                    var optionAttributes = {};
                    if (startsWithNumber) {
                        optionAttributes.disabled = true;
                    }
                    
                    // Excluding non-summary lines
                    if (/^\s*([0-9].*|(--.*)|(\(.*\)))$/.test(lines[i])) {
                        var editSummaryText = (lines[i].indexOf('-- ') === 0) ? lines[i].substring(3) : '';
                        $summaryOptionsList.append($('<option>', optionAttributes).val(editSummaryText).text(lines[i]));
                    }
                }
            }

            $summaryLabel.prepend($wrapper.append($summaryOptionsList));
        });
    });
}

$(fillEditSummariesVisualEditor);