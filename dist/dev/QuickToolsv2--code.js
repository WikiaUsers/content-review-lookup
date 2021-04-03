//<nowiki>
$(function (window, $, mw) {
    "use strict";
    //Global Variables
    var page_name = mw.config.get("wgPageName"),
        server = mw.config.get("wgServer")+wgScriptPath ,
        token = mw.user.tokens.values.editToken,
        page_id = mw.config.get("wgArticleId"),
        namespace = mw.config.get("wgNamespaceNumber"),
        usergroups = mw.config.get("wgUserGroups"),
        signature = "~~~~",
        $container,
        modal_button_name;
    
    //Customization
    if (window.QuickToolsAdvancedtop === undefined) {
        window.QuickToolsAdvancedtop = true;
    }

    //Adds buttons
    if ($('#advanced_tools').length > 0) {
        console.log('Already installed, finished this execution');
        return;
    }
    if (window.QuickToolsAdvancedtop) {
        var node = document.createElement('a');
        node.textContent = "Quick Tools (version 2)";
        node.id = "advanced_tools";
        node.className = "wds-button wds-is-squished wds-is-secondary";
        node.addEventListener('click', function () {
            mainMenu();
        });
        $(node).insertBefore($('.page-header__contribution-buttons'));
    } else {
        // Button styles
        var colorButtons = mw.config.get('wgSassParams')['color-buttons'];
        mw.util.addCSS('#quicktoolsv2 .wikia-button {background:' + colorButtons + '; border: 1px solid ' + colorButtons + '; box-sizing: content-box; color: #000; cursor: pointer; display: inline-block; font-family: Helvetica,Arial,sans-serif; font-size: 12px;height: 19px;line-height: 20px;margin: 0;padding: 0 10px; text-decoration: none; white-space: nowrap;} #quicktoolsv2 .wikia-button:not(:last-child) {margin-bottom:0.1rem};');
        $('<li id="ca-at"><a id="at-open">QuickToolsv2</a></li>').appendTo('#p-cactions > .pBody > ul');
        $('#at-open').click(function () {
            mainMenu();
        });
        mw.loader.load($.getSassCommonURL('skins/oasis/css/core/modal.scss'), 'text/css');
        mw.loader.load($.getSassCommonURL('skins/oasis/css/core/buttons.scss'), 'text/css');
    }
    mw.util.addCSS('#advanced_tools{color: inherit; margin-bottom:5px;}');
    //Un-urlencoding pagename
    page_name = page_name.replace(/_/g, ' ');

    function getlogs(user) {
        $.getJSON(server + '/api.php?action=query&list=logevents&letype=block&lelimit=500&format=json&letitle=User:' + user, function (data) {
            if (data.query.logevents.length === 0) {
                alert('No previous block !');
                return;
            }
            var blocklist = "";
            for (var item in data.query.logevents) {
                blocklist += "\nUser blocked by " + data.query.logevents[item].user + " at " + new Date(data.query.logevents[item].timestamp.slice(0, -1)).toLocaleString() + ' for : "' + data.query.logevents[item].comment + '"';
            }
            alert(blocklist);
        });
    }

    function getblocks() {
        var usertounblock = "";
        if (wgNamespaceNumber == 2 || wgNamespaceNumber == 1200 || wgNamespaceNumber == 500) {
            usertounblock = page_name.split(':')[1];
        }
        if (wgCanonicalSpecialPageName == "Contributions") {
            usertounblock = page_name.split('/')[1];
        }
        var userblock = [];
        $.getJSON(server + '/api.php?action=query&list=blocks&bkprop=user|expiry&bklimit=100&format=json', function (data) {
            var blocks = data.query.blocks;
            for (var i in blocks) {
                userblock.push(blocks[i].user);
            }
            for (i = 0; i < userblock.length; i++) {
                if (usertounblock == userblock[i]) {
                    $("#unblock-option").html($("#unblock-option").html() + '<option selected>' + userblock[i] + '</option><br>');
                } else {
                    $("#unblock-option").html($("#unblock-option").html() + '<option>' + userblock[i] + '</option><br>');
                }
            }
            if ($("#unblock-option option").length === 0) {
                alert('No block user');
                $('#unblock-option').append($('<option>', {
                    value: 'none',
                    text: 'No block user !'
                }));
                $("#unblock-option").prop('disabled', true);
                return;
            }
        });
    }
    //Get page's category
    function getpagecategory(page) {
        var pageid = "";
        $.getJSON(server + '/api.php?action=query&format=json&indexpageids=&titles=' + page, function (data) {
            pageid = data.query.pageids[0];
            $.getJSON(server + '/api.php?action=query&prop=categories&format=json&titles=' + encodeURIComponent(page), function (data) {
                console.log(data);
                $("#select-categories option").attr('selected', false);
                for (var i in data.query.pages[pageid].categories) {
                    $("#select-categories option[value='" + data.query.pages[pageid].categories[i].title.split(':')[1] + "']").attr('selected', 'selected');
                }
                alert('Updated !');
            });
        });
    }

    function userrightsform(user) {
        $.ajax({
            type: "GET",
            url: wgServer+wgScriptPath  + wgArticlePath.slice(0, -2) + 'Special:UserRights/' + user,
            success: function (content) {
                var userrightstoken = $(content).find('input[name="wpEditToken"]').val();
                var content = "<fieldset>" + $(content).find('#mw-userrights-form2 fieldset').html() + "</fieldset>";
                $('#quicktoolsadvancedcontainer').html(content);
                $('.mw-submit > input:nth-child(1)').replaceWith('<div class="button" id="user-rights-submit">' + $('.mw-submit > input:nth-child(1)').val() + '</div>');
                $('#user-rights-submit').click(function () {
                    var userincludedgroups = [];
                    var userexcludedgroups = [];
                    $('.mw-userrights-groups').find('tr:last td:last input').each(function () {
                        if ($(this).attr('checked')) {
                            userincludedgroups.push($(this).attr('id').split('-')[1]);
                        } else {
                            userexcludedgroups.push($(this).attr('id').split('-')[1]);
                        }
                    });
                    var url = server + '/api.php?action=userrights&format=json&user=' + user + '&token=' + encodeURIComponent(userrightstoken) + '&add=' + userincludedgroups.join('|') + '&remove=' + userexcludedgroups.join('|') + '&reason=' + $('#wpReason').val();
                    $.post(url, function (data) {
                        if (data.error) {
                            alert(data.error.code);
                        }
                        $('#quicktoolsv2').closeModal();
                        document.location.reload(false);
                    });
                });
            },
            error: function (data) {
                alert('Error : ' + data.error.info);
            }
        });
    }
    //Get all wikia's category
    function getallcategories() {
        $.getJSON(server + '/api.php?action=query&list=allcategories&format=json&acmin=1&aclimit=500', function (data) {
            for (var i in data.query.allcategories) {
                $('#select-categories').append($('<option>', {
                    value: data.query.allcategories[i]['*'],
                    text: data.query.allcategories[i]['*']
                }));
            }
            if ($('#select-categories option').length === 0) {
                alert('No categories found !');
                $('#select-categories').append($('<option>', {
                    value: 'none',
                    text: 'No categories found'
                }));
                $('#select-categories option').prop('disabled', true);
            }
        });
    }
    //Main menu modal
    function mainMenu() {
        var startdate = new Date();
        $.showCustomModal("Quick Tools (version 2)", '<form class="WikiaForm" method="" name=""><fieldset><div id="quicktoolsv2button" style="float:left; width:30%;"><div style="text-align: center;"><a class="wikia-button sysop" id="at-block">Block user</a><a class="wikia-button sysop" id="at-unblock">Unblock user</a><a class="wikia-button bureaucrat" id="at-userrights">User rights</a><a class="wikia-button" id="at-categories">Manage categories</a><a class="wikia-button sysop" id="at-delete">Delete page</a><a class="wikia-button" id="at-move">Move page</a><a class="wikia-button sysop" id="at-protect">(Un)Protect page</a><a class="wikia-button" id="at-purge">Purge page</a><a class="wikia-button" id="at-redirect">Redirect page</a><a class="wikia-button thispage" id="at-redlinks">Remove redlinks</a><a class="wikia-button thispage" id="at-template">Add template</a><a class="wikia-button thispage" id="at-unsigned">Add unsigned</a><a class="wikia-button sysop" id="at-batch">Batch delete</a><a class="wikia-button" id="at-massnulledit">MassNullEdit</a></div></div><div id="quicktoolsadvancedcontainer" style=" overflow:hidden; width:70%"></div><div style="clear:both;"><br /><h4> User rights : ' + usergroups.join() + '</h5><hr><h4 style="font-style: italic; float:left;color:black;">QuickTools 2 created by <a href="//dev.wikia.com/wiki/User:Gguigui1" target="_blank">Gguigui1</a>, source code inspired and improved from QuickTools created by <a href="//dev.wikia.com/wiki/User:Shining-Armor" target="_blank">Shining-Armor</a>.</h5><br><p>Page will be infer if you clicked on QuickTools on a page.</p><p>User IP or username will be infer if you clicked on QuickTools on a user profile, user contributions, user wall or user blog list.</p><p>Template will be infer if you are on a template page.</p></div></form>', {
            id: "quicktoolsv2",
            width: 650,
            buttons: [{
                id: "close-menu",
                defaultButton: true,
                message: "Close form",
                handler: function () {
                    $("#quicktoolsv2").closeModal();
                }
            }]
        });
        mw.util.addCSS('#quicktoolsv2button .wikia-button { width:80%; } #quicktoolsadvancedcontainer > * {max-width:95%;} #quicktoolsadvancedcontainer input {width:60%;}');
        $container = $('#quicktoolsadvancedcontainer');
        $container.html('<p style="font-size:130%">Click on a button at the left to load the form.</p>');
        $('.thispage').each(function () {
            $(this).html($(this).html() + " (this page)");
        });
        if (usergroups.indexOf('content-moderator') + usergroups.indexOf('sysop') + usergroups.indexOf('helper') + usergroups.indexOf('soap') + usergroups.indexOf('staff') + usergroups.indexOf('util') + usergroups.indexOf('bureaucrat') + wgUserGroups.indexOf('wiki-manager') == -8) {
            $('.bureaucrat').fadeOut(500, function() {
				$('.bureaucrat').remove();
			});
            $container.find('p:first').html($container.find('p:first').html() + '<br>NON-BUREAUCRAT VERSION');
        } else {
            $container.find('p:first').html($container.find('p:first').html() + '<br>BUREAUCRAT VERSION');
            $('#at-userrights').click(function () {
                var usertouserrights = "";
                if (wgNamespaceNumber == 2 || wgNamespaceNumber == 1200 || wgNamespaceNumber == 500) {
                    usertouserrights = page_name.split(':')[1];
                }
                if (wgCanonicalSpecialPageName == "Contributions") {
                    usertouserrights = page_name.split('/')[1];
                }
                $container.html('<strong>Username to change rights:</strong><br /><input id="user-rights-user" value="' + usertouserrights + '" placeholder="Test"></input>');
                modal_button_name = "Change rights";
                $container.append('<br><br><div style=""><div class="button" id="submit">' + modal_button_name + '</div>');
                $('#submit').click(function () {
                    var user = $('#user-rights-user').val();
                    userrightsform(user);
                });
            });
        }
        if (usergroups.indexOf('content-moderator') + usergroups.indexOf('sysop') + usergroups.indexOf('helper') + usergroups.indexOf('VSTF') + usergroups.indexOf('staff') + usergroups.indexOf('util') == -6) {
            $('.sysop').fadeOut(500, function() {
				$('.sysop').remove();
			});
            $container.find('p:first').html($container.find('p:first').html() + '<br>NON-SYSOP VERSION');
        } else { //Program sysop button if user is sysop or has global rights
            $container.find('p:first').html($container.find('p:first').html() + '<br>SYSOP VERSION');
            $("#at-block").click(function () {
                var usertoblock = "";
                var options = ["Prevent account creation", "Prevent this user from posting on their own Message Wall while blocked", "Automatically block the last IP address used by this user, and any subsequent IP addresses they try to edit from", "Watch this user's user and talk pages", "Prevent logged-in users from editing from this IP address"];
                var apioptions = ["&nocreate", "", "&autoblock", "&watchuser", ""];
                if (wgNamespaceNumber == 2 || wgNamespaceNumber == 1200 || wgNamespaceNumber == 500) {
                    usertoblock = page_name.split(':')[1];
                }
                if (wgCanonicalSpecialPageName == "Contributions") {
                    usertoblock = page_name.split('/')[1];
                }
                $container.html('<strong>Username/IP to block:</strong><br /><input type="text" id="block-username" placeholder="Username/IP" value="' + usertoblock + '" style=""></input><div class="button" id="checkblocklog">Check user\'s block log</div><br /><strong>Duration of the block:</strong><br /><input type="text" id="block-duration" placeholder="2 Weeks" style=""></input><br /><strong>Reason for blocking:</strong><br /><input type="text" id="block-reason" placeholder="Vandalism" style=""></input>');
                $container.append('<br><br><select multiple id="userblockoptions"/>');
                for (i = 0; i < options.length; i++) {
                    $("#userblockoptions").append('<option value="' + apioptions[i] + '">' + options[i] + '</option>');
                }
                modal_button_name = "Block";
                $container.append('<br><br><div style=""><a class="button" id="submit">' + modal_button_name + '</div>');
                $('#submit').click(function () {
                    if ($('#userblockoptions').val()) {
                        var complements = $('#userblockoptions').val().join('');
                    } else {
                        var complements = "";
                    }
                    if (!$('#userblockoptions option:eq(1)').attr('selected')) {
                        complements += "&allowusertalk";
                    }
                    if (!$('#userblockoptions option:eq(4)').attr('selected')) {
                        complements += "&anononly";
                    }
                    var user = $('#block-username').val(),
                        expiry = $('#block-duration').val(),
                        reason = $('#block-reason').val();
                    ajaxBlock(user, expiry, reason, complements);
                });
                $('#checkblocklog').click(function () {
                    if (!$('#block-username').val()) {
                        alert('Type a user !');
                        return;
                    }
                    getlogs($('#block-username').val());
                });
            });
            $("#at-unblock").click(function () {
                $container.html('<strong>Username/IP to unblock:</strong><br /><select id="unblock-option"></select><br /><strong>Reason for unblocking:</strong><br /><input type="text" id="unblock-reason" placeholder="Error" style=""></input>');
                modal_button_name = "Unblock";
                $container.append('<br><br><div style=""><a class="button" id="submit">' + modal_button_name + '</div>');
                $('#submit').click(function () {
                    if ($('#unblock-option').val() == "none") {
                        return;
                    }
                    var user = $('#unblock-option option:selected').html(),
                        reason = $('#unblock-reason').val();
                    ajaxUnBlock(user, reason);
                });
                getblocks();
            });
            $("#at-delete").click(function () {
                var pagetodelete = "";
                if (wgNamespaceNumber === 0 || wgNamespaceNumber == 6) {
                    pagetodelete = page_name;
                }
                $container.html('<strong>Title of page to delete:</strong><br/><input type="text" value="' + pagetodelete + '" id="delete-page" placeholder="Quick Tools" style=";"></input><br /><strong>Reason for deleting: </strong><br /><input type="text" id="delete-reason" placeholder="Spam" style=";"></input>');
                modal_button_name = "Delete";
                $container.append('<br><br><div style=""><a class="button" id="submit">' + modal_button_name + '</div>');
                $('#submit').click(function () {
                    var page = document.getElementById('delete-page').value,
                        reason = document.getElementById('delete-reason').value;
                    ajaxDelete(page, reason);
                });
            });
            $("#at-protect").click(function () {
                var pagetoprotect = "";
                if (wgNamespaceNumber === 0 || wgNamespaceNumber == 6) {
                    pagetoprotect = page_name;
                }
                $container.html('<strong>Edit :</strong><select id="edit-restriction"><option value="edit=sysop">Sysop only</option><option value="edit=autoconfirmed">Autoconfirmed users</option><option value="edit=all">All users</option></select>&nbsp;<strong>Move :</strong><select id="move-restriction"><option value="|move=sysop">Sysop only</option><option value="|move=autoconfirmed">Autoconfirmed users</option><option value="|move=all">All users</option></select><br /><strong>Page to (un)protect :</strong><input type="text" id="protect-page" placeholder="Important page" style=";" value="' + pagetoprotect + '"></input><br /><strong>Duration of protection:</strong><br /><input type="text" id="protect-duration" style=";" placeholder="3 days"></input><br /><strong>Reason for (Un)Protecting: </strong><br /><input type="text" id="protect-reason" placeholder="Vandalism" style=";"></input>');
                modal_button_name = "(Un)Protect";
                $container.append('<br><br><div style=""><a class="button" id="submit">' + modal_button_name + '</div>');
                $('#submit').click(function () {
                    var page = document.getElementById('protect-page').value,
                        duration = document.getElementById('protect-duration').value,
                        reason = document.getElementById('protect-reason').value;
                    ajaxProtect(page, duration, reason);
                });
            });
            $("#at-batch").click(function () {
                $container.html('<textarea id="abd-textarea" style="height: 20em; width:500px;"></textarea><p><label for="abd-reason">Delete reason:</label><input id="abd-reason"style="width: 20em;" type="text"></p><br /><pre style="border: solid 1px grey; ; height: 60px; overflow: scroll;" id="abd-output"></pre>');
                modal_button_name = "Start!";
                $container.append('<br><br><div style=""><a class="button" id="submit">' + modal_button_name + '</div>');
                $('#submit').click(function () {
                    ajaxDeleteStart2();
                });
            });
        }
        $("#at-move").click(function () {
            var pagetomove = "";
            if (wgNamespaceNumber === 0 || wgNamespaceNumber == 6) {
                pagetomove = page_name;
            }
            $container.html('<strong>Page to be renamed:</strong><br /><input type="text" value="' + pagetomove + '" id="move-page" placeholder="Dicember" style=""></input><br /><strong>Page destination:</strong><br /><input type="text" id="move-destination" placeholder="December" style=""></input><br /><strong>Reason for moving: </strong><br /><input type="text" id="move-reason" placeholder="I like this better" style=";"></input><br /><strong>Leave a redirect </strong><input type="checkbox" id="redirect-check" />');
            modal_button_name = "Move";
            $container.append('<br><br><div style=""><a class="button" id="submit">' + modal_button_name + '</div>');
            $('#submit').click(function () {
                var movepage = document.getElementById('move-page').value,
                    destination = document.getElementById('move-destination').value,
                    reason = document.getElementById('move-reason').value;
                ajaxMove(movepage, destination, reason);
            });
        });
        $("#at-categories").click(function () {
            var pagetocategorize = "";
            if (wgNamespaceNumber === 0 || wgNamespaceNumber == 6) {
                pagetocategorize = page_name;
            }
            $container.html('<strong>All categories:</strong><br/><select multiple id="select-categories"/><br/><strong>Page to categorize:</strong><br/><input type="text" placeholder="Test" id="page-categories" value="' + pagetocategorize + '"/><a class="button" id="page-valid">Get page categories</a><br><br><h5>This page allows you to add category to a page, type a page in the input then click on the button to update the select, category pages will be selected and you could select or unselect categories to add or remove. All selected categories will be added, unselected will be removed.<br>Once categories clicked, click on the submit button to add or remove this categories to the page.</h5>');
            modal_button_name = "Categorize the page";
            $container.append('<br><br><div style=""><a class="button" id="submit">' + modal_button_name + '</div>');
            $('#submit').click(function () {
                if ($('#select-categories').val() == "none") {
                    return;
                }
                var categories = $('#select-categories').val() || [],
                    page = $('#page-categories').val();
                ajaxCategories(page, categories);
            });
            $('#page-valid').click(function () {
                getpagecategory($('#page-categories').val());
            });
            getallcategories();
        });
        $("#at-massnulledit").click(function () {
            var template = "";
            if (wgNamespaceNumber == 10) {
                template = page_name.split(':')[1];
            }
            $container.html('<textarea id="nulledittemplate-error" style="background-color:red; height: 15em; width:500px;"></textarea><p style="vertical-align:middle;"><label for="nulledittemplate-pages">Pages to null edit:</label><textarea id="nulledittemplate-pages" style="vertical-align:middle;height: 20em; width:500px;"/></p><br /><p>Template used in pages to null edit:</p><input id="nulledittemplate-template" style="width:20em;" type="text" value="' + template + '"placeholder="Template without namespace"><a class="button" id="nulledittemplate-template-button">Update pages</a></input>');
            modal_button_name = "Start!";
            $container.append('<br><br><div style=""><a class="button" id="submit">' + modal_button_name + '</div>');
            $('#submit').click(function () {
                if ($(this).hasClass('disabled')) return;
                var pages = $('#nulledittemplate-pages').val().split('\n');
                $('#nulledittemplate-pages').prop('disabled', true);
                $('#submit').addClass('disabled');
                $('#nulledittemplate-template').prop('disabled', true);
                $('#nulledittemplate-template-button').addClass('disabled');
                nulledit(pages);
            });
            $('#nulledittemplate-template-button').click(function () {
                if ($(this).hasClass('disabled')) return;
                var pages = [];
                $.ajax({
                    type: "GET",
                    url: wgServer+wgScriptPath  + "/Special:WhatLinksHere/Template:" + $('#nulledittemplate-template').val() + '?limit=500',
                    success: function (data) {
                        $(data).find('#mw-whatlinkshere-list li').each(function () {
                            pages.push($(this).find('a').attr('title'));
                        });
                        $('#nulledittemplate-pages').val(pages.join('\n'));
                        alert('Updated !');
                    }
                });
            });
        });
        $("#at-purge").click(function () {
            $.get('/index.php?title=' + encodeURIComponent(page_name) + '&action=purge', function () {
                location.reload(true);
            });
        });
        $("#at-redirect").click(function () {
            var pagetoredirect = "";
            if (wgNamespaceNumber === 0) {
                pagetoredirect = page_name;
            }
            $container.html('<strong>Redirect:</strong><br /><input type="text" placeholder="Beyoncé" value="' + pagetoredirect + '" id="redirect-from" style=";"></input><br /><strong>To:</strong><br /><input type="text" id="redirect-location" placeholder="Beyoncé Giselle Knowles" style=""></input>');
            modal_button_name = "Create redirect";
            $container.append('<br><br><div style=""><a class="button" id="submit">' + modal_button_name + '</div>');
            $('#submit').click(function () {
                var from = document.getElementById('redirect-from').value,
                    to = document.getElementById('redirect-location').value;
                ajaxRedirect(from, to);
            });
        });
        $("#at-redlinks").click(function () {
            $.getJSON('/api.php?action=query&prop=revisions&titles=' + encodeURIComponent(page_name) + '&rvprop=content&indexpageids=1&format=json', function (result) {
                var text = result.query.pages[result.query.pageids[0]].revisions[0]['*'];
                var redlinks = $('a.new');
                var ref = 0;
                while (text.indexOf('[[', ref) != -1) {
                    if (text.indexOf(']]', text.indexOf('[[', ref)) != -1) {
                        var open = text.indexOf('[[', ref);
                        var pipe = text.indexOf('|', open);
                        var close = text.indexOf(']]', open);
                        if (text.indexOf('<br/>', open) != -1 && text.indexOf('<br/>', open) < close) {
                            ref = open + 1;
                            continue;
                        }
                        if (pipe != -1 && pipe < close) {
                            if (pipe == close - 1) {
                                var title = text.substring(open + 2, pipe);
                                var display = title.substring(title.indexOf(':') + 1);
                            } else {
                                var title = text.substring(open + 2, pipe);
                                var display = text.substring(pipe + 1, close);
                            }
                        } else {
                            var title = text.substring(open + 2, close);
                            var display = title;
                        }
                        if (!title) {
                            ref = open + 1;
                            continue;
                        }
                        for (var i = 0; i < redlinks.length; i++) {
                            var utitle = title[0].toUpperCase() + title.substring(1);
                            if (redlinks[i].title.indexOf(' (page does not exist)')) {
                                var redlink = redlinks[i].title.substring(0, redlinks[i].title.length - 22);
                            } else {
                                var redlink = redlinks[i];
                            }
                            if (utitle == redlink || utitle == ':' + redlink) {
                                if (pipe == close - 1) {
                                    var show = title;
                                } else {
                                    var show = display;
                                }
                                text = text.substring(0, open) + show + text.substring(close + 2);
                                break;
                            }
                        }
                        ref = open + 2;
                    } else {
                        break;
                    }
                }
                $.getJSON('/api.php?action=query&prop=info&titles=' + encodeURIComponent(page_name) + '&intoken=edit&indexpageids=1&format=json', function (result) {
                    $.post('/api.php', {
                        action: 'edit',
                        title: page_name,
                        text: text,
                        summary: 'Fixing redlinks',
                        token: token
                    }, function () {
                        window.location.reload();
                    });
                });
            });
        });
        $("#at-template").click(function () {
            $container.html('<strong>Template name:</strong><br /><input type="text" id="template-name" style=";" placeholder="delete"/><br /><strong>Template parameters (seperated by pipe "|"):</strong><br /><input type="text" id="template-parameters" style="" placeholder="Spam|' + signature + '" />');
            modal_button_name = "Add";
            $container.append('<br><br><div style=""><a class="button" id="submit">' + modal_button_name + '</div>');
            $('#submit').click(function () {
                var name = document.getElementById('template-name').value,
                    param = document.getElementById('template-parameters').value;
                ajaxTemplate(name, param);
            });
        });
        $("#at-unsigned").click(function () {
            if (-1 < [1, 3, 4, 5, 7, 9, 11, 13, 15, 110].indexOf(namespace)) {
                $.getJSON("/api.php", {
                    action: "query",
                    prop: "revisions",
                    titles: page_name,
                    rvprop: "user",
                    format: "json",
                    indexpageids: 1
                }, function (json) {
                    var user = json.query.pages[page_id].revisions[0].user,
                        addText = '{{Unsigned|' + user + '}}';
                    var summary = "Adding Unsigned template for ";
                    url = server + '/api.php?action=edit&title=' + encodeURIComponent(page_name) + '&appendtext=' + encodeURIComponent(addText) + '&summary=' + encodeURIComponent(summary) + '' + encodeURIComponent(user) + '&token=' + encodeURIComponent(token);
                    $.post(url, function () {
                        alert('Unsigned template has been added!');
                    });
                });
            }
        });
        var enddate = new Date();
        console.log('Opening menu in ' + (enddate - startdate) + " milliseconds");
    }
    //List of functions
    /* Mass Null Edit Template */
    function nulledit(pages) {
        if (pages.length === 0) {
            $('#submit').removeClass('disabled');
            $('#nulledittemplate-pages').removeAttr('disabled');
            $('#nulledittemplate-template').removeAttr('disabled');
            $('#nulledittemplate-template-button').removeClass('disabled');
            alert('Finished!');
            document.location.reload(false);
            return;
        }
        var pages = $('#nulledittemplate-pages').val().split('\n');
        var currentpage = pages[0];
        var url = server + '/api.php?action=edit&format=json&prependtext=&title=' + pages[0] + "&token=" + encodeURIComponent(token);
        $.post(url, function (d) {
            if (!d.error) {
                console.log('Null edit of ' + currentpage + ' successful!');
            } else {
                console.log('Failed to null edit ' + currentpage + ': ' + d.error.code);
                $('#nulledittemplate-error').val($('#nulledittemplate-error').val() + "\n" + 'Failed to null edit ' + currentpage + ': ' + d.error.code);
            }
            pages.splice(0, 1);
            $('#nulledittemplate-pages').val(pages.join('\n'));
            setTimeout(nulledit(pages), 1000);
        });
    }
    /* Block user */

    function ajaxBlock(user, expiry, reason, complements) {
        var url = wgServer+wgScriptPath  + '/api.php?action=block&user=' + encodeURIComponent(user) + '&expiry=' + encodeURIComponent(expiry) + '&reason=' + encodeURIComponent(reason) + complements + '&format=json&token=' + encodeURIComponent(token);
        $.post(url, function (data) {
            document.location.reload(false);
        });
    }
    /* UnBlock user */

    function ajaxUnBlock(user, reason) {
        var url = wgServer+wgScriptPath  + '/api.php?action=unblock&user=' + encodeURIComponent(user) + '&reason=' + encodeURIComponent(reason) + '&format=json&token=' + encodeURIComponent(token);
        $.post(url, function () {
            document.location.reload(false);
        });
    }

    /* Delete page */

    function ajaxDelete(page, reason) {
        var url = wgServer+wgScriptPath  + '/api.php?action=delete&title=' + encodeURIComponent(page) + '&reason=' + encodeURIComponent(reason) + '&format=json&token=' + encodeURIComponent(token);
        $.post(url, function () {
            document.location.reload(false);
        });
    }
    /* Categorize a page */

    function ajaxCategories(page, categories) {
		var categorie = 'Category';
		$.getJSON(wgServer+wgScriptPath  + '/api.php?action=query&format=json&titles=Category:' + $('#select-categories option:last').val(),function(data) {
			if (data.query.normalized) {
				categorie = decodeURI(data.query.normalized[0].to.split(':')[0]);
			}
		var content;
		var url = wgServer+wgScriptPath  + '/api.php?action=query&prop=info|revisions&titles=' + page + '&format=json&rvprop=content&rvlimit=1&indexpageids=1';
        $.getJSON(url, function (data) {
		if ( data.error  ) {
			alert('Error:' + data.error.info);
			return;
		} else {
			for (var pageid in data.query.pages) {
				content = data.query.pages[data.query.pageids[0]].revisions[0]['*'];
			}
		}
		content = content.replace(/\[\[Category:.+\]\]/g,'');
		content = content.replace(new RegExp('/\[\[' + categories + ':.+\]\]','g'),'');
        for (i = 0; i < categories.length; i++) {
            content += '[[' + categorie + ':' + categories[i] + ']]';
        }
        var url = wgServer+wgScriptPath  + '/api.php?action=edit&title=' + encodeURIComponent(page) + '&text=' + content + '&format=json&token=' + encodeURIComponent(token);
        $.post(url, function (data) {
            document.location.reload(false);
        });
		});
		});
    }
    /* Move page */

    function ajaxMove(movepage, destination, reason) {
        var url;
        if ($('#redirect-check').prop('checked')) {
            url = wgServer + wgScriptPath + '/api.php?action=move&from=' + encodeURIComponent(movepage) + '&to=' + encodeURIComponent(destination) + '&reason=' + encodeURIComponent(reason) + '&format=json&token=' + encodeURIComponent(token);
            $.post(url, function () {
                document.location.reload(false);
            });
        } else {
            url = wgServer + wgScriptPath + '/api.php?action=move&from=' + encodeURIComponent(movepage) + '&to=' + encodeURIComponent(destination) + '&reason=' + encodeURIComponent(reason) + '&format=json&noredirect&token=' + encodeURIComponent(token);
            $.post(url, function () {
                document.location.reload(false);
            });
        }
    }

    /* (Un)Protect page */

    function ajaxProtect(page, duration, reason) {
        var url;
        url = wgServer+wgScriptPath  + '/api.php?action=protect&title=' + encodeURIComponent(page) + '&protections=' + $('#edit-restriction option:selected').val() + $('#move-restriction option:selected').val() + '&expiry=' + encodeURIComponent(duration) + '&reason=' + encodeURIComponent(reason) + '&token=' + encodeURIComponent(token);
        $.post(url, function () {
            document.location.reload(false);
        });
    }

    /* Redirect page */

    function ajaxRedirect(from, to) {
        var Text = '#REDIRECT [[' + to + ']]';
        var url = wgServer+wgScriptPath  + '/api.php?action=edit&title=' + encodeURIComponent(from) + '&text=' + encodeURIComponent(Text) + '&summary=Redirecting&format=json&token=' + encodeURIComponent(token);
        $.post(url, function () {
            document.location.reload(false);
        });
    }

    /* Template */

    function ajaxTemplate(name, param) {
        var sig = '~~' + '~~',
            addtexttalk = '<br /><br /> {{subst:' + name + '|' + param + '}} ' + sig,
            addtextother = '{{' + name + '|' + param + '}} <br />',
            reason = "Using The [[w:c:dev:QuickToolsv2|QuickToolsv2]]",
            url;
        if (-1 < [1, 3, 5, 7, 9, 11, 13, 15].indexOf(namespace)) {
            url = server + '/api.php?action=edit&title=' + encodeURIComponent(page_name) + '&appendtext=' + encodeURIComponent(addtexttalk) + '&summary=' + encodeURIComponent(reason) + '&token=' + encodeURIComponent(token);
            $.post(url, function () {
                alert('Template appended!');
                document.location.reload(false);
            });
        }
        if (-1 < [0, 2, 4, 6, 8, 10, 12, 14].indexOf(namespace)) {
            url = server + '/api.php?action=edit&title=' + encodeURIComponent(page_name) + '&prependtext=' + encodeURIComponent(addtextother) + '&summary=' + encodeURIComponent(reason) + '&token=' + encodeURIComponent(token);
            $.post(url, function () {
                alert('Template prepended!');
                document.location.reload(false);
            });
        }
    }

    /* Batch Delete */

    function ajaxDeleteStart2() {
        var txt = document.getElementById('abd-textarea'),
            deletes = txt.value.split('\n'),
            page = deletes[0],
            reason = document.getElementById('abd-reason').value,
            badchars = /(\#|<|>|\[|\]|\{|\}|\|)/;
        setInterval(function () {
            var div = $('#abd-output');
            div.scrollTop(div.get(0).scrollHeight);
        }, 500);
        if (page === '') {
            $('#abd-output').append('* Done! Nothing left to do, or next line is blank.\n');
        } else {
            if (badchars.test(page)) {
                $('#abd-output').append('! Illegal characters detected, skipping:' + page + '\n');
                setTimeout(ajaxDeleteStart2, 1000);
            } else {
                $('#abd-output').append('> Attempting to delete [[' + page + ']]\n');
                ajaxBatchDeleteAPage(page, reason);
            }
        }
        deletes = deletes.slice(1, deletes.length);
        txt.value = deletes.join('\n');
    }

    function ajaxBatchDeleteAPage(title, deleteReason) {
        var token = mw.user.tokens.get('editToken'),
            url = wgServer + wgScriptPath + '/api.php?action=delete&title=' + window.encodeURIComponent(title) + '&reason=' + window.encodeURIComponent(deleteReason) + '&format=json&token=' + window.encodeURIComponent(token);

        $.post(url, function (data) {
            if (data.error) {
                $('#abd-output').append('  > Error: ' + data.error.info + '\n');
            } else {
                $('#abd-output').append('  > Deleted\n');
            }
            setTimeout(ajaxDeleteStart2, 1000);
        });
    }
}(this, this.jQuery, this.mediaWiki));