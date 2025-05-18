/* Any JavaScript here will be loaded for all users on every page load. */

mw.loader.using(['oojs-ui'], function () 
    $(function () {
        if (mw.config.get('wgCanonicalSpecialPageName') !== 'UserRights') return;

        const form = document.querySelector('#mw-userrights-form');
        const submitButton = document.querySelector('input[name="saveusergroups"]');
        const bureaucratCheckbox = document.querySelector('#wpGroup-bureaucrat');

        if (!form || !submitButton || !bureaucratCheckbox) return;

        let confirmed = false;

        form.addEventListener('submit', function (e) {
            if (confirmed) return; // Prevent double dialogs

            if (bureaucratCheckbox.checked) {
                e.preventDefault();

                const dialog = new OO.ui.MessageDialog();
                const windowManager = new OO.ui.WindowManager();
                $(document.body).append(windowManager.$element);
                windowManager.addWindows([dialog]);

                windowManager.openWindow(dialog, {
                    title: '⚠️ Confirm Bureaucrat Promotion',
                    message: 'You are promoting this user to <strong>Bureaucrat</strong>. This group has full administrative access. Proceed with caution.',
                    actions: [
                        { action: 'accept', label: 'Yes, promote', flags: ['primary', 'progressive'] },
                        { action: 'cancel', label: 'Cancel', flags: ['safe', 'close'] }
                    ]
                }).then(function (closing) {
                    if (closing.action === 'accept') {
                        confirmed = true;
                        form.submit(); // Proceed
                    }
                    // If cancel, do nothing
                });
            }
        });
    }));