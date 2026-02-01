/*
 * AjaxBlock ([[w:c:dev:AjaxBlock]])
 *
 * @author: Dorumin
 * @scope: Personal use
 * @description: Allows user blocking without leaving the current page.
 * @update 04/05/16: Now detects block and unblock links that were added after window onload.
 * @update 22/05/16: Now supports unblocking IDs + a few minor changes.
 * @update 03/06/16: Now supports the incredibly rare and useless Special:Block?wpTarget=<user> links,
 *                   This script will not run if it was initialized already, or if you right click the link,
 *                   You now have retry, unblock, and re-block links on banner notifications,
 *                   Fixed bug while blocking IDs.
 */
 
$(function() {
    if (window.ajaxBlockinit) return;
    window.ajaxBlockinit = true;
    var ug = mw.config.get('wgUserGroups');
    if (ug.indexOf('sysop') + ug.indexOf('vstf') + ug.indexOf('staff') + ug.indexOf('helper') > -4) {
        // Creates the objects that will hold the variables used in this script
        var obj = window.AjaxBlock || {},
        requestMediaWikiValues = false;
        obj.check = obj.check || {};
        // Quick Block Expiry times (customizable)
        obj.expiryTimes = obj.expiryTimes || {
            '2 hours': '2 hours',
            '5 hours': '5 hours',
            '12 hours': '12 hours',
            '1 day': '1 day',
            '3 days': '3 days',
            '5 days': '5 days',
            '1 week': '1 week',
            '2 weeks': '2 weeks',
            '1 month': '1 month',
            '3 months': '3 months',
            '6 months': '6 months',
            '1 year': '1 year',
            '2 years': '2 years',
            '3 years': '3 years',
            'infinite': 'Infinite'
        };
        // Quick Block reasons (customizable)
        if (!obj.blockReasons) {
            requestMediaWikiValues = true;
            obj.blockReasons = {
                '[[w:Help:Vandalism|Vandalism]]': 'Vandalism',
                '[[w:Help:Spam|Spam]]': 'Spam',
                'Repeated policy violations': 'Repeated violations',
                'Sockpuppetry/Ban Evasion': 'Sockpuppetry',
                'Removing content/blanking pages': 'Page blanking',
                'Inserting false information or nonsense': 'Gibberish',
                'Intimidating behaviour/harassment/trolling': 'Troll/Harassment',
                'Unacceptable username, avatar, or global masthead': 'Name/avatar',
                'Under the legal age': 'COPPA'
            };
        }
        obj.check.creation  = obj.check.creation  == null ? true  : obj.check.creation;
        obj.check.talk      = obj.check.talk      == null ? false : obj.check.creation;
        obj.check.autoBlock = obj.check.autoBlock == null ? true  : obj.check.autoBlock;
        obj.check.override  = obj.check.override  == null ? false : obj.check.override;
        if (requestMediaWikiValues) {
            var Api = new mw.Api();
            Api.get({
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                titles: 'MediaWiki:Ipbreason-dropdown'
            }).done(function(d) {
                var r = d.query.pages;
                if (r['-1']) return; // stick with the default values
                var p = r[Object.keys(r)[0]],
                split = p.revisions[0]['*'].split('\n').filter(Boolean),
                _obj = {},
                lastSection = null;
                $.each(split, function(i, line) {
                    var isL2 = line.charAt(1) == '*';
                    var isL1 = !isL2 && line.charAt(0) == '*';
                    var isL0 = !isL2 && !isL1;
                    line = line.replace(/^\**/, '');
                    if (isL0) {
                        _obj[line] = line;
                    } else if (isL1) {
                        lastSection = line;
                        _obj[line] = {};
                    } else if (isL2) {
                        if (lastSection) {
                            _obj[lastSection][line] = line;
                        } else {
                            _obj[line] = line;
                        }
                    }
                });
                obj.blockReasons = _obj;
            });
        }
        $(document).click(function(e) {
            if (e.which != 1) return;
            var $target = $(e.target);
            // Ajax Block
            if ($target.is('a[href*="/wiki/Special:Block/') || $target.is('a[href*="/wiki/Special:Block?wpTarget="]')) {
                if (e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                var usr = decodeURIComponent($target.attr('href').split($target.is('a[href*="/wiki/Special:Block?wpTarget="]') ? 'Special:Block?wpTarget=' : 'Special:Block/')[1]).replace(/_/g, ' '),
                    token = mw.user.tokens.get('editToken'),
                    Api = new mw.Api();
                // Show the block modal
                $.showCustomModal('Ajax Block: ' + usr, 'Expiry:\
                <select id="AjaxBlockExpirySelect"><option value="other">Other</option></select><br />\
                <input id="AjaxBlockCustomExpiry" type="text" size="50"></input><br />\
                Reason:<select id="AjaxBlockReasonSelect"><option value="other">Other</option></select><br />\
                <input id="AjaxBlockCustomReason" type="text" size="50"></input><br />\
                <input id="accountCreation" type="checkbox"></input><label for="accountCreation">Prevent account creation</label><br />\
                <input id="disableWall" type="checkbox"></input><label for="disableWall">Prevent from posting on message wall</label><br />\
                <input id="autoBlock" type="checkbox"></input><label for="autoBlock">Block all IPs from this user (AutoBlock)</label><br />\
                <input id="overrideBlock" type="checkbox"></input><label for="overrideBlock">Override any blocks already in effect</label>', {
                    id: 'ajaxBlockModal',
                    callback: function() {
                        // Auto checks checkboxes (customizable)
                        if (obj.check.creation) $('#accountCreation').attr('checked', true);
                        if (obj.check.talk) $('#disableWall').attr('checked', true);
                        if (obj.check.autoBlock) $('#autoBlock').attr('checked', true);
                        if (obj.check.override) $('#overrideBlock').attr('checked', true);
                        var $expirySelect = $('#AjaxBlockExpirySelect');
                        var $reasonSelect = $('#AjaxBlockReasonSelect');
                        // Adds the common times and reasons (customizable)
                        $.each(obj.expiryTimes, function(key, value) {
                            $expirySelect
                                .append($('<option></option>')
                                    .attr('value', key)
                                    .text(value));
                        });
                        $.each(obj.blockReasons, function(key, value) {
                            if (typeof value == 'string') {
                                $reasonSelect
                                    .append($('<option></option>')
                                        .attr('value', key)
                                        .text(value));
                            } else {
                                var $group = $('<optgroup>', {
                                    label: key
                                });
                                $.each(value, function(_key, _value) {
                                    $group
                                        .append($('<option>')
                                        .attr('value', _key)
                                        .text(_value));
                                });
                                $reasonSelect.append($group);
                            }
                        });
                    },
                    buttons: [{ // Block button
                        id: 'ajaxBlockButton',
                        defaultButton: true,
                        message: 'Block this user',
                        handler: function() {
                            var blockDuration = $('#AjaxBlockExpirySelect').val() == 'other' ? $('#AjaxBlockCustomExpiry').val().toLowerCase() : $('#AjaxBlockExpirySelect').val().toLowerCase();
                            var blockReason = $('#AjaxBlockReasonSelect').val() == 'other' ? $('#AjaxBlockCustomReason').val() : $('#AjaxBlockReasonSelect').val() + ($('#AjaxBlockCustomReason').val().trim() !== '' ? ': ' + $('#AjaxBlockCustomReason').val() : '');
                            // Creates the base block object
                            var config = {
                                action: 'block',
                                user: usr,
                                expiry: blockDuration,
                                reason: blockReason,
                                bot: true,
                                token: token
                            };
 
                            // Set object values if certain checkboxes are checked
                            if ($('#accountCreation').is(':checked')) config.nocreate = 1;
                            if ($('#autoBlock').is(':checked')) config.autoblock = 1;
                            if (!$('#disableWall').is(':checked')) config.allowusertalk = 1;
                            if ($('#overrideBlock').is(':checked')) config.reblock = 1;
                            Api.post(config).done(function(d) { // Does the actual blocking
                                if (!d.error) {
                                    new BannerNotification(usr + ' has been blocked successfully! (<a href="/wiki/Special:Unblock/' + usr + '" style="text-decoration: none !important;">unblock</a>)', 'confirm').show();
                                } else {
                                    new BannerNotification('An error occurred while blocking ' + usr + ': ' + d.error.code + '. (<a href="/wiki/Special:Block/' + usr + '" style="text-decoration: none !important;">retry</a>)', 'error').show();
                                }
                            }).fail(function() {
                                new BannerNotification('An error occurred while blocking ' + usr + ' (<a href="/wiki/Special:Block/' + usr + '" style="text-decoration: none !important;">retry</a>)', 'error').show();
                            });
                            $('#ajaxBlockModal').closeModal(); // Close the modal
                            setTimeout(function() {
                                if (wgCanonicalSpecialPageName == 'Contributions') {
                                    window.location.reload(); // Refresh (to check if its correct, or if something went wrong)
                                }
                            }, 2000);
                        }
                    }, { // Cancel button
                        id: 'ajaxBlockCancel',
                        defaultButton: true,
                        message: 'Cancel',
                        handler: function() {
                            $('#ajaxBlockModal').closeModal();
                        }
                    }]
                });
                // Ajax Unblock
            } else if ($target.is('a[href*="/wiki/Special:Unblock/') || $target.is('a[href*="/wiki/Special:Unblock?wpTarget="]')) {
                if (e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                var isId = $target.is('a[href*="/wiki/Special:Unblock?wpTarget=%23'),
                    usr = isId ? $target.attr('href').split('?wpTarget=%23')[1] : decodeURIComponent($target.attr('href').split('Special:Unblock/')[1]).replace(/_/g, ' '),
                    token = mw.user.tokens.get('editToken'),
                    Api = new mw.Api();
                // Show the unblock modal
                $.showCustomModal('Ajax Unblock: ' + (isId ? '#' : '') + usr, 'Reason:<input id="AjaxUnblockReason" type="text" size="50"></input>', {
                    id: 'ajaxUnblockModal',
                    buttons: [{ // Unblock button
                        id: 'ajaxUnblockButton',
                        defaultButton: true,
                        message: 'Unblock this user',
                        handler: function() {
                            var unblockReason = $('#AjaxUnblockReason').val();
                            config = {
                                action: 'unblock',
                                reason: unblockReason,
                                token: token
                            };
                            config[isId ? 'id' : 'user'] = usr;
                            Api.post(config).done(function(d) { // Does the actual unblocking
                                if (!d.error) {
                                    new BannerNotification(usr + ' has been unblocked successfully!' + (!isId ? ' (<a href="/wiki/Special:Block/' + usr + '" style="text-decoration: none !important;">re-block</a>)' : ''), 'confirm').show();
                                } else {
                                    new BannerNotification('An error occurred while unblocking ' + usr + ': ' + d.error.code + '. (<a href="/wiki/Special:Unblock' + (isId ? '?wpTarget=%23' + usr : '/' + usr) + '" style="text-decoration: none !important;">retry</a>)', 'error').show();
                                }
                            })
                            .fail(function() {
                                new BannerNotification('An error has occurred while unblocking ' + usr + '. (<a href="/wiki/Special:Unblock' + (isId ? '?wpTarget=%23' + usr : '/' + usr) + '" style="text-decoration: none !important;">retry</a>)', 'error').show();
                            });
                            $('#ajaxUnblockModal').closeModal(); // Close the modal
                            setTimeout(function() {
                                if (wgCanonicalSpecialPageName == 'Contributions') {
                                    window.location.reload();
                                }
                            }, 2000);
                        }
                    }, { // Cancel button
                        id: 'ajaxUnblockCancel',
                        defaultButton: true,
                        message: 'Cancel',
                        handler: function() {
                            $('#ajaxUnblockModal').closeModal();
                        }
                    }]
                });
            }
        });
    }
});