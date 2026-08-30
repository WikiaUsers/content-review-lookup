(function () {
    'use strict';

    function setupEditSummaryRequirement(target) {
        if (!target || !target.constructor || !target.constructor.static) {
            return;
        }

        if (target.constructor.static.name !== 'article') {
            return;
        }

        target.on('surfaceReady', function () {

            if (target._summaryRequirementInstalled) {
                return;
            }

            target._summaryRequirementInstalled = true;
            target.on('saveWorkflowChangePanel', function () {
                setTimeout(function () {

                    var dialog = ve.init.target && ve.init.target.saveDialog;

                    if (!dialog || !dialog.$element) {
                        return;
                    }

                    var $dialog = dialog.$element;

                    // Find the edit-summary input.
                    var $summary = $dialog.find(
                        'textarea[name="wpSummary"], textarea'
                    ).filter(function () {
                        var $this = $(this);

                        return (
                            $this.attr('name') === 'wpSummary' ||
                            $this.attr('placeholder') &&
                            /summary/i.test($this.attr('placeholder'))
                        );
                    }).first();

                    if (!$summary.length) {
                        return;
                    }


                    var $save = $dialog.find(
                        '.oo-ui-processDialog-actions-primary .oo-ui-buttonElement-button'
                    ).last();

                    if (!$save.length) {
                        return;
                    }

                    function updateSaveButton() {
                        var empty = !$summary.val().trim();

                        $save.prop('disabled', empty);

                        if (empty) {
                            $save.attr(
                                'title',
                                'Enter an edit summary before saving.'
                            );
                        } else {
                            $save.removeAttr('title');
                        }
                    }


                    updateSaveButton();


                    $summary.off(
                        'input.requiredEditSummary'
                    ).on(
                        'input.requiredEditSummary',
                        updateSaveButton
                    );

                }, 100);
            });
        });
    }

    mw.hook('ve.newTarget').add(function (target) {
        setupEditSummaryRequirement(target);
    });

})();
    
    checkSummary();

    
    $('#wpSummary').on('input', checkSummary);
});