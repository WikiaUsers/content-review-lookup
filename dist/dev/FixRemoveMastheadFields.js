/* FixRemoveMastheadFields
 *
 * Lets you remove fields in your user masthead naturally, without adding any extra UI, just fixing the one that's already there
 *
 * @author Dorumin
 */

(function() {
    var $masthead = $('#UserProfileMasthead'),
    wgTrackId = mw.config.get('wgTrackID');

    if (
        !$masthead.exists() ||
        $masthead.find('#user').attr('value') != wgTrackId ||
        window.FixRemoveMastheadFields && FixRemoveMastheadFields.init
    ) return;

    window.FixRemoveMastheadFields = $.extend({
        observer: null,
        target: document.body,
        config: {
            attributes: false,
            childList: true,
            subtree: false
        },
        trackId: wgTrackId,
        modalId: 'blackout_UPPLightboxWrapper',
        attrMap: {
            gender: 'UserProfilePagesV3_gender'
        },
        onModalAdded: function(modal) {
            var save = modal.querySelector('.buttons .button[data-event="save"]');
            if (!save) return;
            save.addEventListener('click', this.onSave.bind(this, modal));
        },
        onSave: function(modal) {
            var inputs = modal.querySelectorAll('input[type="text"]'),
            i = inputs.length,
            attrs = {},
            post = false;
            while (i--) {
                var input = inputs[i];
                if (!input.value) {
                    attrs[this.attrMap[input.name] || input.name] = input.value;
                    post = true;
                }
            }

            if (post) {
                // Thanks Kocka <3
                $.ajax({
                    url: 'https://services.fandom.com/user-attribute/user/' + this.trackId,
                    type: 'PATCH',
                    data: attrs,
                    xhrFields: {
                        withCredentials: true
                    }
                });
            }
        },
        callback: function(mutations) {
            var i = mutations.length;
            while (i--) {
                var mutation = mutations[i];
                if (mutation.type == 'childList') {
                    var j = mutation.addedNodes.length;
                    while (j--) {
                        var child = mutation.addedNodes[j];
                        if (child.id == this.modalId) {
                            this.onModalAdded(child);
                        }
                    }
                }
            }
        },
        init: function() {
            this.observer = new MutationObserver(this.callback.bind(this));

            this.observer.observe(this.target, this.config);
        }
    }, window.FixRemoveMastheadFields);

    FixRemoveMastheadFields.init();
})();