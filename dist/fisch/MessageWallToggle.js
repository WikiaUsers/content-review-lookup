/**
 * MessageWallToggle.js
 * Allows administrators to globally lock/unlock message walls.
 * Uses MediaWiki:DisabledMessageWalls page to store state.
 * 
 * @author xGronox/v.lad
 * @version 3.0
 */

$(function() {
    'use strict';

    if (window.messageWallToggleLoaded) return;
    window.messageWallToggleLoaded = true;

    // Only proceed on Message Wall pages
    var pageName = mw.config.get('wgPageName');
    if (pageName.indexOf('Message_Wall:') === -1) return;

    var isSysop = mw.config.get('wgUserGroups').includes('sysop');
    var api = new mw.Api();
    
    // Function to get list of disabled walls
    function getDisabledWalls(callback) {
        api.get({
            action: 'query',
            prop: 'revisions',
            titles: 'MediaWiki:DisabledMessageWalls',
            rvprop: 'content',
            formatversion: 2
        }).done(function(response) {
            var page = response.query.pages[0];
            var disabledWalls = [];
            
            if (!page.missing && page.revisions) {
                try {
                    disabledWalls = page.revisions[0].content
                        .split('\n')
                        .filter(line => line.trim() !== '')
                        .map(line => line.trim());
                } catch (e) {}
            }
            
            callback(disabledWalls);
        });
    }

    // Function to update disabled walls list
    function updateDisabledWalls(isDisabled, callback) {
        getDisabledWalls(function(walls) {
            var index = walls.indexOf(pageName);
            var changed = false;
            
            if (isDisabled && index === -1) {
                walls.push(pageName);
                changed = true;
            } else if (!isDisabled && index !== -1) {
                walls.splice(index, 1);
                changed = true;
            }
            
            if (changed) {
                api.postWithToken('csrf', {
                    action: 'edit',
                    title: 'MediaWiki:DisabledMessageWalls',
                    text: walls.join('\n'),
                    summary: (isDisabled ? 'Disabled' : 'Enabled') + ' Message Wall: ' + pageName
                }).done(function() {
                    if (callback) callback(true);
                }).fail(function() {
                    if (callback) callback(false);
                });
            } else {
                if (callback) callback(true);
            }
        });
    }

    function createToggle() {
        if (!isSysop || $('#wall-toggle').length) return;

        var container = $('<div>')
            .addClass('view-filter')
            .css({
                'display': 'inline-flex',
                'align-items': 'center',
                'margin-left': '15px'
            });

        var toggle = $('<input>')
            .attr({
                'type': 'checkbox',
                'id': 'wall-toggle'
            })
            .css('display', 'none');

        var label = $('<label>')
            .attr('for', 'wall-toggle')
            .text('Wall Input')
            .css({
                'position': 'relative',
                'display': 'inline-block',
                'padding-left': '50px',
                'cursor': 'pointer',
                'font-size': '14px',
                'line-height': '24px'
            });

        var toggleBg = $('<span>')
            .css({
                'position': 'absolute',
                'left': '0',
                'width': '40px',
                'height': '24px',
                'background': '#999',
                'border-radius': '12px',
                'transition': 'background 0.3s'
            });

        var toggleHandle = $('<span>')
            .css({
                'position': 'absolute',
                'left': '4px',
                'top': '4px',
                'width': '16px',
                'height': '16px',
                'background': '#fff',
                'border-radius': '50%',
                'transition': 'left 0.3s'
            });

        getDisabledWalls(function(walls) {
            var isDisabled = walls.includes(pageName);
            toggle.prop('checked', !isDisabled);

            if (!isDisabled) {
                toggleBg.css('background', '#00b7e0');
                toggleHandle.css('left', '20px');
            }

            // Handle toggle changes
            toggle.on('change', function() {
                var isChecked = toggle.prop('checked');
                
                toggle.prop('disabled', true);
                label.css('opacity', '0.5');

                updateDisabledWalls(!isChecked, function(success) {
                    if (success) {
                        if (isChecked) {
                            toggleBg.css('background', '#00b7e0');
                            toggleHandle.css('left', '20px');
                        } else {
                            toggleBg.css('background', '#999');
                            toggleHandle.css('left', '4px');
                        }
                        window.location.reload();
                    } else {
                        toggle.prop('checked', !isChecked);
                    }
                    toggle.prop('disabled', false);
                    label.css('opacity', '');
                });
            });
        });

        label.append(toggleBg, toggleHandle);
        container.append(toggle, label);

        var filtersContainer = $('.messagewall-filters__filters');
        if (filtersContainer.length) {
            filtersContainer.append(container);
        }
    }

    // Function to check and apply disabled state
    function checkAndApplyState() {
        getDisabledWalls(function(walls) {
            if (walls.includes(pageName)) {
                $('.InlineEntityFormWrapper_inline-entity-form-wrapper__z2Uf9').hide();
                $('.FormEntryPoint_form-entry-point__E4Elr').hide();
            }
        });
    }

    // Initialize
    function init() {
        if (isSysop) {
            if ($('.messagewall-filters__filters').length) {
                createToggle();
            } else {
                setTimeout(init, 500);
            }
        }
        checkAndApplyState();
    }

    init();

    // Also try when wall is activated
    mw.hook('messageWall.activated').add(init);
});