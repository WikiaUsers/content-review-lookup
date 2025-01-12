(function($, mw) {
    'use strict';
    
    var UFU_JSON_PATH = 'Utaite_Wiki:UFU_mapping.json';
    var ufuMappingCache = null;

    function loadUfuMapping(callback) {
        if (ufuMappingCache) {
            callback(ufuMappingCache);
            return;
        }

        $.ajax({
            url: 'https://utaite.fandom.com/wiki/' + UFU_JSON_PATH + '?action=raw',
            dataType: 'json',
            success: function(data) {
                console.log('Loaded UFU mapping:', data);
                ufuMappingCache = data || {};
                callback(ufuMappingCache);
            },
            error: function(xhr, status, error) {
                console.log('Error loading UFU mapping:', status, error);
                console.log('Creating new UFU mapping');
                ufuMappingCache = {};
                callback(ufuMappingCache);
            }
        });
    }

    function saveUfuMapping(mapping, callback) {
        console.log('Saving UFU mapping:', mapping);
        var api = new mw.Api();
        api.postWithToken('csrf', {
            action: 'edit',
            title: UFU_JSON_PATH,
            text: JSON.stringify(mapping, null, 2),
            summary: 'Updated UFU mapping'
        }).done(function() {
            console.log('Successfully saved UFU mapping');
            ufuMappingCache = mapping;
            if (callback) callback(true);
        }).fail(function(error) {
            console.error('Error saving UFU mapping:', error);
            if (callback) callback(false);
        });
    }

    // Wait for jQuery and the original script to be ready
    $(document).ready(function() {
        // Store original openEditModal function
        var originalOpenEditModal = window.openEditModal;

        // Override openEditModal to handle UFU pre-filling
        window.openEditModal = function(rowIndex, data, $table) {
            console.log('Opening edit modal for:', data);
            loadUfuMapping(function(mapping) {
                // Check if we have a UFU mapping for this utaite
                if (mapping[data.utaite] && !data.ufu) {
                    console.log('Found UFU mapping for', data.utaite, ':', mapping[data.utaite]);
                    data.ufu = mapping[data.utaite];
                }

                // Call original openEditModal
                originalOpenEditModal(rowIndex, data, $table);

                // After modal is opened, ensure UFU field is populated
                setTimeout(function() {
                    if (mapping[data.utaite]) {
                        $('#ufu').val(mapping[data.utaite]);
                    }
                }, 100);
            });
        };

        // Watch for modal creation
        var modalObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length) {
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        var node = mutation.addedNodes[i];
                        if (node.id === 'editModal') {
                            setupFormHandler();
                            return;
                        }
                    }
                }
            });
        });

        modalObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Also watch for changes to the utaite field to auto-fill UFU
        $(document).on('change', '#utaite', function() {
            var utaiteValue = $(this).val();
            if (utaiteValue) {
                loadUfuMapping(function(mapping) {
                    if (mapping[utaiteValue]) {
                        $('#ufu').val(mapping[utaiteValue]);
                        console.log('Auto-filled UFU for', utaiteValue, 'with', mapping[utaiteValue]);
                    }
                });
            }
        });

        function setupFormHandler() {
            var $form = $('#editForm');
            if ($form.length && !$form.data('ufu-enhanced')) {
                console.log('Setting up UFU form handler');
                
                // Store original submit event handlers
                var originalEvents = $._data($form[0], "events");
                var originalSubmit = originalEvents && originalEvents.submit ? 
                    originalEvents.submit.slice() : [];

                // Remove existing submit handlers
                $form.off('submit');

                // Add our handler first
                $form.on('submit', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    var utaite = $('#utaite').val();
                    var ufu = $('#ufu').val();
                    var tableId = $(this).data('table-id');
                    var index = parseInt($('#rowIndex').val());

                    console.log('Form submitted with:', {
                        utaite: utaite,
                        ufu: ufu,
                        tableId: tableId,
                        index: index
                    });

                    loadUfuMapping(function(mapping) {
                        if (ufu) {
                            mapping[utaite] = ufu;
                            console.log('Updating UFU mapping for', utaite, 'with', ufu);
                            saveUfuMapping(mapping, function(success) {
                                if (success) {
                                    console.log('UFU mapping saved successfully');
                                    // Now call original submit handlers
                                    originalSubmit.forEach(function(event) {
                                        event.handler.call($form[0], e);
                                    });
                                } else {
                                    console.error('Failed to save UFU mapping');
                                    mw.notify('Error saving UFU mapping', { type: 'error' });
                                }
                            });
                        } else {
                            // If no UFU, just call original handlers
                            originalSubmit.forEach(function(event) {
                                event.handler.call($form[0], e);
                            });
                        }
                    });
                });

                $form.data('ufu-enhanced', true);
                console.log('UFU form handler setup complete');
            }
        }
    });

    // Export functions for potential external use
    window.ufuMapping = {
        load: loadUfuMapping,
        save: saveUfuMapping
    };

})(jQuery, mediaWiki);